import { Alert } from 'react-native';

import { performTTS } from './tts';
import { sendSOS } from '../Footer';

type HandleVoiceCommandOptions = {
  transcription: string;
  navigation?: any;
  onSearch?: (query: string) => void;
  onItem?: (query: string) => void;
};

export const processVoiceCommand = ({
    transcription,
    navigation,
    onSearch,
    }: HandleVoiceCommandOptions) => {
    const input = transcription.toLowerCase().trim();
    console.log(input);
    console.log(transcription);

    // cart commands
    if ((input.includes('go') && input.includes('cart')) ||
        input.includes('open cart')) {
        performTTS("Opening Cart.");
        navigation?.navigate?.('Cart');
    }
    else if (input.includes('add')) {
        const regex = /add\s+(\d+)?\s*([a-z\s]+?)(?:\s+to cart)?$/i;
        const match = input.match(regex);

        if (match) {
            const quantity = parseInt(match[1]) || 1;
            const item = match[2].trim();

            if (!item || item.length === 0) {
                Alert.alert('Invalid Item', 'Could not recognize the item name.');
                performTTS('Could not recognize the item name.');
                return;
            }

            // onSearch?.(match);
            performTTS(`Adding ${quantity} ${item}`);
            Alert.alert('Test', transcription);
            // performTTS(`Adding to cart`);
        }
        else {
            performTTS(`${match}`);
            Alert.alert('Test', match);
        }
    }
    
    // voice command navigation
    else if ( (input.includes('go') && input.includes('home')) ||
        input.includes('home') || input === 'home') {
        performTTS("Returning to Home.");
        navigation?.navigate?.('Home');
    }
    else if ( (input.includes('go') && input.includes('chat')) ||
        input.includes('chat') || input === 'chat') {
        performTTS("Checking Chatbox.");
        navigation?.navigate?.('Chat');
    }
    else if ( (input.includes('go') && input.includes('track order')) ||
        input.includes('track order') || input === 'track order') {
        performTTS("Checking Order Status.");
        navigation?.navigate?.('Order');
    }
    else if ( (input.includes('go') && input.includes('profile')) ||
        input.includes('profile') || input === 'profile') {
        performTTS("Checking Profile.");
        navigation?.navigate?.('Profile');
    }
    else if ( (input.includes('go') && input.includes('setting')) ||
        input.includes('setting') || input === 'setting') {
        performTTS("Checking Settings.");
        navigation?.navigate?.('Settings');
    }
    else if ( (input.includes('go') && input.includes('history')) ||
        input.includes('history') || input === 'history') {
        performTTS("Checking History.");
        navigation?.navigate?.('History');
    }
    else if ( (input.includes('go') && input.includes('payment')) ||
        input.includes('payment') || input === 'payment') {
        performTTS("Checking Payment.");
        navigation?.navigate?.('Payment');
    }
    else if ( (input.includes('go') && input.includes('about')) ||
        input.includes('about') || input === 'about') {
        performTTS("Checking About.");
        navigation?.navigate?.('About');
    }
    else if ( (input.includes('go') && input.includes('help')) ||
        input.includes('help') || input === 'help') {
        performTTS("Checking Help.");
        navigation?.navigate?.('Help');
    }
    else if ( (input.includes('go') && (input.includes('favorite')) || input.includes('fave')) ||
        input.includes('favorite') || input === 'favorite' ||
        input.includes('fave') || input === 'fave'
        ) {
        performTTS("Checking Favorites.");
        navigation?.navigate?.('Favorites');
    }

    // other features
    else if (input.includes('sos') || input === 'sos') {
        sendSOS();
    }

    else if (input.startsWith('search for ')) {
        const query = input.replace('search for ', '').trim();
        onSearch?.(query);
        performTTS(`Searching for ${query}`);
    }

    else if (input.includes('logout') || input.includes('log out') ||
        input === 'logout' || input === 'log out') {
        performTTS("Logging out...");
        navigation?.navigate?.('Logout');
    }

    // Default: unrecognized
    else { 
        Alert.alert('Command Unrecognized ', transcription);
        performTTS("Command unrecognized. Please try again.");
 
    }
};