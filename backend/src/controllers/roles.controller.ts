import type { Request, Response } from "express";

import { findAllRoles } from "../repositories/roles.repository.js";

export async function getRoles(_req: Request, res: Response): Promise<void> {
  try {
    const roles = await findAllRoles();

    res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (error) {
    console.error("Error retrieving roles:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
