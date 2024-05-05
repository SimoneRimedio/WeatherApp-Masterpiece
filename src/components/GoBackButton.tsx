import { ReactElement } from "react";

const GoBackButton = ({ onClick }: { onClick: () => void }): ReactElement => (
  <button
    onClick={onClick}
    className="text-card bg-tools hover:bg-tools-shadow focus:outline-card font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-10"
  >
    Go Back
  </button>
);

export default GoBackButton;
