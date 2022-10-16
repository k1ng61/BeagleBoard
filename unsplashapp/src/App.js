import React from 'react'
import { useEffect, useState } from 'react';
import './App.css';
import Navbar from "./components/Navbar"
import { addDoc, collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "./firebaseConfig";
import ImageCard from './components/ImageCard';
import './App.css';



const accessKey = "iVF6ZX5jeVkovW3QkUZtN52QpHuw3XZvD2buNLq27xY";

function App() {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);

  
  
  const addImage = async(p) => {
    const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${p}&client_id=${accessKey}`);
    const data = await response.json();
    const firstimage = data.results[0];

    const img_url = firstimage.links.download;

    const dbref = collection(db, "unsplashimages");
    addDoc(dbref, {
      imageUrl: img_url,
    })
    .then(() => {
      setPrompt('');
    })
    
  };

  useEffect(() => {
    const imagerefs = collection(db, "unsplashimages");
    const q = query(imagerefs);

    

    onSnapshot(q, (snapshot)=>{
      const simages = snapshot.docs.map((doc) =>({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(simages);
    }, [])

  })

  return (
    <div className='App'>
      <Navbar />
      <div className='input-group justify-content-center' style={{padding:"20px"}}>
        <div className='form-outline'>
          <input className='form-control' 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          id='form1'/>

        </div>
        <button className='btn btn-outline-primary' onClick={() => addImage(prompt)}>Post</button>
      </div>
      <div className='container'>
        <div className='row text-center text-lg-start'>
          {images?.length === 0? (
            <h3>No Images</h3>
          ):(
    
            images.map((image) => (
              <ImageCard image={image} />
              ))
          )}
        </div>    
      </div>
    </div>
  );
}

export default App;
