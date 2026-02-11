import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { employees } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Mail } from "lucide-react";

export default function DirectoryPage() {
  return (
    <div>
      <p className="text-muted-foreground mb-6">
        Find and connect with colleagues across Application Intelligence.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {employees.map((employee) => {
          const avatar = PlaceHolderImages.find((p) => p.id === employee.avatar);
          return (
            <Card key={employee.id} className="text-center">
              <CardHeader className="items-center">
                <Avatar className="h-24 w-24 mb-2">
                  {avatar && <AvatarImage src={avatar.imageUrl} alt={employee.name} />}
                  <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline">{employee.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{employee.title}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium bg-secondary text-secondary-foreground rounded-full px-3 py-1 inline-block mb-4">
                  {employee.department}
                </p>
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4" />
                  <a href={`mailto:${employee.email}`} className="hover:text-primary">
                    {employee.email}
                  </a>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
