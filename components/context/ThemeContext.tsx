// ThemeContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const themes = {
  original: {
    name: 'original',
    background: '#ffffffff', // Header/Footer/Sidebar
    pageBackground: '#F5F5DC', // Index background
    text: '#5C4033',
    button: '#8B4513',
    card: '#FFFFFF',
    icon: '#8B4513',
    sidebarIconColor: '#5C4033',
    sidebarActiveIconColor: '#8B4513',
    gridText: '#5C4033',
    border: '#ccc',
  },
  dark: {
    name: 'dark',
    background: '#121212',
    pageBackground: '#121212',
    text: '#FFFFFF',
    button: '#5DADE2',
    card: '#1E1E1E',
    icon: '#FFFFFF',
    sidebarIconColor: '#BBBBBB',
    sidebarActiveIconColor: '#FFFFFF',
    gridText: '#FFFFFF',
    border: '#444',
  },
  colorblindGreenRed: {
    name: 'colorblindGreenRed',
    background: '#FFFFFF',
    pageBackground: '#FFFFFF',
    text: '#000000',
    button: '#00CCFF',
    card: '#F5F5F5',
    icon: '#000000',
    sidebarIconColor: '#555555',
    sidebarActiveIconColor: '#000000',
    gridText: '#000000',
    border: '#999999',
  },
  colorblindBlueYellow: {
    name: 'colorblindBlueYellow',
    background: '#FFFFE0',
    pageBackground: '#FFFFE0',
    text: '#00008B',
    button: '#FFD700',
    card: '#FFF8DC',
    icon: '#00008B',
    sidebarIconColor: '#5F5F5F',
    sidebarActiveIconColor: '#00008B',
    gridText: '#00008B',
    border: '#CCCC00',
  },
  monochrome: {
    name: 'monochrome',
    background: '#ffffffff',
    pageBackground: '#e6e6e6ff',
    text: '#222222',
    button: '#888888',
    card: '#ffffffff',
    icon: '#222222',
    sidebarIconColor: '#444444',
    sidebarActiveIconColor: '#222222',
    gridText: '#222222',
    border: '#999999',
  },
  lemonSummer: {
    name: 'lemonSummer',
    background: '#fff7c1ff',  
    pageBackground: '#c2f7f0ff',
    text: '#D96C06',
    button: '#D96C06',
    card: '#4CD7D0',
    icon: '#D96C06',
    sidebarIconColor: '#0c9790ff',
    sidebarActiveIconColor: '#D96C06',
    gridText: '#ffffffff',
    border: '#0a0a0aff',
    },
  pastelMorning: {
    name: 'pastelMorning',
    background: '#ECFDF1',  
    pageBackground: '#F9EAC2',
    text: '#549BAD',
    button: '#D96C06',
    card: '#f8caddff',
    icon: '#549BAD',
    sidebarIconColor: '#D96C06',
    sidebarActiveIconColor: '#549BAD',
    gridText: '#ffffffff',
    border: '#b2bd1aff',
    },
  foreverFields: {
    name: 'foreverFields',
    background: '#feffd2ff',  
    pageBackground: '#fffce4ff',
    text: '#d40d03ff',
    button: '#B7AC44',
    card: '#feffd2ff',
    icon: '#d40d03ff',
    sidebarIconColor: '#da4c4cff',
    sidebarActiveIconColor: '#d40d03ff',
    gridText: '#d40d03ff',
    border: '#b2bd1aff',
    },
};


const ThemeContext = createContext({
  theme: themes.original,
  setTheme: (themeName: keyof typeof themes) => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState(themes.original);

  useEffect(() => {
    (async () => {
      const storedTheme = await AsyncStorage.getItem('appTheme');
      if (storedTheme && themes[storedTheme as keyof typeof themes]) {
        setThemeState(themes[storedTheme as keyof typeof themes]);
      }
    })();
  }, []);

  const setTheme = async (themeName: keyof typeof themes) => {
    const selectedTheme = themes[themeName];
    setThemeState(selectedTheme);
    await AsyncStorage.setItem('appTheme', themeName);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
