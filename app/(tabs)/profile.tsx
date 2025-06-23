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
  Crown
} from 'lucide-react-native';

const mockUserData = {
  name: 'Alex Champion',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
  level: 42,
  rank: 127,
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
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 16,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rank: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFD700',
    marginLeft: 6,
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
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#00D4AA',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: '#00D4AA',
    borderRadius: 20,
    minWidth: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#1A1A1A',
  },
  levelText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0A0A0A',
  },
  name: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 1,
  },
  bio: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 20,
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
  xpText: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: '700',
    marginLeft: 6,
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