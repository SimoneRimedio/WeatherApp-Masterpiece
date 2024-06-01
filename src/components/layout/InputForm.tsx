import React, { ChangeEvent, FormEvent } from "react";
import { IconSearch } from "@tabler/icons-react";

interface InputFormProps {
  currentLocation: string;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleLocation: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

const InputForm: React.FC<InputFormProps> = ({
  currentLocation,
  handleInput,
  handleLocation,
}) => {
  return (
    <>
      <form id="searchBar" onSubmit={handleLocation} className="flex items-center my-10 lg:w-96 md:w-72 sm:w-72">
        <input
          type="text"
          className="py-2 px-3 w-full border-2 rounded-lg border-tools-shadow text-text bg-tools focus:outline-none focus:border-button-details text-xl"
          placeholder="Enter location..."
          value={currentLocation}
          onChange={handleInput}
        />
        <button
          type="submit"
          className="ml-2 px-2 py-2 bg-details hover:bg-button-details focus:outline-none focus:bg-button-details rounded-lg"
        >
          <IconSearch className="text-card font-black" />
        </button>
      </form>
    </>
  );
};

export default InputForm;
