import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ico from '../assets/192.png'
import hpbhIcon from '../assets/hpbhmarker.png'
import smbIcon from '../assets/smbh.png'
import Layout from '../components/Layout'
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import { baseUrl } from '../services/https';

const mapContainerStyle = {
  height: "400px",
  width: "800px"
};

const center = {
  lat: 10.521175,
  lng: 7.4268829
};

const gpsCoordinates = [
  { lat: 9.124202, lng: 7.362749, title:'hpbh' },
  { lat: 9.125243, lng: 7.363334, title: 'smbh' },
  { lat: 9.12524, lng: 7.363333 },
  {lat:9.124374, lng: 7.360442}
];

const AllMap = () => {
const [coordinates, setCordinates] = useState([]);
    // const Marker = ({text, id}) => {
    //     return (
    //           <div>         
    //           <a target='_blank' href={`/#/reports/${id}`}> <b style={{color:'green'}}>{text}</b><img style={{width:20}} className='responsive-image' id='img'  src={ico}
    //           alt='Logo'  /></a></div>
    //     );
    // }

    useEffect(() => {
        const fetchProjects = async () => {
          try {
            const response = await axios.get(`${baseUrl}/locations`); // Replace with your actual API endpoint
            setCordinates(response.data);
          } catch (error) {
            console.error('Error fetching loccation:', error);
          }
        };
    
        fetchProjects();
      }, []);
      console.log(coordinates)
  return (
    <Layout>
        <LoadScript>
    <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={9}
          >
      
        {coordinates.map((coordinate, index) => 
          <Marker
            position={coordinate}
            lat = {coordinate.lat}
            lng = {coordinate.lng}
            text = {coordinate.title}
            id= {coordinate.id ?? 1}
            icon={coordinate.title ==='hpbh' ? hpbhIcon : coordinate.title === 'smbh' ? smbIcon : {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }}
              
            //   icon={{
            //     url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            //   }}
          />
       
         )}
    </GoogleMap>
    </LoadScript>
    </Layout>
  );
};

export default AllMap;