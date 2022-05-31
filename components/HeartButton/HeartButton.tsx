import { firestore, auth } from '../../lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useEffect, useState } from 'react';
import {
    deleteDoc,
    doc,
    DocumentReference,
    increment,
    setDoc,
    updateDoc,
    getDoc,
} from '@firebase/firestore';

type Props = {
    postRef: DocumentReference;
};

// Allows user to heart or like a post
export default function Heart({ postRef }: Props) {
    // Listen to heart document for currently logged in user
    //TODO: Check if useReducer will be betther here
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string>();
    const [heartExsist, setHeartExsist] = useState<boolean>();

    useEffect(() => {
        if (auth.currentUser) {
            setUserId(auth.currentUser.uid);
            const post = async () => {
                const heartsRef = doc(
                    firestore,
                    `${postRef.path}/hearts/${auth.currentUser.uid}`
                );
                const heartsSnap = await getDoc(heartsRef);

                if (heartsSnap.exists()) {
                    setHeartExsist(true);
                } else {
                    setHeartExsist(false);
                }
                setLoading(false);
            };
            post();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.currentUser]);

    // Create a user-to-post relationship
    const addHeart = async () => {
        await updateDoc(postRef, { heartCount: increment(1) });
        await setDoc(doc(firestore, `${postRef.path}/hearts/${userId}`), {});
        setHeartExsist(true);
    };

    // Remove a user-to-post relationship
    const removeHeart = async () => {
        try {
            await updateDoc(postRef, { heartCount: increment(-1) });
            await deleteDoc(doc(firestore, `${postRef.path}/hearts/${userId}`));
            setHeartExsist(false);
        } catch (error) {
            console.log(error);
        }
    };

    return loading ? null : heartExsist ? (
        <button
            className="py-1 px-2 mb-3 rounded-md border border-yellow-300 dark:border-[#090A0D] hover:scale-105 duration-300"
            onClick={removeHeart}
        >
            💔 Unheart
        </button>
    ) : (
        <button
            className="py-1 px-2 mb-3 rounded-md border border-yellow-300 dark:border-[#090A0D] hover:scale-105 duration-300"
            disabled={!userId}
            onClick={addHeart}
        >
            💗 Heart
        </button>
    );
}
