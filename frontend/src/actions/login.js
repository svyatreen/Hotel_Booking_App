import { ACTION_TYPE } from './actionType';

export const login = (user) => ({ type: ACTION_TYPE.LOGIN, payload: user });
