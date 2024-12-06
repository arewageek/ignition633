"use client"
import { useState } from 'react'

interface Props {
    placeholder?: string,
    type: string,
    value: string,
    onchange: (value: string) => void
}

const Input = ({ placeholder, value, onchange, type }: Props) => {
    return (
        <div className='py-2'>
            <input type={type} placeholder={placeholder} value={value} onChange={e => onchange(e.target.value)} className='border-[1.5px] border-gray-800 rounded-lg w-full px-2 py-3 bg-white' />
        </div>
    )
}

export default Input