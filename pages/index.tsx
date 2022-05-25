import { useState } from 'react';
import PostFeed from '../components/PostFeed/PostFeed';
import Loader from '../components/Loader/Loader';
import {
    fromMillis,
    getPostsStartingFromWithLimit,
    getPostsWithLimit,
} from '../lib/firebase';
import { PostModel } from '../lib/globalTypes';
import { FieldValue, Timestamp } from 'firebase/firestore';
import Hero from '../components/Hero/Hero';

const LIMIT = 10;
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
        <main className="bg-white dark:bg-black">
            <Hero latestPosts={posts.slice(0, 3)} />
            <PostFeed posts={posts} />
        </main>
    );
}
