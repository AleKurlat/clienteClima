export interface TipoClima {
    [key: string]: any
}

export interface TipoCiudad {
    "ciudad": string,
    "id": number
}

export type TipoCiudades = Array<TipoCiudad>

export type TipoHistorial = Array<{
    id: number;
    registro: TipoClima;
    ciudad: string;
}>;