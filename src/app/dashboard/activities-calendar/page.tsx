
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format, isSameDay } from "date-fns";

const events = [
  { date: new Date(2023, 8, 15), title: "Q3 Town Hall Meeting", type: "corporate" },
  { date: new Date(2023, 9, 7), title: "Annual Company Picnic", type: "social" },
  { date: new Date(2023, 9, 20), title: "IT Tech Talk", type: "department" },
  { date: new Date(2023, 10, 10), title: "Charity Bake Sale", type: "social" },
  { date: new Date(2023, 11, 15), title: "End of Year Party", type: "social" },
];

const eventDays = events.map(event => event.date);

export default function ActivitiesCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDayEvents = date
    ? events.filter(event => isSameDay(event.date, date))
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">Activities Calendar</h1>
        <p className="text-muted-foreground">
          Keep track of company events, holidays, and social gatherings.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-0 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-4"
              modifiers={{ hasEvent: eventDays }}
              modifiersClassNames={{ hasEvent: "has-event" }}
            />
          </CardContent>
        </Card>

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
                    <Badge variant={event.type === 'corporate' ? 'default' : 'secondary'}>
                      {event.type}
                    </Badge>
                    <span className="font-medium">{event.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No events scheduled for this day.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
