export type DrawerParamList = {
  ///// HEADER /////
  Favorites: undefined;

  ///// GROCERY ITEMS /////
  Fruits: undefined;
  Vegetables: undefined;
  Cannedgoods: undefined;
  Dairy: undefined;
  Meat: undefined;
  Seafood: undefined;
  Deli: undefined;
  Condiments: undefined;
  Snacks: undefined;
  Bakedgoods: undefined;
  Beverages: undefined;
  Grains: undefined;
  Hygiene: undefined;
  Household: undefined;
  Healthcare: undefined;
  Babycare: undefined;
  Petcare: undefined;
  Pantrystaples: undefined;

  ///// FOOTER /////
  Order: undefined;
  Cart: undefined;
  Home: undefined;
  Chats: undefined;
  Emergency: undefined;

  ///// SIDEBAR /////
  Profile: undefined;
  Settings: undefined;
  History: undefined;
  Payment: undefined;
  About: undefined;
  Help: undefined;

  ///// USER AUTHENTICATION /////
  Login: undefined;
  Logout: undefined;
  Register: undefined;

  ///// OTP SCREEN /////
  OTP: { otp: string };
};

///// HEADER /////
export type FavoritesStackParamList = { FavoritesMain: undefined };

///// GROCERY ITEMS /////
export type FruitsStackParamList = { FruitsMain: undefined };
export type VegetablesStackParamList = { VegetablesMain: undefined };
export type CannedgoodsStackParamList = { CannedgoodsMain: undefined };
export type DairyStackParamList = { DairyMain: undefined };
export type MeatStackParamList = { MeatMain: undefined };
export type SeafoodStackParamList = { SeafoodMain: undefined };
export type DeliStackParamList = { DeliMain: undefined };
export type CondimentsStackParamList = { CondimentsMain: undefined };
export type SnacksStackParamList = { SnacksMain: undefined };
export type BakedgoodsStackParamList = { BakedgoodsMain: undefined };
export type BeveragesStackParamList = { BeveragesMain: undefined };
export type GrainsStackParamList = { GrainsMain: undefined };
export type HygieneStackParamList = { HygieneMain: undefined };
export type HouseholdStackParamList = { HouseholdMain: undefined };
export type HealthcareStackParamList = { HealthcareMain: undefined };
export type BabycareStackParamList = { BabycareMain: undefined };
export type PetcareStackParamList = { PetcareMain: undefined };
export type PantrystaplesStackParamList = { PantrystaplesMain: undefined };

///// FOOTER /////
export type OrderStackParamList = { OrderMain: undefined };
export type CartStackParamList = { CartMain: undefined };
export type HomeStackParamList = { HomeMain: undefined };
export type ChatsStackParamList = { ChatsMain: undefined };
export type EmergencyStackParamList = { EmergencyMain: undefined };

///// SIDEBAR /////
export type ProfileStackParamList = { ProfileMain: undefined };
export type SettingsStackParamList = { SettingsMain: undefined };
export type HistoryStackParamList = { HistoryMain: undefined };
export type PaymentStackParamList = { PaymentMain: undefined };
export type AboutStackParamList = { AboutMain: undefined };
export type HelpStackParamList = { HelpMain: undefined };

///// USER AUTHENTICATION /////
export type LoginStackParamList = { LoginMain: undefined };
export type LogoutStackParamList = { LogoutMain: undefined };
export type RegisterStackParamList = { RegisterMain: undefined };

///// OTP SCREEN /////
export type OTPStackParamList = { OTPMain: { otp: string } };
