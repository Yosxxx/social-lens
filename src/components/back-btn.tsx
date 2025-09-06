"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} variant="outline">
      <ArrowLeftIcon />
    </Button>
  );
}
