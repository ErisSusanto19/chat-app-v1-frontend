import clsx from 'clsx'
import React from 'react'
import Spinner from './Spinner'

const Button = ({type, fullWidth, children, onClick, secondary, danger, disabled, isLoading = false, ...props}) => {
  return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(`
                    flex
                    justify-center
                    py-2
                    px-3
                    rounded-md
                    text-sm
                    font-semibold
                    focus-visible:outline
                `,
                disabled && "opacity-50 cursor-default",
                fullWidth && "w-full",
                secondary && "text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-300",
                danger && "bg-rose-500 hover:bg-rose-600 focus:outline-rose-600 text-white",
                !secondary && !danger && "bg-amber-500 hover:bg-amber-600 focus:outline-amber-600 text-white"
            )}
        >
            {isLoading ? (
                <Spinner size='sm'/>
            ) : (
                children
            )}
        </button>

  )
}

export default Button