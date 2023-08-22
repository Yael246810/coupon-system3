import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import './login.css';
import { LoginReqModel } from '../../Models/Login';
import webApiService from '../../Services/WebApiService';
import notifyService from '../../Services/NotificationService';
import { useDispatch } from 'react-redux';
import { userLoggedInAction } from '../Redux/UserAppState';
import { useNavigate } from 'react-router-dom';

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const schema = zod.object({
        // id: zod.number(),
        email: zod.string().nonempty("you must enter an email"),
        password: zod.string().min(4, "password must be at least 4 characters").nonempty("you must enter a password"),
    });

    const { register, handleSubmit, formState: { errors, isValid, isSubmitted } } =
        useForm<LoginReqModel>({ mode: "all", resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<LoginReqModel> = (data: LoginReqModel) => {
        return webApiService.login(data)
            .then(res => {
               dispatch(userLoggedInAction(res.data))
               navigate("/src/Components/Pages/Home")
            })
            .catch(err => notifyService.error(err));
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            {/* <div>
                 <label htmlFor="id">Id:</label>
                 <input {...register("id")} type="number" placeholder="Id" id="id" />
                 {errors.id && <span>{errors.id.message}</span>}
                </div> */}
                <div>
                    <label>Email:</label>
                    {errors?.email ? <span>{errors.email.message}</span> : <label htmlFor="email"></label>}
                <input {...register("email")} type="text" placeholder="Email" />
                </div>
                <div>
                    <label>Password:</label>
                    {errors?.password ? <span>{errors.password.message}</span> : <label htmlFor="password"></label>}
                <input {...register("password")} type="text" placeholder="Password" />
                </div>
                {/* Type selection */}
                <div className="type-select">
                    <label>Type:</label>
                    <select {...register('type')}>
                        <option value="Admin">Admin</option>
                        <option value="Company">Company</option>
                        <option value="Customer">Customer</option>
                    </select>
                </div>
                <button type="submit" disabled={!isValid || isSubmitted}>Login</button>
            </form>
        </div>
    );
}

export default Login;
