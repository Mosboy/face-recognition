import React,{useState, useEffect} from "react";
import "./ImageLinkForm.css"
import upload from "./img/upload.png"
const ImageLinkForm=({onInputChange,onPictureSubmit})=>{
	const [scroll, setScroll] = useState("")
    useEffect(()=>{
    	const a = document.querySelector("body")
    	setScroll(a.scrollHeight)
    	a.scrollTop = scroll
    },[window.scroll])
	return(
			<div className="get_img">
			  <p style={{fontStyle:"italic"}}>This Magic Brain will detect faces in your pictures.Give it a try by passing any url of any online image that have faces <em>(for instance,copy this image url into the input box: <strong> https://www.taylorherring.com/wp-content/uploads/2015/03/The-Archetypal-Faces-of-Beauty.jpg)</strong></em>.
			  </p>
			  <div className="inp_but">
			    <input type="text" placeholder="Enter your image url here" onChange={onInputChange}/>
			    <button onClick={onPictureSubmit}>Detect</button>
			  {/*  <label for="face"><img src={upload} alt=" "/><em>Browse</em></label><input type="file" name="faceimage" id="face" accept="image/*" onChange={onInputChange}/>*/}
			  </div>
			</div>
		)
}
export default ImageLinkForm;