// app/admin/layout.tsx (Server Component)
export const dynamic = 'force-dynamic';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import whiteIco from '@/public/white-ico.png';

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is authenticated, redirect them away from admin (login/signup) pages
  if (user) {
    return redirect("/protected");
  }

  return (
    <div className="h-screen bg-zinc-950 relative">
      <nav className="bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800/50 sticky top-0 z-50">
        <div className="container mx-auto flex items-center py-4 px-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={whiteIco} alt="Site Icon" width={32} height={32} />
            <span className="text-lg font-medium text-white">Nest</span>
          </Link>
        </div>
      </nav>
      <div className='h-[calc(100vh-80px)] flex items-center justify-center p-6'>
        {children}
      </div>
    </div>
  );
}