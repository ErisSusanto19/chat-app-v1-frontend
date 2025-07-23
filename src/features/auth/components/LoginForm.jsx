import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../authThunk';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { Link } from 'react-router-dom';

function LoginForm() {
    const { loading } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { email: "", password: "" }
    });

    const onSubmit = (data) => {
        dispatch(loginUser(data));
    };

    return (
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        target="email"
                        label="Email Address"
                        type="email"
                        register={register}
                        rules={{ required: { value: true, message: "Email is required" } }}
                        errors={errors}
                        disable={loading}
                    />
                    <Input
                        target="password"
                        label="Password"
                        type="password"
                        register={register}
                        rules={{ required: { value: true, message: "Password is required" } }}
                        errors={errors}
                        disable={loading}
                    />
                    <Button type="submit" fullWidth disable={loading}>
                        Sign in
                    </Button>
                </form>

                <div className='flex justify-center gap-2 text-sm text-gray-500 mt-6 px-2'>
                    <div>New to Chat App?</div>
                    <Link to="/register" className="underline cursor-pointer">
                        Create an account
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;