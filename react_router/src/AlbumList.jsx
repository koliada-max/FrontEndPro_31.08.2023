import React, { useState, useEffect } from 'react';

const AlbumList = ({ userId, userName, handlePhotosButtonClick }) => {
  const [albums, setAlbums] = useState([]);

  console.log('userName', userName);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
        );
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, [userId]);

  return (
    <div>
      <h2>Album List for User {userName}</h2>
      <ul>
        {albums.map((album) => {
          console.log("album", album);
          return (
            <li className='list-item' key={album.id}>
              <h4>{album.title}</h4>
              <button onClick={() => handlePhotosButtonClick(album.id)}>
                Photos
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AlbumList;
