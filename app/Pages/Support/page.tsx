"use client";

import React, { useState } from "react";
import { ticketsData } from "@/app/components/ticketsData";

const SupportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showCreateTicket, setShowCreateTicket] = useState<boolean>(false);

  // Filtering tickets based on search query
  const filteredTickets = ticketsData.filter(
    (ticket) =>
      ticket.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showCreateTicket) {
    return <CreateTicketPage onCancel={() => setShowCreateTicket(false)} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-inherit text-inherit p-6">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold">Support Tickets</h1>
        <button
          className="mt-4 mb-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          onClick={() => setShowCreateTicket(true)}>
          Create Ticket
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search tickets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
                Due Date
              </th>
              <th className="border border-gray-400 px-4 py-2 text-left">
                Description
              </th>
              <th className="border border-gray-400 px-4 py-2 text-left">
                Attachments
              </th>
              <th className="border border-gray-400 px-4 py-2 text-left">
                Date Resolved
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
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
                    {ticket.dueDate || "N/A"}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {ticket.description}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {ticket.attachments ? (
                      <a
                        href={ticket.attachments}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline">
                        View
                      </a>
                    ) : (
                      "None"
                    )}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {ticket.dateResolved || "Pending"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="border border-gray-400 px-4 py-2 text-center">
                  No tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CreateTicketPage: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const [type, setType] = useState<string>("Educational Content");
  const [priority, setPriority] = useState<string>("Low");
  const [dueDate, setDueDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [attachments, setAttachments] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ type, priority, dueDate, description, attachments });
    alert("Ticket created successfully!");
    onCancel();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-inherit text-inherit p-6">
      <h2 className="text-2xl font-bold mb-4">Create Ticket</h2>
      <form
        className="w-full max-w-lg p-6 rounded shadow-md"
        onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Educational Content</option>
            <option>Technical</option>
            <option>General</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Attachments</label>
          <input
            type="file"
            onChange={(e) => setAttachments(e.target.files?.[0] || null)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupportPage;
