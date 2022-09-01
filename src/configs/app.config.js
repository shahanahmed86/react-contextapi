const { protocol, hostname } = window.location;

const { PROTOCOL = protocol, HOST = hostname, NODE_ENV } = process.env;

export const appHost = `${PROTOCOL}//${HOST}`;

export const wsHost = `${PROTOCOL.replace('http', 'ws')}//${HOST}`;

export const IN_PROD = NODE_ENV === 'production';
