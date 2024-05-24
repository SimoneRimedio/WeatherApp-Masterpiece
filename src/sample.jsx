import React, { useState } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      {/* Sidebar */}
      <div className="bg-gray-800 w-64 h-screen fixed">
        <div className="py-4 px-6">
          <img src="/cryptohub-logo.svg" alt="CryptoHub Logo" className="h-8" />
        </div>
        <ul className="mt-6">
          <li
            className={`py-2 px-6 cursor-pointer ${
              activeTab === "Dashboard" ? "bg-gray-700" : ""
            }`}
            onClick={() => handleTabClick("Dashboard")}
          >
            <svg
              className="h-6 w-6 inline-block mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* ... icon svg ... */}
            </svg>
            Dashboard
          </li>
          {/* ... other sidebar items ... */}
        </ul>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search coins, news etc"
            className="bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mr-4">
              <svg
                className="h-4 w-4 inline-block mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ... bell icon svg ... */}
              </svg>
            </button>
            <div className="flex items-center">
              <img
                src="/profile-pic.jpg"
                alt="Profile Picture"
                className="h-8 w-8 rounded-full mr-2"
              />
              <span className="text-gray-400">Daniel Smith</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === "Dashboard" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-md p-6">
                <h2 className="text-lg font-bold mb-2">Total balance</h2>
                <p className="text-3xl font-bold text-green-500">
                  $6,230.00
                  <span className="text-sm text-green-400 ml-2">+1.4%</span>
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-md p-6 text-center">
                <h2 className="text-lg font-bold mb-4">Premium Plan</h2>
                <ul className="list-disc list-inside text-sm mb-4">
                  <li>Reduced transfer fee</li>
                  <li>A more favorable referral program</li>
                </ul>
                <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded-md">
                  Upgrade your plan to Premium
                </button>
              </div>
              {/* ... other dashboard cards ... */}
            </div>

            {/* Portfolio */}
            <div className="mt-8">
              <h2 className="text-lg font-bold mb-4">Portfolio</h2>
              <div className="bg-gray-800 rounded-md p-6">
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold">Bitcoin</h3>
                    <p className="text-sm text-gray-400">BTC</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">1.3 BTC</p>
                    <p className="text-sm text-green-500">+0.4%</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg font-bold">$37,816.30</p>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
                    Buy
                  </button>
                </div>
              </div>
              {/* ... other portfolio items ... */}
            </div>
          </div>
        )}

        {/* Other tabs content */}
        {/* ... */}
      </div>
    </div>
  );
};

export default Dashboard;
