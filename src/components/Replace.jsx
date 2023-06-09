import React from "react";
import Loader from "./Loader";

const Replace = ({
  selectedName,
  selectedSerialNumber,
  newSerialNumber,
  handleReplaceChange,
  handleReplaceSubmit,
  loadingReplace,
}) => {
  return (
    <div className="flex flex-col items-start justify-start">
      <div className="flex gap-4 flex-row items-center justify-start mt-2 ">
        <label
          htmlFor="serialNumber"
          className="block text-md font-medium text-gray-900"
        >
          Name:
        </label>
        <input
          type="text"
          value={selectedName}
          disabled
          className="bg-gray-200 border border-gray-400 text-gray-900 text-md 
            outline-none block p-3 rounded-lg w-[290px]"
        />
      </div>
      <div className="flex gap-4 flex-row items-center justify-start mt-2">
        <label
          htmlFor="serialNumber"
          className="block text-md font-medium text-gray-900"
        >
          Old serial number:
        </label>
        <input
          type="text"
          value={selectedSerialNumber}
          disabled
          className="bg-gray-200 border border-gray-400 text-gray-900 text-md 
            outline-none block p-2 w-[200px] rounded-lg"
        />
      </div>
      <div className="flex gap-3 flex-row items-center justify-start mt-2">
        <label
          htmlFor="serialNumber"
          className="block text-md font-medium text-gray-900"
        >
          New serial number:
        </label>
        <input
          type="text"
          placeholder="Enter new number"
          value={newSerialNumber}
          onChange={handleReplaceChange}
          inputMode="numeric"
          pattern="[0-9]*"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-md 
            outline-none block p-2 w-[195px] rounded-lg"
        />
      </div>
      <button
        type="button"
        onClick={handleReplaceSubmit}
        className="text-[#6469ff] bg-[#fff] border border-gray-300 font-medium rounded-md
          text-md sm:w-auto px-2 py-2 text-center mb-4 relative"
      >
        {loadingReplace && (
          <div
            className="flex justify-center items-center inset-0 z-0
              bg-[rgba(0,0,0,0.5)] absolute"
          >
            <Loader />
          </div>
        )}
        Replace
      </button>
    </div>
  );
};

export default Replace;
