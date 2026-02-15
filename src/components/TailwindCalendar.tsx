"use client";

import React from "react";

export interface TailwindCalendarProps {
  selected?: Date;
  onSelect: (date: Date) => void;
  eventDays?: Date[];
}

export default function TailwindCalendar({
  selected,
  onSelect,
  eventDays = [],
}: TailwindCalendarProps) {
  const referenceDate = selected ? new Date(selected) : new Date();
  const monthStart = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    1
  );

  const year = monthStart.getFullYear();
  const monthIndex = monthStart.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startDay = monthStart.getDay(); // 0 = Sunday

  const isEventDay = (d: number) =>
    eventDays.some(
      (ev) =>
        ev.getFullYear() === year &&
        ev.getMonth() === monthIndex &&
        ev.getDate() === d
    );

  const isSelected = (d: number) =>
    selected?.getFullYear() === year &&
    selected?.getMonth() === monthIndex &&
    selected?.getDate() === d;

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="isolate space-y-4">
      <h2 className="text-xl font-semibold text-center">
        {monthStart.toLocaleString("default", { month: "long" })} {year}
      </h2>

      <div className="grid grid-cols-7 text-center text-sm font-medium text-muted-foreground">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {days.map((d) => (
          <button
            key={d}
            onClick={() => onSelect(new Date(year, monthIndex, d))}
            className={`
              h-10 flex items-center justify-center rounded-md transition
              hover:bg-accent hover:text-accent-foreground
              ${isSelected(d) ? "bg-primary text-primary-foreground font-semibold" : ""}
              ${isEventDay(d) ? "ring-2 ring-primary/50" : ""}
            `}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}
