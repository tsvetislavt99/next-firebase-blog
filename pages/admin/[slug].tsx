import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
    deleteDoc,
    doc,
    DocumentData,
    DocumentReference,
    serverTimestamp,
    updateDoc,
} from '@firebase/firestore';
import RouteGuard from '../../components/RouteGuard/RouteGuard';
import { firestore, auth } from '../../lib/firebase';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import Modal from '../../components/Modal/Modal';

export default function AdminPostEdit() {
    return (
        <RouteGuard>
            <PostManager />
        </RouteGuard>
    );
}

function PostManager() {
    const [preview, setPreview] = useState<boolean>(false);

    const router = useRouter();
    const { slug } = router.query;

    const postRef = doc(
        firestore,
        `users/${auth.currentUser.uid}/posts/${slug}`
    );
    const [post] = useDocumentData(postRef);

    return (
        <main className="">
            {post && (
                <>
                    <section className="flex flex-col flex-nowrap w-11/12 sm:w-5/6 mx-auto mt-5 bg-gray-50 dark:bg-gray-500 p-3 rounded-lg">
                        <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5">
                            <div>
                                <h1 className="font-mono font-semibold text-xl">
                                    {post.title}
                                </h1>
                                <p className="text-xs font-semibold">
                                    Slug:{' '}
                                    <span className="font-mono font-extralight">
                                        {post.slug}
                                    </span>
                                </p>
                            </div>
                            <aside className="flex flex-col flex-nowrap items-start mt-5 sm:mt-0">
                                <button
                                    className="py-0.5 px-1  mb-1 ml-2 text-sm rounded-md border border-yellow-300 dark:border-[#090A0D] hover:scale-105 duration-300"
                                    onClick={() => setPreview(!preview)}
                                >
                                    {preview ? 'Hide' : 'Preview'}
                                </button>
                                <Link href={`/${post.username}/${post.slug}`}>
                                    <button className="py-0.5 px-1 mb-1 ml-2 text-sm text-green-500 rounded-md border border-yellow-300 dark:border-[#090A0D] hover:scale-105 duration-300">
                                        Live view
                                    </button>
                                </Link>
                            </aside>
                        </section>
                        <ImageUploader />
                        <PostForm
                            postRef={postRef}
                            defaultValues={post}
                            preview={preview}
                        />
                    </section>
                </>
            )}
        </main>
    );
}

type PostFormProps = {
    defaultValues: DocumentData;
    postRef: DocumentReference;
    preview: boolean;
};

function PostForm({ defaultValues, postRef, preview }: PostFormProps) {
    const router = useRouter();

    //State and toggle for the save changes modal
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const toggleSaveModal = () => {
        setIsSaveModalOpen((state) => !state);
    };

    //State and toggle for the delete post modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const toggleDeleteModal = () => {
        setIsSaveModalOpen((state) => !state);
    };

    //Get ref of the `hidden` submit button
    const submitRef = useRef<HTMLButtonElement>();
    //Clicks the `hidden` submit button
    const handleSaveConfirmFromModal = () => {
        submitRef.current.click();
    };

    const handleDeleteConfirmFromModal = async () => {
        try {
            await deleteDoc(postRef);
            router.replace('/');
            toast.success('Post deleted succefully');
        } catch (error) {
            console.log(error);
        }
    };

    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues,
        mode: 'onChange',
    });

    const updatePost = async ({ content, published }) => {
        await updateDoc(postRef, {
            content,
            published,
            updatedAt: serverTimestamp(),
        });

        reset({ content, published });

        toast.success('Post updated successfully!');
    };

    return (
        <div>
            {
                //Save updates modal
            }
            <Modal
                isOpen={isSaveModalOpen}
                toggleModal={toggleSaveModal}
                callbackOnConfirm={handleSaveConfirmFromModal}
            />
            {
                //Delete post Modal
            }
            <Modal
                isOpen={isDeleteModalOpen}
                toggleModal={toggleDeleteModal}
                callbackOnConfirm={handleDeleteConfirmFromModal}
            />
            <form onSubmit={handleSubmit(updatePost)}>
                <div className="flex flex-col items-center sm:items-start">
                    <textarea
                        className="w-full h-screen focus:outline-none border border-gray-300 p-2"
                        name="content"
                        {...register('content')}
                    ></textarea>

                    <fieldset className="mt-2">
                        <input
                            className="accent-[#FFC929]"
                            name="published"
                            type="checkbox"
                            {...register('published')}
                        />
                        <label className="mt-1">Publish</label>
                    </fieldset>
                    <span className="flex flex-row items-center justify-between w-full">
                        <button
                            type="button"
                            onClick={() => setIsSaveModalOpen(!isSaveModalOpen)}
                            className="px-2 py-1 text-sm rounded-lg bg-yellow-300 dark:bg-[#090A0D] border-1 border-yellow-600 my-2"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setIsDeleteModalOpen(!isDeleteModalOpen)
                            }
                            className="px-2 py-1 text-sm rounded-lg bg-red-500 text-white border-yellow-600 my-2"
                        >
                            Delete Post
                        </button>
                    </span>
                    <button ref={submitRef} type="submit" className="hidden" />

                    {preview && (
                        <div className="">
                            <article className="prose dark:prose-invert">
                                <ReactMarkdown>
                                    {watch('content')}
                                </ReactMarkdown>
                            </article>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
