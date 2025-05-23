
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    {
      "path": "chunk-MWMJV5HF.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 119842, hash: 'b2042cb646f688a83a8ea619e34d8977f270d630331fdd34da88814c05c32f7c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 25353, hash: 'c6fc84d234a267e3778d02be0d84e44021d9d879a103b1824a78cc201263e3fa', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-YVOCMEBD.css': {size: 153305, hash: 'PCi73Uanj4Q', text: () => import('./assets-chunks/styles-YVOCMEBD_css.mjs').then(m => m.default)}
  },
};
