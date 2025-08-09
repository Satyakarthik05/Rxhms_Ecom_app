import { useEffect, useState, useCallback } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import { updateCustomerLocation } from '../api/api';
import { LatLng } from 'react-native-maps';

export const useGpsTracking = (customerId: number) => {
  const [location, setLocation] = useState<LatLng | null>(null);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const getCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      (pos: GeoPosition) => {
        const coords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        setLocation(coords);
        updateCustomerLocation(customerId, coords).catch(() => {});
      },
      (err) => {
        console.error('Location error:', err);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, [customerId]);

  const setManualLocation = (coords: LatLng) => {
    setLocation(coords);
    updateCustomerLocation(customerId, coords).catch(() => {});
  };

  useEffect(() => {
    requestPermission().then((ok) => {
      if (ok) {
        getCurrentLocation();
        const watchId = Geolocation.watchPosition(
          (pos) => {
            const coords = {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            };
            setLocation(coords);
            updateCustomerLocation(customerId, coords).catch(() => {});
          },
          (err) => console.error('Watch error:', err),
          { enableHighAccuracy: true, distanceFilter: 10 }
        );
        return () => {
          Geolocation.clearWatch(watchId);
        };
      }
    });
  }, [customerId, getCurrentLocation]);

  return { location, setManualLocation };
};
