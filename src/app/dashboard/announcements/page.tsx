import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { announcements } from "@/lib/data";
import { format } from "date-fns";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AnnouncementsPage() {
  return (
    <div>
      <p className="text-muted-foreground mb-6">
        Stay up-to-date with the latest news and announcements from across the company.
      </p>
      <div className="space-y-8">
        {announcements.map((announcement) => {
          const image = PlaceHolderImages.find(p => p.id === announcement.imageId);
          return (
            <Card key={announcement.id}>
              {image && (
                <div className="relative h-64 w-full">
                  <Image
                    src={image.imageUrl}
                    alt={announcement.title}
                    fill
                    className="object-cover rounded-t-lg"
                    data-ai-hint={image.imageHint}
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{announcement.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{announcement.content}</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(announcement.date), "MMMM dd, yyyy")}
                </p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
