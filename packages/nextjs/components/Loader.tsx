import React from "react";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4 animate-pulse font-bold text-2xl mx-3 text-center ">
        Por favor confirma la transacción en tu cartera web3 🦊 ↗️
      </div>
      <Image
        src="/logo.svg"
        alt="Profile"
        width={100}
        height={100}
        className="rounded-full mx-auto my-3 animate-spin"
      />
    </div>
  );
};

export default Loader;
