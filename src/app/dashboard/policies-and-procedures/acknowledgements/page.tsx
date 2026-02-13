"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AcknowledgedPolicy } from "@/lib/types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

// Mock data for acknowledged policies
const initialAcknowledgements: AcknowledgedPolicy[] = [
    { id: '1', policyId: '1', policyTitle: 'Code of Conduct', userId: '3', userName: 'Charlie Brown', acknowledgedAt: '2023-09-20T10:00:00Z' },
    { id: '2', policyId: '2', policyTitle: 'Remote Work Policy', userId: '4', userName: 'Diana Miller', acknowledgedAt: '2023-09-21T11:30:00Z' },
];


export default function AcknowledgementsPage() {
    const [acknowledgements, setAcknowledgements] = useState<AcknowledgedPolicy[]>(initialAcknowledgements);

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
                                {acknowledgements.length > 0 ? acknowledgements.map((ack) => (
                                    <TableRow key={ack.id}>
                                        <TableCell className="font-medium">{ack.policyTitle}</TableCell>
                                        <TableCell>{ack.userName}</TableCell>
                                        <TableCell>{format(new Date(ack.acknowledgedAt), "MMM dd, yyyy 'at' p")}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">Development</Badge>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            No acknowledgements recorded yet.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
