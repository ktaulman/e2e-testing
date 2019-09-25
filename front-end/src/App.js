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
          name:'',
          email:'',
          password:'',
          aboutMe:'',
          originalEmail:''
      },
      updateMessage:''
    }
    //bind functions to component
    this.handleEmailInput=this.handleEmailInput.bind(this);
    this.handlePasswordInput=this.handlePasswordInput.bind(this);
    this.handleLogin=this.handleLogin.bind(this);
    this.handleUpdateInfo=this.handleUpdateInfo.bind(this);
    this.handleUpdateButton=this.handleUpdateButton.bind(this);
    this.handleSignOut=this.handleSignOut.bind(this);
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
      let inputName=e.target.name;
      let inputValue=e.target.value;
      let stateCopy=this.state;
      stateCopy.updatePrefs[inputName]=inputValue;
      stateCopy.updatePrefs[`originalEmail`]=this.state.emailInput;
      this.setState({stateCopy})
   }

   handleUpdateButton(e){
     e.preventDefault();
     const body= this.state.updatePrefs;
     for(let key in body){
       if(body[key]===''){
         this.setState({updateMessage:"Empty Fields Can't Update"})
         return;
       }
     }
     axios.put('http://localhost:4000/api/update',body)
      .then(this.setState({updateMessage:'Profile Updated'}))
      .catch(err=>console.log(err))
   }
   handleSignOut(){
     console.log('handle signout clicked')
     this.setState({isLoggedIn:false})
     let defaultState={
      isLoggedIn:false,
      emailInput:'',
      passwordInput:'',
      user:{},
      errorMessage:'',
      updatePrefs:{
          name:'',
          email:'',
          password:'',
          aboutMe:'',
          originalEmail:''
      },
      updateMessage:''
    }
    this.setState(defaultState)
   }
  //rendering
  render(){
    console.log(this.state);
    return (
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
            <input data-cy='user__nameInput' defaultValue={this.state.user.name} name='name' onChange={this.handleUpdateInfo}></input>
            <br/>

            <label data-cy="user__label"> Email:</label>
            <input data-cy='user__emailInput' defaultValue={this.state.user.email} name='email' onChange={this.handleUpdateInfo}></input>
            <br/>

            <label data-cy="user__label">Password:</label>
            <input type='password' data-cy='user__passwordInput' defaultValue={this.state.user.password} name='password' onChange={this.handleUpdateInfo}></input>
            <br/>

            <label data-cy="user__label" >About Me:</label>
            <textarea data-cy='user__aboutMeInput' name='aboutMe' defaultValue={this.state.user.aboutMe} onChange={this.handleUpdateInfo}></textarea>   
            <br/>

            <button data-cy="user__updateButton" onClick={this.handleUpdateButton}>Update Information</button>
          </form>
          <div data-cy="user__status">{this.state.updateMessage?this.state.updateMessage:null}</div>
          </div>
          <button data-cy="user__signout" onClick={()=>this.handleSignOut()}>Sign-Out</button>
      </div>
      }
    </div>
  );
}
}
export default App;
