import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f9fafb' },

  container: { flex: 1, backgroundColor: '#f9fafb' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 16,
    backgroundColor: '#007bff',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0056b3',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 28,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 8,
  },

  searchSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  label: {
    fontSize: 15,
    marginBottom: 8,
    color: '#444',
    fontWeight: '600',
  },
  inputGroup: { flexDirection: 'row', alignItems: 'center' },
  input: {
    flex: 1,
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#222',
    // smooth border color transition on focus can be handled with state & Animated if desired
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 12,
    elevation: 4,
    shadowColor: '#0056b3',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  error: { color: '#e55353', paddingHorizontal: 20, marginTop: 8 },
  warning: { color: '#f0a500', paddingHorizontal: 20, marginTop: 8 },

  mapSection: {
    flex: 1,
    minHeight: 260,
    borderTopWidth: 1,
    borderTopColor: '#e1e4e8',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
  },
  map: { flex: 1 },

  listContainer: { padding: 24, backgroundColor: '#f9fafb' },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 18,
    color: '#222',
  },
  noShops: {
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
  },

  shopCard: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },

  statusIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  insideStatus: { backgroundColor: '#28a745' }, // a bit softer green
  outsideStatus: { backgroundColor: '#dc3545' }, // a bit softer red

  shopCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  shopName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
  },

  shopLocation: {
    fontSize: 15,
    color: '#555',
    marginBottom: 12,
  },

  distanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 14,
  },
  distanceText: {
    fontSize: 15,
    color: '#444',
  },
});
