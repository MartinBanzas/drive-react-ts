import React, { useCallback } from "react";
import { fetchClimateData } from "./utils/DataAPI";

export const Climate = () => {
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");

  return <div>
    <input type="text" className="form-text mt-3 w-100"onChange={(event)=>setCity(event.target.value)} placeholder="Escribe la ciudad"/>
    <button className="mt-2 btn btn-primary" onClick={()=>fetchClimateData(city, country)}>Click</button>
  </div>;
};
