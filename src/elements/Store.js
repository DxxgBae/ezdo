import { create } from 'zustand';
import html2canvas from 'html2canvas';
import fetchJsonp from 'fetch-jsonp';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';

const keyVworld = 'A8901E28-B93C-3A14-B1C1-2FBC40EB22CA';

export const useStore = create((set) => ({
    map: null,
    setMap: (mapDiv) => set((state) => {
        if (state.map) return state;

        const center = [14300000, 4300000];
        const extent = [center[0] - 1000000, center[1] - 1000000, center[0] + 1000000, center[1] + 1000000];
        const minZoom = 6;
        const maxZoom = 22;

        const map = new Map({
            target: mapDiv,
            controls: [],
            view: new View({
                center: center,
                extent: extent,
                zoom: minZoom,
                minZoom: minZoom,
                maxZoom: maxZoom,
                enableRotation: false
            }),
            layers: [
                new TileLayer({
                    name: '광역시도',
                    source: new TileWMS({
                        url: 'https://api.vworld.kr/req/wms',
                        params: {
                            key: keyVworld,
                            layers: 'lt_c_adsido',
                            sld_body:
                                `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_c_adsido</Name><UserStyle><FeatureTypeStyle>
                                <Rule>
                                    <PolygonSymbolizer>
                                        <Stroke>
                                            <CssParameter name="stroke">#F5F5F5</CssParameter>
                                            <CssParameter name="stroke-width">2</CssParameter>
                                            <CssParameter name="stroke-linejoin">round</CssParameter>
                                            <CssParameter name="stroke-linecap">round</CssParameter>
                                        </Stroke>
                                        <Fill><CssParameter name="fill">#FFFFFF</CssParameter></Fill>
                                    </PolygonSymbolizer>
                                </Rule>
                                </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
                        }
                    })
                }),
                new TileLayer({
                    name: '하천',
                    source: new TileWMS({
                        url: 'https://api.vworld.kr/req/wms',
                        params: {
                            key: keyVworld,
                            layers: 'lt_c_wkmstrm',
                            sld_body:
                                `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_c_wkmstrm</Name><UserStyle><FeatureTypeStyle>
                                <Rule>
                                    <PolygonSymbolizer>
                                        <Fill><CssParameter name="fill">#F5F5F5</CssParameter></Fill>
                                    </PolygonSymbolizer>
                                </Rule>
                                </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
                        }
                    })
                }),
                new TileLayer({
                    name: '일반도로',
                    source: new TileWMS({
                        url: 'https://api.vworld.kr/req/wms',
                        params: {
                            key: keyVworld,
                            layers: 'lt_l_sprd',
                            sld_body:
                                `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_l_sprd</Name><UserStyle><FeatureTypeStyle>
                                <Rule>
                                    <MaxScaleDenominator>30000</MaxScaleDenominator>
                                    <PolygonSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
                                        <Stroke>
                                            <CssParameter name="stroke">#F5F5F5</CssParameter>
                                            <CssParameter name="stroke-width">
                                                <Function name="Categorize">
                                                    <Function name="env"><Literal>wms_scale_denominator</Literal></Function><Add><PropertyName>road_bt</PropertyName><Literal>5</Literal></Add>
                                                    <Literal>5000</Literal><Add><PropertyName>road_bt</PropertyName><Literal>10</Literal></Add>
                                                </Function>
                                            </CssParameter>
                                            <CssParameter name="stroke-linejoin">round</CssParameter>
                                            <CssParameter name="stroke-linecap">round</CssParameter>
                                        </Stroke>
                                    </PolygonSymbolizer>
                                </Rule>
                                </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
                        }
                    })
                }),
                new TileLayer({
                    name: '일반도로',
                    source: new TileWMS({
                        url: 'https://api.vworld.kr/req/wms',
                        params: {
                            key: keyVworld,
                            layers: 'lt_l_moctlink',
                            sld_body:
                                `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_l_moctlink</Name><UserStyle><FeatureTypeStyle>
                                <Rule>
                                    <MinScaleDenominator>30000</MinScaleDenominator>
                                    <MaxScaleDenominator>500000</MaxScaleDenominator>
                                    <Filter>
                                        <And>
                                            <PropertyIsGreaterThan><PropertyName>lanes</PropertyName><Literal>1</Literal></PropertyIsGreaterThan>
                                            <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>rd_type_h</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                            <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>road_name</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                        </And>
                                    </Filter>
                                    <PolygonSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
                                        <Stroke>
                                            <CssParameter name="stroke">#F5F5F5</CssParameter>
                                            <CssParameter name="stroke-width">
                                                <Function name="Categorize">
                                                    <Function name="env"><Literal>wms_scale_denominator</Literal></Function><Mul><Literal>40</Literal><Literal>1.5</Literal></Mul>
                                                    <Literal>100000</Literal><Mul><Literal>80</Literal><Literal>1.5</Literal></Mul>
                                                </Function>
                                            </CssParameter>
                                            <CssParameter name="stroke-linejoin">round</CssParameter>
                                            <CssParameter name="stroke-linecap">round</CssParameter>
                                        </Stroke>
                                    </PolygonSymbolizer>
                                </Rule>
                                </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
                        }
                    })
                }),
                new TileLayer({
                    name: '일반도로',
                    source: new TileWMS({
                        url: 'https://api.vworld.kr/req/wms',
                        params: {
                            key: keyVworld,
                            layers: 'lt_l_sprd',
                            sld_body:
                                `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_l_sprd</Name><UserStyle><FeatureTypeStyle>
                                <Rule>
                                    <MaxScaleDenominator>30000</MaxScaleDenominator>
                                    <PolygonSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
                                        <Stroke>
                                            <CssParameter name="stroke">#FDFDFD</CssParameter>
                                            <CssParameter name="stroke-width"><PropertyName>road_bt</PropertyName></CssParameter>
                                            <CssParameter name="stroke-linejoin">round</CssParameter>
                                            <CssParameter name="stroke-linecap">round</CssParameter>
                                        </Stroke>
                                    </PolygonSymbolizer>
                                </Rule>
                                </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
                        }
                    })
                }),
                new TileLayer({
                    name: '일반도로',
                    source: new TileWMS({
                        url: 'https://api.vworld.kr/req/wms',
                        params: {
                            key: keyVworld,
                            layers: 'lt_l_moctlink',
                            sld_body:
                                `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_l_moctlink</Name><UserStyle><FeatureTypeStyle>
                                <Rule>
                                    <MinScaleDenominator>30000</MinScaleDenominator>
                                    <MaxScaleDenominator>500000</MaxScaleDenominator>
                                    <Filter>
                                        <And>
                                            <PropertyIsGreaterThan><PropertyName>lanes</PropertyName><Literal>1</Literal></PropertyIsGreaterThan>
                                            <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>rd_type_h</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                            <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>road_name</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                        </And>
                                    </Filter>
                                    <PolygonSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
                                        <Stroke>
                                            <CssParameter name="stroke">#FDFDFD</CssParameter>
                                            <CssParameter name="stroke-width">
                                                <Function name="Categorize">
                                                    <Function name="env"><Literal>wms_scale_denominator</Literal></Function><Literal>40</Literal>
                                                    <Literal>100000</Literal><Literal>80</Literal>
                                                </Function>
                                            </CssParameter>
                                            <CssParameter name="stroke-linejoin">round</CssParameter>
                                            <CssParameter name="stroke-linecap">round</CssParameter>
                                        </Stroke>
                                    </PolygonSymbolizer>
                                </Rule>
                                </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
                        }
                    })
                }),
                new TileLayer({
                    name: '주간선도로',
                    source: new TileWMS({
                        url: 'https://api.vworld.kr/req/wms',
                        params: {
                            key: keyVworld,
                            layers: 'lt_l_moctlink',
                            sld_body:
                                `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_l_moctlink</Name><UserStyle><FeatureTypeStyle>
                                <Rule>
                                    <MaxScaleDenominator>1500000</MaxScaleDenominator>
                                    <Filter>
                                        <And>
                                            <PropertyIsEqualTo><PropertyName>road_rank</PropertyName><Literal>103</Literal></PropertyIsEqualTo>
                                            <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>rd_type_h</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                            <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>road_name</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                        </And>
                                    </Filter>
                                    <PolygonSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
                                        <Stroke>
                                            <CssParameter name="stroke">#FDF5E6</CssParameter>
                                            <CssParameter name="stroke-width">
                                                <Function name="Categorize">
                                                    <Function name="env"><Literal>wms_scale_denominator</Literal></Function><Add><Mul><PropertyName>lanes</PropertyName><Literal>10</Literal></Mul><Literal>10</Literal></Add>
                                                    <Literal>30000</Literal><Mul><Literal>50</Literal><Literal>1.5</Literal></Mul>
                                                    <Literal>100000</Literal><Mul><Literal>200</Literal><Literal>1.5</Literal></Mul>
                                                    <Literal>500000</Literal><Mul><Literal>500</Literal><Literal>1.5</Literal></Mul>
                                                </Function>
                                            </CssParameter>
                                            <CssParameter name="stroke-linejoin">round</CssParameter>
                                        </Stroke>
                                    </PolygonSymbolizer>
                                </Rule>
                                </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
                        }
                    })
                }),
                new TileLayer({
                    name: '주간선도로',
                    source: new TileWMS({
                        url: 'https://api.vworld.kr/req/wms',
                        params: {
                            key: keyVworld,
                            layers: 'lt_l_moctlink',
                            sld_body:
                                `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_l_moctlink</Name><UserStyle><FeatureTypeStyle>
                                <Rule>
                                    <MaxScaleDenominator>1500000</MaxScaleDenominator>
                                    <Filter>
                                        <And>
                                            <PropertyIsEqualTo><PropertyName>road_rank</PropertyName><Literal>103</Literal></PropertyIsEqualTo>
                                            <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>rd_type_h</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                            <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>road_name</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                        </And>
                                    </Filter>
                                    <PolygonSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
                                        <Stroke>
                                            <CssParameter name="stroke">#FFFAF0</CssParameter>
                                            <CssParameter name="stroke-width">
                                                <Function name="Categorize">
                                                    <Function name="env"><Literal>wms_scale_denominator</Literal></Function><Mul><PropertyName>lanes</PropertyName><Literal>10</Literal></Mul>
                                                    <Literal>30000</Literal><Literal>50</Literal>
                                                    <Literal>100000</Literal><Literal>200</Literal>
                                                    <Literal>500000</Literal><Literal>500</Literal>
                                                </Function>
                                            </CssParameter>
                                            <CssParameter name="stroke-linejoin">round</CssParameter>
                                        </Stroke>
                                    </PolygonSymbolizer>
                                </Rule>
                                </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
                        }
                    })
                }),
                new TileLayer({
                    name: '고속도로',
                    source: new TileWMS({
                        url: 'https://api.vworld.kr/req/wms',
                        params: {
                            key: keyVworld,
                            layers: 'lt_l_moctlink',
                            sld_body:
                                `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_l_moctlink</Name><UserStyle><FeatureTypeStyle>
                                <Rule>
                                    <Filter>
                                        <And>
                                            <PropertyIsLessThan><PropertyName>road_rank</PropertyName><Literal>103</Literal></PropertyIsLessThan>
                                            <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>rd_type_h</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                            <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>road_name</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                            <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>link_id</PropertyName><Literal>114028*</Literal></PropertyIsLike></Not>
                                            <PropertyIsNotEqualTo><PropertyName>link_id</PropertyName><Literal>1150437701</Literal></PropertyIsNotEqualTo>
                                        </And>
                                    </Filter>
                                    <PolygonSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
                                        <Stroke>
                                            <CssParameter name="stroke">#FAEBD7</CssParameter>
                                            <CssParameter name="stroke-width">
                                                <Function name="Categorize">
                                                    <Function name="env"><Literal>wms_scale_denominator</Literal></Function><Add><Mul><PropertyName>lanes</PropertyName><Literal>10</Literal></Mul><Literal>10</Literal></Add>
                                                    <Literal>30000</Literal><Mul><Literal>50</Literal><Literal>1.5</Literal></Mul>
                                                    <Literal>100000</Literal><Mul><Literal>200</Literal><Literal>1.5</Literal></Mul>
                                                    <Literal>500000</Literal><Mul><Literal>500</Literal><Literal>1.5</Literal></Mul>
                                                    <Literal>1500000</Literal><Mul><Literal>1000</Literal><Literal>1.5</Literal></Mul>
                                                </Function>
                                            </CssParameter>
                                            <CssParameter name="stroke-linejoin">round</CssParameter>
                                        </Stroke>
                                    </PolygonSymbolizer>
                                </Rule>
                                </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
                        }
                    })
                }),
                new TileLayer({
                    name: '고속도로',
                    source: new TileWMS({
                        url: 'https://api.vworld.kr/req/wms',
                        params: {
                            key: keyVworld,
                            layers: 'lt_l_moctlink',
                            sld_body:
                                `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_l_moctlink</Name><UserStyle><FeatureTypeStyle>
                                <Rule>
                                    <Filter>
                                        <And>
                                            <PropertyIsLessThan><PropertyName>road_rank</PropertyName><Literal>103</Literal></PropertyIsLessThan>
                                            <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>rd_type_h</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                            <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>road_name</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                            <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>link_id</PropertyName><Literal>114028*</Literal></PropertyIsLike></Not>
                                            <PropertyIsNotEqualTo><PropertyName>link_id</PropertyName><Literal>1150437701</Literal></PropertyIsNotEqualTo>
                                        </And>
                                    </Filter>
                                    <PolygonSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
                                        <Stroke>
                                            <CssParameter name="stroke">#FDF5E6</CssParameter>
                                            <CssParameter name="stroke-width">
                                                <Function name="Categorize">
                                                    <Function name="env"><Literal>wms_scale_denominator</Literal></Function><Mul><PropertyName>lanes</PropertyName><Literal>10</Literal></Mul>
                                                    <Literal>30000</Literal><Literal>50</Literal>
                                                    <Literal>100000</Literal><Literal>200</Literal>
                                                    <Literal>500000</Literal><Literal>500</Literal>
                                                    <Literal>1500000</Literal><Literal>1000</Literal>
                                                </Function>
                                            </CssParameter>
                                            <CssParameter name="stroke-linejoin">round</CssParameter>
                                        </Stroke>
                                    </PolygonSymbolizer>
                                </Rule>
                                </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
                        }
                    })
                }),
                new TileLayer({
                    name: '지번',
                    visible: false,
                    source: new TileWMS({
                        url: 'https://api.vworld.kr/req/wms',
                        params: {
                            key: keyVworld,
                            layers: 'lp_pa_cbnd_bubun',
                            sld_body:
                                `<StyledLayerDescriptor><NamedLayer><Name>sop:lp_pa_cbnd_bubun</Name><UserStyle><FeatureTypeStyle>
                                <Rule>
                                    <MaxScaleDenominator>30000</MaxScaleDenominator>
                                    <PolygonSymbolizer>
                                        <Stroke>
                                            <CssParameter name="stroke">#696969</CssParameter>
                                            <CssParameter name="stroke-width">1</CssParameter>
                                            <CssParameter name="stroke-linejoin">round</CssParameter>
                                            <CssParameter name="stroke-linecap">round</CssParameter>
                                        </Stroke>
                                    </PolygonSymbolizer>
                                </Rule>
                                </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
                        }
                    })
                }),
                new TileLayer({
                    name: '지번',
                    visible: false,
                    source: new TileWMS({
                        url: 'https://api.vworld.kr/req/wms',
                        params: {
                            key: keyVworld,
                            layers: 'lp_pa_cbnd_bonbun',
                            sld_body:
                                `<StyledLayerDescriptor><NamedLayer><Name>sop:lp_pa_cbnd_bonbun</Name><UserStyle><FeatureTypeStyle>
                                <Rule>
                                    <MaxScaleDenominator>30000</MaxScaleDenominator>
                                    <PolygonSymbolizer>
                                        <Stroke>
                                            <CssParameter name="stroke">#696969</CssParameter>
                                            <CssParameter name="stroke-width">1</CssParameter>
                                            <CssParameter name="stroke-linejoin">round</CssParameter>
                                            <CssParameter name="stroke-linecap">round</CssParameter>
                                        </Stroke>
                                    </PolygonSymbolizer>
                                </Rule>
                                </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
                        }
                    })
                }),
                new TileLayer({
                    name: '시군구',
                    source: new TileWMS({
                        url: 'https://api.vworld.kr/req/wms',
                        params: {
                            key: keyVworld,
                            layers: 'lt_c_adsigg',
                            sld_body:
                                `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_c_adsigg</Name><UserStyle><FeatureTypeStyle>
                                <Rule>
                                    <MaxScaleDenominator>1500000</MaxScaleDenominator>
                                    <PolygonSymbolizer>
                                        <Stroke>
                                            <CssParameter name="stroke">#DCDCDC</CssParameter>
                                            <CssParameter name="stroke-width">1</CssParameter>
                                            <CssParameter name="stroke-opacity">.5</CssParameter>
                                            <CssParameter name="stroke-linejoin">round</CssParameter>
                                            <CssParameter name="stroke-linecap">round</CssParameter>
                                            <CssParameter name="stroke-dasharray">1 6</CssParameter>
                                        </Stroke>
                                    </PolygonSymbolizer>
                                </Rule>
                                </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
                        }
                    })
                }),
                new TileLayer({
                    name: '읍면동',
                    visible: false,
                    source: new TileWMS({
                        url: 'https://api.vworld.kr/req/wms',
                        params: {
                            key: keyVworld,
                            layers: 'lt_c_ademd',
                            sld_body:
                                `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_c_ademd</Name><UserStyle><FeatureTypeStyle>
                                <Rule>
                                    <MaxScaleDenominator>500000</MaxScaleDenominator>
                                    <PolygonSymbolizer>
                                        <Stroke>
                                            <CssParameter name="stroke">#DCDCDC</CssParameter>
                                            <CssParameter name="stroke-width">1</CssParameter>
                                            <CssParameter name="stroke-opacity">.5</CssParameter>
                                            <CssParameter name="stroke-linejoin">round</CssParameter>
                                            <CssParameter name="stroke-linecap">round</CssParameter>
                                            <CssParameter name="stroke-dasharray">1 6</CssParameter>
                                        </Stroke>
                                    </PolygonSymbolizer>
                                </Rule>
                                </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
                        }
                    })
                }),
                new TileLayer({
                    name: '리',
                    visible: false,
                    source: new TileWMS({
                        url: 'https://api.vworld.kr/req/wms',
                        params: {
                            key: keyVworld,
                            layers: 'lt_c_adri',
                            sld_body:
                                `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_c_adri</Name><UserStyle><FeatureTypeStyle>
                                <Rule>
                                    <MaxScaleDenominator>500000</MaxScaleDenominator>
                                    <PolygonSymbolizer>
                                        <Stroke>
                                            <CssParameter name="stroke">#DCDCDC</CssParameter>
                                            <CssParameter name="stroke-width">1</CssParameter>
                                            <CssParameter name="stroke-opacity">.5</CssParameter>
                                            <CssParameter name="stroke-linejoin">round</CssParameter>
                                            <CssParameter name="stroke-linecap">round</CssParameter>
                                            <CssParameter name="stroke-dasharray">1 6</CssParameter>
                                        </Stroke>
                                    </PolygonSymbolizer>
                                </Rule>
                                </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
                        }
                    })
                }),
            ],
        });

        return { map: map };
    }),
}));
/* 
[
    new TileLayer({
        name: '광역시도',
        source: new TileWMS({
            url: 'https://api.vworld.kr/req/wms',
            params: {
                key: keyVworld,
                layers: 'lt_c_adsido',
                sld_body:
                    `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_c_adsido</Name><UserStyle><FeatureTypeStyle>
                    <Rule>
                        <PolygonSymbolizer>
                            <Stroke>
                                <CssParameter name="stroke">#F5F5F5</CssParameter>
                                <CssParameter name="stroke-width">2</CssParameter>
                                <CssParameter name="stroke-linejoin">round</CssParameter>
                                <CssParameter name="stroke-linecap">round</CssParameter>
                            </Stroke>
                            <Fill><CssParameter name="fill">#FFFFFF</CssParameter></Fill>
                        </PolygonSymbolizer>
                    </Rule>
                    </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
            }
        })
    }),
    new TileLayer({
        name: '하천',
        source: new TileWMS({
            url: 'https://api.vworld.kr/req/wms',
            params: {
                key: keyVworld,
                layers: 'lt_c_wkmstrm',
                sld_body:
                    `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_c_wkmstrm</Name><UserStyle><FeatureTypeStyle>
                    <Rule>
                        <PolygonSymbolizer>
                            <Fill><CssParameter name="fill">#F5F5F5</CssParameter></Fill>
                        </PolygonSymbolizer>
                    </Rule>
                    </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
            }
        })
    }),
    new TileLayer({
        name: '일반도로',
        source: new TileWMS({
            url: 'https://api.vworld.kr/req/wms',
            params: {
                key: keyVworld,
                layers: 'lt_l_sprd',
                sld_body:
                    `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_l_sprd</Name><UserStyle><FeatureTypeStyle>
                    <Rule>
                        <MaxScaleDenominator>30000</MaxScaleDenominator>
                        <PolygonSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
                            <Stroke>
                                <CssParameter name="stroke">#F5F5F5</CssParameter>
                                <CssParameter name="stroke-width">
                                    <Function name="Categorize">
                                        <Function name="env"><Literal>wms_scale_denominator</Literal></Function><Add><PropertyName>road_bt</PropertyName><Literal>5</Literal></Add>
                                        <Literal>5000</Literal><Add><PropertyName>road_bt</PropertyName><Literal>10</Literal></Add>
                                    </Function>
                                </CssParameter>
                                <CssParameter name="stroke-linejoin">round</CssParameter>
                                <CssParameter name="stroke-linecap">round</CssParameter>
                            </Stroke>
                        </PolygonSymbolizer>
                    </Rule>
                    </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
            }
        })
    }),
    new TileLayer({
        name: '일반도로',
        source: new TileWMS({
            url: 'https://api.vworld.kr/req/wms',
            params: {
                key: keyVworld,
                layers: 'lt_l_moctlink',
                sld_body:
                    `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_l_moctlink</Name><UserStyle><FeatureTypeStyle>
                    <Rule>
                        <MinScaleDenominator>30000</MinScaleDenominator>
                        <MaxScaleDenominator>500000</MaxScaleDenominator>
                        <Filter>
                            <And>
                                <PropertyIsGreaterThan><PropertyName>lanes</PropertyName><Literal>1</Literal></PropertyIsGreaterThan>
                                <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>rd_type_h</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>road_name</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                            </And>
                        </Filter>
                        <PolygonSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
                            <Stroke>
                                <CssParameter name="stroke">#F5F5F5</CssParameter>
                                <CssParameter name="stroke-width">
                                    <Function name="Categorize">
                                        <Function name="env"><Literal>wms_scale_denominator</Literal></Function><Mul><Literal>40</Literal><Literal>1.5</Literal></Mul>
                                        <Literal>100000</Literal><Mul><Literal>80</Literal><Literal>1.5</Literal></Mul>
                                    </Function>
                                </CssParameter>
                                <CssParameter name="stroke-linejoin">round</CssParameter>
                                <CssParameter name="stroke-linecap">round</CssParameter>
                            </Stroke>
                        </PolygonSymbolizer>
                    </Rule>
                    </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
            }
        })
    }),
    new TileLayer({
        name: '일반도로',
        source: new TileWMS({
            url: 'https://api.vworld.kr/req/wms',
            params: {
                key: keyVworld,
                layers: 'lt_l_sprd',
                sld_body:
                    `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_l_sprd</Name><UserStyle><FeatureTypeStyle>
                    <Rule>
                        <MaxScaleDenominator>30000</MaxScaleDenominator>
                        <PolygonSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
                            <Stroke>
                                <CssParameter name="stroke">#FDFDFD</CssParameter>
                                <CssParameter name="stroke-width"><PropertyName>road_bt</PropertyName></CssParameter>
                                <CssParameter name="stroke-linejoin">round</CssParameter>
                                <CssParameter name="stroke-linecap">round</CssParameter>
                            </Stroke>
                        </PolygonSymbolizer>
                    </Rule>
                    </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
            }
        })
    }),
    new TileLayer({
        name: '일반도로',
        source: new TileWMS({
            url: 'https://api.vworld.kr/req/wms',
            params: {
                key: keyVworld,
                layers: 'lt_l_moctlink',
                sld_body:
                    `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_l_moctlink</Name><UserStyle><FeatureTypeStyle>
                    <Rule>
                        <MinScaleDenominator>30000</MinScaleDenominator>
                        <MaxScaleDenominator>500000</MaxScaleDenominator>
                        <Filter>
                            <And>
                                <PropertyIsGreaterThan><PropertyName>lanes</PropertyName><Literal>1</Literal></PropertyIsGreaterThan>
                                <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>rd_type_h</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>road_name</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                            </And>
                        </Filter>
                        <PolygonSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
                            <Stroke>
                                <CssParameter name="stroke">#FDFDFD</CssParameter>
                                <CssParameter name="stroke-width">
                                    <Function name="Categorize">
                                        <Function name="env"><Literal>wms_scale_denominator</Literal></Function><Literal>40</Literal>
                                        <Literal>100000</Literal><Literal>80</Literal>
                                    </Function>
                                </CssParameter>
                                <CssParameter name="stroke-linejoin">round</CssParameter>
                                <CssParameter name="stroke-linecap">round</CssParameter>
                            </Stroke>
                        </PolygonSymbolizer>
                    </Rule>
                    </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
            }
        })
    }),
    new TileLayer({
        name: '주간선도로',
        source: new TileWMS({
            url: 'https://api.vworld.kr/req/wms',
            params: {
                key: keyVworld,
                layers: 'lt_l_moctlink',
                sld_body:
                    `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_l_moctlink</Name><UserStyle><FeatureTypeStyle>
                    <Rule>
                        <MaxScaleDenominator>1500000</MaxScaleDenominator>
                        <Filter>
                            <And>
                                <PropertyIsEqualTo><PropertyName>road_rank</PropertyName><Literal>103</Literal></PropertyIsEqualTo>
                                <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>rd_type_h</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>road_name</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                            </And>
                        </Filter>
                        <PolygonSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
                            <Stroke>
                                <CssParameter name="stroke">#FDF5E6</CssParameter>
                                <CssParameter name="stroke-width">
                                    <Function name="Categorize">
                                        <Function name="env"><Literal>wms_scale_denominator</Literal></Function><Add><Mul><PropertyName>lanes</PropertyName><Literal>10</Literal></Mul><Literal>10</Literal></Add>
                                        <Literal>30000</Literal><Mul><Literal>50</Literal><Literal>1.5</Literal></Mul>
                                        <Literal>100000</Literal><Mul><Literal>200</Literal><Literal>1.5</Literal></Mul>
                                        <Literal>500000</Literal><Mul><Literal>500</Literal><Literal>1.5</Literal></Mul>
                                    </Function>
                                </CssParameter>
                                <CssParameter name="stroke-linejoin">round</CssParameter>
                            </Stroke>
                        </PolygonSymbolizer>
                    </Rule>
                    </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
            }
        })
    }),
    new TileLayer({
        name: '주간선도로',
        source: new TileWMS({
            url: 'https://api.vworld.kr/req/wms',
            params: {
                key: keyVworld,
                layers: 'lt_l_moctlink',
                sld_body:
                    `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_l_moctlink</Name><UserStyle><FeatureTypeStyle>
                    <Rule>
                        <MaxScaleDenominator>1500000</MaxScaleDenominator>
                        <Filter>
                            <And>
                                <PropertyIsEqualTo><PropertyName>road_rank</PropertyName><Literal>103</Literal></PropertyIsEqualTo>
                                <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>rd_type_h</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>road_name</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                            </And>
                        </Filter>
                        <PolygonSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
                            <Stroke>
                                <CssParameter name="stroke">#FFFAF0</CssParameter>
                                <CssParameter name="stroke-width">
                                    <Function name="Categorize">
                                        <Function name="env"><Literal>wms_scale_denominator</Literal></Function><Mul><PropertyName>lanes</PropertyName><Literal>10</Literal></Mul>
                                        <Literal>30000</Literal><Literal>50</Literal>
                                        <Literal>100000</Literal><Literal>200</Literal>
                                        <Literal>500000</Literal><Literal>500</Literal>
                                    </Function>
                                </CssParameter>
                                <CssParameter name="stroke-linejoin">round</CssParameter>
                            </Stroke>
                        </PolygonSymbolizer>
                    </Rule>
                    </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
            }
        })
    }),
    new TileLayer({
        name: '고속도로',
        source: new TileWMS({
            url: 'https://api.vworld.kr/req/wms',
            params: {
                key: keyVworld,
                layers: 'lt_l_moctlink',
                sld_body:
                    `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_l_moctlink</Name><UserStyle><FeatureTypeStyle>
                    <Rule>
                        <Filter>
                            <And>
                                <PropertyIsLessThan><PropertyName>road_rank</PropertyName><Literal>103</Literal></PropertyIsLessThan>
                                <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>rd_type_h</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>road_name</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>link_id</PropertyName><Literal>114028*</Literal></PropertyIsLike></Not>
                                <PropertyIsNotEqualTo><PropertyName>link_id</PropertyName><Literal>1150437701</Literal></PropertyIsNotEqualTo>
                            </And>
                        </Filter>
                        <PolygonSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
                            <Stroke>
                                <CssParameter name="stroke">#FAEBD7</CssParameter>
                                <CssParameter name="stroke-width">
                                    <Function name="Categorize">
                                        <Function name="env"><Literal>wms_scale_denominator</Literal></Function><Add><Mul><PropertyName>lanes</PropertyName><Literal>10</Literal></Mul><Literal>10</Literal></Add>
                                        <Literal>30000</Literal><Mul><Literal>50</Literal><Literal>1.5</Literal></Mul>
                                        <Literal>100000</Literal><Mul><Literal>200</Literal><Literal>1.5</Literal></Mul>
                                        <Literal>500000</Literal><Mul><Literal>500</Literal><Literal>1.5</Literal></Mul>
                                        <Literal>1500000</Literal><Mul><Literal>1000</Literal><Literal>1.5</Literal></Mul>
                                    </Function>
                                </CssParameter>
                                <CssParameter name="stroke-linejoin">round</CssParameter>
                            </Stroke>
                        </PolygonSymbolizer>
                    </Rule>
                    </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
            }
        })
    }),
    new TileLayer({
        name: '고속도로',
        source: new TileWMS({
            url: 'https://api.vworld.kr/req/wms',
            params: {
                key: keyVworld,
                layers: 'lt_l_moctlink',
                sld_body:
                    `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_l_moctlink</Name><UserStyle><FeatureTypeStyle>
                    <Rule>
                        <Filter>
                            <And>
                                <PropertyIsLessThan><PropertyName>road_rank</PropertyName><Literal>103</Literal></PropertyIsLessThan>
                                <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>rd_type_h</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>road_name</PropertyName><Literal>*지하*</Literal></PropertyIsLike></Not>
                                <Not><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>link_id</PropertyName><Literal>114028*</Literal></PropertyIsLike></Not>
                                <PropertyIsNotEqualTo><PropertyName>link_id</PropertyName><Literal>1150437701</Literal></PropertyIsNotEqualTo>
                            </And>
                        </Filter>
                        <PolygonSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
                            <Stroke>
                                <CssParameter name="stroke">#FDF5E6</CssParameter>
                                <CssParameter name="stroke-width">
                                    <Function name="Categorize">
                                        <Function name="env"><Literal>wms_scale_denominator</Literal></Function><Mul><PropertyName>lanes</PropertyName><Literal>10</Literal></Mul>
                                        <Literal>30000</Literal><Literal>50</Literal>
                                        <Literal>100000</Literal><Literal>200</Literal>
                                        <Literal>500000</Literal><Literal>500</Literal>
                                        <Literal>1500000</Literal><Literal>1000</Literal>
                                    </Function>
                                </CssParameter>
                                <CssParameter name="stroke-linejoin">round</CssParameter>
                            </Stroke>
                        </PolygonSymbolizer>
                    </Rule>
                    </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
            }
        })
    }),
    new TileLayer({
        name: '지번',
        visible: false,
        source: new TileWMS({
            url: 'https://api.vworld.kr/req/wms',
            params: {
                key: keyVworld,
                layers: 'lp_pa_cbnd_bubun',
                sld_body:
                    `<StyledLayerDescriptor><NamedLayer><Name>sop:lp_pa_cbnd_bubun</Name><UserStyle><FeatureTypeStyle>
                    <Rule>
                        <MaxScaleDenominator>30000</MaxScaleDenominator>
                        <PolygonSymbolizer>
                            <Stroke>
                                <CssParameter name="stroke">#696969</CssParameter>
                                <CssParameter name="stroke-width">1</CssParameter>
                                <CssParameter name="stroke-linejoin">round</CssParameter>
                                <CssParameter name="stroke-linecap">round</CssParameter>
                            </Stroke>
                        </PolygonSymbolizer>
                    </Rule>
                    </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
            }
        })
    }),
    new TileLayer({
        name: '지번',
        visible: false,
        source: new TileWMS({
            url: 'https://api.vworld.kr/req/wms',
            params: {
                key: keyVworld,
                layers: 'lp_pa_cbnd_bonbun',
                sld_body:
                    `<StyledLayerDescriptor><NamedLayer><Name>sop:lp_pa_cbnd_bonbun</Name><UserStyle><FeatureTypeStyle>
                    <Rule>
                        <MaxScaleDenominator>30000</MaxScaleDenominator>
                        <PolygonSymbolizer>
                            <Stroke>
                                <CssParameter name="stroke">#696969</CssParameter>
                                <CssParameter name="stroke-width">1</CssParameter>
                                <CssParameter name="stroke-linejoin">round</CssParameter>
                                <CssParameter name="stroke-linecap">round</CssParameter>
                            </Stroke>
                        </PolygonSymbolizer>
                    </Rule>
                    </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
            }
        })
    }),
    new Layer.Image({
        name: '지번',
        visible: false,
        source: new source.ImageWMS({
            url: 'https://api.vworld.kr/req/wms',
            params: {
                key: keyVworld,
                layers: 'lp_pa_cbnd_bubun',
                sld_body:
                    `<StyledLayerDescriptor><NamedLayer><Name>sop:lp_pa_cbnd_bubun</Name><UserStyle><FeatureTypeStyle>
                    <Rule>
                        <MaxScaleDenominator>30000</MaxScaleDenominator>
                        <TextSymbolizer>
                            <label><PropertyName>bonbun</PropertyName><Function name="if_then_else"><Function name="isNull"><PropertyName>bubun</PropertyName></Function><Literal></Literal><Literal>-</Literal></Function><PropertyName>bubun</PropertyName></label>
                            <LabelPlacement><PointPlacement><AnchorPoint><AnchorPointX>.5</AnchorPointX><AnchorPointY>.5</AnchorPointY></AnchorPoint></PointPlacement></LabelPlacement>
                            <Fill><CssParameter name="fill">#FFFFFF</CssParameter></Fill>
                            <Halo><Radius>2.5</Radius><Fill><CssParameter name="fill">#696969</CssParameter></Fill></Halo>
                        </TextSymbolizer>
                    </Rule>
                    </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
            }
        })
    }),
    new TileLayer({
        name: '시군구',
        source: new TileWMS({
            url: 'https://api.vworld.kr/req/wms',
            params: {
                key: keyVworld,
                layers: 'lt_c_adsigg',
                sld_body:
                    `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_c_adsigg</Name><UserStyle><FeatureTypeStyle>
                    <Rule>
                        <MaxScaleDenominator>1500000</MaxScaleDenominator>
                        <PolygonSymbolizer>
                            <Stroke>
                                <CssParameter name="stroke">#DCDCDC</CssParameter>
                                <CssParameter name="stroke-width">1</CssParameter>
                                <CssParameter name="stroke-opacity">.5</CssParameter>
                                <CssParameter name="stroke-linejoin">round</CssParameter>
                                <CssParameter name="stroke-linecap">round</CssParameter>
                                <CssParameter name="stroke-dasharray">1 6</CssParameter>
                            </Stroke>
                        </PolygonSymbolizer>
                    </Rule>
                    </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
            }
        })
    }),
    new TileLayer({
        name: '읍면동',
        visible: false,
        source: new TileWMS({
            url: 'https://api.vworld.kr/req/wms',
            params: {
                key: keyVworld,
                layers: 'lt_c_ademd',
                sld_body:
                    `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_c_ademd</Name><UserStyle><FeatureTypeStyle>
                    <Rule>
                        <MaxScaleDenominator>500000</MaxScaleDenominator>
                        <PolygonSymbolizer>
                            <Stroke>
                                <CssParameter name="stroke">#DCDCDC</CssParameter>
                                <CssParameter name="stroke-width">1</CssParameter>
                                <CssParameter name="stroke-opacity">.5</CssParameter>
                                <CssParameter name="stroke-linejoin">round</CssParameter>
                                <CssParameter name="stroke-linecap">round</CssParameter>
                                <CssParameter name="stroke-dasharray">1 6</CssParameter>
                            </Stroke>
                        </PolygonSymbolizer>
                    </Rule>
                    </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
            }
        })
    }),
    new TileLayer({
        name: '리',
        visible: false,
        source: new TileWMS({
            url: 'https://api.vworld.kr/req/wms',
            params: {
                key: keyVworld,
                layers: 'lt_c_adri',
                sld_body:
                    `<StyledLayerDescriptor><NamedLayer><Name>sop:lt_c_adri</Name><UserStyle><FeatureTypeStyle>
                    <Rule>
                        <MaxScaleDenominator>500000</MaxScaleDenominator>
                        <PolygonSymbolizer>
                            <Stroke>
                                <CssParameter name="stroke">#DCDCDC</CssParameter>
                                <CssParameter name="stroke-width">1</CssParameter>
                                <CssParameter name="stroke-opacity">.5</CssParameter>
                                <CssParameter name="stroke-linejoin">round</CssParameter>
                                <CssParameter name="stroke-linecap">round</CssParameter>
                                <CssParameter name="stroke-dasharray">1 6</CssParameter>
                            </Stroke>
                        </PolygonSymbolizer>
                    </Rule>
                    </FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
            }
        })
    }),
    new Layer.Vector({
        name: '선택',
        mod: 'lp_pa_cbnd_bubun',
        source: new source.Vector(),
        style: function (e) {
            if (e.get('jibun')) styleSelect.getText().setText(e.get('jibun'));
            return styleSelect;
        }
    })
]
 */