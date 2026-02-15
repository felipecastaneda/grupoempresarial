
"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AcknowledgedPolicy } from "@/lib/types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useCollection, useFirebase, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { employees } from "@/lib/data";
import { useAuth } from "@/hooks/use-auth";
import { ArrowLeft } from "lucide-react";

export default function AcknowledgementsPage() {
    const { firestore } = useFirebase();
    const { user, employee } = useAuth();

    const acknowledgementsQuery = useMemoFirebase(() => {
        return query(collection(firestore, "acknowledgements"), orderBy("acknowledgedAt", "desc"));
    }, [firestore]);

    const { data: allAcknowledgements, isLoading } = useCollection<AcknowledgedPolicy>(acknowledgementsQuery);

    const getDepartmentForUser = (userEmail: string) => {
        const foundEmployee = employees.find(e => e.email === userEmail);
        return foundEmployee?.department || "Unknown";
    }

    const filteredAcknowledgements = useMemo(() => {
        if (!allAcknowledgements || !employee || !user) return [];

        if (employee.role === 'Administrator' || employee.department === 'HR') {
            return allAcknowledgements;
        }

        if (employee.role === 'Department Head') {
            const departmentMembers = employees
                .filter(e => e.department === employee.department)
                .map(e => e.email);
            return allAcknowledgements.filter(ack => departmentMembers.includes(ack.userEmail));
        }

        return allAcknowledgements.filter(ack => ack.userId === user.uid);

    }, [allAcknowledgements, employee, user]);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="font-headline">Policy Acknowledgements</CardTitle>
                            <CardDescription>
                                A record of all employee acknowledgements for company policies and procedures.
                            </CardDescription>
                        </div>
                        <Button asChild variant="outline">
                            <Link href="/dashboard/policies-and-procedures">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Policies
                            </Link>
                        </Button>
                    </div>
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
                                    [...Array(5)].map((_, i) =>
                                        <TableRow key={i}>
                                            <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                        </TableRow>
                                    )
                                )}
                                {!isLoading && filteredAcknowledgements.length > 0 ? filteredAcknowledgements.map((ack) => (
                                    <TableRow key={ack.id}>
                                        <TableCell className="font-medium">{ack.policyTitle}</TableCell>
                                        <TableCell>{ack.userName}</TableCell>
                                        <TableCell>{format(new Date(ack.acknowledgedAt), "MMM dd, yyyy 'at' p")}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{getDepartmentForUser(ack.userEmail)}</Badge>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    !isLoading && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center">
                                                No acknowledgements found for your role.
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
