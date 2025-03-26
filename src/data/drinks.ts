import { DrinkRecipe } from '../types';

export const drinks: DrinkRecipe[] = [
  {
    id: '1',
    name: 'Mojito',
    ingredients: [
      { name: 'White rum', amount: '2', unit: 'oz' },
      { name: 'Fresh lime juice', amount: '1', unit: 'oz' },
      { name: 'Sugar syrup', amount: '0.75', unit: 'oz' },
      { name: 'Mint leaves', amount: '8-10', unit: 'leaves' },
      { name: 'Soda water', amount: '2', unit: 'oz' }
    ],
    instructions: [
      'Muddle mint leaves with sugar syrup in a glass',
      'Add lime juice and rum',
      'Fill glass with crushed ice',
      'Top with soda water',
      'Garnish with mint sprig'
    ],
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop&q=60',
    category: 'Refreshing'
  },
  {
    id: '2',
    name: 'Old Fashioned',
    ingredients: [
      { name: 'Bourbon', amount: '2', unit: 'oz' },
      { name: 'Sugar cube', amount: '1', unit: 'piece' },
      { name: 'Angostura bitters', amount: '2-3', unit: 'dashes' },
      { name: 'Orange peel', amount: '1', unit: 'piece' }
    ],
    instructions: [
      'Place sugar cube in glass and saturate with bitters',
      'Add a splash of water and muddle',
      'Add bourbon and stir',
      'Add ice cubes and stir until chilled',
      'Garnish with orange peel'
    ],
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&auto=format&fit=crop&q=60',
    category: 'Classic'
  },
  {
    id: '3',
    name: 'Margarita',
    ingredients: [
      { name: 'Tequila', amount: '2', unit: 'oz' },
      { name: 'Triple sec', amount: '1', unit: 'oz' },
      { name: 'Fresh lime juice', amount: '1', unit: 'oz' },
      { name: 'Salt', amount: '1', unit: 'pinch' }
    ],
    instructions: [
      'Rim glass with salt',
      'Combine tequila, triple sec, and lime juice in a shaker with ice',
      'Shake well',
      'Strain into glass',
      'Garnish with lime wheel'
    ],
    image: 'https://images.unsplash.com/photo-1556855810-ac404aa91e85?w=800&auto=format&fit=crop&q=60',
    category: 'Classic'
  },
  {
    id: '4',
    name: 'Negroni',
    ingredients: [
      { name: 'Gin', amount: '1', unit: 'oz' },
      { name: 'Campari', amount: '1', unit: 'oz' },
      { name: 'Sweet vermouth', amount: '1', unit: 'oz' }
    ],
    instructions: [
      'Add all ingredients to a mixing glass with ice',
      'Stir until well-chilled',
      'Strain into a rocks glass over a large ice cube',
      'Garnish with an orange peel'
    ],
    image: 'https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=800&auto=format&fit=crop&q=60',
    category: 'Classic'
  },
  {
    id: '5',
    name: 'Moscow Mule',
    ingredients: [
      { name: 'Vodka', amount: '2', unit: 'oz' },
      { name: 'Ginger beer', amount: '4', unit: 'oz' },
      { name: 'Fresh lime juice', amount: '0.5', unit: 'oz' }
    ],
    instructions: [
      'Fill a copper mug with ice',
      'Add vodka and lime juice',
      'Top with ginger beer',
      'Stir gently',
      'Garnish with lime wheel and mint sprig'
    ],
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=60',
    category: 'Refreshing'
  },
  {
    id: '6',
    name: 'Espresso Martini',
    ingredients: [
      { name: 'Vodka', amount: '2', unit: 'oz' },
      { name: 'Coffee liqueur', amount: '1', unit: 'oz' },
      { name: 'Fresh espresso', amount: '1', unit: 'oz' },
      { name: 'Simple syrup', amount: '0.5', unit: 'oz' }
    ],
    instructions: [
      'Combine all ingredients in a shaker with ice',
      'Shake vigorously until well-chilled',
      'Double strain into a chilled martini glass',
      'Garnish with coffee beans'
    ],
    image: 'https://images.unsplash.com/photo-1576670391698-81458215a5e5?w=800&auto=format&fit=crop&q=60',
    category: 'Modern Classic'
  },
  {
    id: '7',
    name: 'Whiskey Sour',
    ingredients: [
      { name: 'Bourbon', amount: '2', unit: 'oz' },
      { name: 'Fresh lemon juice', amount: '1', unit: 'oz' },
      { name: 'Simple syrup', amount: '0.75', unit: 'oz' },
      { name: 'Egg white', amount: '1', unit: 'piece' }
    ],
    instructions: [
      'Dry shake all ingredients without ice',
      'Add ice and shake again until well-chilled',
      'Strain into a rocks glass over fresh ice',
      'Garnish with orange slice and cherry'
    ],
    image: 'https://images.unsplash.com/photo-1580537922571-ca7180cd700e?w=800&auto=format&fit=crop&q=60',
    category: 'Classic'
  },
  {
    id: '8',
    name: 'Cosmopolitan',
    ingredients: [
      { name: 'Vodka citron', amount: '1.5', unit: 'oz' },
      { name: 'Cranberry juice', amount: '1', unit: 'oz' },
      { name: 'Triple sec', amount: '0.75', unit: 'oz' },
      { name: 'Fresh lime juice', amount: '0.5', unit: 'oz' }
    ],
    instructions: [
      'Combine all ingredients in a shaker with ice',
      'Shake until well-chilled',
      'Strain into a chilled martini glass',
      'Garnish with lime wheel or orange peel'
    ],
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop&q=60',
    category: 'Modern Classic'
  },
  {
    id: '9',
    name: 'Mai Tai',
    ingredients: [
      { name: 'White rum', amount: '1', unit: 'oz' },
      { name: 'Dark rum', amount: '1', unit: 'oz' },
      { name: 'Orange curaçao', amount: '0.5', unit: 'oz' },
      { name: 'Orgeat syrup', amount: '0.5', unit: 'oz' },
      { name: 'Fresh lime juice', amount: '1', unit: 'oz' }
    ],
    instructions: [
      'Shake all ingredients with ice',
      'Strain into a glass filled with crushed ice',
      'Float dark rum on top',
      'Garnish with mint sprig and lime wheel'
    ],
    image: 'https://images.unsplash.com/photo-1549746423-e5fe9cafded8?w=800&auto=format&fit=crop&q=60',
    category: 'Tiki'
  },
  {
    id: '10',
    name: 'Gin & Tonic',
    ingredients: [
      { name: 'Gin', amount: '2', unit: 'oz' },
      { name: 'Tonic water', amount: '4', unit: 'oz' },
      { name: 'Lime wedge', amount: '1', unit: 'piece' }
    ],
    instructions: [
      'Fill a highball glass with ice',
      'Add gin',
      'Top with tonic water',
      'Gently stir',
      'Garnish with lime wedge'
    ],
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop&q=60',
    category: 'Refreshing'
  },
  {
    id: '11',
    name: 'Daiquiri',
    ingredients: [
      { name: 'White rum', amount: '2', unit: 'oz' },
      { name: 'Fresh lime juice', amount: '1', unit: 'oz' },
      { name: 'Simple syrup', amount: '0.75', unit: 'oz' }
    ],
    instructions: [
      'Combine all ingredients in a shaker with ice',
      'Shake until well-chilled',
      'Double strain into a chilled coupe glass',
      'Garnish with lime wheel'
    ],
    image: 'https://plus.unsplash.com/premium_photo-1661380265633-bb1e654df3d7?w=800&auto=format&fit=crop&q=60',
    category: 'Classic'
  },
  {
    id: '12',
    name: 'Manhattan',
    ingredients: [
      { name: 'Rye whiskey', amount: '2', unit: 'oz' },
      { name: 'Sweet vermouth', amount: '1', unit: 'oz' },
      { name: 'Angostura bitters', amount: '2', unit: 'dashes' }
    ],
    instructions: [
      'Stir all ingredients with ice',
      'Strain into a chilled coupe glass',
      'Garnish with cherry'
    ],
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&auto=format&fit=crop&q=60',
    category: 'Classic'
  }
];