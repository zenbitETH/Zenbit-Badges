"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import moment from "moment";
import { parseUnits } from "viem";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

interface FormData {
  name: string;
  email: string;
  organization: string;
}

interface EventData {
  id: string;
  eventId: string;
  eventDate: number;
}

const RegisterToEventPage: React.FC = () => {
  const params = useParams<{ eventId: string }>();
  const [eventData, setEventData] = useState<EventData>();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState();
  const [showWarningToast, setShowWarningToast] = useState(false);

  useEffect(() => {
    async function fetchEventDataByEventID(id: string) {
      const result = await fetch("/api/event?id=" + id);
      const resultEventData = await result.json();
      setEventData({
        id: resultEventData.data._id,
        eventId: resultEventData.data.eventId,
        eventDate: resultEventData.data.eventDate,
      });
    }
    if (params?.eventId) {
      fetchEventDataByEventID(params.eventId as string);
    }
  }, [params?.eventId]);

  const { data: eventDetails } = useScaffoldContractRead({
    contractName: "EASOnboarding",
    functionName: "events",
    args: [parseUnits(params?.eventId as string, 0)],
    enabled: params?.eventId !== undefined,
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "", // Initialize with empty strings
    organization: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.organization || !eventData?.id) {
      alert("Some info is missing.");
      return;
    }

    const newParticipantOnEventData = {
      ...formData,
      eventDBId: eventData.id,
    };

    const result = await fetch("/api/event-register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY || "",
      },
      body: JSON.stringify(newParticipantOnEventData),
    });

    if (result.ok) {
      const data = await result.json();
      setToastMessage(data.message);

      if (result.status === 200) {
        setShowSuccessToast(true);
      }
      if (result.status === 202) {
        setShowWarningToast(true);
      }

      setFormData({
        name: "",
        email: "",
        organization: "",
      });
      const timeout = setTimeout(() => {
        setShowSuccessToast(false);
        setShowWarningToast(false);
      }, 4000);
      () => clearTimeout(timeout);
    }
  };
  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit} className="rounded-md bg-gray-300/80 p-4 w-96 grid gap-4 ">
        <div className="text-2xl font-mus text-center">
          Registro a {`${eventDetails ? eventDetails[5] : ""}`}:
          <div className="text-center text-lg font-cha">
            Fecha: {eventData ? moment(Number(eventData.eventDate)).format("DD/MM/YYYY hh:mm") : ""}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">
            ¿Cómo te podemos llamar?:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className=""
            placeholder="Introduce tu nombre o un alias"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            ¿Cúal es tu Email?
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className=""
            placeholder="Para el recordatorio en tu calendario"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="organization" className="block mb-1">
            ¿Perteneces a alguna organización?
          </label>
          <input
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            className=""
            placeholder="Universidad, empresa, institución etc."
          />
        </div>

        <div className="text-center w-full">
          <button type="submit" className="bg-zen">
            ¡Apuntame al evento!
          </button>
        </div>
      </form>
      {showSuccessToast ? (
        <div className="toast">
          <div className="alert alert-success">
            <span>{toastMessage}</span>
          </div>
        </div>
      ) : null}

      {showWarningToast ? (
        <div className="toast">
          <div className="alert alert-warning">
            <span>{toastMessage}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RegisterToEventPage;
