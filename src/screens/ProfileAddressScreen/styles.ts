import { StyleSheet } from "react-native";
import { scale, verticalScale, fontScale, spacing } from '../../utils/responsive';
import { Colors } from "../../constants/colors";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: verticalScale(12),
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: scale(8),
    marginRight: scale(12),
  },
  backIcon: {
    fontSize: fontScale(20),
    color: '#000',
  },
  headerTitle: {
    fontSize: fontScale(18),
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: verticalScale(100), // Extra space for bottom button
  },
  addressCard: {
    backgroundColor: '#006F850D',
   
    borderRadius: scale(12),
    padding: spacing.lg,
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(18),
  },
  typeBadge: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    borderRadius: scale(16),
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIcon: {
    width: scale(12),
    height: scale(12),
    marginRight: scale(4),
  },
  typeText: {
    fontSize: fontScale(11),
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#f8f9fa',
    borderRadius: scale(8),
    paddingHorizontal: scale(4),
  },
  editButton: {
    padding: scale(8),
  },
  deleteButton: {
    padding: scale(8),
  },
  separator: {
    width: 2,
    height: scale(20),
    backgroundColor: '#dee2e6',
    marginHorizontal: scale(2),
  },
  addressDetails: {
    gap: verticalScale(14),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: scale(2),
  },
  iconContainer: {
    width: scale(24),
    alignItems: 'center',
    marginRight: scale(14),
    marginTop: verticalScale(1),
  },
  name: {
    flex: 1,
    fontSize: fontScale(15),
    fontWeight: '600',
    color: '#212529',
    lineHeight: fontScale(20),
  },
  address: {
    flex: 1,
    fontSize: fontScale(13),
    color: '#6c757d',
    lineHeight: fontScale(18),
    marginTop: verticalScale(1),
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(40),
    marginTop: verticalScale(1),
  },
  phoneLabel: {
    fontSize: fontScale(13),
    color: '#6c757d',
  },
  phoneNumber: {
    fontSize: fontScale(13),
    color: '#212529',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(60),
  },
  emptyText: {
    fontSize: fontScale(18),
    fontWeight: '600',
    color: '#666',
    marginBottom: verticalScale(8),
  },
  emptySubText: {
    fontSize: fontScale(14),
    color: '#999',
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    paddingVertical: verticalScale(16),
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  addButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: verticalScale(16),
    borderRadius: scale(8),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    fontSize: fontScale(16),
    fontWeight: '600',
    color: '#ffffff',
  },
});