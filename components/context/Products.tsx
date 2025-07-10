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
            'Beverages' | 'Canned' |
            'Dairy' | 'Snacks'
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

];
