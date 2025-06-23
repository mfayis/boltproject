import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Search, Plus, Filter, Zap } from 'lucide-react-native';
import ChallengeCard from '@/components/ChallengeCard';

const categories = ['All', 'Adventure', 'Fitness', 'Skills', 'Social'];

const mockChallenges = [
  {
    id: '1',
    title: 'Epic Mountain Photography',
    category: 'Adventure',
    difficulty: 'Hard',
    participants: 234,
    timeRemaining: '5 days',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Capture stunning mountain landscapes and share your adventure photos.',
    xpReward: 500,
  },
  {
    id: '2',
    title: '30-Day Fitness Transform',
    category: 'Fitness',
    difficulty: 'Medium',
    participants: 1247,
    timeRemaining: '12 days',
    image: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Transform your fitness with daily workouts and healthy habits.',
    xpReward: 750,
  },
  {
    id: '3',
    title: 'Master a New Language',
    category: 'Skills',
    difficulty: 'Medium',
    participants: 567,
    timeRemaining: '23 days',
    image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Learn 50 new words in a foreign language of your choice.',
    xpReward: 400,
  },
  {
    id: '4',
    title: 'Random Acts of Kindness',
    category: 'Social',
    difficulty: 'Easy',
    participants: 892,
    timeRemaining: '8 days',
    image: 'https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Spread positivity by performing random acts of kindness daily.',
    xpReward: 300,
  },
  {
    id: '5',
    title: 'Urban Street Art Hunt',
    category: 'Adventure',
    difficulty: 'Easy',
    participants: 156,
    timeRemaining: '15 days',
    image: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Discover and photograph street art in your city.',
    xpReward: 250,
  },
  {
    id: '6',
    title: 'Cook Around the World',
    category: 'Skills',
    difficulty: 'Medium',
    participants: 445,
    timeRemaining: '18 days',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Learn to cook traditional dishes from 5 different countries.',
    xpReward: 450,
  },
];

export default function ChallengesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  const filteredChallenges = mockChallenges.filter(challenge => {
    const matchesCategory = activeCategory === 'All' || challenge.category === activeCategory;
    const matchesSearch = challenge.title.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>ACTIVE QUESTS</Text>
            <Text style={styles.subtitle}>Choose your adventure</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={24} color="#00D4AA" />
          </TouchableOpacity>
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

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryTab,
                  activeCategory === category && styles.activeCategoryTab,
                ]}
                onPress={() => setActiveCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    activeCategory === category && styles.activeCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <ScrollView style={styles.challengesList} showsVerticalScrollIndicator={false}>
          <View style={styles.challengesGrid}>
            {filteredChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.createButton}>
          <Plus size={24} color="#0A0A0A" />
        </TouchableOpacity>
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
  filterButton: {
    padding: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
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
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
    fontWeight: '600',
  },
  categoryScroll: {
    paddingBottom: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 25,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  activeCategoryTab: {
    backgroundColor: '#00D4AA',
    borderColor: '#00D4AA',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  activeCategoryText: {
    color: '#0A0A0A',
  },
  challengesList: {
    flex: 1,
  },
  challengesGrid: {
    padding: 20,
  },
  createButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#00D4AA',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00D4AA',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
});