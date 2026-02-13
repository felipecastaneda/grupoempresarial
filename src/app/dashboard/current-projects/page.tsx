import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CurrentProjectsPage() {
  return (
    <div>
      <p className="text-muted-foreground mb-6">
        An overview of the innovative projects our teams are currently developing.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project) => {
          const image = PlaceHolderImages.find(p => p.id === project.imageUrlId);
          return (
            <Card key={project.id} className="flex flex-col">
              {image && (
                <div className="relative h-64 w-full">
                  <Image
                    src={image.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover rounded-t-lg"
                    data-ai-hint={image.imageHint}
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                    Visit Project <ArrowUpRight className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
