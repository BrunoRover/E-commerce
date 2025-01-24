import React, { useState, useEffect } from 'react';
import UserAvatar from './UserAvatar';
import UserForm from './UserForm';
import UserInfo from './UserInfo';
import Modal from './Modal';

interface User {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  street: string;
  apartment: string;
  city: string;
  zip: string;
}

const UserProfileModal = () => {
  
  const [user, setUser] = useState<User | null>(null); 
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/users/user');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setUser(data);
        setFormData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, []);

  const toggleModal = () => setIsOpen(!isOpen);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing && user) setFormData(user);
  };

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { id, value } = e.target;
     setFormData((prevData) => ({
       ...prevData!,
       [id]: value,
     }));
   };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && user) {
      try {
        const response = await fetch(`/api/users/user?id=${user._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!user || !formData) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <button
        onClick={toggleModal}
        className="text-white font-bold alin-center rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
        aria-label="Open user profile"
      >
        <img
          src={user.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
          alt={user.name}
          className="w-12 h-12 rounded-full border-4 border-blue-500 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
        />
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        {isEditing ? (
          <UserForm formData={formData} handleChange={handleChange} handleSave={handleSave} toggleEdit={toggleEdit} />
        ) : (
          <>
            <UserAvatar avatar={user.avatar} name={user.name} />
            <UserInfo user={user} toggleEdit={toggleEdit} />
          </>
        )}
      </Modal>
    </div>
  );
};

export default UserProfileModal;
