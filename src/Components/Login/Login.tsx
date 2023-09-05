import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import './login.css';
import { LoginReqModel } from '../../Models/Login';
import webApiService from '../../Services/CustomerWebApiService';
import notifyService from '../../Services/NotificationService';
import { useDispatch } from 'react-redux';
import { userLoggedInAction } from '../Redux/UserAppState';
import { useNavigate } from 'react-router-dom';
import { loggedInAsAdmin, loggedInAsCompany, loggedInAsCustomer } from '../Redux/GuardAppState';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const schema = zod.object({
        email: zod.string().nonempty("you must enter an email"),
        password: zod.string().min(4, "password must be at least 4 characters").nonempty("you must enter a password"),
        type: zod.enum(["ADMIN", "COMPANY", "CUSTOMER"]), // Adjust enum values as needed
    });

    const { register, handleSubmit, formState: { errors, isValid, isSubmitted } } =
        useForm<LoginReqModel>({ mode: "all", resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<LoginReqModel> = (data: LoginReqModel) => {

        return webApiService.login(data)
            .then(res => {
                console.log('Hello, I did login: ' + res.data + " type: " + data.type + " email: " + data.email);

                const newState = {
                    id: res.data.id,
                    token : res.data.token,
                    type: data.type,
                    email: data.email
                  };

                dispatch(userLoggedInAction(newState));
                navigate("/home");

                if (data.email === 'admin@admin.com') {
                    dispatch(loggedInAsAdmin());
                }

                if (data.type === "ADMIN") {
                    console.log("$ADMIN");
                    dispatch(loggedInAsAdmin());
                } else if (data.type === "COMPANY") {
                    console.log("$COMPANY");
                    dispatch(loggedInAsCompany());
                } else if (data.type === "CUSTOMER") {
                    console.log("$CUSTOMER");
                    dispatch(loggedInAsCustomer());
                }
            })
            .catch(err => notifyService.error(err));
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email:</label>
                    {errors?.email ? <span>{errors.email.message}</span> : <label htmlFor="email"></label>}
                    <input {...register("email")} type="text" placeholder="Email" />
                </div>
                <div>
                    <label>Password:</label>
                    {errors?.password ? <span>{errors.password.message}</span> : <label htmlFor="password"></label>}
                    <input {...register("password")} type="password" placeholder="Password" />
                </div>
                <div className="type-select">
                    <label>Type:</label>
                    <select {...register('type')}>
                        <option value="ADMIN">ADMIN</option>
                        <option value="COMPANY">COMPANY</option>
                        <option value="CUSTOMER">CUSTOMER</option>
                    </select>
                </div>
                <button type="submit" disabled={!isValid || isSubmitted}>Login</button>
            </form>
        </div>
    );
}

export default Login;
