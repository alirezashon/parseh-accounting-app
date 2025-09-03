// /src/actions/cookieToken.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export type SameSite = 'lax' | 'strict' | 'none'
export type CookieOptions = {
  path?: string
  domain?: string
  maxAge?: number // seconds
  expires?: Date | string // absolute expiry (Date or ISO string)
  httpOnly?: boolean // only meaningful on server
  secure?: boolean
  sameSite?: SameSite
}

type CacheEntry = {
  value: string
  expiresAt?: number // ms epoch
}

type CookieKV = { name: string; value: string }

const isServer = () => typeof window === 'undefined'
const now = () => Date.now()

// ---------- global in-memory cache (persists across HMR reloads in dev) ----------
const g = globalThis as any
if (!g.__cookieCache) g.__cookieCache = new Map<string, CacheEntry>()
const cookieCache: Map<string, CacheEntry> = g.__cookieCache

// ---------- server helper (lazy import) ----------
async function getServerCookies() {
  const mod = await import('next/headers')
  return mod.cookies()
}

// ---------- client helpers ----------
function parseDocumentCookie(): Record<string, string> {
  if (typeof document === 'undefined') return {}
  const out: Record<string, string> = {}
  const raw = document.cookie || ''
  raw.split(';').forEach((pair) => {
    const idx = pair.indexOf('=')
    if (idx < 0) return
    const k = decodeURIComponent(pair.slice(0, idx).trim())
    const v = decodeURIComponent(pair.slice(idx + 1).trim())
    out[k] = v
  })
  return out
}

function serializeCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
) {
  const parts: string[] = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
  ]

  if (typeof options.maxAge === 'number' && Number.isFinite(options.maxAge)) {
    parts.push(`Max-Age=${Math.floor(options.maxAge)}`)
  }
  if (options.expires) {
    const d =
      typeof options.expires === 'string'
        ? new Date(options.expires)
        : options.expires
    parts.push(`Expires=${d.toUTCString()}`)
  }
  parts.push(`Path=${options.path ?? '/'}`)
  if (options.domain) parts.push(`Domain=${options.domain}`)
  if (options.secure) parts.push(`Secure`)
  if (options.httpOnly) parts.push(`HttpOnly`) // مرورگر نادیده می‌گیرد
  if (options.sameSite) {
    const s = options.sameSite.toLowerCase()
    parts.push(`SameSite=${s[0].toUpperCase()}${s.slice(1)}`)
  }

  return parts.join('; ')
}

// ---------- cache helpers ----------
function setCache(
  name: string,
  value: string,
  maxAge?: number,
  expires?: Date | string
) {
  let expiresAt: number | undefined
  if (typeof maxAge === 'number' && maxAge > 0) {
    expiresAt = now() + maxAge * 1000
  } else if (expires) {
    const d = typeof expires === 'string' ? new Date(expires) : expires
    const t = d?.getTime()
    if (t && !Number.isNaN(t)) expiresAt = t
  }
  cookieCache.set(name, { value, expiresAt })
}

function getCache(name: string): string | undefined {
  const ent = cookieCache.get(name)
  if (!ent) return undefined
  if (ent.expiresAt && ent.expiresAt < now()) {
    cookieCache.delete(name)
    return undefined
  }
  return ent.value
}

function deleteCache(name: string) {
  cookieCache.delete(name)
}

// ---------- normalize options for server ----------
function normalizeServerOptions(opts: CookieOptions): any {
  const out: any = {
    path: opts.path ?? '/',
    domain: opts.domain,
    httpOnly: opts.httpOnly ?? false,
    secure: opts.secure ?? true,
    sameSite: opts.sameSite ?? 'lax',
  }
  if (typeof opts.maxAge === 'number') out.maxAge = Math.floor(opts.maxAge)
  if (opts.expires)
    out.expires =
      typeof opts.expires === 'string' ? new Date(opts.expires) : opts.expires
  return out
}

// =================================================================================
// =============      PUBLIC API (با نام‌های قبلی شما)            =================
// =================================================================================

/**
 * لیست همهٔ کوکی‌ها (Server/Client)
 * - Server: خروجی مشابه cookies().getAll() با {name,value}
 * - Client: پارس document.cookie
 */
export async function getAllCookies(): Promise<CookieKV[]> {
  if (isServer()) {
    const jar = await getServerCookies()
    const all = jar.getAll()
    // all: Array<{ name: string, value: string, ... }>
    return all.map(({ name, value }) => ({ name, value }))
  } else {
    const rec = parseDocumentCookie()
    return Object.entries(rec).map(([name, value]) => ({ name, value }))
  }
}

/**
 * گرفتن مقدار یک کوکی با کش داخلی
 */
export async function getCookieByKey(
  name: string
): Promise<string | undefined> {
  // 1) cache
  const cached = getCache(name)
  if (typeof cached !== 'undefined') return cached

  // 2) read from source
  if (isServer()) {
    const jar = await getServerCookies()
    const v = jar.get(name)?.value
    if (typeof v !== 'undefined') setCache(name, v)
    return v
  } else {
    const v = parseDocumentCookie()[name]
    if (typeof v !== 'undefined') setCache(name, v)
    return v
  }
}

interface ITagAndValue {
  key: string
  value: string
}

/**
 * ست‌کردن کوکی (با گزینه‌های اختیاری) + به‌روزرسانی کش
 */
export async function setCookieByTagAndValue(
  { key, value }: ITagAndValue,
  options: CookieOptions = {}
): Promise<void> {
  if (isServer()) {
    const jar = await getServerCookies()
    jar.set(key, value, normalizeServerOptions(options))
  } else {
    document.cookie = serializeCookie(key, value, options)
  }
  setCache(key, value, options.maxAge, options.expires)
}

/**
 * نسخهٔ قدیمی شما که path را جدا می‌گرفت—حفظ امضا
 * (درونش به setCookieByTagAndValue با options هدایت می‌کنیم)
 */
export async function setCookieByTagAndValueAndPath({
  key,
  value,
  path,
}: {
  key: string
  value: string
  path: string
}): Promise<void> {
  await setCookieByTagAndValue({ key, value }, { path })
}

/**
 * حذف کوکی + پاک‌کردن از کش
 */
export async function deleteCookieByKey(key: string): Promise<void> {
  const delOpts: CookieOptions = {
    path: '/', // حذف مطمئن‌تر
    maxAge: 0,
    expires: new Date(0),
    secure: true,
    sameSite: 'lax',
  }

  if (isServer()) {
    const jar = await getServerCookies()
    jar.set(key, '', normalizeServerOptions(delOpts))
  } else {
    document.cookie = serializeCookie(key, '', delOpts)
  }
  deleteCache(key)
}

// =================================================================================
// =============         OPTIONAL small helpers (بدون تغییر امضا)   ==============
// =================================================================================

/** خواندن JSON از کوکی (اگر JSON نباشد undefined) */
export async function getJSONCookie<T = unknown>(
  name: string
): Promise<T | undefined> {
  const raw = await getCookieByKey(name)
  if (!raw) return undefined
  try {
    return JSON.parse(raw) as T
  } catch {
    return undefined
  }
}

/** ذخیرهٔ JSON در کوکی (stringify) با options اختیاری */
export async function setJSONCookie(
  name: string,
  value: unknown,
  options: CookieOptions = {}
): Promise<void> {
  return setCookieByTagAndValue(
    { key: name, value: JSON.stringify(value) },
    options
  )
}
