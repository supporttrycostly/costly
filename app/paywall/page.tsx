"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/layout/Navbar";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import {
  Lock,
  Unlock,
  Check,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Shield,
  CreditCard,
  CheckCircle2,
  LockKeyhole,
  Info,
  TrendingUp,
  Quote,
  Gem,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DashboardPreview } from "@/components/dashboard/DashboardPreview";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

/**
 * PRODUCTION-GRADE PAYWALL
 * Standardized Tiered Pricing following BrandPrompt.txt
 */

function PaywallContent() {
  const { data: session, update: updateSession } = useSession();
  const searchParams = useSearchParams();
  const user = session?.user as any;
  const [isRedirecting, setIsRedirecting] = useState<string | null>(null);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [pendingCheckout, setPendingCheckout] = useState<{productType: string, addOnType?: string} | null>(null);

  // Parse access levels
  const isEntry = user?.accessType === "ENTRY" || user?.entryPurchased;
  const isCore = !!user?.hasFullAccess;
  const isPro = user?.subscriptionStatus === "active";

  // Check for checkout status from URL params
  useEffect(() => {
    const status = searchParams.get("checkout");
    if (status === "success") {
      toast.success("Full Access Unlocked", {
        description: "Your account has been upgraded. Head to your dashboard to start."
      });
      updateSession(); // Refresh session to get new access rights
    } else if (status === "canceled") {
      toast.error("Checkout Canceled", {
        description: "No charges were made. You can try again when you're ready."
      });
    }
  }, [searchParams, updateSession]);

  async function handleCheckout(productType: string, addOnType?: string) {
    // SECURITY GUARDRAIL: Only show onboarding to new users (guests)
    if (!session?.user) {
      setPendingCheckout({ productType, addOnType });
      setIsOnboardingModalOpen(true);
      return;
    }

    executeCheckout(productType, addOnType);
  }

  async function executeCheckout(productType: string, addOnType?: string) {
    setIsRedirecting(productType + (addOnType || ""));
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productType, addOnType }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Payment Error", { description: data.error || "Failed to initiate checkout" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Connection Error", { description: "Secure payment gateway is currently unavailable." });
    } finally {
      setIsRedirecting(null);
    }
  }

  const tiers = [
    {
      id: "ENTRY",
      stageNumber: "01",
      stageTitle: "Meeting My Lawyer Soon",
      stageKey: "Preparation",
      name: "Quick Review",
      price: "19",
      period: "One-time",
      description: "Baseline financial overview for early-stage clarity.",
      whoItsFor: "First attorney consultation is booked. You want to walk in prepared, not paying $400/hr to learn basics. You need your net income breakdown and full liability picture before that meeting.",
      exampleScenario: {
        quote: "My consultation is Thursday",
        context: "Man who wants to show up knowing his numbers. Doesn't want his lawyer to be the first person to tell him what he owes."
      },
      features: [
        { text: "Net Disposable Analysis", included: true },
        { text: "Detailed PDF Report", included: true },
        { text: "Verification Checklists", included: true },
      ],
      buttonText: isEntry ? "Active" : "Unlock Review",
      disabled: isEntry || isCore,
      highlight: false
    },
    {
      id: "CORE",
      stageNumber: "02",
      stageTitle: "In the Middle of It",
      stageKey: "Protection",
      name: "Full Protection",
      price: "127",
      period: "One-time",
      description: "Complete financial control system with full interactive analysis.",
      whoItsFor: "Active divorce. Negotiations are happening. You need to model every scenario — what if custody changes, income shifts, or she gets an aggressive lawyer. You can't afford to be surprised.",
      exampleScenario: {
        quote: "Her lawyer just proposed a split",
        context: "Man who needs to know immediately what that change costs him monthly. Scenario modeling is the difference between winning and losing."
      },
      features: [
        { text: "Reality Risk Score Engine", included: true },
        { text: "Full Financial Modeling", included: true },
        { text: "Interactive Workbench", included: true },
        { text: "Priority Support", included: true },
      ],
      buttonText: isCore ? "Active" : isEntry ? "Complete Unlock" : "Unlock Everything",
      disabled: isCore,
      highlight: true,
      badge: "Most Important"
    },
    {
      id: "SUBSCRIPTION",
      stageNumber: "03",
      stageTitle: "Long Haul Support",
      stageKey: "Ongoing Support",
      name: "AI Advisor",
      price: "19",
      period: "/month",
      description: "Your strategic partner for the 14-month divorce journey.",
      whoItsFor: "Divorce takes 14 months on average. Your situation changes constantly — income, custody, living arrangements. You need an AI advisor available 24/7 to re-run your numbers whenever something shifts.",
      exampleScenario: {
        quote: "I got a new job offer — how does this change everything?",
        context: "Man 6 months into a divorce who needs instant answers without booking another attorney call every time his circumstances change."
      },
      features: [
        { text: "24/7 Strategic AI Chat", included: true },
        { text: "Scenario Comparison", included: true },
        { text: "Deep Financial Insights", included: true },
      ],
      buttonText: isPro ? "Active" : "Secure AI Advisor",
      disabled: isPro,
      prerequisite: !isCore,
      highlight: false
    }
  ];

  // COUNTDOWN LOGIC
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 54, seconds: 21 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111111] pt-20">
      <Navbar />

      {/* ONBOARDING GUARDRAIL MODAL */}
      <Dialog open={isOnboardingModalOpen} onOpenChange={setIsOnboardingModalOpen}>
        <DialogContent className="w-[95vw] sm:w-full lg:max-w-3xl rounded-[2.5rem] p-0 overflow-hidden border-none shadow-[0_40px_100px_rgba(0,0,0,0.2)]">
          <div className="bg-[#111111] text-white p-10 relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
             
             <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center">
                   <Sparkles className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                   <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-2">Secure Onboarding</h2>
                   <DialogTitle className="text-3xl md:text-4xl font-black tracking-tight text-white leading-none">
                     Welcome — You’re Almost There
                   </DialogTitle>
                </div>
             </div>
          </div>

          <div className="p-10 bg-white space-y-8">
             <div className="space-y-6 text-sm text-zinc-600 font-bold leading-relaxed">
                <div className="flex gap-4">
                   <div className="w-6 h-6 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-[10px] font-black shrink-0">1</div>
                   <p>Enter the email address you’d like to use for your Costly account on the <span className="text-[#111111]">Stripe checkout page</span>.</p>
                </div>
                <div className="flex gap-4">
                   <div className="w-6 h-6 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-[10px] font-black shrink-0">2</div>
                   <p>Once payment is confirmed, we’ll send a <span className="text-[#111111]">secure setup link</span> to that email instantly.</p>
                </div>
                <div className="flex gap-4">
                   <div className="w-6 h-6 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-[10px] font-black shrink-0">3</div>
                   <p>If you don’t see it in your inbox, please check your <span className="text-emerald-600 underline underline-offset-4">spam or junk folder</span>.</p>
                </div>
             </div>

             <DialogFooter className="flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => {
                    setIsOnboardingModalOpen(false);
                    if (pendingCheckout) {
                      executeCheckout(pendingCheckout.productType, pendingCheckout.addOnType);
                    }
                  }}
                  className="w-full h-16 rounded-2xl bg-[#111111] text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-black/10 transition-all hover:scale-[1.02] active:scale-[0.98] group"
                >
                  I Understand, Continue to Checkout
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
             </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <main className="flex-1 container max-w-7xl mx-auto px-4 py-24">

        {/* HEADER SECTION */}
        <div className="text-center mb-24">
          <FadeIn>
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-[#EAB308]/20 bg-[#EAB308]/5 mb-10">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#EAB308]">Strategically Engineered for the 14-Month Settlement Journey</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85]">
              The <span className="text-[#EAB308]">Costly</span> <br /> Value Ladder
            </h1>
            
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Four stages mapped to the real emotional journey of a divorcing man. <br className="hidden md:block" /> Each tier solves a specific fear at a specific moment.
            </p>

            {/* STAGE NAVIGATION INDICATORS */}
            <div className="mt-20 flex justify-center items-center gap-4 md:gap-12 overflow-x-auto pb-4 no-scrollbar">
               {tiers.map((t, i) => (
                 <div key={t.id} className="flex flex-col items-center gap-3 shrink-0">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all",
                      i === 0 ? "bg-[#EAB308] text-white border-[#EAB308]" : "bg-white text-zinc-300 border-zinc-100"
                    )}>
                      {t.stageNumber.replace(/^0/, '')}
                    </div>
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest",
                      i === 0 ? "text-[#111111]" : "text-zinc-300"
                    )}>
                      {t.stageKey}
                    </span>
                 </div>
               ))}
            </div>
          </FadeIn>
        </div>

        {/* STRATEGIC PREVIEW SECTION - NEW */}
        <FadeIn delay={0.3} className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Your Decision Dashboard</h2>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">What's waiting behind the lock</p>
          </div>

          <div className="relative group max-w-5xl mx-auto cursor-default">
            {/* The Blur/Reveal Effect */}
            <div className="relative rounded-[3rem] overflow-hidden border border-zinc-100 shadow-2xl transition-all duration-700 group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)]">
              <DashboardPreview isBlurred={true} className="w-full transform transition-all duration-1000 group-hover:blur-sm group-hover:scale-100" />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/10 backdrop-blur-[2px] opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                <div className="p-10 rounded-[2.5rem] bg-white/90 backdrop-blur-md border border-white shadow-2xl text-center max-w-md">
                   <div className="w-16 h-16 rounded-2xl bg-[#111111] text-white flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <LockKeyhole className="w-8 h-8" />
                   </div>
                   <h3 className="text-2xl font-black mb-3 italic">"Stop Guessing, Start Modeling"</h3>
                   <p className="text-sm text-zinc-500 font-bold leading-relaxed mb-6">
                     Access the full interactive tool. Model unlimited scenarios, get your Reality Score, and chat with your AI Decision Guide.
                   </p>
                   <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Secure Access Ready</span>
                   </div>
                </div>
              </div>

              {/* Feature Callouts (Visible on Hover) */}
              <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-[20%] left-[30%] p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-white shadow-xl max-w-[200px] animate-bounce-slow">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest">AI Advisor</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 font-bold">Real-time strategic feedback on every scenario change.</p>
                </div>

                <div className="absolute bottom-[30%] right-[20%] p-4 bg-[#111111]/95 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-xl max-w-[200px] animate-float">
                  <div className="flex items-center gap-2 mb-1 text-white">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Reality Score</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 font-bold">Instantly see if your post-split life is financially sustainable.</p>
                </div>
              </div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute -inset-10 bg-emerald-50/50 rounded-full blur-[120px] -z-10 group-hover:bg-emerald-100/50 transition-colors duration-1000" />
          </div>
        </FadeIn>

        {/* STRATEGIC NOTICE FOR NEW USERS - HIGH IMPORTANCE */}
        <FadeIn delay={0.2} className="mb-16">
          <div className="max-w-3xl mx-auto p-8 md:p-10 rounded-[2.5rem] bg-[#EAB308]/5 border-2 border-[#EAB308]/20 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-[0_20px_50px_rgba(234,179,8,0.05)] relative overflow-hidden group">
            {/* Animated Background Pulse */}
            <div className="absolute inset-0 bg-[#EAB308]/5 animate-pulse" />
            
            <div className="p-4 rounded-2xl bg-[#EAB308] text-white shadow-xl shadow-[#EAB308]/20 shrink-0 relative z-10">
              <Sparkles className="w-6 h-6 animate-spin-slow" />
            </div>
            <div className="relative z-10 text-center md:text-left">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#EAB308] mb-3">Onboarding</p>
              <h4 className="text-xl font-black text-[#111111] mb-3 leading-tight">Welcome — You’re Almost There</h4>
              <div className="space-y-4 text-sm text-zinc-600 font-bold leading-relaxed">
                <p>
                  To make sure your purchase is linked to the right account, please enter the email address you’d like to use for your Costly account on the Stripe checkout page.
                </p>
                <p>
                  Once your payment is confirmed, we’ll send a secure link to that email so you can create your password and get started right away.
                </p>
                <p>
                  If you don’t see the email in your inbox, please check your <span className="text-[#EAB308]">spam or junk folder</span>.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* THE VALUE LADDER */}
        <div className="space-y-6 mb-32">
          {/* TABLE HEADER (Desktop) */}
          <div className="hidden lg:grid grid-cols-[1.5fr_1fr_0.8fr_2fr_2fr] gap-8 px-12 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 border-b border-zinc-50">
            <div>Stage</div>
            <div>Tier</div>
            <div>Price</div>
            <div>Who it's for</div>
            <div>Real-world example</div>
          </div>

          {tiers.map((tier, idx) => (
            <FadeIn key={tier.id} delay={idx * 0.1}>
              <div className={cn(
                "relative group overflow-hidden transition-all duration-500",
                tier.highlight 
                  ? "bg-white ring-2 ring-[#16A34A] shadow-[0_40px_100px_rgba(0,0,0,0.1)] rounded-[3rem] z-20" 
                  : "bg-white hover:bg-zinc-50/50 border border-zinc-100 rounded-[2.5rem]"
              )}>
                
                {tier.highlight && (
                   <div className="absolute top-0 right-12 px-6 py-2 bg-[#16A34A] text-white rounded-b-2xl text-[9px] font-black uppercase tracking-[0.2em] shadow-lg flex items-center gap-2">
                     <Sparkles className="w-3.5 h-3.5" />
                     {tier.badge}
                   </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_0.8fr_2fr_2fr] items-center gap-8 p-8 lg:p-12">
                  
                  {/* STAGE INFO */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Stage {tier.stageNumber}</span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight leading-tight">{tier.stageTitle}</h3>
                  </div>

                  {/* TIER NAME */}
                  <div>
                    <span className={cn(
                      "inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                      tier.id === "ENTRY" ? "bg-emerald-50 text-emerald-600" :
                      tier.id === "CORE" ? "bg-[#111111] text-white" : "bg-emerald-500 text-white"
                    )}>
                      {tier.name}
                    </span>
                  </div>

                  {/* PRICE */}
                  <div className="flex flex-col">
                    <span className="text-4xl font-black tracking-tighter">${tier.price}</span>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">{tier.period}</span>
                  </div>

                  {/* WHO IT'S FOR */}
                  <div className="lg:border-l lg:border-zinc-50 lg:pl-8">
                    <p className="text-sm font-bold text-zinc-500 leading-relaxed max-w-sm">
                      {tier.whoItsFor}
                    </p>
                  </div>

                  {/* REAL WORLD EXAMPLE */}
                  <div className="lg:border-l lg:border-zinc-50 lg:pl-8 relative">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Quote className="w-5 h-5 text-[#EAB308] shrink-0" />
                        <p className="text-sm font-black italic text-[#111111] leading-relaxed">
                          "{tier.exampleScenario.quote}"
                        </p>
                      </div>
                      <p className="text-[11px] text-zinc-400 font-bold leading-relaxed">
                        — {tier.exampleScenario.context}
                      </p>
                    </div>

                    {/* CTA BUTTON (Overlay/Bottom on Mobile) */}
                    <div className="mt-8">
                       <Button
                         disabled={tier.disabled || !!isRedirecting || (tier.prerequisite && !isCore)}
                         onClick={() => handleCheckout(tier.id)}
                         className={cn(
                           "w-full h-14 rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all active:scale-[0.98] shadow-sm",
                           tier.id === "CORE" 
                            ? "bg-[#111111] text-white hover:bg-zinc-800" 
                            : "bg-emerald-500 text-white hover:bg-emerald-600"
                         )}
                       >
                         {isRedirecting === tier.id ? (
                           <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                         ) : (
                           <>
                             {tier.buttonText}
                             <ArrowRight className="w-4 h-4 ml-1" />
                           </>
                         )}
                       </Button>
                    </div>
                  </div>

                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* TRUST SECTION */}
        <section className="pt-20 border-t border-zinc-50 text-center">
          <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300 mb-12">Secured Infrastructure</h3>
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 items-center opacity-30 grayscale pointer-events-none">
            <div className="text-2xl font-black italic tracking-tighter">STRIPE</div>
            <div className="text-2xl font-bold tracking-tight">SECURE</div>
            <div className="text-2xl font-black uppercase tracking-[0.2em]">PCI-DSS</div>
            <div className="text-2xl font-medium line-through">BANK-V2</div>
          </div>

          <div className="mt-20 max-w-4xl mx-auto grid md:grid-cols-2 gap-12 text-left">
            <div className="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100">
              <LockKeyhole className="w-8 h-8 text-[#111111] mb-4" />
              <h4 className="text-sm font-black uppercase tracking-wider mb-2">Privacy First Data</h4>
              <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                Your financial metrics are encrypted and never shared. Strategic modeling is performed on-the-fly and persists only with your explicit saving.
              </p>
            </div>
            <div className="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100">
              <CreditCard className="w-8 h-8 text-[#16A34A] mb-4" />
              <h4 className="text-sm font-black uppercase tracking-wider mb-2">Flexible Lifecycle</h4>
              <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                Unlocks are one-time payments for permanent tool access. Subscriptions can be managed or canceled at any time via your secure Stripe billing portal.
              </p>
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
              <Link href="/privacy" className="hover:text-[#111111] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[#111111] transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-[#111111] transition-colors">Contact</Link>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#111111] mb-1">Costly Financial Tools</p>
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">© 2026 Precise Financial Software</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function PaywallPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-zinc-100 border-t-black rounded-full animate-spin" />
      </div>
    }>
      <PaywallContent />
    </Suspense>
  );
}
