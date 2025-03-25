/* eslint-disable @next/next/no-img-element */

import { formatCurrency, trimWallet } from "@/lib/utils";
import { Rank } from "@/types/rank";
import { ImageResponse } from "@vercel/og";
import { Image } from "lucide-react";

export const runtime = "edge";

const BACKGROUNDS = ["bg_1", "bg_2", "bg_3", "bg_4", "bg_5", "bg_6"];
const NEXT_PUBLIC_SHARE_DOMAIN = process.env.NEXT_PUBLIC_SHARE_DOMAIN;
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: Request) {
  try {
    const font1 = await fetch(
      new URL("../../../public/fonts/press.ttf", import.meta.url)
    );

    if (!font1.ok) {
      throw new Error("Failed to fetch the font file");
    }

    const fontData1 = await font1.arrayBuffer();

    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get("wallet") || "";

    const response = await fetch(`${NEXT_PUBLIC_API_URL}/users/get/${wallet}`);
    const jsonData = (await response.json()) as (Rank | null)[];
    const userData = jsonData?.[0] || null;
    const randomBack1 =
      BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
    const randomBack2 =
      BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
    const randomBack3 =
      BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
    const randomBack4 =
      BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full items-center justify-center">
          <div tw="flex absolute top-0 left-0 z-1 h-full w-full">
            <div
              style={{
                backgroundImage: `url(${NEXT_PUBLIC_SHARE_DOMAIN}/images/${randomBack1}/layer1.png)`,
              }}
              tw="flex absolute h-full w-full bg-repeat-x bg-cover bg-center"
            ></div>

            <div
              style={{
                backgroundImage: `url(${NEXT_PUBLIC_SHARE_DOMAIN}/images/${randomBack2}/layer2.png)`,
              }}
              tw="flex absolute h-full w-full bg-repeat-x bg-cover bg-center"
            ></div>

            <div
              style={{
                backgroundImage: `url(${NEXT_PUBLIC_SHARE_DOMAIN}/images/${randomBack3}/layer3.png)`,
              }}
              tw="flex absolute h-full w-full bg-repeat-x bg-cover bg-center"
            ></div>

            <div
              style={{
                backgroundImage: `url(${NEXT_PUBLIC_SHARE_DOMAIN}/images/${randomBack4}/layer4.png)`,
              }}
              tw="flex absolute h-full w-full bg-repeat-x bg-cover bg-center"
            ></div>

            <div tw="flex absolute h-full w-full bg-black/30"></div>
          </div>

          <div tw="flex flex-col w-[250px] h-[250px] mt-[-70px] mb-[30px]">
            <img
              src={`${NEXT_PUBLIC_SHARE_DOMAIN}/images/logo.png`}
              alt="MemeRank Logo"
              width={250}
              height={250}
              tw="mt-8"
            />
          </div>

          <div tw="flex flex-col p-6 w-[1100px] bg-black/50 border-2 rounded-lg tracking-wide border-white shadow-[0_0_5px_white,_inset_0_0_5px_white]">
            <div tw="flex flex-col sm:flex-row items-center w-[300px] h-[150px]">
              <div tw="flex rounded-full overflow-hidden border-2 border-white">
                <img
                  src={`${NEXT_PUBLIC_SHARE_DOMAIN}/images/avatar/avatar1.png`}
                  alt="Profile"
                  width={150}
                  height={150}
                />
              </div>

              <div tw="flex flex-col h-[150px] ml-6 mt-8">
                <div tw="flex flex-col h-[50px]">
                  <h1 tw="text-white text-[28px]">{trimWallet(wallet, 3)}</h1>
                  <p tw="text-white text-xs">
                    {`Last Update: ${new Date(
                      userData?.stat_date ?? 0
                    ).toLocaleString()}`}
                  </p>
                </div>
              </div>
            </div>

            <div tw="flex mt-6 w-full justify-between">
              <div tw="flex flex-col bg-black/50 w-[250px] h-[110px] rounded-lg border-2 items-center justify-center border-[#00f3ff]">
                <div tw="flex flex-col mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                  </svg>
                </div>

                <div tw="flex flex-col items-center">
                  <p tw="text-white text-[13px]">Rank</p>
                  <p tw="text-white mt-[-5px] text-[20px]">{`#${userData?.ranking}`}</p>
                </div>
              </div>

              <div tw="flex flex-col bg-black/50 w-[250px] h-[110px] rounded-lg border-2 items-center justify-center border-white">
                <div tw="flex flex-col mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                    <path d="M12 18V6"></path>
                  </svg>
                </div>

                <div tw="flex flex-col items-center">
                  <p tw="text-white text-[13px]">Realized Gains</p>
                  <p tw="text-white mt-[-5px] text-[20px]">
                    {formatCurrency(userData?.total_realized_gains)}
                  </p>
                </div>
              </div>

              <div tw="flex flex-col bg-black/50 w-[250px] h-[110px] rounded-lg border-2 items-center justify-center border-white">
                <div tw="flex flex-col mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                    <path d="M12 18V6"></path>
                  </svg>
                </div>

                <div tw="flex flex-col items-center">
                  <p tw="text-white text-[13px]">Unrealized Gains</p>
                  <p tw="text-white mt-[-5px] text-[20px]">
                    {formatCurrency(userData?.total_unrealized_gains)}
                  </p>
                </div>
              </div>

              <div tw="flex flex-col bg-black/50 w-[250px] h-[110px] rounded-lg border-2 items-center justify-center border-white">
                <div tw="flex flex-col mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                    <path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7"></path>
                  </svg>
                </div>

                <div tw="flex flex-col items-center">
                  <p tw="text-white text-[13px]">PNL</p>
                  <p tw="text-white mt-[-5px] text-[20px]">
                    {formatCurrency(userData?.total_pnl)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        status: 200,
        fonts: [
          {
            name: "press",
            data: fontData1,
            style: "normal",
          },
        ],
        statusText: "Ok",
      }
    );
  } catch (e) {
    console.log(e);
    return new Response("Failed to render", { status: 500 });
  }
}
