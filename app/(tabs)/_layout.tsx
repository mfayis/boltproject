import { Tabs } from 'expo-router';
import { MessageCircle, Award, User, Target } from 'lucide-react-native';
import { View, Text, StyleSheet } from 'react-native';

function TabBarIcon({ focused, icon: Icon, label }: { focused: boolean; icon: any; label: string }) {
  return (
    <View style={[styles.tabContainer, focused && styles.activeTabContainer]}>
      <Icon 
        size={20} 
        color={focused ? '#FFFFFF' : '#6B7280'} 
        strokeWidth={focused ? 2.5 : 2}
      />
      <Text
        style={focused ? styles.activeTabLabel : styles.inactiveTabLabel}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#232046',
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
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 32,
    minWidth: 60,
    minHeight: 64,
  },
  activeTabContainer: {
    backgroundColor: '#A084E8',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 32,
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
    textAlign: 'center',
    width: '100%',
    maxWidth: 70,
    alignSelf: 'center',
  },
  inactiveTabLabel: {
    color: '#B8B8D1',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 6,
    letterSpacing: 0.5,
    textAlign: 'center',
    width: '100%',
    maxWidth: 70,
    alignSelf: 'center',
  },
});