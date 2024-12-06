import React from 'react'

interface Props {
    text: string,
    classes?: string
    isSubmit?: boolean
    onclick: () => void
}

const Button = ({ text, classes, isSubmit, onclick }: Props) => {
    const handleClick = () => {
        isSubmit ? onclick() : null;
    }

    return (
        <button className={classes ? classes : `w-full bg-black py-4 px-2 text-white font-semibold hover:bg-black/80 transition`} onClick={handleClick}>
            {text}
        </button>
    )
}

export default Button