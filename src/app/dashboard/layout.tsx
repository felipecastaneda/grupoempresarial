
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
  Landmark,
  Scale,
  CalendarDays,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/announcements', icon: Megaphone, label: 'Announcements' },
  { href: '/dashboard/payroll', icon: CircleDollarSign, label: 'Payroll' },
  { href: '/dashboard/directory', icon: Users, label: 'Directory' },
  { href: '/dashboard/documents', icon: Folder, label: 'Documents' },
  { href: '/dashboard/current-projects', icon: Briefcase, label: 'Current Projects' },
  { href: '/dashboard/performance', icon: BrainCircuit, label: 'Performance' },
  { href: '/dashboard/policies-and-procedures', icon: BookText, label: 'Policies & Procedures' },
  { href: '/dashboard/askme', icon: Bot, label: 'Ask Me' },
  { href: '/dashboard/health-and-safety', icon: HeartPulse, label: 'Health and Safety' },
  { href: '/dashboard/office-of-the-ceo', icon: Landmark, label: 'Office of the CEO' },
  { href: '/dashboard/legal', icon: Scale, label: 'Legal' },
  { href: '/dashboard/activities-calendar', icon: CalendarDays, label: 'Activities Calendar' },
];

const privilegedNavItems = [
    { href: '/dashboard/onboarding', icon: ClipboardList, label: 'Onboarding' }
];

const adminNavItems = [
  { href: '/dashboard/users', icon: UserCog, label: 'Users' }
];

function DashboardNav({ activeItemHref }: { activeItemHref: string | undefined }) {
  const { employee } = useAuth();
  const canSeePrivileged = employee?.role === 'Administrator' || employee?.department === 'HR';

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Logo className="w-7 h-7 flex-shrink-0 text-primary" />
          <span className="font-semibold text-lg font-headline text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            AppIntel Hub
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={item.href === activeItemHref}
                tooltip={{ children: item.label, side: 'right' }}
              >
                <a href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          {canSeePrivileged && privilegedNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={item.href === activeItemHref}
                tooltip={{ children: item.label, side: 'right' }}
              >
                <a href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          {employee?.role === 'Administrator' && adminNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={item.href === activeItemHref}
                tooltip={{ children: item.label, side: 'right' }}
              >
                <a href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
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

  const canSeePrivileged = employee?.role === 'Administrator' || employee?.department === 'HR';
  
  const allNavItems = [
      ...navItems,
      ...(canSeePrivileged ? privilegedNavItems : []),
      ...(employee?.role === 'Administrator' ? adminNavItems : [])
  ];
  
  const activeItem = allNavItems
    .slice() // Create a copy to avoid mutating the original array
    .sort((a, b) => b.href.length - a.href.length) // Sort by length DESC
    .find(item => pathname.startsWith(item.href));

  const pageTitle = activeItem?.label || 'Dashboard';

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
                <span>My Portal</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
