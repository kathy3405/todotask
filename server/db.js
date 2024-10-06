import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: "localhost",
    port: 3309,
    user: "root",
    password: "",
    database: "tasksdb"
});