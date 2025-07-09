import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { IndianRupee, Users, Clock } from 'lucide-react-native';

// Mock data (should be replaced with real data source)
const mockChallenges = [
  {
    id: '1',
    title: 'Morning Meditation',
    description: 'Start your day with 10 minutes of mindfulness',
    instructions: 'Find a quiet place, set a timer for 10 minutes, and focus on your breath.',
    clues: 'Try to meditate at sunrise for best results.',
    date: '2024-06-10',
    prize: '100 XP',
    participants: 1247,
    timeRemaining: '2 days',
    xpReward: 100,
    completed: false,
  },
  // ... add other mock challenges as needed ...
];

export default function ChallengeDetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const challenge = mockChallenges.find((c) => c.id === id);

  if (!challenge) {
    return (
      <View style={styles.centered}><Text>Challenge not found.</Text></View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>{challenge.title}</Text>
          <Text style={styles.description}>{challenge.description}</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}><Users size={16} color="#6B7280" /><Text style={styles.statText}>{challenge.participants} participants</Text></View>
            <View style={styles.stat}><Clock size={16} color="#6B7280" /><Text style={styles.statText}>{challenge.timeRemaining} left</Text></View>
            <View style={styles.stat}><IndianRupee size={16} color="#00D4AA" /><Text style={styles.statText}>{challenge.xpReward} XP</Text></View>
          </View>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.sectionContent}>{challenge.instructions}</Text>
          <Text style={styles.sectionTitle}>Clues</Text>
          <Text style={styles.sectionContent}>{challenge.clues}</Text>
          <Text style={styles.sectionTitle}>Date</Text>
          <Text style={styles.sectionContent}>{challenge.date}</Text>
          <Text style={styles.sectionTitle}>Prize</Text>
          <Text style={styles.sectionContent}>{challenge.prize}</Text>
          {!challenge.completed && (
            <TouchableOpacity style={styles.joinButton} onPress={() => {/* join logic here */}}>
              <Text style={styles.joinButtonText}>Join Challenge</Text>
            </TouchableOpacity>
          )}
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
  contentContainer: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#00D4AA',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 13,
    color: '#9CA3AF',
    marginLeft: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00D4AA',
    marginTop: 18,
    marginBottom: 4,
  },
  sectionContent: {
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  joinButton: {
    backgroundColor: '#00D4AA',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  joinButtonText: {
    color: '#0A0A0A',
    fontSize: 18,
    fontWeight: '800',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18122B',
  },
}); 