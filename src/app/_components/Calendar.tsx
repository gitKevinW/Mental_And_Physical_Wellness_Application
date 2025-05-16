'use client';

import { useState } from "react";

export default function CalendarHeader({ month, year } : { month: String; year : String}) {

    const [monthIndex, setMonthIndex] = useState(Number(month));
    const [yearIndex, setYearIndex] = useState(Number(year));

    const MonthlySwitchCase = () => {
        switch (monthIndex % 12) {
            case 0:
                return "January";
            case 1:
                return "Febuary";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return 'May';
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";
            default:
                return null;
        }
    };

    const inc_month = () => {
        setMonthIndex((prev) => prev + 1);

        if (monthIndex >= 11){
        setYearIndex((prev) => prev + 1);
        setMonthIndex(0);
        }
    }

    const dec_month = () => {
        setMonthIndex((prev) => prev - 1);

        if (monthIndex <= 0){
        setYearIndex((prev) => prev - 1);
        setMonthIndex(11);
        }
    }

  return (
    <>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={dec_month}>
            Back
        </button>
        <div className="h-10 w-40 text-center pt-3.5">
            {MonthlySwitchCase()} {yearIndex}
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={inc_month}>
            Next 
        </button>
    </>
  );    
}
