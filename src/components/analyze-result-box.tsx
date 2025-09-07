"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserType } from "@/types/types";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

type AnalyzeBoxProps = {
  unfollowersList: UserType[];
  fansList: UserType[];
};

export default function AnalyeResultBox({ unfollowersList, fansList }: AnalyzeBoxProps) {
  const [menu, setMenu] = useState<"Unfollowers" | "Fans">("Unfollowers");

  const formatDate = (ts: number) => dayjs(ts * 1000).format("YYYY-MM-DD HH:mm");
  const fromNow = (ts: number) => dayjs(ts * 1000).fromNow(); // e.g., "3 days ago"

  return (
    <div className="w-full">
      <div className="w-[40vw] m-auto">
        <div className="flex text-center w-full">
          <div
            className={`flex-1 text-center p-5 hover:cursor-pointer  ${
              menu === "Unfollowers" ? "border-b-2 border-black dark:border-white font-semibold" : ""
            }`}
            onClick={() => setMenu("Unfollowers")}
          >
            UNFOLLOWERS
          </div>
          <div
            className={`flex-1 text-center p-5 hover:cursor-pointer  ${
              menu === "Fans" ? "border-b-2 border-black dark:border-white font-semibold" : ""
            }`}
            onClick={() => setMenu("Fans")}
          >
            FANS
          </div>
        </div>
      </div>

      <div className="w-[40vw] m-auto my-10">
        {menu === "Unfollowers" && (
          <ScrollArea className="h-[60vh] w-[40vw]">
            {unfollowersList.map((user) => (
              <div key={user.username} className="flex p-2 items-center">
                <div className="flex flex-2/3 gap-2 items-center">
                  <div>{user.username}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(user.timestamp)} ({fromNow(user.timestamp)})
                  </div>
                </div>
                <div className="flex flex-1">
                  <Link href={user.url} target="_blank">
                    <Button>View profile</Button>
                  </Link>
                </div>
              </div>
            ))}
          </ScrollArea>
        )}

        {menu === "Fans" && (
          <ScrollArea className="h-[60vh] w-[40vw]">
            {fansList.map((user) => (
              <div key={user.username} className="flex p-2 items-center">
                <div className="flex flex-2/3 gap-2 items-center">
                  <div>{user.username}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(user.timestamp)} ({fromNow(user.timestamp)})
                  </div>
                </div>
                <div className="flex flex-1">
                  <Link href={user.url} target="_blank">
                    <Button>View profile</Button>
                  </Link>
                </div>
              </div>
            ))}
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
