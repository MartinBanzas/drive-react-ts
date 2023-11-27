import React, { useCallback, useState } from 'react';

type ExchangeRate = number | string;

export const Board = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate>(0);

  const handleChangeRadio = (event: any) => {
    setSelectedOption(event.target.value);
  };


  const fetchRateExchange = useCallback(async () => {
    
    const api = "api.frankfurter.app";
    const currencyOg = "EUR";
    const currencyDestination = selectedOption;

    const url = `https://${api}/latest?from=${currencyOg}&to=${currencyDestination}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Algo ha ido mal');
      }

      const responseJson = await response.json();
      const newExchangeRate = Object.values(responseJson.rates)[0];

     
      setExchangeRate(Number(newExchangeRate));
      console.log(exchangeRate);

    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }, [selectedOption, amount, exchangeRate]);




  const handleClickConvert: React.MouseEventHandler<HTMLButtonElement> = (event:any) => {
    setAmount((event.target as HTMLInputElement).value);
 const x = fetchRateExchange;
 console.log(exchangeRate);
  };
  

return (
  <div className="container d-flex mt-3 gap-3">
    <div className="card ">
      <div className="card-body">
        <div className="form-check ">
          <input className="form-check-input" name="money" onChange={handleChangeRadio} type="radio" value="YEN" />
          <label className="form-check-label" htmlFor="yen">
            Yen
          </label>

          <input className="form-check-input" name="money" type="radio" onChange={handleChangeRadio} value="USD" />
          <label className="form-check-label" htmlFor="dolar">
            Dólar
          </label>

          <input className="form-check-input" name="money" onChange={handleChangeRadio} type="radio" value="GBP" />
          <label className="form-check-label" htmlFor="libra">
            Libra
          </label>

          <input type="number" id="amount" className="form-control" placeholder="Cantidad" />
          <input type="number" id="convertedAmount" className="form-control" disabled placeholder="Cantidad convertida" />
        </div>
        <button className="btn btn-primary btn-sm" id="euro" onClick={handleClickConvert}>To €
        </button>
        <button className="btn btn-success btn-sm ms-2" id="other">
          To other
        </button>
      </div>
    </div>
  </div>
);
  
  };