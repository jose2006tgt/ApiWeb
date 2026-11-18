import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const CATALOGO = [
    { nombre: "Papas", precio: 2.00, stock: 20, categoria: "Snacks" },
    { nombre: "Galletas", precio: 1.50, stock: 8, categoria: "Snacks" },
    { nombre: "TAKIS", precio: 3.00, stock: 2, categoria: "Snacks" },
    { nombre: "Chocolate", precio: 0.25, stock: 10, categoria: "Dulces" },
    { nombre: "Kinder", precio: 2.00, stock: 5, categoria: "Dulces" },
    { nombre: "Caramelo", precio: 0.50, stock: 9, categoria: "Dulces" },
    { nombre: "Cerveza Club", precio: 1.75, stock: 15, categoria: "Licores" },
    { nombre: "Vino Tinto", precio: 12.00, stock: 7, categoria: "Licores" },
    { nombre: "Whisky", precio: 25.00, stock: 4, categoria: "Licores" }
];

function Compras() {
    const location = useLocation();

    // Datos del cliente con persistencia en localStorage
    const [nombre, setNombre] = useState(() => localStorage.getItem("fac_nombre") || "");
    const [edad, setEdad] = useState(() => localStorage.getItem("fac_edad") || "");
    const [ciudad, setCiudad] = useState(() => localStorage.getItem("fac_ciudad") || "");

    // Selector para agregar productos a la factura
    const [productoSeleccionado, setProductoSeleccionado] = useState(CATALOGO[0].nombre);
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);

    // Carrito / ítems de la factura con persistencia
    const [itemsFactura, setItemsFactura] = useState(() => {
        const guardados = localStorage.getItem("fac_items");
        return guardados ? JSON.parse(guardados) : [];
    });

    // Si viene desde el botón "Ir a Comprar" de Productos, preseleccionar ese ítem
    useEffect(() => {
        if (location.state?.productoPreseleccionado) {
            setProductoSeleccionado(location.state.productoPreseleccionado.nombre);
            setCantidadSeleccionada(1);
        }
    }, [location.state]);

    // Guardar en localStorage automáticamente
    useEffect(() => {
        localStorage.setItem("fac_nombre", nombre);
        localStorage.setItem("fac_edad", edad);
        localStorage.setItem("fac_ciudad", ciudad);
        localStorage.setItem("fac_items", JSON.stringify(itemsFactura));
    }, [nombre, edad, ciudad, itemsFactura]);

    const edadNum = edad === "" ? null : Number(edad);
    const esMenorDeEdad = edadNum !== null && edadNum < 18;
    const esAdultoMayor = edadNum !== null && edadNum > 65;

    // Si el usuario cambia su edad a menor de 18, eliminar automáticamente cualquier licor de la factura
    useEffect(() => {
        if (esMenorDeEdad && itemsFactura.some((item) => item.categoria === "Licores")) {
            setItemsFactura((prev) => prev.filter((item) => item.categoria !== "Licores"));
            alert("Se han retirado los licores de la factura porque el cliente es menor de 18 años.");
        }
    }, [esMenorDeEdad, itemsFactura]);

    function agregarAFactura() {
        const prodInfo = CATALOGO.find((p) => p.nombre === productoSeleccionado);
        if (!prodInfo) return;

        if (edad === "") {
            alert("Por favor, ingresa primero la edad del cliente para validar impuestos y restricciones.");
            return;
        }

        if (prodInfo.categoria === "Licores" && esMenorDeEdad) {
            alert("Prohibida la venta de alcohol a menores de 18 años.");
            return;
        }

        if (cantidadSeleccionada <= 0 || cantidadSeleccionada > prodInfo.stock) {
            alert(`Cantidad inválida. Stock disponible: ${prodInfo.stock}`);
            return;
        }

        const existe = itemsFactura.find((item) => item.nombre === prodInfo.nombre);
        if (existe) {
            const nuevaCantidad = existe.cantidad + cantidadSeleccionada;
            if (nuevaCantidad > prodInfo.stock) {
                alert(`No puedes superar el stock disponible (${prodInfo.stock} unidades).`);
                return;
            }
            setItemsFactura(
                itemsFactura.map((item) =>
                    item.nombre === prodInfo.nombre ? { ...item, cantidad: nuevaCantidad } : item
                )
            );
        } else {
            setItemsFactura([
                ...itemsFactura,
                {
                    nombre: prodInfo.nombre,
                    precio: prodInfo.precio,
                    categoria: prodInfo.categoria,
                    cantidad: cantidadSeleccionada
                }
            ]);
        }
        setCantidadSeleccionada(1);
    }

    function eliminarItem(nombreProducto) {
        setItemsFactura(itemsFactura.filter((item) => item.nombre !== nombreProducto));
    }

    // Cálculo de subtotales e impuestos según reglas de edad
    const subtotalGeneral = itemsFactura.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const subtotalLicores = itemsFactura
        .filter((item) => item.categoria === "Licores")
        .reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    let porcentajeIva = 0.15; // Entre 18 y 65 años
    let etiquetaIva = "IVA (15%)";

    if (esMenorDeEdad) {
        porcentajeIva = 0;
        etiquetaIva = "IVA (0% - Menor de edad)";
    } else if (esAdultoMayor) {
        porcentajeIva = 0.08;
        etiquetaIva = "IVA (8% - Tercera edad)";
    }

    const montoIva = subtotalGeneral * porcentajeIva;
    // ICE (10%) aplica solo a licores para mayores de edad (tanto 18-65 como >65)
    const porcentajeIce = 0.10;
    const montoIce = !esMenorDeEdad ? subtotalLicores * porcentajeIce : 0;
    const totalFactura = subtotalGeneral + montoIva + montoIce;

    function emitirFactura(e) {
        e.preventDefault();
        if (itemsFactura.length === 0) {
            alert("Agrega al menos un producto a la factura antes de confirmar.");
            return;
        }
        alert(`Factura emitida a nombre de ${nombre} por un total de $${totalFactura.toFixed(2)}`);

        // Limpiar datos tras emitir factura
        setNombre("");
        setEdad("");
        setCiudad("");
        setItemsFactura([]);
        localStorage.removeItem("fac_nombre");
        localStorage.removeItem("fac_edad");
        localStorage.removeItem("fac_ciudad");
        localStorage.removeItem("fac_items");
    }

    return (
        <div className="container py-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Punto de Venta y Facturación</h2>
                <Link to="/productos" className="btn btn-outline-secondary btn-sm">
                    Ver Catálogo de Productos
                </Link>
            </div>

            <div className="row g-4">
                {/* Columna Izquierda: Formulario de Cliente y Selector de Productos */}
                <div className="col-lg-5">
                    <form className="card shadow-sm p-3 mb-3" onSubmit={emitirFactura}>
                        <h5 className="card-title border-bottom pb-2 mb-3">1. Datos del Cliente</h5>

                        <div className="mb-2">
                            <label className="form-label mb-1">Nombre completo:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ej. Juan Pérez"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>

                        <div className="row g-2 mb-3">
                            <div className="col-5">
                                <label className="form-label mb-1">Edad:</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="120"
                                    className="form-control"
                                    placeholder="Edad"
                                    value={edad}
                                    onChange={(e) => setEdad(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-7">
                                <label className="form-label mb-1">Ciudad:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ej. Ibarra"
                                    value={ciudad}
                                    onChange={(e) => setCiudad(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {edad !== "" && (
                            <div className="alert alert-info py-2 small mb-3">
                                {esMenorDeEdad && "Regla aplicada: Menor de edad (Exento de IVA, venta de licores bloqueada)."}
                                {!esMenorDeEdad && !esAdultoMayor && "Regla aplicada: Adulto 18-65 años (IVA 15% + ICE 10% en licores)."}
                                {esAdultoMayor && "Regla aplicada: Tercera edad >65 años (IVA reducido al 8% + ICE 10% en licores)."}
                            </div>
                        )}

                        <h5 className="card-title border-bottom pb-2 mb-3">2. Agregar Productos</h5>

                        <div className="mb-2">
                            <label className="form-label mb-1">Seleccione un producto:</label>
                            <select
                                className="form-select"
                                value={productoSeleccionado}
                                onChange={(e) => setProductoSeleccionado(e.target.value)}
                            >
                                {CATALOGO.map((prod) => (
                                    <option
                                        key={prod.nombre}
                                        value={prod.nombre}
                                        disabled={prod.categoria === "Licores" && esMenorDeEdad}
                                    >
                                        [{prod.categoria}] {prod.nombre} - ${prod.precio.toFixed(2)} (Stock: {prod.stock})
                                        {prod.categoria === "Licores" && esMenorDeEdad ? " - BLOQUEADO" : ""}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label mb-1">Cantidad:</label>
                            <input
                                type="number"
                                min="1"
                                className="form-control"
                                value={cantidadSeleccionada}
                                onChange={(e) => setCantidadSeleccionada(Number(e.target.value))}
                            />
                        </div>

                        <button
                            type="button"
                            className="btn btn-primary w-100 mb-3"
                            onClick={agregarAFactura}
                        >
                            + Añadir a la Factura
                        </button>

                        <button
                            type="submit"
                            className="btn btn-success w-100 fw-bold"
                            disabled={itemsFactura.length === 0}
                        >
                            Confirmar y Emitir Factura
                        </button>
                    </form>
                </div>

                {/* Columna Derecha: Vista previa de la Factura */}
                <div className="col-lg-7">
                    <div className="card shadow-sm p-4 bg-white">
                        <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                            <div>
                                <h4 className="mb-0">FACTURA DE VENTA</h4>
                                <small className="text-muted">Tienda PUCE Ibarra</small>
                            </div>
                            <div className="text-end small">
                                <p className="mb-0"><strong>Cliente:</strong> {nombre || "Consumidor Final"}</p>
                                <p className="mb-0"><strong>Edad:</strong> {edad ? `${edad} años` : "-"}</p>
                                <p className="mb-0"><strong>Ciudad:</strong> {ciudad || "-"}</p>
                            </div>
                        </div>

                        {itemsFactura.length === 0 ? (
                            <p className="text-muted text-center my-4">
                                No hay productos en la factura. Selecciona productos en el panel izquierdo.
                            </p>
                        ) : (
                            <>
                                <table className="table table-sm table-striped align-middle">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Categoría</th>
                                            <th className="text-center">Cant.</th>
                                            <th className="text-end">P. Unit</th>
                                            <th className="text-end">Subtotal</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemsFactura.map((item) => (
                                            <tr key={item.nombre}>
                                                <td>{item.nombre}</td>
                                                <td>
                                                    <span className={`badge ${item.categoria === "Licores" ? "bg-warning text-dark" : "bg-secondary"}`}>
                                                        {item.categoria}
                                                    </span>
                                                </td>
                                                <td className="text-center">{item.cantidad}</td>
                                                <td className="text-end">${item.precio.toFixed(2)}</td>
                                                <td className="text-end">${(item.precio * item.cantidad).toFixed(2)}</td>
                                                <td className="text-end">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger btn-sm py-0 px-2"
                                                        onClick={() => eliminarItem(item.nombre)}
                                                    >
                                                        X
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="row justify-content-end mt-3">
                                    <div className="col-sm-7">
                                        <table className="table table-bordered table-sm mb-0">
                                            <tbody>
                                                <tr>
                                                    <th>Subtotal General</th>
                                                    <td className="text-end">${subtotalGeneral.toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <th>{etiquetaIva}</th>
                                                    <td className="text-end">${montoIva.toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <th>ICE Licores (10%)</th>
                                                    <td className="text-end">${montoIce.toFixed(2)}</td>
                                                </tr>
                                                <tr className="table-dark">
                                                    <th>TOTAL A PAGAR</th>
                                                    <td className="text-end fw-bold">${totalFactura.toFixed(2)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Compras;