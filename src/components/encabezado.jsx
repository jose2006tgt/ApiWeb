
import { Link } from 'react-router-dom'

function Encabezado({ titulo }) {

    return (
        <div>

            <nav className="navbar navbar-expand bg-light mb-3">

                <div className="container-fluid">

                    <div className="d-flex flex-wrap gap-3 align-items-center">

                        <Link className="navbar-brand" to="/">
                            {titulo}
                        </Link>

                        <Link className="nav-link" to="/">
                            Inicio
                        </Link>

                        <Link className="nav-link" to="/productos">
                            Productos
                        </Link>

                        <Link className="nav-link" to="/compras">
                            Compras / Factura
                        </Link>

                        <Link className="nav-link" to="/catalogoweb">
                            Catálogo API
                        </Link>

                        <Link className="nav-link" to="/contactos">
                            Contactos
                        </Link>
                        <Link className="nav-link" to="/ofertas">
                            Ofertas
                        </Link>

                    </div>

                </div>

            </nav>

        </div>
    );
}

export default Encabezado;
