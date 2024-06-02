import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ModelView from './components/ModelView';

function App() {
    return (
        <Router>
            <div className="App">                
              <Routes>
                  <Route path="/" element={<ModelView />} exact /> 
              </Routes>
            </div>
        </Router>
    );
}

export default App;
