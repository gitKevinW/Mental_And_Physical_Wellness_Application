import { adminDB } from "../firebaseAdmin";
import Link from 'next/link';

const COLORS = {
  bg: "#c2ced9",       // light blue background
  card: "#a4b8ce",     // card/table background
  border: "#5a7590",   // border color
  text: "#223344",     // main text
  accent: "#279645",   // accent green
};

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
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        background: COLORS.bg,
        color: COLORS.text,
      }}
    >
      <div
        className="rounded-2xl shadow-xl p-8 mt-12 w-full max-w-7xl" 
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <h1 className="text-3xl font-bold mb-4 text-center" style={{ color: COLORS.text }}>
          Your Calendar Entries
        </h1>
        <p className="mb-6 text-center">
          View and analyze your calendar entries!
        </p>
        <div className="overflow-x-auto rounded-xl relative">
          <table
            className="min-w-full text-sm"
            style={{
              background: COLORS.card,
              borderRadius: "1rem",
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <thead>
              <tr style={{ background: COLORS.bg }}>
                <th className="border px-2 py-2 font-semibold" style={{ borderColor: COLORS.border }}>Date</th>
                <th className="border px-2 py-2 font-semibold" style={{ borderColor: COLORS.border }}>Rating</th>
                <th className="border px-2 py-2 font-semibold" style={{ borderColor: COLORS.border }}>Sleep (hrs)</th>
                <th className="border px-2 py-2 font-semibold" style={{ borderColor: COLORS.border }}>Walk (mins)</th>
                <th className="border px-2 py-2 font-semibold" style={{ borderColor: COLORS.border }}>Run (mins)</th>
                <th className="border px-2 py-2 font-semibold" style={{ borderColor: COLORS.border }}>Lift (mins)</th>
                <th className="border px-2 py-2 font-semibold" style={{ borderColor: COLORS.border }}>Activity Points</th>
                <th className="border px-2 py-2 font-semibold" style={{ borderColor: COLORS.border }}>Diet</th>
                <th className="border px-2 py-2 font-semibold" style={{ borderColor: COLORS.border }}>Feeling</th>
                <th className="border px-2 py-2 font-semibold" style={{ borderColor: COLORS.border }}>Grateful</th>
                <th className="border px-2 py-2 font-semibold" style={{ borderColor: COLORS.border }}>Learning</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry: any) => (
                <tr key={entry.id} className="hover:bg-[#8ca0b4] transition">
                  <td className="border px-2 py-2" style={{ borderColor: COLORS.border }}>{new Date(entry.date).toLocaleDateString()}</td>
                  <td className="border px-2 py-2" style={{ borderColor: COLORS.border }}>{entry.rating}</td>
                  <td className="border px-2 py-2" style={{ borderColor: COLORS.border }}>{entry.sleep}</td>
                  <td className="border px-2 py-2" style={{ borderColor: COLORS.border }}>{entry.walk}</td>
                  <td className="border px-2 py-2" style={{ borderColor: COLORS.border }}>{entry.run}</td>
                  <td className="border px-2 py-2" style={{ borderColor: COLORS.border }}>{entry.lift}</td>
                  <td className="border px-2 py-2" style={{ borderColor: COLORS.border }}>{entry.activityPoints}</td>
                  <td className="border px-2 py-2" style={{ borderColor: COLORS.border }}>{entry.diet}
                    {`Carbs: ${entry.carbs ?? entry.carbohydrates ?? ""}% | Protein: ${entry.protein ?? ""}% | Produce: ${entry.produce ?? ""}%`}
                  </td>
                  <td className="border px-2 py-2 whitespace-pre-line break-words max-w-[180px]" style={{ borderColor: COLORS.border }}>
                    {entry.feeling && entry.feeling.length > 100 ? entry.feeling.slice(0, 100) + "..." : entry.feeling}
                  </td>
                  <td className="border px-2 py-2 whitespace-pre-line break-words max-w-[180px]" style={{ borderColor: COLORS.border }}>
                    {entry.grateful && entry.grateful.length > 100 ? entry.grateful.slice(0, 100) + "..." : entry.grateful}
                  </td>
                  <td className="border px-2 py-2 whitespace-pre-line break-words max-w-[180px]" style={{ borderColor: COLORS.border }}>
                    {entry.learning && entry.learning.length > 100 ? entry.learning.slice(0, 100) + "..." : entry.learning}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-start mt-4">
            <Link
              href="/home"
              className="px-4 py-2 rounded-full font-semibold transition-colors"
              style={{
                background: COLORS.border,
                color: COLORS.bg,
                boxShadow: `0 2px 8px 0 ${COLORS.border}22`,
              }}
            >
              Back to Calendar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}