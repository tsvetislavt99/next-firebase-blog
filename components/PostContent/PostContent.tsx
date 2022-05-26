import { DocumentReference, Timestamp } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { auth } from '../../lib/firebase';
import { PostModel } from '../../lib/globalTypes';
import HeartButton from '../HeartButton/HeartButton';

type Props = {
    post: PostModel;
    postRef: DocumentReference;
};

// UI component for main post content
export default function PostContent({ post, postRef }: Props) {
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [canEdit, setCanEdit] = useState(false);

    useEffect(() => {
        if (auth?.currentUser?.uid) {
            if (auth.currentUser.uid === post.uid) {
                setCanEdit(true);
                setIsAuthLoading(false);
            } else {
                setIsAuthLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth?.currentUser?.uid]);

    const createdAt =
        typeof post?.createdAt === 'number'
            ? new Date(post.createdAt)
            : (post.createdAt! as Timestamp).toDate();

    return (
        <div className="flex flex-col flex-nowrap items-start bg-white dark:bg-gray-600 w-11/12 sm:w-5/6 mx-auto my-5 p-2 sm:p-5 rounded-lg">
            <h1 className="font-mono font-bold text-3xl">{post?.title}</h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between sm:w-full">
                <span className="text-xs mb-5 dark:text-white">
                    Written by{' '}
                    <Link href={`/${post.username}/`}>
                        <a className="font-mono hover:text-blue-500">
                            @{post.username}
                        </a>
                    </Link>{' '}
                    on {createdAt.toISOString().substring(0, 10)}
                </span>
                <div>
                    <HeartButton postRef={postRef} />

                    {isAuthLoading ? null : canEdit ? (
                        <Link href={`/admin/${post.slug}`}>
                            <button className="py-1 px-2 mb-3 ml-2 rounded-md border border-yellow-300 dark:border-[#090A0D] hover:scale-105 duration-300">
                                Edit Post
                            </button>
                        </Link>
                    ) : null}
                </div>
            </div>
            <article className="prose dark:prose-invert">
                <ReactMarkdown>{post?.content}</ReactMarkdown>
            </article>
        </div>
    );
}
