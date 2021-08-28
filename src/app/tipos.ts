export interface TipoClima {
    [key: string]: any
}

export type TipoCiudades = Array<{
    "ciudad": string,
    "id": number
}>

export type TipoHistorial = Array<{
    id: number;
    registro: TipoClima;
    ciudad: string;
}>;