import React, { useState, useEffect } from 'react';
import { FaUser, FaBriefcase, FaBuilding, FaEdit, FaTimes, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHome, FaCity, FaEnvelopeOpen, FaGlobe, FaShieldAlt } from 'react-icons/fa';
import LogoutButton from '@/components/Layout/LogoutButton';
import EditProfile from './EditProfile';

interface User {
  _id: { $oid: string };
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  street: string;
  apartment: string;
  zip: string;
  city: string;
  country: string;
  avatar?: string;
  jobTitle?: string;
  company?: string;
  activities?: {
    id: number;
    action: string;
    timestamp: string;
  }[];
}
const UserProfileModal = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/create-user"); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const toggleModal = () => setIsOpen(!isOpen);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing && user) {
      setFormData(user); 
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData!,
      [id]: value,
    }));
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData) return;
  
    try {
      const response = await fetch(`/api/create-user?id=${user?._id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user?._id, 
          name: formData.name,
          email: formData.email, 
          phone: formData.phone,
          street: formData.street,
          apartment: formData.apartment,
          zip: formData.zip,
          city: formData.city,
          country: formData.country,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Não foi possível salvar as alterações. Tente novamente.");
    }
  };
  console.log("User ID being sent:", user?._id);


  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans">
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

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={toggleModal}>
          <div
            className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">User Profile</h2>
              <button
                onClick={toggleModal}
                className="text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
                aria-label="Close modal"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {isEditing ? (
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Edit Profile</h3>
                <form className="space-y-4" onSubmit={handleSave}>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="relative">
                      <img
                        src={user.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
                        alt={user.name}
                        className="w-32 h-32 rounded-full border-4 border-blue-500 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                      />
                      <button
                        className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 text-white hover:bg-blue-600 transition duration-300 ease-in-out"
                        aria-label="Edit profile picture"
                      >
                        <FaEdit size={16} />
                      </button>
                    </div>
                    <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData?.name || user.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData?.email || user.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="text"
                        value={formData?.phone || user.phone}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">
                        Street
                      </label>
                      <input
                        id="street"
                        type="text"
                        value={formData?.street || user.street}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apartment">
                        Apartment
                      </label>
                      <input
                        id="apartment"
                        type="text"
                        value={formData?.apartment || user.apartment}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                        City
                      </label>
                      <input
                        id="city"
                        type="text"
                        value={formData?.city || user.city}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip">
                        Zip
                      </label>
                      <input
                        id="zip"
                        type="text"
                        value={formData?.zip || user.zip}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={toggleEdit}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                      aria-label="Cancelar"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                      aria-label="Salvar"
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="mt-4">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="relative">
                    <img
                      src={user.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
                      alt={user.name}
                      className="w-32 h-32 rounded-full border-4 border-blue-500 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                    />
                    <button
                      className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 text-white hover:bg-blue-600 transition duration-300 ease-in-out"
                      aria-label="Edit profile picture"
                    >
                      <FaEdit size={16} />
                    </button>
                  </div>
                  <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-800">{user.name}</h3>
                    {user.jobTitle && (
                      <div className="flex items-center justify-center md:justify-start mt-2 text-gray-600">
                        <FaBriefcase className="mr-2" />
                        <span>{user.jobTitle}</span>
                      </div>
                    )}
                    {user.company && (
                      <div className="flex items-center justify-center md:justify-start mt-1 text-gray-600">
                        <FaBuilding className="mr-2" />
                        <span>{user.company}</span>
                      </div>
                    )}
                    {user.isAdmin && (
                      <div className="flex items-center justify-center md:justify-start mt-1 text-gray-600">
                        <FaShieldAlt className="mr-2" />
                        <span>Admin</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-xl font-semibold text-gray-700 mb-4">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition duration-300 ease-in-out">
                      <div className="flex items-center text-gray-800 font-medium">
                        <FaEnvelope className="mr-2" />
                        <span>{user.email}</span>
                      </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition duration-300 ease-in-out">
                      <div className="flex items-center text-gray-800 font-medium">
                        <FaPhone className="mr-2" />
                        <span>{user.phone}</span>
                      </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition duration-300 ease-in-out">
                      <div className="flex items-center text-gray-800 font-medium">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{user.street}</span>
                      </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition duration-300 ease-in-out">
                      <div className="flex items-center text-gray-800 font-medium">
                        <FaHome className="mr-2" />
                        <span>{user.apartment}</span>
                      </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition duration-300 ease-in-out">
                      <div className="flex items-center text-gray-800 font-medium">
                        <FaCity className="mr-2" />
                        <span>{user.city}</span>
                      </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition duration-300 ease-in-out">
                      <div className="flex items-center text-gray-800 font-medium">
                        <FaEnvelopeOpen className="mr-2" />
                        <span>{user.zip}</span>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            )}

            {!isEditing && (
              <div className="flex justify-between mt-8">
                <button
                  onClick={toggleEdit}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                  aria-label="Edit"
                >
                  Edit
                </button>
                <LogoutButton />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileModal;