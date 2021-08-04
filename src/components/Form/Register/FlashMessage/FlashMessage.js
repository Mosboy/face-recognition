import React from "react";
import "./FlashMessage.css"
class FlashMessage extends React.Component{
render(){
     const {note,cleanError,displayError}=this.props;
 return (
 	<div>
     {note
     	?
			     (
			     	<div className="alert" style={{display:displayError}}>
				     	<span className="closebtn" onClick={()=>cleanError()}>
				        &times;
					    </span> 
					    <strong>
					     Error!!
				       </strong>
				        <em>{note}</em>
			       </div>
			        )
	    :  
	            ""
     }
     </div>
 	)
}}
export default FlashMessage;