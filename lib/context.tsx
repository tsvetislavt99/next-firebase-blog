import { createContext, useState } from 'react';
import { UserContextParams } from './globalTypes';

/* User Context **/

const userInitialValue = { user: null, username: null, loading: true };

export const UserContext = createContext<UserContextParams>(userInitialValue);

export const UserProvider = UserContext.Provider;

/* Modal Context **/

const modalInitialValue = { isOpen: false, toggleModal: () => {} };

export const ModalContext = createContext(modalInitialValue);

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => setIsOpen((value) => !value);

    return (
        <ModalContext.Provider value={{ isOpen: false, toggleModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const ModalConsumer = ModalContext.Consumer;
