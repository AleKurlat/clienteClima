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

export type TipoCiudades = Array<{
    "ciudad": string,
    "id": number
}>

type HistorialEnString = Array<{
    id: number;
    registro: string;
    ciudad: string;
}>;

export interface RespuestaApi {
    actual: TipoClima,
    registros: HistorialEnString | null
}

export type TipoHistorial = Array<{
    id: number;
    registro: TipoClima;
    ciudad: string;
}>;

export interface RespuestaApiMapeada {
    actual: TipoClima,
    registros: TipoHistorial | null
}



