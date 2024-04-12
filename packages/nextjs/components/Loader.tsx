import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-4 border-solid border-gray-200  h-12 w-12 animate-spin"></div>
    </div>
  );
};

export default Loader;
