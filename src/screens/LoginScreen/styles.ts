import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors.PRIMARY,
    marginBottom: 50,
    textAlign: 'left',
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  label: {
  fontSize: 15,
  fontWeight: '600',
  color: '#333',
  marginBottom: 8,
},
  input: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#006F8580',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 35,
    padding: 5,
  },
  eyeText: {
    fontSize: 20,
    color: '#666',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    marginTop: 10,
  },
  linkText: {
    fontSize: 14,
    color: Colors.PRIMARY,
  },
  forgotlinkText: {
    fontSize: 14,
    // color: Colors.RED,
     color: '#FF4234'
  },
  loginButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 25,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 14,
    marginBottom: 25,
  },
  otpButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  otpButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  signUpText: {
    fontSize: 14,
    color: '#666666',
  },
  signUpLink: {
    fontSize: 14,
    color: Colors.PRIMARY,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
