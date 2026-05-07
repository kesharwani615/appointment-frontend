import React, { useState } from 'react'

import { Link, useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { loginUser } from '../api/authApi';


const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setError("");
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            setError("");

            const response = await loginUser(formData);

            console.log("Login Response:", response);

            localStorage.setItem(
                "appointment-app-token",
                response?.data?.token
            );

            localStorage.setItem(
                "appointment-user",
                JSON.stringify(response?.data?.user)
            );

            navigate("/");

        } catch (err) {

            setError(
                err?.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div
            className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-gradient-to-br
                from-slate-950
                via-slate-900
                to-black
                px-6
                py-12
                relative
                overflow-hidden
            "
        >

            {/* Background Glow */}

            <div
                className="
                    absolute
                    top-[-100px]
                    left-[-100px]
                    w-[300px]
                    h-[300px]
                    bg-indigo-500/20
                    rounded-full
                    blur-[120px]
                "
            />

            <div
                className="
                    absolute
                    bottom-[-100px]
                    right-[-100px]
                    w-[300px]
                    h-[300px]
                    bg-purple-500/20
                    rounded-full
                    blur-[120px]
                "
            />


            {/* Login Card */}

            <div
                className="
                    w-full
                    max-w-md
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    shadow-2xl
                    p-8
                    relative
                    z-10
                "
            >

                {/* Logo */}

                <div className="flex justify-center mb-6">

                    <div
                        className="
                            w-20
                            h-20
                            rounded-2xl
                            bg-gradient-to-br
                            from-indigo-500
                            to-purple-600
                            flex
                            items-center
                            justify-center
                            text-4xl
                            shadow-lg
                            shadow-indigo-500/30
                        "
                    >
                        📅
                    </div>

                </div>


                {/* Heading */}

                <div className="text-center mb-8">

                    <h2
                        className="
                            text-4xl
                            font-black
                            tracking-tight
                            text-white
                            mb-3
                        "
                    >
                        Welcome Back
                    </h2>

                    <p className="text-gray-400">
                        Login to continue your appointments
                    </p>

                </div>


                {/* Error Message */}

                {
                    error && (

                        <div
                            className="
                                bg-red-500/10
                                border
                                border-red-500/20
                                text-red-300
                                p-4
                                rounded-2xl
                                mb-6
                                text-sm
                            "
                        >
                            {error}
                        </div>
                    )
                }


                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Email */}

                    <div>

                        <label
                            htmlFor="email"
                            className="
                                block
                                text-sm
                                font-medium
                                text-gray-200
                                mb-2
                            "
                        >
                            Email Address
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="
                                block
                                w-full
                                rounded-2xl
                                bg-white/5
                                border
                                border-white/10
                                px-4
                                py-4
                                text-white
                                placeholder:text-gray-500
                                focus:outline-none
                                focus:ring-2
                                focus:ring-indigo-500
                            "
                        />

                    </div>


                    {/* Password */}

                    <div>

                        <div className="flex items-center justify-between mb-2">

                            <label
                                htmlFor="password"
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-200
                                "
                            >
                                Password
                            </label>

                            {/* <button
                                type="button"
                                className="
                                    text-sm
                                    font-semibold
                                    text-indigo-400
                                    hover:text-indigo-300
                                "
                            >
                                Forgot password?
                            </button> */}

                        </div>


                        {/* Password Input Wrapper */}

                        <div className="relative">

                            <input
                                id="password"
                                name="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                required
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="
                                    block
                                    w-full
                                    rounded-2xl
                                    bg-white/5
                                    border
                                    border-white/10
                                    px-4
                                    py-4
                                    pr-14
                                    text-white
                                    placeholder:text-gray-500
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-indigo-500
                                "
                            />


                            {/* Eye Toggle */}

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="
                                    absolute
                                    right-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                    hover:text-white
                                    transition-colors
                                "
                            >

                                {
                                    showPassword
                                        ? <FaEyeSlash size={18} />
                                        : <FaEye size={18} />
                                }

                            </button>

                        </div>

                    </div>


                    {/* Submit Button */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            flex
                            w-full
                            justify-center
                            rounded-2xl
                            bg-gradient-to-r
                            from-indigo-500
                            to-purple-600
                            px-4
                            py-4
                            text-sm
                            font-bold
                            tracking-wide
                            text-white
                            hover:scale-[1.02]
                            transition-all
                            duration-300
                            shadow-lg
                            shadow-indigo-500/20
                            disabled:opacity-70
                            disabled:cursor-not-allowed
                        "
                    >

                        {
                            loading
                                ? "Signing In..."
                                : "Sign In"
                        }

                    </button>

                </form>


                {/* Footer */}

                <p
                    className="
                        mt-8
                        text-center
                        text-sm
                        text-gray-400
                    "
                >

                    Don't have an account?

                    <Link
                        to="/register"
                        className="
                            font-semibold
                            text-indigo-400
                            hover:text-indigo-300
                            ml-1
                        "
                    >
                        Create Account
                    </Link>

                </p>

            </div>

        </div>
    )
}

export default Login