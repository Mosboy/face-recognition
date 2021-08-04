import React from "react";
import "./FaceRecognitionApp.css";
class FaceRecognition extends React.Component{
	constructor(){
		super();
	}
	boundRef=React.createRef();
	render(){
		const{imageUrl,box}=this.props;
	return(
		<div className="imagebound" style={{width:"300px", margin:"auto"}}>
		 <div style={{position:"absolute",marginTop:"2px",margin:'auto'}}>
		  <img id="inputimage"  ref={this.boundRef} alt="" src={imageUrl} width="300px" height="auto"/>
		  
		    {
		  Object.keys(box).map((boxes,i)=>{
		  	if(this.boundRef.current){
		  		var {width,height}=this.boundRef.current;
                width=parseInt(width);height=parseInt(height);
			    return <div  className="bounding-box" 
				         style={{
				         	   top:box[i].top_row*height,
						       right:width-(box[i].right_col*width),
						       bottom:height-(box[i].bottom_row*height),
						       left:box[i].left_col*width
						   }}
						    >
			          </div>
		}
	})
}
		  </div>
		 </div>
		)
}}
export default FaceRecognition;