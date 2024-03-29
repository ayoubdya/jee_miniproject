import { useState } from "react";
import { post } from "../../adapters/xhr";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import ReactFlagsSelect from "react-flags-select";
import Map from "../profile/additional/Map";
import { date } from "yup";

import MessageModal from "../modals/MessageModal";

const ResortInfoEditor = () => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [availableAfter, setAvailableAfter] = useState(null);
  const [availableUntil, setAvailableUntil] = useState(null);
  const [rules, setRules] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [cancellationFee, setCancellationFee] = useState(null);
  const [address, setAddress] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [city, setCity] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [state, setState] = useState(null);
  const [tags, setTags] = useState("");
  const [pricingDescription, setPricingDescription] = useState(null);
  const [pricePerDay, setPricePerDay] = useState(null);
  const [optionsInputFields, setOptionsInputFields] = useState([
    { name: "", description: "", maxCount: "" },
  ]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [photoIds, setPhotoIds] = useState([]);
  const [checkInTime, setCheckInTime] = useState([null]);
  const [checkOutTime, setCheckOutTime] = useState([null]);

  const [currentPosition, setCurrentPosition] = useState([33.5731, -7.5898]);

  const [bedCountPerRoom, setBedCountPerRoom] = useState([0]);

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageModalText, setMessageModalText] = useState("");

  const navigate = useNavigate();

  const createAd = () => {
    post(`/api/ads/resorts`, {
      description: description,
      cancellationFee: 10,
      title: title,
      capacity: capacity,
      bedCountPerRoom: bedCountPerRoom,
      currency: currency,
      rules: rules,
      pricingDescription: pricingDescription,
      pricePerDay: pricePerDay,
      address: {
        address: address,
        postalCode: postalCode,
        city: city,
        countryCode: countryCode,
        state: state,
        latitude: currentPosition.lat,
        longitude: currentPosition.lng % 180,
      },
      tagNames: tags.split(/[\s,]+/),
      options: Array.from(optionsInputFields),
      photoIds: photoIds,
      checkInTime: "10:00",
      checkOutTime: "19:00",
      availableAfter: availableAfter,
      availableUntil: availableUntil,
    })
      .then((response) => {
        navigate(`/resort/${response.data.id}`);
      })
      .catch((error) => {
        setMessageModalText(error.response.data.message);
        setShowMessageModal(true);
      });
  };

  const handleOptionsChange = (index, event) => {
    let data = [...optionsInputFields];
    data[index][event.target.name] = event.target.value;
    setOptionsInputFields(data);
  };

  const addOptionField = () => {
    let newField = { name: "", description: "", maxCount: "" };
    setOptionsInputFields([...optionsInputFields, newField]);
  };

  const removeOptionField = (index) => {
    let data = [...optionsInputFields];
    data.splice(index, 1);
    setOptionsInputFields(data);
  };

  const updateNumberOfRooms = (newNumber) => {
    let oldNumber = bedCountPerRoom.length;
    let data = [...bedCountPerRoom];

    if (newNumber > oldNumber) {
      data = data.concat(Array(newNumber - oldNumber).fill(0));
    } else {
      data = data.slice(0, newNumber);
    }

    setBedCountPerRoom(data);
  };

  const handleBedCountPerRoomChange = (index, event) => {
    let data = [...bedCountPerRoom];
    data[index] = event.target.value;
    setBedCountPerRoom(data);
  };

  const uploadImage = () => {
    const file = document.getElementById("image-input").files[0];
    const data = new FormData();
    data.append("file", file);

    post(`/api/photos/upload`, data).then((response) => {
      setPhotoIds([...photoIds, response.data.id]);
      setPhotoPreviews([...photoPreviews, "/api" + response.data.uri]);
    });
  };

  const removeImage = (index) => {
    let ids = [...photoIds];
    let previews = [...photoPreviews];

    ids.splice(index, 1);
    previews.splice(index, 1);

    setPhotoIds(ids);
    setPhotoPreviews(previews);
  };

  return (
    <div className="block w-full">
      <h1 className="text-2xl text-left text-gray-400 font-sans">
        Create a new profile for your resort
      </h1>

      {/* Basic info */}
      <h2 className="flex text-xl text-left text-gray-800 font-sans mt-12">
        <Icon
          className="mr-2"
          icon="tabler:info-circle"
          inline={true}
          fontSize={30}
        />
        <span>Basic information</span>
      </h2>

      <div className="mt-2 text-left">
        <label className="text-xs">title</label>
        <input
          placeholder="title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-2
        focus:outline-none focus:border-gray-500 w-full caret-gray-700"
        />
      </div>

      <div className="mt-2 text-left">
        <label className="text-xs">description</label>
        <textarea
          placeholder="tell the world about your offer"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-1
        focus:outline-none focus:border-gray-500 w-full caret-gray-700"
          rows="5"
        />
      </div>

      {/* Photos */}
      <h2 className="flex text-xl text-left text-gray-800 font-sans mt-12">
        <Icon
          className="mr-2"
          icon="tabler:camera"
          inline={true}
          fontSize={30}
        />
        <span>Photos</span>
      </h2>

      <div className="flex flex-wrap gap-x-4 gap-y-4 mt-4">
        <div className="block col-span-1">
          <div className="flex rounded-lg w-full ml-1">
            <label
              id="label-input"
              className="outline-dashed outline-2 outline-offset-2 outline-gray-400
              hover:outline-gray-600
            hover:border-gray-300 cursor-pointer"
            >
              <div className="flex flex-col justify-center w-24 h-24 rounded-xl object-cover">
                <Icon icon="tabler:plus" className="mx-auto h-10 w-10" />
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={() => uploadImage()}
                id="image-input"
                className="opacity-0 hidden h-0 w-0"
              />
            </label>
          </div>
        </div>

        {photoPreviews.map((preview, index) => {
          return (
            <div key={index} className="block col-span-1">
              <div className="flex rounded-lg w-full ml-1">
                <label
                  id="label-input"
                  className="outline-dashed outline-2 outline-offset-2 outline-gray-400
              hover:outline-red-600
            hover:border-gray-300 cursor-pointer"
                >
                  <img
                    alt=""
                    id="image-preview"
                    src={preview}
                    className="flex-none w-24 h-24 rounded-xl object-cover"
                    onClick={() => removeImage(index)}
                  />
                </label>
              </div>
            </div>
          );
        })}
      </div>

      {/* Location info */}
      <h2 className="flex text-xl text-left text-gray-800 font-sans mt-12">
        <Icon
          className="mr-2"
          icon="tabler:map-pin"
          inline={true}
          fontSize={30}
        />
        <span>Location</span>
      </h2>

      <div className="grid grid-cols-3 mt-2 gap-x-3">
        <div className="block col-span-2 text-left">
          <label className="text-xs">address</label>
          <input
            placeholder="address"
            onChange={(event) => {
              setAddress(event.target.value);
            }}
            className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-2
          focus:outline-none focus:border-gray-500 w-full caret-gray-700"
          />
        </div>

        <div className="block col-span-1 text-left">
          <label className="text-xs">city</label>
          <input
            placeholder="city"
            onChange={(event) => {
              setCity(event.target.value);
            }}
            className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-2
          focus:outline-none focus:border-gray-500 w-full caret-gray-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 mt-2 gap-x-3">
        <div className="block col-span-1 text-left">
          <label className="text-xs">postal code</label>
          <input
            placeholder="postal code"
            onChange={(event) => {
              setPostalCode(event.target.value);
            }}
            className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-2
          focus:outline-none focus:border-gray-500 w-full caret-gray-700"
          />
        </div>

        <div className="block col-span-1 text-left">
          <label className="text-xs">state</label>
          <input
            placeholder="state"
            onChange={(event) => {
              setState(event.target.value);
            }}
            className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-2
          focus:outline-none focus:border-gray-500 w-full caret-gray-700"
          />
        </div>

        <div className="block col-span-1 text-left">
          <label className="text-xs">country</label>
          <ReactFlagsSelect
            selectedSize={15}
            optionsSize={15}
            searchable={true}
            selected={countryCode}
            onSelect={(code) => setCountryCode(code)}
          />
        </div>
      </div>

      <div className="block text-left mt-4">
        <label className="text-s">Pinpoint location on a map</label>
        <Map
          allowChange={true}
          coordinates={currentPosition}
          changeCoordinates={setCurrentPosition}
        />
      </div>

      {/* Details */}
      <h2 className="flex text-xl text-left text-gray-800 font-sans mt-12">
        <Icon
          className="mr-2"
          icon="tabler:list-details"
          inline={true}
          fontSize={30}
        />
        <span>Details</span>
      </h2>

      <div className="block col-span-2 text-left">
        <label className="text-xs">rules of conduct</label>
        <textarea
          placeholder="rules of conduct"
          onChange={(event) => {
            setRules(event.target.value);
          }}
          className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-1
        focus:outline-none focus:border-gray-500 w-full caret-gray-700"
          rows="5"
        />
      </div>

      <div className="grid grid-cols-3 mt-2 gap-x-3">
        <div className="block col-span-1 text-left">
          <label className="text-xs">capacity</label>
          <input
            placeholder="number of guests allowed"
            onChange={(event) => {
              setCapacity(event.target.value);
            }}
            type="number"
            className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-2
          focus:outline-none focus:border-gray-500 w-full caret-gray-700"
          />
        </div>

        <div className="block col-span-1 text-left">
          <label className="text-xs">number of rooms</label>
          <input
            placeholder="number of rooms"
            onChange={(event) => {
              updateNumberOfRooms(event.target.value);
            }}
            type="number"
            min="1"
            className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-2
          focus:outline-none focus:border-gray-500 w-full caret-gray-700"
          />
        </div>
      </div>

      <div className="block text-left mt-8">
        <label className="text-s">Bed count in each room</label>
      </div>

      <div className="grid grid-cols-12 mt-2 gap-3">
        {bedCountPerRoom.map((input, index) => {
          return (
            <div key={index} className="block col-span-1 text-left">
              <input
                placeholder="beds"
                value={input}
                type="number"
                min="0"
                onChange={(event) => handleBedCountPerRoomChange(index, event)}
                className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-2
              focus:outline-none focus:border-gray-500 w-full caret-gray-700"
              />
            </div>
          );
        })}
      </div>

      {/* Options */}
      <div className="block text-left mt-8">
        <label className="text-s">Options</label>
      </div>

      {optionsInputFields.map((input, index) => {
        return (
          <div key={index} className="grid grid-cols-12 mt-1 gap-x-3">
            <div className="block col-span-4 text-left">
              <input
                placeholder="option name"
                name="name"
                value={input.name}
                onChange={(event) => handleOptionsChange(index, event)}
                className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-2
              focus:outline-none focus:border-gray-500 w-full caret-gray-700"
              />
            </div>

            <div className="block col-span-5 text-left">
              <input
                placeholder="description"
                name="description"
                value={input.description}
                onChange={(event) => handleOptionsChange(index, event)}
                className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-2
              focus:outline-none focus:border-gray-500 w-full caret-gray-700"
              />
            </div>

            <div className="block col-span-2 text-left">
              <input
                placeholder="max count"
                name="maxCount"
                value={input.maxCount}
                onChange={(event) => handleOptionsChange(index, event)}
                type="number"
                className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-2
              focus:outline-none focus:border-gray-500 w-full caret-gray-700"
              />
            </div>

            <button onClick={() => removeOptionField(index)}>Remove</button>
          </div>
        );
      })}

      <div className="block mt-4">
        <button onClick={addOptionField}>Add option..</button>
      </div>

      {/* Tags */}
      <div className="block text-left mt-4">
        <label className="text-xs">tags</label>
        <input
          placeholder="tags separated by comma"
          onChange={(event) => {
            setTags(event.target.value);
          }}
          className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-2
        focus:outline-none focus:border-gray-500 w-full caret-gray-700"
        />
      </div>

      {/* Pricing */}
      <h2 className="flex text-xl text-left text-gray-800 font-sans mt-12">
        <Icon className="mr-2" icon="tabler:coin" inline={true} fontSize={30} />
        <span>Pricing</span>
      </h2>

      <div className="grid grid-cols-3 mt-1 gap-x-3">
        <div className="block col-span-1 text-left">
          <label className="text-xs">price per day</label>
          <input
            placeholder="price per day"
            onChange={(event) => {
              setPricePerDay(event.target.value);
            }}
            className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-2
          focus:outline-none focus:border-gray-500 w-full caret-gray-700"
          />
        </div>

        <div className="block col-span-1 text-left">
          <label className="text-xs">currency</label>
          <input
            placeholder="e.g. MAD, EUR, USD"
            onChange={(event) => {
              setCurrency(event.target.value);
            }}
            className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-2
          focus:outline-none focus:border-gray-500 w-full caret-gray-700"
          />
        </div>

        <div className="hidden col-span-1 text-left">
          <label className="text-xs">cancellation fee</label>
          <input
            placeholder="cancellation fee"
            onChange={(event) => {
              setCancellationFee(event.target.value);
            }}
            type="number"
            className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-2
          focus:outline-none focus:border-gray-500 w-full caret-gray-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 mt-2 gap-x-3">
        <div className="block col-span-2 text-left">
          <label className="text-xs">Pricing description</label>
          <textarea
            placeholder="additional info about prices"
            onChange={(event) => {
              setPricingDescription(event.target.value);
            }}
            className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-1
          focus:outline-none focus:border-gray-500 w-full caret-gray-700"
            rows="3"
          />
        </div>
      </div>

      {/* Check in and check out */}
      {/* <h2 className="flex text-xl text-left text-gray-800 font-sans mt-6 pt-6">
        <Icon
          className="mr-2"
          icon="tabler:clock"
          inline={true}
          fontSize={30}
        />
        <span>Check in and check out</span>
      </h2>
      <div className="grid grid-cols-4 mt-1 gap-x-3">
        <div className="block col-span-2 text-left">
          <label className="text-xs">check in</label>
          <input
            onChange={(event) => {
              setCheckInTime(event.target.value);
            }}
            autoComplete="off"
            type="time"
            className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-2
    focus:outline-none focus:border-gray-500 w-full caret-gray-700"
          />
        </div>

        <div className="block col-span-2 text-left">
          <label className="text-xs">check out</label>
          <input
            onChange={(event) => {
              setCheckOutTime(event.target.value);
            }}
            autoComplete="off"
            type="time"
            className="block rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-2
    focus:outline-none focus:border-gray-500 w-full caret-gray-700"
          />
        </div>
      </div> */}

      {/* Availability */}
      <h2 className="flex text-xl text-left text-gray-800 font-sans mt-6 pt-6">
        <Icon
          className="mr-2"
          icon="tabler:calendar"
          inline={true}
          fontSize={30}
        />
        <span>Availability</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-1 gap-x-3">
        <div className="col-1 text-left">
          <label className="text-xs">available after</label>
          <div className="flex gap-x-3">
            <input
              value={availableAfter}
              type="date"
              onChange={(event) => {
                setAvailableAfter(event.target.value);
              }}
              className="rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-2
  focus:outline-none focus:border-gray-500 w-full caret-gray-700"
            />
            <button
              className="rounded-lg border border-gray-300 px-3"
              onClick={() => {
                setAvailableAfter("");
              }}
            >
              <Icon icon="tabler:rotate-clockwise" vFlip={true} fontSize={20} />
            </button>
          </div>
        </div>
        <div className="col-span-1 text-left">
          <label className="text-xs">available until</label>
          <div className="flex gap-x-3">
            <input
              value={availableUntil}
              onChange={(event) => {
                setAvailableUntil(event.target.value);
              }}
              type="date"
              className="rounded-lg px-3 border text-gray-700 border-gray-300 text-base py-2
focus:outline-none focus:border-gray-500 w-full caret-gray-700"
            />
            <button
              className="rounded-lg border border-gray-300 px-3"
              onClick={() => {
                setAvailableUntil("");
              }}
            >
              <Icon icon="tabler:rotate-clockwise" vFlip={true} fontSize={20} />
            </button>
          </div>
        </div>
      </div>

      {/* confirm button */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-6 mt-4">
        <div className="flex flex-col justify-end md:col-start-3 text-left w-full">
          <button
            className="bg-teal-600 hover:bg-teal-700 active:bg-teal-800 w-full drop-shadow-md
          text-white rounded-lg py-2.5 lg:py-2 text-sm lg:text-base mb-1.5 mt-3 md:mt-0"
            onClick={() => {
              createAd();
            }}
          >
            Create advertisement
          </button>
        </div>
      </div>

      {showMessageModal && (
        <MessageModal
          closeFunction={() => setShowMessageModal(false)}
          text={messageModalText}
        />
      )}
    </div>
  );
};

export default ResortInfoEditor;
