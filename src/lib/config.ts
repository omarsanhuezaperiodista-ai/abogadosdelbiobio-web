import type { CookieSerializeOptions } from 'cookie';

const isProduction = process.env.NODE_ENV === 'production';
const DEV_JWT_SECRET = 'dev-only-jwt-secret';

function getEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function getRequiredEnv(name: string, fallback?: string): string {
  const value = getEnv(name) ?? fallback;

  if (value) {
    return value;
  }

  throw new Error(`Missing required environment variable: ${name}`);
}

function parseBoolean(value: string): boolean {
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

function parseInteger(value: string, name: string): number {
  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid integer value for environment variable: ${name}`);
  }

  return parsed;
}

function normalizeDomain(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  return value
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')
    .trim() || undefined;
}

function normalizeBaseUrl(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  return value.replace(/\/+$/, '');
}

export function isProductionEnv(): boolean {
  return isProduction;
}

export function getJwtSecret(): string {
  const configuredSecret = getEnv('JWT_SECRET');

  if (configuredSecret) {
    return configuredSecret;
  }

  if (!isProduction) {
    return DEV_JWT_SECRET;
  }

  throw new Error('Missing required environment variable: JWT_SECRET');
}

export function getAdminEmail(): string {
  return getRequiredEnv('ADMIN_EMAIL', getEnv('EMAIL'));
}

export function getAppBaseUrl(): string {
  const explicitUrl = normalizeBaseUrl(getEnv('APP_URL'));
  if (explicitUrl) {
    return explicitUrl;
  }

  if (!isProduction) {
    return 'http://localhost:3000';
  }

  const domain = getCookieDomain();
  if (domain) {
    return `https://${domain}`;
  }

  return 'http://localhost:3000';
}

export function getCookieDomain(): string | undefined {
  if (!isProduction) {
    return undefined;
  }

  const normalizedDomain = normalizeDomain(getEnv('DOMAIN'));

  if (!normalizedDomain || normalizedDomain === 'localhost' || normalizedDomain === '127.0.0.1') {
    return undefined;
  }

  return normalizedDomain;
}

export function getAuthCookieOptions(maxAge: number): CookieSerializeOptions {
  const domain = getCookieDomain();

  return {
    httpOnly: true,
    secure: isProduction,
    maxAge,
    path: '/',
    sameSite: 'lax',
    ...(domain ? { domain } : {}),
  };
}

export function getSmtpConfig() {
  const user = getRequiredEnv('SMTP_USER');

  return {
    host: getRequiredEnv('SMTP_HOST'),
    port: parseInteger(getEnv('SMTP_PORT') ?? '465', 'SMTP_PORT'),
    secure: parseBoolean(getEnv('SMTP_SECURE') ?? 'true'),
    auth: {
      user,
      pass: getRequiredEnv('SMTP_PASS'),
    },
    from: getRequiredEnv('SMTP_FROM', user),
  };
}

export function getFlowConfig() {
  return {
    apiKey: isProduction
      ? getRequiredEnv('FLOW_API_KEY_PROD')
      : getRequiredEnv('FLOW_API_KEY_SANDBOX'),
    secretKey: isProduction
      ? getRequiredEnv('FLOW_SECRET_KEY_PROD')
      : getRequiredEnv('FLOW_SECRET_KEY_SANDBOX'),
    endPoint: isProduction
      ? getEnv('FLOW_ENDPOINT_PROD') ?? 'https://www.flow.cl/api'
      : getEnv('FLOW_ENDPOINT_SANDBOX') ?? 'https://sandbox.flow.cl/api',
  };
}
