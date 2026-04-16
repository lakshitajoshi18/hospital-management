export async function clientFetch<T = any>(
  url: string,
  options: RequestInit = {},
  attempt = 0
) {
  const response = await fetch(url, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  if (!response.ok) {
    const text = await response.text()

    let message = text || `${response.status} ${response.statusText}`
    try {
      const json = JSON.parse(text)
      if (json?.error) {
        message = String(json.error)
      } else if (typeof json === 'string') {
        message = json
      }
    } catch {
      // Ignore invalid JSON and use raw text
    }

    // If the database is just waking up (Neon cold start), we may see
    // transient 5xx / "Failed query" errors. Retry once in that case.
    const isServerError = response.status >= 500
    const isFailedQuery = text.includes('Failed query')

    if (attempt === 0 && (isServerError || isFailedQuery)) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return clientFetch<T>(url, options, attempt + 1)
    }

    throw new Error(message)
  }

  return (await response.json()) as T
}
