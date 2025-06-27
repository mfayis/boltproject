import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
} from 'react-native';
import { Search, Filter, Zap, Users, Clock, Star } from 'lucide-react-native';

const categories = [
  { id: 'all', name: 'All', icon: '🌟', color: '#00D4AA' },
  { id: 'health', name: 'Health', icon: '💪', color: '#FF6B6B' },
  { id: 'learning', name: 'Learning', icon: '📚', color: '#4ECDC4' },
  { id: 'creativity', name: 'Creative', icon: '🎨', color: '#FFE66D' },
  { id: 'social', name: 'Social', icon: '👥', color: '#A8E6CF' },
];

const mockChallenges = [
  {
    id: '1',
    title: 'Morning Meditation',
    description: 'Start your day with 10 minutes of mindfulness',
    category: 'health',
    difficulty: 'Easy',
    participants: 1247,
    timeRemaining: '2 days',
    xpReward: 100,
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
    completed: false,
  },
  {
    id: '2',
    title: 'Learn 10 New Words',
    description: 'Expand your vocabulary in any language',
    category: 'learning',
    difficulty: 'Medium',
    participants: 892,
    timeRemaining: '5 days',
    xpReward: 150,
    image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400',
    completed: false,
  },
  {
    id: '3',
    title: 'Daily Sketch',
    description: 'Draw something new every day for a week',
    category: 'creativity',
    difficulty: 'Easy',
    participants: 567,
    timeRemaining: '3 days',
    xpReward: 120,
    image: 'https://images.pexels.com/photos/1053687/pexels-photo-1053687.jpeg?auto=compress&cs=tinysrgb&w=400',
    completed: true,
  },
  {
    id: '4',
    title: 'Random Acts of Kindness',
    description: 'Spread positivity with daily kind gestures',
    category: 'social',
    difficulty: 'Easy',
    participants: 2134,
    timeRemaining: '1 week',
    xpReward: 200,
    image: 'https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=400',
    completed: false,
  },
  {
    id: '5',
    title: '30-Day Fitness Challenge',
    description: 'Build healthy habits with daily exercise',
    category: 'health',
    difficulty: 'Hard',
    participants: 3456,
    timeRemaining: '2 weeks',
    xpReward: 500,
    image: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=400',
    completed: false,
  },
];

export default function ChallengesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchText, setSearchText] = useState('');

  const filteredChallenges = mockChallenges.filter(challenge => {
    const matchesCategory = activeCategory === 'all' || challenge.category === activeCategory;
    const matchesSearch = challenge.title.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#00D4AA';
      case 'Medium': return '#FFD700';
      case 'Hard': return '#FF6B6B';
      default: return '#6B7280';
    }
  };

  const formatParticipants = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>No Games 🎯</Text>
            <Text style={styles.subtitle}>Choose your next adventure</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search quests..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#6B7280"
            />
          </View>
        </View>

       

        <ScrollView style={styles.challengesList} showsVerticalScrollIndicator={false}>
          <View style={styles.challengesContainer}>
            {filteredChallenges.map((challenge) => (
              <TouchableOpacity key={challenge.id} style={styles.challengeCard}>
                <View style={styles.challengeImageContainer}>
                  <Image source={{ uri: challenge.image }} style={styles.challengeImage} />
                  
                </View>
                
                <View style={styles.challengeContent}>
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                  <Text style={styles.challengeDescription} numberOfLines={2}>
                    {challenge.description}
                  </Text>
                  
                  <View style={styles.challengeStats}>
                    <View style={styles.stat}>
                      <Users size={14} color="#6B7280" />
                      <Text style={styles.statText}>{formatParticipants(challenge.participants)}</Text>
                    </View>
                    <View style={styles.stat}>
                      <Clock size={14} color="#6B7280" />
                      <Text style={styles.statText}>{challenge.timeRemaining}</Text>
                    </View>
                    
                  </View>

                  <TouchableOpacity 
                    style={[
                      styles.joinButton,
                      challenge.completed && styles.completedButton
                    ]}
                    disabled={challenge.completed}
                  >
                    <Text style={[
                      styles.joinButtonText,
                      challenge.completed && styles.completedButtonText
                    ]}>
                      {challenge.completed ? 'Completed! 🎉' : 'Start Quest'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
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
    color: '#9CA3AF',
  },
  filterButton: {
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
  categoryScroll: {
    paddingBottom: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    borderWidth: 2,
    borderColor: '#2A2A2A',
  },
  activeCategoryTab: {
    backgroundColor: '#2A2A2A',
    borderWidth: 2,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  activeCategoryText: {
    fontWeight: '800',
  },
  challengesList: {
    flex: 1,
  },
  challengesContainer: {
    padding: 20,
  },
  challengeCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#2A2A2A',
    overflow: 'hidden',
  },
  challengeImageContainer: {
    position: 'relative',
  },
  challengeImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#2A2A2A',
  },
  completedBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#00D4AA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  completedText: {
    color: '#0A0A0A',
    fontSize: 12,
    fontWeight: '800',
  },
  difficultyBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#2A2A2A',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 4,
  },
  challengeContent: {
    padding: 20,
  },
  challengeTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 16,
  },
  challengeStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
    marginLeft: 6,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  xpText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#00D4AA',
    marginLeft: 4,
  },
  joinButton: {
    backgroundColor: '#00D4AA',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#0A0A0A',
    fontSize: 16,
    fontWeight: '800',
  },
  completedButton: {
    backgroundColor: '#2A2A2A',
    borderWidth: 2,
    borderColor: '#2A2A2A',
  },
  completedButtonText: {
    color: '#9CA3AF',
  },
});