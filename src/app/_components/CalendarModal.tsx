'use client';

import { useState, FormEvent, useRef } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { set } from "date-fns";

type CalendarModalProps = {
  open: boolean;
  date: Date | null;
  onClose: () => void;  
};  

export default function CalendarModal({ open, date, onClose}: CalendarModalProps) {
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [selectedRating, setSelectedRating] = useState(0);
  const rating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [ratingError, setRatingError] = useState<string | null>(null);
  const [dietError, setDietError] = useState<string | null>(null);

  // const topRef = useRef<HTMLDivElement>(null); // Reference to scroll to top

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!date) return;

    // Forces user to select a rating
    if (selectedRating === 0) {
      setRatingError("Please select a mood rating.");
      // topRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to top if error
      return;
    }
    setRatingError(null);

    // Validates diet inputs to be within 0-100%
    const carbs = parseInt(inputs.carbs || "0", 10);
    const protein = parseInt(inputs.protein || "0", 10);
    const produce = parseInt(inputs.produce || "0", 10);
    if ( (carbs + protein + produce) != 100) {
      setDietError("Please ensure the total of your diet percentages for the day adds up to 100%.");
      // topRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to top if error
      return;
    }
    setDietError(null);

    try {
      // Calculate activity points
      const walking = parseInt(inputs.walking || "0", 10);
      const running = parseInt(inputs.running || "0", 10);
      const lifting = parseInt(inputs.lifting || "0", 10);
      const activityPoints = (walking * 1) + (running * 2) + (lifting * 3);

      await addDoc(collection(db, "calendarEntries"), {
        date: date.toISOString(),
        rating: selectedRating,
        sleep: inputs.sleep || "",
        walk: inputs.walking || "",
        run: inputs.running || "",
        lift: inputs.lifting || "",
        activityPoints: activityPoints,
        carbohydrates: inputs.carbs || "",
        protein: inputs.protein || "",
        produce: inputs.produce || "",
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
      {/* <div ref={topRef} /> Reference for scrolling to top on error  */}
      <div
        onClick={e => e.stopPropagation()}
        className="p-6 rounded-2xl shadow-lg min-w-[600px] max-h-[80vh] overflow-y-auto" 
        style={{ background: "#c2ced9" }}
      >
        
        <h1 className="mb-2 font-bold text-lg">
          {date ? date.toDateString() : ""}
        </h1>

        <h2 className="mb-4 text-gray-600">
          <b>Mood Rating: </b>
          <br/>
          How are you feeling today? (1-10)
        </h2>

        {ratingError && (
          <div className="text-red-500 mb-2">{ratingError}</div>
        )}

        <div className="flex gap-2 mb-4">
          {rating.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedRating(item)}
              className={`px-4 py-2 rounded ${selectedRating === item ? "bg-blue-400 text-white" : "bg-gray-200"}`}
            >
              {item}
            </button>
          ))}
        </div>

        <h2 className="mb-4 text-gray-600">
          <b>Sleep: </b>
          <br/>
          How many hours did you sleep last night?
        </h2>

        <input
          type="number"
          name="sleep"
          className="border p-2 w-full mb-2"
          placeholder="Enter hours of sleep"
          value={inputs.sleep || ""}
          onChange={handleChange}
          required
        />

        <h2 className="mb-4 text-gray-600">
          <b>Exercise: </b>
          <br/>
          How many minutes did you spend on each activity today?
        </h2>

        <input
          type="number"
          name="walking"
          className="border p-2 w-full mb-2"
          placeholder="Enter minutes of walking"
          value={inputs.walking || ""}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="running"
          className="border p-2 w-full mb-2"
          placeholder="Enter minutes of running or jogging"
          value={inputs.running || ""}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="lifting"
          className="border p-2 w-full mb-2"
          placeholder="Enter minutes of Weightlifting, Aerobics, etc..."
          value={inputs.lifting || ""}
          onChange={handleChange}
          required
        />

        <h2 className="mb-4 text-gray-600">
          <b>Diet: </b>
          <br/>
          What ratio of carbs, protein, and produce did you consume today? 
          <br/>
          Note: (In percentages, must add up to 100%)
        </h2>

        {dietError && (
          <div className="text-red-500 mb-2">{dietError}</div>
        )}

        <input
          type="number"
          name="carbs"
          className="border p-2 w-full mb-2"
          placeholder="Ratio of carbs you consumed today"
          value={inputs.carbs || ""}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="protein"
          className="border p-2 w-full mb-2"
          placeholder="Ratio of protein you consumed today"
          value={inputs.protein || ""}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="produce"
          className="border p-2 w-full mb-2"
          placeholder="Ratio of fruits and vegetables you consumed today"
          value={inputs.produce || ""}
          onChange={handleChange}
          required
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