import generateNet from './net';
import interceptors from './interceptors';

export const net = generateNet(undefined, interceptors);

export * from './modules/file';
