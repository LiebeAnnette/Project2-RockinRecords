import React, { createContext, useContext, useState, ReactNode } from "react";

interface Record {
  artist: string;
  album: string;
}

interface RecordContextType {
  records: Record[];
  addRecord: (newRecord: Record) => Promise<void>;
}

const RecordContext = createContext<RecordContextType | undefined>(undefined);

export const RecordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [records, setRecords] = useState<Record[]>([]);

  const addRecord = async (newRecord: Record) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. User might not be authenticated.");
      return;
    }

    try {
      const response = await fetch("/api/records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRecord),
      });

      if (!response.ok) {
        throw new Error("Failed to save record to the database.");
      }

      const savedRecord = await response.json();
      setRecords((prev) => [...prev, savedRecord]);
    } catch (err) {
      console.error("Error saving record:", err);
    }
  };

  return (
    <RecordContext.Provider value={{ records, addRecord }}>
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
