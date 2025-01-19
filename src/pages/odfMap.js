import React, { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css'
import { MapContainer, GeoJSON } from "react-leaflet";
import Layout from '../components/Layout'
import MapData from './kad.json'
import { baseUrl } from "../services/https";
import axios from "axios";

const ODFMap = () => {
    const [lgStat1, setLgStat] = useState({});
    const odfStat = {
        Igabi: 80,
        Chikun: 100,
        'Birnin-Gwari': 30,
        Lere: 50,
        Kudan: 60,
        Kauru: 70,
        Kachia: 30,
        Giwa: 10,
        Soba:20,
        Chikun: 40,
        Jaba: 90
    }
    let lgStat ={};
    useEffect(() => {
        const fetchProjects = async () => {
          try {
            const response = await axios.get(`${baseUrl}/odf`); // Replace with your actual API endpoint
            // setProjects(response.data);
            let data ={};
            response?.data?.map(e=> {
                console.log({e})
                data = {...data, [e?.lga]: Math.floor((e?.no_of_certified/e?.no_of_communities)*100) }
            })
            setLgStat(data)
            lgStat = data
            console.log(data);
          } catch (error) {
            console.error('Error fetching projects:', error);
          }
        };
    
        fetchProjects();
      }, []);


    const handleOnEach = (counter, layer) =>{
        // console.log({counter: counter})
        let odfVal = counter?.odf
        // console.log({odfVal})
        layer.bindPopup(counter?.properties?.admin2Name + 'Certified communities:' + lgStat[counter?.properties?.admin2Name] ?? 0)
        layer.options.fillColor = 
        lgStat[counter?.properties?.admin2Name] > 69
        ? 'green'
        : lgStat[counter?.properties?.admin2Name] >= 50
        ? 'yellow'
        : 'red'
        layer.options.fillOpacity = (lgStat[counter?.properties?.admin2Name] > 69? lgStat[counter?.properties?.admin2Name]/100 :(1- ((lgStat[counter?.properties?.admin2Name])/100)))  ;

        // layer.on({
        //     click: (event) => {
        //         // layer.bindPopup(counter?.properties?.admin2Name + 'Certified communities:' + counter?.odf)

        //         event.target.setStyle({
        //             color: 'green',
        //             fillColor: 'yellow'
        //         })
        //     }
        // })
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