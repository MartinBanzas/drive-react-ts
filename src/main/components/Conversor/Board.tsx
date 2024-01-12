import { Calculator } from "./Calculator";
import { CoinConversor } from "./CoinConversor";
import { Units } from "./Units";

export const Board = () => {
    return (
        <div className="container mt-5">
    
            <div className="row">
                <div className="col-md-3">
                    <CoinConversor />
                </div>
                <div className="col-md-6 ms-7">
                    <Units />
                </div>
            </div>

           
            <div className="row mt-3">
                <div className="col-md-3 mt-5">
                    <Calculator />
                </div>
                {/* Agregar otro elemento aquí si es necesario */}
            </div>
        </div>
    );
}