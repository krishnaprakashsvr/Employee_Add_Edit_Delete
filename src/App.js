import React,{Component} from 'react';
import './App.css';
import Home from './Components/Home';
import Employee from './Components/Employee';
import Department from './Components/Department';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Navigation from './Components/Navigation';


class App extends Component {
 
  render() {
       return (    
     <div className='App'>
      
      <h3 className='m-3 d-flex justify-content-center'>
          React JS with Web API
        </h3>
        <h5 className='m-3 d-flex justify-content-center'>
          Employee Management Portal
        </h5>
       <BrowserRouter>
       <Navigation/>
       <Switch>
         <Route path='/Home' component={Home} exact/>
         <Route path='/Employee' component={Employee} />
         <Route path='/Department' component={Department} />
       </Switch>
       </BrowserRouter>
    
     </div>


    );  }}


export default App;
