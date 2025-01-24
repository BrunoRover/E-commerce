import React from 'react';
import { FaEdit } from 'react-icons/fa';

interface UserAvatarProps {
  avatar: string;
  name: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ avatar, name }) => {
  return (
    <div className="relative">
      <img
        src={avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
        alt={name}
        className="w-32 h-32 rounded-full border-4 border-blue-500 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
      />
    </div>
  );
};

export default UserAvatar;
