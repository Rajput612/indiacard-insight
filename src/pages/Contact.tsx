
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsSubmitting(false);
      form.reset();
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-navy mb-3">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about credit cards or our recommendation engine? We're here to help!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="How can we help you?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please describe your inquiry in detail..." 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full md:w-auto bg-navy hover:bg-navy/90" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <div className="bg-navy/10 rounded-full p-3 mr-4">
                      <Mail className="h-6 w-6 text-navy" />
                    </div>
                    <div>
                      <h3 className="font-medium text-navy mb-1">Email Us</h3>
                      <p className="text-gray-600 text-sm mb-2">For general inquiries:</p>
                      <a href="mailto:info@indiacardinsight.com" className="text-blue-600 hover:underline">
                        info@indiacardinsight.com
                      </a>
                      <p className="text-gray-600 text-sm mt-2 mb-2">For partnership opportunities:</p>
                      <a href="mailto:partners@indiacardinsight.com" className="text-blue-600 hover:underline">
                        partners@indiacardinsight.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <div className="bg-navy/10 rounded-full p-3 mr-4">
                      <Phone className="h-6 w-6 text-navy" />
                    </div>
                    <div>
                      <h3 className="font-medium text-navy mb-1">Call Us</h3>
                      <p className="text-gray-600 text-sm mb-2">Weekdays, 9 AM - 6 PM IST:</p>
                      <a href="tel:+918001234567" className="text-blue-600 hover:underline">
                        +91 8001 234 567
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <div className="bg-navy/10 rounded-full p-3 mr-4">
                      <MapPin className="h-6 w-6 text-navy" />
                    </div>
                    <div>
                      <h3 className="font-medium text-navy mb-1">Visit Us</h3>
                      <p className="text-gray-600 text-sm mb-2">Our Office:</p>
                      <address className="not-italic text-gray-700">
                        IndiaCardInsight<br />
                        91 Financial District<br />
                        Bandra Kurla Complex<br />
                        Mumbai, Maharashtra 400051
                      </address>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
