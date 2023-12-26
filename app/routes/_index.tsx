import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostList, { IPostList } from "~/module-one/feature-one/PostList";
import CatGenerator from "~/module-one/feature-three/CatGenerator";
import CountryList from "~/module-one/feature-two/CountryList";

export const meta: MetaFunction = () => {
  return [
    { title: "TSIFY Migrator" },
    { name: "description", content: "Tsify it all!" },
  ];
};

type IndexLoaderData = {
  catData: any[];
  countryData: any[];
  postData: IPostList[];
}

export async function loader() {
  const [catResponse, countryResponse, postResponse] = await Promise.all([
    fetch("https://api.thecatapi.com/v1/images/search").then((res) => res.json()),
    fetch("https://restcountries.com/v3.1/region/europe").then((res) => res.json()),
    fetch("https://jsonplaceholder.typicode.com/posts").then((res) => res.json()),
  ]);

  return json<IndexLoaderData>({
    catData: catResponse,
    countryData: countryResponse,
    postData: postResponse.slice(0, 5)
  });
}

export default function Index() {
  const { catData, countryData, postData } = useLoaderData<IndexLoaderData>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Index App</h1>
      <div>
        <h2>Post List</h2>
        <PostList data={postData} />
      </div>
      <div>
        <CountryList data={countryData} />
      </div>
      <div>
        <CatGenerator data={catData} />
      </div>
    </div>
  )
}
