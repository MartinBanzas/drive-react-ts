import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import yen from '../../../assets/icons/yen-symbol.png'
import dolar from '../../../assets/icons/dollar.png'
import pound from '../../../assets/icons/pound-symbol-variant.png'

interface Rates {
  rates: {
    USD: Number,
    CNY: Number,
    JPY: Number,
    GBP: Number
  };

}

export const CoinConversor = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<Rates['rates'] | undefined>();
  const [convertedAmount, setConvertedAmount] = useState<Number>();
  const [yenOrYuan, setYenOrYuan] = useState('');

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);

    if (event.target.value === 'JPY') {
      setYenOrYuan('JPY');
    } else if (event.target.value === 'CNY') {
      setYenOrYuan('CNY');
    } else setYenOrYuan('');
  };

  const fetchRateExchange = useCallback(async () => {
    const api = "api.frankfurter.app";
    const url = `https://${api}/latest?from=EUR&to=USD,CNY,JPY,GBP`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Algo ha ido mal');
      }
      const responseJson: Rates = await response.json();
      const newExchangeRate = responseJson.rates;
      setExchangeRate(newExchangeRate);
     
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }, []);

  useEffect(() => {
    fetchRateExchange();
  }, []);

  const handleAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  }

  const handleConversion = (conversionType: string): void => {

    if (exchangeRate) {
      let fConversion;
      switch (selectedOption) {
        case "JPY": fConversion = exchangeRate.JPY; break;
        case "USD": fConversion = exchangeRate.USD; break;
        case "GBP": fConversion = exchangeRate.GBP; break;
        case "CNY": fConversion = exchangeRate.CNY; break;
      }
      const cantidad: number = conversionType === 'From' ? Number(amount) * Number(fConversion) : Number(amount) / Number(fConversion);
      setConvertedAmount(Number(cantidad.toFixed(2)));
    }
  }

  return (
    <div className=" ">
      <div className="card">
        <div className="card-body ">
          <div className="form-check">
            <input className="form-check-input" name="money" onChange={handleChangeRadio} type="radio" value="JPY" />
            <img src={yen} height="16px" width="16px" alt="yen" />
            <input className="form-check-input" name="money" type="radio" onChange={handleChangeRadio} value="USD" />
            <img src={dolar} height="16px" width="16px" alt="dollar" />
            <input className="form-check-input" name="money" onChange={handleChangeRadio} type="radio" value="GBP" />
            <img src={pound} height="16px" width="16px" alt="pound" />
            <input className="form-check-input" name="money" onChange={handleChangeRadio} type="radio" value="CNY" />
            <img src={yen} height="16px" width="16px" alt="yen" />
            {yenOrYuan !== '' && (
              <p className="text-danger mt">
                *{yenOrYuan === 'JPY' ? 'Yen' : 'Yuan'}
              </p>
            )}
            <div>
              <input type="number" id="amount" className="form-control mt-3" placeholder="Cantidad" onChange={handleAmount} />
              <input type="number" id="convertedAmount" value={convertedAmount?.toString()} className="form-control" disabled placeholder="Cantidad convertida" />
            </div>
            <div className='justify-content-center align-items-right mt-3'>
              <button className="btn btn-primary btn-sm " id="euro" onClick={() => handleConversion("To")}>
                To €
              </button>
              <button className="btn btn-success btn-sm ms-2" id="other" onClick={() => handleConversion("From")}>
                From €
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}