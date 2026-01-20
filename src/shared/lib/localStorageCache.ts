type CacheData<T> = {
    data: T,
    cachedAt: number
}

const isBrowser = () => window !== undefined;

export const getFromCache = <T>(
    key: string,
    ttlMs: number
) => {
    if (!isBrowser) return null;

    try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;

        const parsed: CacheData<T> = JSON.parse(raw);

        const isExpired = Date.now() - parsed.cachedAt > ttlMs;
        if (isExpired) {
            localStorage.removeItem(key);
            return null;
        }
        return parsed.data;
    } catch {
        return null;
    }
}

export const saveToCache = <T>(
    data: T,
    key: string
) => {
    if (!isBrowser) return null;

    const entry: CacheData<T> = {
        data,
        cachedAt: Date.now()
    }

    try {
        localStorage.setItem(key, JSON.stringify(entry));
    } catch (err) {
        console.error(err);
    }
}

export const clearCache = (key: string) => {
    if (!isBrowser) return null;
    localStorage.removeItem(key)
}