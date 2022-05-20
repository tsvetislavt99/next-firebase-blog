import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import RouteGuard from '../../components/RouteGuard/RouteGuard';
import PostFeed from '../../components/PostFeed/PostFeed';
import { UserContext } from '../../lib/context';
import { auth, getPostsByUser, createDocument } from '../../lib/firebase';
import { kebabize } from '../../lib/utils';
import { serverTimestamp } from 'firebase/firestore';
import { PostModel } from '../../lib/globalTypes';

export default function AdminPostsPage(props) {
    return (
        <main>
            <RouteGuard>
                <>
                    <PostList />
                    <CreateNewPost />
                </>
            </RouteGuard>
        </main>
    );
}

function PostList() {
    const [posts, setPosts] = useState<PostModel[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    console.log('hi mom');
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
            <h1>Manage your Posts</h1>
            <PostFeed posts={posts} admin />
        </>
    );
}

function CreateNewPost() {
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
        <form onSubmit={createPost}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Awesome Article!"
            />
            <p>
                <strong>Slug:</strong> {slug}
            </p>
            <button type="submit" disabled={!isValid} className="">
                Create New Post
            </button>
        </form>
    );
}
