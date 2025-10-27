// "use client"
// import { motion } from "motion/react";
// import ProgressList from "./progressList";


// // const tasks: TaskListItemProps = {

// // }


// // ---------- Subcomponents ----------
// function StatusBadge({ active }: { active: boolean }) {
//     return (
//         <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ type: "spring", stiffness: 300, damping: 20 }}
//             className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold
//         ${active ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/10" : "bg-rose-500/10 text-rose-400 ring-1 ring-rose-400/10"}
//       `}
//             aria-live="polite"
//         >
//             <span
//                 className={`h-2 w-2 rounded-full ${active ? "bg-emerald-400/90" : "bg-rose-400/90"} shadow-sm`}
//             />
//             {active ? "Active" : "Inactive"}
//         </motion.div>
//     );
// }


// const Booster = () => {
//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 10, scale: 0.995 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 0.45, ease: "easeOut" }}
//             className={`max-w-xl w-full rounded-2xl p-4 sm:p-6 bg-linear-to-b from-white/60 to-white/30 dark:from-neutral-900 dark:to-neutral-900/80 shadow-lg border border-white/6 ${className ?? ""}`}
//             role="region"
//             aria-label="Booster progress card"
//         >
//             {/* Header */}
//             <div className="flex items-start justify-between gap-4">
//                 <div>
//                     <div className="flex justify-between">

//                         <h3 className="text-base font-semibold">Booster Conditions <span className="text-xs text-muted-foreground"> (Within 30 Days)</span></h3>
//                         <div className="flex flex-col items-end gap-3">
//                             <StatusBadge active={allComplete && timePercent > 0} />
//                         </div>
//                     </div>
//                     <div className="mt-2 text-sm text-muted-foreground max-w-sm">
//                         Complete the tasks below within the countdown to activate your booster. This is a financial action; keep your details up to date.
//                     </div>
//                 </div>

//             </div>

//             {/* Body layout (mobile-first: vertical) */}
//             <div className="mt-4 flex flex-col md:flex-row md:items-center gap-6">
//                 {/* Circle */}
//                 <div className="shrink-0">
//                     <CountdownCircle percent={timePercent} remainingSeconds={60 * 60 * 24 * 18} />
//                 </div>

//                 {/* Details / tasks */}
//                 <div className="flex-1">
//                     <div className="grid gap-4">

//                         <div className="space-y-4">

//                             <ProgressList />
//                         </div>

//                     </div>
//                 </div>
//             </div>

//             {/* Footer small note */}
//             <div className="mt-4 text-xs text-muted-foreground">Tip: Keep your referrals and package requirements up to date to activate the booster early.</div>
//         </motion.div>
//     )
// }

// export default Booster