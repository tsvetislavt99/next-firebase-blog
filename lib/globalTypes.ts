import { User } from 'firebase/auth';

export type UserContextParams = {
    user: User | null;
    username: string | null;
    loading: boolean;
};

export type UserModel = {
    displayName: string;
    photoURL: string;
    username: string;
};

export type PostModel = {
    title: string;
    content: string;
    published: boolean;
    slug: string;
    uid: string;
    username: string;
    heartCount: number;
    createdAt: Date;
    updatedAt: Date;
};
