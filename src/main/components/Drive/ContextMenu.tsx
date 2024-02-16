import React, { useRef, useEffect } from "react";
import { ModalRename } from "./utils/ModalRename";

export interface ContextMenuProps {
  id: string;
  items: string[];
  coordinates: {x:number, y:number};
  onHide:()=>void
  handleFilesUpdated: ()=>void
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ id, items, coordinates, onHide, handleFilesUpdated }) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const [showModalRename, setShowModalRename] = React.useState(false);

  const url="http://localhost:8080/drive"
  const handleFileDelete = async () => {
   
    const response = await fetch (`http://localhost:8080/drive/delete/${id}`, {
      method: "DELETE"
    })
    console.log(response);
    if (response.ok) {
      console.log(response)
      onHide();
      handleFilesUpdated();
    }

    
    console.log(id);
  };

  const handleFileRename = () => {
    setShowModalRename(true);
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
    document.addEventListener("click", handleClickOutside);

    // Quitar el event listener cuando el componente se desmonte para evitar fugas de memoria
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
      <ModalRename setShowModalRename={setShowModalRename} showModalRename={showModalRename}/>
    </ul>
  ) 
}