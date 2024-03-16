export const environment = {
  production: true,
  issuer: process.env['ISSUER'],
  strictDiscoveryDocumentValidation: false,
  redirectUri: process.env['REDIRECTURI'],
  clientId: process.env['CLIENTID'],
  scope: process.env['SCOPE'],
}
