
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { employees } from "@/lib/data";

export default function OfficeOfTheCEOPage() {
  const ceo = employees.find(e => e.title === 'CEO');
  const avatar = PlaceHolderImages.find(p => p.id === ceo?.avatar);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">Office of the CEO</h1>
        <p className="text-muted-foreground">
          A message from our leadership and company vision.
        </p>
      </div>

      {ceo && (
        <Card className="overflow-hidden">
          <div className="bg-muted p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-32 w-32 border-4 border-background">
                {avatar && <AvatarImage src={avatar.imageUrl} alt={ceo.name} />}
                <AvatarFallback className="text-4xl">{ceo.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold font-headline">{ceo.name}</h2>
                <p className="text-xl text-muted-foreground">{ceo.title}</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">A Message to Our Team</h3>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Welcome to the heart of AppIntel Hub. Our journey is one of passion, innovation, and relentless pursuit of excellence. We are not just building software; we are crafting the future of application intelligence.
              </p>
              <p>
                Our success is built on the collective talent and dedication of every single person in this company. Each line of code, every customer interaction, and every new idea contributes to our shared vision. I am incredibly proud of what we have accomplished together and even more excited for what lies ahead.
              </p>
              <p>
                Let's continue to challenge the status quo, to support one another, and to build a company that not only leads the industry but also makes a meaningful impact.
              </p>
              <p>Thank you for being a part of this journey.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
