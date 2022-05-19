import React from 'react';
import Image from 'next/image';
import Loader from '../Loader/Loader';
import { UserModel } from '../../lib/globalTypes';

type Props = {
    user: UserModel;
};

export default function UserProfile({ user }) {
    return (
        <div className="flex flex-col flex-nowraps items-center">
            <div className="border-2 border-blue-500 rounded-full flex">
                <Image
                    className="rounded-full"
                    src={user.photoURL}
                    height={75}
                    width={75}
                    alt="profile photo"
                />
            </div>
            <p>
                <i>@{user.username}</i>
            </p>
            <h1>{user.displayName}</h1>
        </div>
    );
}
