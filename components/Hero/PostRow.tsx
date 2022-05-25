import { ArrowRightIcon } from '@heroicons/react/solid';
import { Timestamp } from 'firebase/firestore';
import Link from 'next/link';
import { PostModel } from '../../lib/globalTypes';

type Props = {
    post: PostModel;
};

export default function PostRow({ post }: Props) {
    const createdAt =
        typeof post?.createdAt === 'number'
            ? new Date(post.createdAt)
            : (post.createdAt! as Timestamp).toDate();

    return (
        <div className="flex flex-col flex-nowrap border-b border-yellow-700">
            <Link href={`/${post.username}/${post.slug}`}>
                <div className="flex flex-row flex-nowrap items-center justify-between ml-2 mr-4 mb-2 hover:text-white cursor-pointer">
                    <h1 className="text-xl sm:text-lg sm:font-semibold md:text-xl hover:underline">
                        {post.title}
                    </h1>
                    <ArrowRightIcon className="h-3 w-3" />
                </div>
            </Link>

            <p className="ml-2 text-xs mb-1 text-gray-700 dark:text-yellow-600">
                Likes: {post.heartCount} |{' '}
                {createdAt.toISOString().substring(0, 10)}
            </p>
        </div>
    );
}
