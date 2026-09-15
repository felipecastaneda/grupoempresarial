"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowRight, Bell, Building2, ClipboardCheck, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

const businessUnits = {
  interra: { name: "Interra", people: 24, departments: 5, openItems: 8 },
  meson: { name: "Meson", people: 18, departments: 4, openItems: 6 },
  perunsa: { name: "Perunsa", people: 31, departments: 6, openItems: 11 },
  folium: { name: "Folium", people: 14, departments: 3, openItems: 4 },
  "core-industries": { name: "Core Industries", people: 42, departments: 7, openItems: 13 },
} as const;

const quickAccess = [
  { href: "/dashboard/announcements", labelKey: "announcements" as const },
  { href: "/dashboard/directory", labelKey: "directory" as const },
  { href: "/dashboard/activities-calendar", labelKey: "activitiesCalendar" as const },
  { href: "/dashboard/documents", labelKey: "documents" as const },
];

export default function BusinessUnitDashboardPage() {
  const { t } = useLanguage();
  const params = useParams<{ unit: string }>();
  const unit = businessUnits[params.unit as keyof typeof businessUnits];

  if (!unit) {
    notFound();
  }

  const metrics = [
    { label: t.unitPeople, value: unit.people, icon: Users },
    { label: t.unitDepartments, value: unit.departments, icon: Building2 },
    { label: t.unitOpenItems, value: unit.openItems, icon: ClipboardCheck },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span>{t.businessUnits}</span>
          </div>
          <h2 className="text-3xl font-bold font-headline">{unit.name}</h2>
          <p className="mt-2 text-muted-foreground">{t.unitDashboardIntro}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Bell className="h-4 w-4" />
          {t.unitAnnouncements}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.unitQuickAccess}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickAccess.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between rounded-md border p-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <span>{t[item.labelKey]}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
