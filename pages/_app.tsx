import { Toaster } from 'react-hot-toast';
import { UserProvider } from '../lib/context';
import Navbar from '../components/Navbar/Navbar';
import '../styles/globals.css';
import { useUserData } from '../lib/hooks';
import Footer from '../components/Footer/Footer';

function MyApp({ Component, pageProps }) {
    const userData = useUserData();

    return (
        <>
            <UserProvider value={userData}>
                <Navbar />
                <Component {...pageProps} />
                <Toaster />
                <Footer />
            </UserProvider>
        </>
    );
}

export default MyApp;
