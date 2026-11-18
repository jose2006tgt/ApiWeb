function Contactos() {
  return (
    <div className="card p-4 shadow-sm" style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2 className="mb-3">Contáctanos</h2>
      <form action="mailto:tucorreo@ejemplo.com" method="POST" encType="text/plain">
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Tu Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="form-control"
            placeholder="Escribe tu nombre..."
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label">Escribe tu mensaje:</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="5"
            className="form-control"
            placeholder="Escribe aquí..."
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">Enviar mensaje</button>
      </form>
    </div>
  );
}

export default Contactos;