
"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { generateDepartmentSummary } from "@/ai/flows/generate-department-summary";
import { performanceData, personalPerformanceData } from "@/lib/data";
import { BrainCircuit, Loader2, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";

type SupportedDepartment = "IT" | "Call Center";

export default function PerformancePage() {
  const { employee } = useAuth();
  const [selectedDepartment, setSelectedDepartment] = useState<SupportedDepartment | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const canSelectDepartment = employee?.roles.includes("Administrator") || employee?.department === "HR";
  
  const userDepartment = employee?.department as SupportedDepartment;
  const hasDepartmentPerformanceData = userDepartment && Object.keys(performanceData).includes(userDepartment);
  const personalPerformance = employee?.email ? (personalPerformanceData as Record<string, string>)[employee.email] : null;

  const handleGenerateSummary = useCallback(async (deptToSummarize: SupportedDepartment | null) => {
    if (!deptToSummarize) {
      toast({
        title: "No department selected",
        description: "Please choose a department to generate a summary.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSummary(null); // Clear previous summary

    try {
      const input = {
        departmentName: deptToSummarize,
        performanceData: performanceData[deptToSummarize],
      };
      const result = await generateDepartmentSummary(input);
      setSummary(result.summary);
      setSelectedDepartment(deptToSummarize);
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
  }, [toast]);

  useEffect(() => {
    if (!canSelectDepartment && hasDepartmentPerformanceData) {
      handleGenerateSummary(userDepartment);
    }
  }, [canSelectDepartment, hasDepartmentPerformanceData, userDepartment, handleGenerateSummary]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <User className="h-6 w-6" /> Personal Performance
          </CardTitle>
          <CardDescription>
            A summary of your individual performance and contributions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {personalPerformance ? (
            <p className="text-muted-foreground">{personalPerformance}</p>
          ) : (
            <p className="text-muted-foreground">
              Your personal performance summary is not yet available. Please check back later.
            </p>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Department Performance</CardTitle>
          <CardDescription>
            {canSelectDepartment
              ? "Use AI to generate a performance summary for a selected department."
              : "An AI-generated performance summary for your department."}
          </CardDescription>
        </CardHeader>
        {canSelectDepartment && (
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <Select onValueChange={(value: SupportedDepartment) => setSelectedDepartment(value)} value={selectedDepartment || ""}>
              <SelectTrigger className="w-full sm:w-[280px]">
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Call Center">Call Center</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => handleGenerateSummary(selectedDepartment)} disabled={!selectedDepartment || isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
              Generate Summary
            </Button>
          </CardContent>
        )}
        {!canSelectDepartment && !hasDepartmentPerformanceData && (
          <CardContent>
            <p className="text-muted-foreground">Department performance data is not available for your department.</p>
          </CardContent>
        )}
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
            <CardTitle className="font-headline">{selectedDepartment} Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">{summary}</p>
          </CardContent>
        </Card>
      </Card>
      )}
    </div>
  );
}
