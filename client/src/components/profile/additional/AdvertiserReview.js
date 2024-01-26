import AdvertisementReview from "./AdvertisementReview";

const AdvertiserReview = ({ data }) => {
  return <AdvertisementReview review={data} key={data.id} addAdvertisement />;
};

export default AdvertiserReview;
