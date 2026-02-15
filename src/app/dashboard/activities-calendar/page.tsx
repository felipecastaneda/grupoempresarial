"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TailwindCalendar from "@/components/TailwindCalendar";
import { format, isSameDay } from "date-fns";

// Types
type EventType = "corporate" | "social" | "department";

interface CompanyEvent {
  date: Date;
  title: string;
  type: EventType;
}

// Sample data
const events: CompanyEvent[] = [
  { date: new Date(2026, 1, 20), title: "Q3 Town Hall Meeting", type: "corporate" },
  { date: new Date(2026, 1, 22), title: "Annual Company Picnic", type: "social" },
  { date: new Date(2026, 1, 25), title: "IT Tech Talk", type: "department" },
  { date: new Date(2026, 1, 26), title: "Charity Bake Sale", type: "social" },
  { date: new Date(2026, 1, 26), title: "End of Year Party", type: "social" },
];

const eventDays = events.map((event) => event.date);

export default function ActivitiesCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDayEvents = date
    ? events.filter((event) => isSameDay(event.date, date))
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-headline">Activities Calendar</h1>
        <p className="text-muted-foreground">
          Keep track of company events, holidays, and social gatherings.
        </p>
      </div>

      {/* Grid layout */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Calendar */}
        <Card>
          <CardContent className="p-4">
            <TailwindCalendar
              selected={date}
              onSelect={setDate}
              eventDays={eventDays}
            />
          </CardContent>
        </Card>

        {/* Event List */}
        <Card>
          <CardHeader>
            <CardTitle>
              Events for {date ? format(date, "MMMM dd, yyyy") : "..."}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDayEvents.length > 0 ? (
              <ul className="space-y-3">
                {selectedDayEvents.map((event, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Badge
                      variant={
                        event.type === "corporate" ? "default" : "secondary"
                      }
                    >
                      {event.type}
                    </Badge>
                    <span className="font-medium">{event.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">
                No events scheduled for this day.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}