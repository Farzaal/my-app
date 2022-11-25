import React, {useState, useEffect} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// git merge origin/github-diff-demo
export default function BasicTooltipE1() {

  let [dogImage, setDogImage] = useState(null)

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(data => setDogImage(data.message))
  },[])

  return (
    <div className='tariff'>
      <img src={dogImage} />
    </div>
  );
}