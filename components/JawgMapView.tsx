import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { MapPin, Navigation, Zap, Users, Maximize2, Minimize2 } from 'lucide-react-native';

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

export default function JawgMapView() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const webViewRef = useRef<WebView>(null);

  const generateMapHTML = () => {
    const locations = mockLocations.map(loc => ({
      ...loc,
      color: loc.type === 'quest' ? '#00D4AA' : loc.type === 'player' ? '#A084E8' : '#FF6B6B'
    }));

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body, #map { 
            height: 100vh; 
            width: 100vw;
            background: #0A0A0A;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          
          .custom-marker {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 3px solid;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(26, 26, 26, 0.95);
            backdrop-filter: blur(10px);
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
          }
          
          .custom-marker:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
          }
          
          .custom-marker.selected {
            background: var(--marker-color);
            transform: scale(1.2);
          }
          
          .marker-icon {
            width: 16px;
            height: 16px;
            fill: var(--marker-color);
          }
          
          .participant-badge {
            position: absolute;
            top: -6px;
            right: -6px;
            background: #00D4AA;
            color: #0A0A0A;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: 800;
            border: 2px solid #0A0A0A;
          }
          
          .maplibregl-popup {
            max-width: 280px;
          }
          
          .maplibregl-popup-content {
            background: #1A1A1A;
            border: 2px solid #2A2A2A;
            border-radius: 16px;
            padding: 16px;
            color: #FFFFFF;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
          }
          
          .popup-header {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
          }
          
          .popup-icon {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #2A2A2A;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
          }
          
          .popup-title {
            font-size: 16px;
            font-weight: 800;
            color: #FFFFFF;
            margin-bottom: 2px;
          }
          
          .popup-type {
            font-size: 12px;
            color: #9CA3AF;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .popup-stats {
            display: flex;
            gap: 16px;
            margin-bottom: 12px;
          }
          
          .popup-stat {
            display: flex;
            align-items: center;
            gap: 6px;
          }
          
          .popup-stat-text {
            font-size: 12px;
            color: #9CA3AF;
            font-weight: 600;
          }
          
          .popup-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: #00D4AA;
            color: #0A0A0A;
            border: none;
            border-radius: 12px;
            padding: 12px;
            font-size: 14px;
            font-weight: 800;
            cursor: pointer;
            width: 100%;
            transition: all 0.2s ease;
          }
          
          .popup-button:hover {
            background: #00B894;
            transform: translateY(-1px);
          }
          
          .maplibregl-popup-close-button {
            color: #9CA3AF;
            font-size: 20px;
            font-weight: 700;
            right: 8px;
            top: 8px;
          }
          
          .maplibregl-popup-close-button:hover {
            color: #FFFFFF;
          }
          
          .maplibregl-ctrl-group {
            background: rgba(26, 26, 26, 0.95);
            border: 2px solid #2A2A2A;
            border-radius: 12px;
            backdrop-filter: blur(10px);
          }
          
          .maplibregl-ctrl-group button {
            background: transparent;
            border: none;
            color: #FFFFFF;
          }
          
          .maplibregl-ctrl-group button:hover {
            background: #2A2A2A;
          }
        </style>
        <link href='https://unpkg.com/maplibre-gl@3.6.1/dist/maplibre-gl.css' rel='stylesheet' />
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/maplibre-gl@3.6.1/dist/maplibre-gl.js"></script>
        <script>
          const locations = ${JSON.stringify(locations)};
          
          const map = new maplibregl.Map({
            container: 'map',
            style: 'https://tiles.jawg.io/jawg-dark.json?access-token=U6KBGetzPdDmNVhpquQbRStGmsj39unTyg3MGtjUn6jm8na1cVoosOJb7pGCiKQt',
            center: [35.51, 33.88],
            zoom: 13,
            attributionControl: false,
            logoPosition: 'bottom-right'
          });
          
          // Add navigation controls
          map.addControl(new maplibregl.NavigationControl({
            showCompass: true,
            showZoom: true,
            visualizePitch: true
          }), 'top-right');
          
          // Add geolocate control
          map.addControl(new maplibregl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
          }), 'top-right');
          
          map.on('load', () => {
            // Notify React Native that map is loaded
            window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'mapLoaded' }));
            
            locations.forEach(location => {
              const markerElement = document.createElement('div');
              markerElement.className = 'custom-marker';
              markerElement.style.setProperty('--marker-color', location.color);
              markerElement.style.borderColor = location.color;
              
              // Add icon based on type
              let iconSVG = '';
              if (location.type === 'quest') {
                iconSVG = '<svg class="marker-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>';
              } else if (location.type === 'player') {
                iconSVG = '<svg class="marker-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>';
              } else {
                iconSVG = '<svg class="marker-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
              }
              
              markerElement.innerHTML = iconSVG;
              
              // Add participant badge if applicable
              if (location.participants) {
                const badge = document.createElement('div');
                badge.className = 'participant-badge';
                badge.textContent = location.participants.toString();
                markerElement.appendChild(badge);
              }
              
              // Create popup content
              const popupContent = \`
                <div class="popup-header">
                  <div class="popup-icon">
                    \${iconSVG}
                  </div>
                  <div>
                    <div class="popup-title">\${location.name}</div>
                    <div class="popup-type">\${location.type}</div>
                  </div>
                </div>
                \${location.participants || location.xp ? \`
                  <div class="popup-stats">
                    \${location.participants ? \`
                      <div class="popup-stat">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span class="popup-stat-text">\${location.participants} active</span>
                      </div>
                    \` : ''}
                    \${location.xp ? \`
                      <div class="popup-stat">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" stroke-width="2">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                        <span class="popup-stat-text">\${location.xp} XP</span>
                      </div>
                    \` : ''}
                  </div>
                \` : ''}
                <button class="popup-button" onclick="navigateToLocation('\${location.id}')">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                  </svg>
                  Navigate
                </button>
              \`;
              
              const popup = new maplibregl.Popup({
                offset: 25,
                closeButton: true,
                closeOnClick: false,
                maxWidth: '280px'
              }).setHTML(popupContent);
              
              const marker = new maplibregl.Marker(markerElement)
                .setLngLat([location.longitude, location.latitude])
                .setPopup(popup)
                .addTo(map);
              
              // Handle marker click
              markerElement.addEventListener('click', () => {
                window.ReactNativeWebView?.postMessage(JSON.stringify({
                  type: 'markerSelected',
                  location: location
                }));
              });
            });
          });
          
          // Handle navigation button click
          function navigateToLocation(locationId) {
            window.ReactNativeWebView?.postMessage(JSON.stringify({
              type: 'navigate',
              locationId: locationId
            }));
          }
          
          // Handle map interactions
          map.on('click', () => {
            window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'mapClick' }));
          });
          
          map.on('moveend', () => {
            const center = map.getCenter();
            const zoom = map.getZoom();
            window.ReactNativeWebView?.postMessage(JSON.stringify({
              type: 'mapMove',
              center: [center.lng, center.lat],
              zoom: zoom
            }));
          });
        </script>
      </body>
      </html>
    `;
  };

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      switch (data.type) {
        case 'mapLoaded':
          setIsLoading(false);
          break;
        case 'markerSelected':
          setSelectedLocation(data.location);
          break;
        case 'navigate':
          // Handle navigation to location
          console.log('Navigate to location:', data.locationId);
          break;
        case 'mapClick':
          setSelectedLocation(null);
          break;
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

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

  return (
    <View style={[styles.container, isFullscreen && styles.fullscreenContainer]}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#00D4AA" />
          <Text style={styles.loadingText}>Loading Jawg Maps...</Text>
        </View>
      )}
      
      <WebView
        ref={webViewRef}
        source={{ html: generateMapHTML() }}
        style={styles.webview}
        onMessage={handleWebViewMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={false}
        scrollEnabled={false}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        originWhitelist={['*']}
      />

      {/* Map Controls Overlay */}
      <View style={styles.controlsOverlay}>
        <TouchableOpacity style={styles.controlButton} onPress={toggleFullscreen}>
          {isFullscreen ? (
            <Minimize2 size={20} color="#FFFFFF" />
          ) : (
            <Maximize2 size={20} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>

      {/* Legend Overlay */}
      <View style={styles.legendOverlay}>
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

      {/* Selected Location Info */}
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
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    zIndex: 1000,
  },
  webview: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0A0A0A',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
  },
  controlsOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 5,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2A2A2A',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  legendOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    gap: 8,
    zIndex: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
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
    zIndex: 5,
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
});