import React from "react";

interface ModalProps {
  show: boolean;
  onHide: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onHide }) => {
  return (
    <>
      {show && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center ">
          <div className="flex flex-col justify-center items-center bg-card rounded-lg shadow-lg shadow-card-shadow p-8 relative">
            <button
              type="button"
              className="absolute top-2 right-2 text-lg font text-text hover:text-button-details focus:outline-none"
              onClick={onHide}
            >
              <span>&times;</span>
            </button>
            <div className="text-center">
              <h5 className="text-2xl font-bold mb-4">Location Permission</h5>
              <p className="text-gray-700">Please enable location services in your browser. Or continue without Loaction</p>
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-button-details rounded-md text-card bg-details hover:bg-button-details focus:outline-none"
                  onClick={onHide}
                >
                  Continue Without Location
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
