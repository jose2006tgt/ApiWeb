
import { useEffect, useState } from "react";
import CardProducto from "../components/CardProducto.jsx";

function ProductoAPI({ producto }) {

    const [contador, setContador] = useState(0);
    const [descuento, setDescuento] = useState(1);

    return (
        <CardProducto
            nombre={producto.title}
            precio={producto.price}
            stock={producto.stock}
            imagen={producto.thumbnail}
            contador={contador}
            descuento={descuento}
            setContador={setContador}
            setDescuento={setDescuento}
        />
    );
}

function Catalogoweb() {

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [productos, setProductos] = useState([]);

    useEffect(() => {

        fetch("https://dummyjson.com/products?limit=8")

            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error al cargar");
                }
                return respuesta.json();
            })

            .then((datos) => {
                setProductos(datos.products);
                setCargando(false);
            })

            .catch(() => {
                setError("No se pudieron cargar los productos");
                setCargando(false);
            });

    }, []);

    return (
        <div className="container mt-4">

            <h3 className="text-center mb-4">
                Catálogo de Productos API
            </h3>

            {cargando && (
                <div className="alert alert-info">
                    Cargando productos...
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="row">

                {productos.map((producto) => (
                    <ProductoAPI
                        key={producto.id}
                        producto={producto}
                    />
                ))}

            </div>

        </div>
    );
}

export default Catalogoweb;
