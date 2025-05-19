'use client';

import { useState } from "react";
import { eachDayOfInterval, endOfMonth, format ,getDay,startOfMonth, isToday } from "date-fns";
import clsx from "clsx";

export default function CalendarHeader({ month, year } : { month: String; year : String}) {

    const [monthIndex, setMonthIndex] = useState(Number(month));
    const [yearIndex, setYearIndex] = useState(Number(year));

    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

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

    const beginningOfMonth = startOfMonth(new Date(yearIndex, monthIndex));
    const endOfMonthDate = endOfMonth(new Date(yearIndex, monthIndex));
    
    const daysInMonth = eachDayOfInterval({
        start: beginningOfMonth,
        end: endOfMonthDate
    });

    const startDay = getDay(beginningOfMonth);

  return (
    <>
        <div className="h-16 flex items-center justify-center space-x-4">

            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={dec_month}>
                Back
            </button>

            <div className="min-w-[180px] text-center font-semibold text-lg">
                {MonthlySwitchCase()} {yearIndex}
            </div>

            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={inc_month}>
                Next 
            </button>

        </div>

        <div className="container mx-auto p-4">
            <div className="grid grid-cols-7 gap-5">
                {week.map((day) => {
                    return (
                        <div key={day} className="font-bold text-center">
                            {day} 
                        </div>
                    );
                })}
                {Array.from({ length: startDay }, (_, index) => (
                    <div key={index} className="text-center border rounded-md h-16"></div>
                ))}
                {daysInMonth.map((day) => {
                    return (
                        <div key={day.toString()} className={clsx("relative group bg-white text-center border rounded-md h-16 flex items-center justify-center", 
                            {"bg-yellow-200": isToday(day)}
                        )}>
                            <div
                                className="absolute inset-0 -z-10 rounded-md pointer-events-none
                                        opacity-0 group-hover:opacity-60 group-hover:bg-blue-600 group-hover:blur-md
                                        transition-all duration-200"
                            />
                            {format(day, "d")}
                        </div>
                    );
                })}
            </div>
        </div>

    </>
  );    
}
