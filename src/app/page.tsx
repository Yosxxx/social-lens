import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center items-center flex-col gap-y-5 ">
      <div className="flex gap-y-2 flex-col text-center font-medium text-5xl">
        <div>Behind every follow is a story.</div>
        <div>Some are real, most are not.</div>

        <div>
          <span>Every profile is a</span>
          <ContainerTextFlip
            words={["loyal", "fake", "ghost", "watcher"]}
            textClassName="text-5xl"
            className="ml-2"
            interval={2000}
          />
        </div>
      </div>

      <div className="flex gap-5 items-center">
        <Link href={"#"}>
          <button className="p-[3px] relative ">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg " />
            <div className="px-8 py-2 bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent text-lg">
              Docs
            </div>
          </button>
        </Link>
        <Link href={"#"}>
          <Button className="text-zinc-500 py-5.5 px-8 cursor-not-allowed bg-black text-lg  ">
            Search by username
          </Button>
        </Link>
        <Link href={"/upload-file"}>
          <Button className="py-5.5 px-8 text-white z-10 bg-black text-lg ">
            Upload
          </Button>
        </Link>
      </div>
    </div>
  );
}
