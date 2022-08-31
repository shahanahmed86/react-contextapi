const { REACT_APP_API_PROTOCOL: PROTOCOL, REACT_APP_API_HOST: HOST, NODE_ENV } = process.env;

export const appHost = `${PROTOCOL}//${HOST}`;

export const wsHost = `${PROTOCOL.replace('http', 'ws')}//${HOST}`;

export const IN_PROD = NODE_ENV === 'production';
