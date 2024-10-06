import {
  getAllTasks,
  createTaskQuery,
  getTaskQuery,
  updateTaskQuery,
  deleteTaskQuery,
} from "../lib/Queries.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await getAllTasks();
    res.json(result);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getTask = async (req, res) => {
  const [result] = await getTaskQuery(req.params.id);

  if (result.length === 0) {
    return res.status(404).json({ message: "Task not found" });
  }
  console.log(result);
  res.json(result[0]);
};

export const updateTask = async (req, res) => {
  const result = await updateTaskQuery(
    req.body,
    req.params.id
  );
  res.json(result);
};

export const createTask = async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  const [result] = await createTaskQuery(title, description);
  console.log(result);
  res.json({
    id: result.insertId,
    title,
    description,
  });
};

export const deleteTask = async (req, res) => {
  const [result] = await deleteTaskQuery(req.params.id);

  if (result.length === 0) {
    return res.send(404).json({ message: "task not found" });
  }
  return res.sendStatus(204);
};
