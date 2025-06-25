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
import { Flame, Zap, Star, Calendar, ChevronRight, Target } from 'lucide-react-native';

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
  {
    id: '4',
    title: 'Practice gratitude',
    category: 'Mindfulness',
    xp: 30,
    completed: false,
    icon: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '5',
    title: 'Write in journal',
    category: 'Personal',
    xp: 60,
    completed: false,
    icon: 'https://images.pexels.com/photos/1053687/pexels-photo-1053687.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

export default function QuestsPage() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const progressPercentage = (mockStats.completedToday / 5) * 100;

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
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
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
              <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
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

          {/* Weekly Goals */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Weekly Goals</Text>
            <View style={styles.goalCard}>
              <View style={styles.goalHeader}>
                <Target size={24} color="#00D4AA" />
                <Text style={styles.goalTitle}>Complete 25 Quests</Text>
              </View>
              <Text style={styles.goalProgress}>18/25 completed</Text>
              <View style={styles.goalProgressBar}>
                <View style={[styles.goalProgressFill, { width: '72%' }]} />
              </View>
              <Text style={styles.goalReward}>Reward: 500 XP + Special Badge</Text>
            </View>
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
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
    textAlign: 'center',
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
  goalCard: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#2A2A2A',
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  goalProgress: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  goalProgressBar: {
    height: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  goalProgressFill: {
    height: '100%',
    backgroundColor: '#00D4AA',
    borderRadius: 4,
  },
  goalReward: {
    fontSize: 12,
    color: '#00D4AA',
    fontWeight: '600',
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