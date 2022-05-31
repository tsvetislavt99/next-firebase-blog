import React from 'react';
import Link from 'next/link';
import { PostModel } from '../../lib/globalTypes';
import { Timestamp } from '@firebase/firestore';

type Props = {
    posts: PostModel[];
    admin?: boolean;
};

export default function PostFeed({ posts, admin }: Props) {
    return posts ? (
        <section className="grid gap-2 grid-cols-1 sm:grid-cols-2 grid-rows-6 sm:grid-rows-3 m:mx-16 xl:mx-44 mt-5">
            {posts.map((post: PostModel) => (
                <PostItem post={post} key={post.slug} admin={admin} />
            ))}
        </section>
    ) : null;
}

function PostItem({ post, admin }) {
    // Naive method to calculate word count and read time
    const wordCount = post?.content.trim().split(/\s+/g).length;
    const minutesToRead = (wordCount / 100 + 1).toFixed(0);

    const createdAt =
        typeof post?.createdAt === 'number'
            ? new Date(post.createdAt)
            : (post.createdAt! as Timestamp).toDate();

    return (
        <div className="row-span-1 sm:col-span-1 flex flex-col flex-nowrap w-4/5 mx-auto mb-3 p-2 border-r-2 border-[#FFC929] dark:border-yellow-600">
            <Link href={`/${post.username}`}>
                <a className="font-mono hover:child:text-blue-500 text-xs">
                    By <span>@{post.username}</span>
                </a>
            </Link>

            <Link href={`/${post.username}/${post.slug}`}>
                <h2 className="text-lg font-semibold hover:text-[#FFC929] dark:hover:text-white hover:underline cursor-pointer">
                    <a>{post.title}</a>
                </h2>
            </Link>

            <footer className="flex flex-row justify-between text-xs cursor-default pr-2">
                <span>~{minutesToRead} min read</span>
                <span>
                    {createdAt
                        .toISOString()
                        .substring(0, 10)
                        .replaceAll('-', '/')}{' '}
                </span>
                <span className="">{post.heartCount || 0} ❤️</span>
            </footer>

            {/* If admin view, show extra controls for user (styles not implemented yet) */}
            {admin && (
                <section className="text-xs mt-3 flex flex-row flex-nowrap justify-between">
                    <Link href={`/admin/${post.slug}`}>
                        <h3>
                            <button className="">Edit</button>
                        </h3>
                    </Link>
                    {post.published ? (
                        <p className="">Status: Live</p>
                    ) : (
                        <p className="">Status: Unpublished</p>
                    )}
                </section>
            )}
        </div>
    );
}
