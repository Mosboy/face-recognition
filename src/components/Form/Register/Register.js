 import React from "react";
import "./form.css";
import  FlashMessage from "./FlashMessage/FlashMessage";
import eyes from "../image"
class Register extends React.Component{
	constructor(props){
		super();
		this.state={
			email:"",
			password:"",
			name:"",
			username:"",
			note:"",
			displayError:"",
			eye:eyes[0]
		}
	}
	passwordText=React.createRef();
	onNameChange=(event)=>{
		this.setState({name:event.target.value})
	}
	onEmailChange=(event)=>{
		this.setState({email:event.target.value})
	}
	onPasswordChange=(event)=>{
		this.setState({password:event.target.value})
	}
    onUserNameChange=(event)=>{
    	this.setState({username:event.target.value})
    }
	onSubmitSignIn=()=>{
		fetch("https://mosboyfacerecognition.herokuapp.com/register",{
			method:"post",
			headers:{"Content-Type":"application/json"},

			body:JSON.stringify({
				name:this.state.name,
				email:this.state.email, 
				password:this.state.password,
				username:this.state.username
			})
		})
		 .then(response=>response.json())//getting the response status that was sent from the server as soon at it receive the post request object
		 .then(user=>{
	        if(user.message==="ok"){//if the response is succesfully returned in from the server and it content is ok, it will pass the below function
	        	this.props.loadUser(user)//passing all the response to a function in app.js to update a state
	        	this.props.onRouteChange("home");
	         }else{
	         	this.setState({note:user.message})//passing the message object that was sent from the server
	         	this.setState({displayError:"block"})//this will make the error pops up again after its have removed;
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
		console.log(this.state.body)
	return(
		<article>
 			<main className="main">
 			<FlashMessage note={this.state.note} displayError={this.state.displayError} cleanError={this.onCleanError}/>
 			<div className="form">
 			  <fieldset id="sign_up">
 			   <legend className="legend">Register</legend>
 			   <div className="name"> 
 			     <label className="label_1" htmlFor="name">Fullname</label>
 			     <input 
 			       type="text" 
 			       name="name" 
 			       id="name"
 			       
 			       onChange={this.onNameChange}/>
 			   </div>   
 			    <div className="email"> 
 			     <label className="label_1" htmlFor="email-address">Email</label>
 			     <input 
 			       type="email" 
 			       name="email" 
 			       id="email-address"
 			       onChange={this.onEmailChange}/>
 			   </div>   
 			   <div className="password">
 			     <label class="label_2" htmlFor="password">Password</label>
 			     <span>
 			     <input 
 			        type="password" 
 			        name="password" 
 			        id="password"
 			        ref={this.passwordText}
 			        onChange={this.onPasswordChange}/>
 			        <img
 			         alt="eyes" 
 			         src={this.state.eye}
 			         onClick={this.changePasswordToText}/>
 			     </span>
 			   </div>

 			    <div className="password">
 			     <label class="label_2" htmlFor="userName">username</label>

 			     <input 
 			        type="text" 
 			        name="username" 
 			        id="username"
 			        placeholder="your username"
 			        onChange={this.onUserNameChange}/>
 			   </div>
 			   </fieldset>
 			   <div className="sign-in">
 			     <input 
 			       type="submit" 
 			       class="submit" 
 			       value="Register"
 			       onClick={this.onSubmitSignIn}
 			      />
 			   </div>
 			</div>
 		   </main> 
         </article>
		)}
}
export default Register;                 