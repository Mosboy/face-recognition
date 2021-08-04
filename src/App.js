import React,{Component} from 'react';
import Particles from "react-particles-js"
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Dashboard/Logo/Logo";
import ImageLinkform from "./components/Dashboard/ImageLinkForm/ImageLinkForm";
import SignIn from "./components/Form/signIn/signIn";
import Register from "./components/Form/Register/Register"
import Rank from "./components/Dashboard/Rank/Rank";
import FaceRecognition from "./components/Dashboard/FaceRecognitionApp/FaceRecognitionApp";
import Clarifai from "clarifai";

const app = new Clarifai.App({
 apiKey: "c4bd43fd99e84f7183f3c550520be088"
});
//mosboyfacerecoginition.herokuapp.com
const particleOptions = {
	particles:{
		number: {
			value : 70,
			density: {
				enable: true,
				value_area:300
		    }
		}
	}
}
const particleOptions2 = {
	particles:{
		number: {
			value : 70,
			density: {
				enable: true,
				value_area:800
		    }
		}
	}
}
class App extends Component{
	constructor(){
		super();

		this.state={
			input:"",//input of the user concerning the url of the image
			imageUrl:"",//getting the url of the image from the input
			box:{},//getting all the point or position of detected face;
			route:"signIn",//getting the route of the page of the image
			IsSignedIn:false,
			scrolldown:627,
			user:{
				id:"",
				username:"",
				entries:""
			} 
		}
	}
	scrollRef = React.createRef()
	componentDidMount = () =>{
		//syncing the state to localStorage, so when page reloads, the data will not be lost
		let getuser = localStorage.getItem("user")
		this.setState({user:JSON.parse(getuser)})

 		let getroute = localStorage.getItem("route")
 		this.setState({route:getroute})

 		if(getroute==="home"){
       	this.setState({isSignedIn:true})
       }
       else if(getroute==="signIn"){ 
       	this.setState({isSignedIn:false})
       }
	}
   componentDidUpdate = () =>{

			// this.setState({scrolldown:this.scrollRef.current.scrollHeight})
             if(this.state.scrolldown != undefined) this.scrollRef.current.scrollTop = this.state.scrolldown

   }
    loadUser=(data)=>{
    	this.setState({user:{//passing the register value to  the state user
    		id:data.id,
    		username:data.username,
    		entries:data.entries
    	}})
    	//setting user state to localstorage to prevent  the data from lost
    	localStorage.setItem("user",JSON.stringify(this.state.user))
    }
	calculateFaceLocation=(data)=>{//this helps return only the bounding box of the face image
         const clarifaiFace=[];
          for(let i=0; i<data.outputs[0].data.regions.length; i++){
         	clarifaiFace.push(data.outputs[0].data.regions[i].region_info.bounding_box);//passing all the bounding box in one array
         }  
          return clarifaiFace 
	}
   displayFaceBox=(boxes)=>{
   	this.setState({box:boxes})//setting the state of box to the return object of the calculateFaceLocation
   } 
	onInputChange = (event)=>{//this helps to set the input state to the value inputed immediately 
		this.setState({input:event.target.value})
		/*if(event.target.files){
			console.log("moses is a boy")
			await this.setState({input:window.URL.createObjectURL(event.target.files[0])})
			if(this.state.input !== ""){this.onPictureSubmit()}
		}
		else{this.setState({input:event.target.value})}*/
	}
	onRouteChange=(newroute)=>{
       // this function helps to tell the page what to display whether sign In, register or home page
       localStorage.setItem("route", newroute)// the o
       let getroute=localStorage.getItem("route")
       this.setState({route:newroute})
       this.setState({box:""})//this will refresh the bounding box to nothing, when the route is changed, so it when any user signs in, it will not display the previous user data(picture and bounding box)
       if(getroute==="home"){
       	this.setState({isSignedIn:true})
       }
       else if(getroute==="signIn"){ 
       	this.setState({isSignedIn:false})
       }
	}
	onPictureSubmit=(event)=>{
			this.setState({imageUrl:this.state.input})//setting the imageUrl to the value that was inputed;
			const a = document.querySelector("body")

			fetch("https://mosboyfacerecognition.herokuapp.com/bounding_box",{
				method:"post",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify({
					image_url:this.state.input
				})
			}).then(response=>response.json())
			    .then(response=>{
			    	console.log(response)
			    	if(response){

                              fetch("https://mosboyfacerecognition.herokuapp.com/image",{
                                //if the response is true form clarifai, we will b
			    				method:"put",
			    				headers:{"Content-type": "application/json"},
			    				body:JSON.stringify({
			    					id:this.state.user.id,
			    					entries:this.state.user.entries
			    				  })
			    			    })
			    			    .then(response=>response.json())//getting the response in json form that was gotten from the server
			    			    .then(count=>{
			    			    	this.setState(Object.assign(this.state.user,{entries:count}))//setting the enteries to the response(how many times the image is passed to clarifai that was sent to the from the server
			    			    	localStorage.setItem("user",JSON.stringify(this.state.user))
			    			    })
			    			this.displayFaceBox(this.calculateFaceLocation(response));
			    	}
			    	
			    })//passing the data that was gotten from clarifai api to the function
			    .catch(err=>console.log(err))
	}
	render(){ 
		  const {isSignedIn, imageUrl, route, box}=this.state;
		  	return (
		      <div className="App" ref={this.scrollRef}>
		        <Particles className="particles"
		          params={particleOptions}/>
		           <Navigation onRouteChange={this.onRouteChange} 
		                       isSignedIn={isSignedIn}/>
		          { this.state.route==="home"
		             ?          <div> 
						           <Logo name={this.state.user.username}/>
						           <Rank name={this.state.user.username} entries={this.state.user.entries}/>
						           <ImageLinkform 
						                onInputChange={this.onInputChange} 
						                onPictureSubmit={this.onPictureSubmit}
						            />
						         {
						         	(imageUrl)
						         	? <FaceRecognition box={box} imageUrl={imageUrl}/>
						         	: ""
						         }
				                </div>    
				     :         (
				     	         this.state.route==="signIn"
						             	  ?  <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
						             	  :  <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
				             	)        
				  }
				   <Particles className="particles2"
		          params={particleOptions2}/>
		      </div>
		    )
		  }
}
export default App;