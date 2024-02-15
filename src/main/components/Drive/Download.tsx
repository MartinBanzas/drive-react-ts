import FicheroModel from "../../../models/FicheroModel";

interface DownloadProps {
    file:FicheroModel;
}

const MenuContext = () => {
    return <div>Hola</div>
}

export const Download: React.FC<DownloadProps> = ({ file }) => {


    const handleRightClick = (e:any) => {
        e.preventDefault();

    }

    const baseUrl = "http://localhost:8080/drive";
    

    return (
        <a href={`${baseUrl}/get/${file.id}`} onContextMenu={(e)=>handleRightClick(e)} download={file.ruta}>
            {file.ruta}
        </a>
    );
};

