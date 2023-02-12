import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { getAllTodo, updateActivity } from "../../services"
import todoEmptyStateImage from "../../assets/images/todo-empty-state.png"
import TodoItems from "../../components/todoitem"
import AddModalTodo from "../../components/todoitem/AddModalTodo"
import SortDropDown from "../../components/todoitem/SortDropDown"
import { sort } from "../../components/todoitem/sortData"
import { useCallback } from "react"
import ConfirmDelTodo from "../../components/todoitem/ConfirmDelTodo"
import TitleActivity from "../../components/todoitem/TitleActivity"

const TodoItem = () => {
    const [todoItems, setTodoItems] = useState([])
    const [focused, setFocused] = useState(false)
    const [isOpen, setIsOpen] = useState({
        addModal: false,
        delConfirm: false,
    });
    const [selectedTodoItem, setSelectedTodoItem] = useState({})
    const [selected, setSelected] = useState(sort[0]);
    const { id } = useParams()
    const location = useLocation()

    const locData = location.state
    const [activityTitle, setActivityTitle] = useState(locData)

    const handleGetAllTodoItems = useCallback(async () => {
        const res = await getAllTodo(id);
        setTodoItems(res?.data?.data);

    }, [id])

    const handleSelectedTodoItem = (id, title, priority) => {
        setSelectedTodoItem({
            id,
            title,
            priority
        })
    }

    useEffect(() => {
        handleGetAllTodoItems()
    }, [handleGetAllTodoItems])

    const onFocus = () => {
        setFocused(true)
    }

    const onBlur = () => {
        setFocused(false)
    }

    function openModal() {
        setIsOpen({ ...isOpen, addModal: true });
    }

    function closeConfirm() {
        setIsOpen({ ...isOpen, delConfirm: false })
    }

    function openConfirm() {
        handleGetAllTodoItems()
        setIsOpen({ ...isOpen, delConfirm: true })
    }

    if (selected.id === 1) {
        todoItems.sort((a, b) => (a.id > b.id ? -1 : 1))
    } else if (selected.id === 2) {
        todoItems.sort((a, b) => (a.id > b.id) ? 1 : -1)
    } else if (selected.id === 3) {
        todoItems.sort((a, b) => (a.title > b.title ? 1 : -1))
    } else if (selected.id === 4) {
        todoItems.sort((a, b) => (a.title > b.title ? -1 : 1))
    } else {
        todoItems.sort((a, b) => (a.is_active > b.is_active ? -1 : 1))
    }


    return (
        <>
            <div className="container mx-auto max-w-6xl sm:px-10 lg:px-20 mt-8 flex items-center justify-between flex-wrap gap-5">
                <div className="flex items-center justify-center gap-5">

                    <Link to='/'>
                        <i data-cy="todo-back-button" className="fa-solid fa-angle-left text-4xl"></i>
                    </Link>
                    {focused ? (
                        <TitleActivity activityTitle={activityTitle} setActivityTitle={setActivityTitle} isFocus={onFocus} isBlur={onBlur} />
                    ) : (
                        <h1 data-cy="todo-title" className="font-bold text-4xl" onClick={() => {
                            onFocus()
                        }}>{activityTitle}</h1>
                    )}
                    <i data-cy="todo-title-edit-button" className="fa-solid fa-pencil cursor-pointer text-xl text-zinc-500" onClick={() => {
                        onFocus()
                    }}></i>
                </div>
                <div className="flex items-center justify-center gap-4">
                    {/* -------------------------------------------------------------------------------------------------------------- */}
                    <SortDropDown selected={selected} setSelected={setSelected} sort={sort} />

                    {/* -------------------------------------------------------------------------------------------------------------- */}
                    <button data-cy="todo-add-button" className="rounded-full bg-sky-500 h-14 w-40 font-bold text-white text-xl" onClick={openModal}>
                        <i className="fa-solid fa-plus"></i> Tambah
                    </button>
                </div>
                <div className="flex items-center lg:justify-left flex-wrap w-full gap-3 flex-col my-6">
                    {todoItems.length > 0 ? (
                        todoItems &&
                        todoItems.map((item) => (
                            <TodoItems
                                key={item?.id}
                                itemID={item?.id}
                                todoTitle={item?.title}
                                todoPriority={item?.priority}
                                handleTodoItems={handleGetAllTodoItems}
                                handleSetSelectedTodo={handleSelectedTodoItem}
                                selectedTodoItem={selectedTodoItem}
                                setIsOpen={setIsOpen}
                                isOpen={isOpen}
                                isActive={item?.is_active}
                                openConfirm={openConfirm}
                            />
                        ))
                    ) : (
                        <button onClick={openModal} style={{ cursor: "default" }}>
                            <img data-cy="activity-empty-state" src={todoEmptyStateImage} className="max-w-full h-auto" alt="..." />
                        </button>
                    )}
                </div>
            </div>
            <AddModalTodo show={isOpen} activityID={id} handleTodoItems={handleGetAllTodoItems} selectedTodoItem={selectedTodoItem} setIsOpen={setIsOpen} />
            <ConfirmDelTodo show={isOpen.delConfirm} closeModal={closeConfirm} />
        </>
    )
}

export default TodoItem