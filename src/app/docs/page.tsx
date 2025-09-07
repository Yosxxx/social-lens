"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Removed Badge import as it's no longer used in the simplified Steps section
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Settings,
  FileText,
  Search,
  Upload,
  Eye,
  Info,
  FolderTree,
  ShieldCheck,
  Wrench,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import BackButton from "@/components/back-btn";

const steps = [
  {
    id: "step1",
    number: 1,
    title: "Access Instagram Settings",
    description: "Open Instagram (app or web) → profile → menu → Settings.",
    detailedContent:
      "Ensure you're on the correct account to access privacy/data tools.",
    icon: Settings,
  },
  {
    id: "step2",
    number: 2,
    title: "Open ‘Your Activity’ → ‘Download Your Information’",
    description:
      "The data download tool may also appear under ‘Privacy and Security’.",
    detailedContent:
      "Labels vary by region/app version; the goal is the export tool.",
    icon: Eye,
  },
  {
    id: "step3",
    number: 3,
    title: "Request the Export in JSON",
    description: "Pick JSON and include Connections (followers/following).",
    detailedContent:
      "You need `followers_1.json` and `following.json` for analysis.",
    icon: Download,
  },
  {
    id: "step4",
    number: 4,
    title: "Verify Identity and Wait for Email",
    description:
      "Instagram sends a download link (expires). Typical wait: 24–48h.",
    detailedContent:
      "Large accounts take longer; download promptly after the email.",
    icon: FileText,
  },
  {
    id: "step5",
    number: 5,
    title: "Download ZIP and Check Contents",
    description: "Target folder: `connections/followers_and_following/`.",
    detailedContent:
      "Confirm `followers_1.json` and `following.json` exist; otherwise re-request with Connections.",
    icon: Search,
  },
  {
    id: "step6",
    number: 6,
    title: "Upload to Profile Insight",
    description: "Open Upload and drop the ZIP. Processing is local.",
    detailedContent:
      "We compute mutuals/asymmetries in-browser; no server uploads.",
    icon: Upload,
  },
] as const;

const faqs = [
  {
    id: "faq1",
    question: "Is my data uploaded to a server?",
    answer:
      "No. Parsing runs locally in your browser; nothing is sent to a backend.",
  },
  {
    id: "faq2",
    question: "Which files are required?",
    answer:
      "`followers_1.json` and `following.json` inside `connections/followers_and_following/`.",
  },
  {
    id: "faq3",
    question: "Why JSON over HTML?",
    answer:
      "JSON is structured and robust for parsing. HTML exports are presentation-oriented.",
  },
  {
    id: "faq4",
    question: "Link expired—what now?",
    answer: "Start a new export and download soon after the email arrives.",
  },
  {
    id: "faq5",
    question: "Business accounts supported?",
    answer: "Yes. The flow is identical for personal and business profiles.",
  },
] as const;

export default function DocsPage() {
  const [openFaqs, setOpenFaqs] = useState<string[]>([]);
  const toggleFaq = (faqId: string) =>
    setOpenFaqs((prev) =>
      prev.includes(faqId)
        ? prev.filter((id) => id !== faqId)
        : [...prev, faqId]
    );

  return (
    // IMPORTANT: avoid overflow-hidden or transform on ancestors of the sticky sidebar.
    <div className="min-h-screen text-foreground">
      <div className="fixed top-5 left-5">
        <BackButton />
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Sidebar: follows on scroll and returns to initial position at the top */}
          <aside className="lg:col-span-1">
            {/* Sticky: pinned 6rem from top; returns to normal flow at page top */}
            <div className="sticky top-24 space-y-6">
              <Card className="max-h-[calc(100vh-7rem)] overflow-auto">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-semibold">
                    Contents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 p-4">
                  <a
                    href="#overview"
                    className="block text-sm text-muted-foreground hover:text-primary"
                  >
                    Overview
                  </a>
                  <a
                    href="#prerequisites"
                    className="block text-sm text-muted-foreground hover:text-primary"
                  >
                    Before You Begin
                  </a>
                  <a
                    href="#zip-structure"
                    className="block text-sm text-muted-foreground hover:text-primary"
                  >
                    What’s Inside the ZIP
                  </a>
                  <a
                    href="#steps"
                    className="block text-sm text-muted-foreground hover:text-primary"
                  >
                    Step-by-Step
                  </a>
                  <a
                    href="#troubleshooting"
                    className="block text-sm text-muted-foreground hover:text-primary"
                  >
                    Troubleshooting
                  </a>
                  <a
                    href="#faq"
                    className="block text-sm text-muted-foreground hover:text-primary"
                  >
                    FAQ
                  </a>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-semibold">
                    Quick Start
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground p-4">
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Request export in JSON.</li>
                    <li>Download ZIP after email.</li>
                    <li>
                      Upload ZIP to{" "}
                      <Link href="/upload-file" className="underline">
                        Profile Insight
                      </Link>
                      .
                    </li>
                  </ol>
                  <Button asChild size="sm" className="mt-1">
                    <Link href="/upload-file">
                      Start Analysis <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-3 space-y-10">
            {/* Overview */}
            <section id="overview" className="space-y-3">
              <h1 className="text-3xl font-bold">
                Export Instagram Data for Local Analysis
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Export your Instagram data in JSON, locate the required files,
                and analyze followers locally—no server uploads.
              </p>
              <div className="rounded-md border-l-4 border-primary/40 bg-muted/40 p-3 text-xs flex items-start gap-2">
                <ShieldCheck
                  className="h-4 w-4 text-primary mt-0.5"
                  aria-hidden
                />
                <p>
                  All parsing runs in your browser. You retain full control of
                  your data.
                </p>
              </div>
            </section>

            <Separator />

            {/* Prerequisites */}
            <section id="prerequisites" className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" /> Before You Begin
              </h2>
              <ul className="list-disc pl-5 text-sm text-muted-foreground leading-relaxed">
                <li>Use the target Instagram account.</li>
                <li>
                  Select <strong>JSON</strong> as the export format.
                </li>
                <li>
                  Include <strong>Connections</strong> in the request.
                </li>
                <li>Ensure local disk space for the ZIP.</li>
              </ul>
            </section>

            <Separator />

            {/* ZIP Structure */}
            <section id="zip-structure" className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FolderTree className="h-5 w-5 text-primary" /> What’s Inside
                the ZIP
              </h2>
              <Card>
                <CardContent className="p-4">
                  <pre className="text-xs overflow-x-auto">
                    {`<export>.zip
└── connections/
    └── followers_and_following/
        ├── followers_1.json
        └── following.json`}
                  </pre>
                  <p className="mt-2 text-xs text-muted-foreground">
                    These two files are sufficient. If missing, re-request with{" "}
                    <em>Connections</em> selected.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Steps — simplified: semantic list, compact, no Cards */}
            <section id="steps" className="space-y-4">
              <h2 className="text-xl font-semibold">Step-by-Step</h2>

              <ol className="space-y-2">
                {steps.map((step) => (
                  <li key={step.id} id={step.id} className="scroll-mt-24">
                    <div className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                      <span className="inline-flex h-6 w-6 shrink-0 rounded-full bg-primary/10 text-primary text-[11px] font-bold items-center justify-center">
                        {step.number}
                      </span>
                      <div className="space-y-1">
                        <h3 className="text-sm font-semibold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                        <div className="text-xs text-muted-foreground flex items-start gap-2">
                          <Info
                            className="h-4 w-4 text-primary mt-0.5"
                            aria-hidden
                          />
                          <span>{step.detailedContent}</span>
                        </div>

                        {step.number === 6 && (
                          <div className="flex items-center gap-2 pt-1">
                            <Button asChild size="sm">
                              <Link href="/upload-file">
                                Go to Upload{" "}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                            <span className="text-xs text-muted-foreground">
                              Drag-and-drop your ZIP. Parsing is automatic.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <Separator />

            {/* Troubleshooting */}
            <section id="troubleshooting" className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" /> Troubleshooting
              </h2>
              <ul className="list-disc pl-5 text-sm text-muted-foreground leading-relaxed">
                <li>
                  <strong>Missing files:</strong> Re-request with{" "}
                  <em>Connections</em> included; JSON format.
                </li>
                <li>
                  <strong>Expired link:</strong> Start a new export; download
                  promptly.
                </li>
                <li>
                  <strong>Cannot parse:</strong> Upload the original ZIP, not
                  extracted files.
                </li>
                <li>
                  <strong>Large accounts:</strong> Expect larger ZIPs and longer
                  processing.
                </li>
              </ul>
            </section>

            <Separator />

            {/* FAQ */}
            <section id="faq" className="space-y-5 scroll-mt-24">
              <h2 className="text-xl font-semibold">FAQ</h2>
              <div className="space-y-3">
                {faqs.map((faq) => {
                  const open = openFaqs.includes(faq.id);
                  return (
                    <Card key={faq.id}>
                      <Collapsible>
                        <CollapsibleTrigger
                          className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50"
                          onClick={() => toggleFaq(faq.id)}
                        >
                          <h3 className="text-sm font-medium">
                            {faq.question}
                          </h3>
                          <ChevronDown
                            className={`h-4 w-4 text-muted-foreground transition-transform ${
                              open ? "rotate-180" : ""
                            }`}
                          />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 pb-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* CTA */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="text-center p-6">
                <CardTitle className="text-xl">
                  Ready to Analyze Your Data?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center p-6">
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Upload your Instagram ZIP to compute mutuals and
                  asymmetries—locally.
                </p>
                <Button size="sm" asChild>
                  <Link href="/upload-file">
                    Start Analysis <Upload className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
