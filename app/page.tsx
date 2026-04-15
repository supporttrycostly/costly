"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { SlideUp } from "@/components/animations/SlideUp";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  Calculator,
  Eye,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Users,
  CheckCircle2,
  Lock,
  BrainCircuit,
  Sparkles,
  LayoutDashboard,
  Users2,
  X,
  FileText,
  AlertTriangle,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

// Using Lucide icons to avoid any missing imports or issues with the original design logic
export default function LandingPage() {


  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff] text-[#111111] overflow-x-hidden pt-16">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative px-4 pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden flex flex-col items-center justify-center text-center">
          {/* Subtle background glow effect for an upscale SaaS look */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-zinc-100/50 rounded-full blur-[100px] -z-10 pointer-events-none" />

          <SlideUp yOffset={20}>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-zinc-100 border border-zinc-200 text-sm font-medium text-zinc-600">
              <span className="flex w-2 h-2 rounded-full bg-[#DC2626]"></span>
              Instant Financial Clarity
            </div>
          </SlideUp>

          <SlideUp yOffset={20} delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1]">
              See your estimated child support — <span className="text-zinc-400">and what you may have left each month.</span>
            </h1>
          </SlideUp>

          <SlideUp yOffset={20} delay={0.2}>
            <p className="mt-6 text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto font-medium">
              Understand what divorce may really cost you before you make expensive decisions. Get a 60-second estimate, see your projected cash flow, and explore how custody, income, and expenses may change the outcome.
            </p>
          </SlideUp>

          <SlideUp yOffset={20} delay={0.3}>
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 justify-center">
              <Button asChild size="lg" className="bg-[#111111] hover:bg-zinc-800 text-white rounded-2xl px-10 h-16 text-sm font-black uppercase tracking-widest w-full sm:w-auto group shadow-2xl shadow-black/10 transition-all active:scale-95">
                <Link href="/run" className="flex items-center gap-3">
                  Calculate My Remaining Cash Flow
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Free Instant Cash Flow Estimate</p>
              </div>
            </div>
          </SlideUp>

          <SlideUp yOffset={20} delay={0.4}>
            <div className="mt-12 flex justify-center">
              <Link href="/california-child-support" className="inline-flex items-center gap-2 group cursor-pointer transition-all hover:opacity-100">
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 group-hover:text-[#111111] transition-colors italic">Specialized: California Guidelines 2026</span>
                 <ArrowRight className="w-3 h-3 text-zinc-300 group-hover:text-[#111111] group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </SlideUp>
        </section>

        {/* SOCIAL PROOF */}
        <FadeIn delay={0.5}>
          <section className="border-y border-zinc-100 bg-zinc-50/50 py-10">
            <div className="container">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-zinc-200 border-2 border-white flex items-center justify-center text-zinc-400 font-bold text-xs ring-1 ring-black/5 shadow-sm">
                        <Users className="w-4 h-4" />
                      </div>
                    ))}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lg">1,200+</p>
                    <p className="text-xs text-zinc-500 font-medium">Trusted Users</p>
                  </div>
                </div>

                <div className="hidden md:block w-px h-12 bg-zinc-200"></div>

                <div className="text-left flex items-start gap-4">
                  <ShieldCheck className="w-10 h-10 text-[#16A34A] shrink-0" />
                  <div>
                    <p className="font-bold text-lg">Total Discretion</p>
                    <p className="text-xs text-zinc-500 font-medium whitespace-nowrap">Protected financial modeling</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* HOW IT WORKS */}
        <section className="py-24 bg-white">
          <div className="container">
            <SlideUp>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Stop guessing. Get clear in 3 simple steps.</h2>
                <p className="mt-4 text-zinc-600 text-lg">Stop relying on expensive lawyer guesswork. Get high-fidelity estimates that show you exactly what's left after child support.</p>
              </div>
            </SlideUp>

            <div className="grid md:grid-cols-3 gap-8 relative">
              <SlideUp delay={0.1} className="relative z-10 flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-white border border-zinc-100 hover:border-zinc-300 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">
                <div className="w-20 h-20 rounded-3xl bg-zinc-50 border border-zinc-100 shadow-sm flex items-center justify-center mb-8">
                  <Calculator className="w-8 h-8 text-[#111111]" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">1. Simple Input</h3>
                <p className="mt-4 text-sm text-zinc-500 font-medium leading-relaxed">Enter your income, custody percentage, and monthly fixed costs into our precision calculator.</p>
              </SlideUp>

              <SlideUp delay={0.2} className="relative z-10 flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-white border border-zinc-100 hover:border-zinc-300 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">
                <div className="w-20 h-20 rounded-3xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-8">
                  <Eye className="w-8 h-8 text-[#16A34A]" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">2. Instant Visibility</h3>
                <p className="mt-4 text-sm text-zinc-500 font-medium leading-relaxed">Instantly view your estimated child support obligations and see how they impact your monthly bottom line.</p>
              </SlideUp>

              <SlideUp delay={0.3} className="relative z-10 flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-[#111111] text-white transition-all shadow-2xl hover:-translate-y-1">
                <div className="w-20 h-20 rounded-3xl bg-white/10 border border-white/10 flex items-center justify-center mb-8">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">3. Protect What's Left</h3>
                <p className="mt-4 text-sm text-zinc-400 font-medium leading-relaxed">Unlock scenario modeling and spousal maintenance analysis to ensure you don't overpay or leave yourself stranded.</p>
              </SlideUp>
            </div>
          </div>
        </section>

        {/* REALITY SCORE & PDF PREVIEW - NEW SECTION */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="container max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* column 1: Reality Score Explanation */}
              <SlideUp>
                <div className="space-y-8">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#EAB308] mb-4 inline-block">Impact Severity Index</span>
                    <h2 className="text-4xl font-black tracking-tight mb-6">Can you survive your settlement?</h2>
                    <p className="text-zinc-500 text-lg leading-relaxed font-medium">
                      Our proprietary Reality Score measures the severity of financial impact on your new life. Know exactly how much pressure your proposed settlement will create.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100/50">
                      <div className="w-10 h-10 rounded-full bg-[#16A34A] flex items-center justify-center text-white">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="font-black text-sm uppercase tracking-tight text-[#16A34A]">Sustainable</p>
                         <p className="text-xs text-zinc-600 font-medium">Low financial risk. Your income covers your new lifestyle.</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-yellow-50 border border-yellow-100/50">
                      <div className="w-10 h-10 rounded-full bg-[#EAB308] flex items-center justify-center text-white">
                        <Info className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="font-black text-sm uppercase tracking-tight text-[#EAB308]">Financial Pressure</p>
                         <p className="text-xs text-zinc-600 font-medium">Significant awareness needed. Your margins are tightening.</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-50 border border-red-100/50">
                      <div className="w-10 h-10 rounded-full bg-[#DC2626] flex items-center justify-center text-white">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="font-black text-sm uppercase tracking-tight text-[#DC2626]">Survival At Risk</p>
                         <p className="text-xs text-zinc-600 font-medium">Urgent adjustment required. Settlement may be unsustainable.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SlideUp>

              {/* column 2: PDF Preview */}
              <SlideUp delay={0.2}>
                <div className="relative group">
                  {/* Decorative background for PDF - Deeper glow */}
                  <div className="absolute -inset-10 bg-emerald-50/20 rounded-full blur-[100px] -z-10 group-hover:bg-emerald-100/30 transition-colors" />
                  
                  <div className="bg-white rounded-[2.5rem] border border-zinc-200 shadow-[0_40px_100px_rgba(0,0,0,0.08)] p-6 md:p-10 relative overflow-hidden group-hover:shadow-[0_40px_120px_rgba(16,163,74,0.05)] transition-all duration-700">
                    
                    {/* CONFIDENTIAL STAMP MOCKUP */}
                    <div className="absolute top-8 right-8 w-20 h-20 border-4 border-rose-500/10 rounded-full flex items-center justify-center -rotate-12 pointer-events-none opacity-40">
                       <span className="text-[8px] font-black text-rose-500/20 uppercase tracking-[0.2em] text-center leading-none">Confidential<br/>Strategic<br/>Review</span>
                    </div>

                    <div className="flex items-center justify-between mb-8 relative z-10">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#111111] flex items-center justify-center text-white shadow-xl shadow-black/10">
                             <FileText className="w-6 h-6 text-emerald-400" />
                          </div>
                          <div>
                             <p className="font-black text-sm uppercase leading-tight tracking-tight">Impact Roadmap</p>
                             <p className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.3em] mt-1">Serial: CA-2026-X942</p>
                          </div>
                       </div>
                       <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-100 shadow-sm">
                          <Lock className="w-3.5 h-3.5 text-zinc-400" />
                       </div>
                    </div>

                    <div className="space-y-4 relative">
                       {/* High Fidelity "Document" Mockup */}
                       <div className="space-y-3 opacity-30 grayscale blur-[1px] relative">
                          <div className="flex items-center gap-2">
                             <div className="h-3 w-10 bg-zinc-200 rounded-md" />
                             <div className="h-1.5 w-full bg-zinc-100 rounded-full" />
                          </div>
                          <div className="space-y-1.5">
                             <div className="h-1.5 w-full bg-zinc-100 rounded-full" />
                             <div className="h-1.5 w-5/6 bg-zinc-100 rounded-full" />
                          </div>
                       </div>

                       {/* The Focus Point: A clear chart area that's then blurred */}
                       <div className="relative h-32 md:h-40 w-full bg-zinc-50 rounded-[2rem] border border-zinc-100 flex flex-col items-center justify-center overflow-hidden">
                          {/* Simulated Chart Logic */}
                          <div className="absolute inset-0 p-6 flex items-end gap-2 md:gap-3 opacity-20">
                             <div className="flex-1 bg-zinc-300 rounded-t-lg h-[40%]" />
                             <div className="flex-1 bg-emerald-500 rounded-t-lg h-[85%] relative">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-5 whitespace-nowrap text-[7px] font-black uppercase tracking-widest text-[#111111]">Target</div>
                             </div>
                             <div className="flex-1 bg-zinc-300 rounded-t-lg h-[60%]" />
                             <div className="flex-1 bg-rose-400 rounded-t-lg h-[70%] relative">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-5 whitespace-nowrap text-[7px] font-black uppercase tracking-widest text-rose-600 italic">Risk</div>
                             </div>
                             <div className="flex-1 bg-zinc-300 rounded-t-lg h-[50%]" />
                          </div>

                          <div className="absolute inset-0 bg-white/60 backdrop-blur-[6px] z-10" />
                          
                          <div className="relative z-20 flex flex-col items-center scale-90 md:scale-100">
                             <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-100 shadow-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                                <Lock className="w-5 h-5 text-[#16A34A]" />
                             </div>
                             <span className="text-[9px] font-black text-zinc-900 uppercase tracking-[0.4em]">Strategic Assessment</span>
                             <div className="mt-1.5 px-2.5 py-0.5 rounded-full bg-[#111111]/5 border border-[#111111]/10">
                                <span className="text-[6px] font-black text-[#111111] uppercase tracking-[0.2em]">California 2026 Model Filter</span>
                             </div>
                          </div>
                       </div>

                       {/* Bottom Metadata */}
                       <div className="flex justify-between items-center opacity-40 blur-[0.5px]">
                          <div className="flex gap-1">
                             <div className="w-5 h-5 rounded bg-zinc-100" />
                             <div className="w-5 h-5 rounded bg-zinc-100" />
                          </div>
                          <div className="h-1.5 w-20 bg-zinc-100 rounded-full" />
                       </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                       <div className="flex items-center gap-2.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Certified Analysis Output</p>
                       </div>
                       <button className="px-5 py-2 bg-[#111111] rounded-full text-[8px] font-black uppercase tracking-[.3em] text-white shadow-2xl shadow-black/20 hover:scale-105 transition-all">
                          Sample Report
                       </button>
                    </div>
                  </div>
                </div>
              </SlideUp>
            </div>
          </div>
        </section>



        {/* THE 4 STRATEGIC PILLARS - NEW ADDITION */}
        <section className="py-24 bg-zinc-50 border-y border-zinc-100 relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50/40 rounded-full blur-[120px] -z-10" />

          <div className="container max-w-6xl">
            <FadeIn>
              <div className="text-center mb-16">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 mb-4 inline-block">The Clarity Framework</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Can you afford your post-divorce life?</h2>
                <p className="text-zinc-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                  Go beyond simple liability. Our tool calculates if your proposed settlement leaves you with enough to actually live on.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* PILLAR 1 */}
                <div className="p-8 rounded-[2.5rem] bg-white border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center mb-6 group-hover:bg-emerald-50 transition-colors">
                    <LayoutDashboard className="w-6 h-6 text-[#111111] group-hover:text-emerald-600" />
                  </div>
                  <h4 className="font-black uppercase tracking-tight text-sm mb-3">Liquidity & Assets</h4>
                  <p className="text-xs text-zinc-500 font-bold leading-relaxed">Model how asset division impacts your monthly cash flow and long-term liquidity.</p>
                </div>

                {/* PILLAR 2 */}
                <div className="p-8 rounded-[2.5rem] bg-white border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center mb-6 group-hover:bg-emerald-50 transition-colors">
                    <TrendingUp className="w-6 h-6 text-[#111111] group-hover:text-emerald-600" />
                  </div>
                  <h4 className="font-black uppercase tracking-tight text-sm mb-3">The Alimony Gap</h4>
                  <p className="text-xs text-zinc-500 font-bold leading-relaxed">Analyze hidden maintenance risks and spousal support exposure that could drain your income.</p>
                </div>

                {/* PILLAR 3 */}
                <div className="p-8 rounded-[2.5rem] bg-white border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center mb-6 group-hover:bg-emerald-50 transition-colors">
                    <Sparkles className="w-6 h-6 text-[#111111] group-hover:text-emerald-600" />
                  </div>
                  <h4 className="font-black uppercase tracking-tight text-sm mb-3">Survival Score</h4>
                  <p className="text-xs text-zinc-500 font-bold leading-relaxed">Our proprietary index that measures if your post-split income can cover your actual lifestyle costs.</p>
                </div>

                {/* PILLAR 4 */}
                <div className="p-8 rounded-[2.5rem] bg-[#111111] text-white shadow-2xl hover:-translate-y-2 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                    <Users2 className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-black uppercase tracking-tight text-sm mb-3">Negotiation Leverage</h4>
                  <p className="text-xs text-zinc-400 font-bold leading-relaxed">Compare scenarios side-by-side to find the optimal settlement that keeps you financially whole.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* FINANCIAL LIFECYCLE - REDESIGNED */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="container max-w-5xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-black tracking-tight mb-4">Your Roadmap to Clarity</h2>
              <p className="text-zinc-500 font-bold uppercase tracking-[.4em] text-[10px]">A Data-Driven Path from Uncertainty to Control</p>
            </div>

            <div className="relative">
              {/* Desktop Connection Line */}
              <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-zinc-100 -z-10">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="h-full bg-emerald-500/30" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 lg:gap-8">
                {/* STAGE 1: FREE */}
                <SlideUp delay={0.1} className="relative group text-center md:text-left">
                  <div className="flex flex-col items-center md:items-start">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform bg-white relative">
                      <Calculator className="w-6 h-6 text-zinc-400" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                    </div>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Stage 01: Free</span>
                    <h5 className="font-black text-sm uppercase mb-3">Instant Check</h5>
                    <p className="text-[11px] text-zinc-500 font-medium leading-relaxed max-w-[200px] mx-auto md:mx-0">
                      Baseline visibility into your child support estimates using standard state formulas.
                    </p>
                  </div>
                </SlideUp>

                {/* STAGE 2: ENTRY */}
                <SlideUp delay={0.3} className="relative group text-center md:text-left">
                  <div className="flex flex-col items-center md:items-start">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform bg-white relative">
                      <LayoutDashboard className="w-6 h-6 text-zinc-400" />
                    </div>
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Stage 02: Initial Review</span>
                    <h5 className="font-black text-sm uppercase mb-3">Financial Clarity</h5>
                    <p className="text-[11px] text-zinc-500 font-medium leading-relaxed max-w-[200px] mx-auto md:mx-0">
                      Unlock net income and expense visibility. Understand your baseline survival numbers.
                    </p>
                  </div>
                </SlideUp>

                {/* STAGE 3: CORE */}
                <SlideUp delay={0.5} className="relative group text-center md:text-left">
                  <div className="flex flex-col items-center md:items-start">
                    <div className="w-14 h-14 rounded-2xl bg-[#111111] flex items-center justify-center mb-6 shadow-2xl scale-110 relative">
                      <Sparkles className="w-6 h-6 text-white" />
                      <div className="absolute -inset-1 border border-[#111111]/20 rounded-2xl -z-10 animate-ping" />
                    </div>
                    <span className="text-[10px] font-black text-[#111111] uppercase tracking-widest mb-2">Stage 03: Full Access</span>
                    <h5 className="font-black text-sm uppercase mb-3 italic underline decoration-[#16A34A] decoration-2 underline-offset-4">Decision Core</h5>
                    <p className="text-[11px] text-zinc-600 font-bold leading-relaxed max-w-[200px] mx-auto md:mx-0">
                      The pivot point. Unlimited simulations, scenario comparisons, and professional risk analysis.
                    </p>
                  </div>
                </SlideUp>

                {/* STAGE 4: SUBSCRIPTION */}
                <SlideUp delay={0.7} className="relative group text-center md:text-left opacity-60 hover:opacity-100 transition-opacity">
                  <div className="flex flex-col items-center md:items-start">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-50 border-2 border-dashed border-zinc-200 flex items-center justify-center mb-6 shadow-sm relative overflow-hidden">
                      <BrainCircuit className="w-6 h-6 text-zinc-300" />
                      <Lock className="absolute top-1 right-1 w-3 h-3 text-zinc-300" />
                    </div>
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Post-Full Access</span>
                    <h5 className="font-black text-sm uppercase mb-3">Ongoing Tactical</h5>
                    <p className="text-[11px] text-zinc-400 font-medium leading-relaxed max-w-[180px] mx-auto md:mx-0 italic">
                      Locked until Stage 03. Includes infinite re-runs, and on-demand AI modeling support.
                    </p>
                  </div>
                </SlideUp>
              </div>
            </div>

            <SlideUp delay={0.9}>
              <div className="mt-20 p-8 rounded-[2rem] bg-zinc-50/50 border border-zinc-100 text-center">
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
                  Start with a <span className="text-[#111111]">Quick Review</span> or dive straight into <span className="text-[#111111]">Detailed Modeling</span>. <br />
                  <span className="text-zinc-400">Our roadmap grows with your negotiation depth.</span>
                </p>
              </div>
            </SlideUp>
          </div>
        </section>
        <section className="py-24 bg-white border-t border-zinc-100">
          <div className="container">
            <SlideUp>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#16A34A] bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 mb-6 inline-block">Invest in certainty before you lose thousands.</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">Know your bottom line</h2>
              </div>
            </SlideUp>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* FREE */}
              <SlideUp delay={0.1}>
                <div className="p-8 rounded-[2rem] border border-zinc-100 bg-white h-full flex flex-col">
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2">Free Preview</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black">$0</span>
                    <span className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Forever</span>
                  </div>
                  <div className="space-y-4 mb-10 flex-1">
                    {[
                      { text: "Estimated Monthly Child Support Only", included: true },
                      { text: "Estimated Post-Support Net Income", included: false },
                      { text: "Estimated Leftover Cash Flow", included: false },
                      { text: "Interactive Dashboard", included: false },
                      { text: "Impact PDF Report", included: false },
                    ].map((f, i) => (
                      <div key={i} className={cn("flex items-center gap-3", !f.included && "opacity-40")}>
                        {f.included ? (
                          <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-red-500 shrink-0" />
                        )}
                        <span className="text-xs font-bold text-zinc-600 uppercase tracking-wide">{f.text}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="outline" className="w-full border-zinc-200 hover:bg-zinc-50 rounded-xl h-12 font-black uppercase tracking-widest text-xs">
                    <Link href="/run">Start Free</Link>
                  </Button>
                </div>
              </SlideUp>

              {/* ENTRY */}
              <SlideUp delay={0.2}>
                <div className="p-8 rounded-[2rem] border border-zinc-200 bg-zinc-50/50 h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-4 py-1 bg-[#16A34A] text-white text-[10px] font-black uppercase tracking-widest rounded-bl-xl">Avoid Early Mistakes</div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2">Quick Review</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black">$19</span>
                    <span className="text-zinc-400 text-sm font-bold uppercase tracking-widest">One-Time</span>
                  </div>
                  <div className="space-y-4 mb-10 flex-1">
                    {[
                      { text: "Estimated Monthly Child Support", included: true },
                      { text: "Estimated Post-Support Net Income", included: true },
                      { text: "Estimated Leftover After Expenses", included: true },
                      { text: "Brief Impact Summary", included: true },
                      { text: "Full Impact Dashboard", included: false },
                      { text: "Detailed Scenario Comparison", included: false },
                    ].map((f, i) => (
                      <div key={i} className={cn("flex items-center gap-3", !f.included && "opacity-40")}>
                        {f.included ? (
                          <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-red-500 shrink-0" />
                        )}
                        <span className="text-xs font-bold text-zinc-600 uppercase tracking-wide">{f.text}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full bg-[#111111] text-white hover:bg-zinc-800 rounded-xl h-12 font-black uppercase tracking-widest text-xs">
                    <Link href="/paywall">Unlock Entry</Link>
                  </Button>
                </div>
              </SlideUp>

              {/* CORE */}
              <SlideUp delay={0.3}>
                <div className="p-8 rounded-[2rem] border-2 border-[#111111] bg-[#111111] text-white h-full flex flex-col shadow-2xl shadow-black/20">
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2">Full Access</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black">$127</span>
                    <span className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Full Access</span>
                  </div>
                  <div className="space-y-4 mb-10 flex-1">
                    {[
                      { text: "Professional Settlement Dashboard", included: true },
                      { text: "Evidence-Based Scenario Comparison", included: true },
                      { text: "Long-Term Sustainability Analysis", included: true },
                      { text: "Decision-Grade Financial Modeling", included: true },
                      { text: "Decision Support Access", included: true },
                      { text: "Unlimited Simulation Cycles", included: true },
                    ].map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-xs font-bold text-zinc-300 uppercase tracking-wide">{f.text}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full bg-white text-black hover:bg-zinc-50 rounded-xl h-12 font-black uppercase tracking-widest text-xs transition-colors">
                    <Link href="/paywall">Secure My Financial Future</Link>
                  </Button>
                </div>
              </SlideUp>
            </div>

            <div className="mt-16 bg-zinc-50 border border-zinc-200 rounded-[2rem] p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center shrink-0 shadow-sm">
                <BrainCircuit className="w-8 h-8 text-[#111111]" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-black uppercase tracking-tight mb-1">Looking for ongoing tactical support?</h4>
                <p className="text-sm text-zinc-500">After unlocking **Full Access**, you can subscribe for **$19/month** to access our **Decision Support**. Re-run simulations as your situation changes and ensure you never sign away your financial future.</p>
              </div>
              <Button variant="outline" asChild className="border-[#111111] text-[#111111] hover:bg-zinc-100 rounded-xl px-6 h-12 font-black uppercase tracking-widest text-xs whitespace-nowrap">
                <Link href="/paywall">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* TRUST UI */}
        <section className="py-24 bg-[#111111] text-white overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#EAB308]/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="container relative z-10 flex flex-col items-center text-center">
            <Lock className="w-16 h-16 text-zinc-400 mb-8" />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">100% Private. 100% Anonymous.</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mb-12">
              Costly is built for maximum discretion. No names, no tracking, and zero data sharing. Your financial survival plan stays between you and the tool.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 opacity-70">
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">256-bit</p>
                <p className="text-sm font-medium uppercase tracking-wider text-zinc-400">Encryption</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">Zero</p>
                <p className="text-sm font-medium uppercase tracking-wider text-zinc-400">Name Required</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">Private</p>
                <p className="text-sm font-medium uppercase tracking-wider text-zinc-400">Previews</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">Delete</p>
                <p className="text-sm font-medium uppercase tracking-wider text-zinc-400">Any Time</p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 bg-white text-center">
          <div className="container max-w-4xl">
            <SlideUp>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Don't sign anything until you know your numbers.</h2>
              <p className="text-xl text-zinc-500 mb-10">Take 60 seconds to see if your proposed settlement is actually sustainable.</p>
              <Button asChild size="lg" className="bg-[#111111] hover:bg-zinc-800 text-white rounded-full px-10 h-16 text-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all">
                <Link href="/run">
                  Get My Instant Estimate
                </Link>
              </Button>
            </SlideUp>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-12 pb-28 sm:pb-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 opacity-100 hover:opacity-100">
            <Link href="/" className="group flex items-center transition-all">
              <Image
                src="/costly-logo.png"
                alt="Costly Logo"
                width={200}
                height={40}
                className="h-12 w-auto object-contain transition-opacity group-hover:opacity-100"
              />
            </Link>

            <div className="flex flex-col items-center md:items-end gap-1">
              <p className="text-sm font-medium text-zinc-600 text-center md:text-left">
                &copy; {new Date().getFullYear()} Costly. Financial clarity for your future.
              </p>
            </div>

            <div className="flex gap-6 text-sm font-medium text-zinc-600">
              <Link href="/california-child-support" className="hover:text-black">California Support</Link>
              <Link href="/privacy" className="hover:text-black">Privacy</Link>
              <Link href="/terms" className="hover:text-black">Terms</Link>
              <Link href="/contact" className="hover:text-black">Contact</Link>
            </div>

          </div>
        </div>
      </footer>

      <div className="sm:hidden fixed bottom-0 left-0 w-full p-4 bg-white/95 backdrop-blur-sm border-t border-zinc-200 z-50 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]">
        <Button asChild size="lg" className="w-full bg-[#111111] text-white rounded-full h-14 text-lg">
          <Link href="/run">Check My Monthly Cash Flow</Link>
        </Button>
      </div>
    </div>
  );
}
