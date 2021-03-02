import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import FormBuilder from './Components/FormBuilder'

//This is only a single page application.
const App = () =>(
  <Router>
    <Route path="/" component={FormBuilder} />
  </Router>
)

export default App;
