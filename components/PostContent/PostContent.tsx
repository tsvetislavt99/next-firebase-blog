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
            : post.createdAt.toDate();

    return (
        <div className="flex flex-col flex-nowrap items-center bg-white w-5/6 mx-auto mt-20">
            <h1>{post?.title}</h1>
            <span className="text-sm">
                Written by{' '}
                <Link href={`/${post.username}/`}>
                    <a className="text-info">@{post.username}</a>
                </Link>{' '}
                on {createdAt.toISOString()}
            </span>
            <ReactMarkdown>{post?.content}</ReactMarkdown>
        </div>
    );
}
