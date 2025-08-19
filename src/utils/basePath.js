// export function withBasePath(p) {
//   const path = p.startsWith('/') ? p : `/${p}`;
//   let base = '';

//   if (typeof window !== 'undefined') {
//     base = window.__NEXT_DATA__?.basePath || window.__NEXT_DATA__?.assetPrefix || '';
//   } else {
//     base = process.env.NEXT_PUBLIC_BASE_PATH || '';
//   }

//   const full = `${base}${path}`;
//   return full.replace(/\/{2,}/g, '/');
// }
