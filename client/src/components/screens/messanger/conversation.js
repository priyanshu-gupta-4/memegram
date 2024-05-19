import React, { useEffect, useState, useContext } from 'react';
import './conversation.css';
import { UserContext } from '../../App';

export default function Conversation({ conversation }) {
  const [user, setUser] = useState(null);
  const { state } = useContext(UserContext);

  useEffect(() => {
    const friendId = conversation.members.find(m => m !== state._id);
    fetch('/profile/' + friendId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        setUser(result.user);
      })
      .catch(error => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  return (
    <div>
      {user ? (
        <div className='conversation'>
          <img className='conversationImg' src={user.pic} alt={user.name} />
          <span className='conversationName'>{user.name}</span>
        </div>
      ) : <div>Loading...</div>}
    </div>
  );
}
