import {AnyAction, Middleware} from '@reduxjs/toolkit';

export const errorLogger: Middleware = () => next => (action: AnyAction) => {
  if (action.type.endsWith('/rejected')) {
    console.group('\x1b[36m\x1b[41m Error at `%s` \x1b[0m', action.type);
    console.log('\x1b[31mPayload:', action.payload, '\x1b[0m');
    console.groupEnd();
  }
  return next(action);
};
