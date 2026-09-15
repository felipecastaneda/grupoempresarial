"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, doc, query, where } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, LogOut, MessageSquareText, Paperclip, ReceiptText } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/contexts/language-context";
import { useFirebase, useMemoFirebase } from "@/firebase/provider";
import { useCollection } from "@/firebase/firestore/use-collection";
import { useDoc } from "@/firebase/firestore/use-doc";
import type { CustomerDocument, CustomerProfile, CustomerRequest } from "@/lib/types";

const STATUS_LABELS: Record<CustomerRequest["status"], string> = {
  open: "Abierta",
  "in-progress": "En progreso",
  closed: "Cerrada",
};

export default function CustomerPortalPage() {
  const { user, employee, loading, logout } = useAuth();
  const { firestore } = useFirebase();
  const { t } = useLanguage();
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const profileRef = useMemoFirebase(
    () => user ? doc(firestore, "customerProfiles", user.uid) : null,
    [firestore, user],
  );
  const { data: profile, isLoading: isProfileLoading } = useDoc<CustomerProfile>(profileRef);

  const documentsQuery = useMemoFirebase(
    () => profile ? query(collection(firestore, "customerDocuments"), where("organizationId", "==", profile.organizationId)) : null,
    [firestore, profile],
  );
  const requestsQuery = useMemoFirebase(
    () => user && profile ? query(
      collection(firestore, "customerRequests"),
      where("organizationId", "==", profile.organizationId),
      where("userId", "==", user.uid),
    ) : null,
    [firestore, profile, user],
  );
  const { data: documents, isLoading: areDocumentsLoading } = useCollection<CustomerDocument>(documentsQuery);
  const { data: requests, isLoading: areRequestsLoading } = useCollection<CustomerRequest>(requestsQuery);

  useEffect(() => {
    if (!loading && !user) router.replace("/customer/login");
  }, [loading, router, user]);

  useEffect(() => {
    if (!loading && employee) router.replace("/dashboard");
  }, [employee, loading, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user || !profile || !subject.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(firestore, "customerRequests"), {
        subject: subject.trim(),
        message: message.trim(),
        status: "open",
        organizationId: profile.organizationId,
        userId: user.uid,
        createdAt: new Date().toISOString(),
      });
      setSubject("");
      setMessage("");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading || isProfileLoading || !user || employee || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.customerPortal}</p>
            <h1 className="mt-2 font-headline text-3xl font-semibold text-foreground">{t.customerWelcome}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{profile.organizationName}</p>
          </div>
          <Button variant="outline" onClick={logout}><LogOut className="mr-2 h-4 w-4" />{t.customerSignOut}</Button>
        </header>

        <div className="grid gap-6 py-10 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <Card>
                <CardHeader><Paperclip className="h-6 w-6 text-accent" /><CardTitle>Documentos compartidos</CardTitle></CardHeader>
                <CardContent>{areDocumentsLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : documents?.length ? <ul className="space-y-3">{documents.map((document) => <li key={document.id}><a className="font-medium text-primary hover:underline" href={document.downloadUrl} target="_blank" rel="noreferrer">{document.name}</a><p className="text-sm text-muted-foreground">{document.description}</p></li>)}</ul> : <p className="text-sm text-muted-foreground">Aún no hay documentos compartidos.</p>}</CardContent>
              </Card>
              <Card>
                <CardHeader><ReceiptText className="h-6 w-6 text-accent" /><CardTitle>Solicitudes</CardTitle></CardHeader>
                <CardContent>{areRequestsLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : requests?.length ? <ul className="space-y-4">{requests.map((request) => <li key={request.id}><p className="font-medium">{request.subject}</p><p className="text-sm text-muted-foreground">{STATUS_LABELS[request.status]}</p>{request.response && <p className="mt-1 rounded-md bg-muted p-2 text-sm text-foreground">{request.response}</p>}</li>)}</ul> : <p className="text-sm text-muted-foreground">Aún no tienes solicitudes.</p>}</CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader><MessageSquareText className="h-6 w-6 text-accent" /><CardTitle>Enviar una solicitud</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Asunto" required />
                  <Textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="¿En qué podemos ayudarte?" required />
                  <Button type="submit" disabled={isSubmitting}>{isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Enviar solicitud</Button>
                </form>
              </CardContent>
            </Card>
          </section>
          <Card className="h-fit bg-primary text-primary-foreground">
            <CardHeader><CardTitle>{t.customerWelcomeText}</CardTitle></CardHeader>
            <CardContent className="leading-7 text-primary-foreground/75">Tu equipo de contacto podrá agregar documentos y dar seguimiento a tus solicitudes desde este portal.</CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
