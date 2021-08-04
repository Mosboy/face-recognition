import React from "react";
import "./Logo.css"
const Logo=({name})=>{
	return(
       <div className="logoTilt">
          <p className="tilt">{name}</p>
         </div>
		)
}
export default Logo