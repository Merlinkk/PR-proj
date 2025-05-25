"use client";

import { useState, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Send, 
  CheckCircle 
} from 'lucide-react';
import { createContactAction } from '@/app/actions';
import debounce from 'lodash/debounce';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  company: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

// Memoize the form component
const ContactForm = memo(({ onSubmit, isSubmitted }: { onSubmit: (data: FormValues) => void; isSubmitted: boolean }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  });

  // Debounce the form submission
  const debouncedSubmit = useCallback(
    debounce((data: FormValues) => {
      onSubmit(data);
    }, 300),
    [onSubmit]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(debouncedSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jane Smith"
                    className="bg-white/10 border-white/20 text-white focus-visible:ring-white/30"
                    {...field}
                  />
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
                  <Input
                    type="email"
                    placeholder="jane@example.com"
                    className="bg-white/10 border-white/20 text-white focus-visible:ring-white/30"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Company"
                  className="bg-white/10 border-white/20 text-white focus-visible:ring-white/30"
                  {...field}
                />
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
              <FormLabel>Your Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="How can we help you?"
                  className="bg-white/10 border-white/20 text-white focus-visible:ring-white/30 min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-white text-black hover:bg-white/90"
        >
          Send Message
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
});
ContactForm.displayName = 'ContactForm';

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = useCallback((data: FormValues) => {
    setIsLoading(true);
    
    // Convert form data to FormData
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);
    if (data.company) {
      formData.append('company', data.company);
    }
    
    createContactAction(formData);
    
    // Show loading for 2-3 seconds before showing success message
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 5000); // 2.5 seconds loading time
  }, []);

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Lets connect</h2>
          <p className="text-white/70 max-w-3xl mx-auto text-lg">
            Ready to elevate your brand's PR strategy? Let's discuss how we can help you achieve your communications goals.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <FadeIn direction="left">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 h-full">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 bg-white/10 p-3 rounded-md">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Our Office</h4>
                    <p className="text-white/70">EARTH 10001</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 bg-white/10 p-3 rounded-md">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email Us</h4>
                    <p className="text-white/70">hello@nest.com<br />info@nest.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 bg-white/10 p-3 rounded-md">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Call Us</h4>
                    <p className="text-white/70">+91 0000-000-000<br />+91 0000-000-000</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-4">Working Hours</h3>
                <p className="text-white/70 mb-2">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-white/70">Weekends: By appointment only</p>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="right">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-8"
                  >
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-white/70 text-center">Sending your message...</p>
                  </motion.div>
                ) : isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-8"
                  >
                    <CheckCircle className="h-16 w-16 text-green-400 mb-4" />
                    <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                    <p className="text-white/70 text-center">
                      Thank you for reaching out. We'll get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <ContactForm onSubmit={handleSubmit} isSubmitted={isSubmitted} />
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}