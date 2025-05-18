"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Users, FolderKanban, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // In a real app, you would verify authentication here
  }, []);

  if (!isClient) {
    return null; // Avoid hydration mismatch
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-white/70">Manage your PR agency content and projects</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 bg-white/5 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Total Projects", value: "24", icon: <FolderKanban className="h-5 w-5" />, change: "+2 this month" },
                { title: "Active Clients", value: "18", icon: <Users className="h-5 w-5" />, change: "+3 from last month" },
                { title: "Pending Messages", value: "7", icon: <MessageSquare className="h-5 w-5" />, change: "5 new today" },
                { title: "Media Mentions", value: "152", icon: <BarChart className="h-5 w-5" />, change: "+28% increase" },
              ].map((stat, index) => (
                <Card key={index} className="bg-white/5 border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <div className="bg-white/10 p-2 rounded-md">{stat.icon}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-white/70 mt-1">{stat.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle>Recent Projects</CardTitle>
                  <CardDescription>Your most recently created projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["TechVision Rebrand Launch", "EcoStyle Product Launch", "HealthPlus Crisis Management"].map((project, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-md">
                        <span>{project}</span>
                        <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-white/20 hover:bg-white/10">
                    View All Projects
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>Latest contact form submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "John Smith", email: "john@company.com", time: "2 hours ago" },
                      { name: "Sarah Johnson", email: "sarah@startup.com", time: "4 hours ago" },
                      { name: "Michael Lee", email: "mike@enterprise.co", time: "Yesterday" },
                    ].map((message, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-md">
                        <div>
                          <p className="font-medium">{message.name}</p>
                          <p className="text-sm text-white/70">{message.email}</p>
                        </div>
                        <p className="text-xs text-white/50">{message.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-white/20 hover:bg-white/10">
                    View All Messages
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Project Management</CardTitle>
                    <CardDescription>Create and manage your PR projects</CardDescription>
                  </div>
                  <Link href="/admin/projects/new">
                    <Button>Add New Project</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-white/10 overflow-hidden">
                  <div className="grid grid-cols-12 bg-white/10 p-4 gap-4">
                    <div className="col-span-1 font-medium">#</div>
                    <div className="col-span-4 font-medium">Project Name</div>
                    <div className="col-span-2 font-medium">Category</div>
                    <div className="col-span-2 font-medium">Status</div>
                    <div className="col-span-3 font-medium text-right">Actions</div>
                  </div>
                  
                  {[
                    { id: 1, name: "TechVision Rebrand Launch", category: "Brand Strategy", status: "Completed" },
                    { id: 2, name: "EcoStyle Product Launch", category: "Product Launch", status: "Active" },
                    { id: 3, name: "HealthPlus Crisis Management", category: "Crisis Management", status: "Active" },
                    { id: 4, name: "Global Finance Summit", category: "Event PR", status: "Planning" },
                    { id: 5, name: "FoodDelight Influencer Campaign", category: "Influencer Marketing", status: "Completed" },
                  ].map((project) => (
                    <div key={project.id} className="grid grid-cols-12 p-4 gap-4 border-t border-white/10">
                      <div className="col-span-1">{project.id}</div>
                      <div className="col-span-4 font-medium">{project.name}</div>
                      <div className="col-span-2">{project.category}</div>
                      <div className="col-span-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          project.status === "Completed" ? "bg-green-500/20 text-green-400" :
                          project.status === "Active" ? "bg-blue-500/20 text-blue-400" :
                          "bg-orange-500/20 text-orange-400"
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="col-span-3 flex justify-end space-x-2">
                        <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10">Edit</Button>
                        <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Client Management</CardTitle>
                <CardDescription>Manage client information and relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="py-10 text-center text-white/70">Client management interface will be implemented here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Message Center</CardTitle>
                <CardDescription>Manage contact form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="py-10 text-center text-white/70">Message center interface will be implemented here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}