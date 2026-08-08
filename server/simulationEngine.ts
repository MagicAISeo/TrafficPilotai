import http from 'http';
import https from 'https';
import { URL } from 'url';
import { Campaign, LiveLog } from '../src/types';

const USER_AGENTS = {
  chrome: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 TrafficPilotSim/2.4',
  firefox: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:129.0) Gecko/20100101 Firefox/129.0 TrafficPilotSim/2.4',
  safari: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1 TrafficPilotSim/2.4',
  edge: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0 TrafficPilotSim/2.4',
};

// Check if a host target is internal/private (SSRF Protection)
export function isPrivateHost(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (lower === 'localhost' || lower === '127.0.0.1' || lower === '0.0.0.0' || lower === '::1' || lower.endsWith('.local')) {
    return true;
  }
  // Check private IP ranges
  if (/^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.|169\.254\.)/.test(hostname)) {
    return true;
  }
  return false;
}

export interface SimulationResult {
  success: boolean;
  statusCode?: number;
  responseTimeMs: number;
  url: string;
  error?: string;
}

export async function executeSingleSimulatedSession(
  targetUrlStr: string,
  userAgentKey: 'chrome' | 'firefox' | 'safari' | 'edge' = 'chrome'
): Promise<SimulationResult> {
  const startTime = Date.now();
  try {
    const parsedUrl = new URL(targetUrlStr);

    if (isPrivateHost(parsedUrl.hostname)) {
      return {
        success: false,
        statusCode: 403,
        responseTimeMs: Date.now() - startTime,
        url: targetUrlStr,
        error: 'Safety Block: Local/Internal IP targets are restricted for security.',
      };
    }

    const client = parsedUrl.protocol === 'https:' ? https : http;
    const ua = USER_AGENTS[userAgentKey] || USER_AGENTS.chrome;

    return new Promise((resolve) => {
      const req = client.request(
        parsedUrl,
        {
          method: 'GET',
          headers: {
            'User-Agent': ua,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'X-TrafficPilot-Simulated': 'true',
          },
          timeout: 8000,
        },
        (res) => {
          let bodySize = 0;
          res.on('data', (chunk) => {
            bodySize += chunk.length;
          });
          res.on('end', () => {
            const duration = Date.now() - startTime;
            resolve({
              success: (res.statusCode ?? 500) >= 200 && (res.statusCode ?? 500) < 400,
              statusCode: res.statusCode,
              responseTimeMs: duration,
              url: targetUrlStr,
            });
          });
        }
      );

      req.on('error', (err) => {
        resolve({
          success: false,
          statusCode: 500,
          responseTimeMs: Date.now() - startTime,
          url: targetUrlStr,
          error: err.message,
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          success: false,
          statusCode: 504,
          responseTimeMs: Date.now() - startTime,
          url: targetUrlStr,
          error: 'HTTP request timed out (8000ms threshold).',
        });
      });

      req.end();
    });
  } catch (err: any) {
    return {
      success: false,
      statusCode: 400,
      responseTimeMs: Date.now() - startTime,
      url: targetUrlStr,
      error: `Invalid URL: ${err.message}`,
    };
  }
}
