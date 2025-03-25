"use server";

import ProfileView from "@/views/profile";
import getOGTitle from "@/views/profile/tools";
import { Metadata } from "next";

type Params = Promise<{ wallet: string }>;

interface Props {
  params: {
    wallet: string;
    rank?: string | number;
  };
}

const NEXT_PUBLIC_SHARE_DOMAIN = process.env.NEXT_PUBLIC_SHARE_DOMAIN;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { wallet, rank } = params;
  const ogURL = new URL(`${NEXT_PUBLIC_SHARE_DOMAIN}/api/og`);
  ogURL.searchParams.set("wallet", wallet);
  const title = getOGTitle({ rank: rank ?? "??" });

  return {
    title,
    description: `Wallet ${wallet} is making moves on MemeRank. Check out their current position in the leaderboard.`,
    openGraph: {
      images: [ogURL.toString()],
      title,
      description: `MemeRank's leaderboard status for wallet ${wallet}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: `🔥 See how wallet ${wallet} ranks among the top meme lords on MemeRank.`,
      images: [ogURL.toString()],
    },
  };
}

const Profile = async (props: { params: Params }) => {
  const params = await props.params;
  const wallet = typeof params === "string" ? params : params.wallet;

  return <ProfileView wallet={wallet} />;
};
export default Profile;
