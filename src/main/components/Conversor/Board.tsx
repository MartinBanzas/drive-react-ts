import { Calculator } from "./Calculator";
import { CoinConversor } from "./CoinConversor";

export const Board = () => {

    return (
        <div>
       <div className="d-flex container">     
    <CoinConversor/>
    </div>
   <Calculator/>
   </div>
    );
}