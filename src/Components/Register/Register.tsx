// import { useForm } from "@zod/hooks";

// function Register(): JSX.Element {

//     const { form, hasErrors, submit } = useForm(validationSchema);

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         const result = await submit();
//         if (!result.success) {
//             console.log(result.error.formErrors);
//         }
//     };

//     return (
//         <div className="Register">
//             <h1>Register</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>Email:</label>
//                 <input type="email" {...form.register("email")} />
//                 {form.errors.email && <div className="error">{form.errors.email.message}</div>}

//                 <label>Password:</label>
//                 <input type="password" {...form.register("password")} />
//                 {form.errors.password && <div className="error">{form.errors.password.message}</div>}

//                 <label>Confirm Password:</label>
//                 <input type="password" {...form.register("confirm")} />
//                 {form.errors.confirm && <div className="error">{form.errors.confirm.message}</div>}

//                 <button type="submit" disabled={hasErrors}>Register</button>
//             </form>
//         </div>
//     );
// }

// export default Register;
