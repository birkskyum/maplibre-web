# maplibre-gl

## Table of contents

### Variables

- [default](../wiki/Exports#default)

## Variables

### default

• `Const` **default**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `AJAXError` | typeof `AJAXError` |
| `AttributionControl` | typeof `AttributionControl` |
| `CanvasSource` | typeof `CanvasSource` |
| `Evented` | typeof `Evented` |
| `FullscreenControl` | typeof `FullscreenControl` |
| `GeoJSONSource` | typeof `GeoJSONSource` |
| `GeolocateControl` | typeof `GeolocateControl` |
| `ImageSource` | typeof `ImageSource` |
| `LngLat` | typeof `LngLat` |
| `LngLatBounds` | typeof `LngLatBounds` |
| `LogoControl` | typeof `LogoControl` |
| `Map` | typeof `Map` |
| `Marker` | typeof `default` |
| `MercatorCoordinate` | typeof `MercatorCoordinate` |
| `NavigationControl` | typeof `NavigationControl` |
| `Point` | typeof `Point` |
| `Popup` | typeof `default` |
| `RasterDEMTileSource` | typeof `RasterDEMTileSource` |
| `RasterTileSource` | typeof `RasterTileSource` |
| `ScaleControl` | typeof `ScaleControl` |
| `Style` | typeof `Style` |
| `TerrainControl` | typeof `default` |
| `VectorTileSource` | typeof `VectorTileSource` |
| `VideoSource` | typeof `VideoSource` |
| `clearPrewarmedResources` | () => `void` |
| `config` | `Config` |
| `getRTLTextPluginStatus` | () => `string` |
| `prewarm` | () => `void` |
| `setRTLTextPlugin` | (`url`: `string`, `callback`: `ErrorCallback`, `deferred`: `boolean`) => `void` |
| `supported` | `IsSupported` |
| `workerUrl` | `string` |
| `get maxParallelImageRequests()` | `number` |
| `get version()` | `string` |
| `get workerCount()` | `number` |
| `addProtocol` | (`customProtocol`: `string`, `loadFn`: (`requestParameters`: `RequestParameters`, `callback`: `ResponseCallback`<`any`\>) => `Cancelable`) => `void` |
| `clearStorage` | (`callback?`: (`err?`: `Error`) => `void`) => `void` |
| `removeProtocol` | (`customProtocol`: `string`) => `void` |

#### Defined in

[index.ts:40](https://github.com/maplibre/maplibre-gl-js/blob/a4f041ee8/src/index.ts#L40)
