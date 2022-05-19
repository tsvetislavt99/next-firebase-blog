import UserProfile from '../../components/UserProfile/UserProfile';
import PostFeed from '../../components/PostFeed/PostFeed';
import { getPostsByUser, getUserWithUsername } from '../../lib/firebase';

export async function getServerSideProps({ query }) {
    const { username } = query;
    const userDoc = await getUserWithUsername(username);

    let user = null;
    let posts = null;

    if (userDoc) {
        user = userDoc.data();
        posts = await getPostsByUser(user.uid);
    }

    return {
        props: { user, posts },
    };
}

export default function ProfilePage({ user, posts }) {
    return (
        <div className="my-10">
            <UserProfile user={user} />
            <PostFeed posts={posts} admin={false} />
        </div>
    );
}
