"use client";

import React, { useState } from "react";
import { ticketsData } from "@/app/components/ticketsData";
import Link from "next/link";

const ResolveTicketPage: React.FC = () => {
  const [resolvedTickets, setResolvedTickets] = useState(ticketsData);
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    ticketId: number | null;
  }>({ isOpen: false, ticketId: null });
  const [resolutionInput, setResolutionInput] = useState("");

  // Open the modal for resolution
  const openModal = (ticketId: number) => {
    setModalData({ isOpen: true, ticketId });
    setResolutionInput(""); // Reset input
  };

  // Close the modal
  const closeModal = () => {
    setModalData({ isOpen: false, ticketId: null });
    setResolutionInput("");
  };

  // Resolve ticket
  const resolveTicket = () => {
    if (modalData.ticketId !== null) {
      setResolvedTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === modalData.ticketId
            ? {
                ...ticket,
                dateResolved: new Date().toLocaleDateString(),
                resolution: resolutionInput || "No resolution provided",
              }
            : ticket
        )
      );
      closeModal();
    }
  };

  // Modal Component
  const ResolutionModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-4/5 max-w-md">
        <h2 className="text-xl font-bold mb-4">Provide Resolution</h2>
        <textarea
          className="w-full border border-gray-300 rounded p-2 mb-4"
          rows={4}
          placeholder="Enter resolution details..."
          value={resolutionInput}
          onChange={(e) => setResolutionInput(e.target.value)}></textarea>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            onClick={closeModal}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={resolveTicket}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-inherit text-inherit p-6">
      {/* Modal */}
      {modalData.isOpen && <ResolutionModal />}

      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold">Resolved Tickets</h1>
      </div>

      {/* Tickets Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-inherit">
              <th className="border border-gray-400 px-4 py-2 text-left">
                Ticket ID
              </th>
              <th className="border border-gray-400 px-4 py-2 text-left">
                Type
              </th>
              <th className="border border-gray-400 px-4 py-2 text-left">
                Date Raised
              </th>
              <th className="border border-gray-400 px-4 py-2 text-left">
                Resolved Date
              </th>
              <th className="border border-gray-400 px-4 py-2 text-left">
                Resolution
              </th>
              <th className="border border-gray-400 px-4 py-2 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {resolvedTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="border border-gray-400 px-4 py-2">
                  {ticket.id}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {ticket.type}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {ticket.dateRaised}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {ticket.dateResolved || "Not Resolved"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {ticket.resolution || "Pending"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {ticket.dateResolved ? (
                    "Resolved"
                  ) : (
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => openModal(ticket.id)}>
                      Resolve Ticket
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <Link
          href="/Pages/Admin"
          className="w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-400 text-center block">
          Back to Admin Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ResolveTicketPage;
