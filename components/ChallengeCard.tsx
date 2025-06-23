import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Users, Clock, Star, Zap } from 'lucide-react-native';

interface Challenge {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  participants: number;
  timeRemaining: string;
  image: string;
  description: string;
  xpReward: number;
}

interface ChallengeCardProps {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '#00D4AA';
      case 'Medium':
        return '#FFD700';
      case 'Hard':
        return '#FF4757';
      default:
        return '#6B7280';
    }
  };

  const formatParticipants = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: challenge.image }} style={styles.image} />
        <View style={styles.overlay}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{challenge.category.toUpperCase()}</Text>
          </View>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(challenge.difficulty) }]}>
            <Star
              size={12}
              color="#0A0A0A"
              fill="#0A0A0A"
            />
            <Text style={styles.difficultyText}>
              {challenge.difficulty.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.xpBadge}>
          <Zap size={14} color="#FFD700" fill="#FFD700" />
          <Text style={styles.xpText}>{challenge.xpReward}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{challenge.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {challenge.description}
        </Text>
        
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Users size={16} color="#6B7280" />
            <Text style={styles.statText}>{formatParticipants(challenge.participants)}</Text>
          </View>
          <View style={styles.stat}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.statText}>{challenge.timeRemaining}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>JOIN QUEST</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#2A2A2A',
  },
  overlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#00D4AA',
  },
  categoryText: {
    color: '#00D4AA',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '900',
    marginLeft: 4,
    color: '#0A0A0A',
    letterSpacing: 0.5,
  },
  xpBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  xpText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#FFD700',
    marginLeft: 4,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '700',
    marginLeft: 8,
  },
  joinButton: {
    backgroundColor: '#00D4AA',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#0A0A0A',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
});