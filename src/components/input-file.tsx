"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputFileProps = {
  onFileSelect: (file: File | null) => void;
  resetKey?: number; // forces reset when changed
};

export function InputFile({ onFileSelect, resetKey }: InputFileProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (f && !f.name.toLowerCase().endsWith(".zip")) {
      alert("Only .zip files allowed");
      e.target.value = ""; // clear invalid file
      onFileSelect(null);
      return;
    }
    onFileSelect(f);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="zip">Upload Zip File</Label>
      <Input
        key={resetKey}
        id="zip"
        type="file"
        accept=".zip"
        onChange={handleChange}
      />
    </div>
  );
}
