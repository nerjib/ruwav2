import React from "react";
import 'leaflet/dist/leaflet.css'
import { MapContainer, GeoJSON } from "react-leaflet";
import Layout from '../components/Layout'
import MapData from './kad.json'

const ODFMap = () => {

    const handleOnEach = (counter, layer) =>{
        console.log({counter: counter})
        layer.bindPopup(counter?.properties?.admin2Name)
        layer.options.fillOpacity = Math.random();
        layer.on({
            click: (event) => {
                event.target.setStyle({
                    color: 'green',
                    fillColor: 'yellow'
                })
            }
        })
    }
    return(
    <Layout>
    <div>
        <div>Map</div>
        <MapContainer style={{ height: '80vh'}} zoom={8} center={[10.2, 8]}>
            <GeoJSON data={MapData.features} onEachFeature={handleOnEach} />
        </MapContainer>
    </div>
    </Layout>
)}

export default ODFMap