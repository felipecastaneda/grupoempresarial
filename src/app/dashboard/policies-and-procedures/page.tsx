
"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { policies } from "@/lib/data";
import type { PolicyDocument, AcknowledgedPolicy } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { FileText, CheckCircle, ListChecks, Loader2, Download, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useFirebase, useMemoFirebase, useCollection } from "@/firebase";
import { collection, doc, query, where, setDoc } from "firebase/firestore";

export default function PoliciesAndProceduresPage() {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyDocument | null>(null);
  const { toast } = useToast();
  const { user, employee } = useAuth();
  const { firestore } = useFirebase();
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);

  const acknowledgementsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, 'acknowledgements'), where('userId', '==', user.uid));
  }, [firestore, user]);

  const { data: userAcknowledgements, isLoading: isLoadingAcknowledgements, error } = useCollection<AcknowledgedPolicy>(acknowledgementsQuery);

  const canViewAllAcknowledgements = employee?.role === 'Administrator' || employee?.department === 'HR';

  const acknowledgedPolicies = useMemo(() => {
    if (!userAcknowledgements) return new Set<string>();
    return new Set(userAcknowledgements.map(ack => ack.policyId));
  }, [userAcknowledgements]);

  useEffect(() => {
    if (error) {
        console.error("Error fetching acknowledgements:", error);
        toast({
            title: "Error fetching data",
            description: "Could not retrieve your acknowledgement status. Please refresh the page.",
            variant: "destructive",
        });
    }
  }, [error, toast]);

  const handleViewDocument = (policy: PolicyDocument) => {
    if (!policy.pdfUrl) return;
    setSelectedPolicy(policy);
  };

  const handleAcknowledge = async (policy: PolicyDocument) => {
    if (!user || !user.email) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to acknowledge a policy.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(policy.id);
    try {
      const ackDocRef = doc(firestore, 'acknowledgements', `${user.uid}_${policy.id}`);
      
      const displayName = employee?.name || user.displayName || user.email;

      const newAcknowledgement = {
        policyId: policy.id,
        policyTitle: policy.title,
        userId: user.uid,
        userName: displayName,
        userEmail: user.email,
        acknowledgedAt: new Date().toISOString(),
      };

      await setDoc(ackDocRef, newAcknowledgement, { merge: true });

      toast({
        title: "Policy Acknowledged",
        description: `You have successfully acknowledged the "${policy.title}".`,
      });
    } catch (error) {
        console.error("Error acknowledging policy:", error);
        toast({
            title: "Error",
            description: "Could not acknowledge the policy. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(null);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <p className="text-muted-foreground">
            Access important company policies and procedure documents. Please review them regularly.
            </p>
            {canViewAllAcknowledgements && (
                <Button asChild>
                    <Link href="/dashboard/policies-and-procedures/acknowledgements">
                        <ListChecks className="mr-2 h-4 w-4" />
                        View All Acknowledgements
                    </Link>
                </Button>
            )}
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {policies.map((policy) => {
            const image = PlaceHolderImages.find((p) => p.id === policy.imageId);
            const isAcknowledged = acknowledgedPolicies.has(policy.id);
            const isAcknowledging = isSubmitting === policy.id;
            
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
                <CardFooter className="flex flex-col gap-2">
                  <Button className="w-full" onClick={() => handleViewDocument(policy)}>
                    <FileText className="mr-2 h-4 w-4" />
                    View Document
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full" variant="outline" disabled={isAcknowledged || isLoadingAcknowledgements || isAcknowledging}>
                        {isAcknowledging ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> :
                         isAcknowledged ? <CheckCircle className="mr-2 h-4 w-4" /> : null}
                        {isAcknowledging ? 'Submitting...' : isAcknowledged ? 'Acknowledged' : 'Acknowledge'}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Acknowledgement</AlertDialogTitle>
                        <AlertDialogDescription>
                          I acknowledge that I have read, understood, and agree to comply with the "{policy.title}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleAcknowledge(policy)}>Confirm</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
            <div className="flex-grow overflow-auto">
              <iframe
                src={selectedPolicy.pdfUrl}
                className="w-full h-full"
                title={selectedPolicy.title}
              />
            </div>
          )}
          <DialogFooter className="pt-4 flex-wrap gap-2">
            <Button variant="outline" asChild>
                <a href={selectedPolicy?.pdfUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                </a>
            </Button>
             <Button variant="outline" asChild>
                <a href={`mailto:?subject=Company Policy: ${selectedPolicy?.title}&body=Please find our company policy document attached here: ${selectedPolicy?.pdfUrl}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
