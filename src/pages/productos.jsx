
import { useState } from 'react'
import CardProducto from '../components/CardProducto.jsx'

import imagenClub from '../assets/productos/club.svg'
import imagenCaran from '../assets/productos/caran.svg'
import imagenSwitch from '../assets/productos/switch.svg'
import imagenRuffles from '../assets/productos/ruffles.svg'
import imagenDoritos from '../assets/productos/doritos.svg'
import imagenChifles from '../assets/productos/chifles.svg'

function Productos() {

    // DATOS DEL CLIENTE
    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");
    const [ciudad, setCiudad] = useState("");

    // CANTIDADES
    const [club, setClub] = useState(0);
    const [caran, setCaran] = useState(0);
    const [switchP, setSwitchP] = useState(0);

    const [ruffles, setRuffles] = useState(0);
    const [doritos, setDoritos] = useState(0);
    const [chifles, setChifles] = useState(0);

    // DESCUENTOS
    const [dClub, setDClub] = useState(1);
    const [dCaran, setDCaran] = useState(1);
    const [dSwitch, setDSwitch] = useState(1);

    const [dRuffles, setDRuffles] = useState(1);
    const [dDoritos, setDDoritos] = useState(1);
    const [dChifles, setDChifles] = useState(1);

    // SUBTOTALES
    let sClub = 6 * club;
    let sCaran = 10 * caran;
    let sSwitch = 8.12 * switchP;

    let sRuffles = 1 * ruffles;
    let sDoritos = 1.25 * doritos;
    let sChifles = 0.75 * chifles;

    // DESCUENTOS CALCULADOS
    let descuentoClub = sClub * dClub / 100;
    let descuentoCaran = sCaran * dCaran / 100;
    let descuentoSwitch = sSwitch * dSwitch / 100;

    let descuentoRuffles = sRuffles * dRuffles / 100;
    let descuentoDoritos = sDoritos * dDoritos / 100;
    let descuentoChifles = sChifles * dChifles / 100;

    // FACTURA
    let subtotal =
        sClub + sCaran + sSwitch +
        sRuffles + sDoritos + sChifles;

    let descuentoTotal =
        descuentoClub + descuentoCaran + descuentoSwitch +
        descuentoRuffles + descuentoDoritos + descuentoChifles;

    let subtotalDescuento = subtotal - descuentoTotal;
    let iva = subtotalDescuento * 0.15;
    let total = subtotalDescuento + iva;

    function nuevaFactura() {

        setNombre("");
        setEdad("");
        setCiudad("");

        setClub(0);
        setCaran(0);
        setSwitchP(0);

        setRuffles(0);
        setDoritos(0);
        setChifles(0);

        setDClub(1);
        setDCaran(1);
        setDSwitch(1);

        setDRuffles(1);
        setDDoritos(1);
        setDChifles(1);
    }

    return (
        <div className="container-fluid mt-3">

            <h3 className="text-center mb-4">
                Sistema de Facturación
            </h3>

            <div className="row">

                {/* PRODUCTOS LADO IZQUIERDO */}

                <div className="col-lg-8">

                    <h4 className="text-center mb-3">
                        Productos generales
                    </h4>

                    <div className="row">

                        <CardProducto
                            nombre="Club"
                            precio={6}
                            stock={15}
                            imagen={imagenClub}
                            contador={club}
                            descuento={dClub}
                            setContador={setClub}
                            setDescuento={setDClub}
                        />

                        <CardProducto
                            nombre="Caran"
                            precio={10}
                            stock={8}
                            imagen={imagenCaran}
                            contador={caran}
                            descuento={dCaran}
                            setContador={setCaran}
                            setDescuento={setDCaran}
                        />

                        <CardProducto
                            nombre="Switch"
                            precio={8.12}
                            stock={12}
                            imagen={imagenSwitch}
                            contador={switchP}
                            descuento={dSwitch}
                            setContador={setSwitchP}
                            setDescuento={setDSwitch}
                        />

                    </div>

                    <hr />

                    <h4 className="text-center mb-3">
                        Categoria Snacks
                    </h4>

                    <div className="row">

                        <CardProducto
                            nombre="Ruffles"
                            precio={1}
                            stock={20}
                            imagen={imagenRuffles}
                            contador={ruffles}
                            descuento={dRuffles}
                            setContador={setRuffles}
                            setDescuento={setDRuffles}
                        />

                        <CardProducto
                            nombre="Doritos"
                            precio={1.25}
                            stock={4}
                            imagen={imagenDoritos}
                            contador={doritos}
                            descuento={dDoritos}
                            setContador={setDoritos}
                            setDescuento={setDDoritos}
                        />

                        <CardProducto
                            nombre="Chifles"
                            precio={0.75}
                            stock={6}
                            imagen={imagenChifles}
                            contador={chifles}
                            descuento={dChifles}
                            setContador={setChifles}
                            setDescuento={setDChifles}
                        />

                    </div>

                </div>

                {/* FACTURA LADO DERECHO */}

                <div className="col-lg-4">

                    <div className="card border-primary">

                        <div className="card-header bg-primary text-white text-center">
                            <h4 className="mb-0">
                                FACTURA
                            </h4>
                        </div>

                        <div className="card-body">

                            <h5>Datos del cliente</h5>

                            <label className="form-label">
                                Nombre:
                            </label>

                            <input
                                type="text"
                                className="form-control form-control-sm mb-2"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />

                            <label className="form-label">
                                Edad:
                            </label>

                            <input
                                type="number"
                                min="1"
                                className="form-control form-control-sm mb-2"
                                value={edad}
                                onChange={(e) => setEdad(e.target.value)}
                            />

                            <label className="form-label">
                                Ciudad:
                            </label>

                            <input
                                type="text"
                                className="form-control form-control-sm mb-3"
                                value={ciudad}
                                onChange={(e) => setCiudad(e.target.value)}
                            />

                            <hr />

                            <h5 className="text-center">
                                Detalle de factura
                            </h5>

                            <div className="table-responsive">

                                <table className="table table-bordered table-sm">

                                    <thead className="table-dark">
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cant.</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {club > 0 && (
                                            <tr>
                                                <td>Club</td>
                                                <td>{club}</td>
                                                <td>
                                                    ${((sClub - descuentoClub) * 1.15).toFixed(2)}
                                                </td>
                                            </tr>
                                        )}

                                        {caran > 0 && (
                                            <tr>
                                                <td>Caran</td>
                                                <td>{caran}</td>
                                                <td>
                                                    ${((sCaran - descuentoCaran) * 1.15).toFixed(2)}
                                                </td>
                                            </tr>
                                        )}

                                        {switchP > 0 && (
                                            <tr>
                                                <td>Switch</td>
                                                <td>{switchP}</td>
                                                <td>
                                                    ${((sSwitch - descuentoSwitch) * 1.15).toFixed(2)}
                                                </td>
                                            </tr>
                                        )}

                                        {ruffles > 0 && (
                                            <tr>
                                                <td>Ruffles</td>
                                                <td>{ruffles}</td>
                                                <td>
                                                    ${((sRuffles - descuentoRuffles) * 1.15).toFixed(2)}
                                                </td>
                                            </tr>
                                        )}

                                        {doritos > 0 && (
                                            <tr>
                                                <td>Doritos</td>
                                                <td>{doritos}</td>
                                                <td>
                                                    ${((sDoritos - descuentoDoritos) * 1.15).toFixed(2)}
                                                </td>
                                            </tr>
                                        )}

                                        {chifles > 0 && (
                                            <tr>
                                                <td>Chifles</td>
                                                <td>{chifles}</td>
                                                <td>
                                                    ${((sChifles - descuentoChifles) * 1.15).toFixed(2)}
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>

                            </div>

                            <hr />

                            <p>
                                Subtotal:
                                <span className="float-end">
                                    ${subtotal.toFixed(2)}
                                </span>
                            </p>

                            <p>
                                Descuento:
                                <span className="float-end">
                                    ${descuentoTotal.toFixed(2)}
                                </span>
                            </p>

                            <p>
                                IVA (15%):
                                <span className="float-end">
                                    ${iva.toFixed(2)}
                                </span>
                            </p>

                            <hr />

                            <h5 className="text-success">
                                Total:
                                <span className="float-end">
                                    ${total.toFixed(2)}
                                </span>
                            </h5>

                            <button
                                className="btn btn-danger w-100 mt-3"
                                onClick={nuevaFactura}
                            >
                                Nueva factura
                            </button>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Productos;
