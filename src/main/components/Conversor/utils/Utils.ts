export const calcFactorial=(num:number)=>  {
    const n = (num);
    if (!isNaN(n) && n >= 0) {
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
       return result;
    }
}

export const translations: Record<string, string> = {
    "clear sky": "Despejado",
    "broken clouds": "Nubes ocasionales",
    "light rain": "Lluvia ligera",
    "thunderstorm": "Tormenta eléctrica",
    "snow": "Nieve",
    "mist": "Niebla",
    "drizzle": "Orballo",
    "overcast clouds": "Nubes", 
    "shower rain": "Lluvia torrencial",
    "few clouds": "Pocas nubes"
  };