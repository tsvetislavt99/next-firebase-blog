import { serverTimestamp } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../../lib/context';
import { auth, createDocument } from '../../lib/firebase';
import { PostModel } from '../../lib/globalTypes';
import { kebabize } from '../../lib/utils';

export default function CreateNewPost() {
    const router = useRouter();
    const { username } = useContext(UserContext);
    const [title, setTitle] = useState<string>('');

    // Ensure slug is URL safe
    const slug = encodeURI(kebabize(title));

    // Validate length
    const isValid = title.length > 3 && title.length < 100;

    // Create a new post in firestore
    const createPost = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const uid = auth.currentUser.uid;
        const path = `users/${uid}/posts`;
        const data: PostModel = {
            title,
            slug,
            uid,
            username,
            published: false,
            content: '# hello world!',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            heartCount: 0,
        };
        await createDocument(path, slug, data);
        toast.success('Post created!');

        router.push(`/admin/${slug}`);
    };

    return (
        <section className="flex flex-col items-center">
            <form onSubmit={createPost}>
                <h1 className="text-center text-2xl font-mono underline mb-5">
                    Post name:
                </h1>
                <input
                    className="px-2 py-2 text-lg rounded-full dark:bg-gray-500 dark:text-[#FFC929] focus:outline-none mb-1"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="My Awesome Article!"
                />
                <p className=" text-center">
                    <strong>Your slug will be:</strong>
                </p>
                <p className=" text-center">{slug || 'awesome-slug...'}</p>
                <button
                    type="submit"
                    disabled={!isValid}
                    className="py-2 px-4 mt-5 border-2 border-white dark:border-yellow-500 rounded-full hover:scale-105 duration-500"
                >
                    Create And Start Writing
                </button>
            </form>
        </section>
    );
}
