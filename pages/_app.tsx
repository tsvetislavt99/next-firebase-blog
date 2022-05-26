import { Toaster } from 'react-hot-toast';
import { ModalProvider, UserProvider } from '../lib/context';
import Navbar from '../components/Navbar/Navbar';
import '../styles/globals.css';
import { useUserData } from '../lib/hooks';
import Footer from '../components/Footer/Footer';

function MyApp({ Component, pageProps }) {
    const userData = useUserData();

    return (
        <>
            <UserProvider value={userData}>
                <ModalProvider>
                    <Navbar />
                    <Component {...pageProps} />
                    <Toaster />
                    <Footer />
                </ModalProvider>
            </UserProvider>
        </>
    );
}

export default MyApp;
