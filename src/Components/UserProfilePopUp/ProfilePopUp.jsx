import React, { useState } from "react";
import { FaEdit, FaUserEdit } from "react-icons/fa";

const EditProfilePopup = ({ togglePopup }) => {
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    address: "123 Main Street, City, Country",
    profilePicture: "https://via.placeholder.com/100",
  });

  const [newUserData, setNewUserData] = useState({ ...userData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewUserData((prev) => ({
          ...prev,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    setUserData({ ...newUserData });
    togglePopup(); // Close popup after saving
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="con flex items-center px-6 py-3">
          <div className=" w-full flex justify-between   items-center gap-2">
           
            <h2 className="text-lg font-bold">Edit Profile</h2>
            <FaEdit className="text-2xl hover:text-blue-600" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={newUserData.profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full border"
              />
              <label
                htmlFor="profilePicture"
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 w-5 h-5 rounded-full cursor-pointer"
              >
                <FaUserEdit />
              </label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={newUserData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={newUserData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={newUserData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={newUserData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              value={newUserData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={togglePopup}
            className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            className="py-2 px-4 bg-green-500 text-white rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePopup;
