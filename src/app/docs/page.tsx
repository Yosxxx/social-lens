"use client";
import { ShieldCheck, Settings, FolderTree, ArrowRight, InfoIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggleButton from "@/components/themes/theme-toggle-btn";
import BackButton from "./../../components/back-btn";

export default function DocumentationPage() {
  return (
    <div className="flex flex-1 justify-center gap-10 my-10 max-h-screen">
      {/* Static Buttons */}
      <div className="fixed top-5 right-5">
        <ThemeToggleButton />
      </div>
      <div className="fixed top-5 left-5">
        <BackButton />
      </div>

      {/* Sidebar */}
      <div className="bg-muted/40 h-fit p-7 rounded-md border-primary/20 border-1 flex flex-col gap-y-2">
        <div>Quick Summary</div>
        <div className="text-muted-foreground text-sm">
          <div>1. Request export in JSON.</div>
          <div>2. Download ZIP</div>
          <div>
            3. Upload ZIP to{" "}
            <Link href={"/upload"} className="underline">
              /upload
            </Link>
          </div>
        </div>
        <Link href={"/upload"}>
          <Button className="hover: cursor-pointer">Start Analysis</Button>
        </Link>
      </div>

      {/* Main page */}
      <div>
        <div className="flex flex-col gap-2">
          <div className="font-bold text-3xl">Export Instagram Data for Local Analysis</div>
          <div className="text-muted-foreground text-base">
            Export your instagram data in JSON, locate the required files, and analyze followers locally-no server
            uploads
          </div>
          <div className="bg-muted/40 p-3 rounded-md border-l-10 text-sm">
            <div className="flex items-center">
              <ShieldCheck className="mr-2" />
              All parsing runs in your browser. You retain full control of your data.
            </div>
          </div>
        </div>

        <Separator className="my-5" />

        {/* Step-by-Step */}
        <div>
          <div className="text-3xl font-bold">Step-by-Step</div>

          {/* Step 1 */}
          <div className="flex gap-x-2 mt-2">
            <div className="bg-muted/40 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">1</div>
            <div className="flex flex-col">
              <div className="font-medium flex items-center gap-2">
                <Settings size={16} /> Access Instagram Settings
              </div>
              <div className="text-muted-foreground text-sm flex gap-2 items-center flex-wrap">
                Open Instagram (app or web) <ArrowRight size={14} /> profile <ArrowRight size={14} /> menu{" "}
                <ArrowRight size={14} /> settings
              </div>
              <div className="text-muted-foreground text-sm flex gap-x-1 items-center">
                <InfoIcon size={14} /> Ensure you&apos;re on the correct account to access privacy/data tools.
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-x-2">
            <div className="bg-muted/40 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">2</div>
            <div className="flex flex-col">
              <div className="font-medium flex items-center gap-2">
                Open ‘Your Activity’ → ‘Download Your Information’
              </div>
              <div className="text-muted-foreground text-sm flex gap-2 items-center">
                The data download tool may also appear under ‘Privacy and Security’.
              </div>
              <div className="text-muted-foreground text-sm flex gap-x-1 items-center">
                <InfoIcon size={14} /> Labels vary by region/app version; the goal is the export tool.
              </div>
            </div>
          </div>
          {/* Step 3 */}
          <div className="flex gap-x-2">
            <div className="bg-muted/40 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">3</div>
            <div className="flex flex-col">
              <div className="font-medium flex items-center gap-2">Request the Export in JSON</div>
              <div className="text-muted-foreground text-sm">
                Pick JSON and include Connections (followers/following).
              </div>
              <div className="text-muted-foreground text-sm flex gap-x-1 items-center">
                <InfoIcon size={14} /> You need <code>followers_1.json</code> and <code>following.json</code> for
                analysis.
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-x-2">
            <div className="bg-muted/40 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">4</div>
            <div className="flex flex-col">
              <div className="font-medium flex items-center gap-2">Verify Identity and Wait for Email</div>
              <div className="text-muted-foreground text-sm">
                Instagram sends a download link (expires). Typical wait: 24–48h.
              </div>
              <div className="text-muted-foreground text-sm flex gap-x-1 items-center">
                <InfoIcon size={14} /> Large accounts take longer; download promptly after the email.
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex gap-x-2">
            <div className="bg-muted/40 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">5</div>
            <div className="flex flex-col">
              <div className="font-medium flex items-center gap-2">Download ZIP and Check Contents</div>
              <div className="text-muted-foreground text-sm">
                Target folder: <code>connections/followers_and_following/</code>.
              </div>
              <div className="text-muted-foreground text-sm flex gap-x-1 items-center">
                <InfoIcon size={14} /> Confirm <code>followers_1.json</code> and <code>following.json</code> exist;
                otherwise re-request with Connections.
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="flex gap-x-2">
            <div className="bg-muted/40 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">6</div>
            <div className="flex flex-col">
              <div className="font-medium flex items-center gap-2">
                Upload to{" "}
                <Link href={"/upload"} className="underline">
                  /upload
                </Link>
              </div>
              <div className="text-muted-foreground text-sm">Open Upload and drop the ZIP. Processing is local.</div>
              <div className="text-muted-foreground text-sm flex gap-x-1 items-center">
                <InfoIcon size={14} /> We compute mutuals/asymmetries in-browser; no server uploads.
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-5" />

        <div>
          <div className="text-3xl flex items-center gap-2 font-bold">
            <FolderTree /> What&apos;s Inside the Zip?
          </div>
          <pre className="text-xs overflow-x-auto bg-muted/40 p-2 rounded-md mt-2 border-primary/20 border-1">
            {`<export>.zip
└── connections/
    └── followers_and_following/
        ├── followers_1.json
        └── following.json`}
          </pre>
          <p className="mt-2 text-xs text-muted-foreground">
            These two files are sufficient. If missing, re-request with <em>Connections</em> selected.
          </p>
        </div>
      </div>
    </div>
  );
}
