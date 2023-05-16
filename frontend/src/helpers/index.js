export const formatearDinero = cantidad => {
    return cantidad.toLocaleString('es-ES',
    { style: 'currency', currency: 'EUR' })
}

export const numeroMesa = (cantidad) => {
    cantidad.forEach(element => {
        return element;
    });
}