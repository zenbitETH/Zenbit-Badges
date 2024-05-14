import { NetworkOptions } from "./NetworkOptions";
import { useDisconnect } from "wagmi";
import { ArrowLeftOnRectangleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export const WrongNetworkDropdown = () => {
  const { disconnect } = useDisconnect();

  return (
    <div className="dropdown dropdown-end mr-2">
      <label tabIndex={0} className="btn bg-red-500 border-none btn-sm dropdown-toggle gap-1">
        <span>Red Incorrecta, cambiala aquí</span>
        <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
      </label>
      <ul tabIndex={0} className="dropdown-content menu p-2 mt-1 shadow-center shadow-accent bg-bit rounded-box gap-1">
        <NetworkOptions />
        <li>
          <button
            className="menu-item text-error btn-sm !rounded-xl flex gap-3 py-3"
            type="button"
            onClick={() => disconnect()}
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" />
            <span>Desconectar</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
