"use client";

import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AcknowledgedPolicy } from "@/lib/types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useCollection, useFirebase, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { employees } from "@/lib/data";

export default function AcknowledgementsPage() {
    const { firestore } = useFirebase();

    const acknowledgementsQuery = useMemoFirebase(() => {
        return query(collection(firestore, "acknowledgements"), orderBy("acknowledgedAt", "desc"));
    }, [firestore]);

    const { data: acknowledgements, isLoading } = useCollection<AcknowledgedPolicy>(acknowledgementsQuery);

    const getDepartmentForUser = (userEmail: string) => {
        const employee = employees.find(e => e.email === userEmail);
        return employee?.department || "Unknown";
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Policy Acknowledgements</CardTitle>
                    <CardDescription>
                        A record of all employee acknowledgements for company policies and procedures.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Policy & Procedure</TableHead>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Date Acknowledged</TableHead>
                                    <TableHead>Department</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading && (
                                    [...Array(3)].map((_, i) =>
                                        <TableRow key={i}>
                                            <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                        </TableRow>
                                    )
                                )}
                                {!isLoading && acknowledgements && acknowledgements.length > 0 ? acknowledgements.map((ack) => (
                                    <TableRow key={ack.id}>
                                        <TableCell className="font-medium">{ack.policyTitle}</TableCell>
                                        <TableCell>{ack.userName}</TableCell>
                                        <TableCell>{format(new Date(ack.acknowledgedAt), "MMM dd, yyyy 'at' p")}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{getDepartmentForUser(ack.userName)}</Badge>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    !isLoading && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center">
                                                No acknowledgements recorded yet.
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
