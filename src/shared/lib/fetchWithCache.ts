type CacheData<T> = {
    data: T,
    cachedAt: number
}

const isBrowser = () => window !== undefined;

export async function fetchWithCache<T>(
    key: string,
    ttlMs: number,
    fetcher: () => Promise<T>
): Promise<T> {
    if (isBrowser()) {
        const raw = localStorage.getItem(key);

        if (raw) {
            try {
                const parsed: CacheData<T> = JSON.parse(raw);
                if (Date.now() - parsed.cachedAt < ttlMs) {
                    return parsed.data;
                } else {
                    localStorage.removeItem(key);
                }
            } catch {
                
            }
        }
    }

    const fetchData = await fetcher();

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