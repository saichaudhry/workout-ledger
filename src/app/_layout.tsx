import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WorkoutProvider } from '../lib/store';
import { colors } from '../components/ui';
export default function Layout() {
  return <SafeAreaProvider><WorkoutProvider><StatusBar style="light" /><Stack screenOptions={{ headerStyle: { backgroundColor: colors.bg }, headerTintColor: colors.text, contentStyle: { backgroundColor: colors.bg }, headerShadowVisible: false }}><Stack.Screen name="index" options={{ headerShown: false }} /><Stack.Screen name="workout" options={{ title: 'Workout', headerBackTitle: 'History' }} /></Stack></WorkoutProvider></SafeAreaProvider>;
}
