import { Dialog, Listbox, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { addNewTodoItem, updateTodoItem } from '../../services';

const priority = [
    {
        name: 'Very High',
        label: `bg-red-500`,
        stag: 'very-high'
    },
    {
        name: 'High',
        label: `bg-orange-500`,
        stag: 'high',
    },
    {
        name: 'Medium',
        label: `bg-green-500`,
        stag: 'normal',
    },
    {
        name: 'Low',
        label: `bg-blue-500 rounded-full`,
        stag: 'low',
    },
    {
        name: 'Very Low',
        label: `bg-purple-500 rounded-full`,
        stag: 'very-low',
    },
]

const AddModalTodo = (props) => {
    const completeButtonRef = useRef(null);
    const [todoId, setTodoId] = useState(0);
    const [itemName, setItemName] = useState("");
    const [selected, setSelected] = useState(priority[0])

    const {
        show,
        activityID,
        handleTodoItems,
        selectedTodoItem,
        setIsOpen
    } = props;

    const handleSubmit = async () => {
        if (todoId) {
            await updateTodoItem(todoId, {
                activity_group_id: activityID,
                title: itemName,
                priority: selected.stag,
            })
        } else {
            await addNewTodoItem({
                activity_group_id: activityID,
                title: itemName,
                priority: selected.stag,
            })
        }

        HandleModalClose()
        handleTodoItems()
        resetInputValue()
    }

    const HandleModalClose = () => {
        setIsOpen({ ...show, addModal: false });
        resetInputValue();
    }

    const resetInputValue = () => {
        setTodoId(0);
        setItemName("");
        setSelected(priority[0])
    }

    const allowSubmit = !(!itemName || !selected.stag);

    useEffect(() => {
        setTodoId(selectedTodoItem?.id);
        setItemName(selectedTodoItem?.title ? selectedTodoItem.title : "");

        const checkPriority = selectedTodoItem?.priority ? selectedTodoItem.priority : priority[0].stag;
        const priorityFind = priority.find((x) => x.stag === checkPriority);
        setSelected(priorityFind)

    }, [selectedTodoItem]);



    return (
        <div data-cy="modal-add">
            <Transition appear show={show.addModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={completeButtonRef} onClose={HandleModalClose}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center relative">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <Dialog.Panel className="w-full max-w-3xl transform rounded-2xl bg-slate-50 p-8 shadow-xl transition-all flex items-center justify-center flex-col gap-8">

                                    <div className='flex items-center justify-between w-full'>
                                        <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-900" data-cy={todoId > 0 ? '' : "modal-add-title"}>
                                            {todoId > 0 ? 'Edit List Item' : 'Tambah List Item'}
                                        </Dialog.Title>
                                        <button data-cy={todoId > 0 ? '' : "modal-add-close-button"} onClick={HandleModalClose}>
                                            <i className="fa-solid fa-xmark text-2xl text-zinc-500"></i>
                                        </button>
                                    </div>

                                    <div className='flex items-center justify-center w-full flex-col gap-4'>
                                        <div className='flex justify-center items-start flex-col w-full gap-2'>
                                            <label data-cy={todoId > 0 ? '' : "modal-add-name-title"} htmlFor="nama-list" className='text-xs font-bold'>NAMA LIST ITEM</label>
                                            <input data-cy={todoId > 0 ? '' : "modal-add-name-input"} type="text" placeholder='Tambahkan nama Activity' className='w-full p-3 border-2 border-zinc-400 rounded-md focus:outline-sky-400' value={itemName} onChange={(e) => setItemName(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-start w-full relative">
                                        <div className='flex justify-center items-start flex-col w-full gap-2'>
                                            <label data-cy={todoId > 0 ? '' : "modal-add-priority-title"} htmlFor="nama-list" className='text-xs font-bold'>PRITORITY</label>
                                            <Listbox value={selected} onChange={setSelected}>
                                                <div className="relative mt-1">
                                                    <Listbox.Button data-cy={todoId > 0 ? '' : "modal-add-priority-item"} className="relative w-[220px] cursor-default border-2 border-neutral-400 rounded-md p-3 focus:border-sky-400 flex items-center justify-start gap-3">
                                                        <div className={`w-4 h-4 rounded-full ${selected?.label}`}></div>
                                                        <span className="block truncate">{selected?.name}</span>
                                                        <span data-cy={todoId > 0 ? '' : "modal-add-priority-dropdown"} className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <i className="fa-solid fa-chevron-down"></i>
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {priority.map((person, personIdx) => (
                                                                <Listbox.Option
                                                                    key={personIdx}
                                                                    className={({ active }) =>
                                                                        `relative flex items-center justify-start gap-4 cursor-default select-none p-1 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                                        }`
                                                                    }
                                                                    value={person}
                                                                >
                                                                    {({ selected }) => (
                                                                        <>
                                                                            <div className={`w-4 h-4 rounded-full ${person.label}`}></div>
                                                                            <span
                                                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                                    }`}
                                                                            >
                                                                                {person.name}
                                                                            </span>
                                                                            {selected ? (
                                                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                                    <i className="fa-solid fa-check"></i>
                                                                                </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>

                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end gap-4 w-full">
                                        <button data-cy={todoId > 0 ? '' : "modal-add-save-button"} disabled={!allowSubmit} className='bg-sky-500 py-4 px-8 text-white font-medium rounded-full disabled:opacity-[0.5]' ref={completeButtonRef} onClick={handleSubmit}>Simpan</button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                    {/* {dropActive ? <div className="w-20 h-20 bg-sky-600 absolute bottom-36 left-80"></div> : null} */}
                </Dialog>
            </Transition>
        </div>
    )
}

export default AddModalTodo