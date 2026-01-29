import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // ✅ Vite environment variable
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_URL}/api/users/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-600 to-black">
      <div className="max-w-md w-full mx-auto mt-10 p-6 bg-white rounded-3xl shadow-xl shadow-gray-400">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <Label htmlFor="username" className="mb-2">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter a username"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="email" className="mb-2">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="password" className="mb-2">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter a password"
            />
          </div>

          <Button type="submit" className="w-full mt-4">
            Login
          </Button>
        </form>

        <p className="text-blue-800 text-center mt-2">
          New User?{" "}
          <Link to="/register" className="underline">
            Register
          </Link>
        </p>
      </div>

      <IoArrowBackCircleOutline
        className="text-white text-4xl absolute left-4 top-4 cursor-pointer"
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default LoginForm;
