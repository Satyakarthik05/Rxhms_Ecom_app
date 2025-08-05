import { StyleSheet } from "react-native";

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
    color: '#000000',
    marginBottom: 50,
    textAlign: 'left',
  },
  mobileLoginContainer: {
    width: '100%',
    marginBottom: 32,
  },
  phoneLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
    overflow: 'hidden',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  flagText: {
    fontSize: 16,
    marginRight: 8,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  linkText: {
    fontSize: 14,
    color: '#666666',
  },
  loginButton: {
    backgroundColor: '#000000',
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: '#666666',
  },
  signUpLink: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});