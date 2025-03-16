
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    {
      "path": "chunk-FIIQYBPA.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 111645, hash: 'f6ed1e994bcfe419ac2dffd03334205df03f963e684090327e2ed5050b46f2f9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17184, hash: 'e90529b511da61aad9d5484a9725cc051e282d8e8c997650ee0ba124f760ffb2', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-CNVUXZ7J.css': {size: 153277, hash: 'I98sUc/DyNc', text: () => import('./assets-chunks/styles-CNVUXZ7J_css.mjs').then(m => m.default)}
  },
};
