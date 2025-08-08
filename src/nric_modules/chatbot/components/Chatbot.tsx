import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Animated, 
  Easing,
  Dimensions
} from 'react-native';
import { MessageCircle, ArrowLeft, RotateCcw, Send } from 'lucide-react-native';
import { Question, ChatMessage } from '../types/Question'



interface ChatbotProps {
  questions: Question[];
  findQuestionById: (id: string) => Question | null;
}

const TypingDot: React.FC<{ delay: number }> = ({ delay }) => {
  const dotAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(dotAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dotAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, []);

  const scale = dotAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <Animated.View
      style={[
        styles.typingDot,
        { transform: [{ scale }] },
      ]}
    />
  );
};

const Chatbot: React.FC<ChatbotProps> = ({ 
  questions = [], 
  findQuestionById = () => null 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQuestionLevel, setCurrentQuestionLevel] = useState<Question[]>([]);
  const [questionHistory, setQuestionHistory] = useState<Question[][]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize with root questions when opening
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const rootQuestions = questions.filter(q => !q.parentId);
      setCurrentQuestionLevel(rootQuestions);
      
      setTimeout(() => {
        const welcomeMessage: ChatMessage = {
          id: `msg-${Date.now()}`,
          text: "Hello! 👋 Welcome to HealthCare Assistant. I'm here to help you with medical consultations, medicine orders, and health services. How can I assist you today?",
          isBot: true,
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
      }, 500);
    }
  }, [isOpen, questions, messages.length]);

  // Safe question finder
  const getQuestionChildren = (questionId: string): Question[] => {
    try {
      const question = findQuestionById(questionId);
      return question?.children || [];
    } catch (error) {
      console.error('Error finding question:', error);
      return [];
    }
  };

  const simulateTyping = (callback: () => void, delay: number = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleQuestionClick = (question: Question) => {
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      text: question.text,
      isBot: false,
      timestamp: new Date(),
      questionId: question.id
    };

    setMessages(prev => [...prev, userMessage]);

    simulateTyping(() => {
      const children = getQuestionChildren(question.id);
      
      if (children.length > 0) {
        setQuestionHistory(prev => [...prev, currentQuestionLevel]);
        setCurrentQuestionLevel(children);
        
        const responses = [
          "Great choice! Let me show you the available options:",
          "Perfect! Here are your next steps:",
          "Excellent! Please select from the following:",
          "I understand. Here are the options for you:",
          "Thank you for that information. Please choose:"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const botMessage: ChatMessage = {
          id: `msg-${Date.now()}-bot`,
          text: randomResponse,
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const endResponses = [
          "Thank you for your selection! Our healthcare team will assist you with this request shortly. You'll receive a confirmation message within 5 minutes. Is there anything else I can help you with? 😊",
          "Perfect! I've noted your request. A healthcare professional will contact you soon to proceed with your request. Can I help you with anything else today?",
          "Excellent! Your request has been submitted successfully. You'll receive further instructions via SMS/Email. Is there any other way I can assist you?",
          "Great! I've forwarded your request to the appropriate department. They'll get back to you within 30 minutes. Anything else you need help with?"
        ];
        
        const randomEndResponse = endResponses[Math.floor(Math.random() * endResponses.length)];
        
        const botMessage: ChatMessage = {
          id: `msg-${Date.now()}-bot`,
          text: randomEndResponse,
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        
        setTimeout(() => {
          const rootQuestions = questions.filter(q => !q.parentId);
          setCurrentQuestionLevel(rootQuestions);
          setQuestionHistory([]);
        }, 3000);
      }
    }, Math.random() * 1000 + 800);
  };

  const goBack = () => {
    if (questionHistory.length > 0) {
      const previousLevel = questionHistory[questionHistory.length - 1];
      setCurrentQuestionLevel(previousLevel);
      setQuestionHistory(prev => prev.slice(0, -1));
      
      const backMessage: ChatMessage = {
        id: `msg-${Date.now()}-back`,
        text: "Let me take you back to the previous options:",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, backMessage]);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentQuestionLevel([]);
    setQuestionHistory([]);
    setIsTyping(false);
    
    setTimeout(() => {
      const rootQuestions = questions.filter(q => !q.parentId);
      setCurrentQuestionLevel(rootQuestions);
      
      const welcomeMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        text: "Hello! 👋 Welcome back to HealthCare Assistant. How can I help you today?",
        isBot: true,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }, 300);
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isOpen) {
      fadeIn();
    } else {
      fadeAnim.setValue(0);
    }
  }, [isOpen]);

  if (!isOpen) {
    return (
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={styles.floatingButton}
      >
        <MessageCircle size={24} color="white" />
        <View style={styles.notificationDot}></View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.chatContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIconContainer}>
            <MessageCircle size={20} color="white" />
            <View style={styles.headerNotificationDot}></View>
          </View>
          <View>
            <Text style={styles.headerTitle}>HealthCare Assistant</Text>
            <Text style={styles.headerSubtitle}>Online • Ready to help</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          {questionHistory.length > 0 && (
            <TouchableOpacity
              onPress={goBack}
              style={styles.headerButton}
            >
              <ArrowLeft size={16} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={resetChat}
            style={styles.headerButton}
          >
            <RotateCcw size={16} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsOpen(false)}
            style={styles.headerButton}
          >
            <Text style={styles.closeButton}>×</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.isBot ? styles.botMessageWrapper : styles.userMessageWrapper
            ]}
          >
            <View style={[
              styles.messageContainer,
              message.isBot ? styles.botMessageContainer : styles.userMessageContainer
            ]}>
              {message.isBot && (
                <View style={styles.botAvatar}>
                  <Text style={styles.botAvatarText}>AI</Text>
                </View>
              )}
              <View style={[
                styles.messageBubble,
                message.isBot ? styles.botMessageBubble : styles.userMessageBubble
              ]}>
                <Text style={[
                  styles.messageText,
                  message.isBot ? styles.botMessageText : styles.userMessageText
                ]}>
                  {message.text}
                </Text>
                <Text style={[
                  styles.messageTime,
                  message.isBot ? styles.botMessageTime : styles.userMessageTime
                ]}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </View>
          </View>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <View style={[styles.messageWrapper, styles.botMessageWrapper]}>
            <View style={[styles.messageContainer, styles.botMessageContainer]}>
              <View style={styles.botAvatar}>
                <Text style={styles.botAvatarText}>AI</Text>
              </View>
              <View style={[styles.messageBubble, styles.botMessageBubble]}>
                <View style={styles.typingIndicator}>
                  <TypingDot delay={0} />
                  <TypingDot delay={100} />
                  <TypingDot delay={200} />
                </View>
              </View>
            </View>
          </View>
        )}
        
        {/* Question Options as Chat Bubbles */}
        {currentQuestionLevel.length > 0 && !isTyping && (
          <View style={[styles.messageWrapper, styles.botMessageWrapper]}>
            <View style={[styles.messageContainer, styles.botMessageContainer]}>
              <View style={styles.botAvatar}>
                <Text style={styles.botAvatarText}>AI</Text>
              </View>
              <View style={[styles.messageBubble, styles.botMessageBubble]}>
                <Text style={styles.optionsPrompt}>Please choose an option:</Text>
                <View style={styles.optionsContainer}>
                  {currentQuestionLevel.map((question, index) => (
                    <TouchableOpacity
                      key={question.id}
                      onPress={() => handleQuestionClick(question)}
                      style={[
                        styles.optionButton,
                        { opacity: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 1]
                        }) }
                      ]}
                    >
                      <View style={styles.optionButtonContent}>
                        <Text style={styles.optionButtonText}>{question.text}</Text>
                        <Send size={14} color="#1e40af" style={styles.optionButtonIcon} />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  notificationDot: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 12,
    height: 12,
    backgroundColor: '#34d399',
    borderRadius: 6,
  },
  chatContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: Dimensions.get('window').width * 0.9,
    maxWidth: 400,
    height: 600,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconContainer: {
    position: 'relative',
  },
  headerNotificationDot: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 8,
    height: 8,
    backgroundColor: '#34d399',
    borderRadius: 4,
  },
  headerTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
  },
  closeButton: {
    color: 'white',
    fontSize: 20,
    lineHeight: 20,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 24,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  botMessageWrapper: {
    alignItems: 'flex-start',
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  messageContainer: {
    maxWidth: '85%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  botMessageContainer: {
    flexDirection: 'row',
  },
  userMessageContainer: {
    flexDirection: 'row-reverse',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  botAvatarText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  botMessageBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
    borderColor: '#e5e7eb',
    borderWidth: 1,
  },
  userMessageBubble: {
    backgroundColor: '#2563eb',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  botMessageText: {
    color: '#1f2937',
  },
  userMessageText: {
    color: 'white',
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
  },
  botMessageTime: {
    color: '#6b7280',
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9ca3af',
    marginHorizontal: 2,
  },
  optionsPrompt: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
  optionsContainer: {
    gap: 8,
  },
  optionButton: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    backgroundColor: '#f0f7ff',
  },
  optionButtonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e40af',
  },
  optionButtonIcon: {
    opacity: 0.6,
  },
});

export default Chatbot;