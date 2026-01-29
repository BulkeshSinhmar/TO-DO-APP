import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RiLogoutCircleLine, RiAddCircleLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");

  // ✅ Vite environment variable
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch all todos
  const todoData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/todo/getAllTodo`,
        { withCredentials: true }
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch todos");
    }
  };

  useEffect(() => {
    todoData();
  }, []);

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(
        `${API_URL}/api/todo/delete/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        todoData();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Logout
  const logOut = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/users/logout`,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-5 bg-gradient-to-br from-[#2c2483] to-[#570691]">
      <h1 className="text-white text-center font-serif text-4xl font-bold mb-3">
        Dashboard
      </h1>

      <RiAddCircleLine
        className="text-white text-4xl absolute right-4 top-4 cursor-pointer"
        onClick={() => navigate("/create")}
      />

      <RiLogoutCircleLine
        className="text-white text-4xl absolute left-4 top-4 cursor-pointer"
        onClick={logOut}
      />

      <div className="flex items-center gap-2">
        <h1 className="text-white text-center font-semibold text-2xl w-[11%] px-3 border-2 rounded-xl border-white">
          Sr. No.
        </h1>
        <h1 className="text-white text-center font-semibold text-2xl w-[20%] px-3 border-2 rounded-xl border-white">
          Title
        </h1>
        <p className="text-white text-center font-semibold text-2xl border-2 w-full rounded-xl border-white px-3">
          Description
        </p>
      </div>

      <div className="flex flex-col">
        {data?.allTodos?.length > 0 ? (
          data.allTodos.map((todo, idx) => (
            <div className="flex items-center gap-2 my-1" key={todo._id}>
              <h1 className="text-white font-bold text-2xl text-center w-[11%] px-3 border-2 rounded-xl border-white">
                {idx + 1}.
              </h1>

              <h1 className="text-white text-2xl w-[20%] px-3 border-2 rounded-xl border-white">
                {todo.title}
              </h1>

              <div className="text-white flex justify-between items-center text-2xl border-2 w-full rounded-xl border-white px-3">
                {todo.description}
                <div className="flex gap-8">
                  <GrEdit
                    className="h-7 cursor-pointer"
                    onClick={() => navigate(`/update/${todo._id}`)}
                  />
                  <MdDelete
                    className="h-7 cursor-pointer hover:text-red-500"
                    onClick={() => deleteTodo(todo._id)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center mt-4">No todos found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
