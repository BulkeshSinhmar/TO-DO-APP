import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Vite environment variable
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${API_URL}/api/todo/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-600 to-black">
      <div className="max-w-md w-full mx-auto mt-10 p-6 bg-white rounded-3xl shadow-xl shadow-gray-400">
        <h2 className="text-2xl font-bold text-center mb-4">Update Todo</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <Label htmlFor="title" className="mb-2">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a title"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="description" className="mb-2">Description</Label>
            <Input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter your description"
            />
          </div>

          <Button type="submit" className="w-full mt-4">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTodo;
