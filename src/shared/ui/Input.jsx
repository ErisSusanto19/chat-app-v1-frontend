import clsx from 'clsx'
import React, { useState } from 'react'
import {Eye, EyeOff} from 'lucide-react'

const Input = ({target, label, type, disabled, register, rules = {}, errors}) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const isPasswordField = type === 'password'

  const togglePasswordVisibility = () => {
      setIsPasswordVisible(prevState => !prevState);
  }

  return (
    <div>
      {label && (
        <label htmlFor={target} className='block text-sm text-gray-900 font-medium'>
          {label}
          {rules?.required && (
              <span className="text-red-500"> *</span>
          )}
        </label>
      )}

      <div className='mt-2 relative'>
        <input 
          id={target}
          name={target}
          autoComplete={target}
          type={isPasswordField ? (isPasswordVisible ? 'text' : 'password') : type}
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
            disabled && "opacity-50 cursor-default"
          )}
        />

        {isPasswordField && (
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                disabled={disabled}
                aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            >
                {isPasswordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
        )}
      </div>

      {errors?.[target] && (
        <p className="text-rose-500 text-sm mt-1">
          {errors[target].message}
        </p>
      )}

    </div>
  )
}

export default Input