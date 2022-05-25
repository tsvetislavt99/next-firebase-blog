import { createContext } from 'react';
import { UserContextParams } from './globalTypes';

const userInitialValue = { user: null, username: null, loading: true };

export const UserContext = createContext<UserContextParams>(userInitialValue);

export const UserProvider = UserContext.Provider;
