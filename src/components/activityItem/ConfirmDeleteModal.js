import { Dialog, Transition } from '@headlessui/react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import React, { Fragment, useRef } from 'react'

const ConfirmDeleteModal = (props) => {
    const { show, closeModal } = props;
    const completeButtonRef = useRef(null);

    return (
        <div data-cy="modal-information">
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={completeButtonRef} onClose={closeModal}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-50 py-4 px-6 shadow-xl transition-all flex items-center justify-start gap-3" onClick={closeModal} ref={completeButtonRef}>
                                    <ExclamationCircleIcon data-cy="modal-information-icon" className='w-6 h-6 text-teal-500' />
                                    <Dialog.Title data-cy="modal-information-title" as="h3" className="text-lg font-normal leading-6 text-gray-900">
                                        Activity berhasil dihapus
                                    </Dialog.Title>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default ConfirmDeleteModal