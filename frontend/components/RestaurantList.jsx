import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import Loader from "./Loader";

const QUERY = gql`
  {
    restaurants {
      data {
        id
        attributes {
          name
          description
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

function RestaurantCard({ data }) {
  const { name, description, image } = data.attributes;

  // ✅ Image URL handling (supports array or single object)
  const imageData = image?.data;
  const BASE_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";
  let imageUrl = "/next.svg"; // fallback to existing public asset
  let rawUrl = null;

  if (Array.isArray(imageData) && imageData.length > 0) {
    rawUrl = imageData[0]?.attributes?.url || null;
  } else if (imageData?.attributes?.url) {
    rawUrl = imageData.attributes.url;
  }

  if (rawUrl) {
    const isAbsolute = /^https?:\/\//i.test(rawUrl);
    imageUrl = isAbsolute ? rawUrl : `${BASE_URL}${rawUrl}`;
  }

  // ✅ Description handling (works for string or rich-text array)
  let plainDescription = "";
  if (typeof description === "string") {
    plainDescription = description;
  } else if (Array.isArray(description)) {
    // Convert Strapi rich text object to plain text
    plainDescription = description
      .map((block) =>
        block.children?.map((child) => child.text).join(" ")
      )
      .join(" ");
  }

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="h-full bg-gray-100 rounded-2xl">
        {/* Restaurant Image */}
        <Image
          className="w-full rounded-2xl object-cover"
          height={300}
          width={300}
          src={imageUrl}
          alt={name || "Restaurant"}
        />

        {/* Content */}
        <div className="p-8">
          <h3 className="mb-3 font-heading text-xl text-gray-900 hover:text-gray-700 group-hover:underline font-black">
            {name}
          </h3>
          <p className="text-sm text-gray-500 font-bold">{plainDescription}</p>

          {/* View Button */}
          <div className="flex flex-wrap md:justify-center -m-2">
            <div className="w-full md:w-auto p-2 my-6">
              <Link
                className="block w-full px-12 py-3.5 text-lg text-center text-white font-bold bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-600 rounded-full"
                href={`/restaurant/${data.id}`}
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RestaurantList({ query }) {
  const { loading, error, data } = useQuery(QUERY);

  if (error) {
    console.error("GraphQL Error:", error);
    return (
      <div className="text-red-500 p-4">
        Error loading restaurants: {error.message}
      </div>
    );
  }

  if (loading) return <Loader />;

  if (!data?.restaurants?.data) {
    console.log("No data available:", data);
    return <div className="p-4">No restaurant data available</div>;
  }

  // ✅ Case-insensitive filtering
  const searchQuery = data.restaurants.data.filter((item) =>
    item.attributes.name?.toLowerCase().includes(query.toLowerCase())
  );

  if (searchQuery.length > 0) {
    return (
      <div className="py-16 px-8 bg-white rounded-3xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap -m-4 mb-6">
            {searchQuery.map((res) => (
              <RestaurantCard key={res.id} data={res} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <h1 className="text-center text-gray-500">No Restaurants Found</h1>;
}

export default RestaurantList;
