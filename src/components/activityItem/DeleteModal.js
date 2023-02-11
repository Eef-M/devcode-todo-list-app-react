import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef } from "react";
import modalDeleteIcon from "../../assets/images/modal-delete-icon.png";
import { deleteActivity } from "../../services";

const DeleteModal = (props) => {
  const { show, closeModal, itemTitle, itemId, openSuccessModal } = props;
  const completeButtonRef = useRef(null);

  const handleDeleteActivity = async (id) => {
    await deleteActivity(id);

    openSuccessModal()
  };
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={completeButtonRef} onClose={closeModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div data-cy="todo-modal-delete" className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-50 p-10 shadow-xl transition-all flex items-center justify-center flex-col gap-8">
                  <img data-cy="modal-delete-icon" src={modalDeleteIcon} alt="..." />
                  <Dialog.Title data-cy="modal-delete-title" as="h3" className="text-md font-normal leading-6 text-gray-900">
                    Apakah anda yakin menghapus activity <b>“{itemTitle}”</b>?
                  </Dialog.Title>

                  <div className="flex items-center justify-center gap-8">
                    <button data-cy="modal-delete-cancel-button" className="px-8 py-3 rounded-full bg-zinc-200 font-bold text-lg text-zinc-500" onClick={closeModal}>
                      Batal
                    </button>
                    <button data-cy="modal-delete-confirm-button" className="px-8 py-3 rounded-full bg-red-500 font-bold text-lg text-white" ref={completeButtonRef} onClick={() => handleDeleteActivity(itemId)}>
                      Hapus
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteModal;
