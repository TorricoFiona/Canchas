function roleMiddleware(allowedRoles) {
  return (req, res, next) => {
    const userTipo = req.user.tipo;
    if (!allowedRoles.includes(userTipo)) {
      return res.status(403).json({ msg: 'No tienes permisos para esa acción' });
    }
    next();
  };
}

module.exports = roleMiddleware;
