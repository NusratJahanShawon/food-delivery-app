const crypto = require('crypto');

console.log('Generate these secrets for your .env file:\n');

console.log('JWT_SECRET=' + crypto.randomBytes(32).toString('hex'));
console.log('ADMIN_JWT_SECRET=' + crypto.randomBytes(32).toString('hex'));
console.log('API_TOKEN_SALT=' + crypto.randomBytes(32).toString('hex'));

const appKeys = [];
for (let i = 0; i < 4; i++) {
  appKeys.push(crypto.randomBytes(32).toString('hex'));
}
console.log('APP_KEYS=' + appKeys.join(','));

console.log('\nCopy these values to your .env file!');
