export interface TipoClima {
    name: string;
    main: {
        temp: number;
        feels_like: number;
    };
    sys: {
        country: string
    }
}

export interface RespuestaApi {
    actual: TipoClima,
    registros: TipoHistorial | null
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