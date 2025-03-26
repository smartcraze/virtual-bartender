export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface DrinkRecipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  instructions: string[];
  image: string;
  category: string;
}