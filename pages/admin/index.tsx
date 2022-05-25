import { useEffect, useState } from 'react';
import RouteGuard from '../../components/RouteGuard/RouteGuard';
import PostFeed from '../../components/PostFeed/PostFeed';
import { auth, getPostsByUser, createDocument } from '../../lib/firebase';
import { PostModel } from '../../lib/globalTypes';

export default function AdminPostsPage() {
    return (
        <main>
            <RouteGuard>
                <section className="bg-gray-300 dark:bg-gray-800 pt-5">
                    <PostList />
                </section>
            </RouteGuard>
        </main>
    );
}

function PostList() {
    const [posts, setPosts] = useState<PostModel[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const getPosts = async () => {
            const postsArr = await getPostsByUser(auth.currentUser.uid);

            setPosts(postsArr);
            setIsLoading(false);
        };

        getPosts();
    }, []);

    //TODO: Add the loader component
    if (isLoading) {
        return null;
    }

    return (
        <>
            <h1 className="text-center text-lg font-mono">Manage your Posts</h1>
            <PostFeed posts={posts} admin />
        </>
    );
}
