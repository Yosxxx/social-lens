"use client";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import BackButton from "@/components/back-btn";
import JSZip from "jszip";
import { toast } from "react-toastify";
import AnalyzeModal from "@/components/analyze-modal";
import { UserType } from "@/types/types";

export default function UploadFilePage() {
  const [file, setFile] = useState<File[]>([]);
  const [resetKey, setResetKey] = useState(0);
  const [following, setFollowing] = useState<UserType[]>([]);
  const [followers, setFollowers] = useState<UserType[]>([]);
  const [notFollowingBack, setNotFollowingBack] = useState<UserType[]>([]);
  const [youDontFollowBack, setYouDontFollowBack] = useState<UserType[]>([]);

  // Analyze zip
  const handleAnalyze = async () => {
    if (file.length === 0) {
      toast("Upload file first.");
      return;
    }

    const followerPath = "connections/followers_and_following/followers_1.json";
    const followingPath = "connections/followers_and_following/following.json";

    try {
      // Load the uploaded zip
      const zip = await JSZip.loadAsync(file[0]);

      // Try to grab the two JSON files inside the zip
      const followersFile = zip.file(followerPath);
      const followingFile = zip.file(followingPath);

      if (!followersFile || !followingFile) {
        toast.error("Followers or Following JSON not found.");
        return;
      }

      // Read files as text and parse JSON
      const followersText = await followersFile.async("string");
      const followingText = await followingFile.async("string");
      const followersJson = JSON.parse(followersText);
      const followingJson = JSON.parse(followingText);

      // Convert raw JSON into a cleaner list of objects
      for (const item of followersJson) {
        const user = item.string_list_data[0];
        followers.push({
          username: user.value,
          url: user.href,
          timestamp: user.timestamp,
        });
      }

      for (const item of followingJson.relationships_following) {
        const user = item.string_list_data[0];
        following.push({
          username: user.value,
          url: user.href,
          timestamp: user.timestamp,
        });
      }

      // Quick lookup sets for filtering
      const followerSet = new Set(followers.map((f) => f.username));
      const followingSet = new Set(following.map((f) => f.username));

      // People you follow but they don’t follow you
      const notFollowingBack = following.filter(
        (f) => !followerSet.has(f.username)
      );

      // People who follow you but you don’t follow them
      const youDontFollowBack = followers.filter(
        (f) => !followingSet.has(f.username)
      );

      // Save everything into state
      setNotFollowingBack(notFollowingBack);
      setYouDontFollowBack(youDontFollowBack);

      console.log({
        following,
        followers,
        notFollowingBack,
        youDontFollowBack,
      });

      toast.success("Analysis complete.");
    } catch (err) {
      console.error(err);
      toast.error("Error reading zip file");
    }
  };

  // Reset button: clears everything and remounts uploader
  const handleReset = () => {
    setFile([]);
    setFollowers([]);
    setFollowing([]);
    setNotFollowingBack([]);
    setYouDontFollowBack([]);
    setResetKey((k) => k + 1);
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center ${
        following.length > 0 ? "mt-10" : "mt-0"
      }`}
    >
      <div className="fixed top-5 left-5">
        <BackButton />
      </div>

      <div className="w-[60vw]">
        <div className="flex flex-col items-center justify-center text-center dark:bg-zinc-950/50 py-10 rounded">
          {/* File upload (remounts when resetKey changes) */}
          <FileUpload key={resetKey} files={file} onChange={setFile} />

          <div className="flex gap-x-5 mt-6">
            {/* Run analysis on the uploaded file */}
            <Button
              onClick={handleAnalyze}
              disabled={following.length > 0} // disable if users already exist
              className={`px-8 py-2 rounded-md text-white transition duration-200 ease-linear cursor-pointer
              ${
                following.length > 0
                  ? "bg-green-400 cursor-not-allowed opacity-70" // disabled look
                  : "bg-[#10b981] shadow-[0_4px_14px_0_rgb(16,185,129,39%)] hover:shadow-[0_6px_20px_rgba(16,185,129,23%)] hover:bg-[rgba(16,185,129,0.9)]"
              }`}
            >
              Analyze
            </Button>

            {/* Clear state and reset uploader */}
            <Button
              className="cursor-pointer shadow-[0_4px_14px_0_rgb(220,38,38,39%)] hover:shadow-[0_6px_20px_rgba(220,38,38,23%)] hover:bg-[rgba(220,38,38,0.9)] px-8 py-2 bg-[#dc2626] rounded-md text-white transition duration-200 ease-linear"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>

        {(followers.length > 0 ||
          following.length > 0 ||
          notFollowingBack.length > 0 ||
          youDontFollowBack.length > 0) && (
          <div>
            <AnalyzeModal
              following={following}
              followers={followers}
              notFollowingYouBack={notFollowingBack}
              youDontFollowBack={youDontFollowBack}
            />
          </div>
        )}
      </div>
    </div>
  );
}
