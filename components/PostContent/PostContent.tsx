import { Timestamp } from 'firebase/firestore';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { PostModel } from '../../lib/globalTypes';

type Props = {
    post: PostModel;
};

// UI component for main post content
export default function PostContent({ post }: Props) {
    const createdAt =
        typeof post?.createdAt === 'number'
            ? new Date(post.createdAt)
            : (post.createdAt! as Timestamp).toDate();

    return (
        <div className="flex flex-col flex-nowrap items-start bg-white dark:bg-gray-600 w-11/12 sm:w-5/6 mx-auto my-5 p-2 sm:p-5 rounded-lg">
            <h1 className="font-mono font-bold text-3xl">{post?.title}</h1>
            <span className="text-xs mb-5 dark:text-white">
                Written by{' '}
                <Link href={`/${post.username}/`}>
                    <a className="font-mono hover:text-blue-500">
                        @{post.username}
                    </a>
                </Link>{' '}
                on {createdAt.toISOString().substring(0, 10)}
            </span>
            <article className="prose dark:prose-invert">
                <ReactMarkdown>{post?.content}</ReactMarkdown>
            </article>
        </div>
    );
}
