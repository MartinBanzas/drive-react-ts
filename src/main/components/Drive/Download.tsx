import FicheroModel from "../../../models/FicheroModel";

interface DownloadProps {
    file:FicheroModel;
}

export const Download: React.FC<DownloadProps> = ({ file }) => {
    const baseUrl = "http://localhost:8082/drive";

    return (
        <a href={`${baseUrl}/get/${file.id}`} download={file.ruta}>
            {file.ruta}
        </a>
    );
};

