import React from 'react';

interface UserFormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: (e: React.FormEvent) => void;
  toggleEdit: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ formData, handleChange, handleSave, toggleEdit }) => {
  return (
    <form className="mt-4 bg-white p-6 rounded-lg shadow-md" onSubmit={handleSave}>
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Editar Perfil</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['name', 'email', 'phone', 'street', 'apartment', 'city', 'zip'].map((field) => (
          <div key={field}>
            <label className="block text-gray-700 font-medium mb-1" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              type="text"
              value={formData?.[field] || ''}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          onClick={toggleEdit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default UserForm;
