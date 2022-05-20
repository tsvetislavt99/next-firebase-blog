import UserProfile from '../../components/UserProfile/UserProfile';
import PostFeed from '../../components/PostFeed/PostFeed';
import { getPostsByUser, getUserWithUsername } from '../../lib/firebase';
import { PostModel, UserModel } from '../../lib/globalTypes';

type Cntx = {
    query: {
        username: string;
    };
};

export async function getServerSideProps({ query }: Cntx) {
    const { username } = query;
    const userDoc = await getUserWithUsername(username);

    let user: UserModel;
    let posts: PostModel[];

    if (userDoc) {
        user = {
            displayName: userDoc.data().displayName,
            photoURL: userDoc.data().photoURL,
            username: userDoc.data().username,
            uid: userDoc.data().uid,
        };
        posts = await getPostsByUser(user.uid);
    }

    return {
        props: { user, posts },
    };
}

type Props = {
    user: UserModel;
    posts: PostModel[];
};

export default function ProfilePage({ user, posts }: Props) {
    return (
        <main className="mt-10 pt-5 bg-gray-200 h-screen">
            <UserProfile user={user} />
            <PostFeed posts={posts} admin={false} />
        </main>
    );
}
