"use client";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import BackButton from "@/components/back-btn";

export default function UploadFilePage() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="fixed top-5 left-5">
        <BackButton />
      </div>
      <div className="w-[50vw]">
        <div className="flex flex-col items-center justify-center text-center dark:bg-zinc-950/50 py-10">
          <FileUpload files={files} onChange={setFiles} />
          <div className="flex gap-x-5">
            <Button className="cursor-pointer shadow-[0_4px_14px_0_rgb(16,185,129,39%)] hover:shadow-[0_6px_20px_rgba(16,185,129,23%)] hover:bg-[rgba(16,185,129,0.9)] px-8 py-2 bg-[#10b981] rounded-md text-white transition duration-200 ease-linear">
              Analyze
            </Button>
            <Button
              className="cursor-pointer shadow-[0_4px_14px_0_rgb(220,38,38,39%)] hover:shadow-[0_6px_20px_rgba(220,38,38,23%)] hover:bg-[rgba(220,38,38,0.9)] px-8 py-2 bg-[#dc2626] rounded-md text-white transition duration-200 ease-linear"
              onClick={() => setFiles([])}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
