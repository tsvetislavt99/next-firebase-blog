import toast from 'react-hot-toast';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { signInWithPopup } from 'firebase/auth';
import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/context';
import { getDoc, doc, writeBatch } from 'firebase/firestore';

export default function Enter() {
    const { user, username } = useContext(UserContext);
    const router = useRouter();
    //Content to be shown if the user is a guest and has not started the registration proccess
    const guestContent: JSX.Element = (
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

    if (user && username) {
        router.push('/');
    }

    return (
        <main>
            <Head>
                <title>Sign in</title>
            </Head>
            {user ? !username ? <UsernameForm /> : null : guestContent}
        </main>
    );
}

//Sign in with google button
function SignInButton(): JSX.Element {
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleAuthProvider);
        } catch (error) {
            toast.error(
                'Sorry... There was a problem with your log in! Please try to log in again'
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

//Used to validate username
function UsernameForm(): JSX.Element {
    const [usernameInputValue, setUsernameInputValue] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { user } = useContext(UserContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //Create refs
        const userDoc = doc(firestore, 'users', user.uid);
        const usernameDoc = doc(firestore, 'usernames', usernameInputValue);

        //Commit both docs as batch
        try {
            const batch = writeBatch(firestore);
            batch.set(userDoc, {
                username: usernameInputValue,
                photoURL: user.photoURL,
                displayName: user.displayName,
                uid: user.uid,
            });
            batch.set(usernameDoc, { uid: user.uid });
            await batch.commit();

            toast.success(
                `Account created succeffully! Welcome ${usernameInputValue}`
            );
        } catch (error) {
            toast.error(
                'Username selection could not be saved! Please try again...'
            );
            console.log(error);
        }
    };

    const handleUsernameChange = (e: React.FormEvent<HTMLInputElement>) => {
        const inputEl = e.target as HTMLInputElement;
        const valueRaw: string = inputEl.value;
        const value: string = valueRaw.toLocaleLowerCase();

        const usernameRegex =
            /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        //Only set form value if length is > 3 and it contains the correct chars
        if (value.length < 3) {
            setUsernameInputValue(valueRaw);
            setIsLoading(false);
            setIsValid(false);
        }

        if (usernameRegex.test(value)) {
            setUsernameInputValue(valueRaw);
            setIsLoading(true);
            setIsValid(false);
        }
    };

    //Check in firestore for a user with the same username (#TODO: useCallback)
    useEffect(() => {
        const checkUserName = async (username: string) => {
            if (username.length >= 3) {
                const ref = doc(firestore, 'usernames', `${username}`);
                const document = await getDoc(ref);
                console.log('Firestore read executed!');
                setIsValid(!document.exists());
                setIsLoading(false);
            }
        };

        checkUserName(usernameInputValue);
    }, [usernameInputValue]);

    return (
        <section className="flex flex-col justify-start items-center my-5">
            <h2 className="font-semibold text-lg mb-5">Choose a username</h2>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col flex-nowrap h-[60vh] sm:h-36 justify-start"
            >
                <input
                    className={
                        isValid
                            ? 'sm:text-lg py-1 px-4 border-2 rounded-full border-green-400  focus:outline-none focus:border-green-400'
                            : 'sm:text-lg py-1 px-4 border-2 rounded-full border-red-400  focus:outline-none focus:border-red-400'
                    }
                    name="username"
                    placeholder="ex. JonDoe"
                    value={usernameInputValue}
                    onChange={handleUsernameChange}
                />
                <UsernameMessage
                    username={usernameInputValue}
                    isValid={isValid}
                    loading={isLoading}
                />
                <button
                    type="submit"
                    className="py-2 px-4 bg-blue-500 rounded-full text-white disabled:opacity-50 mt-5 w-[75%] mx-auto"
                    disabled={!isValid}
                >
                    Choose
                </button>
            </form>
        </section>
    );
}

//Changes depending on UsernameForm state
function UsernameMessage({ username, isValid, loading }): JSX.Element {
    if (loading) {
        return (
            <p className="h-2 text-xs ml-4 p-0 m-0 text-yellow-300">
                Checking...
            </p>
        );
    } else if (isValid) {
        return (
            <p className="h-2 text-xs ml-4 p-0 m-0 text-green-400">
                {username} is available!
            </p>
        );
    } else if (username && !isValid) {
        return (
            <p className="h-2 text-xs ml-4 p-0 m-0 text-red-500">
                Username is invalid!
            </p>
        );
    } else {
        return <p className="h-2 text-xs ml-4 p-0 m-0"></p>;
    }
}
