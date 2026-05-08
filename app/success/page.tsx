"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const isNew = searchParams.get("isNew") === "true";
  const productType = searchParams.get("productType") || "PLAN";

  return (
    <div className="h-screen w-screen bg-zinc-50 text-[#111111] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* High-Fidelity Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#16A34A]/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#16A34A]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
        {/* PREMIUM LIGHT CARD CONTAINER */}
        <div className="bg-white border border-zinc-100 p-6 md:p-10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.07)] flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* LOGO */}
          <div className="mb-8">
            <Image 
              src="/costly-logo.png" 
              alt="Costly Logo" 
              width={160} 
              height={42} 
              className="h-9 w-auto object-contain opacity-90"
              priority
            />
          </div>

          {/* STATUS ICON GROUP */}
          <div className="relative mb-6">
             <div className="absolute inset-0 bg-[#16A34A] blur-3xl opacity-10 animate-pulse" />
             <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-[#16A34A]/10 border border-[#16A34A]/20">
                <CheckCircle2 className="w-10 h-10 text-[#16A34A] animate-in zoom-in spin-in-12 duration-1000" />
             </div>
          </div>

          {/* MESSAGING */}
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#111111]">
              {isNew ? "Activation Successful" : "Access Upgraded"}
            </h1>
            <p className="text-zinc-500 text-base md:text-lg font-medium leading-relaxed max-w-sm mx-auto">
              {isNew 
                ? "Your financial tool is ready. We just need to secure your account."
                : `Your ${productType.toLowerCase()} features are live.`}
            </p>
          </div>
          
          <div className="w-full space-y-6">
            {isNew && (
              <div className="p-6 md:p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100 text-left relative overflow-hidden group shadow-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#16A34A]/5 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="p-3 rounded-xl bg-[#16A34A] text-white shadow-lg shadow-[#16A34A]/20 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#16A34A] mb-2">Next Steps</p>
                    <div className="space-y-2">
                      <p className="text-sm md:text-base text-[#111111] leading-tight font-bold">
                        1. Check your email for an activation link.
                      </p>
                      <p className="text-sm md:text-base text-[#111111] leading-tight font-bold">
                        2. <span className="underline decoration-[#16A34A] underline-offset-2 decoration-2">Set your password</span> via that link.
                      </p>
                      <p className="text-sm md:text-base text-[#111111] leading-tight font-bold">
                        3. Login to access your dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex flex-col gap-3">
              {isNew ? (
                <Button asChild size="lg" className="bg-[#111111] text-white hover:bg-zinc-800 rounded-[18px] h-14 text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-black/5 transition-all active:scale-95 group border-none">
                  <Link href="/" className="flex items-center justify-center gap-3">
                    Return Home
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="bg-[#16A34A] hover:bg-[#15803d] text-white rounded-[18px] h-14 text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-black/5 transition-all active:scale-95 group">
                  <Link href="/dashboard" className="flex items-center justify-center gap-3">
                    Enter Dashboard
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 opacity-10">
            <div className="w-6 h-px bg-[#111111]" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#111111]">
               Costly Platform
            </span>
            <div className="w-6 h-px bg-[#111111]" />
          </div>
        </div>

        {/* FOOTER SIG */}
        
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-full border-t-2 border-[#16A34A] animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
