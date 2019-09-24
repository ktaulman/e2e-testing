import React from 'react';
import logo from './logo.svg';
import {postData} from './lib/service';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isLoggedIn:false,
      emailInput:'',
      passwordInput:''
    }
    //bind functions to component
    this.handleEmailInput=this.handleEmailInput.bind(this);
    this.handlePasswordInput=this.handlePasswordInput.bind(this);
    this.handleLogin=this.handleLogin.bind(this);
  
  }

  handleEmailInput(e){
    this.setState({emailInput:e.target.value})
  }
  handlePasswordInput(e){
    this.setState({passwordInput:e.target.value})
  }

  handleLogin(e){
    e.preventDefault();
    //check for email && password OR if both empty
    if(!this.state.passwordInput&&!this.state.emailInput){
      this.setState({errorMessage:'email and password are empty'})
    }
    else if(!this.state.emailInput&&this.state.passwordInput){
      this.setState({errorMessage:'email is empty'})
    }
    else if(this.state.emailInput&&!this.state.passwordInput){
      this.setState({errorMessage:'password is empty'})
    }
    //if not post data to an API.
    else{

    }
  }
  render(){return (
    <div className="App">
      <header className="App-header">
        <h1 data-cy='navbar__title'>e2e Testing Site</h1>
        {this.state.isLoggedIn?(<nav data-cy='navbar'>
          <div data-cy='navbar__links'>
            <a data-cy='navbar__favorites' href="./favorites">Favorites</a>
            <a data-cy='navbar__shopping' href='./shopping'>Shopping</a>
            <a data-cy='navbar__account' href='./account'>Account</a>
          </div>
        </nav>):null}
      </header>
      <form data-cy="form" name='form'>
        <label data-cy="form__emailLabel" htmlFor='emailInput'>Email:</label> 
        <input data-cy="form__emailInput" name='emailInput' onChange={this.handleEmailInput}/> 
        
        <label data-cy="form__passwordLabel" htmlFor="passwordInput">Password: </label>
        <input data-cy='form__passwordInput' name='passwordInput' type='password' onChange={this.handlePasswordInput} /> 

        <button type='submit' htmlFor="form" data-cy="form__submit" onClick={this.handleLogin}>Submit</button>
      </form>
      <div data-cy="error__div" id='error__div'>
      {this.state.errorMessage?this.state.errorMessage:null}
      </div>
    </div>
  );
}
}
export default App;
