import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import "./ContactUs.css";

function ContactUs(): JSX.Element {
  const schema = zod.object({
    name: zod.string().nonempty("you must enter your name"),
    email: zod.string().nonempty("you must enter an email"),
    subject: zod.string().nonempty("you must enter a subject"),
    message: zod.string().nonempty("you must enter a message"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="contactUs-container">
      <h2>Contact Us</h2>
      <form className="contactUs-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input type="text" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Subject:</label>
          <input type="subject" {...register("subject")} />
          {errors.subject && <p>{errors.subject.message}</p>}
        </div>
        <div>
          <label>Message:</label>
          <input type="message" {...register("message")} />
          {errors.message && <p>{errors.message.message}</p>}
        </div>
        <button type="submit">ContactUs</button>
      </form>
    </div>
  );
}

export default ContactUs;
