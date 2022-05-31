import React from 'react';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/solid';

//TODO: Make dyncamic
export default function ImageSection() {
    return (
        <div className="col-span-full sm:col-start-2 sm:col-end-2 row-start-2 row-end-4 sm:row-span-full">
            <div className="relative h-[40vh] sm:h-full sm:w-full sm:-mt-5 md:mt-0">
                <Image
                    priority
                    className="object-contain"
                    src="/images/nextjs_hero.jpeg"
                    layout="fill"
                    alt="logo of Next.js"
                />
                <div className="z-10 absolute left-0 right-0 bottom-0 mx-auto text-sm hover:text-white">
                    <p className="flex flex-row flex-nowrap text-xs justify-center items-center bg-[#FFC929] dark:bg-[#090A0D] px-2 py-4 cursor-pointer">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://nextjs.org/"
                        >
                            Go to Next.js official website
                        </a>
                        <ArrowRightIcon className="h-3 w-3 ml-1" />
                    </p>
                </div>
            </div>
        </div>
    );
}
