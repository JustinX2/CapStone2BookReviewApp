import React, {useState, useEffect} from 'react';
import axios from 'axios';

function UserProfile() {
  const [profile, setProfile]=useState(null);
  const [error, setError]=useState(null);

  useEffect(() => {
    const fetchUserProfile=async () => {
      try {
        const response = await axios.get('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to fetch user profile.');
      }
    };
  
    fetchUserProfile();
  }, []);  

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <p><strong>Username:</strong> {profile.username}</p>
    </div>
  );
}

export default UserProfile;
