import { Pool } from "pg";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const pool = new Pool({
  host: getRequiredEnv("DB_HOST"),
  port: Number(getRequiredEnv("DB_PORT")),
  database: getRequiredEnv("DB_NAME"),
  user: getRequiredEnv("DB_USER"),
  password: getRequiredEnv("DB_PASSWORD"),

  // Configuración del grupo de conexiones
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

// Detectar errores inesperados en conexiones inactivas
pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error);
});
//Funcion de prueba
export async function testDatabaseConnection(): Promise<void> {
  const result = await pool.query("SELECT NOW() AS current_time");

  console.log("PostgreSQL connection successful");
  console.log("Database server time:", result.rows[0].current_time);
}
