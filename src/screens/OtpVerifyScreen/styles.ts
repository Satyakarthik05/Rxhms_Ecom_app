import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  fullScreen: {
    width: 412,
    height: 917,
    backgroundColor: '#ffffff',
  },
  safeArea: {
    flex: 1,
    position: 'relative',
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
  textContainer: {
    width: 346,
    height: 91,
    position: 'absolute',
    top: 145,
    left: 30,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 29,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    flex: 1,
  },
  phoneNumber: {
    color: '#000000',
    fontWeight: '500',
  },
  editButton: {
    marginLeft: 8,
    padding: 4,
  },
  otpContainer: {
    width: 353,
    height: 77,
    position: 'absolute',
    top: 294,
    // left: 30,
    flexDirection: 'row',
    justifyContent: 'space-between', // spacing between inputs
    alignItems: 'center',            // center inputs vertically
    backgroundColor: '#ffffff',
    borderRadius: 15,
    paddingHorizontal: 20,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    backgroundColor: '#f8f8f8',
  },
  otpInputFilled: {
    borderColor: '#000000',
    backgroundColor: '#ffffff',
  },
  buttonContainer: {
    width: 340,
    height: 56,
    position: 'absolute',
    top: 411,
    left: 10,
    right: 10,
    backgroundColor: '#000000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    position: 'absolute',
    top: 500,
    left: 30,
    right: 30,
    flexDirection: 'row',        // horizontal layout
    justifyContent: 'center',    // center horizontally
    alignItems: 'center',        // center vertically
    gap: 10,                     // spacing between resend text and timer
  },
  resendText: {
    fontSize: 14,
    color: '#cccccc',
    marginRight: 10,
  },
  resendActive: {
    color: '#000000',
    textDecorationLine: 'underline',
  },
  timerText: {
    fontSize: 14,
    color: '#666666',
  },
  keyboardPlaceholder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  keyboardText: {
    fontSize: 16,
    color: '#999999',
  },
});