"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { policies } from "@/lib/data";
import type { PolicyDocument } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { FileText } from "lucide-react";

export default function PoliciesAndProceduresPage() {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyDocument | null>(null);

  return (
    <>
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
                  <Button className="w-full" onClick={() => setSelectedPolicy(policy)}>
                    <FileText className="mr-2 h-4 w-4" />
                    View Document
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      <Dialog
        open={!!selectedPolicy}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedPolicy(null);
          }
        }}
      >
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{selectedPolicy?.title}</DialogTitle>
          </DialogHeader>
          {selectedPolicy?.pdfUrl && (
            <div className="flex-grow">
              <iframe
                src={selectedPolicy.pdfUrl}
                className="w-full h-full"
                title={selectedPolicy.title}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
