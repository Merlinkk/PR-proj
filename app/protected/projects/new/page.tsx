'use client';

import { useState, useEffect } from 'react';
import { X, PlusCircle, Upload, ArrowLeft, FileType, Loader2, Image as ImageIcon, AlertCircle, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '@/components/submit-button';
import { FormMessage, Message } from '@/components/form-message';
import { createProjectAction } from '@/app/actions';
import { useRouter, useSearchParams, ReadonlyURLSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectFormWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white antialiased py-8 px-4 flex flex-col items-center">
      {/* Navbar with glass effect */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl mb-6 bg-white/5 backdrop-blur-lg rounded-xl p-4 sticky top-4 z-10 border border-white/10 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/protected')}
            className="flex items-center gap-2 text-white hover:text-indigo-400 transition-all duration-300 group"
          >
            <span className="bg-white/10 rounded-full p-2 group-hover:bg-indigo-500/20 transition-colors">
              <ArrowLeft size={18} />
            </span>
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-white/70">New Project</span>
          </div>
        </div>
      </motion.nav>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-5xl bg-white/5 backdrop-blur-sm rounded-xl shadow-xl border border-white/10 p-8 space-y-8"
      >
        <div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
          >
            Create New Project
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-sm text-white/70"
          >
            Add details about your latest PR project to showcase your agency's work
          </motion.p>
        </div>

        <ProjectForm searchParams={searchParams} />
      </motion.div>
    </div>
  );
}

function ProjectForm({ searchParams }: { searchParams: ReadonlyURLSearchParams }) {
  const messageObject: Message | null = searchParams ? 
    searchParams.has('error') ? { error: searchParams.get('error') || '' } :
    searchParams.has('success') ? { success: searchParams.get('success') || '' } :
    searchParams.has('message') ? { message: searchParams.get('message') || '' } : 
    null : null;

  return (
    <motion.form 
      className="space-y-8"
      action={createProjectAction}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <motion.div 
          className="space-y-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {/* Project Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white/90 flex items-center gap-2">
              <FileType size={16} className="text-indigo-400" />
              Project Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter project title"
              required
              className="mt-1 bg-white/10 border-white/20 focus:border-indigo-500 text-white placeholder:text-white/50 transition-all duration-300"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-white/90 flex items-center gap-2">
              <PlusCircle size={16} className="text-indigo-400" />
              Category
            </Label>
            <div className="relative">
              <Input
                id="category"
                name="category"
                placeholder="Enter project category"
                required
                className="mt-1 bg-white/10 border-white/20 focus:border-indigo-500 text-white placeholder:text-white/50 transition-all duration-300"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-xs text-white/40">
                e.g. PR Campaign, Media Release
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white/90 flex items-center gap-2">
              <ImageIcon size={16} className="text-indigo-400" />
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your project's objectives, challenges, and approach..."
              rows={5}
              className="mt-1 bg-white/10 border-white/20 focus:border-indigo-500 text-white placeholder:text-white/50 transition-all duration-300 resize-none"
              required
            />
            <div className="text-xs text-white/40 flex justify-end">
              Be descriptive for better client engagement
            </div>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div 
          className="space-y-6"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-white/90 flex items-center gap-2">
              <Upload size={16} className="text-indigo-400" />
              Project Image
            </Label>
            <ImageUploader />
          </div>

          {/* Results */}
          <div className="space-y-2">
            <Label className="text-white/90 flex items-center gap-2">
              <CheckCircle size={16} className="text-indigo-400" />
              Project Results
            </Label>
            <ResultsList />
            <div className="text-xs text-white/40">
              Highlight key metrics and achievements
            </div>
          </div>
        </motion.div>
      </div>

      {/* Form Message */}
      <AnimatePresence>
        {messageObject && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <FormMessage message={messageObject} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <motion.div 
        className="pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
       <SubmitButton
          formAction={createProjectAction}
          pendingText="Creating project...This may take upto 1-2 minutes..."
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          <span>Create Project</span>
        </SubmitButton>
      </motion.div>
    </motion.form>
  );
}

function ImageUploader() {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onloadend = () => {
    // @ts-expect-error null val
      setPreview(reader.result);
      setIsLoading(false);
    };
    
    reader.readAsDataURL(file);
  };
  
  const handleDrag = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.includes('image')) return;
    
    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onloadend = () => {
      // @ts-expect-error null val
      setPreview(reader.result);
      setIsLoading(false);
    };
    
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-1">
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        className="sr-only"
        onChange={handleImageChange}
      />
      
      {isLoading ? (
        <div className="flex flex-col justify-center items-center border-2 border-dashed border-indigo-500/40 rounded-lg h-48 bg-indigo-500/10">
          <Loader2 size={24} className="text-indigo-400 animate-spin mb-2" />
          <span className="text-sm text-indigo-300">Processing image...</span>
        </div>
      ) : !preview ? (
        <label
          htmlFor="image"
          className={`flex flex-col justify-center items-center border-2 border-dashed ${
            dragActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/20 hover:border-indigo-500/50 hover:bg-white/5'
          } rounded-lg h-48 cursor-pointer transition-all duration-300 text-white/60`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <div className="p-3 bg-white/10 rounded-full mb-2">
              <Upload size={20} className={dragActive ? 'text-indigo-400' : 'text-white/60'} />
            </div>
            <span className="text-sm">{dragActive ? 'Drop image here' : 'Click or drag to upload image'}</span>
            <span className="text-xs text-white/40 mt-1">PNG, JPG, GIF up to 10MB</span>
          </div>
        </label>
      ) : (
        <div className="relative h-48 rounded-lg overflow-hidden border border-white/20 group">
          <img src={preview} alt="Preview" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="bg-red-500/80 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-300"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultsList() {
  const [results, setResults] = useState(['']);

  const addResult = () => {
    setResults([...results, '']);
  };
  
  const removeResult = (index : number) => {
    setResults(results.filter((_, i) => i !== index));
  };
  
  const updateResult = (index : number , value : string) => {
    const updated = [...results];
    updated[index] = value;
    setResults(updated);
  };

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {results.map((result, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <div className="flex-grow relative">
              <Input
                name={`results[${index}]`}
                value={result}
                onChange={(e) => updateResult(index, e.target.value)}
                placeholder={`Result #${index + 1} (e.g., 35% increase in media coverage)`}
                className="w-full bg-white/10 border-white/20 focus:border-indigo-500 text-white placeholder:text-white/50 transition-all duration-300 pr-8"
              />
              {results.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => removeResult(index)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-red-400 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      <motion.button
        type="button"
        onClick={addResult}
        className="flex items-center text-sm text-indigo-400 hover:text-indigo-300 transition-colors p-1 pl-0"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <PlusCircle size={16} className="mr-1" />
        Add another result
      </motion.button>
    </div>
  );
}