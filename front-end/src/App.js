import React from 'react';
import logo from './logo.svg';
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

        <button type='submit' htmlFor="form" data-cy="form__submit">Submit</button>
      </form>
    </div>
  );
}
}
export default App;
