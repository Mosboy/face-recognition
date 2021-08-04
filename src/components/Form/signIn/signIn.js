import React from "react";
import "./form.css";
import  FlashMessage from "./FlashMessage/FlashMessage";
import eyes from "../image"
class SignIn extends React.Component{
	constructor(props){
		super();
		this.state={
			signInEmail:"",
			signInPassword:"",
			note:"",
			displayError:"",
			eye:eyes[0]
		}
	}
	passwordText=React.createRef();
	onEmailChange=(event)=>{
		this.setState({signInEmail:event.target.value})
	}
	onPasswordChange=(event)=>{
		this.setState({signInPassword:event.target.value})
	}
	onSubmitSignIn=()=>{
		console.log(eyes)
		fetch("https://mosboyfacerecognition.herokuapp.com/signin",{
			method:"post",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify({
				email:this.state.signInEmail, 
				password:this.state.signInPassword
			})
		})
		 .then(response=>response.json())//getting the response text that was sent from the server as soon at it receive the post request object from above fetch sign in
		 .then(response=>{
	          if(response.message==="ok"){//if the response is ok then the page will go to our dashboard of route home
	          	this.props.loadUser(response)//sending our response data to the function to be used to pass to other components
	        	this.props.onRouteChange("home")
	          }else{
                  this.setState({note:response.message})//passing the the response.message data to state "note"
                  this.setState({displayError:"block"})
	          } 
		 	})
		
	} 
	onCleanError=()=>{//this will help to clean the error message that pops up in the register when the function runs
		this.setState({displayError:"none"})
	}
    
    changePasswordToText=()=>{
		if(this.passwordText.current.type=="password"){
			this.passwordText.current.type="text"
			this.setState({eye:eyes[1]})
		}else{
			this.passwordText.current.type="password"
			this.setState({eye:eyes[0]})
		}
	}

	render(){
		const {onRouteChange}=this.props;
		return(
			<article>
	 			<main className="main">
	 			<FlashMessage note={this.state.note} displayError={this.state.displayError} cleanError={this.onCleanError}/>
	 			<div className="form">
	 			  <fieldset id="sign_up">
	 			   <legend className="legend">Sign In</legend>
	 			   <div className="email"> 
	 			     <label className="label_1" htmlFor="email-address">Email</label>
	 			     <input 
		 			     type="email" 
		 			     name="email-address" 
		 			     id="email-address"
		 			     onChange={this.onEmailChange}
		 			   />
	 			   </div>   
	 			   <div class="password">
	 			     <label class="label_2" htmlFor="password">Password</label>
	 			     <span>
	 			     <input 
	 			       type="password" 
	 			       name="password" 
	 			       id="password"
	 			       ref={this.passwordText}
	 			       onChange={this.onPasswordChange}
	 			       />
	 			       <img alt="eyes" src={this.state.eye} onClick={this.changePasswordToText}/>
	 			       </span>
	 			   </div>
	 			   </fieldset>
	 			   <div class="sign-in">
	 			     <input 
	 			       type="submit"   
	 			       className="submit" 
	 			       value="sign in"
	 			       onClick={this.onSubmitSignIn}
	 			      />
	 			   </div>
	 			   <div className="register">
	 			     <p onClick={()=>onRouteChange("register")} className="an_reg">Register</p>
	 			   </div>
	 			</div>
	 		   </main> 
	         </article>
			)
}}
export default SignIn;                                