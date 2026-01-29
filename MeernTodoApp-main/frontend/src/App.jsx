import React, { createContext } from "react";
import RegisterForm from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/Login";
import Home from "./pages/Navbar";
import Intro from "./pages/Intro";
import CreateTodo from "./pages/CreateTodo";
import Dashboard from "./pages/Dashboard";
import UpdateTodo from "./pages/UpdateTodo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Intro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateTodo />} />
        <Route path="/update/:id" element={<UpdateTodo />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
