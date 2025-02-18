import { registerUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AuthRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log("Form Submitted:", formData);
    dispatch(registerUser(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success === true) {
        toast?.success("Registered successfully!");
        navigate("/auth/login");
      }
    });
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center">Create New Account</h2>
        <p className="my-2 text-center">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to={"/auth/login"}
          >
            Login
          </Link>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block font-medium">User Name</label>
            <Controller
              name="userName"
              control={control}
              rules={{ required: "User Name is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full p-2 border rounded focus:outline-none"
                  placeholder="Enter your full name"
                />
              )}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm">{errors.userName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium">Email</label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  className="w-full p-2 border rounded focus:outline-none"
                  placeholder="Enter your email"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block font-medium">Password</label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 border rounded focus:outline-none"
                  placeholder="Enter your password"
                />
              )}
            />
            <span
              className="absolute right-3 top-10 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default AuthRegister;
