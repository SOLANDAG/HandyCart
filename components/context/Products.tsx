export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: string;
  rating: number;
  sold: number;
  image: any;
  category: 'Vegetables' | 'Fruits' | 'Meat' | 'Seafood' |
            'Beverages' | 'Canned' | 'Dairy' | 'Deli' | 
            'Condiments' | 'Snacks' | 'Baked' | 'Grains' |
            'Hygiene' | 'Household' | 'Healthcare' | 'Baby' |
            'Pet' | 'Pantry'
            ;
}

export const productsList: Product[] = [
    // vegetables
    { id: 1001, name: 'Tomatoes', description: 'Fresh and juicy red tomatoes.', price: 119, weight: '1 Kg', rating: 4.5, sold: 1700, image: require('../../assets/images/vegetables/tomato.png'), category: 'Vegetables' },
    { id: 1002, name: 'Lettuce', description: 'Crisp green lettuce, perfect for salads.', price: 150, weight: '1 Kg', rating: 4.3, sold: 900, image: require('../../assets/images/vegetables/lettuce.png'), category: 'Vegetables' },
    { id: 1003, name: 'Carrots', description: 'Sweet orange carrots full of nutrients.', price: 180, weight: '1 Kg', rating: 4.8, sold: 2400, image: require('../../assets/images/vegetables/carrot.png'), category: 'Vegetables' },
    { id: 1004, name: 'Broccoli', description: 'Fresh green broccoli florets.', price: 320, weight: '1 Kg', rating: 4.2, sold: 600, image: require('../../assets/images/vegetables/broccoli.png'), category: 'Vegetables' },
    { id: 1005, name: 'Spinach', description: 'Tender spinach leaves, rich in iron.', price: 250, weight: '1 Kg', rating: 4.7, sold: 1100, image: require('../../assets/images/vegetables/spinach.png'), category: 'Vegetables' },
    { id: 1006, name: 'Cucumbers', description: 'Cool and crunchy cucumbers.', price: 190, weight: '1 Kg', rating: 4.1, sold: 750, image: require('../../assets/images/vegetables/cucumber.png'), category: 'Vegetables' },

    // fruits
    { id: 2001, name: 'Apple', description: 'Crisp and juicy red apples.', price: 120, weight: '1 Kg', rating: 4.7, sold: 1500, image: require('../../assets/images/img-placeholder.png'), category: 'Fruits' },
    { id: 2002, name: 'Banana', description: 'Sweet ripe bananas.', price: 80, weight: '1 Kg', rating: 4.5, sold: 1000, image: require('../../assets/images/img-placeholder.png'), category: 'Fruits' },
    { id: 2003, name: 'Orange', description: 'Fresh and tangy oranges.', price: 140, weight: '1 Kg', rating: 4.6, sold: 1800, image: require('../../assets/images/img-placeholder.png'), category: 'Fruits' },
    { id: 2004, name: 'Grapes', description: 'Sweet seedless grapes.', price: 200, weight: '1 Kg', rating: 4.4, sold: 900, image: require('../../assets/images/img-placeholder.png'), category: 'Fruits' },
    { id: 2005, name: 'Mango', description: 'Juicy tropical mangoes.', price: 170, weight: '1 Kg', rating: 4.8, sold: 2200, image: require('../../assets/images/img-placeholder.png'), category: 'Fruits' },
    { id: 2006, name: 'Watermelon', description: 'Refreshing and hydrating watermelon.', price: 300, weight: '1 Pc', rating: 4.3, sold: 800, image: require('../../assets/images/img-placeholder.png'), category: 'Fruits' },

    // meat
    { id: 3001, name: 'Chicken', description: 'Fresh whole chicken.', price: 250, weight: '1 Kg', rating: 4.6, sold: 1200, image: require('../../assets/images/img-placeholder.png'), category: 'Meat' },
    { id: 3002, name: 'Beef', description: 'Tender beef cuts.', price: 450, weight: '1 Kg', rating: 4.7, sold: 950, image: require('../../assets/images/img-placeholder.png'), category: 'Meat' },
    { id: 3003, name: 'Pork', description: 'Juicy pork slices.', price: 320, weight: '1 Kg', rating: 4.5, sold: 1400, image: require('../../assets/images/img-placeholder.png'), category: 'Meat' },
    { id: 3004, name: 'Lamb', description: 'Premium lamb meat.', price: 600, weight: '1 Kg', rating: 4.4, sold: 600, image: require('../../assets/images/img-placeholder.png'), category: 'Meat' },
    { id: 3005, name: 'Bacon', description: 'Crispy smoked bacon.', price: 280, weight: '1 Kg', rating: 4.8, sold: 800, image: require('../../assets/images/img-placeholder.png'), category: 'Meat' },
    { id: 3006, name: 'Sausage', description: 'Tasty homemade sausage.', price: 300, weight: '1 Kg', rating: 4.3, sold: 700, image: require('../../assets/images/img-placeholder.png'), category: 'Meat' },

    // seafood
    { id: 4001, name: 'Salmon', description: 'Fresh Atlantic salmon.', price: 700, weight: '1 Kg', rating: 4.8, sold: 800, image: require('../../assets/images/img-placeholder.png'), category: 'Seafood' },
    { id: 4002, name: 'Shrimp', description: 'Large tiger shrimp.', price: 550, weight: '1 Kg', rating: 4.5, sold: 600, image: require('../../assets/images/img-placeholder.png'), category: 'Seafood' },
    { id: 4003, name: 'Crab', description: 'Fresh blue crabs.', price: 900, weight: '1 Kg', rating: 4.7, sold: 400, image: require('../../assets/images/img-placeholder.png'), category: 'Seafood' },
    { id: 4004, name: 'Squid', description: 'Tender squid rings.', price: 400, weight: '1 Kg', rating: 4.3, sold: 500, image: require('../../assets/images/img-placeholder.png'), category: 'Seafood' },
    { id: 4005, name: 'Tuna', description: 'Sashimi-grade tuna.', price: 850, weight: '1 Kg', rating: 4.9, sold: 300, image: require('../../assets/images/img-placeholder.png'), category: 'Seafood' },
    { id: 4006, name: 'Lobster', description: 'Live whole lobster.', price: 1500, weight: '1 Pc', rating: 4.6, sold: 200, image: require('../../assets/images/img-placeholder.png'), category: 'Seafood' },

    // beverages
    { id: 5001, name: 'Orange Juice', description: 'Fresh squeezed orange juice.', price: 150, weight: '1 L', rating: 4.7, sold: 1000, image: require('../../assets/images/img-placeholder.png'), category: 'Beverages' },
    { id: 5002, name: 'Milk Tea', description: 'Sweet and creamy milk tea.', price: 120, weight: '500 ml', rating: 4.5, sold: 850, image: require('../../assets/images/img-placeholder.png'), category: 'Beverages' },
    { id: 5003, name: 'Soda', description: 'Refreshing carbonated soda.', price: 50, weight: '1 L', rating: 4.2, sold: 1500, image: require('../../assets/images/img-placeholder.png'), category: 'Beverages' },
    { id: 5004, name: 'Coffee', description: 'Freshly brewed coffee.', price: 180, weight: '500 ml', rating: 4.6, sold: 1200, image: require('../../assets/images/img-placeholder.png'), category: 'Beverages' },
    { id: 5005, name: 'Iced Tea', description: 'Cool and sweet iced tea.', price: 100, weight: '1 L', rating: 4.3, sold: 900, image: require('../../assets/images/img-placeholder.png'), category: 'Beverages' },
    { id: 5006, name: 'Bottled Water', description: 'Pure and refreshing bottled water.', price: 30, weight: '1 L', rating: 4.9, sold: 2000, image: require('../../assets/images/img-placeholder.png'), category: 'Beverages' },

    // canned goods
    { id: 6001, name: 'Canned Tuna', description: 'Premium canned tuna in oil.', price: 80, weight: '155 g', rating: 4.7, sold: 900, image: require('../../assets/images/img-placeholder.png'), category: 'Canned' },
    { id: 6002, name: 'Corned Beef', description: 'Juicy canned corned beef.', price: 95, weight: '210 g', rating: 4.6, sold: 1100, image: require('../../assets/images/img-placeholder.png'), category: 'Canned' },
    { id: 6003, name: 'Sardines', description: 'Canned sardines in tomato sauce.', price: 30, weight: '155 g', rating: 4.4, sold: 1500, image: require('../../assets/images/img-placeholder.png'), category: 'Canned' },
    { id: 6004, name: 'Baked Beans', description: 'Sweet canned baked beans.', price: 60, weight: '220 g', rating: 4.5, sold: 800, image: require('../../assets/images/img-placeholder.png'), category: 'Canned' },
    { id: 6005, name: 'Canned Mushrooms', description: 'Whole button mushrooms.', price: 70, weight: '400 g', rating: 4.3, sold: 500, image: require('../../assets/images/img-placeholder.png'), category: 'Canned' },
    { id: 6006, name: 'Canned Peaches', description: 'Sweet canned peach slices.', price: 110, weight: '425 g', rating: 4.8, sold: 600, image: require('../../assets/images/img-placeholder.png'), category: 'Canned' },

    // dairy
    { id: 7001, name: 'Milk', description: 'Fresh whole milk.', price: 90, weight: '1 L', rating: 4.8, sold: 1300, image: require('../../assets/images/img-placeholder.png'), category: 'Dairy' },
    { id: 7002, name: 'Cheese', description: 'Rich cheddar cheese.', price: 250, weight: '500 g', rating: 4.7, sold: 800, image: require('../../assets/images/img-placeholder.png'), category: 'Dairy' },
    { id: 7003, name: 'Butter', description: 'Creamy salted butter.', price: 180, weight: '250 g', rating: 4.6, sold: 900, image: require('../../assets/images/img-placeholder.png'), category: 'Dairy' },
    { id: 7004, name: 'Yogurt', description: 'Fresh fruit yogurt.', price: 60, weight: '150 g', rating: 4.5, sold: 700, image: require('../../assets/images/img-placeholder.png'), category: 'Dairy' },
    { id: 7005, name: 'Cream', description: 'Rich heavy cream.', price: 100, weight: '250 ml', rating: 4.4, sold: 500, image: require('../../assets/images/img-placeholder.png'), category: 'Dairy' },
    { id: 7006, name: 'Eggs', description: 'Farm fresh eggs.', price: 70, weight: '12 pcs', rating: 4.9, sold: 2000, image: require('../../assets/images/img-placeholder.png'), category: 'Dairy' },

    // deli
     { id: 8001, name: 'Ham', description: 'Sliced smoked ham.', price: 300, weight: '500 g', rating: 4.8, sold: 700, image: require('../../assets/images/img-placeholder.png'), category: 'Deli' },
    { id: 8002, name: 'Salami', description: 'Dry cured salami slices.', price: 400, weight: '500 g', rating: 4.7, sold: 500, image: require('../../assets/images/img-placeholder.png'), category: 'Deli' },
    { id: 8003, name: 'Roast Beef', description: 'Tender roast beef.', price: 500, weight: '500 g', rating: 4.6, sold: 300, image: require('../../assets/images/img-placeholder.png'), category: 'Deli' },
    { id: 8004, name: 'Turkey Breast', description: 'Lean turkey breast slices.', price: 350, weight: '500 g', rating: 4.5, sold: 400, image: require('../../assets/images/img-placeholder.png'), category: 'Deli' },
    { id: 8005, name: 'Pastrami', description: 'Seasoned pastrami beef.', price: 550, weight: '500 g', rating: 4.4, sold: 250, image: require('../../assets/images/img-placeholder.png'), category: 'Deli' },
    { id: 8006, name: 'Bologna', description: 'Classic bologna sausage.', price: 280, weight: '500 g', rating: 4.3, sold: 600, image: require('../../assets/images/img-placeholder.png'), category: 'Deli' },

    // condiments
    { id: 9001, name: 'Ketchup', description: 'Classic tomato ketchup.', price: 60, weight: '500 g', rating: 4.8, sold: 1200, image: require('../../assets/images/img-placeholder.png'), category: 'Condiments' },
    { id: 9002, name: 'Mayonnaise', description: 'Creamy mayonnaise.', price: 80, weight: '470 ml', rating: 4.7, sold: 1000, image: require('../../assets/images/img-placeholder.png'), category: 'Condiments' },
    { id: 9003, name: 'Soy Sauce', description: 'Rich soy sauce.', price: 40, weight: '1 L', rating: 4.6, sold: 1500, image: require('../../assets/images/img-placeholder.png'), category: 'Condiments' },
    { id: 9004, name: 'Vinegar', description: 'Natural vinegar.', price: 35, weight: '1 L', rating: 4.5, sold: 800, image: require('../../assets/images/img-placeholder.png'), category: 'Condiments' },
    { id: 9005, name: 'Hot Sauce', description: 'Spicy hot sauce.', price: 70, weight: '200 ml', rating: 4.4, sold: 600, image: require('../../assets/images/img-placeholder.png'), category: 'Condiments' },
    { id: 9006, name: 'Barbecue Sauce', description: 'Sweet and tangy BBQ sauce.', price: 90, weight: '500 ml', rating: 4.3, sold: 500, image: require('../../assets/images/img-placeholder.png'), category: 'Condiments' },

    // snacks
    { id: 10001, name: 'Potato Chips', description: 'Crispy potato chips.', price: 50, weight: '150 g', rating: 4.8, sold: 1400, image: require('../../assets/images/img-placeholder.png'), category: 'Snacks' },
    { id: 10002, name: 'Chocolate Bar', description: 'Smooth milk chocolate.', price: 80, weight: '100 g', rating: 4.7, sold: 1200, image: require('../../assets/images/img-placeholder.png'), category: 'Snacks' },
    { id: 10003, name: 'Popcorn', description: 'Buttery microwave popcorn.', price: 45, weight: '3 bags', rating: 4.6, sold: 1000, image: require('../../assets/images/img-placeholder.png'), category: 'Snacks' },
    { id: 10004, name: 'Cookies', description: 'Fresh baked cookies.', price: 90, weight: '300 g', rating: 4.5, sold: 900, image: require('../../assets/images/img-placeholder.png'), category: 'Snacks' },
    { id: 10005, name: 'Gummy Bears', description: 'Sweet gummy candies.', price: 60, weight: '200 g', rating: 4.4, sold: 800, image: require('../../assets/images/img-placeholder.png'), category: 'Snacks' },
    { id: 10006, name: 'Pretzels', description: 'Crunchy salted pretzels.', price: 70, weight: '250 g', rating: 4.3, sold: 600, image: require('../../assets/images/img-placeholder.png'), category: 'Snacks' },

    // baked goods
    { id: 11001, name: 'White Bread', description: 'Soft and fluffy white bread.', price: 55, weight: '400 g', rating: 4.6, sold: 1300, image: require('../../assets/images/img-placeholder.png'), category: 'Baked' },
    { id: 11002, name: 'Whole Wheat Bread', description: 'Healthy whole wheat bread.', price: 65, weight: '400 g', rating: 4.8, sold: 900, image: require('../../assets/images/img-placeholder.png'), category: 'Baked' },
    { id: 11003, name: 'Croissant', description: 'Flaky butter croissant.', price: 45, weight: '1 pc', rating: 4.7, sold: 600, image: require('../../assets/images/img-placeholder.png'), category: 'Baked' },
    { id: 11004, name: 'Pandesal', description: 'Classic Filipino breakfast bread.', price: 30, weight: '6 pcs', rating: 4.9, sold: 1500, image: require('../../assets/images/img-placeholder.png'), category: 'Baked' },
    { id: 11005, name: 'Muffins', description: 'Moist and sweet muffins.', price: 75, weight: '2 pcs', rating: 4.4, sold: 700, image: require('../../assets/images/img-placeholder.png'), category: 'Baked' },
    { id: 11006, name: 'Garlic Bread', description: 'Toasted garlic-flavored bread.', price: 60, weight: '250 g', rating: 4.5, sold: 500, image: require('../../assets/images/img-placeholder.png'), category: 'Baked' },

    // grain
    { id: 12001, name: 'White Rice', description: 'Premium long-grain white rice.', price: 50, weight: '1 Kg', rating: 4.8, sold: 2500, image: require('../../assets/images/img-placeholder.png'), category: 'Grains' },
    { id: 12002, name: 'Brown Rice', description: 'Healthy whole grain brown rice.', price: 70, weight: '1 Kg', rating: 4.7, sold: 1200, image: require('../../assets/images/img-placeholder.png'), category: 'Grains' },
    { id: 12003, name: 'Quinoa', description: 'High-protein quinoa grains.', price: 150, weight: '500 g', rating: 4.6, sold: 600, image: require('../../assets/images/img-placeholder.png'), category: 'Grains' },
    { id: 12004, name: 'Oatmeal', description: 'Rolled oats for a healthy breakfast.', price: 90, weight: '500 g', rating: 4.5, sold: 900, image: require('../../assets/images/img-placeholder.png'), category: 'Grains' },
    { id: 12005, name: 'Cornmeal', description: 'Fine ground cornmeal.', price: 80, weight: '500 g', rating: 4.4, sold: 500, image: require('../../assets/images/img-placeholder.png'), category: 'Grains' },
    { id: 12006, name: 'Barley', description: 'Whole grain barley.', price: 100, weight: '1 Kg', rating: 4.3, sold: 400, image: require('../../assets/images/img-placeholder.png'), category: 'Grains' },

    // hygiene
    { id: 13001, name: 'Shampoo', description: 'Refreshing hair shampoo.', price: 180, weight: '400 ml', rating: 4.8, sold: 1000, image: require('../../assets/images/img-placeholder.png'), category: 'Hygiene' },
    { id: 13002, name: 'Body Soap', description: 'Moisturizing body soap.', price: 70, weight: '135 g', rating: 4.7, sold: 900, image: require('../../assets/images/img-placeholder.png'), category: 'Hygiene' },
    { id: 13003, name: 'Toothpaste', description: 'Whitening toothpaste.', price: 90, weight: '140 g', rating: 4.6, sold: 1100, image: require('../../assets/images/img-placeholder.png'), category: 'Hygiene' },
    { id: 13004, name: 'Mouthwash', description: 'Fresh mint mouthwash.', price: 150, weight: '500 ml', rating: 4.5, sold: 600, image: require('../../assets/images/img-placeholder.png'), category: 'Hygiene' },
    { id: 13005, name: 'Deodorant', description: 'Long-lasting deodorant.', price: 100, weight: '50 ml', rating: 4.4, sold: 700, image: require('../../assets/images/img-placeholder.png'), category: 'Hygiene' },
    { id: 13006, name: 'Facial Cleanser', description: 'Gentle facial cleanser.', price: 200, weight: '150 ml', rating: 4.3, sold: 500, image: require('../../assets/images/img-placeholder.png'), category: 'Hygiene' },

    // household
    { id: 14001, name: 'Laundry Detergent', description: 'Powerful stain remover.', price: 300, weight: '2 Kg', rating: 4.8, sold: 1100, image: require('../../assets/images/img-placeholder.png'), category: 'Household' },
    { id: 14002, name: 'Fabric Softener', description: 'Keeps clothes soft and fresh.', price: 180, weight: '1.5 L', rating: 4.7, sold: 900, image: require('../../assets/images/img-placeholder.png'), category: 'Household' },
    { id: 14003, name: 'Dishwashing Liquid', description: 'Cuts grease effectively.', price: 100, weight: '800 ml', rating: 4.6, sold: 1300, image: require('../../assets/images/img-placeholder.png'), category: 'Household' },
    { id: 14004, name: 'Glass Cleaner', description: 'Streak-free window cleaner.', price: 120, weight: '500 ml', rating: 4.5, sold: 700, image: require('../../assets/images/img-placeholder.png'), category: 'Household' },
    { id: 14005, name: 'Multipurpose Cleaner', description: 'Cleans all surfaces.', price: 200, weight: '1 L', rating: 4.4, sold: 800, image: require('../../assets/images/img-placeholder.png'), category: 'Household' },
    { id: 14006, name: 'Toilet Cleaner', description: 'Kills germs and removes stains.', price: 90, weight: '500 ml', rating: 4.3, sold: 600, image: require('../../assets/images/img-placeholder.png'), category: 'Household' },

    // healthcare
    { id: 15001, name: 'Vitamin C', description: 'Immune support supplement.', price: 250, weight: '100 tablets', rating: 4.8, sold: 900, image: require('../../assets/images/img-placeholder.png'), category: 'Healthcare' },
    { id: 15002, name: 'Pain Reliever', description: 'Fast-acting pain relief.', price: 150, weight: '50 tablets', rating: 4.7, sold: 800, image: require('../../assets/images/img-placeholder.png'), category: 'Healthcare' },
    { id: 15003, name: 'Antacid', description: 'Relieves heartburn quickly.', price: 120, weight: '40 tablets', rating: 4.6, sold: 700, image: require('../../assets/images/img-placeholder.png'), category: 'Healthcare' },
    { id: 15004, name: 'Cough Syrup', description: 'Soothes sore throat and cough.', price: 180, weight: '120 ml', rating: 4.5, sold: 600, image: require('../../assets/images/img-placeholder.png'), category: 'Healthcare' },
    { id: 15005, name: 'Bandages', description: 'Adhesive bandages for wounds.', price: 90, weight: '20 pcs', rating: 4.4, sold: 500, image: require('../../assets/images/img-placeholder.png'), category: 'Healthcare' },
    { id: 15006, name: 'Thermometer', description: 'Digital body thermometer.', price: 350, weight: '1 unit', rating: 4.3, sold: 400, image: require('../../assets/images/img-placeholder.png'), category: 'Healthcare' },

    // baby
    { id: 16001, name: 'Baby Diapers', description: 'Soft and absorbent diapers.', price: 450, weight: '40 pcs', rating: 4.8, sold: 1500, image: require('../../assets/images/img-placeholder.png'), category: 'Baby' },
    { id: 16002, name: 'Baby Wipes', description: 'Gentle cleansing baby wipes.', price: 120, weight: '80 sheets', rating: 4.7, sold: 1300, image: require('../../assets/images/img-placeholder.png'), category: 'Baby' },
    { id: 16003, name: 'Baby Lotion', description: 'Moisturizing baby lotion.', price: 180, weight: '400 ml', rating: 4.6, sold: 900, image: require('../../assets/images/img-placeholder.png'), category: 'Baby' },
    { id: 16004, name: 'Baby Shampoo', description: 'Tear-free baby shampoo.', price: 160, weight: '400 ml', rating: 4.5, sold: 1000, image: require('../../assets/images/img-placeholder.png'), category: 'Baby' },
    { id: 16005, name: 'Baby Powder', description: 'Gentle baby powder.', price: 100, weight: '200 g', rating: 4.4, sold: 800, image: require('../../assets/images/img-placeholder.png'), category: 'Baby' },
    { id: 16006, name: 'Baby Formula', description: 'Nutritious infant formula.', price: 700, weight: '900 g', rating: 4.3, sold: 600, image: require('../../assets/images/img-placeholder.png'), category: 'Baby' },

    // pet
    { id: 17001, name: 'Dog Food', description: 'Nutritious dry dog food.', price: 1200, weight: '10 Kg', rating: 4.8, sold: 1000, image: require('../../assets/images/img-placeholder.png'), category: 'Pet' },
    { id: 17002, name: 'Cat Food', description: 'Tasty dry cat food.', price: 900, weight: '8 Kg', rating: 4.7, sold: 800, image: require('../../assets/images/img-placeholder.png'), category: 'Pet' },
    { id: 17003, name: 'Bird Seeds', description: 'High-quality bird seeds.', price: 300, weight: '2 Kg', rating: 4.6, sold: 600, image: require('../../assets/images/img-placeholder.png'), category: 'Pet' },
    { id: 17004, name: 'Dog Shampoo', description: 'Gentle dog shampoo.', price: 250, weight: '500 ml', rating: 4.5, sold: 700, image: require('../../assets/images/img-placeholder.png'), category: 'Pet' },
    { id: 17005, name: 'Cat Litter', description: 'Odor-control cat litter.', price: 450, weight: '10 Kg', rating: 4.4, sold: 500, image: require('../../assets/images/img-placeholder.png'), category: 'Pet' },
    { id: 17006, name: 'Pet Treats', description: 'Delicious pet treats.', price: 150, weight: '500 g', rating: 4.3, sold: 400, image: require('../../assets/images/img-placeholder.png'), category: 'Pet' },

    // pantry
    { id: 18001, name: 'Cooking Oil', description: 'Pure vegetable oil.', price: 200, weight: '1 L', rating: 4.8, sold: 1300, image: require('../../assets/images/img-placeholder.png'), category: 'Pantry' },
    { id: 18002, name: 'Sugar', description: 'Refined white sugar.', price: 80, weight: '1 Kg', rating: 4.7, sold: 1200, image: require('../../assets/images/img-placeholder.png'), category: 'Pantry' },
    { id: 18003, name: 'Salt', description: 'Iodized cooking salt.', price: 20, weight: '1 Kg', rating: 4.6, sold: 2000, image: require('../../assets/images/img-placeholder.png'), category: 'Pantry' },
    { id: 18004, name: 'All-Purpose Flour', description: 'Versatile flour for baking.', price: 90, weight: '1 Kg', rating: 4.5, sold: 900, image: require('../../assets/images/img-placeholder.png'), category: 'Pantry' },
    { id: 18005, name: 'Pasta', description: 'Durum wheat pasta.', price: 60, weight: '500 g', rating: 4.4, sold: 1000, image: require('../../assets/images/img-placeholder.png'), category: 'Pantry' },
    { id: 18006, name: 'Instant Noodles', description: 'Quick and easy meal.', price: 15, weight: '1 pack', rating: 4.3, sold: 3000, image: require('../../assets/images/img-placeholder.png'), category: 'Pantry' },
];
