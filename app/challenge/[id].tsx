import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { IndianRupee, Award, Clock, MoveLeft } from 'lucide-react-native';

// Mock data (should be replaced with real data source)
const mockChallenges = [
  {
    id: '1',
    title: 'Morning Meditation',
    description: 'Start your day with 10 minutes of mindfulness',
    instructions: 'Find a quiet place, set a timer for 10 minutes, and focus on your breath.',
    clues: 'Try to meditate at sunrise for best results.',
    date: '2024-06-10',
    prize: '100',
    participants: 1247,
    timeRemaining: '2 day',
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
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MoveLeft size={30} />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.card}>
            <View style={styles.xpBadgeLarge}>
              <Text style={styles.xpEmoji}>💸</Text>
              <Text style={styles.xpBadgeText}>{challenge.xpReward} XP</Text>
            </View>
            <Text style={styles.title}>🏆 {challenge.title}</Text>
            <Text style={styles.description}>{challenge.description}</Text>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Award size={30} color="#FF4757" />
                <Text style={styles.statNumber}>{challenge.participants}</Text>
                <Text style={styles.statLabel}>PLAYERS</Text>
              </View>
              <View style={styles.statCard}>
                <Clock size={30} color="#FFD700" />       
                <Text style={styles.statNumber}>{challenge.timeRemaining}</Text>
                <Text style={styles.statLabel}>TIME LEFT</Text>
              </View>
              <View style={styles.statCard}>
                <IndianRupee size={30} color="#00D4AA"/>
                <Text style={styles.statNumber}>{challenge.prize}</Text>
                <Text style={styles.statLabel}>PRIZE</Text>
              </View>
            </View>
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>📝 Instructions</Text>
              <Text style={styles.sectionContent}>{challenge.instructions}</Text>
            </View>
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>🕵️‍♂️ Clues</Text>
              <Text style={styles.sectionContent}>{challenge.clues}</Text>
            </View>
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>🎁 Prize</Text>
              <Text style={styles.sectionContent}>{challenge.prize}</Text>
            </View>
            {!challenge.completed && (
              <TouchableOpacity style={styles.joinButton} onPress={() => {/* join logic here */}}>
                <Text style={styles.joinButtonText}>🚀 Join Challenge</Text>
              </TouchableOpacity>
            )}
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
  backButton: {
    position: 'absolute',
    top: 35,
    left: 18,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 48, // extra space for top badge and status bar
  },
  card: {
    width: '100%',
    backgroundColor: '#1A1A1A',
    borderRadius: 32,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 32,
    alignItems: 'center',
    marginTop: 24, // extra space from top
  },
  xpBadgeLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#00FFD1',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 6, // slightly smaller for mobile
    marginBottom: 18,
    marginTop: -40, // more overlap, but with extra top margin
    shadowColor: '#00FFD1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  xpEmoji: {
    fontSize: 22,
    marginRight: 6,
  },
  xpBadgeText: {
    color: '#18122B',
    fontWeight: '900',
    fontSize: 20,
    marginLeft: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#00FFD1',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#B8B8D1',
    marginBottom: 8, // bring stats row closer
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#2D254D',
    minWidth: 100,
    maxWidth: 120,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 10,
    color: '#B8B8D1',
    fontWeight: '600',
  },
  sectionCard: {
    width: '100%',
    backgroundColor: '#232042',
    borderRadius: 20,
    padding: 16,
    marginBottom: 8, // closer together
    marginTop: 4, // small space above
    alignSelf: 'center',
    paddingHorizontal: 18, // more centered look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#00FFD1',
    marginBottom: 4,
  },
  sectionContent: {
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 2,
    fontWeight: '500',
  },
  joinButton: {
    backgroundColor: '#00FFD1',
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 18,
    width: '100%',
    shadowColor: '#00FFD1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  joinButtonText: {
    color: '#18122B',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18122B',
  },
}); 