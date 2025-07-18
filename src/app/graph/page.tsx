import { adminDB } from "../firebaseAdmin";
import Link from 'next/link';
import  LineGraph  from "../_components/LineGraph";


export const dynamic = "force-dynamic"; // ensures SSR

export default async function StatsPage() {
  // Fetch entries from Firestore (server-side)
  const snapshot = await adminDB
    .collection("calendarEntries")
    .orderBy("date", "desc")
    .get();

    
// Map your Firestore data to the format LineGraph expects
  const entries = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

// Example: Use activityPoints as the value, and date as the x-axis
  const lineData = entries.map((entry: any) => ({
    date: entry.date ? new Date(entry.date).toLocaleDateString() : "",
    activityPoints: entry.activityPoints ?? 0,
    carbs: Number(entry.carbohydrates ?? entry.carbs ?? 0),
    protein: Number(entry.protein ?? 0),
    produce: Number(entry.produce ?? 0),
    walk: Number(entry.walk ?? 0),
    run: Number(entry.run ?? 0),
    lift: Number(entry.lift ?? 0),
    mood: Number(entry.rating ?? 0),
    sleep: Number(entry.sleep ?? 0),
  }));


  return (
    <div>
        <div>
            <h1 className="text-2xl font-bold mb-4">Your Calendar Entries</h1>
            <p className="mb-4">
                View and analyze your calendar entries.{" "}
                <Link href="/home" className="text-blue-500 hover:underline">
                Back to Calendar
                </Link> 
            </p>
        </div>
        <div>
            <LineGraph data={lineData} />
        </div>
        <div className="mt-8 flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full border border-gray-200">
                <h2 className="text-lg font-bold mb-4 text-center">Bidirectional Relationships</h2>
                <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex pl-15 items-center gap-2">
                        <span style={{ color: "#bfcc35" }}>●</span>
                        <span style={{ color: "#cc3560" }}>●</span>
                        <span style={{ color: "#279645" }}>●</span>
                        <b>Diet</b>
                        <span className="mx-2">↔</span>
                        <span style={{ color: "#00cccc" }}>●</span>
                        <b>Sleep</b>
                        <span className="mx-2">↔</span>
                        <span style={{ color: "#8884d8" }}>●</span>
                        <b>Exercise</b>
                        <span className="mx-2">↔</span>
                        <span style={{ color: "#FF8042" }}>●</span>
                        <b>Mood</b>
                    </div>
                    <div className="mt-2">
                        <ul className="list-disc ml-6">
                        <li>
                            <span style={{ color: "#bfcc35" }}>●</span>
                            <span style={{ color: "#cc3560" }}>●</span>
                            <span style={{ color: "#279645" }}>●</span>
                            <b> Diet</b> can affect <b>Exercise</b>.
                        </li>
                        <li>
                            <span style={{ color: "#bfcc35" }}>●</span>
                            <span style={{ color: "#cc3560" }}>●</span>
                            <span style={{ color: "#279645" }}>●</span>
                            <b> Diet</b> can affect <b>Sleep</b>.
                        </li>
                        <li>
                            <span style={{ color: "#00cccc" }}>●</span>
                            <b> Sleep</b> influences <b>Mood</b>.
                        </li>
                        <li>
                            <span style={{ color: "#00cccc" }}>●</span>
                            <b> Sleep</b> influences <b>Exercise</b>.
                        </li>
                        <li>
                            <span style={{ color: "#8884d8" }}>●</span>
                            <b> Exercise</b> impacts <b>Mood</b>.
                        </li>
                        <li>
                            <span style={{ color: "#FF8042" }}>●</span>
                            <b> Mood</b> is shaped by <b>Diet</b>.
                        </li>
                        </ul>
                    </div>
                        <div className="mt-2 text-xs text-gray-500 text-center">
                            <span>●</span> Colors match the chart legend for each category.
                        </div>
                </div>
            </div>
        </div>
        <div className="mt-8 flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full border border-gray-200">
                <h2 className="text-lg font-bold mb-4 text-center">Sources</h2>
                <div className="space-y-3 text-sm text-gray-700">
                    <li>
                        References.
                    </li>
                    <li>
                        References.
                    </li>
                    <li>
                        References.
                    </li>
                    <li>
                        References.
                    </li>
                    <li>
                        References.
                    </li>
                </div>
            </div>
        </div>
    </div>
  );
}