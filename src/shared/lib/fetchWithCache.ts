type CacheData<T> = {
    data: T,
    cachedAt: number
}

const TTLMS = 6 * 60 * 1000;
const isBrowser = () => window !== undefined;

export async function fetchWithCache<T>(
    key: string,
): Promise<T> {
    if (isBrowser()) {
        const raw = localStorage.getItem(key);

        if (raw) {
            try {
                const parsed: CacheData<T> = JSON.parse(raw);
                if (Date.now() - parsed.cachedAt < TTLMS) {
                    return parsed.data;
                } else {
                    localStorage.removeItem(key);
                }
            } catch {
                
            }
        }
    }

    const res = await fetch(`/api/${key}`);
    const fetchData = await res.json() as T;

    if (isBrowser()) {
        const entry: CacheData<T> = {
            data: fetchData,
            cachedAt: Date.now()
        }

        try {
            localStorage.setItem(key, JSON.stringify(entry));
        } catch (err) {
            console.error(err);
        }
    }

    return fetchData;
}