import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import AlbumList from './AlbumList';
import PhotoList from './PhotoList';
import './App.css';

const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  function handleAlbumButtonClick(userId) {
    setSelectedUserId(userId);
    setSelectedAlbumId(null);
  }

  function handlePhotosButtonClick(albumId) {
    setSelectedAlbumId(albumId);
  }

  return (
    <div className='wrapper'>
      <UserList handleAlbumButtonClick={handleAlbumButtonClick} users={users} />
      {selectedUserId && (
        <AlbumList
          userId={selectedUserId.id}
          userName={selectedUserId?.name}
          handlePhotosButtonClick={handlePhotosButtonClick}
        />
      )}
      {selectedAlbumId && <PhotoList albumId={selectedAlbumId} userName={selectedUserId?.name} />}
    </div>
  );
};

export default App;
