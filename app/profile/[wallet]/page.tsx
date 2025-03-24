"use server";

import ProfileView from "@/views/profile";
import { Metadata } from "next";

type Params = Promise<{ wallet: string }>;
type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ogURL = new URL("https://rank-meme-frontend.vercel.app/api/og");
  const { wallet } = await params;

  return {
    title: `MemeRank | ${wallet}`,
    description: "Check out the current ranking of your memes on MemeRank!",
    openGraph: {
      images: ogURL.toString(),
    },
  };
}

const Profile = async (props: { params: Params }) => {
  const params = await props.params;
  const wallet = typeof params === "string" ? params : params.wallet;

  return <ProfileView wallet={wallet} />;
};
export default Profile;
