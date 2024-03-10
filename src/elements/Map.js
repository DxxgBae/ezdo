import { useEffect, useRef } from 'react';
import { useStore } from './Store';
import './Map.css';

function Map() {
    const mapRef = useRef();
    const { setMap } = useStore();

    useEffect(() => setMap(mapRef.current), [setMap]);

    return (
        <section id='Map'>
            <div ref={mapRef} id='mapDiv' />
        </section>
    );
}

export default Map;