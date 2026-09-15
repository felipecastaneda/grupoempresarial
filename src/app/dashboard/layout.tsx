
"use client";

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuAction,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Megaphone,
  CircleDollarSign,
  Users,
  Folder,
  LogOut,
  BrainCircuit,
  Loader2,
  BookText,
  Bot,
  Briefcase,
  UserCog,
  ClipboardList,
  HeartPulse,
  Scale,
  CalendarDays,
  Building2,
  ChevronRight,
  HeartHandshake,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useLanguage, type TranslationKey } from '@/contexts/language-context';
import type { LucideIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type DashboardNavItem = {
  href: string;
  icon: LucideIcon;
  labelKey: TranslationKey;
};

type DashboardRoute = {
  href: string;
  labelKey: TranslationKey;
};

const navItems: DashboardNavItem[] = [
  { href: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard' },
  { href: '/dashboard/activities-calendar', icon: CalendarDays, labelKey: 'activitiesCalendar' },
  { href: '/dashboard/announcements', icon: Megaphone, labelKey: 'announcements' },
  { href: '/dashboard/askme', icon: Bot, labelKey: 'askMe' },
  { href: '/dashboard/current-projects', icon: Briefcase, labelKey: 'currentProjects' },
  { href: '/dashboard/directory', icon: Users, labelKey: 'directory' },
  { href: '/dashboard/documents', icon: Folder, labelKey: 'documents' },
  { href: '/dashboard/health-and-safety', icon: HeartPulse, labelKey: 'healthAndSafety' },
  { href: '/dashboard/legal', icon: Scale, labelKey: 'legal' },
  { href: '/dashboard/payroll', icon: CircleDollarSign, labelKey: 'payroll' },
  { href: '/dashboard/performance', icon: BrainCircuit, labelKey: 'performance' },
  { href: '/dashboard/policies-and-procedures', icon: BookText, labelKey: 'policiesAndProcedures' },
];

const privilegedNavItems: DashboardNavItem[] = [
    { href: '/dashboard/onboarding', icon: ClipboardList, labelKey: 'onboarding' }
];

const adminNavItems: DashboardNavItem[] = [
  { href: '/dashboard/users', icon: UserCog, labelKey: 'users' },
  { href: '/dashboard/customer-portal', icon: HeartHandshake, labelKey: 'customerPortal' },
];

const businessUnits = [
  { slug: 'interra', name: 'Interra' },
  { slug: 'meson', name: 'Meson' },
  { slug: 'perunsa', name: 'Perunsa' },
  { slug: 'folium', name: 'Folium' },
  { slug: 'core-industries', name: 'Core Industries' },
];

function DashboardNav({ activeItemHref }: { activeItemHref: string | undefined }) {
  const { employee } = useAuth();
  const { t } = useLanguage();
  const canSeePrivileged = employee?.roles.includes('Administrator') || employee?.department === 'HR';
  const dashboardItem = navItems[0];
  const DashboardIcon = dashboardItem.icon;

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <span className="font-semibold text-lg font-headline text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            Grupo Empresarial
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <Collapsible defaultOpen={true} className="group/collapsible">
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={dashboardItem.href === activeItemHref}
                tooltip={{ children: t[dashboardItem.labelKey], side: 'right' }}
              >
                <a href={dashboardItem.href}>
                  <DashboardIcon />
                  <span>{t[dashboardItem.labelKey]}</span>
                </a>
              </SidebarMenuButton>
              <CollapsibleTrigger asChild>
                <SidebarMenuAction aria-label="Toggle navigation">
                  <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuAction>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {[
                    ...navItems.slice(1),
                    ...(canSeePrivileged ? privilegedNavItems : []),
                    ...(employee?.roles.includes('Administrator') ? adminNavItems : []),
                  ].map((item) => (
                    <SidebarMenuSubItem key={item.href}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={item.href === activeItemHref}
                      >
                        <a href={item.href}>
                          <item.icon />
                          <span>{t[item.labelKey]}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          <li className="px-2 pb-1 pt-4 text-xs font-semibold uppercase tracking-wide text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
            {t.businessUnits}
          </li>
          {businessUnits.map((unit) => (
            <SidebarMenuItem key={unit.name}>
              <SidebarMenuButton
                asChild
                isActive={activeItemHref === `/dashboard/business-units/${unit.slug}`}
                tooltip={{ children: unit.name, side: 'right' }}
              >
                <a href={`/dashboard/business-units/${unit.slug}`}>
                  <Building2 />
                  <span>{unit.name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout, employee } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const canSeePrivileged = employee?.roles.includes('Administrator') || employee?.department === 'HR';
  
  const allNavItems = [
      ...navItems,
      ...(canSeePrivileged ? privilegedNavItems : []),
      ...(employee?.roles.includes('Administrator') ? adminNavItems : []),
      ...businessUnits.map((unit): DashboardRoute => ({
        href: `/dashboard/business-units/${unit.slug}`,
        labelKey: 'businessUnits',
      })),
  ];
  
  const activeItem = allNavItems
    .slice() // Create a copy to avoid mutating the original array
    .sort((a, b) => b.href.length - a.href.length) // Sort by length DESC
    .find(item => pathname.startsWith(item.href));

  const pageTitle = activeItem ? t[activeItem.labelKey] : t.dashboard;

  const avatar = PlaceHolderImages.find(p => p.id === employee?.avatar);
  const displayName = employee?.name || user?.displayName || user.email || 'Employee';

  return (
    <SidebarProvider>
      <Sidebar variant="inset" side="left" collapsible="icon">
        <DashboardNav activeItemHref={activeItem?.href} />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-lg font-semibold md:text-xl font-headline flex-1">
            {pageTitle}
          </h1>
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Avatar className="h-8 w-8">
                  {avatar && <AvatarImage src={avatar.imageUrl} alt={displayName} />}
                  <AvatarFallback>{displayName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <p className="font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground font-normal">{user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>{t.myPortal}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t.logout}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
