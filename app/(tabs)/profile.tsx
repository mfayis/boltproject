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
  Camera,
  Calendar,
  Star,
  Zap,
  Crown,
  Flame
} from 'lucide-react-native';

const mockUserData = {
  name: 'Alex Johnson',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
  level: 12,
  rank: 156,
  currentXP: 1250,
  nextLevelXP: 1600,
  xpToNext: 350,
  dayStreak: 7,
};

const mockAchievements = [
  { icon: Trophy, label: 'First Victory', color: '#FFD700' },
  { icon: Target, label: '10 Challenges', color: '#00D4AA' },
  { icon: Award, label: 'Podium Master', color: '#FF4757' },
  { icon: Star, label: 'Community Hero', color: '#00D4AA' },
];

const mockGallery = [
  'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=200',
];

export default function ProfilePage() {
  const xpProgress = (mockUserData.currentXP / mockUserData.nextLevelXP) * 100;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>PROFILE</Text>
            <Text style={styles.subtitle}>Your legend</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#00D4AA" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
                <View style={styles.streakBadge}>
                  <Flame size={16} color="#FF6B35" fill="#FF6B35" />
                  <Text style={styles.streakNumber}>{mockUserData.dayStreak}</Text>
                </View>
                <Text style={styles.streakLabel}>day streak</Text>
              </View>
            </View>

            <View style={styles.progressSection}>
              <Text style={styles.progressTitle}>Level Progress</Text>
              <Text style={styles.xpText}>{mockUserData.currentXP} / {mockUserData.nextLevelXP} XP</Text>
              
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${xpProgress}%` }]} />
                </View>
              </View>
              
              <Text style={styles.xpToNext}>{mockUserData.xpToNext} XP to Level {mockUserData.level + 1}</Text>
            </View>
          </View>

          <View style={styles.statsSection}>
            <View style={styles.statCard}>
              <Trophy size={32} color="#FFD700" />
              <Text style={styles.statNumber}>23</Text>
              <Text style={styles.statLabel}>VICTORIES</Text>
            </View>
            <View style={styles.statCard}>
              <Award size={32} color="#00D4AA" />
              <Text style={styles.statNumber}>78%</Text>
              <Text style={styles.statLabel}>WIN RATE</Text>
            </View>
          </View>

          <View style={styles.achievementsSection}>
            <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
            <View style={styles.achievementGrid}>
              {mockAchievements.map((achievement, index) => (
                <View key={index} style={styles.achievementCard}>
                  <achievement.icon size={24} color={achievement.color} />
                  <Text style={styles.achievementLabel}>{achievement.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.gallerySection}>
            <View style={styles.galleryHeader}>
              <Text style={styles.sectionTitle}>VICTORY GALLERY</Text>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>VIEW ALL</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.galleryGrid}>
              {mockGallery.map((image, index) => (
                <TouchableOpacity key={index} style={styles.galleryItem}>
                  <Image source={{ uri: image }} style={styles.galleryImage} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.historySection}>
            <Text style={styles.sectionTitle}>RECENT ACTIVITY</Text>
            <View style={styles.activityItem}>
              <Calendar size={20} color="#6B7280" />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Completed "Mountain Photography Quest"</Text>
                <Text style={styles.activityDate}>2 days ago</Text>
              </View>
              <View style={styles.activityXp}>
                <Zap size={14} color="#FFD700" fill="#FFD700" />
                <Text style={styles.activityXpText}>+500</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <Trophy size={20} color="#FFD700" />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Won "30-Day Fitness Challenge"</Text>
                <Text style={styles.activityDate}>1 week ago</Text>
              </View>
              <View style={styles.activityXp}>
                <Zap size={14} color="#FFD700" fill="#FFD700" />
                <Text style={styles.activityXpText}>+750</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <Camera size={20} color="#6B7280" />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Shared victory photo</Text>
                <Text style={styles.activityDate}>2 weeks ago</Text>
              </View>
              <View style={styles.activityXp}>
                <Zap size={14} color="#FFD700" fill="#FFD700" />
                <Text style={styles.activityXpText}>+50</Text>
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
  settingsButton: {
    padding: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    padding: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
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
    fontWeight: '900',
    color: '#0A0A0A',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rank: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFD700',
    marginLeft: 6,
  },
  streakContainer: {
    alignItems: 'center',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  streakNumber: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FF6B35',
    marginLeft: 4,
  },
  streakLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    fontWeight: '600',
  },
  progressSection: {
    marginTop: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  xpText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00D4AA',
    textAlign: 'right',
    marginBottom: 12,
  },
  progressBarContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00D4AA',
    borderRadius: 4,
  },
  xpToNext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    fontWeight: '600',
  },
  profileSection: {
    backgroundColor: '#1A1A1A',
    padding: 24,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  xpSection: {
    width: '100%',
    marginBottom: 20,
  },
  xpBar: {
    height: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 4,
    marginBottom: 8,
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#00D4AA',
    borderRadius: 4,
  },
  xpInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  xpNext: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  followSection: {
    flexDirection: 'row',
    gap: 24,
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginLeft: 6,
    fontWeight: '600',
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 12,
    letterSpacing: 0.5,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  achievementsSection: {
    backgroundColor: '#1A1A1A',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: 1,
  },
  achievementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#2A2A2A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  achievementLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'center',
  },
  gallerySection: {
    backgroundColor: '#1A1A1A',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  galleryItem: {
    width: '31%',
    aspectRatio: 1,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
  },
  historySection: {
    backgroundColor: '#1A1A1A',
    margin: 20,
    marginBottom: 32,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  activityContent: {
    flex: 1,
    marginLeft: 12,
  },
  activityText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  activityDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
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
    fontWeight: '700',
    color: '#FFD700',
    marginLeft: 4,
  },
});