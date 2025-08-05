import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    
    position: 'absolute',
    top: 60,
    left: 30,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',

  },
  backButtonText: {
    fontSize: 24,
    color: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
  },
  // Forgot password content - positioned as per layout specs
  forgotPasswordContent: {
    width: 346,
    height: 85,
    position: 'absolute',
    top: 145,
    left: 30,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  // Text input section - positioned as per layout specs
  inputContainer: {
    width: 353,
    height: 78,
    position: 'absolute',
    top: 275,
  left: 20,
    gap: 6,
  },
  inputLabel: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 6,
    fontWeight: '500',
  },
  textInput: {
   height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  sendCodeButton: {
    position: 'relative',
    top: 380,
    // left: 30,
  //  right: 30,
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendCodeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSection: {
    paddingHorizontal: 30,
    paddingBottom: 40,
    alignItems: 'center',
  },
  rememberPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberPasswordText: {
    fontSize: 14,
    color: '#666666',
  },
  logInText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
