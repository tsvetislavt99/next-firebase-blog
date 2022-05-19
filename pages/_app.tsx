import { Toaster } from 'react-hot-toast';
import { UserProvider } from '../lib/context';
import Navbar from '../components/Navbar/Navbar';
import '../styles/globals.css';
import { useUserData } from '../lib/hooks';

function MyApp({ Component, pageProps }) {
    const userData = useUserData();

    return (
        <>
            <UserProvider value={userData}>
                <Navbar />
                <Component {...pageProps} />
                <Toaster />
            </UserProvider>
        </>
    );
}

export default MyApp;
