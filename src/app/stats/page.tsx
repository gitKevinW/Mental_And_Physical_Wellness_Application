import { adminDB } from "../firebaseAdmin";
import Link from 'next/link';


export const dynamic = "force-dynamic"; // ensures SSR

export default async function StatsPage() {
  // Fetch entries from Firestore (server-side)
  const snapshot = await adminDB
    .collection("calendarEntries")
    .orderBy("date", "desc")
    .get();

  const entries = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Calendar Entries</h1>
        <p className="mb-4">
            View and analyze your calendar entries.{" "}
            <Link href="/home" className="text-blue-500 hover:underline">
            Back to Calendar
            </Link> 
        </p>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Rating</th>
              <th className="border px-2 py-1">Sleep (hrs)</th>
              <th className="border px-2 py-1">Walk (mins)</th>
              <th className="border px-2 py-1">Run (mins)</th>
              <th className="border px-2 py-1">Lift (mins)</th>
              <th className="border px-2 py-1">Activity Points</th>
              <th className="border px-2 py-1">Diet</th>
              <th className="border px-2 py-1">Feeling</th>
              <th className="border px-2 py-1">Grateful</th>
              <th className="border px-2 py-1">Learning</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry: any) => (
              <tr key={entry.id}>
                <td className="border px-2 py-1">{new Date(entry.date).toLocaleDateString()}</td>
                <td className="border px-2 py-1">{entry.rating}</td>
                <td className="border px-2 py-1">{entry.sleep}</td>
                <td className="border px-2 py-1">{entry.walk}</td>
                <td className="border px-2 py-1">{entry.run}</td>
                <td className="border px-2 py-1">{entry.lift}</td>
                <td className="border px-2 py-1">{entry.activityPoints}</td>
                <td className="border px-2 py-1">{entry.diet}</td>
                <td className="border px-2 py-1">{entry.feeling}</td>
                <td className="border px-2 py-1">{entry.grateful}</td>
                <td className="border px-2 py-1">{entry.learning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}