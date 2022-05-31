import { useState } from 'react';
import PostFeed from '../components/PostFeed/PostFeed';
import {
    fromMillis,
    getPostsStartingFromWithLimit,
    getPostsWithLimit,
} from '../lib/firebase';
import { PostModel } from '../lib/globalTypes';
import { FieldValue, Timestamp } from '@firebase/firestore';
import Hero from '../components/Hero/Hero';

const LIMIT = 6;
export async function getServerSideProps() {
    const posts = await getPostsWithLimit(LIMIT);

    return {
        props: { posts },
    };
}

type Props = {
    posts: PostModel[];
};

export default function Home(props: Props) {
    const [posts, setPosts] = useState<PostModel[]>(props.posts);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    //Indicate if there are no more posts to be fetched from firestore
    const [postsEnd, setPostsEnd] = useState<boolean>(false);
    const getMorePosts = async () => {
        setIsLoading(true);
        const lastPost = posts[posts.length - 1];

        //Check the format of createdAt propery
        const lastPostTimestamp: Timestamp | FieldValue =
            typeof lastPost.createdAt === 'number'
                ? fromMillis(lastPost.createdAt)
                : lastPost.createdAt;

        const newPosts = await getPostsStartingFromWithLimit(
            LIMIT,
            lastPostTimestamp
        );

        setPosts(posts.concat(newPosts));
        setIsLoading(false);

        if (newPosts.length < LIMIT) {
            setPostsEnd(true);
        }
    };

    return (
        <main className="bg-white dark:bg-black flex flex-col">
            <Hero latestPosts={posts.slice(0, 3)} />
            <h2 className="text-center text-xl font-mono font-semibold underline">
                All Posts
            </h2>
            <PostFeed posts={posts} />
            {postsEnd ? (
                <p className="w-36 h-10 self-center py-1 px-2 mb-3 ">
                    No more posts :{'('}
                </p>
            ) : (
                <button
                    onClick={getMorePosts}
                    className="w-36 h-10 self-center py-1 px-2 mb-3 rounded-md border border-yellow-300 dark:border-[#090A0D] hover:bg-[#090A0D] hover:text-[#FFC929] hover:dark:bg-[#FFC929] hover:dark:text-[#090A0D] duration-300"
                >
                    See more
                </button>
            )}
        </main>
    );
}
