import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Calendar, Trophy, Award, Zap } from 'lucide-react-native';
import ResultCard from '@/components/ResultCard';

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

const filterOptions = ['All', 'This Week', 'This Month', 'This Year'];

export default function ResultsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>LEADERBOARDS</Text>
            <Text style={styles.subtitle}>Hall of champions</Text>
          </View>
          <TouchableOpacity style={styles.calendarButton}>
            <Calendar size={24} color="#00D4AA" />
          </TouchableOpacity>
        </View>

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

        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Trophy size={28} color="#FFD700" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>VICTORIES</Text>
          </View>
          <View style={styles.statCard}>
            <Award size={28} color="#00D4AA" />
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>PODIUM</Text>
          </View>
          <View style={styles.statCard}>
            <Zap size={28} color="#FF4757" />
            <Text style={styles.statNumber}>2.4K</Text>
            <Text style={styles.statLabel}>TOTAL XP</Text>
          </View>
        </View>

        <ScrollView style={styles.resultsList} showsVerticalScrollIndicator={false}>
          {mockResults.map((result) => (
            <ResultCard key={result.id} result={result} />
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
  calendarButton: {
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
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  resultsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
});