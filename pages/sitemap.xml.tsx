import { GetServerSidePropsContext } from "next";
import React from "react";
import "firebase/firestore";
import firebase from "../plugins/firebase";

const db = firebase.firestore();

const createSitemap = (apps) => {
  const siteUrl = "https://www.pwalist.app";

  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        <url>
          <loc>https://www.pwalist.app/</loc>
            <lastmod>2022-05-05T04:15:45+00:00</lastmod>
            <priority>1.00</priority>
          </url>
          <url>
            <loc>https://www.pwalist.app/search</loc>
            <lastmod>2022-05-05T04:15:45+00:00</lastmod>
            <priority>0.80</priority>
          </url>
          <url>
            <loc>https://www.pwalist.app/categories/business</loc>
            <lastmod>2022-05-05T04:15:45+00:00</lastmod>
            <priority>0.80</priority>
          </url>
          <url>
            <loc>https://www.pwalist.app/categories/design</loc>
            <lastmod>2022-05-05T04:15:45+00:00</lastmod>
            <priority>0.80</priority>
          </url>
          <url>
            <loc>https://www.pwalist.app/categories/education</loc>
            <lastmod>2022-05-05T04:15:45+00:00</lastmod>
            <priority>0.80</priority>
          </url>
          <url>
            <loc>https://www.pwalist.app/categories/entertainment</loc>
            <lastmod>2022-05-05T04:15:45+00:00</lastmod>
            <priority>0.80</priority>
          </url>
          <url>
            <loc>https://www.pwalist.app/categories/food</loc>
            <lastmod>2022-05-05T04:15:45+00:00</lastmod>
            <priority>0.80</priority>
          </url>
          <url>
            <loc>https://www.pwalist.app/categories/games</loc>
            <lastmod>2022-05-05T04:15:45+00:00</lastmod>
            <priority>0.80</priority>
          </url>
          <url>
            <loc>https://www.pwalist.app/categories/lifestyle</loc>
            <lastmod>2022-05-05T04:15:45+00:00</lastmod>
            <priority>0.80</priority>
          </url>
          <url>
            <loc>https://www.pwalist.app/categories/music</loc>
            <lastmod>2022-05-05T04:15:45+00:00</lastmod>
            <priority>0.80</priority>
          </url>
          <url>
            <loc>https://www.pwalist.app/categories/news</loc>
            <lastmod>2022-05-05T04:15:45+00:00</lastmod>
            <priority>0.80</priority>
          </url>
          <url>
            <loc>https://www.pwalist.app/categories/shopping</loc>
            <lastmod>2022-05-05T04:15:45+00:00</lastmod>
            <priority>0.80</priority>
          </url>
          <url>
            <loc>https://www.pwalist.app/categories/social</loc>
            <lastmod>2022-05-05T04:15:45+00:00</lastmod>
            <priority>0.80</priority>
          </url>
          <url>
            <loc>https://www.pwalist.app/categories/tech</loc>
            <lastmod>2022-05-05T04:15:45+00:00</lastmod>
            <priority>0.80</priority>
          </url>
          <url>
            <loc>https://www.pwalist.app/categories/tools</loc>
            <lastmod>2022-05-05T04:15:45+00:00</lastmod>
            <priority>0.80</priority>
          </url>
          <url>
            <loc>https://www.pwalist.app/categories/travel</loc>
            <lastmod>2022-05-05T04:15:45+00:00</lastmod>
            <priority>0.80</priority>
          </url>
          <url>
            <loc>https://www.pwalist.app/about</loc>
            <lastmod>2022-05-05T04:15:45+00:00</lastmod>
            <priority>0.80</priority>
          </url>
          <url>
            <loc>https://www.pwalist.app/sign-up</loc>
            <lastmod>2022-05-05T04:15:45+00:00</lastmod>
            <priority>0.80</priority>
          </url>
          <url>
            <loc>https://www.pwalist.app/terms-privacy</loc>
            <lastmod>2022-05-05T04:15:45+00:00</lastmod>
            <priority>0.80</priority>
          </url>
        ${apps
          .map(({ nameLowercase, updatedAt }) => {
            return `
                    <url>
                        <loc>${`${siteUrl}/app/${nameLowercase}`}</loc>
                        <lastmod>${updatedAt}</lastmod>
                        <priority>0.70</priority>
                    </url>
                `;
          })
          .join("")}
    </urlset>
    `;
};

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const applications = await db.collection("applications").where("isPublic", "==", true).orderBy("updatedAt").get();
  const apps = applications.docs.map((doc) => ({
    nameLowercase: doc.data().nameLowercase,
    updatedAt: new Date(doc.data().updatedAt.seconds * 1000).toISOString().replace(/.000Z/, "+00:00"),
  }));
  res.setHeader("Content-Type", "text/xml");
  res.write(createSitemap(apps));
  res.end();
  return { props: {} };
};

const Sitemap = () => {
  return <></>;
};

export default Sitemap;
