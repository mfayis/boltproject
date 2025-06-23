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
  LinearGradient,
} from 'react-native';
import { Camera, Heart, MessageCircle, Share, Filter, Zap } from 'lucide-react-native';
import FeedPost from '@/components/FeedPost';

const mockPosts = [
  {
    id: '1',
    user: {
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      level: 27,
    },
    challenge: 'Morning Mountain Hike',
    image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Started my day with an amazing sunrise hike! The view was absolutely breathtaking. Challenge completed! 🏔️',
    likes: 127,
    comments: 23,
    timeAgo: '2h',
    xp: 250,
  },
  {
    id: '2',
    user: {
      name: 'Mike Rodriguez',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      level: 15,
    },
    challenge: '30-Day Fitness Challenge',
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Day 15 of the fitness challenge! Feeling stronger every day. Who else is crushing their goals? 💪',
    likes: 89,
    comments: 12,
    timeAgo: '4h',
    xp: 180,
  },
  {
    id: '3',
    user: {
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      level: 22,
    },
    challenge: 'Learn New Recipe',
    image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Made my first homemade pasta from scratch! It was challenging but so rewarding. The taste was incredible! 🍝',
    likes: 156,
    comments: 31,
    timeAgo: '6h',
    xp: 320,
  },
];

export default function HomeFeed() {
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Latest');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const filters = ['Latest', 'Popular', 'Following'];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>HI, ALEX!</Text>
            <Text style={styles.subtitle}>READY TO CONQUER?</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={24} color="#00D4AA" />
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer}>
          {filters.map((filter) => (
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

        <TouchableOpacity style={styles.shareVictoryButton}>
          <View style={styles.shareVictoryContent}>
            <Camera size={20} color="#FFFFFF" />
            <Text style={styles.shareVictoryText}>SHARE VICTORY</Text>
            <Zap size={16} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        <ScrollView
          style={styles.feed}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {mockPosts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
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
    backgroundColor: '#0A0A0A',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00D4AA',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  filterButton: {
    padding: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 25,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  activeFilterTab: {
    backgroundColor: '#00D4AA',
    borderColor: '#00D4AA',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  activeFilterText: {
    color: '#0A0A0A',
  },
  shareVictoryButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#00D4AA',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  shareVictoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00D4AA',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  shareVictoryText: {
    color: '#0A0A0A',
    fontSize: 16,
    fontWeight: '900',
    marginHorizontal: 12,
    letterSpacing: 1,
  },
  feed: {
    flex: 1,
  },
});