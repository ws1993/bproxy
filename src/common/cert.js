'use strict';

const path = require('path');

const config = exports;
config.caCertFileName = 'bproxy.ca.crt';
config.caKeyFileName = 'bproxy.ca.key.pem';
config.caName = 'bproxy-cert';
config.organizationName = 'zoborzhang';
config.OU = 'http://zobor.me';
config.countryName = 'CN';
config.provinceName = 'GuangDong';
config.localityName = 'ShenZhen';

config.getDefaultCABasePath = () => {
  const userHome = process.env.HOME || process.env.USERPROFILE;
  return path.resolve(userHome, './.AppData/bproxy');
};

config.getDefaultCACertPath = () => path.resolve(
  config.getDefaultCABasePath(),
  config.caCertFileName,
);

config.getDefaultCAKeyPath = () => path.resolve(
  config.getDefaultCABasePath(),
  config.caKeyFileName,
);
