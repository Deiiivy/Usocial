export const isAdmin = (req, res, next) => {
  try {
    if (!req.role || req.role !== "ADMIN") {
      return res.status(403).json({ message: "Acceso denegado: se requiere rol ADMIN." });
    }

    next();
  } catch (err) {
    console.error("Error en isAdmin:", err);
    return res.status(500).json({ message: "Error interno en isAdmin." });
  }
};

