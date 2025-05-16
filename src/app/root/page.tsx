import Image from "next/image";
import CalendarHeader from "../_components/Calendar";




export default function CalendarDashboard() {

  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  // console.log(today)
  return (
    <>
      <div className="h-56 text-center pt-3.5">
        This is my Calendar Dashboard
      </div>
      <div>
        <CalendarHeader month={month.toString()} year={year.toString()}/>
      </div>
    </>
  );
}
