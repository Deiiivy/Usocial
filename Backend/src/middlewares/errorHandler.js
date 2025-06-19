export default function errorHandler(err, _req, res, _next) {
  console.error('[ERROR]', err);
  res.status(500).json({
    message: 'Ocurrió un error en el servidor',
    error: err.message
  });
}
