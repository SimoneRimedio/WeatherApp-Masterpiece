import { FC } from "react";

interface SidebarProps {
  menuSelection: string;
  setMenuSelection: (selection: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ menuSelection, setMenuSelection }) => {
  return (
    <div className="bg-gray-800 w-64 h-screen fixed">
      <div className="py-4 px-6">
        <img
          src="/cryptohub-logo.svg"
          alt="CryptoHub Logo"
          className="h-8"
        />
      </div>
      <ul className="mt-6">
        <li
          className={`py-2 px-6 cursor-pointer ${
            menuSelection === "current" ? "bg-gray-700" : ""
          }`}
          onClick={() => setMenuSelection("current")}
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
          Current
        </li>
        <li
          className={`py-2 px-6 cursor-pointer ${
            menuSelection === "hourly" ? "bg-gray-700" : ""
          }`}
          onClick={() => setMenuSelection("hourly")}
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
          Hourly
        </li>
        <li
          className={`py-2 px-6 cursor-pointer ${
            menuSelection === "daily" ? "bg-gray-700" : ""
          }`}
          onClick={() => setMenuSelection("daily")}
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
          Daily
        </li>
        {/* ... altre voci della barra laterale ... */}
      </ul>
    </div>
  );
};

export default Sidebar;