import React, { useState } from "react";
import { useFormik } from "formik";
import './App.css'

function MyForm() {
  const [returnErrors, setReturnErrors] = useState(false)
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      Vpassword: "",
    },
    onSubmit: async (values) => {
      if (Object.values(values).map(value => value === "").includes(true)) {
        setReturnErrors(true)
      }
      else {
        try {
          const response = await fetch('http://localhost:5000/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });

          if (response.ok) {
            console.log('Email sent successfully');
            // Optionally, display a success message to the user
          } else {
            console.error('Failed to send email');
            // Optionally, display an error message to the user
          }
        } catch (error) {
          console.error('Error sending email:', error);
          // Optionally, display an error message to the user
        }
      }
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Registration 🚀</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="firstName"
              placeholder="First Name"
              {...formik.getFieldProps("firstName")}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="lastName"
              placeholder="Last Name"
              {...formik.getFieldProps("lastName")}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div>{formik.errors.lastName}</div>
            ) : null}

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password (5 characters and above)"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="Vpassword"
              placeholder="Confirm Password"
              {...formik.getFieldProps("Vpassword")}
            />
            {formik.touched.Vpassword && formik.errors.Vpassword ? (
              <div>{formik.errors.Vpassword}</div>
            ) : null}

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Create Account 🚀
            </button>
            <div>
                {returnErrors && <span style={{color:'red',marginLeft:'30px'}}>ALL * FIELDS ARE MANDATORY</span>}
            </div>
            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              Terms of Service
              and
              Privacy Policy
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default MyForm;
