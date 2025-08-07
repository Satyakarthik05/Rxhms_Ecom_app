import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { scale, verticalScale, fontScale, spacing } from "../../utils/responsive";
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
    fontWeight: '600',
    color: Colors.PRIMARY,
    marginBottom: verticalScale(50),
    textAlign: 'left',
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: verticalScale(20),
    position: 'relative',
  },
  label: {
    fontSize: fontScale(15),
    fontWeight: '600',
    color: '#333',
    marginBottom: verticalScale(8),
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
   
    borderColor: '#006F8580',
    borderRadius: scale(8),
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(16),
    fontSize: fontScale(16),
    ...Fonts.fontStyleRegular,
    color: '#333333',
  },
  passwordInput: {
    paddingRight: scale(50),
  },
  eyeIcon: {
    position: 'absolute',
    right: scale(15),
    top: verticalScale(35),
    padding: scale(5),
  },
  eyeText: {
    fontSize: fontScale(20),
    color: Colors.BORDER_COLOR,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(40),
    marginTop: verticalScale(10),
  },
  linkText: {
    fontSize: fontScale(14),
    color: Colors.PRIMARY,
  },
  forgotlinkText: {
    fontSize: fontScale(14),
    color: Colors.RED
  },
  loginButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: verticalScale(18),
    borderRadius: scale(8),
    alignItems: 'center',
    marginBottom: verticalScale(25),
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: fontScale(16),
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    color: '#666666',
    fontSize: fontScale(14),
    marginBottom: verticalScale(25),
  },
  otpButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: verticalScale(18),
    borderRadius: scale(8),
    alignItems: 'center',
    marginBottom: verticalScale(40),
  },
  otpButtonText: {
    color: '#ffffff',
    fontSize: fontScale(16),
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: verticalScale(40),
  },
  signUpText: {
    fontSize: fontScale(14),
    color: '#666666',
  },
  signUpLink: {
    fontSize: fontScale(14),
    color: Colors.PRIMARY,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});