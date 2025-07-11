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
            cart.addToCart({
                      id: found.id,
                      name: found.name,
                      price: found.price,
                      image: found.image,
                      quantity: amount,
                    }, amount);
        }
    }
    else if (input.includes('reduce')) {
        // regex: match "reduce" [optional number] [item name] [optional "from cart."]
        const regex = /reduce\s+(?:(\d+)\s+)?([\w\s]+?)(?:\s+from\s+cart)?[.!?\s]*$/i;
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

            performTTS(`Reduced ${amount} ${item} from cart.`);
            cart.decreaseFromCart(found.id, amount);
        }
    }
    else if (input.includes('remove')) {
        // regex: match "remove" [item name] [optional "from cart."]
        const regex = /remove\s+([\w\s]+?)(?:\s+from\s+cart)?[.!?\s]*$/i;
        const match = input.match(regex);

        if (match) {
            const item = match[1].trim();

            const found = productsList.find(
                p => p.name.toLowerCase() === item.toLowerCase()
            );

            if (!found) {
                Alert.alert('Invalid Item', `Item ${item} not found in the catalog.`);
                performTTS(`Item ${item} not found in the catalog.`);
                return;
            }

            performTTS(`Removed ${item} from cart.`);
            cart.removeFromCart(found.id);
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
    // navigation for store pages
    else if ( (input.includes('go') && input.includes('vegetable')) ||
        input.includes('vegetable')) {
        performTTS("Checking Vegetables.");
        navigation?.navigate?.('Vegetables');
    }
    else if ( (input.includes('go') && input.includes('fruit')) ||
        input.includes('fruit')) {
        performTTS("Checking Fruits.");
        navigation?.navigate?.('Fruits');
    }
    else if ( (input.includes('go') && input.includes('meat')) ||
        input.includes('meat')) {
        performTTS("Checking Meat.");
        navigation?.navigate?.('Meat');
    }
    else if ( (input.includes('go') && input.includes('seafood')) ||
        input.includes('seafood')) {
        performTTS("Checking Seafood.");
        navigation?.navigate?.('Seafood');
    }
    else if ( (input.includes('go') && input.includes('beverage')) ||
        input.includes('beverage')) {
        performTTS("Checking Beverages.");
        navigation?.navigate?.('Beverages');
    }
    else if ( (input.includes('go') && input.includes('canned good')) ||
        input.includes('canned good')) {
        performTTS("Checking Canned Goods.");
        navigation?.navigate?.('Cannedgoods');
    }
    else if ( (input.includes('go') && input.includes('dairy')) ||
        input.includes('dairy')) {
        performTTS("Checking Dairy.");
        navigation?.navigate?.('Dairy');
    }
    else if ( (input.includes('go') && input.includes('deli')) ||
        input.includes('deli')) {
        performTTS("Checking Deli.");
        navigation?.navigate?.('Deli');
    }
    else if ( (input.includes('go') && input.includes('condiment')) ||
        input.includes('condiment')) {
        performTTS("Checking Condiments.");
        navigation?.navigate?.('Condiments');
    }
    else if ( (input.includes('go') && input.includes('snack')) ||
        input.includes('snack')) {
        performTTS("Checking Snacks.");
        navigation?.navigate?.('Snacks');
    }
    else if ( (input.includes('go') && input.includes('baked good')) ||
        input.includes('baked good')) {
        performTTS("Checking Baked Goods.");
        navigation?.navigate?.('Bakedgoods');
    }
    else if ( (input.includes('go') && input.includes('grain')) ||
        input.includes('grain')) {
        performTTS("Checking Grains.");
        navigation?.navigate?.('Grains');
    }
    else if ( (input.includes('go') && input.includes('hygiene')) ||
        input.includes('hygiene')) {
        performTTS("Checking Hygiene.");
        navigation?.navigate?.('Hygiene');
    }
    else if ( (input.includes('go') && input.includes('household')) ||
        input.includes('household')) {
        performTTS("Checking Household.");
        navigation?.navigate?.('Household');
    }
    else if ( (input.includes('go') && (input.includes('healthcare')) || input.includes('health care')) ||
        input.includes('healthcare') || input.includes('health care') ) {
        performTTS("Checking Healthcare.");
        navigation?.navigate?.('Healthcare');
    }
    else if ( (input.includes('go') && (input.includes('babycare')) || input.includes('baby care') || input.includes('baby')) ||
        input.includes('babycare') || input.includes('baby care') || input.includes('baby')) {
        performTTS("Checking Baby Care.");
        navigation?.navigate?.('Babycare');
    }
    else if ( (input.includes('go') && (input.includes('petcare')) || input.includes('pet care') || input.includes('pet')) ||
        input.includes('petcare') || input.includes('pet care') || input.includes('pet')) {
        performTTS("Checking Pet Care.");
        navigation?.navigate?.('Petcare');
    }
    else if ( (input.includes('go') && input.includes('pantry')) ||
        input.includes('pantry')) {
        performTTS("Checking Pantry Staples.");
        navigation?.navigate?.('Pantrystaples');
    }

    // other features
    else if (input.includes('sos') || input === 'sos') {
        sendSOS();
    }

    // NOTE: This is not fully implemented
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