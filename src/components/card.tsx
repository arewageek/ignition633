import { ReactNode } from 'react'

interface ICard {
    children: ReactNode
}

const Card = ({ children }: ICard) => {
    return (
        <div className='bg-gray-50 shadow rounded w-full lg:w-1/3 py-10  px-5'>
            {children}
        </div>
    )
}

export default Card