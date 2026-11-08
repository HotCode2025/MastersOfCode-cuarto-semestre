import Router from "express-promise-router";
import {
  listarTarea,
  listarTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
} from "../controllers/tareas.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import {
  createTareaSchema,
  updateTareaSchema,
} from "../schemas/tareas.schemas.js";
import { is } from "zod/locales";

const router = Router();

router.get("/tareas", isAuth, listarTareas);

router.get("/tareas/:id", isAuth, listarTarea);

router.post("/tareas", isAuth, validateSchema(createTareaSchema), crearTarea);

router.put(
  "/tareas/:id",
  isAuth,
  validateSchema(updateTareaSchema),
  actualizarTarea,
);

router.delete("/tareas/:id", isAuth, eliminarTarea);

export default router;