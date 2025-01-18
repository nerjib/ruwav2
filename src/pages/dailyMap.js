import React, { useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ico from '../assets/192.png'

const mapContainerStyle = {
  height: "400px",
  width: "800px"
};

const center = {
  lat: 9.125804,
  lng: 7.363717
};

const gpsCoordinates = [
  { lat: 9.124202, lng: 7.362749, title:'hpbh' },
  { lat: 9.125243, lng: 7.363334, title: 'smbh' },
  { lat: 9.12524, lng: 7.363333 },
  {lat:9.124374, lng: 7.360442}
];

const DailyMap = () => {
  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        {gpsCoordinates.map((coordinate, index) => (
          <div onClick={()=>alert('')}>
            <p>{coordinate.title ?? 'HPBH'} </p>
          <Marker
            key={index}
            position={coordinate}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }}
            // icon={ico}
            text="jjj"
          />
       
        </div>
         ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default DailyMap;