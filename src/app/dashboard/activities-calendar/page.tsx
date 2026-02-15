
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const events = [
  { date: new Date(2023, 8, 15), title: "Q3 Town Hall Meeting", type: "corporate" },
  { date: new Date(2023, 9, 7), title: "Annual Company Picnic", type: "social" },
  { date: new Date(2023, 9, 20), title: "IT Tech Talk", type: "department" },
  { date: new Date(2023, 10, 10), title: "Charity Bake Sale", type: "social" },
  { date: new Date(2023, 11, 15), title: "End of Year Party", type: "social" },
];

export default function ActivitiesCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDayEvents = date
    ? events.filter(event => format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))
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
              components={{
                Day: ({ date, ...props }) => {
                  const dayEvents = events.filter(
                    event => format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
                  );
                  return (
                    // The 'relative' class is needed to position the dot
                    <div className="relative">
                      {/* We need to render the default Day component from react-day-picker */}
                      {/* @ts-ignore */}
                      <props.children {...props.children.props} />
                      {dayEvents.length > 0 && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </div>
                  );
                },
              }}
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
