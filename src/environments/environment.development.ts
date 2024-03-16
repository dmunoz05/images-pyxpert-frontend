export const environment = {
  production: process.env['API_URL'],
  issuer: process.env['ISSUER'],
  strictDiscoveryDocumentValidation: false,
  redirectUri: process.env['REDIRECTURI'],
  clientId: process.env['CLIENTID'],
  scope: process.env['SCOPE'],
}
