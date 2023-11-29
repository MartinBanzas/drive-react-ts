import { Calculator } from "./Calculator";
import { CoinConversor } from "./CoinConversor";

export const Board = () => {

    return (
        <div className="">
            <div className="d-flex">
                <CoinConversor />
            </div>

            <div className="d-flex container mt-3" >
            <Calculator />
            </div>
            
        </div>
        
    );
}