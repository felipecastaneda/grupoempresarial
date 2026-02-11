"use client";

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Megaphone,
  CircleDollarSign,
  Users,
  Folder,
  LogOut,
  BrainCircuit,
  Loader2,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { employees } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/announcements', icon: Megaphone, label: 'Announcements' },
  { href: '/dashboard/payroll', icon: CircleDollarSign, label: 'Payroll' },
  { href: '/dashboard/directory', icon: Users, label: 'Directory' },
  { href: '/dashboard/documents', icon: Folder, label: 'Documents' },
  { href: '/dashboard/performance', icon: BrainCircuit, label: 'Performance' },
];

function DashboardNav() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { state: sidebarState } = useSidebar();

  const userEmail = useAuth().user?.email;
  const employee = employees.find(e => e.email === userEmail);
  const avatar = PlaceHolderImages.find(p => p.id === employee?.avatar);

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="w-7 h-7 flex-shrink-0 text-primary" />
          <span className="font-semibold text-lg font-headline text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            AppIntel Hub
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
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
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            {avatar && <AvatarImage src={avatar.imageUrl} alt={employee?.name} />}
            <AvatarFallback>{employee?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium truncate">{employee?.name || 'Employee'}</span>
            <span className="text-xs text-sidebar-foreground/70 truncate">{employee?.email || ''}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="w-full justify-start h-10 group-data-[collapsible=icon]:w-10" onClick={logout} aria-label="Logout">
          <LogOut className="h-4 w-4" />
          <span className="group-data-[collapsible=icon]:hidden ml-2">Logout</span>
        </Button>
      </SidebarFooter>
    </>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset" side="left" collapsible="icon">
        <DashboardNav />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-lg font-semibold md:text-xl font-headline flex-1">
            {navItems.find(item => item.href === usePathname())?.label || 'Dashboard'}
          </h1>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
