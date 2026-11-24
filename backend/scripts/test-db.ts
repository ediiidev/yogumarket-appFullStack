import "dotenv/config";

import { findAllRoles } from "../src/repositories/roles.repository.js";
import { pool } from "../src/config/database.js";

try {
  const roles = await findAllRoles();

  console.table(roles);
} catch (error) {
  console.error("Could not retrieve roles:", error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
