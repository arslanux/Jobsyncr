// import {
//   Box,
//   Button,
//   Card,
//   Chip,
//   Divider,
//   Grid,
//   Paper,
//   Stack,
//   Tooltip,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import React from "react";
// import { CiLocationOn } from "react-icons/ci";
// import { GoDotFill } from "react-icons/go";
// import { FaArrowRight } from "react-icons/fa";

// import dayjs from "dayjs";
// const JobBoardCard = ({ job }) => {
//   const renderEmployerName = () => {
//     const isMediumScreen = useMediaQuery("(min-width:600px)");
//     const maxNameLength = isMediumScreen ? 25 : 16;

//     if (job && job?.Employer_Name?.name) {
//       if (job?.Employer_Name?.name?.length > maxNameLength) {
//         const truncatedEmployerName =
//           job?.Employer_Name?.name?.slice(0, maxNameLength) + "...";
//         return (
//           <Stack direction="row" justifyContent={"space-between"}>
//             <Tooltip title={job?.Employer_Name?.name} arrow>
//               <Typography
//                 variant="h6"
//                 color="#101828"
//                 fontWeight={500}
//                 height={30}
//               >
//                 {truncatedEmployerName}
//               </Typography>
//             </Tooltip>
//             {job?.matched_percentage ? (
//               <Chip
//                 variant="contained"
//                 // color="success"
//                 sx={{
//                   position: "relative",
//                   backgroundColor: "#4c1b88",
//                   borderColor: "#4c1b88",
//                   color: "#ffffff",
//                 }}
//                 label={
//                   job?.matched_percentage
//                     ? job?.matched_percentage + "% Matched"
//                     : ""
//                 }
//                 size="small"
//               />
//             ) : null}
//           </Stack>
//         );
//       } else {
//         return (
//           <Stack direction="row" justifyContent={"space-between"}>
//             <Typography
//               variant="h6"
//               color="#101828"
//               fontWeight={500}
//               height={30}
//             >
//               {job?.Employer_Name?.name}
//             </Typography>
//             {job?.matched_percentage ? (
//               <Chip
//                 variant="contained"
//                 // color="success"
//                 sx={{
//                   position: "relative",
//                   backgroundColor: "#4c1b88",
//                   borderColor: "#4c1b88",
//                   color: "#ffffff",
//                 }}
//                 label={
//                   job?.matched_percentage
//                     ? job?.matched_percentage + "% Matched"
//                     : ""
//                 }
//                 size="small"
//               />
//             ) : null}
//           </Stack>
//         );
//       }
//     }
//     return null;
//   };

//   const renderTitle = () => {
//     if (job && job?.title) {
//       if (job?.title?.length > 40) {
//         const truncatedTitle = job?.title?.slice(0, 40) + "...";
//         return (
//           <Tooltip title={job?.title} arrow>
//             <Chip
//               label={truncatedTitle}
//               // icon={<GoDotFill />}
//               size="small"
//               variant="outlined"
//               // color="warning"
//               sx={{ backgroundColor: "#FFF4EA", borderColor: "#F48120" }}
//             />
//           </Tooltip>
//         );
//       } else {
//         return (
//           <Chip
//             label={job?.title}
//             // icon={<GoDotFill />}
//             size="small"
//             variant="outlined"
//             // color="warning"
//             sx={{ backgroundColor: "#FFF4EA", borderColor: "#F48120" }}
//           />
//         );
//       }
//     }
//     return null;
//   };

//   return (
//     <Paper
//       sx={{
//         padding: "16px 16px 20px 16px",
//         // gap: "16px",
//         // maxWidth: { md: "440px", lg: "440px" },
//         boxShadow: "0px 4px 6px -2px #10182808",
//         boxShadow: "0px 12px 16px -4px #10182814",
//         border: "1px solid #EAECF0",
//         borderRadius: "16px",
//       }}
//     >
//       <Card sx={{ mb: -1.5 }}>
//         <Grid container>
//           <Grid item xs={12}>
//             <Stack direction="column">
//               {renderEmployerName()}
//               <Box display={"flex"} direction="column" alignItems={"center"}>
//                 <CiLocationOn size={16} />
//                 <Typography variant="body2">
//                   {job?.Job_Locations[0]?.country?.name}
//                 </Typography>
//               </Box>
//             </Stack>
//           </Grid>
//           <Grid item xs={12} mt={1.3}>
//             <Stack direction="column">
//               <Stack direction="row">
//                 <Stack direction="column">
//                   <Box sx={{ mt: { xs: 1, md: 0 } }}>
//                     <Typography
//                       variant="body1"
//                       color={"#101828"}
//                       sx={{ height: { xs: "auto", md: 50 } }}
//                     >
//                       Due:{" "}
//                       {job?.expiry_date === "Open until filled"
//                         ? "Open until filled"
//                         : dayjs(job?.expiry_date).format("DD MMMM, YYYY")}
//                     </Typography>
//                   </Box>
//                   {renderTitle()}
//                 </Stack>
//                 <Stack direction="column">
//                   {job?.Employer_Name !== null &&
//                     job?.Employer_Name?.icon !== null && (
//                       <img
//                         src={job?.Employer_Name?.icon}
//                         alt=""
//                         style={{
//                           height: "75px",
//                           width: "75px",
//                           objectFit: "contain",
//                           position: "absolute",
//                           right: 0,
//                           top: 10,
//                         }}
//                         loader="true"
//                       />
//                     )}
//                 </Stack>
//               </Stack>
//             </Stack>
//           </Grid>
//         </Grid>
//         <Stack
//           direction={"row"}
//           justifyContent={"space-between"}
//           alignItems={"center"}
//           mt={1}
//           sx={{ mb: -0.5 }}
//         >
//           <Typography variant="body2">
//             Posted: <b> {dayjs(job?.createdAt).format("DD MMMM, YYYY")} </b>
//           </Typography>
//           <Button
//             endIcon={<FaArrowRight size={12} />}
//             href={job?.job_details_url}
//             target="_blank"
//             sx={{
//               display: { xs: "inline-flex", md: "flex" },
//               fontSize: { xs: "11px", md: "14px" },
//             }}
//           >
//             Read more
//           </Button>
//         </Stack>
//       </Card>
//     </Paper>
//   );
// };

// export default JobBoardCard;

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

const JobBoardCard = ({ job }) => {
  const renderEmployerName = () => {
    if (job && job?.Employer_Name?.name) {
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
            </Stack>
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"} sx={{mt:1}}>
            <Stack gap={0.5}>{renderLocation()} </Stack>
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
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default JobBoardCard;
