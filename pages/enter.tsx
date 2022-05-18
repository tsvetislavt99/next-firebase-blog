import toast from 'react-hot-toast';
import Image from 'next/image';
import { auth, googleAuthProvider } from '../lib/firebase';

export default function Enter() {
    const { user, username } = { user: null, username: null };

    return (
        <div className="flex flex-col justify-between items-center my-5">
            <div className="flex flex-col items-center">
                <h2 className="font-semibold text-lg mb-5">
                    Sign in with email
                </h2>
                <div>
                    <Image
                        src="/images/img-under-construction.png"
                        width={200}
                        height={200}
                        alt="under construction"
                    />
                </div>
            </div>
            <div className="w-[75%] my-6 mx-6 sm:mx-12 md:mx-24 lg:mx-36 flex flex-row justify-between items-center">
                <div className="w-[43%] border-b border-gray-300" />
                <p className="font-bold text-lg p-0 m-0 text-gray-400">OR</p>
                <div className="w-[43%] border-b border-gray-300" />
            </div>
            <SignInButton />
        </div>
    );
}

function SignInButton() {
    const signInWithGoogle = async () => {
        try {
            await auth.signInWithPopup(googleAuthProvider);
        } catch (error) {
            toast.error(
                'Sorry... There was a problem with yout log in! Please try to log in again'
            );
            console.log(error);
        }
    };

    return (
        <button
            className="flex flex-row flex-nowrap justify-between items-center bg-gray-200 px-2 py-4 rounded-md hover:bg-gray-300"
            onClick={signInWithGoogle}
        >
            <Image
                src="/images/icons/googleG.svg"
                layout="intrinsic"
                width={20}
                height={20}
                alt="google logo"
            />{' '}
            <p className="ml-2">Sign in with Google</p>
        </button>
    );
}

function SignOutButton() {}

function UsernameForm() {}
