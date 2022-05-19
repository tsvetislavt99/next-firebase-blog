import { User } from 'firebase/auth';
import { createContext } from 'react';

type UserContextParams = {
    user: User | null;
    username: string | null;
};

const initialValue = { user: null, username: null };

export const UserContext = createContext<UserContextParams>(initialValue);

export const UserProvider = UserContext.Provider;
