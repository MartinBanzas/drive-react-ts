export const TokenHandler = () => {

    const tokenLocalStorage = localStorage.getItem('token');


    if (!tokenLocalStorage) {
        // Manejar el caso donde el token no está presente
        console.error("Token no encontrado en el almacenamiento local.");
        return false;
    }


    const [headerBase64, payloadBase64, signatureBase64] = tokenLocalStorage.split(".");

    // Decodificar la carga (payload) del token
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    // Acceder a la información del payload, por ejemplo, la fecha de expiración
    const expirationTimestamp = payload.exp;
    const expirationDate = new Date(expirationTimestamp * 1000); 

 return expirationDate.getTime() > Date.now();
}

export const DeleteToken = () => {
    localStorage.removeItem("token");
}