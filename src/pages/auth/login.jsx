import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { data, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import toast from "react-hot-toast";

const AuthLogin = () => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);

  const Submit = (formData) => {
    console.log("user credentials", formData);
    dispatch(loginUser(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success === true) {
        toast?.success(data?.payload?.message);
      } else {
        toast?.error(data?.payload?.message);
      }
    });
  };
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">
          Login into your Account
        </h2>
        <p className="my-2 text-center">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to={"/auth/register"}
          >
            Register
          </Link>
        </p>
        <form onSubmit={handleSubmit(Submit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter your email"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 pr-10"
                  placeholder="Enter your password"
                />
              )}
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer mt-6 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-sm text-gray-600">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <input {...field} type="checkbox" className="mr-2" />
                )}
              />
              Remember me
            </label>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default AuthLogin;
