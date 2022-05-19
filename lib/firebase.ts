import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
    limit,
    orderBy,
    getDoc,
    DocumentSnapshot,
    Timestamp,
    collectionGroup,
    startAfter,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { PostModel } from './globalTypes';

const firebaseConfig = {
    apiKey: 'AIzaSyBa3Sb0eHbG0rQtjVKBAsbll6MaJpppSW4',
    authDomain: 'next-fire-blog-f8890.firebaseapp.com',
    projectId: 'next-fire-blog-f8890',
    storageBucket: 'next-fire-blog-f8890.appspot.com',
    messagingSenderId: '163263960478',
    appId: '1:163263960478:web:ca64078f34aa299a1c728f',
    measurementId: 'G-FHKJ64Y41N',
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore();
export const storage = getStorage();
export default firebaseConfig;

//Helper fnctions

/**
 *
 * @param {DocumentSnapshot} doc
 */
export function postToJSON(doc: DocumentSnapshot) {
    const data = doc.data();

    return {
        ...data,
        createdAt: data.createdAt.toMillis(),
        updatedAt: data.updatedAt.toMillis(),
    };
}

/**
 * Gets a user/{uid} document by a passed username
 * @param {string} username
 * @returns {QueryDocumentSnapshot<DocumentData>}  userDoc with a data() method on it
 */
export async function getUserWithUsername(username: string) {
    const usersRef = collection(firestore, 'users');
    const userQuery = query(
        usersRef,
        where('username', '==', username),
        limit(1)
    );
    const userDoc = (await getDocs(userQuery)).docs[0];
    return userDoc;
}

/**
 * Get user/{uid}/posts/* documents by a passed uid
 * @param {string} uid the uid of the user you want to get the posts from
 */
export async function getPostsByUser(uid: string) {
    const userPostsRef = collection(firestore, `/users/${uid}/posts`);
    const postsByUserQuery = query(
        userPostsRef,
        where('published', '==', false),
        orderBy('createdAt', 'desc'),
        limit(5)
    );

    const sanitizedDocs = (await getDocs(postsByUserQuery)).docs.map(
        postToJSON
    );

    return sanitizedDocs;
}

/**
 *Get `limit` number of posts ordered descending by their creation date
 *@param {number} postsLimit
 */
export async function getPostsWithLimit(postsLimit: number) {
    const postsRef = collectionGroup(firestore, 'posts');
    const postsQuery = query(
        postsRef,
        where('published', '==', false),
        orderBy('createdAt', 'desc'),
        limit(postsLimit)
    );

    const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

    return posts;
}

/**
 *
 * @param {number} postsLimit
 * @param {Timestamp} lastPostTimestamp
 * @returns {PostModel[]} An array of posts created after the current last rendered post
 */
export async function getPostsStartingFromWithLimit(
    postsLimit: number,
    lastPostTimestamp: Timestamp
) {
    const postsRef = collectionGroup(firestore, 'posts');
    const postsQuery = query(
        postsRef,
        where('published', '==', false),
        orderBy('createdAt', 'desc'),
        startAfter(lastPostTimestamp),
        limit(postsLimit)
    );

    const posts = (await getDocs(postsQuery)).docs.map(postToJSON);
    console.log(posts);
    return posts;
}

export const fromMillis = Timestamp.fromMillis;
