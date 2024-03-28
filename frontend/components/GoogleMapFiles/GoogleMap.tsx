"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { RootState } from '@/types';
import { useSelector } from 'react-redux';

export default function Map() {
  const reduxLocation = useSelector((state: RootState) => state.map.location);
  const reduxLocationB = useSelector((state: RootState) => state.map.locationB);
  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const center = {
    lat: reduxLocation.lat || 41.888906572566796,
    lng: reduxLocation.lng || -87.6264612342834,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
  });

  const [directions, setDirections] = useState(null);

  const fetchDirections = useMemo(() => {
    return () => {
      if (reduxLocation.lat !== null && reduxLocation.lng !== null && reduxLocationB.lat !== null && reduxLocationB.lng !== null) {
        const destination = new google.maps.LatLng(reduxLocationB.lat, reduxLocationB.lng);

        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
          {
            origin: new google.maps.LatLng(reduxLocation.lat, reduxLocation.lng),
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result: any, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              setDirections(result);
            } else {
              console.error(`Error fetching directions: ${status}`);
            }
          }
        );
      }
    };
  }, [reduxLocation.lat, reduxLocation.lng,reduxLocationB.lat, reduxLocationB.lng]);

  useEffect(() => {
    fetchDirections();
  }, [fetchDirections]);

  function locationClicked(event: google.maps.MapMouseEvent) {
    console.log(event?.latLng?.lat());
    console.log(event?.latLng?.lng());
  }

  return isLoaded ? (
    <GoogleMap
      options={{ mapTypeControl: false, streetViewControl: false }}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onClick={locationClicked}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
}
