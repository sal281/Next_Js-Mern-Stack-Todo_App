'use client';

import TodoList from "@/components/TodoList";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure toast styles are imported

export default function Home() {
  // State for managing inputs
  const [inputs, setInputs] = useState({
    title: '',
    description: ''
  });

  // State for managing todos
  const [Todos, setTodos] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  let getTodos = async () => {
      let response = await axios.get('/api');
       setTodos(response.data.message);
  }

  let getDeleteTodos = async (id) => {
    try {
      // Send DELETE request with the `mongoId` as a query parameter
      let response = await axios.delete('/api', {
        params: {
          mongoId: id, // Passing the `id` as `mongoId`
        },
      });
  
      // Display a success message using toast
      toast.success(response.data.message);
  
      // Refresh the todo list (make sure `getTodos` is defined elsewhere)
      getTodos();
    } catch (error) {
      // Handle errors and display appropriate error messages
      if (error.response && error.response.data) {
        // If the server provides a specific error message
        toast.error(error.response.data.error || "Failed to delete the todo.");
      } else {
        // Generic error message for unexpected issues
        toast.error("An unexpected error occurred.");
      }
  
      // Optional: Log the error for debugging purposes
      console.error("Error deleting todo:", error);
    }
  };

  
  let CompleteTodo = async (id) => {
    try {
      // Send PUT request to update the todo as completed
      let response = await axios.put(
        '/api', // API endpoint
        null,   // No body is sent, so we use `null`
        {
          params: {
            mongoId: id, // Pass the ID as a query parameter
          },
        }
      );
  
      getTodos();
      // Display success toast with the server response message
      toast.success(response.data.message);
    } catch (error) {
      // Handle errors and display error messages in a toast
      if (error.response && error.response.data) {
        // Server provided an error message
        toast.error(error.response.data.error || "Failed to complete the todo.");
      } else {
        // Generic error message for unexpected issues
        toast.error("An unexpected error occurred.");
      }
  
      // Optional: Log the error for debugging
      console.error("Error completing todo:", error);
    }
  };
  
  
  


  useEffect(() => {
    getTodos();
  }, [])
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate inputs
    if (!inputs.title.trim() || !inputs.description.trim()) {
      toast.error("Please enter title and description.");
      return;
    }
  
    try {
      const response = await axios.post('/api', inputs, {
        headers: {
          'Content-Type': 'application/json',  // Ensure the content type is set
        }
      });
      getTodos();
      toast.success(response.data.message);
  
      // Reset inputs
      setInputs({
        title: '',
        description: ''
      });
    } catch (error) {
      // Handle the error response
      console.error('Error Response:', error.response?.data || error.message);
      toast.error('Something went wrong. Please try again.');
    }
  };
  

  return (
    <>
      <div className="mt-4 p-4">
        {/* Todo Form */}
        <form
          className="flex flex-col gap-3 items-start justify-center"
          onSubmit={handleSubmit}
        >
          {/* Title Input */}
          <input
            value={inputs.title}
            onChange={handleChange}
            name="title"
            type="text"
            placeholder="Enter Title..."
            className="border border-white h-[45px] rounded-md bg-[#173954] px-2 py-1 text-gray-300 outline-none w-full"
          />
          {/* Description Input */}
          <input
            value={inputs.description}
            onChange={handleChange}
            name="description"
            type="text"
            placeholder="Enter Description..."
            className="border border-white h-[45px] rounded-md bg-[#173954] px-2 py-1 text-gray-300 outline-none w-full"
          />
          {/* Submit Button */}
          <button
            className="text-white border py-2 px-3 rounded-lg"
            type="submit"
          >
            Add Todo
          </button>
        </form>
      </div>

      {/* Todo List or Placeholder */}
      {Todos.length > 0 ? (
        <TodoList Todos={Todos} CompleteTodo={CompleteTodo} getDeleteTodos={getDeleteTodos} />
      ) : (
        <p className="text-gray-500 mt-3 text-md ml-4">No todos found</p>
      )}

      {/* Toast Notifications */}
      <ToastContainer />
    </>
  );
}
