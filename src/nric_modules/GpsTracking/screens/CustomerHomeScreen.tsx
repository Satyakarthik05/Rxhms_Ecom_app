import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE, LatLng } from 'react-native-maps';
import MapUtils from '../components/MapUtils';
import {
  fetchShopsForCustomer,
  updateCustomerAddress,
  getCustomerLocation,
} from '../api/api';
import styles from '../styles/CustomerHomeStyles';
import { useGpsTracking } from '../hooks/useGpsTracking';
import { Shop, Customer } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  customer: Customer;
  onLogout: () => void;
  onDetail: (shop: Shop) => void;
}

interface RawShop {
  id: number;
  name: string;
  location: string;
  pincode: string;
  coordinatesJson: string;
  isInside?: boolean;
}

const CustomerHomeScreen: React.FC<Props> = ({ customer, onLogout, onDetail }) => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [address, setAddress] = useState('');
  const [routeDistances, setRouteDistances] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mapError, setMapError] = useState('');
  const [addressLoading, setAddressLoading] = useState(false);
  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState<LatLng | null>(null);
  const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);

  const { location, setManualLocation } = useGpsTracking(customer.id);
  const mapRef = useRef<MapView>(null);
  const initialLoadDone = useRef(false);

  useEffect(() => {
    const loadInitialData = async () => {
      if (initialLoadDone.current) return;

      setLoading(true);
      try {
        const res = await getCustomerLocation(customer.id);
        if (res.data.latitude && res.data.longitude) {
          const initialLoc = {
            latitude: res.data.latitude,
            longitude: res.data.longitude,
          };
          setManualLocation(initialLoc);
          setDraggableMarkerCoord(initialLoc);
          setAddress(res.data.location || '');
          await fetchShops(initialLoc);
        }
      } catch (err) {
        setError('Failed to load initial data');
        console.error(err);
      } finally {
        setLoading(false);
        initialLoadDone.current = true;
      }
    };

    loadInitialData();
  }, [customer.id, setManualLocation]);

  const fetchShops = async (loc: LatLng) => {
    setLoading(true);
    try {
      const res = await fetchShopsForCustomer(customer.id);
      const raw: RawShop[] = Array.isArray(res.data) ? res.data : [];

      const shopsWithCoords: Shop[] = raw
        .map((s) => {
          let coords: { lat: number; lng: number }[] = [];
          try {
            const parsed = JSON.parse(s.coordinatesJson);
            if (Array.isArray(parsed) && parsed.length > 0) {
              if (typeof parsed[0] === 'object' && 'lat' in parsed[0]) {
                coords = parsed as { lat: number; lng: number }[];
              } else if (Array.isArray(parsed[0]) && parsed[0].length >= 2) {
                coords = (parsed as any[]).map((p) => ({ lat: p[1], lng: p[0] }));
              }
            }
          } catch {
            coords = [];
          }
          return {
            id: s.id,
            name: s.name,
            location: s.location,
            pincode: s.pincode,
            coordinates: coords,
            isInside: s.isInside ?? false,
          };
        })
        .filter((sh) => sh.coordinates.length > 0)
        .filter((shop) => {
          const shopLoc = shop.coordinates[0];
          const distance = MapUtils.straightDist(loc, {
            latitude: shopLoc.lat,
            longitude: shopLoc.lng,
          });
          return distance <= 10000;
        });

      setShops(shopsWithCoords);
      setError('');

      const distances: { [key: number]: string } = {};
      await Promise.all(
        shopsWithCoords.map(async (shop) => {
          try {
            const routeInfo = await MapUtils.getRoute(loc, {
              latitude: shop.coordinates[0].lat,
              longitude: shop.coordinates[0].lng,
            });
            distances[shop.id] = routeInfo.distance_text;
          } catch {
            distances[shop.id] = 'N/A';
          }
        })
      );
      setRouteDistances(distances);
    } catch (err) {
      console.error('fetchShops error', err);
      setError('Failed to load shops.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = async () => {
    if (!address.trim()) {
      setError('Please enter an address');
      return;
    }
    setAddressLoading(true);
    try {
      const geo = await MapUtils.geocodeAddress(address);
      const newLoc = { latitude: geo.latitude, longitude: geo.longitude };
      await updateCustomerAddress(customer.id, {
        latitude: geo.latitude,
        longitude: geo.longitude,
        location: geo.formatted_address,
        pincode:
          geo.components.find((c: any) => c.types.includes('postal_code'))?.long_name ||
          '000000',
      });
      setManualLocation(newLoc);
      setDraggableMarkerCoord(newLoc);
      setAddress(geo.formatted_address);
      await fetchShops(newLoc);
    } catch (err: any) {
      setError(err.message || 'Failed to geocode address');
      setMapError('Failed to update map location');
    } finally {
      setAddressLoading(false);
    }
  };

  const handleMarkerDragEnd = useCallback(async (e: { nativeEvent: { coordinate: LatLng } }) => {
  const newCoord = e.nativeEvent.coordinate;
    setDraggableMarkerCoord(newCoord);
    setIsUpdatingLocation(true);
    
    try {
      // Reverse geocode to get address from new coordinates
      const geo = await MapUtils.reverseGeocode(newCoord);
      setAddress(geo.address);
      
      // Update shops based on new location
      await fetchShops(newCoord);
      
      // Update customer location in backend
      await updateCustomerAddress(customer.id, {
        latitude: newCoord.latitude,
        longitude: newCoord.longitude,
        location: geo.address,
        pincode: geo.components.find((c: any) => c.types.includes('postal_code'))?.long_name || '000000',
      });
      
      // Update manual location in GPS tracking
      setManualLocation(newCoord);
    } catch (err) {
      console.error('Error updating location:', err);
      setError('Failed to update location');
    } finally {
      setIsUpdatingLocation(false);
    }
  }, [customer.id, setManualLocation]);

  const handleMapPress = async (e: { nativeEvent: { coordinate: LatLng } }) => {
  const newCoord = e.nativeEvent.coordinate;
    setDraggableMarkerCoord(newCoord);
    setIsUpdatingLocation(true);
    
    try {
      const geo = await MapUtils.reverseGeocode(newCoord);
      setAddress(geo.address);
      await fetchShops(newCoord);
      await updateCustomerAddress(customer.id, {
        latitude: newCoord.latitude,
        longitude: newCoord.longitude,
        location: geo.address,
        pincode: geo.components.find((c: any) => c.types.includes('postal_code'))?.long_name || '000000',
      });
      setManualLocation(newCoord);
    } catch (err) {
      console.error('Error updating location:', err);
      setError('Failed to update location');
    } finally {
      setIsUpdatingLocation(false);
    }
  };

  const handleRecenter = async () => {
    if (!location) return;
    
    try {
      setDraggableMarkerCoord(location);
      const geo = await MapUtils.reverseGeocode(location);
      setAddress(geo.address);
      await fetchShops(location);
      await updateCustomerAddress(customer.id, {
        latitude: location.latitude,
        longitude: location.longitude,
        location: geo.address,
        pincode: geo.components.find((c: any) => c.types.includes('postal_code'))?.long_name || '000000',
      });
      
      // Animate map to current location
      mapRef.current?.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } catch (err) {
      console.error('Error recentering:', err);
      setError('Failed to recenter to current location');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#007bff" barStyle="light-content" />

      <View style={[styles.container, { backgroundColor: '#fff', flex: 1 }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shop Locator</Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={onLogout} activeOpacity={0.7}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Address Search */}
        <View style={styles.searchSection}>
          <Text style={styles.label}>Enter your address</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="e.g., Vijayawada, Gudiwada"
              placeholderTextColor="#888"
              value={address}
              onChangeText={setAddress}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleAddressSubmit}
              disabled={addressLoading}
            >
              {addressLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Search</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { marginLeft: 8, backgroundColor: '#28a745' }]}
              onPress={handleRecenter}
              disabled={!location}
            >
              <Text style={styles.buttonText}>📍</Text>
            </TouchableOpacity>
          </View>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {mapError ? <Text style={styles.warning}>{mapError}</Text> : null}

        {/* Map */}
        <View style={styles.mapSection}>
          {location ? (
            <MapView
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
              onPress={handleMapPress}
            >
              {/* Draggable User Marker */}
              {draggableMarkerCoord && (
                <Marker
                  coordinate={draggableMarkerCoord}
                  title="Your Location"
                  description={address}
                  pinColor={isUpdatingLocation ? '#ff9800' : '#007bff'}
                  draggable
                  onDragEnd={handleMarkerDragEnd}
                >
                  {isUpdatingLocation && <ActivityIndicator color="#fff" />}
                </Marker>
              )}

              {shops.map((shop) => (
                <React.Fragment key={shop.id}>
                  <Polygon
                    coordinates={shop.coordinates.map((c) => ({
                      latitude: c.lat,
                      longitude: c.lng,
                    }))}
                    strokeColor={shop.isInside ? 'green' : 'red'}
                    fillColor={shop.isInside ? 'rgba(0,255,0,0.2)' : 'rgba(255,0,0,0.2)'}
                    strokeWidth={2}
                  />
                  <Marker
                    coordinate={{
                      latitude: shop.coordinates[0].lat,
                      longitude: shop.coordinates[0].lng,
                    }}
                    title={shop.name}
                    pinColor={shop.isInside ? 'green' : 'red'}
                    onPress={() => onDetail(shop)}
                  />
                </React.Fragment>
              ))}
            </MapView>
          ) : (
            <ActivityIndicator style={{ flex: 1 }} />
          )}
        </View>

        {/* Shops List */}
        <ScrollView style={styles.listContainer}>
          <Text style={styles.sectionTitle}>Nearby Shops ({shops.length})</Text>
          {loading ? (
            <ActivityIndicator />
          ) : shops.length === 0 ? (
            <Text style={styles.noShops}>No shops found in your area</Text>
          ) : (
            shops.map((shop) => (
              <TouchableOpacity
                key={shop.id}
                style={styles.shopCard}
                onPress={() => onDetail(shop)}
                activeOpacity={0.8}
              >
                <View style={styles.shopCardHeader}>
                  <View
                    style={[
                      styles.statusIndicator,
                      shop.isInside ? styles.insideStatus : styles.outsideStatus,
                    ]}
                  />
                  <Text style={styles.shopName}>{shop.name}</Text>
                </View>
                <Text style={styles.shopLocation}>
                  {shop.location} ({shop.pincode})
                </Text>
                <View style={styles.distanceRow}>
                  <Text style={styles.distanceText}>
                    Straight-line:{' '}
                    {draggableMarkerCoord
                      ? `${Math.round(
                          MapUtils.straightDist(draggableMarkerCoord, {
                            latitude: shop.coordinates[0].lat,
                            longitude: shop.coordinates[0].lng,
                          })
                        )} m`
                      : 'N/A'}
                  </Text>
                  <Text style={styles.distanceText}>
                    Route: {routeDistances[shop.id] || 'Calculating...'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CustomerHomeScreen;