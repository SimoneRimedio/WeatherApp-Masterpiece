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
      <form onSubmit={handleLocation} className="flex items-center my-10 w-96">
        <input
          type="text"
          className="py-2 px-3 w-full border rounded-lg border-tools-shadow text-text bg-tools focus:outline-none focus:border-details text-xl"
          placeholder="Enter location..."
          value={currentLocation}
          onChange={handleInput}
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-details hover:bg-button-details focus:outline-none focus:bg-button-details rounded-lg"
        >
          <IconSearch className="text-card" />
        </button>
      </form>
    </>
  );
};

export default InputForm;
