import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head />
            <body className="text-[#090A0D] dark:text-[#FFC929] bg-[#FFC929] dark:bg-[#090A0D]">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
