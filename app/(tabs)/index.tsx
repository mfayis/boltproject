import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { Flame, Zap, Star, Calendar, ChevronRight, Plus, Camera } from 'lucide-react-native';

const mockStats = {
  streak: 7,
  xp: 1250,
  level: 12,
  completedToday: 3,
  totalCompleted: 47,
};

const mockDailyQuests = [
  {
    id: '1',
    title: 'Take a 10-minute walk',
    category: 'Health',
    xp: 50,
    completed: true,
    icon: 'https://images.pexels.com/photos/1556691/pexels-photo-1556691.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '2',
    title: 'Read for 15 minutes',
    category: 'Learning',
    xp: 75,
    completed: true,
    icon: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '3',
    title: 'Drink 8 glasses of water',
    category: 'Health',
    xp: 40,
    completed: false,
    icon: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

const mockFeedPosts = [
  {
    id: '1',
    user: {
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      level: 15,
    },
    challenge: 'Morning Meditation',
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Started my day with 10 minutes of mindfulness. Feeling centered and ready to tackle the day! 🧘‍♀️',
    likes: 24,
    comments: 8,
    timeAgo: '2h ago',
    xp: 100,
  },
  {
    id: '2',
    user: {
      name: 'Mike Rodriguez',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      level: 22,
    },
    challenge: 'Daily Reading',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Just finished another chapter of "Atomic Habits". This book is changing my perspective on building better routines! 📚',
    likes: 31,
    comments: 12,
    timeAgo: '4h ago',
    xp: 75,
  },
  {
    id: '3',
    user: {
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      level: 18,
    },
    challenge: 'Creative Writing',
    image: 'https://images.pexels.com/photos/1053687/pexels-photo-1053687.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Wrote 500 words today for my short story. The creative juices are flowing! ✍️',
    likes: 19,
    comments: 5,
    timeAgo: '6h ago',
    xp: 120,
  },
];

export default function HomeFeed() {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Hi Alex! 👋</Text>
            <Text style={styles.subtitle}>Ready for today's quests?</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.streakContainer}>
              <Flame size={20} color="#FF9500" fill="#FF9500" />
              <Text style={styles.streakText}>{mockStats.streak}</Text>
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={20} color="#00D4AA" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'feed' && styles.activeTab]}
            onPress={() => setActiveTab('feed')}
          >
            <Text style={[styles.tabText, activeTab === 'feed' && styles.activeTabText]}>
              Victory Feed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'quests' && styles.activeTab]}
            onPress={() => setActiveTab('quests')}
          >
            <Text style={[styles.tabText, activeTab === 'quests' && styles.activeTabText]}>
              Daily Quests
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {activeTab === 'feed' ? (
            /* Victory Feed */
            <View style={styles.feedContainer}>
              {/* Share Victory Button */}
              <TouchableOpacity style={styles.shareVictoryButton}>
                <Plus size={20} color="#0A0A0A" />
                <Text style={styles.shareVictoryText}>Share Your Victory</Text>
              </TouchableOpacity>

              {/* Feed Posts */}
              {mockFeedPosts.map((post) => (
                <View key={post.id} style={styles.postCard}>
                  <View style={styles.postHeader}>
                    <View style={styles.userInfo}>
                      <View style={styles.avatarContainer}>
                        <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
                        <View style={styles.levelBadge}>
                          <Text style={styles.levelText}>{post.user.level}</Text>
                        </View>
                      </View>
                      <View style={styles.userDetails}>
                        <Text style={styles.userName}>{post.user.name}</Text>
                        <Text style={styles.challengeName}>{post.challenge}</Text>
                      </View>
                    </View>
                    <View style={styles.timeContainer}>
                      <Text style={styles.timeAgo}>{post.timeAgo}</Text>
                      <View style={styles.xpBadge}>
                        <Zap size={12} color="#00D4AA" fill="#00D4AA" />
                        <Text style={styles.xpText}>+{post.xp}</Text>
                      </View>
                    </View>
                  </View>

                  <Image source={{ uri: post.image }} style={styles.postImage} />

                  <View style={styles.postActions}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionText}>❤️ {post.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionText}>💬 {post.comments}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionText}>🔗</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.postContent}>
                    <Text style={styles.caption}>
                      <Text style={styles.userNameInCaption}>{post.user.name}</Text> {post.caption}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            /* Daily Quests Tab */
            <View style={styles.questsContainer}>
              {/* Stats Cards */}
              <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                  <View style={styles.statIcon}>
                    <Zap size={20} color="#00D4AA" fill="#00D4AA" />
                  </View>
                  <Text style={styles.statNumber}>{mockStats.xp}</Text>
                  <Text style={styles.statLabel}>Total XP</Text>
                </View>
                <View style={styles.statCard}>
                  <View style={styles.statIcon}>
                    <Star size={20} color="#FFD700" fill="#FFD700" />
                  </View>
                  <Text style={styles.statNumber}>{mockStats.level}</Text>
                  <Text style={styles.statLabel}>Level</Text>
                </View>
                <View style={styles.statCard}>
                  <View style={styles.statIcon}>
                    <Calendar size={20} color="#FF6B6B" />
                  </View>
                  <Text style={styles.statNumber}>{mockStats.completedToday}</Text>
                  <Text style={styles.statLabel}>Today</Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressTitle}>Daily Progress</Text>
                  <Text style={styles.progressText}>{mockStats.completedToday}/5 quests</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${(mockStats.completedToday / 5) * 100}%` }]} />
                </View>
              </View>

              {/* Daily Quests */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Today's Quests</Text>
                {mockDailyQuests.map((quest) => (
                  <TouchableOpacity key={quest.id} style={styles.questCard}>
                    <Image source={{ uri: quest.icon }} style={styles.questIcon} />
                    <View style={styles.questContent}>
                      <Text style={styles.questTitle}>{quest.title}</Text>
                      <View style={styles.questMeta}>
                        <Text style={styles.questCategory}>{quest.category}</Text>
                        <View style={styles.questXpBadge}>
                          <Zap size={12} color="#00D4AA" fill="#00D4AA" />
                          <Text style={styles.questXpText}>{quest.xp} XP</Text>
                        </View>
                      </View>
                    </View>
                    <View style={[styles.questStatus, quest.completed && styles.questCompleted]}>
                      {quest.completed ? (
                        <Text style={styles.completedText}>✓</Text>
                      ) : (
                        <ChevronRight size={20} color="#6B7280" />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Motivational Card */}
              <View style={styles.motivationCard}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/1552617/pexels-photo-1552617.jpeg?auto=compress&cs=tinysrgb&w=300' }}
                  style={styles.motivationImage}
                />
                <View style={styles.motivationContent}>
                  <Text style={styles.motivationTitle}>Keep it up! 🎉</Text>
                  <Text style={styles.motivationText}>
                    You're on a {mockStats.streak}-day streak! Complete one more quest to keep it going.
                  </Text>
                </View>
              </View>
            </View>
          )}
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FF9500',
  },
  streakText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FF9500',
    marginLeft: 4,
  },
  cameraButton: {
    padding: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#2A2A2A',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#1A1A1A',
    borderWidth: 2,
    borderColor: '#2A2A2A',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#00D4AA',
    borderColor: '#00D4AA',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  activeTabText: {
    color: '#0A0A0A',
  },
  feedContainer: {
    paddingBottom: 32,
  },
  shareVictoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00D4AA',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  shareVictoryText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0A0A0A',
  },
  postCard: {
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#2A2A2A',
    overflow: 'hidden',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#00D4AA',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#00D4AA',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1A1A1A',
  },
  levelText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0A0A0A',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  challengeName: {
    fontSize: 14,
    color: '#00D4AA',
    fontWeight: '600',
    marginTop: 2,
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  timeAgo: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
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
    fontWeight: '700',
    color: '#00D4AA',
    marginLeft: 4,
  },
  postImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#2A2A2A',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  postContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  caption: {
    fontSize: 14,
    color: '#E5E7EB',
    lineHeight: 20,
  },
  userNameInCaption: {
    fontWeight: '800',
    color: '#FFFFFF',
  },
  questsContainer: {
    paddingBottom: 32,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2A2A2A',
  },
  statIcon: {
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  progressSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  progressText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  progressBar: {
    height: 12,
    backgroundColor: '#2A2A2A',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00D4AA',
    borderRadius: 6,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  questCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#2A2A2A',
  },
  questIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  questContent: {
    flex: 1,
  },
  questTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  questMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questCategory: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  questXpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  questXpText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00D4AA',
    marginLeft: 4,
  },
  questStatus: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  questCompleted: {
    backgroundColor: '#00D4AA',
  },
  completedText: {
    color: '#0A0A0A',
    fontSize: 16,
    fontWeight: '800',
  },
  motivationCard: {
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    marginBottom: 32,
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
  },
});