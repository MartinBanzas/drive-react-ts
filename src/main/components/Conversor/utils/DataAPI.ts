

export const fetchClimateData = async ( city: String, country:String) => {
  const apiKey = "5d22dee67f1f6a4a8092cad66ab624d4";

  const url='https://api.openweathermap.org/data/2.5/'
  const fetchCurrentWeather = `${url}weather?q=${city},${country}&APPID=${apiKey}&units=metric`;
  const fetchForecast = `${url}forecast?q=${city},${country}&APPID=${apiKey}&units=metric`;
  try {
    const currentResponse = await fetch(fetchCurrentWeather);
    const forecastResponse =await fetch(fetchForecast)
    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("Algo ha ido mal");
    }

    const currentWeatherJson = await currentResponse.json();
    const forecastJson = await forecastResponse.json();
   // console.log(currentWeatherJson);
    console.log(forecastJson)
    return {currentWeatherJson, forecastJson };
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

export const fetchRateExchange = async () => {
  const api = "api.frankfurter.app";
  const url = `https://${api}/latest?from=EUR&to=USD,CNY,JPY,GBP,HKD,INR,KRW,AUD,CAD,CHR,BRL,NOK,TRY,SEK,DKK,CZK,HUF`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Algo ha ido mal");
    }
    const responseJson: Rates = await response.json();
    const newExchangeRate = responseJson.rates;
    return newExchangeRate;
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

export interface Rates {
  rates: {
    USD: number;
    CNY: number;
    JPY: number;
    GBP: number;
    HKD: number;
    INR: number;
    KRW: number;
    AUD: number;
    CAD: number;
    CHR: number;
    BRL: number;
    NOK: number;
    SEK: number;
    TRY: number;
    DKK: number;
    CZK: number;
    HUF: number;
  };
}