import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import logo from './logo.svg';
import { UserProfileProvider } from './providers/UserProfileProvider';
import ApplicationViews from './components/ApplicationViews';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <UserProfileProvider>
          <Header />
          <ApplicationViews />
        </UserProfileProvider>
      </Router>

    </div>
  );
}

export default App;
