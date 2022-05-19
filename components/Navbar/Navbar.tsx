import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';

export default function Navbar() {
    const { user, username, loading } = useContext(UserContext);

    return (
        <nav className="mx-6 sm:mx-12 md:mx-24 lg:mx-36 my-4">
            <ul className="flex flex-row flex-nowrap justify-between items-center">
                <li>
                    <Link href="/">
                        <button className="text-white text-lg sm:text-2xl font-bold bg-black px-2 py-1 sm:px-4 sm:py-2 rounded-md">
                            FEED
                        </button>
                    </Link>
                </li>
                {loading ? null : (
                    <>
                        <UserContent user={user} username={username} />
                        <GuestContent username={username} />
                    </>
                )}
            </ul>
        </nav>
    );
}

function GuestContent({ username }) {
    if (!username) {
        return (
            <li>
                <Link href="/enter">
                    <button className="text-white font-bold bg-blue-500 text-sm px-2 py-1 sm:px-4 sm:py-3 sm:text-base rounded-md">
                        Log in
                    </button>
                </Link>
            </li>
        );
    } else {
        return null;
    }
}

function UserContent({ user, username }) {
    if (user && username) {
        return (
            <>
                <li className="flex flex-row flex-nowrap items-center">
                    <Link href="/admin">
                        <button className="text-white font-bold bg-blue-500 text-xs px-2 py-1 sm:text-base sm:px-3 sm:py-2 rounded-md">
                            Create a Post
                        </button>
                    </Link>
                    <SignOutButton />
                    <Link href={`/${username}`}>
                        <a className="flex items-center border-blue-500 border-2 sm:border-4 rounded-full ml-4 w-6 h-6 sm:w-12 sm:h-12">
                            <Image
                                className="rounded-full p-0 m-0"
                                src={
                                    user?.photoURL ||
                                    'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg'
                                }
                                alt="Profile photo"
                                width={40}
                                height={40}
                            />
                        </a>
                    </Link>
                </li>
            </>
        );
    } else {
        return null;
    }
}

function SignOutButton() {
    const handleSignOut = async () => {
        signOut(auth)
            .then(() => {
                toast.success('Signed out succeffully!');
            })
            .catch((error) => {
                toast.error(
                    'Ooops... We could not sign you out! Please try again!'
                );
                console.log(error);
            });
    };

    return (
        <button
            className="flex flex-row flex-nowrap justify-center bg-gray-200 px-2 py-2 rounded-md hover:bg-gray-300 ml-3"
            onClick={handleSignOut}
        >
            <p className="text-center">Sign Out</p>
        </button>
    );
}
