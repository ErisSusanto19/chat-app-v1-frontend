import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { resetState } from '../authSlice'
import { registerUser, loginUser } from '../authThunk'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function AuthForm() {
    const [variant, setVariant] = useState("LOGIN")
    const { user, loading, error, isAuthenticated } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const toggleVariant = useCallback(() => {
        if(variant === "LOGIN") {
            setVariant("REGISTER")
            navigate("/register")
        } else {
            setVariant("LOGIN")
            navigate("/login")
        }
    }, [variant, navigate])

    const {register, handleSubmit, formState: {errors}, setError} = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = (data) => {
        dispatch(resetState())

        if(variant === "REGISTER"){
            dispatch(registerUser(data))
        }

        if(variant === "LOGIN"){
            const {name, ...loginData} = data
            dispatch(loginUser(loginData))
        }
    }
    
    useEffect(() => {
        if(isAuthenticated && user){
            if(variant === "REGISTER"){
                toast.success(`Welcome ${user.name}`)
            }
            if(variant === "LOGIN"){
                toast.success(`Welcome back, ${user.name}`)
            }
     
            navigate("/")
        }

        if(error){
            toast.error(error)

            dispatch(resetState())
        }

    }, [isAuthenticated, error, user, navigate, dispatch, variant])

    useEffect(() => {

        if(location.pathname === "/register"){
            setVariant("REGISTER")
        } else if(location.pathname === "/login"){
            setVariant("LOGIN")
        } else{
            setVariant("LOGIN")
        }
    }, [location.pathname])

  return (
    <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                {variant === "REGISTER" && (
                    <Input
                        target="name"
                        label="Name"
                        type="text"
                        register={register}
                        rules={{required: true}}
                        errors={errors}
                        disable={loading}
                    />
                )}

                <Input
                    target="email"
                    label="Email Address"
                    type="email"
                    register={register}
                    rules={{
                        required: {value: true, message: "Email is required"}, 
                        pattern: {value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Please use a valid email address"}
                    }}
                    errors={errors}
                    disable={loading}
                />

                <Input
                    target="password"
                    label="Password"
                    type="password"
                    register={register}
                    rules={{
                        required: {value: true, message: "Password is required"}, 
                        minLength: {value: 6, message: "Password must be at least 6 characters long"}
                    }}
                    errors={errors}
                    disable={loading}
                />

                <Button
                    type="submit"
                    fullWidth
                    disable={loading}
                >
                    {variant === "LOGIN"? "Sign in" : "Register"}
                </Button>
            </form>

            <div className='flex justify-center gap-2 text-sm text-gray-500 mt-6 px-2'>
                <div>
                    {variant === "LOGIN"? "New to Chat App?" : "Already have account?"}
                </div>
                <div onClick={toggleVariant} className="underline cursor-pointer">
                    {variant === "LOGIN"? "Create an account" : "Sign in"}
                </div>
            </div>
        </div>
    </div>
  )
}

export default AuthForm