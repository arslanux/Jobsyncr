import {
  Box,
  Button,
  Card,
  Chip,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { FaArrowRight } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import PropTypes from "prop-types";
// import ApplyJobModal from "./";
// import React from "react";
import { MdCelebration } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, handleOpen }) => {
  const navigate = useNavigate();
  const renderEmployerName = () => {
    if (job && job?.Employer_Name) {
      if (job?.Employer_Name?.name?.length > 45) {
        const truncatedEmployerName =
          job?.Employer_Name?.name?.slice(0, 45) + "...";
        return (
          <Tooltip title={job?.Employer_Name?.name} arrow>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                height: 39,
              }}
            >
              {truncatedEmployerName}
            </Typography>
          </Tooltip>
        );
      } else {
        return (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              height: 39,
            }}
          >
            {job?.Employer_Name?.name}
          </Typography>
        );
      }
    }
    return null;
  };

  const renderTitle = () => {
    if (job && job?.title) {
      if (job?.title?.length > 50) {
        const truncatedTitle = job?.title?.slice(0, 50) + "...";
        return (
          <Tooltip title={job?.title} arrow>
            <Chip
              variant="outlined"
              sx={{ backgroundColor: "#F7FFFB", borderColor: "#5EBC43" }}
              label={truncatedTitle}
              size="small"
            />
          </Tooltip>
        );
      } else {
        return (
          <Chip
            variant="outlined"
            label={job?.title}
            sx={{ backgroundColor: "#F7FFFB", borderColor: "#5EBC43" }}
            size="small"
          />
        );
      }
    }
    return null;
  };

  const renderLocation = () => {
    if (job && job?.Job_Locations) {
      if (
        job?.Job_Locations?.map((item) => item?.country?.name).join(", ")
          ?.length > 25
      ) {
        const truncatedTitle =
          job?.Job_Locations?.map((item) => item?.country?.name)
            .join(", ")
            ?.slice(0, 25) + "...";
        return (
          <Tooltip
            title={job?.Job_Locations?.map((item) => item?.country?.name).join(
              ", "
            )}
            arrow
          >
            <Box display={"flex"} direction="column" alignItems={"center"}>
              <CiLocationOn size={16} />
              <Typography variant="body2">{truncatedTitle}</Typography>
            </Box>
          </Tooltip>
        );
      } else {
        return (
          <Box display={"flex"} direction="column" alignItems={"center"}>
            <CiLocationOn size={16} />
            <Typography variant="body2">
              {job?.Job_Locations?.map((item) => item?.country?.name)}
            </Typography>
          </Box>
        );
      }
    }
    return null;
  };

  return (
    <>
      <Card
        sx={{
          padding: "16px 16px 20px 16px",
          gap: "16px",
          boxShadow: "0px 4px 6px -2px #10182808, 0px 12px 16px -4px #10182814",
          border: "1px solid #EAECF0",
          borderRadius: "16px",
          backgroundColor: "rgba(255, 255, 255, 0.75)",
        }}
      >
        <Grid container gap={1.5}>
          <Grid item xs={12}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack gap={0.5}>
                {job?.matched_percentage ? (
                  <Chip
                    variant="contained"
                    sx={{
                      position: "relative",
                      backgroundColor: "#4C1A88",
                      borderColor: "#4C1A88",
                      color: "#ffffff",
                    }}
                    label={
                      job?.matched_percentage
                        ? job?.matched_percentage + "% Matched"
                        : ""
                    }
                    size="small"
                  />
                ) : null}{" "}
                {renderLocation()}{" "}
                {job?.Employer_Name !== null &&
                  job?.Employer_Name?.icon !== null && (
                    <img
                      src={job?.Employer_Name?.icon}
                      alt=""
                      style={{
                        height: "80px",
                        width: "100px",
                        objectFit: "contain",
                        position: "absolute",
                        right: 15,
                        top: 5,
                      }}
                      loader="true"
                    />
                  )}
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack gap={0.5}> {renderEmployerName()} </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack gap={0.5}>
              <Typography variant="body1" sx={{ display: "flex", gap: 0.5 }}>
                {`Due : ${
                  job?.expiry_date === null
                    ? "Open until filled"
                    : job?.expiry_date === "Open until filled"
                    ? "Open until filled"
                    : dayjs(job?.expiry_date).format("DD MMMM YYYY")
                }`}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            {renderTitle()}

            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mt={1}
              sx={{ mb: -1.5 }}
            >
              <Typography variant="body1" sx={{ fontSize: 12 }}>
                Posted: <b> {dayjs(job?.createdAt).format("DD MMMM YYYY")} </b>
              </Typography>
              {job?.is_wordpress_job && (
                <Button
                  endIcon={<FaArrowRight size={12} />}
                  href={job?.job_details_url}
                  target="_blank"
                  sx={{
                    display: { xs: "inline-flex", md: "flex" },
                    fontSize: { xs: "11px", md: "14px" },
                  }}
                >
                  Read more
                </Button>
              )}
              {!job?.is_wordpress_job && (
                <Button
                  endIcon={job?.applied ? null : <FaArrowRight size={12} />}
                  sx={{
                    display: { xs: "inline-flex", md: "flex" },
                    fontSize: { xs: "11px", md: "14px" },
                    color: job?.applied ? "#388e3c" : "primary.main",
                    // cursor: job?.applied ? "not-allowed" : "pointer",
                  }}
                  onClick={() => {
                    // if (job?.applied) {
                    //   return;
                    // }
                    // handleOpen();
                    navigate("/job-description?id=" + job?.id);
                    // job-description?id=133
                  }}
                >
                  {job?.applied ? "Applied" : "Apply Now"}
                  {job?.applied && (
                    <MdCelebration
                      color="#00A86B"
                      size={24}
                      style={{ marginLeft: "3px", marginBottom: "5px" }}
                    />
                  )}
                </Button>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default JobCard;

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
};

// import {
//   Box,
//   Button,
//   Card,
//   Chip,
//   Grid,
//   Stack,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import dayjs from "dayjs";
// import { FaArrowRight } from "react-icons/fa";
// import { CiLocationOn } from "react-icons/ci";

// const JobCard = ({ job, isStatic = false }) => {
//   const renderEmployerName = () => {
//     if (job && job?.Employer_Name) {
//       if (job?.Employer_Name?.name?.length > 45) {
//         const truncatedEmployerName =
//           job?.Employer_Name?.name?.slice(0, 45) + "...";
//         return (
//           <Tooltip title={job?.Employer_Name?.name} arrow>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: 600,
//                 color: "text.primary",
//                 height: 39,
//               }}
//             >
//               {truncatedEmployerName}
//             </Typography>
//           </Tooltip>
//         );
//       } else {
//         return (
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: 600,
//               color: "text.primary",
//               height: 39,
//             }}
//           >
//             {job?.Employer_Name?.name}
//           </Typography>
//         );
//       }
//     }
//     return null;
//   };

//   const renderTitle = () => {
//     if (job && job?.title) {
//       if (job?.title?.length > 50) {
//         const truncatedTitle = job?.title?.slice(0, 50) + "...";
//         return (
//           <Tooltip title={job?.title} arrow>
//             <Chip
//               variant="outlined"
//               sx={{ backgroundColor: "#F7FFFB", borderColor: "#5EBC43" }}
//               label={truncatedTitle}
//               size="small"
//             />
//           </Tooltip>
//         );
//       } else {
//         return (
//           <Chip
//             variant="outlined"
//             label={job?.title}
//             sx={{ backgroundColor: "#F7FFFB", borderColor: "#5EBC43" }}
//             size="small"
//           />
//         );
//       }
//     }
//     return null;
//   };

//   const renderLocation = () => {
//     if (job && job?.Job_Locations) {
//       if (
//         job?.Job_Locations?.map((item) => item?.country?.name).join(", ")
//           ?.length > 25
//       ) {
//         const truncatedTitle =
//           job?.Job_Locations?.map((item) => item?.country?.name)
//             .join(", ")
//             ?.slice(0, 25) + "...";
//         return (
//           <Tooltip
//             title={job?.Job_Locations?.map((item) => item?.country?.name).join(
//               ", "
//             )}
//             arrow
//           >
//             <Box display={"flex"} direction="column" alignItems={"center"}>
//               <CiLocationOn size={16} />
//               <Typography variant="body2">{truncatedTitle}</Typography>
//             </Box>
//           </Tooltip>
//         );
//       } else {
//         return (
//           <Box display={"flex"} direction="column" alignItems={"center"}>
//             <CiLocationOn size={16} />
//             <Typography variant="body2">
//               {job?.Job_Locations?.map((item) => item?.country?.name)}
//             </Typography>
//           </Box>
//         );
//       }
//     }
//     return null;
//   };

//   return (
//     <Card
//       sx={{
//         padding: "16px 16px 20px 16px",
//         gap: "16px",
//         boxShadow: "0px 4px 6px -2px #10182808, 0px 12px 16px -4px #10182814",
//         border: "1px solid #EAECF0",
//         borderRadius: "16px",
//         backgroundColor: "rgba(255, 255, 255, 0.75)",
//       }}
//     >
//       <Grid container gap={1.5}>
//         <Grid item xs={12}>
//           <Stack direction={"row"} justifyContent={"space-between"}>
//             <Stack gap={0.5}>
//               {job?.matched_percentage ? (
//                 <Chip
//                   variant="contained"
//                   sx={{
//                     position: "relative",
//                     backgroundColor: "#4C1A88",
//                     borderColor: "#4C1A88",
//                     color: "#ffffff",
//                   }}
//                   label={
//                     job?.matched_percentage
//                       ? job?.matched_percentage + "% Matched"
//                       : ""
//                   }
//                   size="small"
//                 />
//               ) : null}{" "}
//               {renderLocation()}{" "}
//               {job?.Employer_Name !== null &&
//                 job?.Employer_Name?.icon !== null && (
//                   <img
//                     src={job?.Employer_Name?.icon}
//                     alt=""
//                     style={{
//                       height: "80px",
//                       width: "100px",
//                       objectFit: "contain",
//                       position: "absolute",
//                       right: 15,
//                       top: 0,
//                     }}
//                     loader="true"
//                   />
//                 )}
//             </Stack>
//           </Stack>
//         </Grid>
//         <Grid item xs={12}>
//           <Stack gap={0.5}> {renderEmployerName()} </Stack>
//         </Grid>

//         <Grid item xs={12}>
//           <Stack gap={0.5}>
//             <Typography variant="body1" sx={{ display: "flex", gap: 0.5 }}>
//               {`Due : ${
//                 job?.expiry_date === null
//                   ? "Open until filled"
//                   : job?.expiry_date === "Open until filled"
//                   ? "Open until filled"
//                   : dayjs(job?.expiry_date).format("DD MMMM YYYY")
//               }`}
//             </Typography>
//           </Stack>
//         </Grid>
//         <Grid item xs={12}>
//           {renderTitle()}

//           <Stack
//             direction={"row"}
//             justifyContent={"space-between"}
//             alignItems={"center"}
//             mt={1}
//             sx={{ mb: -1.5 }}
//           >
//             <Typography variant="body1" sx={{ fontSize: 12 }}>
//               Posted: <b> {dayjs(job?.createdAt).format("DD MMMM YYYY")} </b>
//             </Typography>
//             {!isStatic && (
//               <Button
//                 endIcon={<FaArrowRight size={12} />}
//                 href={job?.job_details_url}
//                 target="_blank"
//                 sx={{
//                   display: { xs: "inline-flex", md: "flex" },
//                   fontSize: { xs: "11px", md: "14px" },
//                 }}
//               >
//                 Read more
//               </Button>
//             )}
//           </Stack>
//         </Grid>
//       </Grid>
//     </Card>
//   );
// };

// export default JobCard;
