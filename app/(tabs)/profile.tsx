import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { 
  Settings, 
  Trophy, 
  Target, 
  Award, 
  Users, 
  Calendar,
  Star,
  Zap,
  Flame,
  Crown
} from 'lucide-react-native';

const mockUserData = {
  name: 'Alex Johnson',
  avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
  level: 12,
  xp: 1250,
  xpToNext: 350,
  streak: 7,
  totalQuests: 47,
  completedQuests: 34,
  winRate: 72,
  rank: 156,
};

const mockAchievements = [
  { id: '1', icon: Trophy, title: 'First Victory', description: 'Complete your first quest', unlocked: true, color: '#FFD700' },
  { id: '2', icon: Flame, title: 'Hot Streak', description: '7-day streak', unlocked: true, color: '#FF9500' },
  { id: '3', icon: Star, title: 'Rising Star', description: 'Reach Level 10', unlocked: true, color: '#00D4AA' },
  { id: '4', icon: Target, title: 'Fitness Guru', description: 'Complete 10 fitness quests', unlocked: true, color: '#FF6B6B' },
  { id: '5', icon: Award, title: 'Bookworm', description: 'Complete 5 learning quests', unlocked: false, color: '#6B7280' },
  { id: '6', icon: Crown, title: 'Quest Master', description: 'Complete 100 quests', unlocked: false, color: '#6B7280' },
];

const mockRecentActivity = [
  {
    id: '1',
    type: 'completed',
    title: 'Morning Meditation',
    xp: 100,
    date: '2 hours ago',
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '2',
    type: 'level_up',
    title: 'Reached Level 12!',
    xp: 0,
    date: '1 day ago',
    image: null,
  },
  {
    id: '3',
    type: 'completed',
    title: 'Daily Reading',
    xp: 75,
    date: '2 days ago',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

export default function ProfilePage() {
  const progressPercentage = (mockUserData.xp / (mockUserData.xp + mockUserData.xpToNext)) * 100;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Profile 👤</Text>
            <Text style={styles.subtitle}>Your quest journey</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#00D4AA" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: mockUserData.avatar }} style={styles.avatar} />
                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>{mockUserData.level}</Text>
                </View>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.name}>{mockUserData.name}</Text>
                <View style={styles.rankContainer}>
                  <Crown size={16} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.rank}>Rank #{mockUserData.rank}</Text>
                </View>
              </View>
              <View style={styles.streakContainer}>
                <Trophy size={20} color="#FF9500" fill="#FFD700" />
                <Text style={styles.streakNumber}>7</Text>
                <Text style={styles.streakLabel}>day streak</Text>
              </View>
            </View>

            {/* XP Progress */}
            <View style={styles.xpSection}>
              <View style={styles.xpHeader}>
                <Text style={styles.xpTitle}>Level Progress</Text>
                <Text style={styles.xpText}>{mockUserData.xp} / {mockUserData.xp + mockUserData.xpToNext} XP</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
              </View>
              <Text style={styles.xpToNext}>{mockUserData.xpToNext} XP to Level {mockUserData.level + 1}</Text>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Trophy size={24} color="#FFD700" fill="#FFD700" />
              <Text style={styles.statNumber}>{mockUserData.completedQuests}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statCard}>
              <Target size={24} color="#00D4AA" />
              <Text style={styles.statNumber}>{mockUserData.winRate}%</Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </View>
            <View style={styles.statCard}>
              <Zap size={24} color="#FF6B6B" fill="#FF6B6B" />
              <Text style={styles.statNumber}>{mockUserData.xp}</Text>
              <Text style={styles.statLabel}>Total XP</Text>
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
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#B8B8D1',
  },
  settingsButton: {
    padding: 12,
    backgroundColor: '#232046',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#2D254D',
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#232046',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#2D254D',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#00D4AA',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#00D4AA',
    borderRadius: 16,
    minWidth: 32,
    height: 32,
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
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rank: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '600',
    marginLeft: 4,
  },
  streakContainer: {
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FF9500',
  },
  streakNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FF9500',
    marginTop: 4,
  },
  streakLabel: {
    fontSize: 10,
    color: '#FF9500',
    fontWeight: '600',
  },
  xpSection: {
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    paddingTop: 20,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  xpTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  xpText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  progressBar: {
    height: 12,
    backgroundColor: '#2A2A2A',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00D4AA',
    borderRadius: 6,
  },
  xpToNext: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#232046',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2D254D',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  viewAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewAllText: {
    fontSize: 14,
    color: '#00D4AA',
    fontWeight: '700',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: '48%',
    backgroundColor: '#232046',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2D254D',
  },
  lockedAchievement: {
    backgroundColor: '#232046',
    borderColor: '#2D254D',
  },
  achievementIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  lockedText: {
    opacity: 0.5,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232046',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#2D254D',
  },
  activityIcon: {
    marginRight: 16,
  },
  activityImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  levelUpIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  activityXp: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activityXpText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#00D4AA',
    marginLeft: 4,
  },
  friendsContainer: {
    alignItems: 'center',
  },
  friendsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232046',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#2D254D',
  },
  friendsButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00D4AA',
    marginLeft: 8,
  },
  motivationCard: {
    backgroundColor: '#232046',
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#2D254D',
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