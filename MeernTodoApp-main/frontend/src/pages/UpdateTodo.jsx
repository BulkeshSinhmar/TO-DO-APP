import React, { useRef, useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import axios from "axios";
import toast, { useToaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateTodo = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    // State to handle form inputs
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    // const toast = useToaster();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.put(
                `http://localhost:5000/api/todo/update/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            console.log(res);

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
        <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-600 to-black ">
            <div className="max-w-md w-full mx-auto mt-10 p-6 bg-white rounded-3xl shadow-xl shadow-gray-400">
                <h2 className="text-2xl font-bold text-center mb-4">Update Todo</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div className="flex flex-col">
                        <Label htmlFor="title" className="mb-2">Title</Label>
                        <Input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter a title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    {/* description */}
                    <div className="flex flex-col">
                        <Label htmlFor="description" className="mb-2">Description</Label>
                        <Input
                            type="description"
                            id="description"
                            name="description"
                           
                            placeholder="Enter your description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Submit Button */}
                    <Button type="submit" className="w-full mt-4">
                        Update
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default UpdateTodo;
