
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Encabezado from './components/encabezado.jsx'
import Pie from './components/pie.jsx'

import Inicio from './pages/inicio.jsx'
import Contactos from './pages/contactos.jsx'
import Productos from './pages/productos.jsx'
import Compras from './pages/compras.jsx'
import Catalogoweb from './pages/Catalogoweb.jsx'
import Ofertas from './pages/Ofertas.jsx'


function App() {

    return (
        <BrowserRouter>

            <main className="container">

                <section>

                    <Encabezado titulo="TIENDA PUCE-IBARRA" />

                    <Routes>
                        <Route path="/" element={<Inicio />} />
                        <Route path="/productos" element={<Productos />} />
                        <Route path="/compras" element={<Compras />} />
                        <Route path="/contactos" element={<Contactos />} />
                        <Route path="/catalogoweb" element={<Catalogoweb />} />
                        <Route path="/ofertas" element={<Ofertas />} />
                        
                    </Routes>

                </section>

                <section>
                    <Pie />
                </section>

            </main>

        </BrowserRouter>
    );
}

export default App;
