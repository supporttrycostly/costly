"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCalculator } from "@/lib/store/CalculatorContext";
import { runCalculationEngine, CalculationResult } from "@/lib/calculator";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Users,
  Home,
  ShieldCheck,
  GraduationCap,
  Droplets,
  Heart,
  FileText,
  Lock,
  ArrowUpRight,
  TrendingUp,
  PieChart,
  History as HistoryIcon,
  Loader2,
  AlertTriangle,
  Sparkles,
  Wallet
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/**
 * Entry ($19) Tier Dashboard
 * Focus: High-precision calculation engine (Estimate Tab).
 * Results: Expanded Summary, but Locked Analytics.
 */

export function EntryDashboard({ userName, isCore }: { userName: string; isCore: boolean }) {
  const { data, updateData } = useCalculator();
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isRedirecting, setIsRedirecting] = useState<string | null>(null);

  async function handleCheckout(productType: string, addOnType?: string) {
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

  // Expanded fields for Entry/Core
  const [mortgage, setMortgage] = useState(0);
  const [childcare, setChildcare] = useState(0);
  const [school, setSchool] = useState(0);
  const [activities, setActivities] = useState(0);
  const [utilities, setUtilities] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [other, setOther] = useState(0);

  // Recalculate on any change
  useEffect(() => {
    const totalExpenses = mortgage + childcare + school + activities + utilities + insurance + other;

    // Sync to global state with granular fields
    updateData({
      expenses: totalExpenses,
      mortgage,
      childcare,
      school,
      activities,
      utilities,
      insurance,
      otherExpenses: other
    });

    const calculation = runCalculationEngine({
      ...data,
      expenses: totalExpenses,
      mortgage,
      childcare,
      school,
      activities,
      utilities,
      insurance,
      otherExpenses: other
    });
    setResult(calculation);
  }, [mortgage, childcare, school, activities, utilities, insurance, other, data.incomeOwn, data.incomeSpouse, data.childrenCount, data.custodyPercentage]);

  const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-stretch px-4 lg:px-0 pb-20">

      {/* Left: Deep Data Input (The Engine) */}
      <div className="lg:col-span-7 flex flex-col">
        <section className="flex-1 bg-white rounded-[2rem] lg:rounded-3xl p-6 lg:p-8 border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-5 h-5 text-[#111111]" />
            <h3 className="text-xl font-black text-[#111111]">Detailed Financial Parameters</h3>
          </div>

          <div className="space-y-10">
            {/* Income Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Monthly Income (Own)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300 w-4 h-4" />
                  <Input
                    type="number"
                    className="pl-9 h-12 bg-zinc-50/50 rounded-xl"
                    value={data.incomeOwn || ""}
                    onChange={(e) => updateData({ incomeOwn: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Monthly Income (Spouse)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300 w-4 h-4" />
                  <Input
                    type="number"
                    className="pl-9 h-12 bg-zinc-50/50 rounded-xl"
                    value={data.incomeSpouse || ""}
                    onChange={(e) => updateData({ incomeSpouse: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>

            {/* Custody Slider */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Custody Allocation</Label>
                <span className="text-sm font-black text-[#111111]">{data.custodyPercentage}%</span>
              </div>
              <Slider
                defaultValue={[data.custodyPercentage]}
                max={100}
                onValueChange={(vals) => updateData({ custodyPercentage: vals[0] })}
              />
            </div>

            {/* EXPENSES BREAKDOWN - THE $19 VALUE */}
            <div className="pt-6 border-t border-zinc-50 space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#16A34A]">Unlocked Detailed Expenses</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Home className="w-3.5 h-3.5 text-zinc-300" />
                    <Label className="text-xs font-bold text-zinc-600">Housing/Mortgage</Label>
                  </div>
                  <Input
                    type="number"
                    className="h-10 bg-zinc-50/50"
                    value={mortgage || ""}
                    onChange={(e) => setMortgage(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-3.5 h-3.5 text-zinc-300" />
                    <Label className="text-xs font-bold text-zinc-600">Utilities</Label>
                  </div>
                  <Input
                    type="number"
                    className="h-10 bg-zinc-50/50"
                    value={utilities || ""}
                    onChange={(e) => setUtilities(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-zinc-300" />
                    <Label className="text-xs font-bold text-zinc-600">Childcare</Label>
                  </div>
                  <Input
                    type="number"
                    className="h-10 bg-zinc-50/50"
                    value={childcare || ""}
                    onChange={(e) => setChildcare(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-zinc-300" />
                    <Label className="text-xs font-bold text-zinc-600">Education</Label>
                  </div>
                  <Input
                    type="number"
                    className="h-10 bg-zinc-50/50"
                    value={school || ""}
                    onChange={(e) => setSchool(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-zinc-300" />
                    <Label className="text-xs font-bold text-zinc-600">Child Activities</Label>
                  </div>
                  <Input
                    type="number"
                    className="h-10 bg-zinc-50/50"
                    value={activities || ""}
                    onChange={(e) => setActivities(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-300" />
                    <Label className="text-xs font-bold text-zinc-600">Insurance</Label>
                  </div>
                  <Input
                    type="number"
                    className="h-10 bg-zinc-50/50"
                    value={insurance || ""}
                    onChange={(e) => setInsurance(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-zinc-300" />
                    <Label className="text-xs font-bold text-zinc-600">Other Obligations</Label>
                  </div>
                  <Input
                    type="number"
                    className="h-10 bg-zinc-50/50"
                    value={other || ""}
                    onChange={(e) => setOther(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PREMIUM ADD-ONS PREVIEW - CONVERSION TRIGGER */}
        <section className="bg-white rounded-[2rem] lg:rounded-3xl p-6 lg:p-8 border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group mt-8">
           {/* Subtle glass overlay for locked feel */}
           <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] z-10 pointer-events-none" />
           
           <div className="flex items-center justify-between mb-8 relative z-20">
              <div className="flex items-center gap-2">
                 <Sparkles className="w-4 h-4 text-[#EAB308]" />
                 <h4 className="text-[10px] uppercase font-black tracking-widest text-[#111111]">Strategic Expansion Modules</h4>
              </div>
              <div className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200">
                 <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Core Required</span>
              </div>
           </div>

           <div className="grid sm:grid-cols-2 gap-4 relative z-20">
              {[
                 { 
                    id: "asset", 
                    label: "Asset Split Simulator", 
                    icon: PieChart, 
                    price: 39,
                    description: "Estimate how property, savings, debt, and major assets may impact your financial picture."
                 },
                 { 
                    id: "retirement", 
                    label: "Retirement Impact", 
                    icon: Wallet, 
                    price: 29,
                    description: "Estimate how divorce may affect retirement accounts and long-term planning."
                 },
                 { 
                    id: "va", 
                    label: "VA Disability Consideration", 
                    icon: ShieldCheck, 
                    price: 29,
                    description: "Factor VA disability income considerations into your post-divorce financial scenario."
                 },
                 { 
                    id: "housing", 
                    label: "Housing Scenario", 
                    icon: Home, 
                    price: 29,
                    description: "Compare rent, mortgage, and affordability after support obligations."
                 }
              ].map((addon) => (
                 <div key={addon.id} className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50/50 flex flex-col items-center text-center gap-4 group/item transition-all hover:bg-white hover:shadow-xl hover:border-zinc-200">
                    <div className="w-10 h-10 rounded-xl bg-white border border-zinc-100 flex items-center justify-center text-zinc-300 group-hover/item:text-[#111111] transition-colors">
                       <addon.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                       <h5 className="text-[11px] font-black uppercase tracking-tight text-[#111111] leading-tight">{addon.label}</h5>
                       <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">
                          {addon.description}
                       </p>
                    </div>
                    <div className="mt-auto w-full pt-2">
                       <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-3">
                          Available for ${addon.price}
                       </p>
                       <Button
                          onClick={() => handleCheckout("CORE")}
                          className="w-full h-10 rounded-xl bg-zinc-100 text-zinc-400 group-hover/item:bg-[#111111] group-hover/item:text-white font-black uppercase tracking-widest text-[9px] transition-all"
                       >
                          Unlock with Core
                       </Button>
                    </div>
                 </div>
              ))}
           </div>

           <div className="mt-8 pt-6 border-t border-zinc-50 text-center relative z-20">
              <p className="text-[10px] font-bold text-zinc-400 max-w-[280px] mx-auto leading-relaxed italic">
                 These advanced modules require the <span className="text-[#111111] font-black">Core Intelligence Engine</span> to process complex variables.
              </p>
           </div>
        </section>
      </div>

      {/* Right: Summary & Upsell */}
      <div className="lg:col-span-5 flex flex-col gap-6">

        {/* Expanded Summary Card */}
        <section className="flex-1 bg-[#111111] text-white rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-10 shadow-2xl relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#16A34A]/20 blur-[60px] rounded-full -mr-16 -mt-16" />

          <div className="mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#16A34A] block mb-2">Detailed Analysis Snapshot</span>
            <h3 className="text-3xl font-black">Financial Summary</h3>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center py-4 border-b border-white/10 relative group">
              <span className="text-zinc-400 font-bold text-sm">Disposable Monthly Income</span>
              <span className="text-xl font-black text-[#16A34A]">{formatter.format(result?.disposableIncome || 0)}</span>
              {!isCore && (
                 <div className="absolute inset-x-0 inset-y-2 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl border border-white/5 pointer-events-none">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#16A34A]">Unlocked Preview</span>
                 </div>
              )}
            </div>
            <div className="flex justify-between items-center py-4 border-b border-white/10">
              <span className="text-zinc-400 font-bold text-sm">Monthly Child Support</span>
              <span className="text-xl font-black text-white">{formatter.format(result?.monthlySupport || 0)}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-white/10">
              <span className="text-zinc-400 font-bold text-sm">Net Monthly Surplus</span>
              <span className="text-xl font-black text-white">{formatter.format(result?.netMonthlyIncome || 0)}</span>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Reality Risk Score</p>
                  <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Financial Safety Protocol</p>
                </div>
                {!isCore && (
                  <div className="px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center gap-1.5 animate-pulse">
                    <div className="w-1 h-1 rounded-full bg-rose-500" />
                    <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest">Security Alert</span>
                  </div>
                )}
              </div>

              <div className="relative h-24 flex flex-col items-center justify-center">
                {isCore ? (
                  <div className="text-center group">
                    <span className={cn(
                      "text-5xl font-black tracking-tighter transition-all duration-700",
                      result?.realityScoreStatus === "Green" ? "text-[#16A34A]" :
                        result?.realityScoreStatus === "Yellow" ? "text-[#EAB308]" : "text-[#DC2626]"
                    )}>
                      {(result?.impactPercentage || 0 * 100).toFixed(1)}%
                    </span>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mt-1">{result?.realityScoreLabel}</p>
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center gap-4">
                     {/* PREMIUM GAUGE MOCK (Blurred) */}
                     <div className="relative w-full max-w-[240px] h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-[64%] bg-gradient-to-r from-emerald-500/20 to-amber-500/20 blur-md" />
                        <span className="relative z-10 text-4xl font-black text-white/10 blur-[6px] tracking-tight tabular-nums">72.4%</span>
                        <Lock className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-[#16A34A]" />
                     </div>
                     <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] animate-pulse">Analyzing Stability Index...</p>
                  </div>
                )}
              </div>
            </div>

            {!isCore && (
              <div className="mt-8 p-6 rounded-2xl bg-[#DC2626]/5 border border-[#DC2626]/10 flex gap-4 items-start">
                 <AlertTriangle className="w-5 h-5 text-[#DC2626] shrink-0" />
                 <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-[#DC2626] mb-1">Critical Insight Alert</h5>
                    <p className="text-[11px] text-zinc-500 font-bold leading-relaxed">
                       We found <span className="text-white font-black underline underline-offset-4 decoration-[#DC2626]/30">3 strategic factors</span> in your profile that could significantly change this score. Unlock to reveal risks.
                    </p>
                 </div>
              </div>
            )}

            {!isCore && (
              <Button 
                onClick={() => handleCheckout("CORE")}
                disabled={!!isRedirecting}
                className="w-full h-14 mt-8 rounded-2xl bg-[#16A34A] text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-[#16A34A]/20 transition-all hover:scale-[1.02] active:scale-[0.98] group"
              >
                {isRedirecting === "CORE" ? (
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                ) : (
                  <>
                    Upgrade to Reveal Full Report 
                    <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </Button>
            )}
          </div>
        </section>

        <div className="space-y-4">
           {!isCore && (
              <div className="p-6 rounded-[2rem] bg-zinc-50 border border-zinc-100">
                 <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-[#EAB308]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Tactical Alternatives Preview</span>
                 </div>
                 <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-white border border-zinc-100 flex items-center justify-between group pointer-events-none">
                       <span className="text-[10px] font-bold text-zinc-800 uppercase">50/50 Shared Custody Model</span>
                       <span className="text-[10px] font-black text-[#16A34A] blur-[4px]">+$840/mo</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-zinc-100 flex items-center justify-between group pointer-events-none">
                       <span className="text-[10px] font-bold text-zinc-800 uppercase">Sole Provider Tax Optimization</span>
                       <span className="text-[10px] font-black text-[#16A34A] blur-[4px]">+$2,100/yr</span>
                    </div>
                 </div>
                 <div className="mt-4 flex items-center justify-center gap-2">
                    <Lock className="w-3 h-3 text-zinc-300" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300">Upgrade to Model Alternatives</span>
                 </div>
              </div>
           )}

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={cn(
                "bg-white border border-zinc-100 p-6 rounded-[2rem] text-center transition-all",
                !isCore && "opacity-70 group"
              )}>
                <div className="w-10 h-10 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <PieChart className={cn("w-5 h-5", isCore ? "text-[#16A34A]" : "text-zinc-300")} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">AI Advisory</p>
                {!isCore && (
                  <div className="flex items-center justify-center gap-1.5 py-1 px-3 bg-zinc-100 rounded-full w-fit mx-auto">
                    <Lock className="w-3 h-3 text-zinc-400" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Core</span>
                  </div>
                )}
              </div>
              <div className={cn(
                "bg-white border border-zinc-100 p-6 rounded-[2rem] text-center transition-all",
                !isCore && "opacity-70 group"
              )}>
                <div className="w-10 h-10 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <HistoryIcon className={cn("w-5 h-5", isCore ? "text-[rgb(79,70,229)]" : "text-zinc-300")} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Scenario History</p>
                {!isCore && (
                  <div className="flex items-center justify-center gap-1.5 py-1 px-3 bg-zinc-100 rounded-full w-fit mx-auto">
                    <Lock className="w-3 h-3 text-zinc-400" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Core</span>
                  </div>
                )}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
