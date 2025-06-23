import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Heart, MessageCircle, Share, Zap, Star } from 'lucide-react-native';

interface User {
  name: string;
  avatar: string;
  level: number;
}

interface Post {
  id: string;
  user: User;
  challenge: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
  xp: number;
}

interface FeedPostProps {
  post: Post;
}

export default function FeedPost({ post }: FeedPostProps) {
  const [liked, setLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLocalLikes(liked ? localLikes - 1 : localLikes + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{post.user.level}</Text>
            </View>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{post.user.name}</Text>
            <Text style={styles.challengeName}>{post.challenge}</Text>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeAgo}>{post.timeAgo}</Text>
          <View style={styles.xpBadge}>
            <Zap size={12} color="#FFD700" fill="#FFD700" />
            <Text style={styles.xpText}>+{post.xp}</Text>
          </View>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: post.image }} style={styles.postImage} />
        <View style={styles.imageOverlay}>
          <View style={styles.challengeBadge}>
            <Star size={12} color="#00D4AA" fill="#00D4AA" />
            <Text style={styles.challengeBadgeText}>COMPLETED</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Heart
            size={24}
            color={liked ? '#FF4757' : '#6B7280'}
            fill={liked ? '#FF4757' : 'none'}
          />
          <Text style={[styles.actionText, liked && styles.likedText]}>
            {localLikes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={24} color="#6B7280" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Share size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.caption}>
          <Text style={styles.userNameInCaption}>{post.user.name}</Text> {post.caption}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1A',
    marginBottom: 20,
    borderRadius: 16,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#00D4AA',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#00D4AA',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1A1A1A',
  },
  levelText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#0A0A0A',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  challengeName: {
    fontSize: 14,
    color: '#00D4AA',
    fontWeight: '600',
    marginTop: 2,
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  timeAgo: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  xpBadge: {
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
  imageContainer: {
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#2A2A2A',
  },
  imageOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  challengeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00D4AA',
  },
  challengeBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#00D4AA',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    fontWeight: '700',
  },
  likedText: {
    color: '#FF4757',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  caption: {
    fontSize: 14,
    color: '#E5E7EB',
    lineHeight: 20,
  },
  userNameInCaption: {
    fontWeight: '800',
    color: '#FFFFFF',
  },
});