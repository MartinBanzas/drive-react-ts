import React, { useRef, useEffect } from "react";

export interface ContextMenuProps {
  id: string;
  items: string[];
  coordinates: {x:number, y:number};
  onHide:()=>void
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ id, items, coordinates, onHide }) => {
  const menuRef = useRef<HTMLUListElement>(null);

  const handleFileDelete = () => {
   
    console.log(id);
  };

  const handleFileRename = () => {
    console.log("renombrar");
  };

  const sortByName = () => {
    console.log("sortName");
  };

  const sortByDate = () => {
    console.log("sortDate");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      onHide();
    }
  };


  useEffect(() => {
    // Adjuntar el event listener al documento para manejar los clics fuera del menú
    document.addEventListener("click", handleClickOutside);

    // Remover el event listener cuando el componente se desmonte para evitar fugas de memoria
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); 

  const handleEvent = (item: string) => {
    switch (item) {
      case "Eliminar":
        handleFileDelete();
        break;
      case "Renombrar":
        handleFileRename();
        break;
      case "Por fecha":
        sortByDate();
        break;
      case "Por nombre":
        sortByName();
        break;
    }
  };


return (
    <ul ref={menuRef} className="ContextMenu" style={{ top: coordinates.y, left: coordinates.x }}>
      {items.map((item: string) => (
        <li key={item} className=""  onClick={() => handleEvent(item)}>
          {item}
        </li>
      ))}
    </ul>
  ) 
}