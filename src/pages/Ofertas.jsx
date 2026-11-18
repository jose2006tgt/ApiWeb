import { useEffect, useState } from "react";
import TarjetaOferta from "../components/TarjetaOferta.jsx";

function OfertaAPI({ producto }) {
    const [contador, setContador] = useState(0);
    const [descuento, setDescuento] = useState(producto.discountPercentage || 1);
    return (
        <TarjetaOferta
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
function Ofertas() {

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [Ofertas, setofertas] = useState([]);

    useEffect(() => {

        fetch("https://dummyjson.com/products?limit=8")

            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error al cargar");
                }
                return respuesta.json();
            })

            .then((datos) => {
                setofertas(datos.products);
                setCargando(false);
            })

            .catch(() => {
                setError("No se pudieron cargar las ofertas");
                setCargando(false);
            });

    }, []);
    

    return (
        <div className="container mt-4">

            <h3 className="text-center mb-4">
                Ofertas de Productos 
            </h3>

            {cargando && (
                <div className="alert alert-info">
                    Cargando ofertas...
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="row">

                {Ofertas.map((ofertas) => (
                    <OfertaAPI key={ofertas.id} producto={ofertas} />
                ))}

            </div>

        </div>
    );
}

export default Ofertas;