"use client";
import { useState } from "react";
import { InputFile } from "@/components/input-file";
import ThemeToggleButton from "@/components/themes/theme-toggle-btn";
import BackButton from "@/components/back-btn";
import { Button } from "@/components/ui/button";
import { UserType } from "@/types/types";
import { toast } from "sonner";
import JSZip from "jszip";
import AnalyzeBox from "@/components/analyze-result-box";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [resetKey, setResetKey] = useState(0);

  // Follow List
  const [followingList, setFollowingList] = useState<UserType[]>([]);
  const [followerList, setFollowerList] = useState<UserType[]>([]);
  const [unfollowersList, setUnfollowersList] = useState<UserType[]>([]);
  const [fansList, setFansList] = useState<UserType[]>([]);

  const handleReset = () => {
    setFile(null);
    setFollowingList([]);
    setFollowerList([]);
    setUnfollowersList([]);
    setFansList([]);
    setResetKey((k) => k + 1);
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Upload file first");
      return;
    }

    try {
      const followerPath = "connections/followers_and_following/followers_1.json";
      const followingPath = "connections/followers_and_following/following.json";

      const zip = await JSZip.loadAsync(file);
      const followersFile = zip.file(followerPath);
      const followingFile = zip.file(followingPath);
      if (!followersFile || !followingFile) {
        toast.error("Followers or Following JSON not found.");
        return;
      }

      const followersJson = JSON.parse(await followersFile.async("string")); // array
      const followingJson = JSON.parse(await followingFile.async("string")); // object

      // KEEP LOOPING STYLE: build locals, not state
      const tempFollowerList: UserType[] = [];
      const tempFollowingList: UserType[] = [];

      // Followers (people who follow you)
      for (const item of followersJson) {
        const user = item?.string_list_data?.[0];
        if (!user) continue;
        tempFollowerList.push({
          username: user.value,
          url: user.href,
          timestamp: user.timestamp,
        });
      }

      // Following (people you follow)
      for (const item of followingJson.relationships_following ?? []) {
        const user = item?.string_list_data?.[0];
        if (!user) continue;
        tempFollowingList.push({
          username: user.value,
          url: user.href,
          timestamp: user.timestamp,
        });
      }

      // Sets
      const followerSet = new Set(tempFollowerList.map((f) => f.username));
      const followingSet = new Set(tempFollowingList.map((f) => f.username));

      // Diffs
      const unfollowers: UserType[] = [];
      for (const f of tempFollowingList) {
        if (!followerSet.has(f.username)) unfollowers.push(f);
      }

      const fans: UserType[] = [];
      for (const f of tempFollowerList) {
        if (!followingSet.has(f.username)) fans.push(f);
      }

      // Single state commits
      setFollowerList(tempFollowerList);
      setFollowingList(tempFollowingList);
      setUnfollowersList(unfollowers);
      setFansList(fans);

      console.log({
        followingList: tempFollowingList,
        followerList: tempFollowerList,
        unfollowersList: unfollowers,
        fansList: fans,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to analyze the export.");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center flex-col gap-4">
      {/* Static Buttons */}
      <div className="fixed top-5 right-5">
        <ThemeToggleButton />
      </div>
      <div className="fixed top-5 left-5">
        <BackButton />
      </div>

      <div className={`${unfollowersList.length > 1 ? "mt-10" : ""}`}>
        <InputFile onFileSelect={setFile} resetKey={resetKey} />
      </div>

      {file && (
        <>
          {/* <div className="text-sm text-gray-600">Selected: {file.name}</div> */}
          <div className="flex gap-x-5">
            <Button onClick={handleAnalyze} disabled={followingList.length > 1}>
              Analyze
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </>
      )}

      {unfollowersList.length > 1 && fansList.length > 1 && (
        <AnalyzeBox unfollowersList={unfollowersList} fansList={fansList} />
      )}
    </div>
  );
}
