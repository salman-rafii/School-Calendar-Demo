import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { webTouchPolyfill } from '@/hooks/webTouchPolyfill';

export default function RootLayout() {
  useFrameworkReady();
  
  useEffect(() => {
    // Initialize web touch polyfill for better touch handling
    webTouchPolyfill();
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
