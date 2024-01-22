import React, { useEffect, useState } from "react";
import UserModel from "../../../models/UserModel";
import { fetchResults } from "../Tetris/components/Leaderboard/ScoreRest";
import { getNombre } from "../Login/TokenHandler";

export const UsersBar = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const tuNombre = getNombre; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchResults();
        setUsers(result);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid w-25 text-white position-fixed mt-3 top-0 end-1 border-radius-xl bg-gradient-dark  ">
      {users.map((user: UserModel) => (
        tuNombre !== user.nombre ? (
          <div key={user.nombre} className="p-2">
             <span className="nav-link-text ms-1">{user.nombre}</span>
          
          </div>
        ) : null
      ))}
    </div>
  );
};
