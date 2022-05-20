import React from 'react';
import Link from 'next/link';
import { PostModel } from '../../lib/globalTypes';

type Props = {
    posts: PostModel[];
    //Temporary set to any until admin functionality is implemented
    admin?: boolean;
};

export default function PostFeed({ posts, admin }: Props) {
    console.log(posts);
    return posts ? (
        <>
            {posts.map((post: PostModel) => (
                <PostItem post={post} key={post.slug} admin={admin} />
            ))}
        </>
    ) : null;
}

function PostItem({ post, admin }) {
    // Naive method to calc word count and read time
    const wordCount = post?.content.trim().split(/\s+/g).length;
    const minutesToRead = (wordCount / 100 + 1).toFixed(0);

    return (
        <div className="flex flex-col flex-nowrap w-[80%] mx-auto my-5 border border-gray-400 py-3 px-5 rounded-lg bg-blue-100">
            <Link href={`/${post.username}`}>
                <a>
                    <strong>By @{post.username}</strong>
                </a>
            </Link>

            <Link href={`/${post.username}/${post.slug}`}>
                <h2>
                    <a>{post.title}</a>
                </h2>
            </Link>

            <footer className="flex flex-row justify-between">
                <span>
                    {wordCount} words. ~{minutesToRead} min read
                </span>
                <span className="push-left">
                    💗 {post.heartCount || 0} Hearts
                </span>
            </footer>

            {/* If admin view, show extra controls for user (styles not implemented yet) */}
            {admin && (
                <>
                    <Link href={`/admin/${post.slug}`}>
                        <h3>
                            <button className="">Edit</button>
                        </h3>
                    </Link>

                    {post.published ? (
                        <p className="">Live</p>
                    ) : (
                        <p className="">Unpublished</p>
                    )}
                </>
            )}
        </div>
    );
}
