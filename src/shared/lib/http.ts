export class HttpError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export async function httpGet<T>(url: string, signal?: AbortSignal): Promise<T> {
    const res = await fetch(url, { signal });

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new HttpError(res.status, text || `HTTP ${res.status}`);
    }

    return res.json() as Promise<T>;
}