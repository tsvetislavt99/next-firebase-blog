import { PostModel } from '../../lib/globalTypes';
import PostRow from './PostRow';
import HighlightedNews from './HighlightedNews/HighlightedNews';
import ImageSection from './ImageSection/ImageSection';

type Props = {
    latestPosts: PostModel[];
};

export default function Hero({ latestPosts }: Props) {
    return (
        <>
            <div className="w-full bg-[#FFC929] dark:bg-[#090A0D]">
                <section className="grid grid-rows-5 sm:grid-rows-4 grid-cols-3 gap-2 mx-5 sm:mx-16 xl:mx-44 mt-5">
                    <HighlightedNews />
                    <ImageSection />
                    {
                        //Last section of the hero with the top 3 trending posts
                    }
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
