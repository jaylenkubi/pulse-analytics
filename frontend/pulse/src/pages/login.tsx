'use client'

import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/Logo";
import { useLogin } from "@/api/generated/auth/auth";
import { useAuth } from "@/lib/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getGetByQueryWebsiteAccesssQueryKey, useGetByQueryWebsiteAccesss } from "@/api/generated/website-access/website-access";
import { useUserStore } from "@/lib/stores/userStore";
import { useEffect } from "react";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { user, setUser } = useUserStore()

  const { setTokens } = useAuth();
  const { mutate: login, isPending } = useLogin();
  const { data: websiteAccessData, isLoading: websiteAccessLoading } = useGetByQueryWebsiteAccesss({
    where: {
      userId: user?.id,
    },
    relations: {
      website: true,
      user: true
    }
  }, {
    query: {
      queryKey: getGetByQueryWebsiteAccesssQueryKey(),
      enabled: !!user?.id
    }
  });

  const isLoading = isPending || websiteAccessLoading;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  useEffect(() => {
    const isLoginPage = router.pathname === "/login";
    if (isLoginPage && user && websiteAccessData && websiteAccessData.length > 0) {
      router.push("/");
    } else if (isLoginPage && user && !websiteAccessData) {
      router.push("/setup");
    }
  }, [websiteAccessData, user, router.pathname]);

  const onSubmit = (values: LoginFormValues) => {
    login(
      { data: { email: values.email, password: values.password } },
      {
        onSuccess: (data) => {
          setUser({
            id: data.user.id,
            email: data.user.email,
            role: data.user.roles,
            firstName: data.user.firstName,
            lastName: data.user.lastName
          })
          setTokens(data.accessToken, data.refreshToken);
        },
        onError: (error) => {
          form.setError("email", {
            message: "",
          });
          form.setError("password", {
            message: "Incorrect email or password",
          });
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[radial-gradient(circle,rgba(247,247,247,1)_30%,rgba(148,233,226,1)_100%)]">
      <div className="mb-8">
        <Logo size="large" />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}