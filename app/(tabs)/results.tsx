import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Trophy, Medal, Award, Calendar, IndianRupee, Crown, Star, Target } from 'lucide-react-native';
import ResultCard from '../../components/ResultCard';

const mockLeaderboard = [
  {
    id: '1',
    rank: 1,
    name: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    xp: 2847,
    level: 28,
    streak: 45,
    completedQuests: 89,
    badges: ['🏆', '🔥', '⭐'],
  },
  {
    id: '2',
    rank: 2,
    name: 'Mike Rodriguez',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    xp: 2634,
    level: 26,
    streak: 32,
    completedQuests: 76,
    badges: ['🥈', '💪', '📚'],
  },
  {
    id: '3',
    rank: 3,
    name: 'Emma Wilson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    xp: 2456,
    level: 24,
    streak: 28,
    completedQuests: 71,
    badges: ['🥉', '🎨', '🌟'],
  },
  {
    id: '4',
    rank: 4,
    name: 'Alex Johnson',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
    xp: 2234,
    level: 22,
    streak: 19,
    completedQuests: 65,
    badges: ['🎯', '🧘', '💡'],
  },
  {
    id: '5',
    rank: 5,
    name: 'Lisa Park',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
    xp: 2156,
    level: 21,
    streak: 15,
    completedQuests: 58,
    badges: ['🌱', '📖', '🎵'],
  },
];

const mockRecentResults = [
  {
    id: '1',
    questName: 'Morning Meditation Challenge',
    completedDate: '2024-01-15',
    participants: 234,
    myRank: 3,
    xpEarned: 150,
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=200',
    topWinners: [
      { name: 'Sarah', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50' },
      { name: 'Mike', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50' },
      { name: 'You', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50' },
    ],
  },
  {
    id: '2',
    questName: 'Daily Reading Quest',
    completedDate: '2024-01-12',
    participants: 156,
    myRank: 1,
    xpEarned: 200,
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=200',
    topWinners: [
      { name: 'You', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50' },
      { name: 'Emma', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50' },
      { name: 'Alex', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50' },
    ],
  },
];

const filterOptions = ['This Week', 'This Month', 'This Year'];

export default function ResultsPage() {
  const [activeFilter, setActiveFilter] = useState('This Week');

  const mockResults = [
  {
    id: '1',
    challengeName: 'Mountain Photography Quest',
    completedDate: '2024-01-15',
    winners: [
      {
        position: 1,
        name: 'Sarah Chen',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        photo: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400',
        xp: 500,
      },
      {
        position: 2,
        name: 'Mike Rodriguez',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        photo: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
        xp: 350,
      },
      {
        position: 3,
        name: 'Emma Wilson',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        photo: 'https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&w=400',
        xp: 250,
      },
    ],
    participants: 234,
  },
  {
    id: '2',
    challengeName: 'Random Acts of Kindness',
    completedDate: '2024-01-12',
    winners: [
      {
        position: 1,
        name: 'Alex Johnson',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
        photo: 'https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=400',
        xp: 300,
      },
      {
        position: 2,
        name: 'Lisa Park',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
        photo: 'https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=400',
        xp: 200,
      },
    ],
    participants: 892,
  },
  {
    id: '3',
    challengeName: 'Urban Street Art Hunt',
    completedDate: '2024-01-08',
    winners: [
      {
        position: 1,
        name: 'David Kim',
        avatar: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=150',
        photo: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400',
        xp: 250,
      },
    ],
    participants: 156,
  },
];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown size={20} color="#FFD700" fill="#FFD700" />;
      case 2:
        return <Medal size={20} color="#C0C0C0" fill="#C0C0C0" />;
      case 3:
        return <Award size={20} color="#CD7F32" fill="#CD7F32" />;
      default:
        return <Text style={styles.rankNumber}>#{rank}</Text>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return '#FFD700';
      case 2: return '#C0C0C0';
      case 3: return '#CD7F32';
      default: return '#00D4AA';
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>No Results 🏆</Text>
            <Text style={styles.subtitle}>See how you stack up!</Text>
          </View>
        </View>

          <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search quests..."
              placeholderTextColor="#6B7280"
            />
          </View>
        </View>

        {/* Filter Options */}
        <View style={styles.filterContainer}>
          {filterOptions.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                activeFilter === filter && styles.activeFilterTab,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Stats Cards */}
          <View style={styles.statsSection}>
            <View style={styles.statCard}>
              <Trophy size={28} color="#FFD700" />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>TROPIES</Text>
            </View>
            <View style={styles.statCard}>
              <IndianRupee size={28} color="#00D4AA" />
              <Text style={styles.statNumber}>5.2K</Text>
              <Text style={styles.statLabel}>PRIZES</Text>
            </View>
            <View style={styles.statCard}>
              <Award size={28} color="#FF4757" />
              <Text style={styles.statNumber}>25</Text>
              <Text style={styles.statLabel}>PLAYERS</Text>
            </View>
          </View>

          <ScrollView style={styles.resultsList} showsVerticalScrollIndicator={false}>
            {mockResults.map((result) => (
              <ResultCard key={result.id} result={result} />
            ))}
          </ScrollView>
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
    backgroundColor: '#18122B',
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
    color: '#B8B8D1',
  },
  calendarButton: {
    padding: 12,
    backgroundColor: '#232046',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#2D254D',
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    borderWidth: 2,
    borderColor: '#2D254D',
  },
  activeFilterTab: {
    backgroundColor: '#1A1A1A',
    borderColor: '#00D4AA',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B8B8D1',
  },
  activeFilterText: {
    color: '#00D4AA',
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#232046',   
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2D254D',
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
    color: '#B8B8D1',
    fontWeight: '600',
  },
  leaderboardSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232046',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2D254D',
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: '#B8B8D1',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#A084E8',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userLevel: {
    fontSize: 12,
    color: '#B8B8D1',
    fontWeight: '600',
  },
  userBadges: {
    flexDirection: 'row',
    gap: 4,
  },
  badge: {
    fontSize: 14,
  },
  userScore: {
    alignItems: 'flex-end',
  },
  userXp: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakEmoji: {
    fontSize: 12,
    marginRight: 4,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFD700',
  },
  resultsSection: {
    paddingHorizontal: 20,
  },
  resultCard: {
    backgroundColor: '#232046',
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#2D254D',
    overflow: 'hidden',
  },
  resultImage: {
    width: '100%',
    height: 120,
  },
  resultContent: {
    padding: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  resultDate: {
    fontSize: 14,
    color: '#B8B8D1',
    marginBottom: 16,
  },
  resultStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  resultStat: {
    alignItems: 'center',
  },
  resultStatLabel: {
    fontSize: 12,
    color: '#B8B8D1',
    marginBottom: 8,
    fontWeight: '600',
  },
  rankBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#A084E8',
  },
  rankBadgeText: {
    color: '#18122B',
    fontSize: 14,
    fontWeight: '800',
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D254D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  xpText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#A084E8',
    marginLeft: 4,
  },
  winnersSection: {
    borderTopWidth: 1,
    borderTopColor: '#2D254D',
    paddingTop: 16,
  },
  winnersTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  winners: {
    flexDirection: 'row',
    gap: 16,
  },
  winner: {
    alignItems: 'center',
  },
  winnerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 4,
    borderWidth: 2,
    borderColor: '#A084E8',
  },
  winnerName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  resultsList: {
    paddingHorizontal: 20,
  },
});