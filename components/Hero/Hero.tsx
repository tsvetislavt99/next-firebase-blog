import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { PostModel } from '../../lib/globalTypes';
import PostRow from './PostRow';

type Props = {
    latestPosts: PostModel[];
};

export default function Hero({ latestPosts }: Props) {
    return (
        <>
            <div className="w-full bg-[#FFC929] dark:bg-[#090A0D]">
                <section className="grid grid-rows-5 sm:grid-rows-4 grid-cols-3 gap-2 mx-5 sm:mx-16 xl:mx-32 mt-5">
                    <div className="col-span-full sm:col-span-1 row-span-1 sm:row-span-full">
                        <h1 className="font-sans font-bold text-3xl my-3 hover:text-white hover:underline select-none">
                            Next.js 12: Biggest Release Ever
                        </h1>
                        <p className="text-xs text-gray-700 dark:text-yellow-700">
                            <span className="">Most notable features: </span>
                            <span className=" font-semibold">
                                Rust Compiler
                            </span>
                            ,{' '}
                            <span className=" font-semibold">
                                Middleware (beta)
                            </span>
                            ,{' '}
                            <span className=" font-semibold">
                                React 18 Support
                            </span>
                            ,{' '}
                            <span className=" font-semibold">
                                Image AVIF Support
                            </span>
                        </p>
                    </div>
                    <div className="col-span-full sm:col-start-2 sm:col-end-2 row-start-2 row-end-4 sm:row-span-full">
                        <div className="relative h-[40vh] sm:h-full sm:w-full sm:mt-2 md:mt-0">
                            <Image
                                priority
                                className="object-contain"
                                src="/images/nextjs_hero.jpeg"
                                layout="fill"
                                alt="logo of Next.js"
                            />
                            <div className="z-10 absolute -bottom-1 sm:-left-1 text-sm hover:text-white">
                                <p className="flex flex-row flex-nowrap text-xs items-center bg-[#FFC929] dark:bg-[#090A0D] px-2 py-4 cursor-pointer">
                                    Go to Next.js official website
                                    <ArrowRightIcon className="h-3 w-3 ml-1" />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-full sm:col-start-3 sm:col-end-3 row-start-4 row-end-6 sm:row-span-full">
                        <p className="ml-2 mb-2 text-gray-700 dark:text-yellow-700">
                            Latests posts
                        </p>
                        {latestPosts.map((post: PostModel) => (
                            <PostRow
                                key={`${post.slug}+${post.uid}`}
                                post={post}
                            />
                        ))}
                    </div>
                </section>
            </div>
            <div className="z-10 mt-0 w-full h-24 bg-dividerLight dark:bg-dividerDark" />
        </>
    );
}
