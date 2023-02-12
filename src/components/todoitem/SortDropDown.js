import { Listbox, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { ArrowsUpDownIcon, CheckIcon } from '@heroicons/react/24/solid'


const SortDropDown = (props) => {
    const {
        selected,
        setSelected,
        sort
    } = props;

    return (
        <>
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button data-cy="todo-sort-button" className="relative w-full cursor-default border-2 border-neutral-400 rounded-full p-3 flex items-center justify-start gap-3">
                        <ArrowsUpDownIcon className="w-6 h-6 text-gray-500" />
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-[320px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {sort.map((srt) => (
                                <Listbox.Option
                                    data-cy="sort-selection"
                                    key={srt?.id}
                                    className={({ active }) =>
                                        `relative flex items-center justify-between gap-5 cursor-default select-none py-2 px-8  ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={srt}
                                >
                                    {({ selected }) => (
                                        <>
                                            <div data-cy="sort-selection-selected" className='flex items-center justify-center gap-4'>
                                                <div data-cy="sort-selection-icon">
                                                    {srt?.component}
                                                </div>
                                                <span
                                                    data-cy="sort-selection-title"
                                                    className={`block truncate text-lg ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {srt?.name}
                                                </span>
                                            </div>
                                            {selected ? (
                                                <CheckIcon className='w-4 h-4' />
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </>
    )
}

export default SortDropDown