import { ArchiveBoxArrowDownIcon, ArrowsUpDownIcon, BarsArrowDownIcon, BarsArrowUpIcon, DocumentArrowDownIcon } from "@heroicons/react/24/solid";

export const sort = [
    {
        id: 1,
        name: 'Terbaru',
        component: <BarsArrowDownIcon className='h-5 w-5 text-sky-500' />,
        tag: "sort-selection-selected",
    },
    {
        id: 2,
        name: 'Terlama',
        component: <BarsArrowUpIcon className='h-5 w-5 text-sky-500' />,
        tag: "sort-selection-selected",
    },
    {
        id: 3,
        name: 'A-Z',
        component: <DocumentArrowDownIcon className='h-5 w-5 text-sky-500' />,
        tag: "sort-selection-selected",
    },
    {
        id: 4,
        name: 'Z-A',
        component: <ArchiveBoxArrowDownIcon className='h-5 w-5 text-sky-500' />,
        tag: "sort-selection-selected",
    },
    {
        id: 5,
        name: 'Belum Selesai',
        component: <ArrowsUpDownIcon className='h-5 w-5 text-sky-500' />,
        tag: "sort-selection-selected",
    }
]