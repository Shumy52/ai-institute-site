
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/staging';
export const withBasePath = (p) =>
  `${basePath}${p.startsWith('/') ? p : `/${p}`}`;
