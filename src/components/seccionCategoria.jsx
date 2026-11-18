function SeccionCategoria({ titulo, children }) {
  return (
    <section className="mb-4">
      <h3 className="mb-3 border-bottom pb-2">{titulo}</h3>
      <div className="d-flex flex-wrap">
        {children}
      </div>
    </section>
  );
}

export default SeccionCategoria;