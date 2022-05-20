import Link from 'next/link';
import { Children, useContext } from 'react';
import { UserContext } from '../../lib/context';

type Props = {
    children: JSX.Element;
};

// Component's children only shown to logged-in users
export default function RouteGuard(props: Props) {
    const { username } = useContext(UserContext);

    return username ? (
        props.children
    ) : (
        <Link href="/enter">You must be signed in</Link>
    );
}
