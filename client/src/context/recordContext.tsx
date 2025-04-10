import React, { createContext, useContext, useState, ReactNode } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export interface Record {
  id?: number;
  album: string;
  artist: string;
  userId?: number;
}


interface RecordContextType {
  records: Record[];
  addRecord: (newRecord: Record) => Promise<void>;
  fetchRecords: () => Promise<void>;
  deleteRecord: (id: number) => Promise<void>;
}

const RecordContext = createContext<RecordContextType | undefined>(undefined);

export const RecordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [records, setRecords] = useState<Record[]>([]);

  const fetchRecords = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/library`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error("Failed to fetch records", err);
    }
  };

  const addRecord = async (newRecord: Record) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. User might not be logged in/")
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.id;

    try {
      const response = await fetch(`${API_BASE_URL}/api/library`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          artist: newRecord.artist,
          album: newRecord.album,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save record to the database.");
      }

      await response.json();

      await fetchRecords();
    } catch (err) {
      console.log("Error saving record;", err);
    }
  };
  const deleteRecord = async (id: number) => {
    const token = localStorage.getItem("token");
  
    try {
      const res = await fetch(`${API_BASE_URL}/api/records/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        throw new Error("Failed to delete record");
      }
  
      await fetchRecords();
    } catch (err) {
      console.error("Error deleting record", err);
    }
  };

  return (
    <RecordContext.Provider value={{ records, addRecord, fetchRecords, deleteRecord }}>
      {children}
    </RecordContext.Provider>
  );
};

export const useRecord = () => {
  const context = useContext(RecordContext);
  if (!context) {
    throw new Error("useRecord must be used within a RecordProvider");
  }
  return context;
};