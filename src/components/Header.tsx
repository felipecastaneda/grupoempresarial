"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Logo } from "./Logo";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { employees } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Loader2, LogOut, LayoutDashboard } from "lucide-react";

export function Header() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const renderAuthSection = () => {
    if (loading) {
      return <Loader2 className="h-6 w-6 animate-spin" />;
    }

    if (!user) {
      return (
        <Button asChild>
          <Link href="/login">Employee Login</Link>
        </Button>
      );
    }

    const employee = employees.find(e => e.email === user.email);
    const avatar = PlaceHolderImages.find(p => p.id === employee?.avatar);
    const displayName = employee?.name || user.displayName || user.email || 'Employee';

    return (
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
    );
  }

  return (
    <header className="bg-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="font-bold text-lg font-headline text-foreground">
              AppIntel Hub
            </span>
          </Link>
          <nav>
            {renderAuthSection()}
          </nav>
        </div>
      </div>
    </header>
  );
}
