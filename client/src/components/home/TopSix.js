import { useState, useEffect } from "react";
import { get } from "../../adapters/xhr";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

let called = [];

const TopSix = () => {
  const [current, setCurrent] = useState("resorts");
  const [data, setData] = useState({
    resorts: null,
    boats: null,
    adventures: null,
  });
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    called = [];
  }, []);
  useEffect(() => {
    if (!called.includes(current)) {
      getData();
    } else {
      setCurrentData(data[current]);
    }
  }, [current]);

  const getData = () => {
    get(`/api/ads/${current}/top6`).then((response) => {
      called.push(current);
      let new_data = data;
      new_data[current] = response.data;
      setData(new_data);
      setCurrentData(data[current]);
    });
  };

  const getPlaceholderImage = (what) => {
    if (what === "resorts") return "/images/property-placeholder.jpg";
    if (what === "boats") return "/images/boat-placeholder.jpg";
    if (what === "adventures") return "/images/fish-placeholder.jpg";
  };

  if (!currentData) {
    return null;
  }

  return (
    <div
      className="py-11 w-full px-8 lg:px-28 xl:px-40
    text-left bg-gradient-to-b from-stone-50 to-white shadow-sm"
    >
      <div className="flex justify-between">
        <div className="text-lg font-medium">Our recommendations</div>
        <div className="hidden sm:flex gap-x-2">
          <Icon
            className={`my-auto w-6 h-6 cursor-pointer
          ${
            current === "resorts"
              ? "text-gray-800"
              : "text-gray-500 hover:text-gray-700"
          }`}
            icon="tabler:window"
            inline={true}
            onClick={() => setCurrent("resorts")}
          />

          {/* <Icon
            className={`my-auto w-6 h-6 cursor-pointer
          ${
            current === "boats"
              ? "text-gray-800"
              : "text-gray-500 hover:text-gray-700"
          }`}
            icon="tabler:sailboat"
            inline={true}
            onClick={() => setCurrent("boats")}
          /> */}

          <svg
            onClick={() => setCurrent("boats")}
            className={`my-auto inline-block w-6 h-6 cursor-pointer fill-current 
        ${
          current === "boats"
            ? "text-gray-800"
            : "text-gray-500 hover:text-gray-700"
        }`}
            viewBox="0 0 384.418 384.418"
          >
            <g>
              <path
                d="M336.353,152.895c-21.003-15.937-47.089-24.713-73.454-24.713h-9.251v-14.758
		c0-0.627-0.065-1.238-0.175-1.833l1.001-0.424c5.086-2.152,7.464-8.021,5.312-13.107c-2.152-5.085-8.02-7.462-13.107-5.312
		l-41.146,17.413c-5.086,2.152-7.464,8.021-5.312,13.107c1.614,3.814,5.317,6.105,9.214,6.105c1.299,0,2.621-0.255,3.893-0.793
		l20.321-8.599v8.202h-6.229c-5.523,0-10,4.477-10,10c0,6.366-1.296,12.434-3.637,17.957H64c-5.523,0-10,4.477-10,10v18.192H32.582
		c-4.082,0-7.754,2.481-9.278,6.269L0.722,246.749c-1.239,3.082-0.868,6.578,0.992,9.33c1.859,2.752,4.964,4.401,8.286,4.401h31.554
		c0.068,0.145,0.128,0.291,0.204,0.434l14,26.253c1.738,3.259,5.13,5.294,8.824,5.294h220.52c1.179,0,2.348-0.208,3.455-0.616
		l71.316-26.253c2.561-0.943,4.502-2.825,5.583-5.112h8.963c5.523,0,10-4.477,10-10v-0.779
		C384.418,211.922,366.45,175.732,336.353,152.895z M74,176.139h123.475c-7.45,5.159-16.478,8.192-26.206,8.192H74V176.139z
		 M39.338,204.331h131.931c33.075,0,60.559-24.403,65.395-56.149h26.235c22.025,0,43.819,7.332,61.365,20.646
		c22.682,17.21,37.119,43.5,39.728,71.653H24.8L39.338,204.331z M283.319,272.462H70.582l-6.389-11.981h251.673L283.319,272.462z"
              />
            </g>
          </svg>

          {/* <Icon
            className={`my-auto w-6 h-6 cursor-pointer
          ${
            current === "adventures"
              ? "text-gray-800"
              : "text-gray-500 hover:text-gray-700"
          }`}
            icon="tabler:fish"
            inline={true}
            onClick={() => setCurrent("adventures")}
          /> */}
        </div>
      </div>
      <div className="text-xs">Explore the best we have to offer</div>
      <div className="sm:hidden flex gap-x-2 mt-2">
        <Icon
          className={`my-auto w-6 h-6 cursor-pointer
          ${
            current === "resorts"
              ? "text-gray-800"
              : "text-gray-500 hover:text-gray-700"
          }`}
          icon="tabler:window"
          inline={true}
          onClick={() => setCurrent("resorts")}
        />

        {/* <Icon
          className={`my-auto w-6 h-6 cursor-pointer
          ${
            current === "boats"
              ? "text-gray-800"
              : "text-gray-500 hover:text-gray-700"
          }`}
          icon="tabler:sailboat"
          inline={true}
          onClick={() => setCurrent("boats")}
        /> */}

        <svg
          onClick={() => setCurrent("boats")}
          className={`my-auto inline-block w-6 h-6 cursor-pointer fill-current 
        ${
          current === "boats"
            ? "text-gray-800"
            : "text-gray-500 hover:text-gray-700"
        }`}
          viewBox="0 0 384.418 384.418"
        >
          <g>
            <path
              d="M336.353,152.895c-21.003-15.937-47.089-24.713-73.454-24.713h-9.251v-14.758
		c0-0.627-0.065-1.238-0.175-1.833l1.001-0.424c5.086-2.152,7.464-8.021,5.312-13.107c-2.152-5.085-8.02-7.462-13.107-5.312
		l-41.146,17.413c-5.086,2.152-7.464,8.021-5.312,13.107c1.614,3.814,5.317,6.105,9.214,6.105c1.299,0,2.621-0.255,3.893-0.793
		l20.321-8.599v8.202h-6.229c-5.523,0-10,4.477-10,10c0,6.366-1.296,12.434-3.637,17.957H64c-5.523,0-10,4.477-10,10v18.192H32.582
		c-4.082,0-7.754,2.481-9.278,6.269L0.722,246.749c-1.239,3.082-0.868,6.578,0.992,9.33c1.859,2.752,4.964,4.401,8.286,4.401h31.554
		c0.068,0.145,0.128,0.291,0.204,0.434l14,26.253c1.738,3.259,5.13,5.294,8.824,5.294h220.52c1.179,0,2.348-0.208,3.455-0.616
		l71.316-26.253c2.561-0.943,4.502-2.825,5.583-5.112h8.963c5.523,0,10-4.477,10-10v-0.779
		C384.418,211.922,366.45,175.732,336.353,152.895z M74,176.139h123.475c-7.45,5.159-16.478,8.192-26.206,8.192H74V176.139z
		 M39.338,204.331h131.931c33.075,0,60.559-24.403,65.395-56.149h26.235c22.025,0,43.819,7.332,61.365,20.646
		c22.682,17.21,37.119,43.5,39.728,71.653H24.8L39.338,204.331z M283.319,272.462H70.582l-6.389-11.981h251.673L283.319,272.462z"
            />
          </g>
        </svg>

        {/* <Icon
          className={`my-auto w-6 h-6 cursor-pointer
          ${
            current === "adventures"
              ? "text-gray-800"
              : "text-gray-500 hover:text-gray-700"
          }`}
          icon="tabler:fish"
          inline={true}
          onClick={() => setCurrent("adventures")}
        /> */}
      </div>

      <div
        className="grid grid-rows-3 grid-cols-2 md:grid-rows-2 md:grid-cols-3 w-full mt-8
      font-display gap-y-4 gap-x-2 sm:gap-x-4"
      >
        {currentData.slice(0, 6).map((entity) => (
          <div key={entity.id} className="w-full mx-auto">
            <Link
              to={`/${current.substring(0, current.length - 1)}/${entity.id}`}
            >
              <img
                src={
                  entity.photo
                    ? `/api/${entity.photo.uri}`
                    : getPlaceholderImage(current)
                }
                alt=""
                className="h-32 sm:h-40 w-full mx-auto object-cover rounded-lg"
              />
            </Link>

            {
              <div className="flex text-xs mt-2">
                <Icon
                  className="text-green-700 my-auto"
                  icon="tabler:star"
                  inline={true}
                />
                <div className="ml-1 pt-0.5">
                  {entity.averageRating ? entity.averageRating : "-"}
                </div>
              </div>
            }

            <div className="text-sm mt-0.5">
              <Link
                to={`/${current.substring(0, current.length - 1)}/${entity.id}`}
              >
                {entity.title}
              </Link>
            </div>

            <div className="text-xs text-slate-500 mt-0.5">
              {entity.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSix;
