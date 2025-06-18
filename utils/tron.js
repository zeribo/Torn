// utils/tron.js
const { TronWeb } = require('tronweb');

const defaultTronWeb = new TronWeb({
  fullHost: 'https://nile.trongrid.io',
  headers: {
    "TRON-PRO-API-KEY": process.env.TRON_API_KEY,
  },
  privateKey: "01", 
});

function getUserTronWeb(privateKey) {
  return new TronWeb({
    fullHost: 'https://nile.trongrid.io',
    headers: {
      "TRON-PRO-API-KEY": process.env.TRON_API_KEY,
    },
    privateKey,
  });
}

module.exports = {
  defaultTronWeb,
  getUserTronWeb,
};
