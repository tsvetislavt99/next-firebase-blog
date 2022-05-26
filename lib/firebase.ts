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
    DocumentSnapshot,
    Timestamp,
    collectionGroup,
    startAfter,
    setDoc,
    doc,
    FieldValue,
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
export function postToJSON(doc: DocumentSnapshot): PostModel {
    const data = doc.data();

    //Destructuring the data creates a problem with types
    return {
        title: data.title,
        content: data.content,
        published: data.published,
        slug: data.slug,
        uid: data.uid,
        username: data.username,
        heartCount: data.heartCount,
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
 * @returns The published Posts by this user as JSON valid objects
 */
export async function getPostsByUser(uid: string) {
    const userPostsRef = collection(firestore, `/users/${uid}/posts`);
    const postsByUserQuery = query(
        userPostsRef,
        where('published', '==', true),
        orderBy('createdAt', 'desc')
    );

    const sanitizedDocs = (await getDocs(postsByUserQuery)).docs.map(
        postToJSON
    );

    return sanitizedDocs;
}

/**
 * Get user/{uid}/posts/* documents by a passed uid
 * @param {string} uid the uid of the user you want to get the posts from
 * @returns Posts by this user as JSON valid objects
 */
export async function getAllPostsByUser(uid: string) {
    const userPostsRef = collection(firestore, `/users/${uid}/posts`);
    const postsByUserQuery = query(userPostsRef, orderBy('createdAt', 'desc'));

    const sanitizedDocs = (await getDocs(postsByUserQuery)).docs.map(
        postToJSON
    );

    return sanitizedDocs;
}

/**
 * @returns {QueryDocumentSnapshot<DocumentData>} all posts from the firestore
 */
export async function getAllPosts() {
    const postsRef = collectionGroup(firestore, 'posts');
    const postsQuery = query(postsRef);

    const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

    return posts;
}

/**
 *Get `limit` number of posts ordered descending by their creation date
 *@param {number} postsLimit
 */
export async function getPostsWithLimit(postsLimit: number) {
    const postsRef = collectionGroup(firestore, 'posts');
    const postsQuery = query(
        postsRef,
        where('published', '==', true),
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
    lastPostTimestamp: Timestamp | FieldValue
) {
    const postsRef = collectionGroup(firestore, 'posts');
    const postsQuery = query(
        postsRef,
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        startAfter(lastPostTimestamp),
        limit(postsLimit)
    );

    const posts = (await getDocs(postsQuery)).docs.map(postToJSON);
    console.log(posts);
    return posts;
}
/**
 *
 * @param {string} username
 * @param {string} slug (post title in kebab-case)
 * @returns {PostModel} Post with this slug
 */
export async function getPostByUsernameAndSlug(username: string, slug: string) {
    const postsRef = collectionGroup(firestore, 'posts');
    const postQuery = query(
        postsRef,
        where('slug', '==', slug),
        where('username', '==', username),
        limit(1)
    );
    const post = (await getDocs(postQuery)).docs[0];

    return postToJSON(post);
}

/**
 *
 * @param path the path where the new post should be saved in the Firebase DB
 * @param slug the post slug
 * @param data the Post entity with all of it's properties
 */
export async function createDocument(
    path: string,
    slug: string,
    data: PostModel
) {
    await setDoc(doc(firestore, `${path}/${slug}`), data);
}

export const fromMillis = Timestamp.fromMillis;
