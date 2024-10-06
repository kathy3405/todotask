import axios from "axios";

//This function just receives the data from the server.
export const getTasksRequest = async () =>
  await axios.get("http://localhost:4000/tasks");

//Send data to the server (In this case, creating a task) and return the response
export const createTaskRequest = async (task) =>
  await axios.post("http://localhost:4000/createtask", task);

//Send request to the server to delete the task
export const deleteTaskRequest = async (id) =>
  await axios.delete(`http://localhost:4000/deletetask/${id}`);

export const getTaskRequest = async (id) =>
  await axios.get(`http://localhost:4000/task/${id}`);

export const updateTaskRequest = async (id, newFields) =>
  await axios.put(`http://localhost:4000/updatetask/${id}`, newFields);

export const toggleTaskDoneRequest = async (id, done) =>
  await axios.put(`http://localhost:4000/updatetask/${id}`, {
    done
  });
