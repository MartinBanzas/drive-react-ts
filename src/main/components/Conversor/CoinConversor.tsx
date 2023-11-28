import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import yen from '../../../assets/icons/yen-symbol.png'
import dolar from '../../../assets/icons/dollar.png'
import pound from '../../../assets/icons/pound-symbol-variant.png'

type ExchangeRate = number | string;

export const CoinConversor = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate>(0);
  const [convertedAmount, setConvertedAmount] = useState<Number>();
  const [conversionType, setConversionType] = useState('');
  const [yenOrYuan, setYenOrYuan] = useState('');

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);

    if (event.target.value === 'JPY') {
      setYenOrYuan('JPY');
    } else if (event.target.value === 'CNY') {
      setYenOrYuan('CNY');
    } else setYenOrYuan('');
  };

  const fetchRateExchange = useCallback(async (conversionType: string) => {
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
      setConversionType(conversionType);
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }, [selectedOption]);

  useEffect(() => {
    if (amount !== '' && typeof exchangeRate === 'number') {
      const cantidad: number = conversionType === 'From' ? Number(amount) * exchangeRate : Number(amount) / exchangeRate;
      setConvertedAmount(Number(cantidad.toFixed(2)));
    }
  }, [amount, exchangeRate]);

  function handleAmount(event: ChangeEvent<HTMLInputElement>): void {
    setAmount(event.target.value);
  }

  return (
    <div className="container d-flex ">
      <div className="card">
        <div className="card-body">
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
              <p className={`text-danger`}>
                *{yenOrYuan === 'JPY' ? 'Yen' : 'Yuan'}
              </p>
            )}
            <div>
              <input type="number" id="amount" className="form-control" placeholder="Cantidad" onChange={handleAmount} />
              <input type="number" id="convertedAmount" value={convertedAmount?.toString()} className="form-control" disabled placeholder="Cantidad convertida" />
            </div>
            <div className='justify-content-center align-items-right mt-3'>
              <button className="btn btn-primary btn-sm" id="euro" onClick={() => fetchRateExchange("To")}>
                To €
              </button>
              <button className="btn btn-success btn-sm ms-2" id="other" onClick={() => fetchRateExchange("From")}>
                From €
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}