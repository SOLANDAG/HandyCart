import { Alert } from 'react-native';

import { performTTS } from './tts';
import { sendSOS } from '../Footer';

import { productsList } from '../context/Products';
import { CartContextProps } from '../context/CartContext';

type HandleVoiceCommandOptions = {
  transcription: string;
  navigation?: any;
  cart?: CartContextProps;
  onSearch?: (query: string) => void;
  onItem?: (query: string) => void;
};

const wordToNum: { [key: string]: number } = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
};

export const processVoiceCommand = ({
    transcription,
    navigation,
    cart,
    onSearch,
    }: HandleVoiceCommandOptions) => {
    let input = transcription.toLowerCase().trim();

    // convert words to numbers if it's in input
    for (const word in wordToNum) {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        input = input.replace(regex, wordToNum[word].toString());
    }
    
    // cart commands
    if ((input.includes('go') && input.includes('cart')) ||
        input.includes('open cart')) {
        performTTS("Opening Cart.");
        navigation?.navigate?.('Cart');
    }
    else if (input.includes('add')) {
        // regex: match "add" [optional number] [item name] [optional "to cart."]
        const regex = /add\s+(?:(\d+)\s+)?([\w\s]+?)(?:\s+to\s+cart)?[.!?\s]*$/i;
        const match = input.match(regex);

        if (match) {
            const amount = parseInt(match[1]) || 1;
            const item = match[2].trim();

            const found = productsList.find(
                p => p.name.toLowerCase() === item.toLowerCase()
            );

            if (!found) {
                Alert.alert('Invalid Item', `Item ${item} not found in the catalog.`);
                performTTS(`Item ${item} not found in the catalog.`);
                return;
            }

            performTTS(`Adding ${amount} ${item} to cart.`);
            Alert.alert('Test', `Adding ${amount} ${item}`);
            cart.addToCart({
                      id: found.id,
                      name: found.name,
                      price: found.price,
                      image: found.image,
                      quantity: amount,
                    }, amount);
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