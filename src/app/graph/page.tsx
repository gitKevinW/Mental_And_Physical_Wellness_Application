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
                            <b> Diet</b> ↔{" "}
                            <span style={{ color: "#8884d8" }}>●</span> 
                            <b> Exercise</b> <br/>
                            Research shows that with a combination of a healthy diet and regular exercise, individuals can significantly improve their overall health and well-being.
                            Also accelerating weight loss and decelerate the decline in resting metabolic rate.
                        </li>
                        <li>
                            <span style={{ color: "#bfcc35" }}>●</span>
                            <span style={{ color: "#cc3560" }}>●</span>
                            <span style={{ color: "#279645" }}>●</span>
                            <b> Diet</b> ↔ {" "}
                            <span style={{ color: "#FF8042" }}>●</span>
                            <b>Sleep</b>
                            <br/>
                            Studies proves that people with good sleep quality were found to consume higher carbohydrate, fiber,
                             beta-carotene, vitamin E, thiamine, vitamin B6, total folate, vitamin C, calcium, magnesium, potassium, and iron compared to those with poor sleep quality. Healthy diets
                             that consume more plant-derived foods, such as fruits, vegetables, whole grains, and legumes, are associated with better sleep quality.
                        </li>
                        <li>
                            <span style={{ color: "#00cccc" }}>●</span>
                            <b> Sleep</b> ↔{" "}
                            <span style={{ color: "#FF8042" }}>●</span>
                            <b> Mood</b>
                            <br/>
                            Mood was found to deteriate with poor sleep quality, and can make people become more irritable, tense, and depressed. Feelings of calmness
                            and relaxation were found to be associated with good sleep quality, while feelings of anger, frustration, and nervousness were associated with poor sleep quality.
                        </li>
                        <li>
                            <span style={{ color: "#00cccc" }}>●</span>
                            <b> Sleep</b> ↔{" "}
                            <span style={{ color: "#8884d8" }}>●</span> 
                            <b>Exercise</b>
                            <br/>
                            Poor sleep can contribute to physical and mental illnesses that may reduce participation in exercise. Research has shown that 
                            those who participated in more physical activities reported less wake time during the night.
                        </li>
                        <li>
                            <span style={{ color: "#8884d8" }}>●</span>
                            <b> Exercise</b> ↔{" "}
                            <span style={{ color: "#FF8042" }}>●</span>
                            <b>Mood</b>
                            <br/>
                            Exercising for just 10 additional minutes at an aerobic level can improve virgor, decrease fatigue, and decrease negative mood states. 
                            Some people report that exercise was as effective as cognitive therapy for their mild depression and gave improvements on tension, anger, fatigue, and confusion.
                        </li>
                        <li>
                            <span style={{ color: "#FF8042" }}>●</span>
                            <b> Mood</b> ↔{" "}
                            <span style={{ color: "#bfcc35" }}>●</span>
                            <span style={{ color: "#cc3560" }}>●</span>
                            <span style={{ color: "#279645" }}>●</span>
                            <b>Diet</b>
                            <br/>
                            Study has shown that diet changes that included higher percentages of fat and protein content led to increased well-being and decreased anxiety and depression. While, higher consumption
                            of carbohydrates led to decreased happiness and increased anxiety and depression.
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
                <h2 className="text-lg font-bold mb-4 text-center">Sources (APA)</h2>
                <div className="space-y-3 text-sm text-gray-700">
                    <li>
                        Poehlman, E. T., Melby, C. L., & Goran, M. I. (1991). The impact of exercise and diet restriction on daily energy expenditure. Sports Medicine, 11(2), 78–101. https://doi.org/10.2165/00007256-199111020-00002
                    </li>
                    <li>
                        Ryan, A. S. (2000). Insulin resistance with aging: Effects of diet and exercise. Sports Medicine, 30(5), 327–346. https://doi.org/10.2165/00007256-200030050-00001
                    </li>
                    <li>
                        Martin, S. E. (2023, March 18). The role of diet on the gut microbiome, mood and happiness [Preprint]. medRxiv. https://doi.org/10.1101/2023.03.18.23287442
                    </li>
                    <li>
                        Huang, Q., Liu, H., Suzuki, K., Ma, S., & Liu, C. (2019). Linking what we eat to our mood: A review of diet, dietary antioxidants, and depression. Antioxidants, 8(9), 376. https://doi.org/10.3390/antiox8090376
                    </li>
                    <li>
                        Godos, J., Grosso, G., Castellano, S., Galvano, F., Caraci, F., & Ferri, R. (2021). Association between diet and sleep quality: A systematic review. Sleep Medicine Reviews, 57, 101430. https://doi.org/10.1016/j.smrv.2021.101430
                    </li>
                    <li>
                        Mondin, T. C., Stuart, A. L., Williams, L. J., Jacka, F. N., Pasco, J. A., & Ruusunen, A. (2019). Diet quality, dietary patterns and short sleep duration: A cross-sectional population-based study. European Journal of Nutrition, 58(2), 641–651. https://doi.org/10.1007/s00394-018-1655-8
                    </li>
                    <li>
                        Hartmann, E., Baekeland, F., & Zwilling, G. R. (1973). Performance and mood following variations in the length and timing of sleep. Psychophysiology, 10(6), 559–570. https://doi.org/10.1111/j.1469-8986.1973.tb00805.x
                    </li>
                    <li>
                        Dolezal, B. A., Neufeld, E. V., Boland, D. M., Martin, J. L., & Cooper, C. B. (2017). Interrelationship between sleep and exercise: A systematic review. Advances in Preventive Medicine, 2017, Article 1364387. https://doi.org/10.1155/2017/1364387
                    </li>
                    <li>
                        Moturu, S. T., Khayal, I., Aharony, N., Pan, W., & Pentland, A. (2011). Sleep, mood and sociability in a healthy population. Proceedings of the 33rd Annual International Conference of the IEEE Engineering in Medicine and Biology Society, 5267–5270. https://doi.org/10.1109/IEMBS.2011.6091188
                    </li>
                    <li>
                        Dzierzewski, J. M., Buman, M. P., Giacobbi, P. R. Jr., Roberts, B. L., Aiken-Morgan, A. T., Marsiske, M., & McCrae, C. S. (2014). Exercise and sleep in community-dwelling older adults: Evidence for a reciprocal relationship. Journal of Sleep Research, 23(1), 61–68. https://doi.org/10.1111/jsr.12078
                    </li>
                    <li>
                        Hansen, C. J., Stevens, L. C., & Coast, J. R. (2001). Exercise duration and mood state: How much is enough to feel better? Health Psychology, 20(4), 267–275. https://doi.org/10.1037/0278-6133.20.4.267
                    </li>
                    <li>
                        Berger, B. G., & Motl, R. W. (2000). Exercise and mood: A selective review and synthesis of research employing the profile of mood states. Journal of Applied Sport Psychology, 12(1), 69–92. https://doi.org/10.1080/10413200008404214
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