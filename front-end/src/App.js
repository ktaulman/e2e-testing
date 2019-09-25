import React from 'react';
import axios from 'axios';
import './App.css';


class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      isLoggedIn:false,
      emailInput:'',
      passwordInput:'',
      user:{},
      errorMessage:'',
      updatePrefs:{

      }
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
      let body={email:this.state.emailInput,password:this.state.passwordInput}
      axios.post('http://localhost:4000/api/login',body)
      .then(response=>{
        this.setState({user:response.data,isLoggedIn:true})
      })
      .catch((err)=>this.setState({errorMessage:'error logging in'}))
      
    }
   
  }
  handleUpdateInfo(e){
    const {name,value}=e.target;
    console.log(name,'Name')
    console.log(value,'Value')
   }

  //rendering
  render(){return (
    <div className="App">
      <header className="App-header">
        <h1 data-cy='navbar__title'>e2e Testing Site</h1>
      </header>

      {!this.state.isLoggedIn?(
        <div>
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
      ):
      <div data-cy="homePage">
          <div>
          <form data-cy="user__form">
            <label data-cy="user__label"> Name:</label>
            <input data-cy='user__nameInput' defaultValue={this.state.user.name} name='name' ></input>
            <br/>
            <label data-cy="user__label"> Email:</label>
            <input data-cy='user__emailInput' defaultValue={this.state.user.email} name='email' ></input>
            <br/>
            <label data-cy="user__label">Password:</label>
            <input type='password' data-cy='user__passwordInput' defaultValue={this.state.user.password} name='password'></input>
            <br/>
            <label data-cy="user__label" >About Me:</label>
            <textarea data-cy='user__aboutMe' name='aboutMe'>{this.state.user.aboutMe}</textarea>   
            <br/>
            <button data-cy="user__update" >Update Information</button>
          </form>
          </div>
          <button data-cy="user__signout">Sign-Out</button>
      </div>
      }
    </div>
  );
}
}
export default App;
