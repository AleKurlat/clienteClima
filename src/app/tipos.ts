export type TipoCiudades = Array<{
    "ciudad": string,
    "id": number
}>

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

export type TipoHistorial = Array<{
    id: number;
    registro: TipoClima;
    ciudad: string;
}>;

export interface RespuestaApi {
    actual: TipoClima,
    registros: Array<{
        id: number;
        registro: string;
        ciudad: string;
    }> | null
}

export interface RespuestaApiMapeada {
    actual: TipoClima,
    registros: TipoHistorial | null
}



