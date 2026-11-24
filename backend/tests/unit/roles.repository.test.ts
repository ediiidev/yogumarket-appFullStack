import { beforeEach, describe, expect, it, vi } from "vitest";

// Simulamos el módulo que proporciona la conexión a PostgreSQL.
vi.mock("../../src/config/database.js", () => ({
  pool: {
    query: vi.fn(),
  },
}));

import { pool } from "../../src/config/database.js";
import { findAllRoles } from "../../src/repositories/roles.repository.js";

describe("findAllRoles", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return all available roles", async () => {
    const expectedRoles = [
      {
        id: "1",
        name: "ADMIN",
        description: "Administrador del sistema",
      },
      {
        id: "2",
        name: "CLIENT",
        description: "Usuario que realiza pedidos",
      },
    ];

    vi.mocked(pool.query).mockResolvedValue({
      rows: expectedRoles,
    } as never);

    const result = await findAllRoles();

    expect(result).toEqual(expectedRoles);
    expect(pool.query).toHaveBeenCalledOnce();
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining("FROM roles"),
    );
  });
});
