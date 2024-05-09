import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const Map = () => {
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const [map, setMap] = useState(null);
  const defaultCenter = {
    lat: 40.7128,
    lng: -74.0060
  };



  
  const defaultZoom = 4;

  const [markerPosition, setMarkerPosition] = useState(null);
  const inputRef = useRef(null);

  const onLoad = (autocomplete) => {
    inputRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    const place = inputRef.current.getPlace();
    if (place && place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setMarkerPosition({ lat, lng });
      if (map !== null) {
        map.setCenter({ lat, lng });
      }
    } else {
      console.log('Autocomplete or place is not loaded yet or is invalid!');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onPlaceChanged();
    }
  };

  const onMapLoad = (map) => {
    setMap(map);
  };

  const handleWheel = (e) => {
    if (map && e.ctrlKey) {
      e.preventDefault();
      const zoomChange = e.deltaY > 0 ? -1 : 1;
      const currentZoom = map.getZoom();
      const newZoom = currentZoom + zoomChange;
      const minZoom = 1;
      const maxZoom = 14;
      if (newZoom >= minZoom && newZoom <= maxZoom) {
        map.setZoom(newZoom);
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCEl8R0Ph9GXBZU61QrGdvUmaM3riziaMw"
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={defaultZoom}
        center={defaultCenter}
gestureHandling={'greedy'}
        disableDefaultUI={true}
        onLoad={onMapLoad}
        onWheel={handleWheel}
      >
        {markerPosition && (
          <Marker position={markerPosition} />
        )}
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Введите местоположение и нажмите Enter"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px",
              marginTop: "10px",
              zIndex: "1",
              backgroundColor: "#fff"
            }}
            onKeyPress={handleKeyPress}
          />
        </Autocomplete>
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;