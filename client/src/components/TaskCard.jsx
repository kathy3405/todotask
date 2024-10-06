import { useTasks } from "../context/TaskContext";
import { Navigate, useNavigate } from "react-router-dom";

function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = useTasks();
  const navigate = useNavigate();

  const handleDone = async () => {
    await toggleTaskDone(task.id);
  };

  return (
    <div className="transition bg-white rounded-lg p-6 shadow-md shadow-blue-200 hover:-translate-y-2 hover:shadow-xl hover:bg-indigo-100 duration-300 ease-in-out">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-indigo-600 font-bold font-serif">
          {task.title}
        </h2>
        <span className={`text-2xl ${task.done ? "text-green-500" : "text-red-500"}`}>
          {task.done ? "✅" : "❌"}
        </span>
      </header>
      <hr className="mb-4" />
      <p className="text-sm text-gray-700 mb-6">{task.description}</p>

      <div className="flex gap-3 justify-end">
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-full hover:bg-red-600 transition duration-200 ease-in-out"
          onClick={() => deleteTask(task.id)}
        >
          ❌
        </button>
        <button
          className="bg-gray-300 px-3 py-2 rounded-full hover:bg-gray-400 transition duration-200 ease-in-out"
          onClick={() => navigate(`/edit/${task.id}`)}
        >
          🖉
        </button>
        <button
          className="bg-green-500 text-white px-3 py-2 rounded-full hover:bg-green-600 transition duration-200 ease-in-out"
          onClick={() => handleDone(task.done)}
        >
          ✓
        </button>
      </div>
    </div>
  );
}


export default TaskCard;
