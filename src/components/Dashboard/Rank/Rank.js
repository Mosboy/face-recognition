import React from "react";
import "./Rank.css"
const Rank=({name,entries})=>{
	return(
			<div className="rank">  
				 <div className="name"> 
			        {`${name}, your current entry count is ...`}
				 </div>
			     <div className="entries">
			        {entries}
			     </div>
		  </div>
		)
}
export default Rank; 