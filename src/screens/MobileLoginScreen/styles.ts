import { StyleSheet } from "react-native";
import { scale, verticalScale, fontScale, spacing } from "../../utils/responsive";
import { Colors } from "../../constants/colors";
import Fonts from "../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'flex-start',
    paddingTop: verticalScale(60),
  },
  title: {
    fontSize: fontScale(28),
     ...Fonts.fontStyleMedium,
    fontWeight: '600',
    color: '#000000',
    marginBottom: verticalScale(50),
    textAlign: 'left',
  },
  mobileLoginContainer: {
    width: '100%',
    marginBottom: verticalScale(32),
  },
  phoneLabel: {
    fontSize: fontScale(14),
    color: 'black',
    marginBottom: verticalScale(8),
     ...Fonts.fontStyleMedium
  },
  phoneInputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    borderRadius: scale(8),
    alignItems: 'center',
    overflow: 'hidden',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(15),
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  flagText: {
    fontSize: fontScale(16),
    marginRight: scale(8),
  },
  countryCodeText: {
    fontSize: fontScale(16),
    color: '#000000',
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(16),
    fontSize: fontScale(16),
    color: '#000000',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(10),
  },
  linkText: {
    fontSize: fontScale(14),
    color: Colors.MENU_COLOR,
  },
  forgotLinkText: {
    fontSize: fontScale(14),
    color: Colors.RED,
  },
  loginButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: verticalScale(18),
    borderRadius: scale(8),
    alignItems: 'center',
    marginTop: verticalScale(180),
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: fontScale(16),
    fontWeight: '600',
  },
  signUpContainer: {
    position: 'absolute',
    bottom: verticalScale(40),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: fontScale(14),
    ...Fonts.fontStyleRegular,
    color: '#666666',
  },
  signUpLink: {
    fontSize: fontScale(14),
    color: Colors.MENU_COLOR,
    fontWeight: '600',
    ...Fonts.fontStyleSemiBold
    
  },
});