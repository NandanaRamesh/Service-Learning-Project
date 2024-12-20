"use client";

import React, { useState } from "react";
import { ticketsData } from "@/app/components/ticketsData";
import Link from "next/link";

const ResolveTicketPage: React.FC = () => {
  const [resolvedTickets, setResolvedTickets] = useState(ticketsData);

  // Handle resolving a ticket
  const resolveTicket = (ticketId: number, resolution: string) => {
    setResolvedTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              dateResolved: new Date().toLocaleDateString(),
              resolution,
            }
          : ticket
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-inherit text-inherit p-6">
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
                      onClick={() =>
                        resolveTicket(
                          ticket.id,
                          prompt("Enter resolution:") || "No resolution"
                        )
                      }>
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
