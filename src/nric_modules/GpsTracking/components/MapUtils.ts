import { LatLng } from 'react-native-maps';
import haversine from 'haversine-distance';
import axios from 'axios';

// Your Google Maps API key — must be enabled for Geocoding + Directions
const GOOGLE_MAPS_API_KEY = 'AIzaSyAos0trl6AOzlk5jHrMTxmPBM4BhRUQH3A';

const MapUtils = {
  /**
   * Straight-line distance between two points in meters
   */
  straightDist(from: LatLng, to: LatLng) {
    return haversine(from, to); // in meters
  },

  /**
   * Get route details between two coordinates
   * Returns distance_text, duration_text, start_address, end_address
   */
  async getRoute(from: LatLng, to: LatLng) {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${from.latitude},${from.longitude}&destination=${to.latitude},${to.longitude}&mode=driving&key=${GOOGLE_MAPS_API_KEY}`;
    const response = await axios.get(url);

    if (response.data.status === 'OK') {
      const leg = response.data.routes[0].legs[0];
      return {
        distance_text: leg.distance.text,
        duration_text: leg.duration.text,
        start_address: leg.start_address,
        end_address: leg.end_address,
        polyline: response.data.routes[0].overview_polyline.points,
      };
    } else {
      throw new Error('Failed to get directions: ' + response.data.status);
    }
  },

  /**
   * Reverse geocode: LatLng -> Address
   */
  async reverseGeocode(latLng: LatLng) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng.latitude},${latLng.longitude}&key=${GOOGLE_MAPS_API_KEY}`;
    const response = await axios.get(url);

    if (response.data.status === 'OK' && response.data.results.length > 0) {
      return {
        address: response.data.results[0].formatted_address,
        components: response.data.results[0].address_components,
      };
    } else {
      throw new Error('Reverse geocode failed: ' + response.data.status);
    }
  },

  /**
   * Geocode: Address -> LatLng
   */
  async geocodeAddress(address: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${GOOGLE_MAPS_API_KEY}`;
    const response = await axios.get(url);

    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
        components: response.data.results[0].address_components,
        formatted_address: response.data.results[0].formatted_address,
      };
    } else {
      throw new Error('Geocode failed: ' + response.data.status);
    }
  },
};

export default MapUtils;
