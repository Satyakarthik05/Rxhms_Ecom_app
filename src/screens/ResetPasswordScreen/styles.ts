import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 22,
  },
  backButtonText: {
    fontSize: 28,
    color: '#000000',
    fontWeight: '300',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
  },
  // Reset password header - better spacing
  resetPasswordHeader: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
    fontWeight: '400',
  },
  // Input section - better spacing and alignment
  inputSection: {
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
    fontWeight: '600',
  },
  passwordInputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 56,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingRight: 50,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#ffffff',
   
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  eyeIcon: {
    fontSize: 20,
    color: '#666666',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  resetPasswordButton: {
    height: 56,
    backgroundColor: '#000000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  resetPasswordButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  bottomSection: {
    paddingHorizontal: 30,
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alreadyHaveAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alreadyHaveAccountText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '400',
  },
  logInText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});