function Pie({ titulo }) {
  return (
    <footer className="text-center py-3 mt-4 border-top">
      <p className="mb-0">© 2026 {titulo || "Mi Tienda"}. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Pie;