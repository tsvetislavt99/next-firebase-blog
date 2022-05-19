import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from './firebase';

/**
 *
 * @returns a firebase/auth User object, the username of that User and a boolean value to indicate the loading state
 */
export const useUserData = () => {
    //Get current user if such from FB
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let unsubscribe;
        if (user) {
            const ref = doc(firestore, 'users', user.uid);
            unsubscribe = onSnapshot(ref, (doc) => {
                setUsername(doc.data()?.username);
                setLoading(false);
            });
        } else {
            setUsername(null);
        }

        return () => {
            setLoading(false);
            return unsubscribe;
        };
    }, [user]);

    return { user, username, loading };
};
