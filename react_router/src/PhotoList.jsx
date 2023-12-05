import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhotoList = ({ albumId, userName}) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, [albumId]);

  return (
    <div>
      <h2>Photo List for Album User {userName}</h2>
      <ul className='list-photo'>
        {photos.map(photo => {
          return(
          <li className='item-photo' key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
          </li>
        )})}
      </ul>
    </div>
  );
};

export default PhotoList;