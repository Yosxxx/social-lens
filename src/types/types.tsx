export type UserType = {
  username: string;
  url: string;
  timestamp: number;
};

export type AnalyzeModalProps = {
  followers: UserType[];
  following: UserType[];
  notFollowingYouBack: UserType[];
  youDontFollowBack: UserType[];
};
