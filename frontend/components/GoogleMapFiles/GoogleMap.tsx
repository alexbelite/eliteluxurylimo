"use client";

// React Imports
import React, { useState, useEffect, useMemo } from "react";

// Third party Imports
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

// Redux Imports
import { useAppDispatch } from "@/store/hooks";
import { setDirectionsData } from "@/store/ReservationFormSlice";

export default function Map({
  startLocation,
  endLocation,
  stops,
  isLoaded,
}: {
  startLocation?: any;
  endLocation?: any;
  stops?: any;
  isLoaded: boolean;
}) {
  const dispatch = useAppDispatch();
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 41.888906572566796,
    lng: -87.6264612342834,
  };

  const [directions, setDirections] = useState(null);

  const fetchDirections = useMemo(() => {
    return () => {
      if (startLocation && endLocation && isLoaded) {
        const startCoordinates = startLocation.geometry
          ? {
              lat:
                typeof startLocation.geometry.location.lat === "number"
                  ? startLocation.geometry.location.lat
                  : startLocation.geometry.location.lat(),
              lng:
                typeof startLocation.geometry.location.lng === "number"
                  ? startLocation.geometry.location.lng
                  : startLocation.geometry.location.lng(),
            }
          : {
              lat: startLocation.lat,
              lng: startLocation.lng,
            };
        const endCoordinates = endLocation.geometry
          ? {
              lat:
                typeof endLocation.geometry.location.lat === "number"
                  ? endLocation.geometry.location.lat
                  : endLocation.geometry.location.lat(),
              lng:
                typeof endLocation.geometry.location.lng === "number"
                  ? endLocation.geometry.location.lng
                  : endLocation.geometry.location.lng(),
            }
          : {
              lat: endLocation.lat,
              lng: endLocation.lng,
            };

        const destination = new google.maps.LatLng(
          endCoordinates.lat,
          endCoordinates.lng
        );
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
          {
            origin: new google.maps.LatLng(
              startCoordinates.lat,
              startCoordinates.lng
            ),
            destination: destination,
            waypoints: stops.map((stop: any) =>
              stop.data?.geometry
                ? {
                    location: new google.maps.LatLng(
                      stop.data.geometry.location.lat(),
                      stop.data.geometry.location.lng()
                    ),
                    stopover: true,
                  }
                : {}
            ),
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result: any, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              dispatch(setDirectionsData(result));
              setDirections(result);
            } else {
              console.error(`Error fetching directions: ${status}`);
            }
          }
        );
      }
    };
  }, [startLocation, endLocation, stops, isLoaded]);

  useEffect(() => {
    fetchDirections();
  }, [fetchDirections, startLocation, endLocation, stops, isLoaded]);

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
