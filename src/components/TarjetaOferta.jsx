
function TarjetaOferta({
    nombre,
    precio,
    stock,
    imagen,
    descuento,
    contador = 0,
    setContador,
    setDescuento

   
}) {
    let valorDescuento = precio * descuento / 100;
    let preciofinal = precio - valorDescuento;
    let iva = preciofinal * 0.15;
    let preciofinaliva = preciofinal + iva;
     let estado = "";
    let color = "";

    if (stock > 10) {
        estado = "Disponible";
        color = "bg-success";
    }
    else if (stock >= 5) {
        estado = "Casi agotado";
        color = "bg-warning text-dark";
    }
    else {
        estado = "Agotado";
        color = "bg-danger";
    }

    function agregarProducto() {
        if (contador < stock) {
            setContador(contador + 1);
        }
    }

    function quitarProducto() {
        if (contador > 0) {
            setContador(contador - 1);
        }
    }

    return (
        <div className="col-md-4 mb-3">

            <div className="card h-100">

                <img
                    src={imagen}
                    alt={nombre}
                    className="card-img-top object-fit-contain p-3"
                    height="180"
                />

                <div className="card-body">

                    <h5 className="card-title">
                        {nombre}
                    </h5>

                    <p className="mb-1">
                        Precio: ${preciofinaliva.toFixed(2)}
                    </p>

                    <p className="mb-1">
                        Stock: {stock} unidades
                    </p>

                    <span className={"badge " + color}>
                        {estado}
                    </span>

                    <hr />

                    <label className="form-label">
                        Descuento (%):
                    </label>

                    <input
                        type="number"
                        min="1"
                        max="100"
                        className="form-control form-control-sm mb-2"
                        value={descuento}
                        onChange={(e) =>
                            setDescuento(
                                Math.max(1,
                                    Math.min(100,
                                        Number(e.target.value) || 1
                                    )
                                )
                            )
                        }
                    />

                    <p className="mb-1">
                        Subtotal: ${descuento.toFixed(2)}
                    </p>

                    <p className="mb-1">
                        Descuento: ${valorDescuento.toFixed(2)}
                    </p>

                    <p className="mb-1">
                        IVA (15%): ${iva.toFixed(2)}
                    </p>

                    <p className="fw-bold text-success">
                        Total: ${preciofinaliva.toFixed(2)}
                    </p>

                    <div className="d-flex gap-2">

                        <button
                            className="btn btn-danger btn-sm"
                            onClick={quitarProducto}
                            disabled={contador === 0}
                        >
                            -
                        </button>

                        <button
                            className="btn btn-primary btn-sm"
                            onClick={agregarProducto}
                            disabled={contador >= stock}
                        >
                            Agregar +
                        </button>

                    </div>

                    <p className="mt-2">
                        Cantidad: {contador}
                    </p>

                </div>
            </div>
        </div>
    );
}
export default TarjetaOferta;