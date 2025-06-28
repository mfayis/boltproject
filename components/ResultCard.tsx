import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Trophy, Medal, Award, Users, Share, Zap } from 'lucide-react-native';

interface Winner {
  position: number;
  name: string;
  avatar: string;
  photo: string;
  xp: number;
}

interface Result {
  id: string;
  challengeName: string;
  completedDate: string;
  winners: Winner[];
  participants: number;
}

interface ResultCardProps {
  result: Result;
}

export default function ResultCard({ result }: ResultCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy size={20} color="#FFD700" fill="#FFD700" />;
      case 2:
        return <Medal size={20} color="#C0C0C0" fill="#C0C0C0" />;
      case 3:
        return <Award size={20} color="#CD7F32" fill="#CD7F32" />;
      default:
        return null;
    }
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
        return '#FFD700';
      case 2:
        return '#C0C0C0';
      case 3:
        return '#CD7F32';
      default:
        return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.challengeName}>{result.challengeName}</Text>
          <Text style={styles.completedDate}>Completed {formatDate(result.completedDate)}</Text>
        </View>
      </View>

      <View style={styles.winnersSection}>
        <Text style={styles.winnersTitle}>CHAMPIONS</Text>
        {result.winners.map((winner) => (
          <View key={winner.position} style={styles.winnerRow}>
            <View style={styles.winnerInfo}>
              <View style={[styles.positionBadge, { backgroundColor: getPositionColor(winner.position) }]}>
                {getPositionIcon(winner.position)}
                <Text style={styles.positionText}>
                  #{winner.position}
                </Text>
              </View>
              <Image source={{ uri: winner.avatar }} style={styles.winnerAvatar} />
              <Text style={styles.winnerName}>{winner.name}</Text>
            </View>
            <View style={styles.winnerRight}>
              <View style={styles.xpBadge}>
                <Trophy size={12} color="#FFD700" fill="#FFD700" />
              </View>
            </View>
          </View>
        ))}
      </View>

      
    </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  challengeName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  completedDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  shareButton: {
    padding: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
  },
  winnersSection: {
    padding: 20,
  },
  winnersTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#00D4AA',
    marginBottom: 16,
    letterSpacing: 1,
  },
  winnerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  winnerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  positionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 12,
  },
  positionText: {
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 4,
    color: '#0A0A0A',
  },
  winnerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#00D4AA',
  },
  winnerName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    flex: 1,
  },
  winnerRight: {
    alignItems: 'flex-end',
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  xpText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFD700',
    marginLeft: 4,
  },
  winnerPhoto: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  certificateButton: {
    backgroundColor: '#00D4AA',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  certificateText: {
    color: '#0A0A0A',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});