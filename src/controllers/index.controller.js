import { pool } from "../connection-database.js";

export const ping = async (req, res) => {
    const [result] = await pool.query("SELECT 1 + 1 AS result");
    res.json(result[0]);
};
