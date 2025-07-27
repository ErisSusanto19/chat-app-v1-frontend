import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import RegisterForm from '../features/auth/components/RegisterForm';
import { resetState } from '../features/auth/authSlice';

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated, error } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated && user) {
            toast.success(`Welcome, ${user.name}!`);
            navigate("/");
        }

        if (error) {
            toast.error(error);
            dispatch(resetState());
        }
    }, [isAuthenticated, user, error, navigate, dispatch]);
    
    return (
        <div className='flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100'>
             <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Create your account
                </h2>
            </div>
            <RegisterForm />
        </div>
    );
}

export default RegisterPage;