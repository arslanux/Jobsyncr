import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import Box from "@mui/material/Box";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { useNavigate } from "react-router-dom";
import { Button, Skeleton } from "@mui/material";
import {
  AdvertisementCountApi,
  ProMotionCountApi,
  getAdvertiseBanner,
} from "../../../config/ApiHandler";

const BannerSection = ({ onClickItem, ...props }) => {
  const [advertisement, setAdvertisement] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  const getAdvertisement = async () => {
    try {
      setLoading(true);
      const res = await getAdvertiseBanner();
      if (res.data?.status) {
        setAdvertisement(res.data?.data?.ad?.left);
      }
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };

  console.log(advertisement.filter((_, index) => index % 2 !== 0))

  const clickAndImpressionCountHandler = async (value, type) => {
    const isPromotion = value?.job_promotion_id ? true : false;
    let payload = {
      status: type,
    };
    if (isPromotion) {
      payload.job_promotion_id = value?.job_promotion_id;
    } else {
      payload.advertisement_id = value?.advertisement_id;
    }

    try {
      const res = isPromotion
        ? ProMotionCountApi(payload)
        : AdvertisementCountApi(payload);
    } catch (err) {
      console.warn("error", err);
    }
  };

  useEffect(() => {
    getAdvertisement();
  }, []);
  function openInNewTab(url) {
    // Use window.open() to open the URL in a new tab
    if (url) {
      if (url.includes("http://") || url.includes("https://")) {
        window.open(url, "_blank");
      } else {
        window.open("http://" + url, "_blank");
      }
    }
  }

  const [valueimg, setValueImg] = React.useState(null);

  return (
    <Box {...props}>
      {loading ? (
        <Skeleton height={400} width={312} />
      ) : advertisement?.length > 0 ? (
        <Carousel
          width={312}
          height={585}
          interval={7000}
          stopOnHover
          infiniteLoop={true}
          onChange={(e, value) => {
            clickAndImpressionCountHandler(value?.props?.value, "impression");
            setValueImg(value?.props?.value);
          }}
          showThumbs={false}
          showArrows={false}
          autoPlay={true}
          onClickItem={(e, value) => {
            clickAndImpressionCountHandler(value?.props?.value, "click");
            openInNewTab(value?.props?.value?.link);
          }}
        >
          {/* .filter(obj => Object.values(obj).some(value => typeof value === 'number' && value % 2 !== 0))? */}
          {advertisement?.filter((_, index) => index % 2 !== 0)?.map((item, index) => (
            <div key={index} value={item}>
              <img src={item?.image_url} style={{ borderRadius: "8px" }} />
              {/* {item?.link && (
                <Button
                  size="medium"
                  variant="contained"
                  color="primary"
                  href={item?.link}
                  target="_blank"
                  onClickItem={(e, value) => {
                    clickAndImpressionCountHandler(valueimg, "click");
                  }}
                  sx={{
                    position: "absolute", // Position the button absolutely
                    bottom: 0, // Align it to the bottom
                    left: "7%", // Align it to the left
                    marginBottom: 5, // Optional: Add some bottom margin for spacing
                    marginLeft: 10, // Optional: Add some left margin for spacing
                  }}
                >
                  Apply Now
                </Button>
              )} */}
            </div>
          ))}
        </Carousel>
      ) : null}

      <br />
      {loading ? (
        <Skeleton height={400} width={312} />
      ) : advertisement?.length > 0 ? (
        <Carousel
          width={312}
          height={585}
          interval={7000}
          stopOnHover
          infiniteLoop={true}
          onChange={(e, value) => {
            clickAndImpressionCountHandler(value?.props?.value, "impression");
            setValueImg(value?.props?.value);
          }}
          showThumbs={false}
          showArrows={false}
          autoPlay={true}
          onClickItem={(e, value) => {
            clickAndImpressionCountHandler(value?.props?.value, "click");
            openInNewTab(value?.props?.value?.link);
          }}
        >
          {advertisement?.filter((_, index) => index % 2 === 0).map((item, index) => (
            <div key={index} value={item}>
              <img src={item?.image_url} style={{ borderRadius: "8px" }} />
              {/* {item?.link && (
                <Button
                  size="medium"
                  variant="contained"
                  color="primary"
                  href={item?.link}
                  target="_blank"
                  onClickItem={(e, value) => {
                    clickAndImpressionCountHandler(valueimg, "click");
                  }}
                  sx={{
                    position: "absolute", // Position the button absolutely
                    bottom: 0, // Align it to the bottom
                    left: "7%", // Align it to the left
                    marginBottom: 5, // Optional: Add some bottom margin for spacing
                    marginLeft: 10, // Optional: Add some left margin for spacing
                  }}
                >
                  Apply Now
                </Button>
              )} */}
            </div>
          ))}
        </Carousel>
      ) : null}
    </Box>
  );
};

export default BannerSection;
