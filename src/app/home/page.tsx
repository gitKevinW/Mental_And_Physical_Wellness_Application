import CalendarHeader from "../_components/Calendar";
import Link from 'next/link';

// Color palette based on your reference image
const COLORS = {
  bg: "#e9ecef",        // lightest
  bg2: "#c2ced9",       // light blue
  bg3: "#8ca0b4",       // medium blue
  bg4: "#5a7590",       // dark blue
  bg5: "#223344",       // darkest
  bg6: "#192841",       // very dark blue
  bg7: "#a4b8ce",       // light grayish blue
  accent: "#279645",    // accent green (from your chart)
  accent2: "#bfcc35",   // accent yellow-green (from your chart)
};

export default function CalendarDashboard() {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  return (
    <div
      className="min-h-screen"
      style={{
        background: COLORS.bg6, // Use solid dark blue
        color: COLORS.bg5,
      }}
    >
      <div className="h-56 flex flex-col items-center justify-center pt-3.5"
        style={{
          color: COLORS.bg5,
          background: COLORS.bg3,
          borderRadius: "0 0 2rem 2rem",
          boxShadow: `0 4px 24px 0 ${COLORS.bg4}33`,
        }}
      >
        <h1 className="text-4xl font-bold tracking-wide mb-2" style={{ color: COLORS.bg6 }}>
          Calendar Dashboard
        </h1>
        <p className="text-lg" style={{ color: COLORS.bg5 }}>
          Track your health and habits!
        </p>
      </div>
      <div className="flex items-center justify-center mt-8 gap-4">
        <Link
          href="/stats"
          className="px-6 py-2 rounded-full font-semibold transition-colors"
          style={{
            background: COLORS.bg7,
            color: COLORS.bg5, // changed from COLORS.bg to COLORS.bg5 to match "View Entry Graph" text color
            boxShadow: `0 2px 8px 0 ${COLORS.bg5}22`,
          }}
        >
          View Calendar Table
        </Link>
        <Link
          href="/graph"
          className="px-6 py-2 rounded-full font-semibold transition-colors"
          style={{
            background: COLORS.bg7, // changed from COLORS.bg5 to COLORS.bg3 for a lighter blue
            color: COLORS.bg5,
            boxShadow: `0 2px 8px 0 ${COLORS.bg5}22`,
          }}
        >
          View Entry Graph
        </Link>
      </div>
      <div className="mt-10 flex justify-center">
        <div
          className="rounded-2xl shadow-xl p-6"
          style={{
            background: COLORS.bg7,
            border: `1px solid ${COLORS.bg4}`,
            minWidth: "900px",
            maxWidth: "1500px",
            width: "100%",
          }}
        >
          <CalendarHeader month={month.toString()} year={year.toString()} />
        </div>
      </div>
    </div>
  );
}
