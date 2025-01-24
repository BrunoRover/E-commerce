import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaBuilding, FaCity, FaMapMarkerAlt, FaEdit } from 'react-icons/fa';
import LogoutButton from '../Layout/LogoutButton';

interface UserInfoProps {
  user: any;
  toggleEdit: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, toggleEdit }) => {
  return (
    <div className="mt-4 bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto text-center">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-700">Detalhes do Perfil</h3>
      </div>
      
      <form className="space-y-6">
        <div className="flex justify-center items-center space-x-6">
          <div className="flex items-center w-1/2">
            <FaUser className="text-gray-600 mr-2" />
            <input
              type="text"
              value={user?.name || 'N/A'}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex items-center w-1/2">
            <FaEnvelope className="text-gray-600 mr-2" />
            <input
              type="text"
              value={user?.email || 'N/A'}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-center items-center space-x-6">
          <div className="flex items-center w-1/2">
            <FaPhone className="text-gray-600 mr-2" />
            <input
              type="text"
              value={user?.phone || 'N/A'}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex items-center w-1/2">
            <FaHome className="text-gray-600 mr-2" />
            <input
              type="text"
              value={user?.street || 'N/A'}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-center items-center space-x-6">
          <div className="flex items-center w-1/2">
            <FaBuilding className="text-gray-600 mr-2" />
            <input
              type="text"
              value={user?.apartment || 'N/A'}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex items-center w-1/2">
            <FaCity className="text-gray-600 mr-2" />
            <input
              type="text"
              value={user?.city || 'N/A'}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-center items-center space-x-6">
          <div className="flex items-center w-1/2">
            <FaMapMarkerAlt className="text-gray-600 mr-2" />
            <input
              type="text"
              value={user?.zip || 'N/A'}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={toggleEdit}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          >
            Editar
          </button>
          <div className="">
            <LogoutButton />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
