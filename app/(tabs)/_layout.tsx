import { Tabs } from 'expo-router';
import { MessageCircle, Award, User, Target } from 'lucide-react-native';
import { View, Text, StyleSheet } from 'react-native';

function TabBarIcon({ focused, icon: Icon, label }: { focused: boolean; icon: any; label: string }) {
  return (
    <View style={[styles.tabContainer, focused && styles.activeTabContainer]}>
      <Icon 
        size={22} 
        color={focused ? '#FFFFFF' : '#6B7280'} 
        strokeWidth={focused ? 2.5 : 2}
      />
      <Text style={focused ? styles.activeTabLabel : styles.inactiveTabLabel}>{label}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0A0A0A',
          borderTopWidth: 0,
          paddingBottom: 25,
          paddingTop: 20,
          height: 95,
          paddingHorizontal: 24,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#6B7280',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={Target} label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'messages',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={MessageCircle} label="messages" />
          ),
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: 'results',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={Award} label="results" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={User} label="profile" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    minWidth: 50,
  },
  activeTabContainer: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 24,
    shadowColor: '#E91E63',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  activeTabLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 6,
    letterSpacing: 0.5,
  },
  inactiveTabLabel: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 6,
    letterSpacing: 0.5,
  },
});