type Props = {
    isOpen: boolean;
    toggleModal: () => void;
    //Putting any temporary
    callbackOnConfirm: () => any;
};

export default function Modal({
    isOpen,
    toggleModal,
    callbackOnConfirm,
}: Props) {
    return isOpen ? (
        <div className="fixed top-0 left-0 w-full h-screen snap-none bg-black/40 z-50 flex flex-col items-center justify-center">
            <div className="border border-red-400 rounded-lg bg-white w-2/3 sm:w-96 h-32 flex flex-col items-center justify-between py-2 px-2">
                <p className="font-semibold text-lg">Are you sure?</p>
                <span className="flex flex-row justify-between">
                    <button
                        onClick={() => {
                            toggleModal();
                            callbackOnConfirm();
                        }}
                        className="px-2 py-1 border border-green-500 rounded-lg mr-6 mb-1"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={() => toggleModal()}
                        className="px-2 py-1 border border-red-500 rounded-lg mb-1"
                    >
                        Cancel
                    </button>
                </span>
            </div>
        </div>
    ) : null;
}
