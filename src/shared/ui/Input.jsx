import clsx from 'clsx'
import React from 'react'

const Input = ({target, label, type, disable, register, rules = {}, errors}) => {
  return (
    <div>
      <label htmlFor={target} className='block text-sm text-gray-900 font-medium'>
        {label}
      </label>
      <div className='mt-2'>
        <input 
          id={target}
          name={target}
          autoComplete={target}
          type={type}
          {...register(target, rules)}
          className={clsx(`
              block
              w-full
              border 
              border-gray-300
              p-1.5
              rounded-md
              focus: outline-none
              focus: border-none
              focus: ring
              focus: ring-amber-300
            `,
            errors[target] && "ring-rose-500",
            disable && "opacity-50 cursor-default"
          )}
        />
        {errors?.[target] && (
          <p className="text-rose-500 text-sm mt-1">
            {errors[target].message}
          </p>
        )}
      </div>

    </div>
  )
}

export default Input