"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/lib/supabaseClient";

interface Ticket {
  ticket_id: string;
  user_id: string;
  ticket_type_id: string;
  description: string;
  status_id: string;
  created: string;
  updated: string;
  priority_id: string;
  attachments: string;
  due_date: string;
}

const SupportPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showCreateTicket, setShowCreateTicket] = useState<boolean>(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [signedUrls, setSignedUrls] = useState<{ [key: string]: string }>({});
  const [showAlert, setShowAlert] = useState<boolean>(false); // State for alert visibility
  const [alertMessage, setAlertMessage] = useState<string>(""); // State for the alert message
  const [alertType, setAlertType] = useState<"success" | "error">("success"); // To control alert type

  useEffect(() => {
    const fetchTickets = async () => {
      const user = await supabase.auth.getUser();

      if (!user?.data?.user?.id) {
        console.error("User not logged in.");
        return;
      }

      const { data, error } = await supabase
        .from("Tickets")
        .select(
          "ticket_id, user_id, ticket_type_id, description, status_id, created, updated, priority_id, attachments, due_date"
        )
        .eq("user_id", user.data.user.id)
        .order("created", { ascending: false });

      if (error) {
        console.error("Error fetching tickets:", error);
      } else if (data && data.length === 0) {
        console.log("No tickets found for the user.");
      } else {
        setTickets(data || []);
      }
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.ticket_type_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewAttachment = async (
    ticket_id: string,
    attachment: string
  ) => {
    const { data, error } = await supabase.storage
      .from("Attachments")
      .createSignedUrl(attachment, 60); // Signed URL expires in 60 seconds

    if (error) {
      console.error("Error generating signed URL:", error);
      return;
    }

    setSignedUrls((prev) => ({
      ...prev,
      [ticket_id]: data?.signedUrl || "",
    }));
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  if (showCreateTicket) {
    return (
      <CreateTicketPage
        onCancel={() => setShowCreateTicket(false)}
        setShowAlert={setShowAlert}
        setAlertMessage={setAlertMessage}
        setAlertType={setAlertType}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-inherit text-inherit p-6">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold">Support Tickets</h1>
        <button
          className="mt-4 mb-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          onClick={() => setShowCreateTicket(true)}>
          Create Ticket
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search tickets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Custom Alert UI */}
      {showAlert && (
        <div
          className={`fixed top-20 left-10 right-10 p-4 text-center ${
            alertType === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}>
          <span>{alertMessage}</span>
          <button onClick={handleAlertClose} className="ml-4 text-lg font-bold">
            &times;
          </button>
        </div>
      )}

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
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <tr key={ticket.ticket_id}>
                  <td className="border border-gray-400 px-4 py-2">
                    {ticket.ticket_id}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {ticket.ticket_type_id}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {ticket.created}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {ticket.due_date || "N/A"}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {ticket.description}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {ticket.attachments ? (
                      <>
                        <button
                          onClick={() =>
                            handleViewAttachment(
                              ticket.ticket_id,
                              ticket.attachments
                            )
                          }
                          className="text-blue-400 hover:underline">
                          View
                        </button>
                        {signedUrls[ticket.ticket_id] && (
                          <a
                            href={signedUrls[ticket.ticket_id]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline ml-2">
                            Open Attachment
                          </a>
                        )}
                      </>
                    ) : (
                      "None"
                    )}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {ticket.status_id}
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

const CreateTicketPage: React.FC<{
  onCancel: () => void;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  setAlertType: React.Dispatch<React.SetStateAction<"success" | "error">>;
}> = ({ onCancel, setShowAlert, setAlertMessage, setAlertType }) => {
  const [type, setType] = useState<string>("Educational Content");
  const [priority, setPriority] = useState<string>("Low");
  const [due_date, setDueDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [attachments, setAttachments] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await supabase.auth.getUser();

    if (!user?.data?.user?.id) {
      console.error("User not logged in.");
      return;
    }

    const ticket_id = `TICKET_${Date.now()}`;

    let attachmentUrl = null;

    if (attachments) {
      // Upload attachment to the folder named after ticket_id
      const { data, error } = await supabase.storage
        .from("Attachments")
        .upload(`${ticket_id}/${attachments.name}`, attachments);

      if (error) {
        console.error("Error uploading attachment:", error);
        return;
      }

      attachmentUrl = `${ticket_id}/${attachments.name}`;
    }

    const { error } = await supabase.from("Tickets").insert([
      {
        ticket_id,
        user_id: user.data.user.id,
        ticket_type_id: type,
        priority_id: priority,
        due_date,
        description,
        attachments: attachmentUrl,
        created: new Date().toISOString(),
        status_id: "open",
      },
    ]);

    if (error) {
      console.error("Error creating ticket:", error);
      setAlertMessage("There was an error creating the ticket.");
      setAlertType("error");
    } else {
      setAlertMessage("Ticket created successfully!");
      setAlertType("success");
    }
    setShowAlert(true);
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
            className="w-full px-4 py-2 border border-gray-600 rounded">
            <option value="Educational">Educational Content</option>
            <option value="Technical">Technical Issue</option>
            <option value="General">General</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Due Date</label>
          <input
            type="date"
            value={due_date}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Attachment</label>
          <input
            type="file"
            onChange={(e) =>
              setAttachments(e.target.files ? e.target.files[0] : null)
            }
            className="w-full px-4 py-2 border border-gray-600 rounded"
          />
        </div>
        <div className="flex space-x-4 justify-center">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded">
            Create Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupportPage;
