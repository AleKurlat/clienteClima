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
    registros: TipoHistorial | null
}



