import React, { useState } from "react";

const TodoList = ({Todos,getDeleteTodos,CompleteTodo}) => {
  return (
    <div className="text-white p-6 font-sans">
      {
    Todos.map((todo, index) => {
            return(
                <div key={index} className="bg-[#1c2a3a] rounded-lg shadow-md p-4 flex items-center justify-between mb-4">
        {/* Index */}
        <span className="text-[#3ab5f6] font-bold text-lg mr-4">{index + 1}</span>

        {/* Content */}
        <div className="flex-1 ml-2">
          <span className="block text-lg font-semibold text-gray-300 mb-1">
          {todo.title}
          </span>
          <span className="text-sm text-gray-400">
            {todo.description}
          </span>
        </div>

        {/* Status */}
        <span className="text-yellow-400 font-bold mr-4">{todo.isComplete?'Complete':'Pending'}</span>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button onClick={() => getDeleteTodos(todo._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-all">
            Delete
          </button>
          <button onClick={() => CompleteTodo(todo._id)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition-all">
            Done
          </button>
        </div>
      </div>
            )
        })
      }
    </div>
  );
};

export default TodoList;
