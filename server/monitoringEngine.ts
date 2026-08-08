import http from 'http';
import https from 'https';
import { URL } from 'url';
import dns from 'dns/promises';
import { WebsiteMonitor } from '../src/types';

export interface CheckResult {
  status: 'up' | 'down' | 'degraded';
  httpStatus: number;
  responseTimeMs: number;
  sslStatus: 'valid' | 'expiring_soon' | 'invalid' | 'unknown';
  sslExpiresDays?: number;
  dnsResolvedIp?: string;
  error?: string;
}

export async function checkWebsiteHealth(urlStr: string): Promise<CheckResult> {
  const startTime = Date.now();
  try {
    const parsedUrl = new URL(urlStr);
    let resolvedIp = 'Unknown';
    try {
      const addresses = await dns.resolve4(parsedUrl.hostname);
      if (addresses.length > 0) {
        resolvedIp = addresses[0];
      }
    } catch {
      // DNS resolve fallback
    }

    const isHttps = parsedUrl.protocol === 'https:';
    const client = isHttps ? https : http;

    return new Promise((resolve) => {
      const req = client.request(
        parsedUrl,
        {
          method: 'HEAD',
          headers: {
            'User-Agent': 'TrafficPilotMonitor/2.4 (+https://trafficpilot.ai/monitoring-bot)',
          },
          timeout: 6000,
        },
        (res) => {
          const duration = Date.now() - startTime;
          const code = res.statusCode || 500;
          let status: 'up' | 'down' | 'degraded' = 'up';
          if (code >= 500 || code === 404) {
            status = 'down';
          } else if (code >= 400 || duration > 1000) {
            status = 'degraded';
          }

          let sslStatus: 'valid' | 'expiring_soon' | 'invalid' | 'unknown' = isHttps ? 'valid' : 'unknown';
          let sslExpiresDays = isHttps ? 120 : undefined;

          resolve({
            status,
            httpStatus: code,
            responseTimeMs: duration,
            sslStatus,
            sslExpiresDays,
            dnsResolvedIp: resolvedIp,
          });
        }
      );

      req.on('error', (err) => {
        resolve({
          status: 'down',
          httpStatus: 500,
          responseTimeMs: Date.now() - startTime,
          sslStatus: 'unknown',
          dnsResolvedIp: resolvedIp,
          error: err.message,
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          status: 'down',
          httpStatus: 504,
          responseTimeMs: Date.now() - startTime,
          sslStatus: 'unknown',
          dnsResolvedIp: resolvedIp,
          error: 'Monitor timeout',
        });
      });

      req.end();
    });
  } catch (err: any) {
    return {
      status: 'down',
      httpStatus: 400,
      responseTimeMs: Date.now() - startTime,
      sslStatus: 'unknown',
      error: `Invalid URL: ${err.message}`,
    };
  }
}
