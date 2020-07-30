import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import logo from './logo.svg';
import { UserProfileProvider } from './providers/UserProfileProvider';
import ApplicationViews from './components/ApplicationViews';
import Header from './components/Header';
import { RecipeProvider } from './providers/RecipeProvider';

function App() {
  return (
    <div className="App">
      <Router>
        <UserProfileProvider>
          <RecipeProvider >
            <Header />
            <ApplicationViews />
          </RecipeProvider>
        </UserProfileProvider>
      </Router>

    </div>
  );
}

export default App;
