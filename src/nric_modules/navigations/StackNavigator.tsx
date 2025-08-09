import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginRegisterScreen from "../GpsTracking/screens/LoginRegisterScreen";
import CustomerHomeScreen from "../GpsTracking/screens/CustomerHomeScreen";
import ShopDetailScreen from "../GpsTracking/screens/ShopDetailScreen";
import { Customer, Shop } from "../GpsTracking/types";

export type RootStackParamList = {
  Login: undefined;
  CustomerHome: undefined;
  ShopDetail: { shop: Shop };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [detailShop, setDetailShop] = useState<Shop | null>(null);

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const stored = await AsyncStorage.getItem("customer");
        if (stored) {
          setCustomer(JSON.parse(stored));
        }
      } catch (err) {
        console.error("Error loading stored customer:", err);
      }
    };
    loadCustomer();
  }, []);

  const handleLogin = async (cust: Customer) => {
    setCustomer(cust);
    await AsyncStorage.setItem("customer", JSON.stringify(cust));
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("customer");
    setCustomer(null);
    setDetailShop(null);
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!customer ? (
        <Stack.Screen
          name="Login"
          children={() => <LoginRegisterScreen onLogin={handleLogin} />}
        />
      ) : detailShop ? (
        <Stack.Screen
          name="ShopDetail"
          children={() => (
            <ShopDetailScreen
              shop={detailShop}
              customer={customer}
              onBack={() => setDetailShop(null)}
            />
          )}
        />
      ) : (
        <Stack.Screen
          name="CustomerHome"
          children={() => (
            <CustomerHomeScreen
              customer={customer}
              onLogout={handleLogout}
              onDetail={(shop) => setDetailShop(shop)}
            />
          )}
        />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
