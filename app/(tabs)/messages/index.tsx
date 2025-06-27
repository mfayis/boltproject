import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import { Search, Users, IndianRupee, MessageCircle } from 'lucide-react-native';
import { router } from 'expo-router';

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
    isOnline: true,
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
    isOnline: false,
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
    isOnline: true,
  },
  {
    id: '4',
    name: 'Creative Minds 🎨',
    questName: 'Daily Art Challenge',
    lastMessage: 'Check out my latest sketch!',
    lastSender: 'Alex',
    timestamp: '6h ago',
    unreadCount: 0,
    participants: 6,
    image: 'https://images.pexels.com/photos/1053687/pexels-photo-1053687.jpeg?auto=compress&cs=tinysrgb&w=100',
    xpReward: 120,
    isOnline: false,
  },
  {
    id: '5',
    name: 'Coding Ninjas 💻',
    questName: 'Learn to Code',
    lastMessage: 'Anyone stuck on today\'s challenge?',
    lastSender: 'David',
    timestamp: '1d ago',
    unreadCount: 2,
    participants: 20,
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=100',
    xpReward: 200,
    isOnline: true,
  },
];

export default function MessagesPage() {
  const [searchText, setSearchText] = useState('');

  const filteredChats = mockGroupChats.filter(chat =>
    chat.name.toLowerCase().includes(searchText.toLowerCase()) ||
    chat.questName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleChatPress = (chatId: string) => {
    router.push(`/messages/chat/${chatId}`);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>No Messages 📨</Text>
            <Text style={styles.subtitle}>{mockGroupChats.length} active groups</Text>
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={24} color="#00D4AA" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search groups..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#6B7280"
            />
          </View>
        </View>

        <ScrollView style={styles.chatsList} showsVerticalScrollIndicator={false}>
          {filteredChats.map((chat) => (
            <TouchableOpacity
              key={chat.id}
              style={styles.chatItem}
              onPress={() => handleChatPress(chat.id)}
              activeOpacity={0.7}
            >
              <View style={styles.chatImageContainer}>
                <Image source={{ uri: chat.image }} style={styles.chatImage} />
        
               
              </View>
              
              <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatName} numberOfLines={1}>{chat.name}</Text>
                  
                  <View style={styles.timeAndBadge}>
                    {chat.unreadCount > 0 && (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{chat.unreadCount}</Text>
                      </View>
                    )}
                  </View>
                </View>
                
                <Text style={styles.questName} numberOfLines={1}>{chat.questName}</Text>
                
                <View style={styles.messageRow}>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    <Text style={styles.senderName}>{chat.lastSender}:</Text> {chat.lastMessage}
                  </Text>
                </View>

                <View style={styles.chatFooter}>
                  <View style={styles.xpBadge}>
                    <IndianRupee size={12} color="#00D4AA" fill="#00D4AA" />
                    <Text style={styles.xpText}>{chat.xpReward}</Text>
                  </View>
                  <MessageCircle size={14} color="#6B7280" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18122B',
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
    color: '#00D4AA',
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#2A2A2A',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
    fontWeight: '500',
  },
  chatsList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    marginBottom: 8,
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
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2A2A2A',
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
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  timeAndBadge: {
    alignItems: 'flex-end',
  },
  chatTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  unreadBadge: {
    backgroundColor: '#00D4AA',
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#0A0A0A',
    fontSize: 12,
    fontWeight: '800',
  },
  questName: {
    fontSize: 12,
    color: '#00D4AA',
    fontWeight: '600',
    marginBottom: 6,
  },
  messageRow: {
    marginBottom: 8,
  },
  lastMessage: {
    fontSize: 14,
    color: '#9CA3AF',
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
});