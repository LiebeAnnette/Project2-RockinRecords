import React, { createContext, useContext, useState, ReactNode } from "react";

interface Record {
    artist: string
    album: string;
    merchant: string;
    yearReleased: string;
}

interface RecordContextType {
    records: Record[];
    addRecord: (newRecord: Record) => void;
}

const RecordContext = createContext<RecordContextType | undefined>(undefined);

export const RecordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [records, setRecords] = useState<Record[]>([]);

    const addRecord = (newRecord: Record) => {
        setRecords((prevRecords) => [...prevRecords, newRecord]);
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