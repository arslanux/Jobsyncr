import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Box, Card, CardContent, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getShuffledJobsListApi } from "../config/ApiHandler";

// Custom Arrow component for the slider
const Arrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "black" }}
            onClick={onClick}
        />
    );
};

const JobCardsSlider = () => {
    const [isShuffledJobsLoading, setShuffledJobsLoading] = useState(false);
    const [shuffledJobsList, setShuffledJobsList] = useState([]);
    const navigate = useNavigate();

    const getShuffledJobsList = async () => {
        setShuffledJobsLoading(true);
        try {
            const res = await getShuffledJobsListApi();
            if (res.data?.status) {
                setShuffledJobsList(res.data?.data?.shuffledJobs);
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
        setShuffledJobsLoading(false);
    };

    useEffect(() => {
        getShuffledJobsList();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Adjust this based on the number of cards per slide
        slidesToScroll: 1,
        nextArrow: <Arrow />, // Custom black arrow for next
        prevArrow: <Arrow />, // Custom black arrow for previous
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <Slider {...settings}>
            {shuffledJobsList.length > 0 ? (
                shuffledJobsList.map((job, index) => (
                    <div key={index}>
                        <Box sx={{ px: { xs: 0, md: 2 } }}>
                            <Card
                                sx={{
                                    minWidth: "100%",
                                    cursor: "pointer",
                                    height: "326px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    padding: "16px",
                                }}
                                className="job_card"
                                onClick={() => {
                                    navigate("/auth/login");
                                }}
                            >
                                <CardContent>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: "16px",
                                            position: "relative",
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{ fontWeight: 600 }}
                                            fontSize={"18px"}
                                            color={"#101828"}
                                            lineHeight={"22px"}
                                            width={"65%"}
                                        >
                                            {job?.Employer_Name?.name}
                                        </Typography>
                                        {job?.Employer_Name?.icon && (
                                            <img
                                                src={job?.Employer_Name?.icon}
                                                alt={job.title}
                                                style={{
                                                    height: "80px",
                                                    width: "100px",
                                                    objectFit: "contain",
                                                    position: "absolute",
                                                    right: 0,
                                                }}
                                            />
                                        )}
                                    </div>


                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="15"
                                            viewBox="0 0 14 15"
                                            fill="none"
                                        >
                                            <path
                                                d="M12.25 6.22852C12.25 10.3118 7 13.8118 7 13.8118C7 13.8118 1.75 10.3118 1.75 6.22852C1.75 4.83613 2.30312 3.50077 3.28769 2.51621C4.27226 1.53164 5.60761 0.978516 7 0.978516C8.39239 0.978516 9.72774 1.53164 10.7123 2.51621C11.6969 3.50077 12.25 4.83613 12.25 6.22852Z"
                                                stroke="#98A2B3"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M7 7.97852C7.9665 7.97852 8.75 7.19501 8.75 6.22852C8.75 5.26202 7.9665 4.47852 7 4.47852C6.0335 4.47852 5.25 5.26202 5.25 6.22852C5.25 7.19501 6.0335 7.97852 7 7.97852Z"
                                                stroke="#98A2B3"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <Typography
                                            variant="body1"
                                            sx={{ fontWeight: 400 }}
                                            fontSize={"14px"}
                                            color={"#667085"}
                                        >
                                            {job?.Job_Locations[0]?.country?.name}
                                        </Typography>
                                    </div>


                                    <Typography
                                        variant="body1"
                                        sx={{ fontWeight: 500, marginBottom: "16px" }}
                                        fontSize={"16px"}
                                        color={"#344054"}
                                    >
                                        {job?.title}
                                    </Typography>


                                    <div
                                        className="time"
                                        style={{
                                            marginBottom: "16px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                fontWeight: 500,
                                                fontSize: "13px",
                                                color: "#344054",
                                                backgroundColor: "#F2F4F7",
                                                borderRadius: "16px",
                                                padding: "4px 6px",
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="8"
                                                height="9"
                                                viewBox="0 0 8 9"
                                                fill="none"
                                                style={{ marginRight: "8px" }}
                                            >
                                                <circle cx="4" cy="4.39502" r="3" fill="#667085" />
                                            </svg>
                                            Due: {job?.expiry_date}
                                        </Typography>
                                    </div>


                                    <hr style={{ width: "100%" }} />


                                    <Typography
                                        variant="body1"
                                        sx={{ fontWeight: 400, marginTop: "8px" }}
                                        fontSize={"14px"}
                                        color={"#667085"}
                                    >
                                        Posted: {moment(job.createdAt).format("MMMM D, YYYY")}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </div>
                ))
            ) : (
                <Paper
                    sx={{
                        p: 5,
                        ml: 2,
                        mt: 2,
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h6" style={{ color: "red" }}>
                        No featured jobs found
                    </Typography>
                </Paper>
            )}
        </Slider>
    );
};

export default JobCardsSlider;
