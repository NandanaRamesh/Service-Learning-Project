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
  const [priorityFilter, setPriorityFilter] = useState<"high" | "medium" | "low" | "all">("all");
  const [typeFilter, setTypeFilter] = useState<string | "all">("all");
  const [signedUrls, setSignedUrls] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    fetchTickets();
  }, [priorityFilter, typeFilter]);

  const fetchTickets = async () => {
    let query = supabase.from("Tickets").select(
      "ticket_id, ticket_type_id, created, updated, priority_id, attachments, status_id"
    );

    // Apply filters based on selected priority and type
    if (priorityFilter !== "all") {
      query = query.eq("priority_id", priorityFilter);
    }

    if (typeFilter !== "all") {
      query = query.eq("ticket_type_id", typeFilter);
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

  const generateSignedUrl = async (ticketId: string, attachmentName: string) => {
    const { data, error } = await supabase
      .storage
      .from("Attachments")
      .createSignedUrl(`${ticketId}/${attachmentName}`, 60);  // Valid for 1 minute

    if (error) {
      console.error("Error generating signed URL:", error);
    } else if (data) {
      setSignedUrls(prev => ({
        ...prev,
        [ticketId]: data.signedUrl,  // Store the signed URL by ticketId
      }));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-inherit text-inherit p-6">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold">Tickets</h1>
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-4">
        {/* Priority Filter */}
        <div className="flex items-center">
          <label className="font-medium mr-2">Priority:</label>
          <select
            className="border border-gray-300 rounded px-2 py-1"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as "high" | "medium" | "low" | "all")}
          >
            <option value="all">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Type Filter */}
        <div className="flex items-center">
          <label className="font-medium mr-2">Type:</label>
          <select
            className="border border-gray-300 rounded px-2 py-1"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Technical">Technical Issue</option>
            <option value="General">General</option>
            <option value="Educational">Educational</option>
            {/* Add more ticket types as per your data */}
          </select>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-inherit">
              <th className="border border-gray-400 px-4 py-2 text-left">Ticket ID</th>
              <th className="border border-gray-400 px-4 py-2 text-left">Type</th>
              <th className="border border-gray-400 px-4 py-2 text-left">Date Raised</th>
              <th className="border border-gray-400 px-4 py-2 text-left">Resolved Date</th>
              <th className="border border-gray-400 px-4 py-2 text-left">Priority</th>
              <th className="border border-gray-400 px-4 py-2 text-left">Attachments</th>
              <th className="border border-gray-400 px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.ticket_id}>
                <td className="border border-gray-400 px-4 py-2">{ticket.ticket_id}</td>
                <td className="border border-gray-400 px-4 py-2">{ticket.ticket_type_id}</td>
                <td className="border border-gray-400 px-4 py-2">{new Date(ticket.created).toLocaleDateString()}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {ticket.updated ? new Date(ticket.updated).toLocaleDateString() : "Not Resolved"}
                </td>
                <td className="border border-gray-400 px-4 py-2">{ticket.priority_id}</td>
                <td className="border border-gray-400 px-4 py-2">
                {ticket.attachments && ticket.attachments.trim() !== "" ? (
                  <>
                    <button
                      className="text-blue-500 underline mr-4"
                      onClick={() => {
                        // Check if ticket.attachments is not null and contains '/'
                        const attachmentParts = ticket.attachments?.split('/');
                        if (Array.isArray(attachmentParts) && attachmentParts.length > 1) {
                          const [ticketId, attachmentName] = attachmentParts;
                          generateSignedUrl(ticketId, attachmentName);
                        }
                      }}
                    >
                      View
                    </button>
                    {signedUrls[ticket.ticket_id] && (
                      <button
                        className="text-green-500 underline"
                        onClick={() => window.open(signedUrls[ticket.ticket_id], "_blank")}
                      >
                        Open Attachment
                      </button>
                    )}
                  </>
                ) : (
                  "No Attachment"
                )}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <select
                    className="border border-gray-300 rounded px-2 py-1"
                    value={ticket.status_id || ""}
                    onChange={(e) => updateTicketStatus(ticket.ticket_id, e.target.value)}
                  >
                    <option value="" disabled>Select Status</option>
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
