import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Header Section
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
  },

  // Profile Options Section
  profileOptionsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  leftOption: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightOption: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  divider: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  profileOptionText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },

  // Profile Card Section
  profileCardContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#006F851A',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  profileUhid: {
    fontSize: 12,
    color: '#666',
  },
  
  // More Profile Section
  moreProfileSection: {
    marginBottom: 16,
  },
  moreProfileTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  additionalProfileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  // smallAvatar: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   backgroundColor: '#f5f5f5',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginRight: 12,
  // },
  // additionalProfileName: {
  //   fontSize: 14,
  //   color: '#666',
  //   fontWeight: '500',
  // },
  
  // Become Member Button
  becomeMemberButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  becomeMemberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Menu Section
  menuContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
    fontWeight: '500',
  },
  profileScrollContainer: {
  paddingHorizontal: 4, // Small padding for better spacing
},
additionalProfileItem: {
  alignItems: 'center',
  marginRight: 16,
  width: 80, // Fixed width for consistent layout
},
smallAvatar: {
  width: 60, // Increased size to match the image
  height: 60,
  borderRadius: 30,
  backgroundColor: '#E3F2FD', // Light blue background like in the image
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 8,
},
additionalProfileName: {
  fontSize: 12,
  color: '#333',
  fontWeight: '500',
  textAlign: 'center',
},
});

