
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { generateDepartmentSummary } from "@/ai/flows/generate-department-summary";
import { performanceData } from "@/lib/data";
import { BrainCircuit, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Department } from "@/lib/types";

type SupportedDepartment = "IT" | "Call Center";

export default function PerformancePage() {
  const [department, setDepartment] = useState<SupportedDepartment | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateSummary = async () => {
    if (!department) {
      toast({
        title: "No department selected",
        description: "Please choose a department to generate a summary.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSummary(null);

    try {
      const input = {
        departmentName: department,
        performanceData: performanceData[department],
      };
      const result = await generateDepartmentSummary(input);
      setSummary(result.summary);
    } catch (error) {
      console.error("Error generating summary:", error);
      toast({
        title: "Generation Failed",
        description: "Could not generate the performance summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Generate Department Summary</CardTitle>
          <CardDescription>
            Use AI to generate a performance summary for a selected department based on recent data.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Select onValueChange={(value: SupportedDepartment) => setDepartment(value)} value={department || ""}>
            <SelectTrigger className="w-full sm:w-[280px]">
              <SelectValue placeholder="Select a department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="Call Center">Call Center</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleGenerateSummary} disabled={!department || isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
            Generate Summary
          </Button>
        </CardContent>
      </Card>

      {isLoading && (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      )}

      {summary && !isLoading && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">{department} Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
