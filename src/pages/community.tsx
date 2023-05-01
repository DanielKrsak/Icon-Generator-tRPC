import type { Icon } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";

const CommunityPage: NextPage = () => {
  const icons = api.icons.getCommunityIcons.useQuery();

  return (
    <>
      <Head>
        <title>Community Icons</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto mt-24 flex min-h-screen flex-col gap-6 px-12">
        <h1 className="text-4xl">Community Icons</h1>
        <section>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
            {icons.data?.map((icon: Icon) => {
              return (
                <li key={icon.id}>
                  <Image
                    width={100}
                    height={100}
                    alt={icon.prompt ?? "Image of an icon"}
                    src={`https://icon-generator-bucket.s3.amazonaws.com/${icon.id}`}
                    className="w-full"
                  />
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
};

export default CommunityPage;
