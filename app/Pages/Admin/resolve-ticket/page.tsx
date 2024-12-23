"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/lib/supabaseClient";

type Ticket = {
  ticket_id: number;
  ticket_type_id: string;
  created: string;
  updated: string | null;
  priority_id: string;
  attachments: string | null;
  status_id: string;
};

const ResolveTicketPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [sortOrder, setSortOrder] = useState<"high" | "medium" | "low" | null>(
    null
  );

  useEffect(() => {
    fetchTickets();
  }, [sortOrder]);

  const fetchTickets = async () => {
    let query = supabase.from("Tickets").select(
      "ticket_id, ticket_type_id, created, updated, priority_id, attachments, status_id"
    );

    if (sortOrder) {
      query = query.order("priority_id", { ascending: sortOrder === "low" });
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching tickets:", error);
    } else if (data) {
      setTickets(data);
    }
  };

  const updateTicketStatus = async (ticketId: number, newStatus: string) => {
    const { error } = await supabase
      .from("Tickets")
      .update({ status_id: newStatus })
      .eq("ticket_id", ticketId);

    if (error) {
      console.error("Error updating ticket status:", error);
    } else {
      fetchTickets(); // Refresh tickets after update
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-inherit text-inherit p-6">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold">Tickets</h1>
      </div>

      {/* Priority Sorting */}
      <div className="mb-4">
        <label className="font-medium mr-2">Sort by Priority:</label>
        <select
          className="border border-gray-300 rounded px-2 py-1"
          value={sortOrder || ""}
          onChange={(e) =>
            setSortOrder(e.target.value as "high" | "medium" | "low" | null)
          }
        >
          <option value="">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
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
                Priority
              </th>
              <th className="border border-gray-400 px-4 py-2 text-left">
                Attachments
              </th>
              <th className="border border-gray-400 px-4 py-2 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.ticket_id}>
                <td className="border border-gray-400 px-4 py-2">
                  {ticket.ticket_id}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {ticket.ticket_type_id}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {new Date(ticket.created).toLocaleDateString()}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {ticket.updated
                    ? new Date(ticket.updated).toLocaleDateString()
                    : "Not Resolved"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {ticket.priority_id}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {ticket.attachments ? (
                    <a
                      href={ticket.attachments}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Attachment
                    </a>
                  ) : (
                    "NULL"
                  )}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                <select
                  className="border border-gray-300 rounded px-2 py-1"
                  value={ticket.status_id || ""}
                  onChange={(e) => updateTicketStatus(ticket.ticket_id, e.target.value)}
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="open">Open</option>
                  <option value="solving">Solving</option>
                  <option value="resolved">Resolved</option>
                </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Back to Admin Dashboard */}
      <div className="mt-6">
        <Link
          href="/Pages/Admin"
          className="w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-400 text-center block"
        >
          Back to Admin Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ResolveTicketPage;
