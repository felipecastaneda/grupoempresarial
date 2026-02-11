import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { announcements } from "@/lib/data";
import { format } from "date-fns";

export default function AnnouncementsPage() {
  return (
    <div>
      <p className="text-muted-foreground mb-6">
        Stay up-to-date with the latest news and announcements from across the company.
      </p>
      <Accordion type="single" collapsible className="w-full">
        {announcements.map((announcement) => (
          <AccordionItem value={announcement.id} key={announcement.id}>
            <AccordionTrigger>
              <div className="flex justify-between w-full pr-4">
                <span className="font-medium text-left">{announcement.title}</span>
                <span className="text-muted-foreground text-sm">
                  {format(new Date(announcement.date), "MMMM dd, yyyy")}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">{announcement.content}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
