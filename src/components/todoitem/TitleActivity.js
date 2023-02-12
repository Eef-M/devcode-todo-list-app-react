import React from 'react'

const TitleActivity = (props) => {

    const {
        isFocus,
        isBlur,
        activityTitle,
        setActivityTitle,
    } = props;


    const updateTitle = (value) => {
        setActivityTitle(value)
    }

    return (
        <>
            <input
                type="text"
                value={activityTitle}
                className='font-bold text-4xl bg-transparent focus:border-transparent focus:outline-none focus:border-neutral-700 focus:border-b focus:py-2 focus:w-full'
                onFocus={isFocus}
                onBlur={isBlur}
                autoFocus
                onChange={(e) => updateTitle(e.target.value)}
            />
        </>
    )
}

export default TitleActivity