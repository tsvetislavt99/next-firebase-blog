import { User } from 'firebase/auth';
import { createContext } from 'react';
import { UserContextParams } from './globalTypes';

const initialValue = { user: null, username: null, loading: true };

export const UserContext = createContext<UserContextParams>(initialValue);

export const UserProvider = UserContext.Provider;
