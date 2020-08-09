import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import logo from './logo.svg';
import { UserProfileProvider } from './providers/UserProfileProvider';
import ApplicationViews from './components/ApplicationViews';
import Header from './components/Header';
import { RecipeProvider } from './providers/RecipeProvider';
import { UserRecipeProvider } from './providers/UserRecipeProvider';
import { FoodPantryProvider } from './providers/FoodPantryProvider';
import { FoodProvider } from './providers/FoodProvider';
import { RecipeFoodProvider } from './providers/RecipeFoodProvider';
import { CategoryProvider } from './providers/CategoryProvider';


function App() {
  return (
    <div className="App">
      <Router>
        <UserProfileProvider>
          <RecipeProvider >
            <UserRecipeProvider>
              <FoodProvider>
                <CategoryProvider>
                  <RecipeFoodProvider>
                    <FoodPantryProvider>
                      <Header />
                      <ApplicationViews />
                    </FoodPantryProvider>
                  </RecipeFoodProvider>
                </CategoryProvider>
              </FoodProvider>
            </UserRecipeProvider>
          </RecipeProvider>
        </UserProfileProvider>
      </Router>

    </div>
  );
}

export default App;
