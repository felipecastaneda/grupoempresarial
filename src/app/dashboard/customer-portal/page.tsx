"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  updateDoc,
  where,
  type Firestore,
} from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useCollection, useFirebase, useMemoFirebase, type WithId } from "@/firebase";
import type { CustomerDocument, CustomerProfile, CustomerRequest } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, Loader2, Plus, Trash2 } from "lucide-react";

type Panel = "customers" | "documents" | "requests";

const STATUS_LABELS: Record<CustomerRequest["status"], string> = {
  open: "Abierta",
  "in-progress": "En progreso",
  closed: "Cerrada",
};

export default function CustomerPortalAdminPage() {
  const { employee, loading } = useAuth();
  const router = useRouter();
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [panel, setPanel] = useState<Panel>("customers");

  const isAuthorized = !!employee?.roles.includes("Administrator");

  useEffect(() => {
    if (!loading && !isAuthorized) {
      router.push("/dashboard");
    }
  }, [isAuthorized, loading, router]);

  const profilesQuery = useMemoFirebase(() => collection(firestore, "customerProfiles"), [firestore]);
  const { data: profiles, isLoading: areProfilesLoading } = useCollection<CustomerProfile>(profilesQuery);

  const organizations = useMemo(() => {
    const byId = new Map<string, string>();
    (profiles ?? []).forEach((profile) => {
      if (profile.organizationId && profile.organizationId !== "unassigned") {
        byId.set(profile.organizationId, profile.organizationName || profile.organizationId);
      }
    });
    return Array.from(byId.entries()).map(([id, name]) => ({ id, name }));
  }, [profiles]);

  if (loading || !employee || !isAuthorized) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-4 w-1/2" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/5" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-48 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button variant={panel === "customers" ? "default" : "outline"} onClick={() => setPanel("customers")}>
          Clientes
        </Button>
        <Button variant={panel === "documents" ? "default" : "outline"} onClick={() => setPanel("documents")}>
          Documentos
        </Button>
        <Button variant={panel === "requests" ? "default" : "outline"} onClick={() => setPanel("requests")}>
          Solicitudes
        </Button>
      </div>

      {panel === "customers" && (
        <CustomersPanel profiles={profiles} isLoading={areProfilesLoading} firestore={firestore} />
      )}
      {panel === "documents" && <DocumentsPanel organizations={organizations} firestore={firestore} />}
      {panel === "requests" && <RequestsPanel profiles={profiles} firestore={firestore} />}
    </div>
  );
}

function CustomersPanel({
  profiles,
  isLoading,
  firestore,
}: {
  profiles: WithId<CustomerProfile>[] | null;
  isLoading: boolean;
  firestore: Firestore;
}) {
  const { toast } = useToast();
  const [editing, setEditing] = useState<WithId<CustomerProfile> | null>(null);
  const [orgId, setOrgId] = useState("");
  const [orgName, setOrgName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function openDialog(profile: WithId<CustomerProfile>) {
    setEditing(profile);
    setOrgId(profile.organizationId === "unassigned" ? "" : profile.organizationId);
    setOrgName(profile.organizationId === "unassigned" ? "" : profile.organizationName);
  }

  async function handleSave() {
    if (!editing || !orgId.trim() || !orgName.trim()) return;
    setIsSaving(true);
    try {
      await updateDoc(doc(firestore, "customerProfiles", editing.id), {
        organizationId: orgId.trim(),
        organizationName: orgName.trim(),
      });
      toast({ title: "Organización actualizada", description: `${editing.email} ahora pertenece a ${orgName.trim()}.` });
      setEditing(null);
    } catch (error) {
      toast({ title: "No se pudo actualizar la organización", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Clientes</CardTitle>
          <CardDescription>
            Asigna cada cuenta de cliente a su organización para que vea sus documentos y pueda enviar solicitudes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Organización</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  </TableRow>
                )}
                {!isLoading && (profiles?.length ?? 0) === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      Aún no hay clientes registrados.
                    </TableCell>
                  </TableRow>
                )}
                {profiles?.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell>
                      <p className="font-medium">{profile.displayName}</p>
                      <p className="text-sm text-muted-foreground">{profile.email}</p>
                    </TableCell>
                    <TableCell>
                      {profile.organizationId === "unassigned" ? (
                        <Badge variant="outline">Sin asignar</Badge>
                      ) : (
                        <Badge variant="secondary">{profile.organizationName}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openDialog(profile)}>
                        Asignar organización
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Asignar organización</DialogTitle>
            <DialogDescription>{editing?.email}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="org-id">ID de organización</Label>
              <Input id="org-id" value={orgId} onChange={(event) => setOrgId(event.target.value)} placeholder="acme-corp" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-name">Nombre de organización</Label>
              <Input id="org-name" value={orgName} onChange={(event) => setOrgName(event.target.value)} placeholder="Acme Corp" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSaving || !orgId.trim() || !orgName.trim()}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function DocumentsPanel({
  organizations,
  firestore,
}: {
  organizations: { id: string; name: string }[];
  firestore: Firestore;
}) {
  const { toast } = useToast();
  const [selectedOrgId, setSelectedOrgId] = useState("");

  useEffect(() => {
    if (!selectedOrgId && organizations[0]) {
      setSelectedOrgId(organizations[0].id);
    }
  }, [organizations, selectedOrgId]);

  const documentsQuery = useMemoFirebase(
    () => (selectedOrgId ? query(collection(firestore, "customerDocuments"), where("organizationId", "==", selectedOrgId)) : null),
    [firestore, selectedOrgId],
  );
  const { data: documents, isLoading } = useCollection<CustomerDocument>(documentsQuery);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleAdd(event: FormEvent) {
    event.preventDefault();
    if (!selectedOrgId || !name.trim() || !downloadUrl.trim()) return;
    setIsSaving(true);
    try {
      await addDoc(collection(firestore, "customerDocuments"), {
        name: name.trim(),
        description: description.trim(),
        downloadUrl: downloadUrl.trim(),
        organizationId: selectedOrgId,
      });
      setName("");
      setDescription("");
      setDownloadUrl("");
      toast({ title: "Documento agregado" });
    } catch (error) {
      toast({ title: "No se pudo agregar el documento", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(documentId: string) {
    try {
      await deleteDoc(doc(firestore, "customerDocuments", documentId));
      toast({ title: "Documento eliminado" });
    } catch (error) {
      toast({ title: "No se pudo eliminar el documento", variant: "destructive" });
    }
  }

  if (organizations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Documentos</CardTitle>
          <CardDescription>
            Asigna primero una organización a un cliente en la pestaña &ldquo;Clientes&rdquo; para poder compartir documentos.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Documentos compartidos</CardTitle>
          <CardDescription>Selecciona una organización para ver y administrar sus documentos.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="max-w-xs space-y-2">
            <Label>Organización</Label>
            <Select value={selectedOrgId} onValueChange={setSelectedOrgId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una organización" />
              </SelectTrigger>
              <SelectContent>
                {organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Documento</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  </TableRow>
                )}
                {!isLoading && (documents?.length ?? 0) === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      Aún no hay documentos para esta organización.
                    </TableCell>
                  </TableRow>
                )}
                {documents?.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>
                      <a
                        href={document.downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                      >
                        {document.name}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{document.description}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(document.id)} aria-label="Eliminar documento">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-base">Agregar documento</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="doc-name">Nombre</Label>
              <Input id="doc-name" value={name} onChange={(event) => setName(event.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doc-url">Enlace</Label>
              <Input
                id="doc-url"
                type="url"
                value={downloadUrl}
                onChange={(event) => setDownloadUrl(event.target.value)}
                placeholder="https://..."
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="doc-description">Descripción</Label>
              <Textarea id="doc-description" value={description} onChange={(event) => setDescription(event.target.value)} />
            </div>
            <Button type="submit" disabled={isSaving} className="w-fit sm:col-span-2">
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
              Agregar documento
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function RequestsPanel({
  profiles,
  firestore,
}: {
  profiles: WithId<CustomerProfile>[] | null;
  firestore: Firestore;
}) {
  const { toast } = useToast();
  const requestsQuery = useMemoFirebase(
    () => query(collection(firestore, "customerRequests"), orderBy("createdAt", "desc")),
    [firestore],
  );
  const { data: requests, isLoading } = useCollection<CustomerRequest>(requestsQuery);

  const profileById = useMemo(() => {
    const map = new Map<string, WithId<CustomerProfile>>();
    (profiles ?? []).forEach((profile) => map.set(profile.id, profile));
    return map;
  }, [profiles]);

  const [editing, setEditing] = useState<WithId<CustomerRequest> | null>(null);
  const [status, setStatus] = useState<CustomerRequest["status"]>("open");
  const [response, setResponse] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function openDialog(request: WithId<CustomerRequest>) {
    setEditing(request);
    setStatus(request.status);
    setResponse(request.response ?? "");
  }

  async function handleSave() {
    if (!editing) return;
    setIsSaving(true);
    try {
      await updateDoc(doc(firestore, "customerRequests", editing.id), {
        status,
        response: response.trim(),
        respondedAt: new Date().toISOString(),
      });
      toast({ title: "Solicitud actualizada" });
      setEditing(null);
    } catch (error) {
      toast({ title: "No se pudo actualizar la solicitud", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Solicitudes de clientes</CardTitle>
          <CardDescription>Da seguimiento y responde a las solicitudes enviadas desde el portal de clientes.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asunto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Organización</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  </TableRow>
                )}
                {!isLoading && (requests?.length ?? 0) === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      Aún no hay solicitudes.
                    </TableCell>
                  </TableRow>
                )}
                {requests?.map((request) => {
                  const customer = profileById.get(request.userId);
                  return (
                    <TableRow key={request.id}>
                      <TableCell>
                        <p className="font-medium">{request.subject}</p>
                        <p className="line-clamp-1 text-sm text-muted-foreground">{request.message}</p>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{customer?.email ?? request.userId}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {customer?.organizationName ?? request.organizationId}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            request.status === "closed" ? "secondary" : request.status === "in-progress" ? "default" : "outline"
                          }
                        >
                          {STATUS_LABELS[request.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openDialog(request)}>
                          Responder
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing?.subject}</DialogTitle>
            <DialogDescription>{editing?.message}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as CustomerRequest["status"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Abierta</SelectItem>
                  <SelectItem value="in-progress">En progreso</SelectItem>
                  <SelectItem value="closed">Cerrada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="request-response">Respuesta para el cliente</Label>
              <Textarea id="request-response" rows={4} value={response} onChange={(event) => setResponse(event.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
