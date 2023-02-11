import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";


const ActivityItem = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const {
        id,
        title,
        dateTime,
        handleGetAllActivity,
        openModalSuccess
    } = props;


    function closeModal() {
        setIsOpen(false);
    }


    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <div data-cy="activity-item" className="p-6 rounded-lg w-56 shadow-md shadow-neutral-400 bg-slate-50 flex items-start justify-between flex-col">
                <Link className="w-full" to={`/detail/${id}`} state={title}>
                    <h4 data-cy="activity-item-title" className="font-bold text-black text-lg mb-28">{title}</h4>
                </Link>
                <div className="flex items-center justify-between w-full">
                    <span data-cy="activity-item-date" className="font-normal text-zinc-500 text-base">
                        {new Date(dateTime).toLocaleDateString("id", {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                        })}
                    </span>
                    <button data-cy="activity-item-delete-button" className="font-normal text-zinc-500 text-base" onClick={openModal}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
            <DeleteModal data-cy="modal-delete" show={isOpen} closeModal={closeModal} itemTitle={title} itemId={id} openSuccessModal={openModalSuccess} handleGetAllActivity={handleGetAllActivity} />

        </>
    )
}

export default ActivityItem