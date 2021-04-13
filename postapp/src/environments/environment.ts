// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // baseUrl: 'http://167.99.49.173:5001',
  // adminUrl: 'http://167.99.49.173:5000/site',
  baseUrl: 'http://localhost:3000',
  encryptionKey: 'x90dh!2$bs',
  appConfig: {
    currency: {
      code: 'INR',
      symbol: '₹'
    },
    defaultPageSize: 10
  }
};
