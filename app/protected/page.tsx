"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Loader2, RefreshCw, Trash2, Edit2, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { deleteProject, signOutAction } from '../actions';
import { createClient } from '@/utils/supabase/client';
import { CardsSkeleton } from '@/components/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import whiteIco from '@/public/white-ico.png';

type Project = {
  id: number;
  title: string;
  category: string;
};

export default function AdminPage() {
  const [isClient, setIsClient] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
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

  // Fetch project data on mount
  useEffect(() => {
    fetchProjects();
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

  const refreshProjects = async () => {
    setRefreshing(true);
    await fetchProjects();
    setTimeout(() => setRefreshing(false), 600); // Keep spinning for a bit to make animation visible
  };

  // Handle project deletion with animation
  const handleDelete = async (projectId: number) => {
    setDeletingId(projectId);
    try {
      await supabase.from('projects').delete().eq('id', projectId);
      // Filter out the deleted project from state
      setProjects(projects.filter(project => project.id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setDeletingId(null);
    }
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
            {/* <div className="h-8 w-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mr-3"></div> */}
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
            <TabsList className="grid grid-cols-1 bg-white/5 p-1 rounded-xl">
              <TabsTrigger value="projects" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
                Projects
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
          </Tabs>
        </div>
      </div>
    </div>
  );
}