"use client"
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useMemo, useState } from "react";
import ProgressList from "../tasks/progressList";

type Task = {
  id: string;
  label: string;
  current: number;
  goal: number;
  prefix?: string;
  suffix?: string;
};

type BoosterProgressCardProps = {
  /**
   * Total countdown time in seconds (default 30 days)
   */
  totalSeconds?: number;
  /**
   * End timestamp (if provided, will be used instead of totalSeconds)
   */
  endAt?: number | null;
  tasks?: Task[];
  className?: string;
};

const DEFAULT_TOTAL_SECONDS = 30 * 24 * 60 * 60; // 30 days

// ---------- Utilities ----------
function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}
function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function formatDHMS(seconds: number) {
  const days = Math.floor(seconds / (24 * 3600));
  seconds -= days * 24 * 3600;
  const hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return { days, hours, minutes, seconds: secs, pretty: `${days}d ${pad2(hours)}:${pad2(minutes)}:${pad2(secs)}` };
}
function percentOf(current: number, goal: number) {
  if (goal === 0) return 0;
  return clamp(current / goal, 0, 1);
}

// ---------- Subcomponents ----------
function StatusBadge({ active }: { active: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold
        ${active ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/10" : "bg-rose-500/10 text-rose-400 ring-1 ring-rose-400/10"}
      `}
      aria-live="polite"
    >
      <span
        className={`h-2 w-2 rounded-full ${active ? "bg-emerald-400/90" : "bg-rose-400/90"} shadow-sm`}
      />
      {active ? "Active" : "Inactive"}
    </motion.div>
  );
}

function SmallStat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <div className="text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

// ---------- Circular Countdown ----------
const CIRCLE_SIZE = 160;
const STROKE = 10;
const RADIUS = (CIRCLE_SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function CountdownCircle({
  percent,
  remainingSeconds,
  criticalThresholdSeconds = 5 * 24 * 3600, // when to show "glow" for <5 days
}: {
  percent: number; // 0..1 (time left)
  remainingSeconds: number;
  criticalThresholdSeconds?: number;
}) {
  const { days, hours, minutes, seconds, pretty } = formatDHMS(remainingSeconds);
  const isCritical = remainingSeconds <= criticalThresholdSeconds;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}>
          {/* Background circle */}
          <circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE}
            stroke="rgba(255,255,255,0.06)"
            fill="transparent"
          />
          {/* Track */}
          <circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE}
            stroke="var(--track)"
            strokeLinecap="round"
            fill="transparent"
            style={{ opacity: 0.6 }}
          />
          {/* Animated arc */}
          <motion.circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE}
            strokeLinecap="round"
            fill="transparent"
            stroke="url(#grad)" // use gradient
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - percent)}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - percent) }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>

        {/* optional glow */}
        <AnimatePresence>
          {isCritical && (
            <motion.div
              key="glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 rounded-full blur-[6px] mix-blend-screen pointer-events-none"
              style={{ boxShadow: "0 0 30px rgba(245,158,11,0.12)" }}
            />
          )}
        </AnimatePresence>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
          <div className="text-xs uppercase text-muted-foreground">Time Left</div>
          <div className="font-semibold text-lg md:text-2xl">{days}d</div>
          <div className="text-xs font-mono tracking-wide bg-black/10 dark:bg-white/6 rounded px-2 py-0.5 mt-1 text-[12px]">
            {pad2(hours)}:{pad2(minutes)}:{pad2(seconds)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Task Row ----------
function TaskRow({ task, index }: { task: Task; index: number }) {
  const pct = percentOf(task.current, task.goal) * 100;
  const displayPct = Math.round(pct);
  const gradient =
    index === 0
      ? "bg-gradient-to-r from-amber-400 to-amber-600"
      : index === 1
        ? "bg-gradient-to-r from-sky-400 to-teal-400"
        : "bg-gradient-to-r from-violet-400 to-pink-400";

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium">{task.label}</div>
        <div className="text-sm font-semibold">
          {task.prefix ?? ""}
          {task.current.toLocaleString()}
          {task.suffix ?? ""}{" "}
          <span className="ml-2 text-xs text-muted-foreground">{displayPct}%</span>
        </div>
      </div>

      <div className="h-3 bg-white/5 dark:bg-white/6 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${20}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className={`${gradient} h-full`}
          style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.08)" }}
          aria-valuenow={displayPct}
          role="progressbar"
          aria-label={`${task.label} progress`}
        />
      </div>
    </div>
  );
}

// ---------- Overall Progress ----------
function OverallProgress({ value }: { value: number }) {
  const pct = Math.round(clamp(value, 0, 1) * 100);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-muted-foreground">Progress to activate booster</div>
        <div className="text-sm font-semibold">{pct}%</div>
      </div>
      <div className="h-2 rounded-full bg-white/5 dark:bg-white/6 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-full bg-linear-to-r from-amber-400 to-emerald-400"
        />
      </div>
    </div>
  );
}

// ---------- Main Component ----------
export default function BoosterProgressCard({
  totalSeconds = DEFAULT_TOTAL_SECONDS,
  endAt = null,
  tasks,
  className,
}: BoosterProgressCardProps) {
  // sample tasks if none provided
  const initialTasks: Task[] = useMemo(
    () =>
      tasks ?? [
        { id: "pkg", label: "Your own package", current: 100, goal: 250, prefix: "$" },
        { id: "refs", label: "Direct referrals", current: 0, goal: 5 },
        { id: "biz", label: "Direct business", current: 0, goal: 2000, prefix: "$" },
      ],
    [tasks]
  );

  // compute end timestamp
  const now = Date.now();
  const computedEndAt = useMemo(() => {
    if (endAt && typeof endAt === "number") return endAt;
    return now + totalSeconds * 1000;
  }, [endAt, now, totalSeconds]);

  const [remainingSeconds, setRemainingSeconds] = useState(() => Math.max(0, Math.floor((computedEndAt - Date.now()) / 1000)));
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        const rem = Math.max(0, Math.floor((computedEndAt - Date.now()) / 1000));
        if (rem <= 0) {
          clearInterval(interval);
          return 0;
        }
        return rem;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [computedEndAt]);

  const timePercent = remainingSeconds <= 0 ? 0 : clamp(remainingSeconds / totalSeconds, 0, 1);
  const [currentTasks] = useState<Task[]>(initialTasks);

  // compute overall progress as average of task percents
  const overall = useMemo(() => {
    const sum = currentTasks.reduce((acc, t) => acc + percentOf(t.current, t.goal), 0);
    return sum / Math.max(currentTasks.length, 1);
  }, [currentTasks]);

  const allComplete = overall >= 0.999 && timePercent > 0;

  // For small flair when nearing end
  const isCritical = remainingSeconds <= 5 * 24 * 3600;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`max-w-xl w-full rounded-2xl p-4 sm:p-6 bg-linear-to-b from-white/60 to-white/30 dark:from-neutral-900 dark:to-neutral-900/80 shadow-lg border border-white/6 ${className ?? ""}`}
      role="region"
      aria-label="Booster progress card"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">Booster Conditions</h3>
              <span className="text-xs text-muted-foreground"> (Within 30 Days)</span>
            </div>
            <div className="flex flex-col items-end gap-3">
              <StatusBadge active={allComplete && timePercent > 0} />
            </div>
          </div>
          <div className="mt-2 text-sm text-muted-foreground max-w-sm">
            Complete the tasks below within the countdown to activate your booster. This is a financial action; keep your details up to date.
          </div>
        </div>

      </div>

      {/* Body layout (mobile-first: vertical) */}
      <div className="mt-4 flex flex-col md:flex-row md:items-center gap-6">
        {/* Circle */}
        <div className="shrink-0">
          <CountdownCircle percent={timePercent} remainingSeconds={60 * 60 * 24 * 18} />
        </div>

        {/* Details / tasks */}
        <div className="flex-1">
          <div className="grid gap-4">

            <div className="space-y-4">

              <ProgressList />
            </div>

          </div>
        </div>
      </div>

      {/* Footer small note */}
      <div className="mt-4 text-xs text-muted-foreground">Tip: Keep your referrals and package requirements up to date to activate the booster early.</div>
    </motion.div>
  );
}
