"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import PageContainer from "@/components/PageContainer";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useGetAllFeatures } from "@/api/generated/features/features";
import { useUserStore } from "@/lib/stores/userStore";
import { v4 as uuidv4 } from 'uuid';
import { useSetupWebsite } from "@/api/generated/website-execution/website-execution";

const websiteFormSchema = z.object({
  name: z.string().min(1, { message: "Website name is required" }),
  domain: z.string().min(1, { message: "Domain is required" }),
  trackingId: z.string().uuid({ message: "Valid tracking ID is required" }),
  features: z.array(z.string()).optional(),
});

type WebsiteFormValues = z.infer<typeof websiteFormSchema>;

export default function SetupPage() {
  const router = useRouter();
  const { user, setWebsiteAccess } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { data: features, isLoading: featuresLoading } = useGetAllFeatures();
  const { mutate: setupWebsite } = useSetupWebsite();

  const form = useForm<WebsiteFormValues>({
    resolver: zodResolver(websiteFormSchema),
    defaultValues: {
      name: "",
      domain: "",
      trackingId: uuidv4(),
      features: [],
    },
  });

  const onSubmit = (values: WebsiteFormValues) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a website",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    setupWebsite(
      {
        data: {
          name: values.name,
          domains: [values.domain],
          userId: user.id,
          trackingId: values.trackingId,
          features: values.features,
        },
      },
      {
        onSuccess: (websiteData) => {
          setWebsiteAccess([
            {
              websiteId: websiteData.id,
              accessLevel: 'owner',
            },
          ]);
          
          toast({
            title: "Website created",
            description: "Your website has been set up successfully!",
          });
          
          router.push("/");
        },
        onError: (error) => {
          console.error("Error setting up website:", error);
          setIsSubmitting(false);
          toast({
            title: "Error",
            description: "Failed to set up website. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const regenerateTrackingId = () => {
    form.setValue("trackingId", uuidv4());
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Website Setup</h1>
          <p className="text-muted-foreground">
            Set up your website to start using Pulse Analytics
          </p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Create Your Website</CardTitle>
            <CardDescription>
              Enter your website details to get started with analytics tracking
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My Website" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter a name to identify your website
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domain</FormLabel>
                      <FormControl>
                        <Input placeholder="example.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the primary domain of your website (without http:// or https://)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="trackingId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tracking ID</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input {...field} readOnly />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={regenerateTrackingId}
                        >
                          Regenerate
                        </Button>
                      </div>
                      <FormDescription>
                        This unique ID will be used to identify your website in analytics tracking
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-3">
                  <FormLabel>Features</FormLabel>
                  <FormDescription>
                    Select the features you want to enable for your website
                  </FormDescription>
                  
                  {featuresLoading ? (
                    <div>Loading features...</div>
                  ) : features && features.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {features.map((feature) => (
                        <FormField
                          key={feature.id}
                          control={form.control}
                          name="features"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(feature.name)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || [];
                                    if (checked) {
                                      field.onChange([...currentValues, feature.name]);
                                    } else {
                                      field.onChange(
                                        currentValues.filter((value) => value !== feature.name)
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="cursor-pointer">
                                  {feature.name}
                                </FormLabel>
                                {feature.description && (
                                  <FormDescription>
                                    {feature.description}
                                  </FormDescription>
                                )}
                              </div>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  ) : (
                    <div>No features available</div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Setting up..." : "Create Website"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </PageContainer>
  );
}
