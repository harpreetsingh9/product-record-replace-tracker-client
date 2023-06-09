import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import Tesseract from "tesseract.js";
import Loader from "../components/Loader";
import Status from "../components/Status";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

const Upload = () => {
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [serialLoading, setSerialLoading] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [serialNumbers, setSerialNumbers] = useState([""]);
  const [modelNumbers, setModelNumbers] = useState([]);

  const handleNameChange = (e) => {
    setError("");
    setSuccess("");
    setName(e.target.value);
  };

  const handleDateChange = (e) => {
    setError("");
    setSuccess("");
    setSelectedDate(moment(e.target.value).format("YYYY-MM-DD"));
  };

  const handleAddSerialNumber = () => {
    setSerialNumbers([...serialNumbers, ""]);
    setModelNumbers([...modelNumbers, "LG42"]);
  };

  const handleFileChange = (e) => {
    setError("");
    setSuccess("");
    setImagePath(URL.createObjectURL(e.target.files[0]));
  };

  const handleSerialNumberChange = (e, index) => {
    const newSerialNumbers = [...serialNumbers];
    newSerialNumbers[index] = e.target.value;
    setSerialNumbers(newSerialNumbers);
  };
  const handleModelNumberChange = (e, index) => {
    const newModelNumbers = [...modelNumbers];
    newModelNumbers[index] = e.target.value;
    setModelNumbers(newModelNumbers);
  };

  const handleRemoveSerialNumber = (index) => {
    const newSerialNumbers = [...serialNumbers];
    const newModelNumber = [...modelNumbers];
    newSerialNumbers.splice(index, 1);
    newModelNumber.splice(index, 1);
    setSerialNumbers(newSerialNumbers);
    setModelNumbers(newModelNumber);
  };

  //   let serialNumbers = text
  //         .match(/\d{4}rt/g)
  //         .map((serial) => serial.replace("rt", ""));

  const handleGetSerialNumber = async () => {
    setSerialLoading(true);
    try {
      const result = await Tesseract.recognize(imagePath, "eng", {
        logger: (m) => console.log(m),
      });
      let text = result.data.text;
      console.log(text);
      //   .match(/\d{4}[rR][tT]|[rR][eE]\d{4}/g)

      let serialNumbers = text
        .match(/\d{4}[rR][tTeE]/g)
        .map((serial) => {
          if (serial.toLowerCase().endsWith("rt")) {
            return serial.replace(/[rR][tT]/, "");
          } else if (serial.toLowerCase().endsWith("re")) {
            return serial.replace(/[rR][eE]/, "");
          }
        });
      if (!serialNumbers) {
        setError("Cannot get serial numbers");
        setSerialLoading(false);
        console.log("here");
        return;
      }
      console.log(serialNumbers);
      setSerialNumbers(serialNumbers);
      let newModelNumbers = [];
      for (let i = 0; i < serialNumbers.length; i++) {
        newModelNumbers.push("LG42");
      }
      setModelNumbers(newModelNumbers);
      setSerialLoading(false);
    } catch (error) {
      console.error(error);
      setError("Error! Cannot get serial numbers");
      setSerialLoading(false);
    }
  };

  const handleSubmit = async () => {
    const date = moment(selectedDate).toISOString();
    if (!name) {
      setError("Enter fields correctly");
      return;
    }
    setLoading(true);
    await axios
      .post(`${BASE_URL}/api/products`, {
        name,
        serialNumbers,
        modelNumbers,
        date,
      })
      .then((res) => {
        console.log(res);
        setSuccess(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
        setLoading(false);
      });
    setLoading(false);
    setName("");
    setSerialNumbers([""]);
    setModelNumbers(["LG42"]);
    setSelectedDate(moment(new Date()).format("YYYY-MM-DD"));
    setImagePath("");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="font-bold text-[#222328] text-[24px] mb-4">
        Upload Image Compressors -
      </h1>

      {error && <Status msg={error} color_text="text-red-500" />}
      {success && <Status msg={success} color_text="text-green-500" />}

      <div className="flex flex-col gap-3">
        <div className="flex gap-4 flex-row items-center justify-start">
          <label className="block text-md font-medium text-gray-900">
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 
            text-md rounded-lg outline-none block w-2/3
            focus:ring-[#4649ff]
          focus:border-[#4649ff]
        p-3"
          />
        </div>
        <div className="flex gap-4 flex-row items-center justify-start mb-3">
          <label className="block text-md font-medium text-gray-900 mr-2">
            Date:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 
            text-md rounded-lg outline-none block w-2/3
            focus:ring-[#4649ff]
          focus:border-[#4649ff]
        p-3"
          />
        </div>
      </div>

      <input
        type="file"
        onChange={handleFileChange}
        className="my-3 bg-[#6469ff] "
      />

      {imagePath && (
        <>
          <button
            onClick={handleGetSerialNumber}
            className="font-inter font-medium bg-[#6469ff] 
          text-white px-4 py-2 rounded-md my-2 relative"
          >
            {serialLoading && (
              <div
                className="flex justify-center items-center inset-0 z-0
              bg-[rgba(0,0,0,0.5)] absolute"
              >
                <Loader />
              </div>
            )}
            Get serial Numbers
          </button>
          <div className="flex justify-center items-center m-2">
            <img src={imagePath} alt="bill" className="pointer-events-none" />
          </div>
        </>
      )}

      {serialNumbers[0] &&
        serialNumbers.map((serialNumber, index) => (
          <div
            key={index}
            className="flex gap-2 flex-row items-center justify-start my-2"
          >
            <label className="block text-sm font-medium text-gray-900 mr-3">
              {index + 1}:
            </label>
            <input
              key={index}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
              rounded-lg outline-none block w-1/2
            focus:ring-[#4649ff] focus:border-[#4649ff] p-3"
              value={serialNumber}
              onChange={(e) => handleSerialNumberChange(e, index)}
            />

            <input
              type="text"
              value={modelNumbers[index]}
              onChange={(e) => handleModelNumberChange(e, index)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
              rounded-lg outline-none block w-1/4
              focus:ring-[#4649ff] focus:border-[#4649ff] p-3"
            />
            <button
              type="button"
              onClick={() => handleRemoveSerialNumber(index)}
              className=" text-indigo-600 bg-white  font-normal rounded-md
              text-sm  sm:w-auto px-2.5 py-2 text-center border border-gray-300"
            >
              X
            </button>
          </div>
        ))}

      {serialNumbers[0] && (
        <div className="gap-4 flex mt-4">
          <button
            type="button"
            onClick={handleAddSerialNumber}
            className=" text-[#6469ff] bg-white font-medium rounded-md font-inter
          text-md sm:w-auto px-2.5 py-2 text-center border border-gray-300"
          >
            Add more SNo.
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#6469ff] text-white font-medium rounded-md font-inter
          text-md sm:w-auto px-2.5 py-2 text-center border border-gray-300 relative"
          >
            {loading && (
              <div
                className="flex justify-center items-center inset-0 z-0
              bg-[rgba(0,0,0,0.5)] absolute"
              >
                <Loader />
              </div>
            )}
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Upload;
