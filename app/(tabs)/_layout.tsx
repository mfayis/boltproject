import { Tabs } from 'expo-router';
import { MessageCircle, Award, User, Target, Home } from 'lucide-react-native';
import { View, Text, StyleSheet } from 'react-native';

function TabBarIcon({ focused, icon: Icon, label }: { focused: boolean; icon: any; label: string }) {
  return (
    <View style={[styles.tabContainer, focused && styles.activeTabContainer]}>
      <Icon 
        size={20} 
        color={focused ? '#FFFFFF' : '#6B7280'} 
        strokeWidth={focused ? 2.5 : 2}
      />
      {focused && (
        <Text style={styles.activeTabLabel}>{label}</Text>
      )}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1A1A1A',
          borderTopWidth: 0,
          paddingBottom: 20,
          paddingTop: 16,
          height: 90,
          paddingHorizontal: 20,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#6B7280',
      }}>
      <Tabs.Screen
        name="challenges"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={Home} label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'DMs',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={MessageCircle} label="DMs" />
          ),
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: 'Activity',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={Award} label="Activity" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'More',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={User} label="More" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 44,
    justifyContent: 'center',
  },
  activeTabContainer: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 20,
  },
  activeTabLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});