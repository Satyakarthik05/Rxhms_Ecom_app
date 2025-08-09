import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  StatusBar,
  Dimensions,
  Modal,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
  LatLng,
} from "react-native-maps";
import { decode } from "@mapbox/polyline";

import {
  getCustomerOrders,
  createOrder,
  getOrderDetails,
  getCustomerLocation,
  getAllItems,
} from "../api/api";

import MapUtils from "../components/MapUtils";
import { ShopDetailScreenStyles, getStatusBadgeStyle } from "../styles/ShopDetailScreenStyles";

interface Props {
  shop: any;
  customer: any;
  onBack: () => void;
}

export default function ShopDetailScreen({ shop, customer, onBack }: Props) {
  const mapRef = useRef<MapView>(null);

  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);
  const [deliveryRouteCoords, setDeliveryRouteCoords] = useState<LatLng[]>([]);
  const [routeInfo, setRouteInfo] = useState<{
    distance_text: string;
    duration_text: string;
    start_address: string;
    end_address: string;
  } | null>(null);

  const [customerLocation, setCustomerLocation] = useState<LatLng | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState<LatLng | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [deliveryRouteInfo, setDeliveryRouteInfo] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const DEFAULT_LOCATION = useMemo(
    () => ({
      latitude: customer?.latitude || 17.385,
      longitude: customer?.longitude || 78.4867,
    }),
    [customer]
  );

  const shopLocation = useMemo(() => {
    if (!shop?.coordinates?.[0]) return null;
    return {
      latitude: parseFloat(shop.coordinates[0].lat),
      longitude: parseFloat(shop.coordinates[0].lng),
    };
  }, [shop]);

  const isValidLatLng = (loc: any) =>
    loc &&
    typeof loc.latitude === "number" &&
    typeof loc.longitude === "number" &&
    !isNaN(loc.latitude) &&
    !isNaN(loc.longitude);

  // Fetch items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getAllItems();
        setItems(response.data);
        if (response.data.length > 0) setSelectedItemId(response.data[0].id);
      } catch (err) {
        console.error("Failed to fetch items:", err);
      }
    };
    fetchItems();
  }, []);

  // Fetch orders
  useEffect(() => {
    if (!customer?.id || !shop?.id) return;
    const fetchOrders = async () => {
      try {
        const response = await getCustomerOrders(customer.id, shop.id);
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    fetchOrders();
  }, [customer?.id, shop?.id, orderPlaced]);

  // Fetch customer location
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const fetchLoc = async () => {
      try {
        const response = await getCustomerLocation(customer.id);
        const coords = {
          latitude: response.data.latitude,
          longitude: response.data.longitude,
        };
        setCustomerLocation(isValidLatLng(coords) ? coords : DEFAULT_LOCATION);
      } catch {
        setCustomerLocation(DEFAULT_LOCATION);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchLoc();
    return () => {
      mounted = false;
    };
  }, [customer.id, DEFAULT_LOCATION]);

  // Fetch route between customer and shop
  useEffect(() => {
    if (!customerLocation || !shopLocation) return;

    const fetchRoute = async () => {
      try {
        const route = await MapUtils.getRoute(customerLocation, shopLocation);
        const coords = decode(route.polyline).map(([lat, lng]) => ({
          latitude: lat,
          longitude: lng,
        }));

        setRouteCoords(coords);
        setRouteInfo({
          distance_text: route.distance_text,
          duration_text: route.duration_text,
          start_address: route.start_address,
          end_address: route.end_address,
        });
      } catch (error) {
        console.error("Failed to fetch route:", error);
        setRouteCoords([customerLocation, shopLocation]);
        setRouteInfo({
          distance_text: "N/A",
          duration_text: "N/A",
          start_address: "Your Location",
          end_address: shop.location || "Shop",
        });
      }
    };

    fetchRoute();
  }, [customerLocation, shopLocation]);

  const handleOrderSelect = async (orderId: number) => {
    try {
      const response = await getOrderDetails(orderId);
      setSelectedOrder(response.data);
      
      if (response.data.deliveryBoyLocation) {
        const deliveryLoc = {
          latitude: response.data.deliveryBoyLocation.deliveryBoyLat,
          longitude: response.data.deliveryBoyLocation.deliveryBoyLng,
        };
        setDeliveryLocation(deliveryLoc);
        
        if (response.data.status !== "PENDING" && response.data.customerLocation) {
          const customerLoc = {
            latitude: response.data.customerLocation.customerLat,
            longitude: response.data.customerLocation.customerLng,
          };
          
          try {
            const route = await MapUtils.getRoute(deliveryLoc, customerLoc);
            const coords = decode(route.polyline).map(([lat, lng]) => ({
              latitude: lat,
              longitude: lng,
            }));
            setDeliveryRouteCoords(coords);
            setDeliveryRouteInfo({
              distance_text: route.distance_text,
              duration_text: route.duration_text,
            });
          } catch (error) {
            console.error("Failed to fetch delivery route:", error);
            setDeliveryRouteCoords([deliveryLoc, customerLoc]);
            setDeliveryRouteInfo({
              distance_text: "N/A",
              duration_text: "N/A",
            });
          }
        }
      } else {
        setDeliveryLocation(null);
        setDeliveryRouteCoords([]);
      }
      
      setModalVisible(true);
    } catch (err) {
      setOrderError("Failed to load order details");
    }
  };

  const handlePlaceOrder = async () => {
    if (!customer || !shop || !selectedItemId) return;
    setOrderLoading(true);
    setOrderError("");
    try {
      await createOrder({
        itemIds: [selectedItemId],
        customerId: customer.id,
        shopId: shop.id,
        customerLat: customerLocation?.latitude || DEFAULT_LOCATION.latitude,
        customerLng: customerLocation?.longitude || DEFAULT_LOCATION.longitude,
        customerAddress: routeInfo?.start_address || "Unknown",
      });
      setOrderPlaced((prev) => !prev);
    } catch (err: any) {
      setOrderError(err.message || "Failed to place order");
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <SafeAreaView style={ShopDetailScreenStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e90ff" />
      
      {/* Header */}
      <View style={ShopDetailScreenStyles.header}>
        <TouchableOpacity onPress={onBack} style={ShopDetailScreenStyles.backBtn}>
          <Text style={ShopDetailScreenStyles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={ShopDetailScreenStyles.headerTitle}>{shop?.name || "Shop Details"}</Text>
      </View>

      {/* Main Map */}
      <View style={ShopDetailScreenStyles.mapContainer}>
        {loading ? (
          <ActivityIndicator size="large" style={{ flex: 1 }} />
        ) : (
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={ShopDetailScreenStyles.map}
            initialRegion={{
              latitude: customerLocation?.latitude || DEFAULT_LOCATION.latitude,
              longitude: customerLocation?.longitude || DEFAULT_LOCATION.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            showsUserLocation
            showsMyLocationButton
          >
            {customerLocation && (
              <Marker coordinate={customerLocation} title="You" pinColor="#1e90ff" />
            )}
            {shopLocation && (
              <Marker coordinate={shopLocation} title={shop.name} pinColor="#ff6347" />
            )}
            {deliveryLocation && (
              <Marker
                coordinate={deliveryLocation}
                title="Delivery Boy"
                pinColor="#32cd32"
              />
            )}
            {routeCoords.length > 0 && (
              <Polyline
                coordinates={routeCoords}
                strokeColor="#1e90ff"
                strokeWidth={4}
              />
            )}
          </MapView>
        )}
      </View>

      {/* Route Info */}
      {routeInfo && (
        <Text style={ShopDetailScreenStyles.routeInfo}>
          Distance: {routeInfo.distance_text} | Duration: {routeInfo.duration_text}
        </Text>
      )}

      {/* Content Scroll */}
      <ScrollView
        contentContainerStyle={ShopDetailScreenStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Items Section */}
        <View style={ShopDetailScreenStyles.section}>
          <Text style={ShopDetailScreenStyles.sectionTitle}>Available Items</Text>
          {items.length === 0 ? (
            <Text style={ShopDetailScreenStyles.emptyText}>No items available.</Text>
          ) : (
            <FlatList
              data={items}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingLeft: 10, paddingRight: 20 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    ShopDetailScreenStyles.itemCard,
                    selectedItemId === item.id && ShopDetailScreenStyles.itemCardSelected,
                  ]}
                  onPress={() => setSelectedItemId(item.id)}
                  activeOpacity={0.7}
                >
                  <Text style={ShopDetailScreenStyles.itemName}>{item.name}</Text>
                  <Text style={ShopDetailScreenStyles.itemPrice}>₹{item.price}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        {/* Orders Section */}
        <View style={ShopDetailScreenStyles.section}>
          <Text style={ShopDetailScreenStyles.sectionTitle}>Your Orders</Text>
          {orders.length === 0 ? (
            <Text style={ShopDetailScreenStyles.emptyText}>No orders found.</Text>
          ) : (
            orders.map((order) => (
              <TouchableOpacity
                key={order.id}
                style={ShopDetailScreenStyles.orderCard}
                onPress={() => handleOrderSelect(order.id)}
                activeOpacity={0.75}
              >
                <Text style={ShopDetailScreenStyles.orderIdText}>Order #{order.id}</Text>
                <View style={[ShopDetailScreenStyles.orderStatus, getStatusBadgeStyle(order.status)]}>
                  <Text style={ShopDetailScreenStyles.orderStatusText}>{order.status}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={ShopDetailScreenStyles.footer}>
        <TouchableOpacity
          style={[
            ShopDetailScreenStyles.placeOrderBtn,
            (orderLoading || items.length === 0) && ShopDetailScreenStyles.placeOrderBtnDisabled,
          ]}
          onPress={handlePlaceOrder}
          disabled={orderLoading || items.length === 0}
          activeOpacity={0.8}
        >
          {orderLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={ShopDetailScreenStyles.placeOrderText}>Place New Order</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Order Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={ShopDetailScreenStyles.modalContainer}>
          <View style={ShopDetailScreenStyles.modalContent}>
            <View style={ShopDetailScreenStyles.modalHeader}>
              <Text style={ShopDetailScreenStyles.modalTitle}>Order #{selectedOrder?.id}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={ShopDetailScreenStyles.closeModalText}>✕</Text>
              </TouchableOpacity>
            </View>

            {selectedOrder && (
              <>
                <View style={[ShopDetailScreenStyles.orderStatus, getStatusBadgeStyle(selectedOrder.status)]}>
                  <Text style={ShopDetailScreenStyles.orderStatusText}>
                    {selectedOrder.status.toUpperCase()}
                  </Text>
                </View>

                {/* Order Map */}
                <View style={ShopDetailScreenStyles.modalMapContainer}>
                  <MapView
                    style={ShopDetailScreenStyles.modalMap}
                    initialRegion={{
                      latitude: customerLocation?.latitude || DEFAULT_LOCATION.latitude,
                      longitude: customerLocation?.longitude || DEFAULT_LOCATION.longitude,
                      latitudeDelta: 0.05,
                      longitudeDelta: 0.05,
                    }}
                  >
                    {/* Customer Marker */}
                    {selectedOrder.customerLocation && (
                      <Marker
                        coordinate={{
                          latitude: selectedOrder.customerLocation.customerLat,
                          longitude: selectedOrder.customerLocation.customerLng,
                        }}
                        title="Customer"
                        pinColor="#1e90ff"
                      />
                    )}

                    {/* Shop Marker */}
                    {shopLocation && (
                      <Marker
                        coordinate={shopLocation}
                        title={shop.name}
                        pinColor="#ff6347"
                      />
                    )}

                    {/* Delivery Boy Marker */}
                    {deliveryLocation && (
                      <Marker
                        coordinate={deliveryLocation}
                        title="Delivery Boy"
                        pinColor="#32cd32"
                      />
                    )}

                    {/* Route between delivery boy and customer (if not pending) */}
                    {selectedOrder.status !== "PENDING" && deliveryRouteCoords.length > 0 && (
                      <Polyline
                        coordinates={deliveryRouteCoords}
                        strokeColor="#32cd32"
                        strokeWidth={4}
                      />
                    )}

                    {/* Route between shop and customer (if pending) */}
                    {selectedOrder.status === "PENDING" && routeCoords.length > 0 && (
                      <Polyline
                        coordinates={routeCoords}
                        strokeColor="#1e90ff"
                        strokeWidth={4}
                      />
                    )}
                  </MapView>
                </View>

                {/* Route Info */}
                {selectedOrder.status !== "PENDING" && deliveryRouteInfo && (
                  <Text style={ShopDetailScreenStyles.modalRouteInfo}>
                    Delivery Distance: {deliveryRouteInfo.distance_text} | 
                    Estimated Time: {deliveryRouteInfo.duration_text}
                  </Text>
                )}

                {/* Items */}
                <Text style={ShopDetailScreenStyles.modalSectionTitle}>Items:</Text>
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  selectedOrder.items.map((item: any) => (
                    <Text key={item.id} style={ShopDetailScreenStyles.modalText}>
                      • {item.name} x {item.quantity} (₹{item.price * item.quantity})
                    </Text>
                  ))
                ) : (
                  <Text style={ShopDetailScreenStyles.modalText}>No item details available.</Text>
                )}

                {/* Customer Address */}
                {selectedOrder.customerLocation?.customerAddress && (
                  <>
                    <Text style={ShopDetailScreenStyles.modalSectionTitle}>Delivery Address:</Text>
                    <Text style={ShopDetailScreenStyles.modalText}>
                      {selectedOrder.customerLocation.customerAddress}
                    </Text>
                  </>
                )}

                {/* Estimated Delivery Time */}
                {selectedOrder.estimatedDeliveryTime && (
                  <>
                    <Text style={ShopDetailScreenStyles.modalSectionTitle}>Estimated Delivery Time:</Text>
                    <Text style={ShopDetailScreenStyles.modalText}>
                      {selectedOrder.estimatedDeliveryTime}
                    </Text>
                  </>
                )}
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Error Message */}
      {orderError ? (
        <View style={ShopDetailScreenStyles.errorContainer}>
          <Text style={ShopDetailScreenStyles.errorText}>{orderError}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}