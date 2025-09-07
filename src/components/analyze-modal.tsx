import { Button } from "@/components/ui/button";
import { UserType } from "@/types/types";
import {
  RectangleEllipsis,
  Table,
  UserMinus,
  UserRoundX,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AnalyzeModalProps } from "@/types/types";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AnalyzeModal({
  following,
  followers,
  notFollowingYouBack,
  youDontFollowBack,
}: AnalyzeModalProps) {
  const [followingNumber, setFollowingNumber] = useState(0);
  const [followersNumber, setFollowersNumber] = useState(0);
  const [notFollowingBackNumber, setNotFollowingBackNumber] = useState(0);
  const [youDontFollowBackNumber, setYouDontFollowBackNumber] = useState(0);
  const [title, setTitle] = useState<
    | "People You Follow"
    | "Your Followers"
    | "People Who Dont Follow You Back"
    | "People You Dont Follow Back"
  >("People You Follow");
  const [number, setNumber] = useState<number>(followingNumber);
  const [menu, setMenu] = useState(1);
  const [detail, setDetail] = useState<"Pills" | "Table">("Pills");

  useEffect(() => {
    setFollowingNumber(following.length);
    setFollowersNumber(followers.length);
    setNotFollowingBackNumber(notFollowingYouBack.length);
    setYouDontFollowBackNumber(youDontFollowBack.length);
  }, [followers, following, notFollowingYouBack, youDontFollowBack]);

  useEffect(() => {
    setNumber(followingNumber);
  }, [followingNumber]);

  return (
    <div className="my-10">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">Analysis Results</div>
          <div className="flex gap-5">
            <Button
              className="hover:bg-white hover:outline-1 hover:text-black cursor-pointer dark:hover:bg-black dark:hover:outline-1 dark:hover:text-white "
              onClick={() => setDetail("Pills")}
            >
              <RectangleEllipsis />
              Pills
            </Button>
            <Button
              className="hover:bg-white hover:outline-1 hover:text-black cursor-pointer dark:hover:bg-black dark:hover:outline-1 dark:hover:text-white "
              onClick={() => setDetail("Table")}
            >
              <Table />
              Table
            </Button>
          </div>
        </div>

        <div className="w-full flex justify-around items-center text-center mt-10 p-1 bg-zinc-500/50 rounded-md">
          <Button
            className={`flex-1 cursor-pointer hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white
      ${
        title === "People You Follow"
          ? "bg-white text-black dark:bg-black dark:text-white"
          : "bg-black text-white dark:bg-white dark:text-black"
      }`}
            onClick={() => {
              setTitle("People You Follow");
              setNumber(followingNumber);
            }}
          >
            <Users /> Followings
          </Button>

          <Button
            className={`flex-1 cursor-pointer hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white
      ${
        title === "Your Followers"
          ? "bg-white text-black dark:bg-black dark:text-white"
          : "bg-black text-white dark:bg-white dark:text-black"
      }`}
            onClick={() => {
              setTitle("Your Followers");
              setNumber(followersNumber);
            }}
          >
            <Users /> Followers
          </Button>

          <Button
            className={`flex-1 cursor-pointer hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white
      ${
        title === "People Who Dont Follow You Back"
          ? "bg-white text-black dark:bg-black dark:text-white"
          : "bg-black text-white dark:bg-white dark:text-black"
      }`}
            onClick={() => {
              setTitle("People Who Dont Follow You Back");
              setNumber(notFollowingBackNumber);
            }}
          >
            <UserMinus /> Not Following You Back 🔥
          </Button>

          <Button
            className={`flex-1 cursor-pointer hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white
      ${
        title === "People You Dont Follow Back"
          ? "bg-white text-black dark:bg-black dark:text-white"
          : "bg-black text-white dark:bg-white dark:text-black"
      }`}
            onClick={() => {
              setTitle("People You Dont Follow Back");
              setNumber(youDontFollowBackNumber);
            }}
          >
            <UserRoundX /> You Dont Follow Back 👀
          </Button>
        </div>

        <div className="p-5 border-2 border-gray-100 mt-5 rounded-md shadow-2xl dark:border-zinc-500/50">
          <div className="font-bold text-2xl">
            {title} ({number})
          </div>

          {detail === "Pills" && (
            <div className="mt-5 max-h-[60vh] overflow-y-auto flex flex-wrap gap-x-2 gap-y-5 p-2 justify-center">
              {title === "People You Follow" &&
                following.map((user) => (
                  <Link href={user.url} key={user.username} target="_blank">
                    <span className="bg-neutral-200 px-3 py-2 rounded-md text-black whitespace-nowrap hover:bg-white transition">
                      @{user.username}
                    </span>
                  </Link>
                ))}

              {title === "Your Followers" &&
                followers.map((user) => (
                  <Link href={user.url} key={user.username} target="_blank">
                    <span className="bg-neutral-200 px-3 py-2 rounded-md text-black whitespace-nowrap hover:bg-white transition">
                      @{user.username}
                    </span>
                  </Link>
                ))}

              {title === "People Who Dont Follow You Back" &&
                notFollowingYouBack.map((user) => (
                  <Link href={user.url} key={user.username} target="_blank">
                    <span className="bg-neutral-200 px-3 py-2 rounded-md text-black whitespace-nowrap hover:bg-white transition">
                      @{user.username}
                    </span>
                  </Link>
                ))}

              {title === "People You Dont Follow Back" &&
                youDontFollowBack.map((user) => (
                  <Link href={user.url} key={user.username} target="_blank">
                    <span className="bg-neutral-200 px-3 py-2 rounded-md text-black whitespace-nowrap hover:bg-white transition">
                      @{user.username}
                    </span>
                  </Link>
                ))}
            </div>
          )}

          {/* Table */}
          {detail === "Table" && (
            <div className="mt-5 max-h-[60vh] overflow-y-auto p-2 flex flex-col gap-y-2">
              {/* <div className="border-zinc-500/50 border-1 p-2 rounded-md">
                <div className="text-xl font-bold">Justin</div>
                <div className="text-xs font-light">3 days ago</div>
              </div> */}

              {title === "People You Follow" &&
                following.map((user) => (
                  <Link href={user.url} key={user.username} target="_blank">
                    <div className="border border-zinc-500/50 p-2 rounded-md transition transform hover:-translate-y-2 hover:shadow-md">
                      <div className="text-xl font-bold">{user.username}</div>
                      <div className="text-xs font-light">{user.timestamp}</div>
                    </div>
                  </Link>
                ))}

              {title === "Your Followers" &&
                followers.map((user) => (
                  <Link href={user.url} key={user.username} target="_blank">
                    <div className="border border-zinc-500/50 p-2 rounded-md transition transform hover:-translate-y-2 hover:shadow-md">
                      <div className="text-xl font-bold">{user.username}</div>
                      <div className="text-xs font-light">{user.timestamp}</div>
                    </div>
                  </Link>
                ))}

              {title === "People Who Dont Follow You Back" &&
                notFollowingYouBack.map((user) => (
                  <Link href={user.url} key={user.username} target="_blank">
                    <div className="border border-zinc-500/50 p-2 rounded-md transition transform hover:-translate-y-2 hover:shadow-md">
                      <div className="text-xl font-bold">{user.username}</div>
                      <div className="text-xs font-light">{user.timestamp}</div>
                    </div>
                  </Link>
                ))}

              {title === "People You Dont Follow Back" &&
                youDontFollowBack.map((user) => (
                  <Link href={user.url} key={user.username} target="_blank">
                    <div className="border border-zinc-500/50 p-2 rounded-md transition transform hover:-translate-y-2 hover:shadow-md">
                      <div className="text-xl font-bold">{user.username}</div>
                      <div className="text-xs font-light">{user.timestamp}</div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
