import PostContent from '../../components/PostContent/PostContent';
import {
    firestore,
    getAllPosts,
    getPostByUsernameAndSlug,
    getUserWithUsername,
} from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { PostModel } from '../../lib/globalTypes';
import { doc } from '@firebase/firestore';

type Cntx = {
    params: {
        username: string;
        slug: string;
    };
};

export async function getStaticProps({ params }: Cntx) {
    const { username, slug } = params;

    const userData = await getUserWithUsername(username);
    let post: PostModel;

    //TODO: Add a custom 404 once I start updating UI
    if (!userData) {
        return {
            notFound: true,
        };
    }

    if (userData) {
        post = await getPostByUsernameAndSlug(username, slug);
    }

    return {
        props: {
            post,
            postPath: `users/${userData.data().uid}/posts/${post.slug}`,
        },
        revalidate: 120,
    };
}

export async function getStaticPaths() {
    const posts = await getAllPosts();
    const paths = posts.map((post: PostModel) => {
        const { slug, username } = post;
        return {
            params: { username, slug },
        };
    });

    return {
        paths,
        fallback: 'blocking',
    };
}

export default function PostPage({ post, postPath }) {
    const postRef = doc(firestore, postPath);
    //Get realtime post so the data on the post page is changed in case of edits
    const [realtimePost] = useDocumentData(postRef);

    const postEl = realtimePost || post;

    return (
        <main>
            <section>
                <PostContent post={postEl} postRef={postRef} />
            </section>
        </main>
    );
}
