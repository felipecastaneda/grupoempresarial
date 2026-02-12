import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { policies } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function PoliciesAndProceduresPage() {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Access important company policies and procedure documents. Please review them regularly.
      </p>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {policies.map((policy) => {
          const image = PlaceHolderImages.find((p) => p.id === policy.imageId);
          return (
            <Card key={policy.id} className="flex flex-col">
              {image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={image.imageUrl}
                    alt={policy.title}
                    fill
                    className="object-cover rounded-t-lg"
                    data-ai-hint={image.imageHint}
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{policy.title}</CardTitle>
                <CardDescription>{policy.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow" />
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={policy.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-2 h-4 w-4" />
                    View Document
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
