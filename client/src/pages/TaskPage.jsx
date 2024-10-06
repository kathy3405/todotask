import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";

function TaskPage() {
  const { tasks, loadTasks } = useTasks();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // Filter by task status
  const [sortOption, setSortOption] = useState("title"); // Sort option
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [tasksPerPage] = useState(3); // Tasks per page

  useEffect(() => {
    loadTasks();
  }, []);

  // Function to filter and sort tasks based on the search query, status, and sorting option
  function renderMain() {
    let filteredTasks = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    // Apply task status filter
    if (filterStatus === "completed") {
      filteredTasks = filteredTasks.filter((task) => task.done === 1);
    } else if (filterStatus === "incomplete") {
      filteredTasks = filteredTasks.filter((task) => task.done === 0);
    }
  
    // Apply sorting
    if (sortOption === "title") {
      filteredTasks = filteredTasks.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (sortOption === "date") {
      filteredTasks = filteredTasks.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
  
    // Nếu có search query, bỏ qua phân trang và hiển thị tất cả kết quả
    if (searchQuery) {
      return filteredTasks.map((task) => <TaskCard task={task} key={task.id} />);
    }
  
    // Pagination logic
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  
    if (currentTasks.length === 0)
      return (
        <div className="flex justify-center items-center h-full">
          <h1 className="text-xl font-semibold text-gray-500">No tasks found</h1>
        </div>
      );
  
    return currentTasks.map((task) => <TaskCard task={task} key={task.id} />);
  }
  
  // Pagination navigation
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 shadow">
        <div className="mx-auto max-w-7xl py-6 px-4">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Tasks Manager
          </h1>
        </div>
      </header>

      {/* Search, Filter, and Sort Controls */}
      <div className="mx-auto max-w-7xl py-6 px-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Filter by Status */}
        <div className="flex justify-between mb-4">
          <div>
            <label htmlFor="statusFilter" className="mr-2">Filter by:</label>
            <select
              id="statusFilter"
              className="p-2 border border-gray-300 rounded-lg"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>

          {/* Sort by Title or Date */}
          <div>
            <label htmlFor="sortOption" className="mr-2">Sort by:</label>
            <select
              id="sortOption"
              className="p-2 border border-gray-300 rounded-lg"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="title">Title</option>
              <option value="date">Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl py-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {renderMain()}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`p-2 mx-1 border rounded ${
              currentPage === 1 ? "text-gray-400 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="p-2 mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={`p-2 mx-1 border rounded ${
              currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">
          &copy; 2024 Task Manager. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default TaskPage;
