// src/utils/basePath.js

// Get basePath from NEXT_PUBLIC_BASE_PATH or fallback to '/staging'
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/staging';

export function withBasePath(path) {
  if (!path.startsWith('/')) return basePath + '/' + path;
  return basePath + path;
}
