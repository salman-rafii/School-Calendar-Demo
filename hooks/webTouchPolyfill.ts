import { Platform } from 'react-native';

export const webTouchPolyfill = () => {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    // Prevent redirect to root domain
    const currentPath = window.location.pathname;
    if (currentPath && !currentPath.startsWith('/School-Calendar-Demo') && window.location.hostname === 'hilichiu.github.io') {
      window.history.replaceState({}, '', '/School-Calendar-Demo/');
    }
    
    // Polyfill for better touch handling on web
    let isPointerDown = false;
    
    const handlePointerDown = () => {
      isPointerDown = true;
    };
    
    const handlePointerUp = () => {
      isPointerDown = false;
    };
    
    // Add global pointer event listeners to track touch state
    document.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('pointercancel', handlePointerUp, { passive: true });
    
    // Add meta tag for better touch handling
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover';
    
    const existingMeta = document.querySelector('meta[name="viewport"]');
    if (existingMeta) {
      existingMeta.setAttribute('content', meta.content);
    } else {
      document.head.appendChild(meta);
    }
    
    // Add CSS for better touch handling
    const style = document.createElement('style');
    style.textContent = `
      * {
        touch-action: manipulation;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      input, textarea {
        -webkit-user-select: auto;
        -khtml-user-select: auto;
        -moz-user-select: auto;
        -ms-user-select: auto;
        user-select: auto;
      }
      
      body {
        overscroll-behavior: none;
      }
    `;
    document.head.appendChild(style);
  }
};
