import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Search, Zap } from 'lucide-react-native';
import MessageItem from '@/components/MessageItem';

const mockChats = [
  {
    id: '1',
    challengeName: 'Mountain Photography Quest',
    lastMessage: 'Just posted my summit photo! 📸',
    timestamp: '2m',
    unreadCount: 3,
    participants: [
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    ],
    isActive: true,
    xpReward: 500,
  },
  {
    id: '2',
    challengeName: '30-Day Fitness Transform',
    lastMessage: 'Anyone up for a workout buddy session?',
    timestamp: '1h',
    unreadCount: 0,
    participants: [
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
    ],
    isActive: true,
    xpReward: 750,
  },
  {
    id: '3',
    challengeName: 'Language Learning Challenge',
    lastMessage: 'Sarah completed today\'s vocabulary!',
    timestamp: '3h',
    unreadCount: 1,
    participants: [
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    ],
    isActive: true,
    xpReward: 400,
  },
  {
    id: '4',
    challengeName: 'Random Acts of Kindness',
    lastMessage: 'Challenge completed! Thanks everyone 🙏',
    timestamp: '1d',
    unreadCount: 0,
    participants: [
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
    ],
    isActive: false,
    xpReward: 300,
  },
  {
    id: '5',
    challengeName: 'Urban Street Art Hunt',
    lastMessage: 'Found amazing mural downtown!',
    timestamp: '2d',
    unreadCount: 0,
    participants: [
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    ],
    isActive: false,
    xpReward: 250,
  },
];

export default function MessagesPage() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>QUEST CHAT</Text>
            <Text style={styles.subtitle}>Team communications</Text>
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={24} color="#00D4AA" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.chatsList} showsVerticalScrollIndicator={false}>
          {mockChats.map((chat) => (
            <MessageItem key={chat.id} chat={chat} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 4,
  },
  searchButton: {
    padding: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  chatsList: {
    flex: 1,
  },
});