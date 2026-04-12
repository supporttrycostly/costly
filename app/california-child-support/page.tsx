"use client";

import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  LockKeyhole, 
  Zap,
  Users,
  Building2,
  Scale
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function CaliforniaLandingPage() {
  const features = [
    "California Family Code Compliance",
    "2026 Adjusted Income Guidelines",
    "Net Disposable Income Analysis",
    "Guideline Child Support Estimates",
    "Hardship Deduction Modeling",
    "Shared Custody Impact Tracking"
  ];

  const { data: session } = useSession();
  const user = session?.user as any;
  const hasPlan = user?.accessType === "ENTRY" || !!user?.hasFullAccess || user?.entryPurchased;
  
  const ctaLink = hasPlan ? "/dashboard" : "/";

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111111] pt-20">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-32 overflow-hidden border-b border-zinc-50">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#EAB308]/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="container max-w-6xl mx-auto px-4 relative z-10 text-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-8">
                <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#16A34A]">California 2026 Statutory Standard</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
                California Child <br className="hidden md:block" /> Support Calculator
              </h1>
              <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto font-medium mb-12">
                Instant. Free. 100% Anonymous. <br /> Navigate the California Family Code with absolute precision.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <Button asChild className="h-16 md:h-20 px-6 md:px-12 rounded-[2rem] bg-[#111111] text-white font-black uppercase tracking-widest transition-all hover:scale-[1.02] shadow-2xl shadow-black/20 group w-full sm:w-auto">
                  <Link href={ctaLink}>
                    Start Calculation
                    <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <div className="flex items-center gap-3 px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#111111]">Active V4.2 Protocol</span>
                </div>
              </div>

              <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16">
                 <div className="flex items-center gap-3 opacity-40">
                    <Scale className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest italic">Law Compliance</span>
                 </div>
                 <div className="flex items-center gap-3 opacity-40">
                    <Users className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest italic">Family Focused</span>
                 </div>
                 <div className="flex items-center gap-3 opacity-40">
                    <Building2 className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest italic">State Verified</span>
                 </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-24 bg-zinc-50/30">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <FadeIn delay={0.2}>
                <h2 className="text-4xl font-black tracking-tight mb-8 leading-tight">
                  Why Strategic Modeling <br /> Matters in California
                </h2>
                <div className="grid grid-cols-1 gap-4">
                   {features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-zinc-100 shadow-sm transition-all hover:shadow-md">
                         <div className="p-2 rounded-xl bg-emerald-50 text-[#16A34A]">
                            <CheckCircle2 className="w-4 h-4" />
                         </div>
                         <p className="text-sm font-bold text-zinc-700">{feature}</p>
                      </div>
                   ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.4} className="relative">
                 <div className="relative p-8 rounded-[3rem] bg-[#111111] shadow-[0_40px_100px_rgba(0,0,0,0.2)] overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="space-y-8 relative z-10">
                       <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                          <Zap className="w-8 h-8 text-emerald-400" />
                       </div>
                       <div>
                          <h3 className="text-2xl font-black text-white mb-2 italic tracking-tight">"A Game Changer for Mediation"</h3>
                          <p className="text-zinc-400 font-bold leading-relaxed text-sm">
                            The California Child Support guidelines are notoriously complex. Costly simplifies the math so you can focus on the strategy.
                          </p>
                       </div>
                       <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-black text-white">$127k+</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Savings Modeled</span>
                       </div>
                    </div>
                 </div>
                 
                 {/* Floating Badge */}
                 <div className="absolute -bottom-6 -right-6 p-6 rounded-3xl bg-white border border-zinc-100 shadow-2xl max-w-[180px] text-center rotate-6">
                    <LockKeyhole className="w-8 h-8 text-[#111111] mx-auto mb-2" />
                    <p className="text-[10px] font-black uppercase tracking-widest leading-tight">Verified Secure Infrastructure</p>
                 </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-32">
          <div className="container max-w-4xl mx-auto px-4">
             <div className="p-12 md:p-20 rounded-[3rem] bg-[#111111] text-center space-y-10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                   <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
                      Get Your Free <br /> Estimate Instantly
                   </h2>
                   <p className="text-zinc-400 text-lg font-medium max-w-xl mx-auto">
                      Join 1,200+ California parents who have secured their financial future using Costly.
                   </p>
                </div>
                <Button asChild className="relative z-10 h-20 px-12 rounded-[2rem] bg-emerald-500 text-white font-black uppercase tracking-widest transition-all hover:bg-emerald-600 hover:scale-[1.05] active:scale-[0.95] shadow-2xl shadow-emerald-500/20 group/btn">
                  <Link href={ctaLink}>
                    Calculate Support Now
                    <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
             </div>
          </div>
        </section>
      </main>

      <footer className="py-16 border-t border-zinc-50 bg-white">
        <div className="container max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <Image 
              src="/costly-logo.png" 
              alt="Costly Logo" 
              width={140} 
              height={36} 
              className="h-8 w-auto object-contain"
            />
          </div>
          <div className="text-center md:text-right space-y-4">
            <div className="flex justify-center md:justify-end gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">
              <Link href="/privacy" className="hover:text-[#111111] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#111111] transition-colors">Terms of Use</Link>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#111111]">© 2026 Precise Financial Software</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
