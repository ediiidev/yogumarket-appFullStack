import { pool } from "../config/database.js";

export type Role = {
  id: string;
  name: string;
  description: string | null;
};

export async function findAllRoles(): Promise<Role[]> {
  const result = await pool.query<Role>(`
    SELECT id, name, description
    FROM roles
    ORDER BY name;
  `);

  return result.rows;
}
