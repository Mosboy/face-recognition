import React from "react"

const Navigation=({onRouteChange,isSignedIn})=>{
	return(
		<div>{/*we wrap the below expression in a div for the below expression to work*/}
 { isSignedIn//if signedIn is true, it will, it should display only sign out nav
 	        ?   
				<nav className="nav_sign" style={{display:"flex",justifyContent:"flex-end"}}>
				  		<p 
				  				onClick={()=>onRouteChange("signIn")} 
				  				className="p_signout" 
				  				style={{cursor:"pointer",textDecoration:"underline",padding:"3px",color:"rgba(273,273,273,0.5)"}}>
				  			Sign Out
				  		</p>
				  </nav>

		 	:   //if isSignedIn is false it will display both register and sign in in the nav bar
				<nav className="nav_sign" style={{display:"flex",justifyContent:"flex-end"}}>
				  		<p
				  				onClick={()=>onRouteChange("signIn")} 
				  				className="p_signout" 
				  				style={{cursor:"pointer",textDecoration:"underline",padding:"3px",color:"rgba(273,273,273,0.5)"}}
				  		  >
				  			Sign in
				  		</p>
				  		<p
				  		     onClick={()=>onRouteChange("register")}
				  		     className="p_signout"
				  		     style={{cursor:"pointer",textDecoration:"underline",padding:"3px",color:"rgba(273,273,273,0.5)"}}
				  		     >
				  		     Register
				  		  </p>
				  </nav>
 }
       </div>)
}
export default Navigation;