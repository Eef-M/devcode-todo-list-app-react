import { useEffect, useState } from "react";
import ActivityItem from "../../components/activityItem";
import { addNewActivity, getAllActivity } from "../../services";
import activityEmptyImage from "../../assets/images/activity-empty-state.png";
import ConfirmDeleteModal from "../../components/activityItem/ConfirmDeleteModal";


const Activity = () => {
    const [activityData, setActivityData] = useState([]);
    const [activityTitle, setActivityTitle] = useState("");
    const [theEmail, setTheEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const handleGetAllActivity = async () => {
        setIsLoading(true)
        const res = await getAllActivity();
        setActivityData(res?.data?.data);
        setIsLoading(false)
    };

    useEffect(() => {
        setActivityTitle("New Activity");
        setTheEmail("eefmekel@gmail.com");

        handleGetAllActivity();
    }, []);

    const handleAddActivity = async () => {
        await addNewActivity({
            title: activityTitle,
            email: theEmail,
        });

        handleGetAllActivity();
    };

    function openModal() {
        handleGetAllActivity()
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

    return (
        <>
            <div className="container mx-auto max-w-6xl sm:px-10 lg:px-20 mt-8 flex items-center justify-between flex-wrap flex-col gap-5">
                <div className="flex items-center justify-between w-full mb-8">
                    <h1 data-cy="activity-title" className="font-bold text-4xl">Activity</h1>
                    <button data-cy="activity-add-button" className="rounded-full bg-sky-500 h-14 w-40 font-bold text-white text-xl" onClick={handleAddActivity}>
                        <i className="fa-solid fa-plus"></i> Tambah
                    </button>
                </div>
                {isLoading ? (
                    <div className="flex items-center lg:justify-left flex-wrap w-full gap-8">Loading...</div>
                ) : (
                    <div className="flex items-center lg:justify-left flex-wrap w-full gap-8">
                        {activityData.length > 0 ? (
                            activityData &&
                            activityData.map((item) => (
                                <ActivityItem
                                    key={item?.id}
                                    id={item?.id}
                                    title={item?.title}
                                    dateTime={item?.created_at}
                                    handleGetAllActivity={handleGetAllActivity}
                                    openModalSuccess={openModal}
                                />
                            ))
                        ) : (
                            <button onClick={handleAddActivity} style={{ cursor: "default" }}>
                                <img src={activityEmptyImage} className="max-w-full h-auto" alt="..." />
                            </button>
                        )}
                    </div>)}
            </div>
            <ConfirmDeleteModal data-cy="modal-information" show={isOpen} closeModal={closeModal} />
        </>
    )
}

export default Activity