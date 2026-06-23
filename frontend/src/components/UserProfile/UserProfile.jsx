import React from 'react'
import './UserProfile.css'
const UserProfile = ({user}) => {

    const initials = user.name.split(' ')
                        .map(word=>word[0])
                        .join('')
                        .slice(0,2)
                        .toUpperCase();

  return (
    <div className="profile-container">
        <button className="user-avatar">{initials}</button>
        </div>
  )
}

export default UserProfile