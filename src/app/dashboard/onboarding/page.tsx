
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Department, Role } from "@/lib/types";
import { Check } from "lucide-react";

const onboardingSteps = [
  {
    id: 1,
    title: "Before Day One",
    subtitle: "Pre-Boarding",
    icon: "🧾",
    content: [
      {
        title: "Send Offer & Get Acceptance",
        description: "Once the candidate signs the offer letter, the onboarding process officially begins.",
      },
      {
        title: "Collect Paperwork Early",
        description: "Ask the new hire to complete key employment forms before their first day if possible: Form I-9, Form W-4, direct deposit, emergency contact, and benefit election forms.",
      },
      {
        title: "Determine Eligibility Verification Requirements",
        description: "Complete the I-9 form and keep identification documents on file. For businesses in Florida with >25 employees, use E-Verify to check employment eligibility within 3 business days of hire.",
      },
      {
        title: "Register with Florida Tax Authorities",
        description: "If this is the first hire, set up with the Florida Department of Revenue for reemployment tax and state payroll requirements.",
      },
    ],
  },
  {
    id: 2,
    title: "First Day",
    subtitle: "Official Start",
    icon: "📅",
    content: [
      {
        title: "Complete I-9 Verification In Person",
        description: "Both sections of the I-9 must be completed according to federal deadlines (Section 1 by first day, Section 2 within 3 business days).",
      },
      {
        title: "Orientation Meeting",
        description: "Introduce the company’s mission, culture, policies, schedules, safety procedures, and employee handbook.",
      },
      {
        title: "IT & Workspace Setup",
        description: "Ensure login credentials, email accounts, workstations, keys/badges, and access to tools are ready.",
      },
    ],
  },
  {
    id: 3,
    title: "First Week",
    subtitle: "Early Onboarding",
    icon: "👥",
    content: [
      {
        title: "Role & Expectation Clarification",
        description: "Review the job duties, performance expectations, team structure, and reporting lines.",
      },
      {
        title: "Introduce to Team & Mentor/Buddy",
        description: "Assign a buddy or mentor to help them navigate the workplace and build relationships.",
      },
      {
        title: "Review Benefits & Payroll Procedures",
        description: "Explain health benefits, retirement plans, leave policies, time reporting, and payroll timing.",
      },
      {
        title: "Check In Regularly",
        description: "Have brief daily or frequent check-ins with HR and the direct manager to address questions early on.",
      },
    ],
  },
  {
    id: 4,
    title: "First 30-90 Days",
    subtitle: "Ongoing Onboarding",
    icon: "📆",
    content: [
      {
        title: "Schedule Structured Training",
        description: "Provide a timeline for role-specific training, shadowing, or certification as needed.",
      },
      {
        title: "Regular Feedback & Performance Discussions",
        description: "Set formal check-ins at approximately 30, 60, and 90 days to discuss progress and concerns.",
      },
      {
        title: "Set Goals & Expectations",
        description: "Outline short- and long-term objectives so the employee knows how success is measured.",
      },
    ],
  },
  {
    id: 5,
    title: "Compliance",
    subtitle: "Recordkeeping",
    icon: "📑",
    content: [
      {
        title: "Maintain Documentation",
        description: "Florida employers must keep certain documentation on file: I-9 forms (3+ years after hire/termination), payroll records (names, addresses, wages, dates), and Federal and state tax documents (e.g., W-4).",
      },
    ],
  },
];

export default function OnboardingPage() {
  const { employee, loading } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const canViewPage = employee?.role === 'Administrator' || employee?.department === 'HR';

  useEffect(() => {
    if (!loading && !canViewPage) {
      router.push('/dashboard');
    }
  }, [employee, loading, router, canViewPage]);

  if (loading || !canViewPage) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-24 w-full" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-headline tracking-tight">New Hire Onboarding</h2>
        <p className="text-muted-foreground">Manage the onboarding process for new employees.</p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Onboarding Progress</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex items-center">
            {onboardingSteps.map((step, index) => (
                <React.Fragment key={step.id}>
                <div className="flex flex-col items-center text-center cursor-pointer" onClick={() => handleStepClick(step.id)}>
                    <div
                    className={cn(
                        "flex items-center justify-center w-12 h-12 rounded-full text-xl transition-colors",
                        step.id < currentStep ? "bg-green-600 text-white" : "",
                        step.id === currentStep ? "bg-primary text-primary-foreground" : "",
                        step.id > currentStep ? "bg-muted text-muted-foreground" : ""
                    )}
                    >
                    {step.id < currentStep ? <Check className="w-6 h-6" /> : step.icon}
                    </div>
                    <p className={cn(
                        "mt-2 text-sm font-medium",
                        step.id === currentStep ? "text-primary" : "text-muted-foreground"
                    )}>{step.title}</p>
                    <p className={cn(
                        "text-xs",
                        step.id === currentStep ? "text-primary" : "text-muted-foreground"
                    )}>{step.subtitle}</p>
                </div>
                {index < onboardingSteps.length - 1 && (
                    <div className={cn(
                        "flex-1 h-1 mx-2",
                        step.id < currentStep ? "bg-green-600" : "bg-muted"
                    )} />
                )}
                </React.Fragment>
            ))}
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Employee Information</CardTitle>
          <CardDescription>Enter and review the new hire's details.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Jane Doe" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="jane.d@appintel.com" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" placeholder="Software Engineer" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                    <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="Call Center">Call Center</SelectItem>
                        <SelectItem value="Accounting">Accounting</SelectItem>
                        <SelectItem value="Corporate">Corporate</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                    <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Administrator">Administrator</SelectItem>
                        <SelectItem value="Department Head">Department Head</SelectItem>
                        <SelectItem value="Department Employee">Department Employee</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-bold mb-4 font-headline">{onboardingSteps[currentStep-1].title}: <span className="text-muted-foreground">{onboardingSteps[currentStep-1].subtitle}</span></h3>
        <div className="grid gap-4 md:grid-cols-2">
          {onboardingSteps[currentStep - 1].content.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
       <div className="flex justify-between mt-8">
            <Button
                variant="outline"
                onClick={() => setCurrentStep(s => Math.max(1, s - 1))}
                disabled={currentStep === 1}
            >
                Previous
            </Button>
            <Button
                onClick={() => setCurrentStep(s => Math.min(onboardingSteps.length, s + 1))}
                disabled={currentStep === onboardingSteps.length}
            >
                Next
            </Button>
        </div>

    </div>
  );
}
