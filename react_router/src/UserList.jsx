import React from 'react';

const UserList = ({ handleAlbumButtonClick, users }) => {
  
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => {
          return (
          <li className='list-item' key={user.id}>
            <h3>{user.name}</h3>
            <button onClick={() => handleAlbumButtonClick(user)}>Album</button>
          </li>
        )})}
      </ul>
    </div>
  );
};

export default UserList;
