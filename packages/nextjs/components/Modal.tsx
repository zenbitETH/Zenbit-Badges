import React from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  data: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, close, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity flex justify-center items-center" onClick={close}>
      <div className="max-w-lg overflow-hidden border border-gray-300 rounded-lg m-2">
        <div className="px-6 py-6">
          <div className="flex justify-center items-center">
            <div className="flex flex-row items-center justify-between">
              <div className="mr-4">
                <Image src="/image.png" alt="Profile" width={150} height={150} className="rounded-full" />
              </div>

              <div>
                <div>Event Name:{data?.eventName}</div>
                <div>Event Description:{data?.eventDescription}</div>
                <div>Mentor Name:{data?.mentorName}</div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-base">Address : {data?.address}</p>
            <div className="m-3">
              <p className="text-base">Onboarding Attestation Granted!</p>
              <a
                className="text-xs"
                style={{ marginTop: "-1rem" }}
                href={`${process.env.NEXT_PUBLIC_ATTESTATION_VIEW_URL}/${data.id}`}
              >
                See on EAS explorer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
