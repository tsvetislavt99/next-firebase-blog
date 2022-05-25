import React from 'react';
import Image from 'next/image';
import Loader from '../Loader/Loader';
import { UserModel } from '../../lib/globalTypes';

type Props = {
    user: UserModel;
};

export default function UserProfile({ user }: Props) {
    return (
        <div className="flex flex-row sm:flex-col flex-nowraps items-center justify-between mx-5">
            <div className="border-2 border-yellow-500 dark:border-yellow-700 rounded-full flex">
                <Image
                    className="rounded-full"
                    src={user.photoURL}
                    height={75}
                    width={75}
                    alt="profile photo"
                />
            </div>
            <div>
                <p>
                    <i>@{user.username}</i>
                </p>
                <h1>{user.displayName}</h1>
            </div>
        </div>
    );
}
