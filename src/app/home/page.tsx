import Image from "next/image";
import CalendarHeader from "../_components/Calendar";
import Link from 'next/link';





export default function CalendarDashboard() {

  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  // console.log(today)
  return (
    <div>
      <div className="h-56 text-center pt-3.5">
        Calendar Dashboard
      </div>
      <div>
        <Link href="/stats" className="text-center text-blue-500 hover:underline mb-4">
          View Your Calendar Entries
        </Link>
      </div>
      <div>
        <Link href="/graph" className="text-center text-blue-500 hover:underline mb-4">
          View Your Entries in Graph Form
        </Link>
      </div>
      <div>
        <CalendarHeader month={month.toString()} year={year.toString()}/>
      </div>
    </div>
  );
}
