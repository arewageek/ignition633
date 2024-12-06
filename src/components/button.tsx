import React from 'react'

interface Props {
    text: string,
    classes?: string
    isSubmit?: boolean
    onclick: () => void
    isLoading?: boolean
}

const Button = ({ text, classes, isSubmit, onclick, isLoading }: Props) => {
    const handleClick = () => {
        isSubmit ? onclick() : null;
    }

    return (
        <button className={classes ? classes : `w-full bg-black py-4 px-2 text-white font-semibold hover:bg-black/80 transition flex items-center justify-center gap-x-3`} onClick={handleClick}>
            {text}{isLoading && <div className='h-4 w-4 rounded-full border-white border-2 border-t-0 animate-spin'></div>}
        </button>
    )
}

export default Button