import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import Box from "@mui/material/Box";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import carouselBanner from "../../../assets/banner1.png";
import carouselBanner2 from "../../../assets/banner2.png";
import {
  AdvertisementCountApi,
  ProMotionCountApi,
  getAdvertiseBanner,
} from "../../../config/ApiHandler";
import { useNavigate } from "react-router-dom";
import { Button, Skeleton } from "@mui/material";

const CarouselComponent = ({ onClickItem, ...props }) => {
  const [advertisement, setAdvertisement] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  console.log(advertisement, "advertisement");

  const getAdvertisement = async () => {
    try {
      setLoading(true);
      const res = await getAdvertiseBanner();
      if (res.data?.status) {
        setAdvertisement(res.data?.data?.ad?.top);
      }
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
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

  const clickAndImpressionCountHandler = async (value, type) => {
    const isPromotion = value?.job_promotion_id ? true : false;
    let payload = {
      status: type,
    };
    if (isPromotion) {
      payload.banner_id = value?.banner_id;
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
  const [valueimg, setValueimg] = useState(null);
  console.log(valueimg, "valueimg");

  return (
    <Box {...props} display={"flex"} justifyContent={"center"}>
      {loading ? (
        <Skeleton height={280} width={1440} />
      ) : advertisement?.length > 0 ? (
        <Carousel
          infiniteLoop={true}
          interval={7000}
          stopOnHover
          showThumbs={false}
          showArrows={true}
          onChange={(e, value) => {
            clickAndImpressionCountHandler(value?.props?.value, "impression");
            setValueimg(value?.props?.value);
          }}
          autoPlay={true}
          onClickItem={(e, value) => {
            clickAndImpressionCountHandler(value?.props?.value, "click");
            openInNewTab(value?.props?.value?.link);
          }}
        >
          {advertisement.map((item, index) => (
            <div key={index} value={item}>
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                }}
              >
                {/* width={1440} height={280} */}
                <img src={item?.image_url} />
                {/* {item?.link && (
                  <Button
                    size="medium"
                    variant="contained"
                    color="primary"
                    href={item?.link}
                    target="_blank"
                    onClick={(e, value) => {
                      clickAndImpressionCountHandler(
                        valueimg,
                        "click"
                      );
                    }}
                    sx={{
                      position: "absolute", // Position the button absolutely
                      bottom: 0, // Align it to the bottom
                      left: 33, // Align it to the left
                      marginBottom: 5, // Optional: Add some bottom margin for spacing
                      marginLeft: 10, // Optional: Add some left margin for spacing
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  >
                    Apply Now
                  </Button>
                )} */}
              </Box>
              <Box
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <img
                  src={item?.image_url}
                  width="100%"
                  height="100%"
                  // style={{ objectFit: "cover" }}
                />
                {/* {item?.link && (
                  <Button
                    variant="text"
                    color="inherit"
                    href={item?.link}
                    target="_blank"
                    onClick={(e, value) => {
                      clickAndImpressionCountHandler(
                        valueimg,
                        "click"
                      );
                    }}
                    sx={{
                      position: "absolute", // Position the button absolutely
                      bottom: 0, // Align it to the bottom
                      left: -67, // Align it to the left
                      marginBottom: 0, // Optional: Add some bottom margin for spacing
                      marginLeft: 10, // Optional: Add some left margin for spacing
                      fontSize: 6,
                    }}
                  >
                    Apply Now
                  </Button>
                )} */}
              </Box>
            </div>
          ))}
        </Carousel>
      ) : null}
    </Box>
  );
};

export default CarouselComponent;
