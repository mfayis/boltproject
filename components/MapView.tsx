import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { MapPin, Navigation, Zap, Users } from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');

interface MapLocation {
  id: string;
  name: string;
  type: 'quest' | 'player' | 'hotspot';
  latitude: number;
  longitude: number;
  participants?: number;
  xp?: number;
}

const mockLocations: MapLocation[] = [
  {
    id: '1',
    name: 'Fitness Challenge Hub',
    type: 'quest',
    latitude: 33.88,
    longitude: 35.51,
    participants: 24,
    xp: 500,
  },
  {
    id: '2',
    name: 'Reading Circle',
    type: 'quest',
    latitude: 33.885,
    longitude: 35.515,
    participants: 12,
    xp: 150,
  },
  {
    id: '3',
    name: 'Art Workshop',
    type: 'hotspot',
    latitude: 33.875,
    longitude: 35.505,
    participants: 8,
    xp: 200,
  },
  {
    id: '4',
    name: 'Active Player',
    type: 'player',
    latitude: 33.882,
    longitude: 35.512,
  },
  {
    id: '5',
    name: 'Meditation Zone',
    type: 'quest',
    latitude: 33.878,
    longitude: 35.518,
    participants: 15,
    xp: 100,
  },
];

export default function MapView() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fast loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'quest':
        return <Zap size={16} color="#00D4AA" fill="#00D4AA" />;
      case 'player':
        return <Users size={16} color="#A084E8" fill="#A084E8" />;
      case 'hotspot':
        return <MapPin size={16} color="#FF6B6B" fill="#FF6B6B" />;
      default:
        return <MapPin size={16} color="#6B7280" />;
    }
  };

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'quest':
        return '#00D4AA';
      case 'player':
        return '#A084E8';
      case 'hotspot':
        return '#FF6B6B';
      default:
        return '#6B7280';
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00D4AA" />
        <Text style={styles.loadingText}>Loading nearby quests...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Map Grid Background */}
      <View style={styles.mapGrid}>
        {Array.from({ length: 20 }).map((_, i) => (
          <View key={i} style={styles.gridLine} />
        ))}
      </View>

      {/* Location Markers */}
      {mockLocations.map((location) => {
        // Convert lat/lng to screen coordinates (simplified)
        const x = ((location.longitude - 35.5) * 1000 + screenWidth / 2) % screenWidth;
        const y = ((33.88 - location.latitude) * 1000 + 100) % 200;

        return (
          <TouchableOpacity
            key={location.id}
            style={[
              styles.marker,
              {
                left: Math.max(20, Math.min(x, screenWidth - 60)),
                top: Math.max(20, Math.min(y, 180)),
                borderColor: getLocationColor(location.type),
                backgroundColor: selectedLocation?.id === location.id 
                  ? getLocationColor(location.type) 
                  : 'rgba(26, 26, 26, 0.9)',
              },
            ]}
            onPress={() => setSelectedLocation(location)}
            activeOpacity={0.8}
          >
            {getLocationIcon(location.type)}
            {location.participants && (
              <View style={styles.participantsBadge}>
                <Text style={styles.participantsText}>{location.participants}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}

      {/* Location Info Card */}
      {selectedLocation && (
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <View style={styles.infoIcon}>
              {getLocationIcon(selectedLocation.type)}
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>{selectedLocation.name}</Text>
              <Text style={styles.infoType}>
                {selectedLocation.type.charAt(0).toUpperCase() + selectedLocation.type.slice(1)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedLocation(null)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          {selectedLocation.participants && (
            <View style={styles.infoStats}>
              <View style={styles.stat}>
                <Users size={14} color="#6B7280" />
                <Text style={styles.statText}>{selectedLocation.participants} active</Text>
              </View>
              {selectedLocation.xp && (
                <View style={styles.stat}>
                  <Zap size={14} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.statText}>{selectedLocation.xp} XP</Text>
                </View>
              )}
            </View>
          )}

          <TouchableOpacity style={styles.joinButton}>
            <Navigation size={16} color="#0A0A0A" />
            <Text style={styles.joinButtonText}>Navigate</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Map Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Navigation size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <MapPin size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#00D4AA' }]} />
          <Text style={styles.legendText}>Quests</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#A084E8' }]} />
          <Text style={styles.legendText}>Players</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FF6B6B' }]} />
          <Text style={styles.legendText}>Hotspots</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250,
    backgroundColor: '#0A0A0A',
    borderRadius: 0,
    overflow: 'hidden',
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  loadingText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
  },
  mapGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridLine: {
    width: '5%',
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: 'rgba(42, 42, 42, 0.3)',
  },
  marker: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  participantsBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#00D4AA',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0A0A0A',
  },
  participantsText: {
    color: '#0A0A0A',
    fontSize: 10,
    fontWeight: '800',
  },
  infoCard: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#2A2A2A',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  infoType: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '700',
  },
  infoStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
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
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00D4AA',
    paddingVertical: 12,
    borderRadius: 12,
  },
  joinButtonText: {
    color: '#0A0A0A',
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 8,
  },
  controls: {
    position: 'absolute',
    top: 16,
    right: 16,
    gap: 8,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2A2A2A',
  },
  legend: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '600',
  },
});