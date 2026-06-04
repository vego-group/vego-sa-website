const NEXT_IMAGE_UNOPTIMIZED_HOSTS = new Set(["api.vego.sa"]);

export function shouldBypassNextImageOptimization(src: string): boolean {
  const normalizedSrc = src.toLowerCase();

  if (normalizedSrc.endsWith(".svg")) {
    return true;
  }

  try {
    const url = new URL(src);
    return NEXT_IMAGE_UNOPTIMIZED_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}
