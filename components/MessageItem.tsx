import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Zap } from 'lucide-react-native';

interface Chat {
  id: string;
  challengeName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  participants: string[];
  isActive: boolean;
  xpReward: number;
}

interface MessageItemProps {
  chat: Chat;
}

export default function MessageItem({ chat }: MessageItemProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.avatarGroup}>
        {chat.participants.slice(0, 3).map((avatar, index) => (
          <Image
            key={index}
            source={{ uri: avatar }}
            style={[
              styles.avatar,
              { 
                marginLeft: index > 0 ? -8 : 0, 
                zIndex: 3 - index,
                borderColor: chat.isActive ? '#00D4AA' : '#2A2A2A',
              },
            ]}
          />
        ))}
        {chat.participants.length > 3 && (
          <View style={[styles.avatar, styles.moreAvatar, { marginLeft: -8, zIndex: 0 }]}>
            <Text style={styles.moreText}>+{chat.participants.length - 3}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.challengeName} numberOfLines={1}>
            {chat.challengeName}
          </Text>
          <View style={styles.rightSection}>
            <Text style={styles.timestamp}>{chat.timestamp}</Text>
            {chat.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{chat.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.messageRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {chat.lastMessage}
          </Text>
          <View style={styles.xpContainer}>
            <Zap size={12} color="#FFD700" fill="#FFD700" />
            <Text style={styles.xpText}>{chat.xpReward}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.statusIndicator, { backgroundColor: chat.isActive ? '#00D4AA' : '#6B7280' }]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 56,
    marginRight: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
  },
  moreAvatar: {
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#2A2A2A',
  },
  moreText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  challengeName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#00D4AA',
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#0A0A0A',
    fontSize: 12,
    fontWeight: '900',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    fontSize: 14,
    color: '#9CA3AF',
    flex: 1,
    marginRight: 8,
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  xpText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFD700',
    marginLeft: 4,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 12,
  },
});