import {
    getDownloadURL,
    ref,
    uploadBytes,
    uploadBytesResumable,
} from 'firebase/storage';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { auth, storage } from '../../lib/firebase';
import Loader from '../Loader/Loader';

export default function ImageUploader() {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState<string>(null);

    // Creates a Firebase Upload Task
    const uploadFile = async (e) => {
        // Get the file || Putting any temoporary
        const file: any = Array.from(e.target.files)[0];
        //Get the file extension
        const extension = file.type.split('/')[1];

        // Makes reference to the storage bucket location
        const fileRef = ref(
            storage,
            `${auth.currentUser.uid}/${Date.now()}.${extension}`
        );

        const fileUploadsRef = ref(
            storage,
            `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
        );

        const uploadTask = uploadBytesResumable(fileUploadsRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                console.log(snapshot.state);
                switch (snapshot.state) {
                    case 'paused':
                        //TODO: Add handler
                        break;
                    case 'running':
                        setUploading(true);
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log(error);
                toast.error('File could not be uploaded :( Please try again');
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setDownloadURL(downloadURL);
                    setUploading(false);
                });
            }
        );
    };

    return (
        <div className="flex flex-col">
            <Loader classNames="" show={uploading} />
            {uploading && <h3>{progress}%</h3>}

            {!uploading && (
                <>
                    <label
                        htmlFor="file-upload"
                        className="flex flex-col w-max mb-5 px-3 py-1 text-sm rounded-lg bg-yellow-300 dark:bg-[#090A0D] border-1 border-yellow-600 hover:scale-105 duration-500"
                    >
                        📸 Upload Img
                    </label>
                    <input
                        className="hidden"
                        id="file-upload"
                        type="file"
                        onChange={uploadFile}
                        accept="image/x-png,image/gif,image/jpeg"
                    />
                </>
            )}

            {downloadURL && (
                <div className="mb-5">
                    <p className="max-w-full text-clip break-words break-all select-all">{`![alt](${downloadURL})`}</p>
                </div>
            )}
        </div>
    );
}
