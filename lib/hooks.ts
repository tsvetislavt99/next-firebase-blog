import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from './firebase';

export const useUserData = () => {
    //Get current user if such from FB
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState<string | null>();

    useEffect(() => {
        let unsubscribe;
        if (user) {
            const ref = doc(firestore, 'users', user.uid);
            unsubscribe = onSnapshot(ref, (doc) => {
                setUsername(doc.data()?.username);
            });
        } else {
            setUsername(null);
        }

        return () => unsubscribe;
    }, [user]);

    return { user, username };
};
