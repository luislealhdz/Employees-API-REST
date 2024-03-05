import { pool } from "../connection-database.js";

export const getEmployee = async (req, res) => {
    try {
        const {
            rows,
        } = await pool.query("SELECT * FROM employee WHERE id = $1", [
            req.params.id,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        console.log(error);
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const getEmployees = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM employee");
        res.send(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const createEmployee = async (req, res) => {
    const { name, salary } = req.body;
    try {
        const {
            rows,
        } = await pool.query(
            "INSERT INTO employee (name, salary) VALUES ($1, $2) RETURNING *",
            [name, salary]
        );

        res.send({
            id: rows[0].id,
            name: rows[0].name,
            salary: rows[0].salary,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, salary } = req.body;
    try {
        const {
            rowCount,
        } = await pool.query(
            "UPDATE employee SET name = COALESCE($1, name), salary = COALESCE($2, salary) WHERE id = $3",
            [name, salary, id]
        );

        if (rowCount === 0) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        const {
            rows,
        } = await pool.query("SELECT * FROM employee WHERE id = $1", [id]);

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const {
            rowCount,
        } = await pool.query("DELETE FROM employee WHERE id = $1", [
            req.params.id,
        ]);

        if (rowCount === 0) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};
