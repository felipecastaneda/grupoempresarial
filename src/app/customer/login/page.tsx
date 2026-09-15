"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import { employees } from "@/lib/data";
import { useFirebase } from "@/firebase/provider";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function CustomerLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login, logout } = useAuth();
  const { firestore, auth } = useFirebase();
  const { toast } = useToast();
  const { t } = useLanguage();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginValues) {
    setIsLoading(true);
    try {
      await login(values.email, values.password);
      const isEmployee = employees.some(
        (employee) => employee.email.toLowerCase() === values.email.toLowerCase(),
      );

      if (isEmployee) {
        await logout();
        throw new Error("employee-account");
      }

      const authenticatedUser = auth.currentUser;
      if (!authenticatedUser) {
        throw new Error("missing-authenticated-user");
      }

      const profileRef = doc(firestore, "customerProfiles", authenticatedUser.uid);
      const existingProfile = await getDoc(profileRef);
      if (!existingProfile.exists()) {
        await setDoc(profileRef, {
          uid: authenticatedUser.uid,
          email: values.email.toLowerCase(),
          displayName: values.email.split("@")[0],
          accountType: "customer",
          organizationId: "unassigned",
          organizationName: "Pending organization setup",
        });
      }

      router.push("/customer");
    } catch (error) {
      const isEmployeeAccount = error instanceof Error && error.message === "employee-account";
      toast({
        title: isEmployeeAccount ? t.customerLoginError : t.customerLoginTitle,
        description: isEmployeeAccount ? t.customerLoginError : "Verifica tus credenciales e inténtalo nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <Link href="/" className="mb-2 text-lg font-semibold text-primary">{t.brand}</Link>
          <CardTitle className="font-headline text-2xl">{t.customerLoginTitle}</CardTitle>
          <CardDescription>{t.customerLoginDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" autoComplete="email" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} autoComplete="current-password" {...field} />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword((visible) => !visible)}
                          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t.customerLoginButton}
              </Button>
            </form>
          </Form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link href="/login" className="text-primary hover:underline">{t.login}</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
