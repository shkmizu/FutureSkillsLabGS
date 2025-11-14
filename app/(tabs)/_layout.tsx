import { Stack } from 'expo-router/stack';

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0F0F1E',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: '#0F0F1E',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Future Skills Lab',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="add-skill"
        options={{
          title: 'Add New Skill',
          presentation: 'modal',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="edit-skill"
        options={{
          title: 'Edit Skill',
          presentation: 'modal',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
