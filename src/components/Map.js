import React from 'react'
import { MapContainer, TileLayer } from "react-leaflet";
import { showDataOnMap } from '../util';


function Map({ casesType, mapCenter, mapZoom, mapCountries }) {
    console.log(mapCenter)
       return (
        <div>
            <h3 className='mx-5'>Map</h3>
                <div className="map mx-5">
                    <MapContainer center={mapCenter} zoom={mapZoom}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {showDataOnMap(mapCountries, casesType)}
                    </MapContainer>
                </div>
            
        </div>
    )
}

export default Map