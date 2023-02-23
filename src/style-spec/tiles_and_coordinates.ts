import Point from '@mapbox/point-geometry';

export interface ICanonicalTileID {
    z: number;
    x: number;
    y: number;
    key: string;
    equals(id: ICanonicalTileID): {};
    url(urls: Array<string>, pixelRatio: number, scheme?: string | null): string;
    isChildOf(parent: ICanonicalTileID): {};
    getTilePoint(coord: IMercatorCoordinate): Point;
    toString(): {};
}

export interface IMercatorCoordinate {
    x: number;
    y: number;

    toLngLat(): any;
    toAltitude(): any;
    meterInMercatorCoordinateUnits(): any;
}

export interface ILngLat {
    wrap(): {};
    toArray(): {};
    toString(): {};
    distanceTo(lngLat: ILngLat): {};
    convert(input: ILngLatLike): ILngLat;
}

export type ILngLatLike = ILngLat | {
    lng: number;
    lat: number;
} | {
    lon: number;
    lat: number;
} | [number, number];
