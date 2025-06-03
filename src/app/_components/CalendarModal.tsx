'use client';

import { useState, FormEvent } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

type CalendarModalProps = {
  open: boolean;
  date: Date | null;
  onClose: () => void;  
};  

export default function CalendarModal({ open, date, onClose}: CalendarModalProps) {
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [selectedRating, setSelectedRating] = useState(0);
  const rating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!date) return;
    try {
      await addDoc(collection(db, "calendarEntries"), {
        date: date.toISOString(),
        rating: selectedRating,
        sleep: inputs.sleep || "",
        activity: inputs.activity || "",
        diet: inputs.diet || "",
        feeling: inputs.feeling || "",
        grateful: inputs.grateful || "",
        learning: inputs.learning || "",
        createdAt: new Date().toISOString(),
      });
      setInputs({});
      setSelectedRating(0);
      onClose();
    } catch (error) {
      alert("Error saving entry: " + (error as Error).message);
    }
  };

  const handleCancel = () => {
    setInputs({});
    setSelectedRating(0);
    onClose();
  };

  return (
    <div onClick={handleCancel} className="fixed inset-0 backdrop-blur-[3px] bg-opacity-40 flex items-center justify-center z-50">
      <div onClick={e => e.stopPropagation()} className="bg-white p-6 rounded shadow-lg min-w-[600px] max-h-[80vh] overflow-y-auto">
        
        <h1 className="mb-2 font-bold text-lg">
          {date ? date.toDateString() : ""}
        </h1>

        <h2 className="mb-4 text-gray-600">
            Happiness Rating:
        </h2>

        <div className="flex gap-2 mb-4">
          {rating.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedRating(item)}
              className={`px-4 py-2 rounded ${selectedRating === item ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              {item}
            </button>
          ))}
        </div>

        <h2 className="mb-4 text-gray-600">
            Amount of sleep (hrs):
        </h2>

        <input
          type="number"
          name="sleep"
          className="border p-2 w-full mb-2"
          placeholder="Enter hours of sleep"
          value={inputs.sleep || ""}
          onChange={handleChange}
        />

        <h2 className="mb-4 text-gray-600">
            Amount of physical activities (mins):
        </h2>

        <input
          type="number"
          name="activity"
          className="border p-2 w-full mb-2"
          placeholder="Enter minutes of activity"
          value={inputs.activity || ""}
          onChange={handleChange}
        />

        <h2 className="mb-4 text-gray-600">
            Diet:
        </h2>

        <input
          type="text"
          name="diet"
          className="border p-2 w-full mb-2"
          placeholder="Enter info"
          value={inputs.diet || ""}
          onChange={handleChange}
        />

        <h2 className="mb-4 text-gray-600">
            How am I feeling today?
        </h2>
        
        <textarea
        name="feeling"
        rows={10}
        className="border p-2 w-full mb-2"
        value={inputs.feeling || ""}
        onChange={handleChange}
        placeholder="Enter info"
        />   

        <h2 className="mb-4 text-gray-600">
            What am I grateful for today?
        </h2>
        
        <textarea
        name="grateful"
        rows={10}
        className="border p-2 w-full mb-2"
        value={inputs.grateful || ""}
        onChange={handleChange}
        placeholder="Enter info"
        />

        <h2 className="mb-4 text-gray-600">
            What did I learn today?
        </h2>
        
        <textarea
        name="learning"
        rows={10}
        className="border p-2 w-full mb-2"
        value={inputs.learning || ""}
        onChange={handleChange}
        placeholder="Enter info"
        />

        <div className="flex justify-end gap-2">
        <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 rounded"
        >
            Cancel
        </button>
        <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
        >
            Save
        </button>
        </div>
        
      </div>
    </div>
  );
}