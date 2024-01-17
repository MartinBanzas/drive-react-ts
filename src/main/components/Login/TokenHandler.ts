const TokenHandler = () => {
    const tokenLocalStorage = localStorage.getItem('token');

    if (!tokenLocalStorage) {
        // Manejar el caso donde el token no está presente
        console.error("Token no encontrado en el almacenamiento local.");
        return { valid: false, username: null };
    }

    const [headerBase64, payloadBase64, signatureBase64] = tokenLocalStorage.split(".");

    // Decodificar la carga (payload) del token
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

  
    //Fecha caducidad
    const expirationTimestamp = payload.exp;
   
    const expirationDate = new Date(expirationTimestamp * 1000);

    //username
    const username = payload.sub; // Asumiendo que 'username' es el campo en el payload que contiene el nombre de usuario

    return { valid: expirationDate.getTime() > Date.now(), username };
}

export const { valid: isTokenValid, username: getUsername } = TokenHandler();