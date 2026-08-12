export function getAssetPath(path) {
  if (!path) return '';

  // Return external URLs, data URIs, or protocol-relative URLs as-is
  if (/^(https?:|data:|\/\/)/i.test(path)) {
    return path;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Avoid duplicating basePath if cleanPath already begins with basePath
  if (basePath && (cleanPath === basePath || cleanPath.startsWith(`${basePath}/`))) {
    return cleanPath;
  }

  return `${basePath}${cleanPath}`;
}
