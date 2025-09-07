import ThemeToggleButton from "@/components/themes/theme-toggle-btn";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      {/* Static Buttons */}
      <div className="fixed top-5 right-5">
        <ThemeToggleButton />
      </div>

      <div className="flex gap-y-2 flex-col text-center font-medium text-5xl">
        <div>Behind every follow is a story.</div>
        <div>Some are real, most are not.</div>

        <div>
          <span>Every profile is a</span>
          <ContainerTextFlip
            words={["loyal.", "fake.", "ghost.", "watcher."]}
            textClassName="text-5xl"
            className="ml-2"
            interval={2500}
            animationDuration={1000}
          />
        </div>
      </div>

      <div className="mt-5 flex gap-x-5">
        <Link href={"/docs"}>
          <Button className={`px-8 py-2 text-xs cursor-pointer`}>Docs</Button>
        </Link>
        <Link href={"#"} className="cursor-not-allowed">
          <Button className="px-8 py-2 text-xs " disabled>
            Search by username
          </Button>
        </Link>
        <Link href={"/upload"}>
          <Button className="px-8 py-2 text-xs cursor-pointer">Upload</Button>
        </Link>
      </div>
    </div>
  );
}
