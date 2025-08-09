import { StatusBar, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const ShopDetailScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fbfd",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e90ff",
    paddingTop: StatusBar.currentHeight,
    paddingVertical: 14,
    paddingHorizontal: 18,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  backBtn: {
    marginRight: 20,
    padding: 6,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  backText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  headerTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginRight: 40,
  },
  mapContainer: {
    height: 260,
    width: screenWidth * 0.9,
    alignSelf: "center",
    borderRadius: 18,
    overflow: "hidden",
    marginVertical: 14,
    backgroundColor: "#e1e8f0",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  map: {
    flex: 1,
  },
  routeInfo: {
    backgroundColor: "#d9ecff",
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
    fontSize: 16,
    fontWeight: "600",
    color: "#0f3d91",
    textAlign: "center",
    marginBottom: 16,
    elevation: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
    color: "#0f3d91",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 12,
  },
  itemCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginRight: 14,
    minWidth: 140,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  itemCardSelected: {
    borderWidth: 2,
    borderColor: "#1e90ff",
    backgroundColor: "#dbe9ff",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f3d91",
    textAlign: "center",
  },
  itemPrice: {
    fontWeight: "700",
    marginTop: 6,
    fontSize: 14,
    color: "#1e90ff",
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 22,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#e3e7eb",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderIdText: {
    fontWeight: "700",
    fontSize: 18,
    color: "#0f3d91",
  },
  orderStatus: {
    borderRadius: 14,
    minWidth: 100,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  orderStatusText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    textTransform: "capitalize",
    textAlign: "center",
  },
  statusPending: { backgroundColor: "#ff9800" },
  statusAccepted: { backgroundColor: "#2196f3" },
  statusInTransit: { backgroundColor: "#9c27b0" },
  statusDelivered: { backgroundColor: "#4caf50" },
  statusCancelled: { backgroundColor: "#f44336" },
  statusDefault: { backgroundColor: "#999" },
  footer: {
    position: "absolute",
    bottom: 15,
    width: screenWidth,
    paddingHorizontal: 20,
  },
  placeOrderBtn: {
    backgroundColor: "#1e90ff",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    elevation: 6,
    shadowColor: "#1e90ff",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
  },
  placeOrderBtnDisabled: {
    backgroundColor: "#a0cfff",
  },
  placeOrderText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: screenWidth * 0.9,
    maxHeight: screenHeight * 0.8,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f3d91",
  },
  closeModalText: {
    fontSize: 24,
    color: "#666",
  },
  modalMapContainer: {
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 15,
  },
  modalMap: {
    flex: 1,
  },
  modalRouteInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
    textAlign: "center",
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 15,
    marginBottom: 5,
  },
  modalText: {
    fontSize: 15,
    color: "#555",
    marginBottom: 3,
  },
  errorContainer: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    alignItems: "center",
  },
  errorText: {
    color: "#f44336",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
  },
});

export const getStatusBadgeStyle = (status: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return ShopDetailScreenStyles.statusPending;
    case "accepted":
      return ShopDetailScreenStyles.statusAccepted;
    case "in_transit":
      return ShopDetailScreenStyles.statusInTransit;
    case "delivered":
      return ShopDetailScreenStyles.statusDelivered;
    case "cancelled":
      return ShopDetailScreenStyles.statusCancelled;
    default:
      return ShopDetailScreenStyles.statusDefault;
  }
};