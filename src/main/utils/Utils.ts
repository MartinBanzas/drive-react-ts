
export const formatFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");
    const hour = String(fecha.getHours()).padStart(2, "0");
    const minute = String(fecha.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}`;
};

export const formatSize = (size: number) => {
    const mb = (size / (1024 * 1024)).toFixed(2);

    if (Number(mb) >= 1) {
        return mb + " MB";
    } else {
        return (size / 1024).toFixed(2) + " kB";
    }
}


