
import React from 'react'
import { useState } from 'react';
import { updateTodoItem } from '../../services';
import DelModalItem from './DelModalItem';

const TodoItems = (props) => {
    const [openModal, setOpenModal] = useState(false)
    const [checkItem, setCheckItem] = useState(false)

    const {
        todoTitle,
        todoPriority,
        itemID,
        handleTodoItems,
        setIsOpen,
        handleSetSelectedTodo,
        isActive,
    } = props;

    const handleCheckItem = async (id) => {
        setCheckItem(!checkItem)
        if (checkItem) {
            await updateTodoItem(id, {
                is_active: 1
            })
        } else {
            await updateTodoItem(id, {
                is_active: 0
            })
        }

        handleTodoItems()
    }

    const openModalEdit = () => {
        handleSetSelectedTodo(itemID, todoTitle, todoPriority)
        setIsOpen(true);
    }

    const openModalDelete = () => {
        setOpenModal(true)
    }

    const closeModalDelete = () => {
        setOpenModal(false)
    }

    return (
        <>
            <div data-cy="todo-item" className='p-7 rounded-lg shadow-md shadow-neutral-400 bg-slate-50 flex items-start justify-between w-full'>
                <div className='flex items-center justify-center gap-6'>
                    {isActive === 0 ? (
                        <input data-cy="todo-item-checkbox" checked id='checked-checkbox' type="checkbox" className="w-6 h-6 focus:text-sky-300 border-sky-300 checked:bg-blue-500" onChange={() => handleCheckItem(itemID)} />

                    ) : (
                        <input data-cy="todo-item-checkbox" id='checked-checkbox' type="checkbox" className="w-6 h-6 focus:text-sky-300 border-sky-300 checked:bg-blue-500" onChange={() => handleCheckItem(itemID)} />
                    )}
                    <span data-cy="todo-item-priority-indicator" className={`w-4 h-4 rounded-full 
                        ${todoPriority === `very-high` ? `bg-red-500` :
                            todoPriority === `high` ? `bg-orange-500` :
                                todoPriority === `normal` ? `bg-green-500` :
                                    todoPriority === `low` ? `bg-blue-500` :
                                        todoPriority === `very-low` ? `bg-purple-500` :
                                            `bg-black`
                        }`}>
                    </span>
                    <label data-cy="todo-item-title" htmlFor="checked-checkbox" className={`text-lg font-medium ${isActive === 0 ? 'line-through text-gray-500' : ''}`}>{todoTitle}</label>
                    <button data-cy="todo-item-edit-button" onClick={openModalEdit}>
                        <i className="fa-solid fa-pencil cursor-pointer text-md text-zinc-500"></i>
                    </button>

                </div>
                <div className='flex items-center justify-center gap-4'>
                    <button data-cy="todo-item-delete-button" className="font-normal text-zinc-500 text-xl" onClick={openModalDelete}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
            <DelModalItem data-cy="modal-delete" show={openModal} handleTodoItems={handleTodoItems} itemID={itemID} todoTitle={todoTitle} closeModal={closeModalDelete} />
        </>
    )
}

export default TodoItems