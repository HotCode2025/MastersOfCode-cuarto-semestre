export const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.body);
    next();
  } catch (error) {
    // Extraemos la lista de errores que generó Zod
    const issues = error.errors || error.issues;

    if (issues) {
      // Recorremos los errores y devolvemos solo los textos que definiste en el schema
      return res.status(400).json(issues.map((e) => e.message));
    }

    return res.status(400).json([error.message]);
  }
};