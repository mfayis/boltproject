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
import { Search, MessageCircle, Users, Zap } from 'lucide-react-native';

const mockFriends = [
  {
    id: '1',
    name: 'Sarah',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    level: 15,
    streak: 12,
    lastActive: 'Online',
    isOnline: true,
    currentQuest: 'Morning Meditation',
  },
  {
    id: '2',
    name: 'Mike',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    level: 22,
    streak: 8,
    lastActive: '2h ago',
    isOnline: false,
    currentQuest: 'Daily Reading',
  },
  {
    id: '3',
    name: 'Emma',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    level: 18,
    streak: 25,
    lastActive: '1h ago',
    isOnline: false,
    currentQuest: 'Creative Writing',
  },
  {
    id: '4',
    name: 'Alex',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
    level: 31,
    streak: 45,
    lastActive: 'Online',
    isOnline: true,
    currentQuest: 'Fitness Challenge',
  },
];

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
            <Text style={styles.title}>Friends & Groups 👥</Text>
            <Text style={styles.subtitle}>Connect with fellow questers</Text>
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={24} color="#00D4AA" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Friends Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Friends</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.friendsScroll}>
              <View style={styles.friendsContainer}>
                {mockFriends.map((friend) => (
                  <TouchableOpacity key={friend.id} style={styles.friendCard}>
                    <View style={styles.friendAvatarContainer}>
                      <Image source={{ uri: friend.avatar }} style={styles.friendAvatar} />
                      <View style={[styles.onlineIndicator, { backgroundColor: friend.isOnline ? '#00D4AA' : '#6B7280' }]} />
                      <View style={styles.levelBadge}>
                        <Text style={styles.levelText}>{friend.level}</Text>
                      </View>
                    </View>
                    <Text style={styles.friendName}>{friend.name}</Text>
                    <View style={styles.friendStreak}>
                      <Text style={styles.streakEmoji}>🔥</Text>
                      <Text style={styles.streakText}>{friend.streak}</Text>
                    </View>
                    <Text style={styles.friendStatus} numberOfLines={1}>{friend.currentQuest}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Group Chats Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quest Groups</Text>
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
                <Text style={styles.motivationTitle}>Invite Friends! 🎉</Text>
                <Text style={styles.motivationText}>
                  Share quests with friends and earn bonus XP together. The more the merrier!
                </Text>
                <TouchableOpacity style={styles.inviteButton}>
                  <Text style={styles.inviteButtonText}>Invite Friends</Text>
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
  friendsScroll: {
    paddingLeft: 20,
  },
  friendsContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: 20,
  },
  friendCard: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2A2A2A',
    width: 120,
    minHeight: 160,
  },
  friendAvatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  friendAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#00D4AA',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#1A1A1A',
  },
  levelBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FFD700',
    borderRadius: 15,
    minWidth: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#1A1A1A',
  },
  levelText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0A0A0A',
  },
  friendName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
    textAlign: 'center',
  },
  friendStreak: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  streakEmoji: {
    fontSize: 14,
    marginRight: 4,
  },
  streakText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FF9500',
  },
  friendStatus: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
    fontWeight: '600',
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
  inviteButton: {
    backgroundColor: '#00D4AA',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  inviteButtonText: {
    color: '#0A0A0A',
    fontSize: 14,
    fontWeight: '800',
  },
});