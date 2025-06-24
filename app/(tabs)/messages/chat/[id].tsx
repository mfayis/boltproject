import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ArrowLeft, Send, Users, MoveVertical as MoreVertical, Camera, Mic, Smile } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  message: string;
  timestamp: string;
  isMe: boolean;
  type: 'text' | 'image' | 'system';
  image?: string;
}

const mockChatData = {
  '1': {
    name: 'Fitness Warriors 💪',
    questName: '30-Day Fitness Challenge',
    participants: 8,
    image: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=100',
    isOnline: true,
    messages: [
      {
        id: '1',
        senderId: 'system',
        senderName: 'System',
        senderAvatar: '',
        message: 'Welcome to Fitness Warriors! Let\'s crush this 30-day challenge together! 💪',
        timestamp: '10:00 AM',
        isMe: false,
        type: 'system' as const,
      },
      {
        id: '2',
        senderId: 'mike',
        senderName: 'Mike',
        senderAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
        message: 'Just finished my morning workout! 20 push-ups and a 2-mile run. Who\'s next?',
        timestamp: '8:30 AM',
        isMe: false,
        type: 'text' as const,
      },
      {
        id: '3',
        senderId: 'sarah',
        senderName: 'Sarah',
        senderAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
        message: 'Amazing work Mike! I\'m about to start my yoga session 🧘‍♀️',
        timestamp: '8:45 AM',
        isMe: false,
        type: 'text' as const,
      },
      {
        id: '4',
        senderId: 'me',
        senderName: 'You',
        senderAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
        message: 'Great motivation everyone! Just completed my HIIT workout 🔥',
        timestamp: '9:15 AM',
        isMe: true,
        type: 'text' as const,
      },
      {
        id: '5',
        senderId: 'emma',
        senderName: 'Emma',
        senderAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        message: 'You guys are inspiring! Starting my workout now 💪',
        timestamp: '9:30 AM',
        isMe: false,
        type: 'text' as const,
      },
    ],
  },
  '2': {
    name: 'Book Club 📚',
    questName: 'Daily Reading Challenge',
    participants: 12,
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=100',
    isOnline: false,
    messages: [
      {
        id: '1',
        senderId: 'system',
        senderName: 'System',
        senderAvatar: '',
        message: 'Welcome to Book Club! Share your daily reading progress here 📖',
        timestamp: '9:00 AM',
        isMe: false,
        type: 'system' as const,
      },
      {
        id: '2',
        senderId: 'emma',
        senderName: 'Emma',
        senderAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        message: 'What\'s everyone reading today? I\'m diving into "Atomic Habits"',
        timestamp: '10:30 AM',
        isMe: false,
        type: 'text' as const,
      },
    ],
  },
};

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const chatData = mockChatData[id as keyof typeof mockChatData];

  useEffect(() => {
    if (chatData) {
      setMessages(chatData.messages);
    }
  }, [chatData]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: 'me',
        senderName: 'You',
        senderAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
        type: 'text',
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    return timestamp;
  };

  if (!chatData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Chat not found</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <View style={styles.headerImageContainer}>
              <Image source={{ uri: chatData.image }} style={styles.headerImage} />
              <View style={[styles.onlineIndicator, { backgroundColor: chatData.isOnline ? '#00D4AA' : '#6B7280' }]} />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle} numberOfLines={1}>{chatData.name}</Text>
              <Text style={styles.headerSubtitle}>
                {chatData.participants} participants • {chatData.isOnline ? 'Active now' : 'Last seen recently'}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.moreButton}>
            <MoreVertical size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map((msg) => (
            <View key={msg.id} style={styles.messageWrapper}>
              {msg.type === 'system' ? (
                <View style={styles.systemMessage}>
                  <Text style={styles.systemMessageText}>{msg.message}</Text>
                </View>
              ) : (
                <View style={[
                  styles.messageContainer,
                  msg.isMe ? styles.myMessage : styles.otherMessage
                ]}>
                  {!msg.isMe && (
                    <Image source={{ uri: msg.senderAvatar }} style={styles.messageAvatar} />
                  )}
                  <View style={[
                    styles.messageBubble,
                    msg.isMe ? styles.myMessageBubble : styles.otherMessageBubble
                  ]}>
                    {!msg.isMe && (
                      <Text style={styles.senderName}>{msg.senderName}</Text>
                    )}
                    <Text style={[
                      styles.messageText,
                      msg.isMe ? styles.myMessageText : styles.otherMessageText
                    ]}>
                      {msg.message}
                    </Text>
                    <Text style={[
                      styles.messageTime,
                      msg.isMe ? styles.myMessageTime : styles.otherMessageTime
                    ]}>
                      {formatTime(msg.timestamp)}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TouchableOpacity style={styles.inputButton}>
              <Camera size={20} color="#6B7280" />
            </TouchableOpacity>
            
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor="#6B7280"
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={1000}
            />
            
            <TouchableOpacity style={styles.inputButton}>
              <Smile size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={[styles.sendButton, message.trim() ? styles.sendButtonActive : styles.sendButtonInactive]}
            onPress={handleSendMessage}
            disabled={!message.trim()}
          >
            {message.trim() ? (
              <Send size={20} color="#0A0A0A" />
            ) : (
              <Mic size={20} color="#6B7280" />
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1A1A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1A1A1A',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  moreButton: {
    padding: 8,
    marginLeft: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  messageWrapper: {
    marginBottom: 12,
  },
  systemMessage: {
    alignItems: 'center',
    marginVertical: 8,
  },
  systemMessageText: {
    fontSize: 12,
    color: '#6B7280',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    textAlign: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'flex-end',
  },
  myMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  myMessageBubble: {
    backgroundColor: '#00D4AA',
    borderBottomRightRadius: 4,
  },
  otherMessageBubble: {
    backgroundColor: '#2A2A2A',
    borderBottomLeftRadius: 4,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00D4AA',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#0A0A0A',
  },
  otherMessageText: {
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
  },
  myMessageTime: {
    color: 'rgba(10, 10, 10, 0.7)',
    textAlign: 'right',
  },
  otherMessageTime: {
    color: '#9CA3AF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  inputButton: {
    padding: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    marginHorizontal: 8,
    maxHeight: 100,
    minHeight: 20,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#00D4AA',
  },
  sendButtonInactive: {
    backgroundColor: '#2A2A2A',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
});