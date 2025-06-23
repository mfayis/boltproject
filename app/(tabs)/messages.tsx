import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Search, Users, Zap } from 'lucide-react-native';

const mockGroupChats = [
  {
    id: '1',
    name: 'Fitness Warriors 💪',
    questName: '30-Day Fitness Challenge',
    lastMessage: 'Just finished my workout! Who\'s next?',
    lastSender: 'Mike',
    timestamp: '5m ago',
    unreadCount: 3,
    participants: 8,
    image: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=100',
    xpReward: 500,
  },
  {
    id: '2',
    name: 'Book Club 📚',
    questName: 'Daily Reading Challenge',
    lastMessage: 'What\'s everyone reading today?',
    lastSender: 'Emma',
    timestamp: '1h ago',
    unreadCount: 0,
    participants: 12,
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=100',
    xpReward: 150,
  },
  {
    id: '3',
    name: 'Mindful Moments 🧘',
    questName: 'Morning Meditation',
    lastMessage: 'Completed today\'s session! Feeling zen ✨',
    lastSender: 'Sarah',
    timestamp: '3h ago',
    unreadCount: 1,
    participants: 15,
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=100',
    xpReward: 100,
  },
];

export default function MessagesPage() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Quest Groups 👥</Text>
            <Text style={styles.subtitle}>Connect with fellow questers</Text>
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={24} color="#00D4AA" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Group Chats Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Quest Groups</Text>
            {mockGroupChats.map((chat) => (
              <TouchableOpacity key={chat.id} style={styles.chatCard}>
                <View style={styles.chatImageContainer}>
                  <Image source={{ uri: chat.image }} style={styles.chatImage} />
                  <View style={styles.participantsBadge}>
                    <Users size={12} color="#0A0A0A" />
                    <Text style={styles.participantsText}>{chat.participants}</Text>
                  </View>
                </View>
                
                <View style={styles.chatContent}>
                  <View style={styles.chatHeader}>
                    <Text style={styles.chatName} numberOfLines={1}>{chat.name}</Text>
                    <Text style={styles.chatTime}>{chat.timestamp}</Text>
                  </View>
                  <Text style={styles.questName} numberOfLines={1}>{chat.questName}</Text>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    <Text style={styles.senderName}>{chat.lastSender}:</Text> {chat.lastMessage}
                  </Text>
                  <View style={styles.chatFooter}>
                    <View style={styles.xpBadge}>
                      <Zap size={12} color="#00D4AA" fill="#00D4AA" />
                      <Text style={styles.xpText}>{chat.xpReward} XP</Text>
                    </View>
                    {chat.unreadCount > 0 && (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{chat.unreadCount}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Motivational Section */}
          <View style={styles.motivationSection}>
            <View style={styles.motivationCard}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1552617/pexels-photo-1552617.jpeg?auto=compress&cs=tinysrgb&w=300' }}
                style={styles.motivationImage}
              />
              <View style={styles.motivationContent}>
                <Text style={styles.motivationTitle}>Join More Groups! 🎉</Text>
                <Text style={styles.motivationText}>
                  Connect with more questers and discover new challenges. The more groups you join, the more XP you can earn!
                </Text>
                <TouchableOpacity style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>Discover Groups</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  searchButton: {
    padding: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#2A2A2A',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  chatCard: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#2A2A2A',
  },
  chatImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  chatImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  participantsBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#00D4AA',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1A1A1A',
  },
  participantsText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0A0A0A',
    marginLeft: 2,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  chatTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  questName: {
    fontSize: 12,
    color: '#00D4AA',
    fontWeight: '600',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  senderName: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  xpText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#00D4AA',
    marginLeft: 4,
  },
  unreadBadge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  motivationSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  motivationCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#2A2A2A',
  },
  motivationImage: {
    width: '100%',
    height: 120,
  },
  motivationContent: {
    padding: 20,
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  motivationText: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 16,
  },
  joinButton: {
    backgroundColor: '#00D4AA',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#0A0A0A',
    fontSize: 14,
    fontWeight: '800',
  },
});