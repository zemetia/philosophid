
"use client";
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { auth, googleProvider, signOut } from '@/lib/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function LoginPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-element', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.sculpture-login', {
        opacity: 0,
        x: -50,
        duration: 2,
        ease: 'expo.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSyncUser = async (user: any) => {
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/auth/sync', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          picture: user.photoURL
        })
      });
      
      const data = await response.json();
      
      return data;
    } catch (err) {
      console.error("Sync error:", err);
      return null;
    }
  };

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const dbUser = await handleSyncUser(userCredential.user);
      
      if (!dbUser) {
        throw new Error("Synchronous identity verification failed. Please try again.");
      }

      // If user profile is incomplete, send to wizard
      if (!dbUser.location) {
        router.push('/register');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      // Sign out first to force the Google account picker to always appear
      await signOut(auth);
      const result = await signInWithPopup(auth, googleProvider);
      const dbUser = await handleSyncUser(result.user);
      
      if (!dbUser) {
        throw new Error("Synchronous identity verification failed. Please try again.");
      }
      
      // If user profile is incomplete (new user via Google), send to wizard
      if (!dbUser.location) {
        router.push('/register');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#F4F2ED] flex overflow-hidden pt-16">
      {/* 1. Background Grid - Matching Hero */}
      <div className="absolute inset-0 grid-pattern opacity-40 z-0"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-black/5 z-0"></div>
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/5 z-0"></div>

      {/* 2. Main Composition - Removed ml-24 and added better centering */}
      <div className="relative flex-1 h-full flex flex-col md:flex-row z-10">
        
        {/* Left: Branding & Sculpture Fragment */}
        <div className="flex-1 p-12 md:p-24 flex flex-col justify-between relative z-10">
          <div>
            <div className="reveal-element mb-12">
              <h2 className="text-[10px] uppercase font-bold tracking-[0.8em] mb-4 text-[#4E6E81]">Welcome Back</h2>
              <div className="w-16 h-[2px] bg-black"></div>
            </div>
            
            <h1 className="text-huge font-bold uppercase tracking-tighter text-black flex flex-col pointer-events-none mb-12">
              <span className="reveal-element">Sign</span>
              <span className="reveal-element -mt-[0.2em] outline-text opacity-50">In</span>
            </h1>
          </div>

          <div className="reveal-element max-w-sm mt-auto">
            <p className="font-serif text-2xl italic leading-snug opacity-60">
              &quot;Every recorded thought is a brick in the architecture of the universal mind.&quot;
            </p>
          </div>

          {/* Sculpture Fragment - Matching Hero style */}
          <div className="sculpture-login absolute bottom-0 left-[-10%] w-[120%] h-[60%] pointer-events-none -z-10 sculpture-mask opacity-20">
             <Image 
               src="https://images.unsplash.com/photo-1594142404563-64cccaf5a10f?q=80&w=1500&auto=format&fit=crop" 
               alt="Classical Sculpture Detail" 
               fill
               className="object-contain grayscale"
             />
          </div>
        </div>

        {/* Right: The Form - Brutalist & Rigid */}
        <div className="w-full md:w-[450px] bg-white border-l-2 border-black p-12 md:p-20 flex flex-col justify-center relative z-20">
          <header className="mb-20 reveal-element">
            <h3 className="font-ui text-xs uppercase tracking-[0.6em] font-bold text-[#8E8E8E] mb-2">Account Credentials</h3>
            <div className="w-full h-[1px] bg-black/10"></div>
          </header>

          <form className="space-y-12" onSubmit={handleLogin}>
            <div className="space-y-4 group reveal-element">
              <label className="font-ui text-[9px] uppercase tracking-[0.5em] font-bold text-[#8E8E8E] group-focus-within:text-black transition-colors">
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="YOUR-EMAIL@DOMAIN.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b-2 border-black/10 focus:border-black outline-none py-2 font-ui text-sm uppercase tracking-widest transition-all placeholder:opacity-10"
              />
            </div>

            <div className="space-y-4 group reveal-element">
              <label className="font-ui text-[9px] uppercase tracking-[0.5em] font-bold text-[#8E8E8E] group-focus-within:text-black transition-colors">
                Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b-2 border-black/10 focus:border-black outline-none py-2 font-ui text-sm transition-all placeholder:opacity-10"
              />
            </div>

            {error && <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest">{error}</p>}

            <div className="pt-8 space-y-6 reveal-element">
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-6 font-ui text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-[#4E6E81] transition-all brutalist-border relative group overflow-hidden"
              >
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-[#4E6E81] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
              
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-black/10"></div>
                <span className="flex-shrink mx-4 font-ui text-[8px] uppercase tracking-widest text-[#8E8E8E]">Social Authentication</span>
                <div className="flex-grow border-t border-black/10"></div>
              </div>

              <button 
                type="button"
                onClick={() => handleGoogleLogin()}
                disabled={loading}
                className="w-full bg-white text-black py-6 font-ui text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-black hover:text-white transition-all brutalist-border flex items-center justify-center gap-4"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>
          </form>

          <footer className="mt-24 reveal-element flex flex-col gap-4">
            <div className="flex justify-between items-center font-ui text-[9px] uppercase tracking-widest text-[#8E8E8E]">
               <button type="button" className="hover:text-black transition-colors underline underline-offset-4 decoration-[#7A5C3E]">Forgot Password?</button>
               <button type="button" onClick={() => router.push('/register')} className="hover:text-black transition-colors">Create Account</button>
            </div>
          </footer>
        </div>
      </div>


    </section>
  );
}
