import React from 'react';

//TODO: Make dyncamic
export default function HighlightedNews() {
    return (
        <div className="col-span-full sm:col-span-1 row-span-1 sm:row-span-full">
            <h1 className="font-sans font-bold text-3xl my-3 hover:text-white hover:underline select-none">
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://nextjs.org/blog/next-12"
                >
                    Next.js 12: Biggest Release Ever
                </a>
            </h1>
            <p className="text-xs text-gray-700 dark:text-yellow-700">
                <span className="">Most notable features: </span>
                <span className=" font-semibold">Rust Compiler</span>,{' '}
                <span className=" font-semibold">Middleware (beta)</span>,{' '}
                <span className=" font-semibold">React 18 Support</span>,{' '}
                <span className=" font-semibold">Image AVIF Support</span>
            </p>
        </div>
    );
}
