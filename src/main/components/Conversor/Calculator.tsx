import { useState } from 'react';
import './css/calculator.css';
import { calcFactorial } from './css/utils/Math';



export const Calculator = () => {

  const [number, setNumber] = useState('');


  const handleResult = () => {
    try {
      const og = number;
      if (number.includes("^")) {
        const parts = number.split("^");
        const result = Math.pow(Number(parts[0]), Number(parts[1])).toString();
        setNumber(result);
      } else {
        const result=eval(number);
        result %1!==0 ? setNumber(result.toFixed(3)) : setNumber(result);
      }
    } catch (error) {
      
      setNumber("Error");
    }
  }

  const handleButtonClick = (event: any) => setNumber(number + event.target.value);

  const handleOtherOperations = (event: any) => {
    try {
      switch (event.target.value) {
        case "√": const sqrt = Math.sqrt(Number(number)).toFixed(2); setNumber(sqrt.toString()); break;
        case "!": const factorial = calcFactorial(Number(number)); factorial != undefined ? setNumber(factorial.toString()) : setNumber('Error'); break;
        // Needs a protection against undefined.
        case "³√": const cubic = Math.cbrt(Number(number)).toFixed(8); setNumber(cubic.toString());break;
        case "C": setNumber(''); break;
        case "π": setNumber(number + "3.14"); break;
        case "±": const negativeN = Number(number) * -1; setNumber(negativeN.toString());
      }
    } catch (error) {
      setNumber("Error");
    }
  }

  return (


    <div>

      <p className="display-6 bg-gradient-dark text-white">{number === '' ? "0" : number}</p>
      <p className="display-6 bg-gradient-dark text-white"> </p>


      <div className="card calculator-grid gap-1">
        <input type="button" onClick={handleButtonClick} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="1" />
        <input type="button" onClick={handleButtonClick} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="2" />
        <input type="button" onClick={handleButtonClick} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="3" />
        <input type="button" onClick={handleButtonClick} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="+" />
        <input type="button" onClick={handleButtonClick} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="^" />

        <input type="button" onClick={handleButtonClick} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="4" />
        <input type="button" onClick={handleButtonClick} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="5" />
        <input type="button" onClick={handleButtonClick} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="6" />
        <input type="button" onClick={handleButtonClick} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="-" />
        <input type="button" onClick={handleOtherOperations} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="√" />

        <input type="button" onClick={handleButtonClick} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="7" />
        <input type="button" onClick={handleButtonClick} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="8" />
        <input type="button" onClick={handleButtonClick} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="9" />
        <input type="button" onClick={handleButtonClick} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="*" />
        <input type="button" onClick={handleButtonClick} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="%" />

        <input type="button" onClick={handleButtonClick} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="/" />
        <input type="button" onClick={handleButtonClick} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="0" />
        <input type="button" onClick={handleButtonClick} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="." />
        <input type="button" onClick={handleResult} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="=" />
        <input type="button" onClick={handleOtherOperations} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="π" />

        <input type="button" onClick={handleOtherOperations} className="btn btn-primary btn-sm btn-calc " value="C" />
        <input type="button" onClick={handleOtherOperations} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="!" />
        <input type="button" onClick={handleOtherOperations} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="³√" />
        <input type="button" onClick={handleOtherOperations} className="btn btn-primary btn-sm btn-calc bg-gradient-dark" value="±" />

      </div>

    </div>
  );
}





