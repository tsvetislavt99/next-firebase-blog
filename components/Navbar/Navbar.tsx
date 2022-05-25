import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { MenuIcon, XIcon, CodeIcon } from '@heroicons/react/solid';
import { signOut, User } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useContext, useState } from 'react';
import { UserContext } from '../../lib/context';
import ThemeToggler from '../ThemeToggler/ThemeToggler';

export default function Navbar() {
    const { user, username, loading } = useContext(UserContext);
    const [nav, setNav] = useState(false);

    const isGuest = username ? false : true;

    //Toggle/Close mobile navigation
    const handleNav = () => {
        setNav((currState) => !currState);
    };

    return (
        <header className="flex flex-row justify-between items-start sm:mt-5 sm:w-5/6 mx-auto pb-5">
            <div className="flex flex-row flex-nowrap justify-between items-center mt-5 ml-4 z-10">
                <Link href="/">
                    <CodeIcon className="h-8 w-8" />
                </Link>
            </div>
            {
                //Mobile navigation
            }
            <div className="sm:hidden flex flex-row justify-between mt-4 mr-4  z-10">
                <div
                    className={
                        nav
                            ? 'fixed left-0 top-0 w-4/6 h-screen border-r border-[#FFC929] ease-out duration-700 bg-gradient-to-r from-slate-50/100 dark:from-[#090A0D] to-gray-200 dark:to-gray-900 '
                            : 'fixed left-[-100%]'
                    }
                >
                    <ul className="font-mono mt-4 ml-4 ">
                        <li className="mb-16">
                            <CodeIcon className="h-8 w-8" />
                        </li>
                        {user && username && (
                            <>
                                <li className="mb-3">Write</li>
                                <li className="mb-3">
                                    <Link href={`/admin`}>My posts</Link>
                                </li>
                                <li className="mb-3">
                                    <Link href={`/${username}`}>Profile</Link>
                                </li>
                                <li>
                                    <SignOutButton />
                                </li>
                            </>
                        )}
                        {isGuest && (
                            <>
                                <li className="mb-3">
                                    <Link href="/enter">Sign in</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <div className="flex flex-row flex-nowrap">
                    <ThemeToggler mobile={true} />
                    <div onClick={handleNav} className="ml-2 block sm:hidden">
                        {nav ? (
                            <XIcon className="h-8 w-8" />
                        ) : (
                            <MenuIcon className="h-8 w-8" />
                        )}
                    </div>
                </div>
            </div>
            {
                //Desktop navigation
            }
            <div className="hidden sm:flex flex-row flex-nowrap justify-between items-center w-full mt-5">
                <ul className="flex flex-row flex-nowrap items-center font-mono">
                    {user && username && (
                        <>
                            <li className="ml-6 mr-3 z-10 hover:text-white select-none">
                                Write
                            </li>
                            <li className="mx-3 z-10 hover:text-white">
                                <Link href={`/admin`}>My posts</Link>
                            </li>
                            <li className="mx-3 z-10 hover:text-white">
                                <Link href={`/${username}`}>Profile</Link>
                            </li>

                            <li className="mx-3 z-10 hover:text-white">
                                <SignOutButton />
                            </li>
                        </>
                    )}
                    {isGuest && (
                        <>
                            <li className="mx-3 z-10">
                                <Link href="/enter">Sign in</Link>
                            </li>
                        </>
                    )}
                </ul>
                <div className="flex flex-row flex-nowrap items-center z-10">
                    <span className="hidden xl:block font-mono">Theme:</span>
                    <ThemeToggler mobile={false} />
                </div>
            </div>
        </header>
    );
}

type GuestContentProps = {
    isGuest: boolean;
};

function GuestContent({ isGuest }: GuestContentProps) {
    if (isGuest) {
        return (
            <li>
                <Link href="/enter">Sign in</Link>
            </li>
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
        <button className="" onClick={handleSignOut}>
            <p className="text-center">Sign Out</p>
        </button>
    );
}
