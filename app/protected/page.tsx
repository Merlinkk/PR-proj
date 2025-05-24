"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LogOut, Loader2, RefreshCw, Trash2, Edit2, PlusCircle, Eye, Mail, Building2, User } from 'lucide-react';
import Link from 'next/link';
import { deleteProject, signOutAction } from '../actions';
import { createClient } from '@/utils/supabase/client';
import { CardsSkeleton } from '@/components/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { User as SupabaseUser } from '@supabase/supabase-js';
import Image from 'next/image';
import whiteIco from '@/public/white-ico.png';

type Project = {
  id: number;
  title: string;
  category: string;
};

type Client = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
};

export default function AdminPage() {
  const [isClient, setIsClient] = useState(false);
  const [userData, setUserData] = useState<SupabaseUser | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [clientsRefreshing, setClientsRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deletingClientId, setDeletingClientId] = useState<number | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const supabase = createClient();

  // Fetch user data once on mount
  useEffect(() => {
    setIsClient(true);

    async function fetchUserData() {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user && !error) {
        setUserData(data.user);
      }
    }

    fetchUserData();
  }, []);

  // Fetch project and client data on mount
  useEffect(() => {
    fetchProjects();
    fetchClients();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.from('projects').select();
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    setClientsLoading(true);
    try {
      const { data } = await supabase
        .from('connects')
        .select()
        .order('created_at', { ascending: false });
      setClients(data || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setClientsLoading(false);
    }
  };

  const refreshProjects = async () => {
    setRefreshing(true);
    await fetchProjects();
    setTimeout(() => setRefreshing(false), 600);
  };

  const refreshClients = async () => {
    setClientsRefreshing(true);
    await fetchClients();
    setTimeout(() => setClientsRefreshing(false), 600);
  };

  // Handle project deletion with animation
  const handleDelete = async (projectId: number) => {
    setDeletingId(projectId);
    try {
      await supabase.from('projects').delete().eq('id', projectId);
      setProjects(projects.filter(project => project.id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setDeletingId(null);
    }
  };

  // Handle client deletion with animation
  const handleDeleteClient = async (clientId: number) => {
    setDeletingClientId(clientId);
    try {
      await supabase.from('connects').delete().eq('id', clientId);
      setClients(clients.filter(client => client.id !== clientId));
    } catch (error) {
      console.error("Error deleting client:", error);
    } finally {
      setDeletingClientId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isClient) {
    return null; // Avoid hydration mismatch
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Navbar with glass effect */}
      <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="font-medium flex items-center">
            <Link href="/" className="flex items-center space-x-2 mr-4">
              <Image src={whiteIco} alt="Site Icon" width={32} height={32} />
            </Link>
            {userData ? (
              <span className="text-lg">Welcome, {userData.email?.split('@')[0] || 'User'}</span>
            ) : (
              <span className="text-lg">Welcome</span>
            )}
          </div>
          <form action={signOutAction}>
            <Button 
              type="submit" 
              variant="outline" 
              size="sm" 
              className="border-white/20 hover:bg-white/10 transition-all duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </form>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-white/70">Manage your PR agency content and projects</p>
          </motion.div>

          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList className="grid grid-cols-2 bg-white/5 p-1 rounded-xl">
              <TabsTrigger value="projects" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
                Projects
              </TabsTrigger>
              <TabsTrigger value="clients" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
                Clients
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Project Management</CardTitle>
                      <CardDescription className="text-white/60">Create and manage your PR projects</CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={refreshProjects} 
                        disabled={refreshing || loading}
                        className="border-white/20 hover:bg-white/10 transition-all duration-200"
                      >
                        <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                      </Button>
                      <Link href="/protected/projects/new">
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Project
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                {loading ? (
                  <CardContent className="py-6">
                    <CardsSkeleton />
                  </CardContent>
                ) : (
                  <CardContent>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="rounded-md border border-white/10 overflow-hidden"
                    >
                      <div className="grid grid-cols-12 bg-white/10 p-4 gap-4">
                        <div className="col-span-1 font-medium">#</div>
                        <div className="col-span-4 font-medium">Project Name</div>
                        <div className="col-span-3 font-medium">Category</div>
                        <div className="col-span-4 font-medium text-right">Actions</div>
                      </div>

                      <AnimatePresence>
                        {projects.length === 0 ? (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-12 text-center text-white/50"
                          >
                            <p>No projects found. Create your first project!</p>
                          </motion.div>
                        ) : (
                          projects.map((project) => (
                            <motion.div
                              key={project.id}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-white/10"
                            >
                              <div className="grid grid-cols-12 p-4 gap-4 items-center hover:bg-white/5 transition-colors">
                                <div className="col-span-1 text-white/70">{project.id}</div>
                                <div className="col-span-4 font-medium">{project.title}</div>
                                <div className="col-span-3 text-white/70">
                                  <span className="px-2 py-1 rounded-full bg-white/10 text-xs font-medium">
                                    {project.category}
                                  </span>
                                </div>
                                <div className="col-span-4 flex justify-end gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="border-white/20 hover:bg-white/10 transition-all duration-200"
                                  >
                                    <Edit2 className="h-4 w-4 mr-2" />
                                    Edit
                                  </Button>
                                  <Button 
                                    onClick={() => handleDelete(project.id)} 
                                    variant="outline" 
                                    size="sm" 
                                    disabled={deletingId === project.id}
                                    className="border-red-400/20 hover:bg-red-600/30 bg-red-600/10 text-red-300 transition-all duration-200"
                                  >
                                    {deletingId === project.id ? (
                                      <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Deleting...
                                      </>
                                    ) : (
                                      <>
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </CardContent>
                )}
                <CardFooter className="flex justify-between border-t border-white/10 p-4 text-white/40 text-sm">
                  <p>{projects.length} projects found</p>
                  <p>Last updated: {new Date().toLocaleTimeString()}</p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="clients">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Client Inquiries</CardTitle>
                      <CardDescription className="text-white/60">View and manage client contact requests</CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={refreshClients} 
                        disabled={clientsRefreshing || clientsLoading}
                        className="border-white/20 hover:bg-white/10 transition-all duration-200"
                      >
                        <RefreshCw className={`h-4 w-4 ${clientsRefreshing ? 'animate-spin' : ''}`} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {clientsLoading ? (
                  <CardContent className="py-6">
                    <CardsSkeleton />
                  </CardContent>
                ) : (
                  <CardContent>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="rounded-md border border-white/10 overflow-hidden"
                    >
                      <div className="grid grid-cols-12 bg-white/10 p-4 gap-4">
                        <div className="col-span-1 font-medium">#</div>
                        <div className="col-span-3 font-medium">Name</div>
                        <div className="col-span-3 font-medium">Email</div>
                        <div className="col-span-2 font-medium">Company</div>
                        <div className="col-span-2 font-medium">Date</div>
                        <div className="col-span-1 font-medium text-right">Actions</div>
                      </div>

                      <AnimatePresence>
                        {clients.length === 0 ? (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-12 text-center text-white/50"
                          >
                            <p>No client inquiries found.</p>
                          </motion.div>
                        ) : (
                          clients.map((client) => (
                            <motion.div
                              key={client.id}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-white/10"
                            >
                              <div className="grid grid-cols-12 p-4 gap-4 items-center hover:bg-white/5 transition-colors">
                                <div className="col-span-1 text-white/70">{client.id}</div>
                                <div className="col-span-3 font-medium flex items-center">
                                  <User className="h-4 w-4 mr-2 text-white/50" />
                                  {client.name}
                                </div>
                                <div className="col-span-3 text-white/70 flex items-center">
                                  <Mail className="h-4 w-4 mr-2 text-white/50" />
                                  {client.email}
                                </div>
                                <div className="col-span-2 text-white/70 flex items-center">
                                  <Building2 className="h-4 w-4 mr-2 text-white/50" />
                                  {client.company || 'N/A'}
                                </div>
                                <div className="col-span-2 text-white/70 text-sm">
                                  {formatDate(client.created_at)}
                                </div>
                                <div className="col-span-1 flex justify-end gap-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => setSelectedClient(client)}
                                        className="border-white/20 hover:bg-white/10 transition-all duration-200"
                                      >
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-gray-900 border-white/10 text-white max-w-2xl">
                                      <DialogHeader>
                                        <DialogTitle className="flex items-center">
                                          <User className="h-5 w-5 mr-2" />
                                          Message from {client.name}
                                        </DialogTitle>
                                        <DialogDescription className="text-white/70">
                                          <div className="space-y-2 mt-4">
                                            <div className="flex items-center">
                                              <Mail className="h-4 w-4 mr-2" />
                                              {client.email}
                                            </div>
                                            {client.company && (
                                              <div className="flex items-center">
                                                <Building2 className="h-4 w-4 mr-2" />
                                                {client.company}
                                              </div>
                                            )}
                                            <div className="text-xs text-white/50">
                                              Received on {formatDate(client.created_at)}
                                            </div>
                                          </div>
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="mt-6">
                                        <h4 className="font-medium mb-3">Message:</h4>
                                        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                          <p className="text-white/90 whitespace-pre-wrap leading-relaxed">
                                            {client.message}
                                          </p>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                  <Button 
                                    onClick={() => handleDeleteClient(client.id)} 
                                    variant="outline" 
                                    size="sm" 
                                    disabled={deletingClientId === client.id}
                                    className="border-red-400/20 hover:bg-red-600/30 bg-red-600/10 text-red-300 transition-all duration-200"
                                  >
                                    {deletingClientId === client.id ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </CardContent>
                )}
                <CardFooter className="flex justify-between border-t border-white/10 p-4 text-white/40 text-sm">
                  <p>{clients.length} client inquiries found</p>
                  <p>Last updated: {new Date().toLocaleTimeString()}</p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}