import { User } from 'firebase/auth';
import { FieldValue, Timestamp } from 'firebase/firestore';

export type UserContextParams = {
    user: User | null;
    username: string | null;
    loading: boolean;
};

export type UserModel = {
    displayName: string;
    photoURL: string;
    username: string;
    uid: string;
};

export type PostModel = {
    title: string;
    content: string;
    published: boolean;
    slug: string;
    uid: string;
    username: string;
    heartCount: number;
    createdAt: Timestamp | FieldValue;
    updatedAt: Timestamp | FieldValue;
};
