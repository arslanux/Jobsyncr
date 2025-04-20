import { Box, Card, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "../dashboard/dash.css";
import icon1 from "../../assets/dashboard/icon1.svg";
import icon2 from "../../assets/dashboard/icon2.svg";
import icon3 from "../../assets/dashboard/icon3.svg";
import icon4 from "../../assets/dashboard/icon4.svg";
import icon5 from "../../assets/dashboard/icon5.svg";
import icon6 from "../../assets/dashboard/icon6.svg";
import search from "../../assets/dashboard/search.svg";
import mail from "../../assets/dashboard/mail.svg";
import calendar from "../../assets/dashboard/calendar.svg";
import avathar from "../../assets/dashboard/avathar.svg";
import right from "../../assets/dashboard/right.svg";
import second from "../../assets/dashboard/2.svg";
import three from "../../assets/dashboard/3.svg";
import four from "../../assets/dashboard/4.svg";
import Quick1 from "../../assets/dashboard/Quick1.svg";
import Quick2 from "../../assets/dashboard/Quick2.svg";
import Quick3 from "../../assets/dashboard/Quick3.svg";
import Quick4 from "../../assets/dashboard/Quick4.svg";
import Quick5 from "../../assets/dashboard/Quick5.svg";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '../../theme/overrides/Button';
import profileImage from '../../assets/dashboard/profileImage.png';
import GeneralInformation from './allModals/GeneralInformation';
import ContactInformation from './allModals/ContactInformation';
import EqualOppertunity from './allModals/EqualOppertunity';
import SocialMediaProfile from './allModals/SocialMediaProfile';
import University from './allModals/University';
import HighestDegree from './allModals/HighestDegree';
import { Language } from '@mui/icons-material';
import Languages from './allModals/Languages';
import EmploymentBackground from './allModals/EmploymentBackground';
import BackgroundSkills from './allModals/BackgroundSkills';
import Preference from './allModals/Preference';
import ReferenceList from './allModals/ReferenceList';
import Resume from './allModals/Resume';
import OtherDocumnet from './allModals/OtherDocumnet';
import Certification from './allModals/Certification';
import Honers from './allModals/Honers';
import MajorPublications from './allModals/MajorPublications';
import WorkAuthorizations from './allModals/WorkAuthorizations';
import ProffesionalsAssosiations from './allModals/ProffesionalsAssosiations';
import AgreeToDisclaimer from '../../pages/dashboard/Onboard/AgreeToDisclaimer';
import AgreeToDisclaimernew from './allModals/AgreeToDisclaimernew';
import CommonModal from './CommonModal';
import { generalInfo } from '../../redux/onboarding/personalInformation/PersonalInfoAction';
import { useDispatch, useSelector } from "react-redux";

const companyList = [
    {
        id: 1,
        image: icon1,
        title: 'Zerozilla',
    },
    {
        id: 2,
        image: icon2,
        title: 'UST Global',
    },
    {
        id: 3,
        image: icon3,
        title: 'Microsoft',
    },
    {
        id: 4,
        image: icon4,
        title: 'IBM',
    },
    {
        id: 5,
        image: icon5,
        title: 'Accenture',
    },
    {
        id: 6,
        image: icon6,
        title: "More",
    },
]

const InfoList = [
    {
        id: 1,
        svgicon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" stroke="#927EBC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>`,
        information: 'Personal Information',
    },
    {
        id: 2,
        svgicon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 14.751C11.124 14.751 10.272 14.559 9.46498 14.181L2.77498 11.043C1.83598 10.602 1.25098 9.627 1.25098 8.499C1.25098 7.371 1.83598 6.396 2.77498 5.958L9.46498 2.82C10.272 2.442 11.127 2.25 12 2.25C12.876 2.25 13.728 2.442 14.535 2.82L21.225 5.958C22.164 6.399 22.749 7.374 22.749 8.499C22.749 9.627 22.164 10.602 21.225 11.04L14.535 14.178C13.728 14.559 12.876 14.751 12 14.751ZM12 3.747C11.358 3.747 10.713 3.891 10.101 4.179L3.41098 7.317C2.92498 7.545 2.75098 8.079 2.75098 8.502C2.75098 8.925 2.92498 9.459 3.41098 9.687L10.101 12.825C11.325 13.398 12.675 13.398 13.899 12.825L20.589 9.687C21.075 9.459 21.249 8.925 21.249 8.502C21.249 8.079 21.075 7.545 20.589 7.317L13.899 4.179C13.287 3.891 12.642 3.747 12 3.747Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.3"/>
                        <path d="M2.00098 14.751C1.58698 14.751 1.25098 14.415 1.25098 14.001V8.49902C1.25098 8.08502 1.58698 7.74902 2.00098 7.74902C2.41498 7.74902 2.75098 8.08502 2.75098 8.49902V13.998C2.75098 14.415 2.41498 14.751 2.00098 14.751Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.3"/>
                        <path d="M12 21.75C10.086 21.75 7.69205 20.646 6.02105 19.722C4.92905 19.116 4.24805 17.931 4.24805 16.626V11.499C4.24805 11.085 4.58405 10.749 4.99805 10.749C5.41205 10.749 5.74805 11.085 5.74805 11.499V16.623C5.74805 17.382 6.13205 18.066 6.74705 18.408C8.88905 19.596 10.755 20.25 11.997 20.25C13.239 20.25 15.105 19.596 17.247 18.408C17.862 18.066 18.246 17.382 18.246 16.623V11.499C18.246 11.085 18.582 10.749 18.996 10.749C19.41 10.749 19.746 11.085 19.746 11.499V16.623C19.746 17.928 19.068 19.113 17.973 19.719C16.308 20.646 13.914 21.75 12 21.75Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.3"/>
                  </svg>`,
        information: 'Educational background',
    },
    {
        id: 3,
        svgicon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_381_806)">
                        <path d="M21.5 5H16.5V3.5C16.5 2.1215 15.3785 1 14 1H10C8.6215 1 7.5 2.1215 7.5 3.5V5H2.5C1.673 5 1 5.673 1 6.5V10.5C1 11.1775 1.1965 11.8085 1.5315 12.345C1.515 12.3945 1.5 12.445 1.5 12.5V20.5C1.5 21.8785 2.6215 23 4 23H20C21.3785 23 22.5 21.8785 22.5 20.5V12.5C22.5 12.445 22.485 12.3945 22.4685 12.345C22.8035 11.8085 23 11.1775 23 10.5V6.5C23 5.673 22.327 5 21.5 5ZM8.5 3.5C8.5 2.673 9.173 2 10 2H14C14.827 2 15.5 2.673 15.5 3.5V5H8.5V3.5ZM21.5 20.5C21.5 21.327 20.827 22 20 22H4C3.173 22 2.5 21.327 2.5 20.5V13.368C3.0675 13.765 3.7565 14 4.5 14H9V15.5C9 15.776 9.224 16 9.5 16H14.5C14.7765 16 15 15.776 15 15.5V14H19.5C20.2435 14 20.9325 13.765 21.5 13.368V20.5ZM10 15V14H14V15H10ZM22 10.5C22 11.8785 20.8785 13 19.5 13C19.5 13 6.991 13.001 4.5 13C3.1215 13 2 11.8785 2 10.5V6.5C2 6.2245 2.2245 6 2.5 6H21.5C21.776 6 22 6.2245 22 6.5V10.5Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.6"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_381_806">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                    </defs>
                    </svg> `,
        information: 'Professional Information',
    },
    {
        id: 4,
        svgicon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.75 20C20.75 20.729 20.46 21.429 19.945 21.945C19.429 22.46 18.729 22.75 18 22.75H6C5.271 22.75 4.571 22.46 4.055 21.945C3.54 21.429 3.25 20.729 3.25 20V4C3.25 3.271 3.54 2.571 4.055 2.055C4.571 1.54 5.271 1.25 6 1.25H14.586C15.05 1.25 15.495 1.434 15.823 1.763L20.237 6.177C20.566 6.505 20.75 6.95 20.75 7.414V20ZM19.25 20V7.414C19.25 7.348 19.224 7.284 19.177 7.237L14.763 2.823C14.716 2.776 14.652 2.75 14.586 2.75H6C5.668 2.75 5.351 2.882 5.116 3.116C4.882 3.351 4.75 3.668 4.75 4V20C4.75 20.332 4.882 20.649 5.116 20.884C5.351 21.118 5.668 21.25 6 21.25H18C18.332 21.25 18.649 21.118 18.884 20.884C19.118 20.649 19.25 20.332 19.25 20Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.2"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 2.5C14.25 2.086 14.586 1.75 15 1.75C15.414 1.75 15.75 2.086 15.75 2.5V6C15.75 6.138 15.862 6.25 16 6.25H19.5C19.914 6.25 20.25 6.586 20.25 7C20.25 7.414 19.914 7.75 19.5 7.75H16C15.033 7.75 14.25 6.967 14.25 6V2.5Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.2"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 11.25C7.586 11.25 7.25 10.914 7.25 10.5C7.25 10.086 7.586 9.75 8 9.75H16C16.414 9.75 16.75 10.086 16.75 10.5C16.75 10.914 16.414 11.25 16 11.25H8Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.2"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 14.75C7.586 14.75 7.25 14.414 7.25 14C7.25 13.586 7.586 13.25 8 13.25H16C16.414 13.25 16.75 13.586 16.75 14C16.75 14.414 16.414 14.75 16 14.75H8Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.2"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 18.25C7.586 18.25 7.25 17.914 7.25 17.5C7.25 17.086 7.586 16.75 8 16.75H12.5C12.914 16.75 13.25 17.086 13.25 17.5C13.25 17.914 12.914 18.25 12.5 18.25H8Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.2"/>
                    </svg>`,
        information: 'Documents',
    },
    {
        id: 5,
        svgicon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <mask id="mask0_405_672" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="20">
                        <path d="M22 2H2V22H22V2Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0_405_672)">
                        <mask id="mask1_405_672" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="20">
                        <path d="M2 2H22V22H2V2Z" fill="white"/>
                        </mask>
                        <g mask="url(#mask1_405_672)">
                        <path d="M7.46875 7.3125C7.46875 4.80996 9.49746 2.78125 12 2.78125C14.5025 2.78125 16.5312 4.80996 16.5312 7.3125C16.5312 9.81504 14.5025 11.8438 12 11.8438C9.49746 11.8438 7.46875 9.81504 7.46875 7.3125Z" stroke="#927EBC" stroke-width="1.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.4766 21.2188H4.37081C3.35909 21.2188 2.60933 20.2873 2.81554 19.2968C3.70229 15.0374 7.47741 11.8372 12 11.8372C13.6533 11.8372 15.2066 12.2649 16.5556 13.0156" stroke="#927EBC" stroke-width="1.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19.4219 14.2656L20.8727 15.7004C21.3332 16.1557 21.3342 16.8952 20.875 17.3518L19.4219 18.7969" stroke="#927EBC" stroke-width="1.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M20.6719 16.4931H15.4175C14.1126 16.4931 13.0547 17.5509 13.0547 18.8559C13.0547 20.1609 14.0935 21.2188 15.3984 21.2188" stroke="#927EBC" stroke-width="1.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                    </g>
                    </svg>`,
        information: 'Referral',
    },
    {
        id: 6,
        svgicon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6.07918 4.30469H5.86719V2.78125C5.86719 2.34977 5.51742 2 5.08594 2C4.65445 2 4.30469 2.34977 4.30469 2.78125V4.30469H4.0927C2.93613 4.30469 2 5.24062 2 6.39738V8.38387C2 9.54043 2.93594 10.4766 4.0927 10.4766H4.30469V21.2188C4.30469 21.6502 4.65445 22 5.08594 22C5.51742 22 5.86719 21.6502 5.86719 21.2188V10.4766C5.96332 10.4604 6.82422 10.5984 7.55891 9.86363C7.95418 9.4684 8.17188 8.94285 8.17188 8.38387V6.39738C8.17188 5.24082 7.23594 4.30469 6.07918 4.30469ZM6.60938 8.38387C6.60938 8.67688 6.37223 8.91406 6.07918 8.91406H4.0927C3.79969 8.91406 3.5625 8.67691 3.5625 8.38387V6.39738C3.5625 6.10437 3.79965 5.86719 4.0927 5.86719H6.07918C6.37219 5.86719 6.60938 6.10434 6.60938 6.39738V8.38387ZM19.9073 6.60938H19.6953V2.78125C19.6953 2.34977 19.3455 2 18.9141 2C18.4826 2 18.1328 2.34977 18.1328 2.78125V6.60938H17.9208C16.754 6.60938 15.8281 7.55746 15.8281 8.70207V10.6886C15.8281 11.8451 16.7641 12.7812 17.9208 12.7812H18.1328V21.2188C18.1328 21.6502 18.4826 22 18.9141 22C19.3455 22 19.6953 21.6502 19.6953 21.2188V12.7812H19.9073C21.0639 12.7812 22 11.8453 22 10.6886V8.70207C22 7.54551 21.0641 6.60938 19.9073 6.60938ZM20.4375 10.6886C20.4375 10.9816 20.2004 11.2188 19.9073 11.2188H17.9208C17.6278 11.2188 17.3906 10.9816 17.3906 10.6886V8.70207C17.3906 8.40934 17.6278 8.17188 17.9208 8.17188H19.9073C20.2003 8.17188 20.4375 8.40902 20.4375 8.70207V10.6886ZM12.9932 13.5234H12.7812V2.78125C12.7812 2.34977 12.4315 2 12 2C11.5685 2 11.2188 2.34977 11.2188 2.78125V13.5234H11.0068C9.8502 13.5234 8.91406 14.4594 8.91406 15.6161V17.6026C8.91406 18.7592 9.85 19.6953 11.0068 19.6953H11.2188V21.2188C11.2188 21.6502 11.5685 22 12 22C12.4315 22 12.7812 21.6502 12.7812 21.2188V19.6953H12.9932C14.16 19.6953 15.0859 18.7472 15.0859 17.6026V15.6161C15.0859 14.4596 14.15 13.5234 12.9932 13.5234ZM13.5234 17.6026C13.5234 17.8954 13.2863 18.1328 12.9932 18.1328H11.0068C10.7137 18.1328 10.4766 17.8957 10.4766 17.6026V15.6161C10.4766 15.3231 10.7137 15.0859 11.0068 15.0859H12.9932C13.2863 15.0859 13.5234 15.3231 13.5234 15.6161V17.6026Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.2"/>
                    </svg>`,
        information: 'Job Preference',
    },
    {
        id: 7,
        svgicon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19.3958 22.0123H12C6.21 22.0123 1.5 17.5206 1.5 11.9998C1.5 6.47906 6.21 1.9873 12 1.9873C17.79 1.9873 22.5 6.47906 22.5 11.9998C22.4979 14.388 21.612 16.6909 20.013 18.4648L20.613 19.0648C20.8542 19.3061 21.0184 19.6135 21.0849 19.9481C21.1514 20.2827 21.1172 20.6295 20.9866 20.9447C20.8559 21.2599 20.6348 21.5292 20.3511 21.7187C20.0674 21.9082 19.7339 22.0094 19.3928 22.0093L19.3958 22.0123ZM12 3.4873C7.03725 3.4873 3 7.30631 3 11.9998C3 16.6933 7.03725 20.5123 12 20.5123H19.3958C19.4403 20.5124 19.4839 20.4993 19.5209 20.4746C19.558 20.45 19.5869 20.4148 19.604 20.3737C19.6211 20.3326 19.6257 20.2873 19.617 20.2436C19.6084 20.2 19.587 20.1598 19.5555 20.1283L18.4305 19.0033C18.3602 18.933 18.3045 18.8494 18.2668 18.7573C18.2291 18.6653 18.2101 18.5667 18.2109 18.4672C18.2116 18.3677 18.2322 18.2694 18.2713 18.178C18.3104 18.0865 18.3673 18.0038 18.4387 17.9346C19.2439 17.1693 19.886 16.249 20.3261 15.229C20.7663 14.2091 20.9955 13.1107 21 11.9998C21 7.30631 16.9628 3.4873 12 3.4873Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.2"/>
                    <path d="M13.125 16.5H10.875C10.6761 16.5 10.4853 16.421 10.3447 16.2803C10.204 16.1397 10.125 15.9489 10.125 15.75C10.125 15.5511 10.204 15.3603 10.3447 15.2197C10.4853 15.079 10.6761 15 10.875 15H13.125C13.3239 15 13.5147 15.079 13.6553 15.2197C13.796 15.3603 13.875 15.5511 13.875 15.75C13.875 15.9489 13.796 16.1397 13.6553 16.2803C13.5147 16.421 13.3239 16.5 13.125 16.5Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.2"/>
                    <path d="M12 16.5C11.8011 16.5 11.6103 16.421 11.4696 16.2803C11.329 16.1397 11.25 15.9489 11.25 15.75V11.1495C11.107 11.0669 10.9953 10.9395 10.9321 10.787C10.8689 10.6345 10.8578 10.4654 10.9006 10.3059C10.9433 10.1464 11.0374 10.0055 11.1684 9.90499C11.2994 9.80449 11.4599 9.75001 11.625 9.75H12C12.1989 9.75 12.3896 9.82902 12.5303 9.96967C12.671 10.1103 12.75 10.3011 12.75 10.5V15.75C12.75 15.9489 12.671 16.1397 12.5303 16.2803C12.3896 16.421 12.1989 16.5 12 16.5Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.2"/>
                    <path d="M12 8.625C12.6213 8.625 13.125 8.12132 13.125 7.5C13.125 6.87868 12.6213 6.375 12 6.375C11.3787 6.375 10.875 6.87868 10.875 7.5C10.875 8.12132 11.3787 8.625 12 8.625Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.2"/>
                    </svg>`,
        information: 'Miscellaneous Information',
    },
    {
        id: 8,
        svgicon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18.5 15.55C18.2235 15.55 18 15.774 18 16.05V20C18 20.827 17.327 21.5 16.5 21.5H5.5C4.673 21.5 4 20.827 4 20V4C4 3.173 4.673 2.5 5.5 2.5H16.5C17.207 2.5 17.808 2.9805 17.9625 3.669C18.0225 3.9385 18.288 4.108 18.5595 4.048C18.8285 3.9875 18.9985 3.7205 18.938 3.451C18.681 2.3025 17.6785 1.5 16.5 1.5H5.5C4.1215 1.5 3 2.6215 3 4V20C3 21.3785 4.1215 22.5 5.5 22.5H16.5C17.8785 22.5 19 21.3785 19 20V16.05C19 15.774 18.7765 15.55 18.5 15.55Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.5"/>
                    <path d="M21.9485 6.20317C21.845 5.81617 21.597 5.49267 21.25 5.29217L20.817 5.04217C20.1005 4.62917 19.182 4.87517 18.7675 5.59117L12.9445 15.6767C12.752 16.0102 12.6375 16.3907 12.614 16.7772L12.535 18.0982C12.5125 18.4787 12.7035 18.8337 13.0335 19.0242C13.1895 19.1142 13.3615 19.1592 13.5335 19.1592C13.725 19.1592 13.9165 19.1037 14.084 18.9927L15.188 18.2637C15.511 18.0507 15.783 17.7617 15.976 17.4272L21.799 7.34167C21.999 6.99467 22.052 6.59067 21.9485 6.20317ZM15.1095 16.9272C14.994 17.1277 14.83 17.3017 14.637 17.4292L13.533 18.1577L13.612 16.8382C13.626 16.6062 13.695 16.3777 13.8105 16.1772L18.6335 7.82367L19.9325 8.57367L15.1095 16.9272ZM20.9325 6.84167L20.4325 7.70767L19.1335 6.95767L19.6335 6.09167C19.726 5.93117 19.894 5.84167 20.0675 5.84167C20.152 5.84167 20.238 5.86317 20.3165 5.90867L20.7495 6.15867C20.865 6.22567 20.9475 6.33367 20.9825 6.46217C21.0175 6.59067 20.999 6.72567 20.932 6.84167H20.9325Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.5"/>
                    <path d="M6.5 5.5H11C11.2765 5.5 11.5 5.276 11.5 5C11.5 4.724 11.2765 4.5 11 4.5H6.5C6.2235 4.5 6 4.724 6 5C6 5.276 6.2235 5.5 6.5 5.5Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.5"/>
                    <path d="M16.145 8C16.145 7.724 15.9215 7.5 15.645 7.5H6.5C6.2235 7.5 6 7.724 6 8C6 8.276 6.2235 8.5 6.5 8.5H15.645C15.9215 8.5 16.145 8.276 16.145 8Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.5"/>
                    <path d="M14.41 11C14.41 10.724 14.1865 10.5 13.91 10.5H6.5C6.2235 10.5 6 10.724 6 11C6 11.276 6.2235 11.5 6.5 11.5H13.91C14.1865 11.5 14.41 11.276 14.41 11Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.5"/>
                    <path d="M12.68 14C12.68 13.724 12.4565 13.5 12.18 13.5H6.5C6.2235 13.5 6 13.724 6 14C6 14.276 6.2235 14.5 6.5 14.5H12.18C12.4565 14.5 12.68 14.276 12.68 14Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.5"/>
                    <path d="M10.7668 18.4997L10.3343 17.8527C10.1503 17.5692 9.83831 17.3997 9.49981 17.3997C9.16131 17.3997 8.84931 17.5687 8.66881 17.8477L8.61231 17.9322L8.42831 17.4722C8.27381 17.0912 7.90981 16.8447 7.50031 16.8447C7.09081 16.8447 6.72631 17.0912 6.57131 17.4742L6.03631 18.8142C5.93381 19.0707 6.05881 19.3617 6.31531 19.4642C6.37631 19.4882 6.43881 19.5002 6.50081 19.5002C6.69881 19.5002 6.88681 19.3812 6.96531 19.1857L7.50131 17.8457L7.86231 18.7472C7.96531 19.0017 8.19881 19.1792 8.47181 19.2102C8.74881 19.2432 9.01731 19.1187 9.18231 18.8822L9.50081 18.4027L10.0858 19.2777C10.1788 19.4167 10.3343 19.4997 10.5013 19.4997H11.1813C11.4578 19.4997 11.6813 19.2757 11.6813 18.9997C11.6813 18.7237 11.4578 18.4997 11.1813 18.4997H10.7683H10.7668Z" fill="#927EBC" stroke="#927EBC" stroke-width="0.5"/>
                    </svg>`,
        information: 'Disclaimer',
    },

];

const actionButtons = [
    {
        id: 1,
        label: "Add Resume"
    },
    {
        id: 2,
        label: "Add Job Preference"
    },
    {
        id: 3,
        label: "Add Skills"
    }
];

const rightList = [
    {
        id: 1,
        label: "Personal Information",
        sublabels: [
            { "id": 1, subname: "General Information" },
            { "id": 2, subname: "Contact Information" },
            { "id": 3, subname: "Social Media Profile" },
            { "id": 4, subname: "Equal Opportunity" }
        ]
    },
    {
        id: 2,
        label: "Educational Background",
        sublabels: [
            { id: 5, subname: "University/College" },
            { id: 6, subname: "Highest Degree Obtained" },
            { id: 7, subname: "Languages" }
        ]
    },
    {
        id: 3,
        label: "Professional Information",
        sublabels: [
            { id: 8, subname: "Employment Background" },
            { id: 9, subname: "Background and Skills" },]
    },
    {
        id: 4,
        label: "Job Preference",
        sublabels: [
            { id: 10, subname: "Preference list" },]
    },
    {
        id: 5,
        label: "Documents",
        sublabels: [
            { id: 11, subname: "Resume" },
            { id: 12, subname: "Other Documents" },]
    },
    {
        id: 6,
        label: "Miscellaneous Information",
        sublabels: [
            { id: 13, subname: "Work Authorizations" },
            { id: 14, subname: "Certifications and Licenses" },
            { id: 15, subname: "Professional Associations" },
            { id: 16, subname: "Honors & Awards" },
            { id: 17, subname: "Major Publications" },]
    },
    {
        id: 7,
        label: "Referral",
        sublabels: [
            { id: 18, subname: "Reference List" },
        ]
    },
    {
        id: 8,
        label: "Disclaimer",
        sublabels: [
            { id: 19, subname: "Agree To Disclaimer" },
        ]
    },

]

const Profilenew = () => {
    const personalDataFromStore = useSelector(
        (state) => state?.onboard?.onboardViewData?.data?.personalInformation
    );


    const fieldsToCheck = [
        "prefix",
        "first_name",
        "last_name",
        "middle_name",
        "bio",
        "referral_source_id",
        "profile_pic",
    ];

    const isAnyFieldFilled = personalDataFromStore
        ? fieldsToCheck.some((field) => personalDataFromStore[field]?.trim())
        : false;


    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState(null);

    const handleOpen = (type) => {
        setModalType(type);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setModalType(null);
    };

    const getModalContent = () => {
        switch (modalType) {
            case "general":
                return <GeneralInformation handleClose={handleClose} />;
            case "contact":
                return <ContactInformation handleClose={handleClose} />;
            case "socialmedia":
                return <SocialMediaProfile handleClose={handleClose} />;
            case "equalopportunity":
                return <EqualOppertunity handleClose={handleClose} />;
            case "university":
                return <University handleClose={handleClose} />;
            case "higerdegree":
                return <HighestDegree handleClose={handleClose} />;
            case "languages":
                return <Languages handleClose={handleClose} />;
            case "employmentbackground":
                return <EmploymentBackground handleClose={handleClose} />;
            case "backgroundskills":
                return <BackgroundSkills handleClose={handleClose} />;
            case "preferencelist":
                return <Preference handleClose={handleClose} />;
            case "resume":
                return <Resume handleClose={handleClose} />;
            case "otherdocumnet":
                return <OtherDocumnet handleClose={handleClose} />;
            case "referencelist":
                return <ReferenceList handleClose={handleClose} />;
            case "agreeToDisclaimernew":
                return <AgreeToDisclaimernew handleClose={handleClose} />;
            case "workAuthorizations":
                return <WorkAuthorizations handleClose={handleClose} />;
            case "certification":
                return <Certification handleClose={handleClose} />;
            case "proffesionalsAssosiations":
                return <ProffesionalsAssosiations handleClose={handleClose} />;
            case "honers":
                return <Honers handleClose={handleClose} />;
            case "majorPublications":
                return <MajorPublications handleClose={handleClose} />;
            default:
                return null;
        }
    };


    return (
        <Box sx={{ px: 4 }} className="dashboard_container">
            <Grid sx={{ padding: "20px", display: "flex", flexDirection: "column", minHeight: "100vh", }} >
                <Typography variant="h4" sx={{ mb: 0 }} className='dashboard_title'>Profile</Typography>
                <Box className='dashboard_maincard'>
                    <Grid container sx={{ mt: 0, px: 0 }} spacing={2} className='whole_card'>
                        <Grid item xs={12} md={3} className="first_card"
                            sx={{ height: "auto", mt: 5 }}
                        >
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1" sx={{ mb: 1, px: 2 }} className='profile_title'>Complete your profile</Typography>
                                <Typography variant="body1" sx={{ mb: 0, px: 2 }} className='profile_subtitle'>Lorem Ipsum</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ mt: { xs: 2, sm: 3, md: 2, lg: 1 }, }} className="" >
                            <Box className=""
                                sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: { xs: 2, sm: 2, md: 3, }, maxWidth: "100%", }}>
                                {actionButtons.map((item) => (
                                    <Box key={item.id} sx={{ textAlign: "center" }}>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                mt: { xs: 0.5, sm: 0 },
                                                fontSize: { xs: "12px", sm: "14px", md: "14px" }
                                            }}
                                            className="top_center_buttons"
                                        >
                                            {item.label}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={3} className='third_card' sx={{ display: "flex", justifyContent: 'flex-end', alignItems: "center", px: 3, mt: 5 }}>
                            <Box sx={{
                                display: "flex", alignItems: "center", justifyContent: "center", gap: 3, mt: 3
                            }}>
                                <Box>
                                    <img src={search} alt="" width="80%" />
                                </Box>

                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container sx={{ mt: 0, display: "flex", alignItems: "stretch", mb: 4 }} spacing={2} className='down_card'>
                        <Grid item xs={12} md={3}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignSelf: "flex-start",
                                position: { xs: "relative", md: "sticky" },
                                top: { md: "20px" },
                            }}
                        >
                            <Card sx={{ p: 2.5, borderRadius: 2, boxShadow: 0, }} className='profile_card'>
                                <Box
                                    sx={{
                                        height: "100%",
                                        overflowY: "scroll",
                                        overflowX: "hidden",
                                        scrollbarWidth: "none",
                                        "&::-webkit-scrollbar": { display: "none" },
                                        "-ms-overflow-style": "none",
                                        cursor: 'pointer'
                                    }}
                                >
                                    {InfoList.map((item) => (
                                        <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                            <Box sx={{ mt: 1 }} dangerouslySetInnerHTML={{ __html: item.svgicon }} />
                                            <Typography variant="body1" sx={{ mt: 1 }} className='all_info'>
                                                {item.information}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={9} sx={{ display: "flex", flexDirection: "column" }}>
                            <Card sx={{ p: 2.5, borderRadius: 2, boxShadow: 0, }} className='profile_card'>
                                <Typography variant="body1" sx={{ mb: 2 }} className='personal_title'>Personal Information</Typography>
                                <hr style={{ backgroundColor: "#DCCFF0", border: "none", height: "1px" }} />
                                <Box className="" sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, mt: 3 }}>
                                    <Box sx={{ mt: 0 }}>
                                        <img src={profileImage} alt="" height="90%" />
                                    </Box>
                                    <Box>
                                        <Typography variant="body1" sx={{ mt: 1, mb: 2 }} className='usename'>User Name</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                                            <div style={{ borderRadius: '6px', backgroundColor: 'rgba(76, 46, 136, 0.06)', width: '34px', height: '34px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 20 21" fill="none">
                                                    <path d="M17.916 8.18249C17.574 7.43849 16.887 6.2715 15.558 4.9425C14.229 3.6135 13.062 2.9265 12.318 2.5845C12.036 2.4555 11.793 2.3655 11.595 2.2995C11.262 2.1915 11.049 1.8675 11.079 1.5195C11.124 1.0395 11.598 0.727496 12.057 0.874496C13.035 1.1895 14.712 1.9725 16.62 3.8805C18.528 5.7885 19.308 7.4655 19.626 8.4435C19.773 8.8995 19.461 9.3765 18.981 9.4215C18.633 9.4545 18.309 9.23849 18.201 8.90549C18.135 8.70749 18.045 8.46149 17.916 8.18249Z" fill="#927EBC" />
                                                    <path d="M13.2387 7.24344C12.5457 6.55044 11.9757 6.14544 11.5977 5.92044C11.3037 5.74644 11.1657 5.39844 11.2587 5.06844V5.06544C11.3937 4.59144 11.9397 4.37844 12.3627 4.62744C12.8487 4.91544 13.5147 5.39544 14.2977 6.17844C15.0807 6.96144 15.5607 7.62744 15.8487 8.11344C16.1007 8.53644 15.8847 9.08244 15.4107 9.21744H15.4077C15.0807 9.31044 14.7297 9.16944 14.5557 8.87844C14.3367 8.50644 13.9317 7.93644 13.2387 7.24344Z" fill="#927EBC" />
                                                    <path d="M12.7979 20.1613C11.5979 20.1613 10.3919 19.9483 9.20688 19.5253C7.42488 18.8923 5.74788 17.7973 4.22388 16.2733C2.69988 14.7493 1.60488 13.0723 0.971879 11.2903C0.503879 9.97933 0.293879 8.64133 0.344879 7.31533C0.389879 6.10933 0.980879 4.93333 2.09388 3.81733C2.95788 2.95333 4.16388 2.53333 5.31888 2.69533C6.37188 2.84233 7.26888 3.44833 7.77888 4.36333L8.42688 5.52733C9.17088 6.86233 8.89188 8.59633 7.74888 9.75433C7.72788 9.78433 7.63188 9.92533 7.64388 10.1803C7.66488 10.6423 8.01888 11.2393 8.63988 11.8603C9.26088 12.4813 9.85788 12.8353 10.3199 12.8563C10.5749 12.8683 10.7159 12.7723 10.7459 12.7513C11.9039 11.6083 13.6379 11.3263 14.9729 12.0733L16.1369 12.7213C17.0489 13.2313 17.6579 14.1283 17.8049 15.1813C17.9669 16.3363 17.5469 17.5423 16.6829 18.4063C15.5669 19.5223 14.3909 20.1103 13.1849 20.1553C13.0559 20.1583 12.9269 20.1613 12.7979 20.1613ZM4.82688 4.15933C4.22388 4.15933 3.61488 4.41733 3.15588 4.87633C2.57988 5.45233 1.88088 6.35533 1.84488 7.36933C1.77288 9.30133 2.30988 12.2323 5.28588 15.2083C8.26488 18.1873 11.1929 18.7243 13.1249 18.6493C14.1389 18.6103 15.0419 17.9143 15.6179 17.3383C16.1519 16.8043 16.4129 16.0723 16.3169 15.3793C16.2359 14.7883 15.9119 14.3053 15.4049 14.0233L14.2439 13.3783C13.4849 12.9553 12.4769 13.1383 11.7899 13.8253C11.7089 13.9063 11.2649 14.3113 10.4819 14.3503C10.4429 14.3533 10.4009 14.3533 10.3619 14.3533C9.47088 14.3533 8.53488 13.8703 7.58088 12.9163C6.58488 11.9203 6.10188 10.9453 6.14688 10.0183C6.18288 9.23533 6.58788 8.79133 6.66888 8.71033C7.35588 8.02333 7.54188 7.01233 7.11888 6.25633L6.47088 5.09233C6.18888 4.58533 5.70588 4.26433 5.11488 4.18033C5.01888 4.16533 4.92288 4.15933 4.82688 4.15933ZM10.7429 12.7513C10.7339 12.7603 10.7279 12.7663 10.7279 12.7663C10.7339 12.7603 10.7399 12.7543 10.7429 12.7513ZM7.74588 9.75433C7.74288 9.75733 7.73688 9.76333 7.73388 9.76633C7.73388 9.76633 7.73988 9.76333 7.74588 9.75433Z" fill="#927EBC" />
                                                </svg>
                                            </div>
                                            <Typography variant="body1" sx={{ mt: 0 }} className='numbers'>Add mobile number</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                                            <div style={{ borderRadius: '6px', backgroundColor: 'rgba(76, 46, 136, 0.06)', width: '34px', height: '34px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 25" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.6974 16.3339C21.6974 18.3606 20.0488 20.0066 18.0247 20.0066H5.97513C3.95102 20.0066 2.30238 18.3606 2.30238 16.3339V8.66698C2.30238 7.99057 2.48758 7.35527 2.80905 6.81002L8.68849 12.6895C9.5681 13.5716 10.746 14.0577 12.0011 14.0577C13.2537 14.0577 14.4316 13.5716 15.3112 12.6895L21.1907 6.81002C21.5122 7.35527 21.6973 7.99052 21.6973 8.66698V16.3339H21.6974ZM18.0246 4.99427H5.97513C5.13925 4.99427 4.36764 5.27716 3.75039 5.74784L9.68899 11.689C10.3037 12.3011 11.1241 12.6406 12.0011 12.6406C12.8756 12.6406 13.6961 12.3011 14.3107 11.689L20.2493 5.74784C19.6321 5.27716 18.8606 4.99427 18.0246 4.99427ZM18.0246 3.57715H5.97513C3.16914 3.57715 0.885254 5.86104 0.885254 8.66702V16.334C0.885254 19.1426 3.16914 21.4239 5.97513 21.4239H18.0246C20.8306 21.4239 23.1145 19.1426 23.1145 16.334V8.66698C23.1145 5.86099 20.8306 3.57715 18.0246 3.57715Z" fill="#927EBC" />
                                                </svg>
                                            </div>
                                            <Typography variant="body1" sx={{ mt: 0 }} className='email'>you@gmail.com</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ mb: 2, cursor: 'pointer' }}>
                                    {/* genaral info */}
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, cursor: 'pointer' }}
                                        onClick={() => handleOpen("general")}
                                    >
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_title'>
                                            General Information
                                        </Typography>
                                        {/* <GeneralInformation open={open} onClose={() => setOpen(false)} /> */}
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_subtitle' >      {isAnyFieldFilled ? "View" : "Add"}
                                        </Typography>
                                    </Box>


                                    {/* contact info */}
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}
                                        onClick={() => handleOpen("contact")}
                                    >
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_title'>
                                            Contact Information
                                        </Typography>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_subtitle'>Add</Typography>
                                    </Box>
                                    {/* <ContactInformation open2={open2} handleClose2={handleClose2} /> */}

                                    {/* social media */}
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}
                                        onClick={() => handleOpen("socialmedia")}
                                    >
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_title'>Social media profiles</Typography>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_subtitle'>Add</Typography>
                                    </Box>
                                    {/* <SocialMediaProfile open4={open4} handleClose4={handleClose4} /> */}

                                    {/* Equal opportunity */}
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}
                                        onClick={() => handleOpen("equalopportunity")}
                                    >
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_title'>Equal Opportunity Employment Info</Typography>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_subtitle'>Add</Typography>
                                    </Box>
                                </Box>
                            </Card>

                            <Card sx={{ p: 2.5, borderRadius: 2, boxShadow: 0, my: 2 }} className='profile_card'>
                                <Typography variant="body1" sx={{ mb: 2 }} className='personal_title'>Educational background</Typography>
                                <hr style={{ backgroundColor: "#DCCFF0", border: "none", height: "0.8px" }} />
                                <Box sx={{ mb: 1, cursor: 'pointer' }}>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}
                                        onClick={() => handleOpen("university")}
                                    >
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_title'>University/ College</Typography>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_subtitle'>Add</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}
                                        onClick={() => handleOpen("higerdegree")}
                                    >
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_title'>Highest Degree Obtained</Typography>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_subtitle'>Add</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}
                                        onClick={() => handleOpen("languages")}
                                    >
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_title'>Languages</Typography>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_subtitle'>Add</Typography>
                                    </Box>

                                </Box>
                            </Card>

                            <Card sx={{ p: 2.5, borderRadius: 2, boxShadow: 0, my: 1 }} className='profile_card'>
                                <Typography variant="body1" sx={{ mb: 2 }} className='personal_title'>Professional Information</Typography>
                                <hr style={{ backgroundColor: "#DCCFF0", border: "none", height: "0.8px" }} />
                                <Box sx={{ mb: 1, cursor: 'pointer' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}
                                        onClick={() => handleOpen("employmentbackground")}
                                    >
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_title'>Employment Background</Typography>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_subtitle'>Add</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}
                                        onClick={() => handleOpen("backgroundskills")}
                                    >
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_title'>Background and Skills</Typography>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_subtitle'>Add</Typography>
                                    </Box>
                                </Box>
                            </Card>

                            <Card sx={{ p: 2.5, borderRadius: 2, boxShadow: 0, my: 1 }} className='profile_card'>
                                <Typography variant="body1" sx={{ mb: 2 }} className='personal_title'>Job Preference</Typography>
                                <hr style={{ backgroundColor: "#DCCFF0", border: "none", height: "0.8px" }} />
                                <Box sx={{ mb: 1, cursor: 'pointer' }}
                                    onClick={() => handleOpen("preferencelist")}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_title'>Preference list</Typography>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_subtitle'>Add</Typography>
                                    </Box>
                                </Box>
                            </Card>

                            <Card sx={{ p: 2.5, borderRadius: 2, boxShadow: 0, my: 1 }} className='profile_card'>
                                <Typography variant="body1" sx={{ mb: 2 }} className='personal_title'>Documents</Typography>
                                <hr style={{ backgroundColor: "#DCCFF0", border: "none", height: "1px" }} />
                                <Box sx={{ mb: 1, cursor: 'pointer' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}
                                        onClick={() => handleOpen("resume")}
                                    >
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_title'>Resume </Typography>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_subtitle'>Add</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}
                                        onClick={() => handleOpen("otherdocumnet")}
                                    >
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_title'>Other Documents </Typography>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_subtitle'>Add</Typography>
                                    </Box>

                                </Box>
                            </Card>

                            <Card sx={{ p: 2.5, borderRadius: 2, boxShadow: 0, my: 1 }} className='profile_card'>
                                <Typography variant="body1" sx={{ mb: 2 }} className='personal_title'>Miscellaneous Information</Typography>
                                <hr style={{ backgroundColor: "#DCCFF0", border: "none", height: "0.5px" }} />
                                <Box sx={{ mb: 1, cursor: 'pointer' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}
                                        onClick={() => handleOpen("workAuthorizations")}
                                    >
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_title'>Work Authorizations</Typography>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_subtitle'>Add</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}
                                        onClick={() => handleOpen("certification")}
                                    >
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_title'>Certifications and Licenses</Typography>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_subtitle'>Add</Typography>
                                    </Box>


                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}
                                        onClick={() => handleOpen("proffesionalsAssosiations")}
                                    >
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_title'>Professional Associations</Typography>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_subtitle'>Add</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}
                                        onClick={() => handleOpen("honers")}
                                    >
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_title'>Honors & Awards</Typography>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_subtitle'>Add</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}
                                        onClick={() => handleOpen("majorPublications")}
                                    >
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_title'>Major Publications</Typography>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_subtitle'>Add</Typography>
                                    </Box>

                                </Box>
                            </Card>

                            <Card sx={{ p: 2.5, borderRadius: 2, boxShadow: 0, my: 1 }} className='profile_card'>
                                <Typography variant="body1" sx={{ mb: 2 }} className='personal_title'>Referral</Typography>
                                <hr style={{ backgroundColor: "#DCCFF0", border: "none", height: "1px" }} />
                                <Box sx={{ mb: 1 }}
                                    onClick={() => handleOpen("referencelist")}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_title'>Reference List</Typography>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_subtitle'>Add</Typography>
                                    </Box>
                                </Box>

                            </Card>

                            <Card sx={{ p: 2.5, borderRadius: 2, boxShadow: 0, my: 1 }} className='profile_card'>
                                <Typography variant="body1" sx={{ mb: 2 }} className='personal_title'>Disclaimer</Typography>
                                <hr style={{ backgroundColor: "#DCCFF0", border: "none", height: "1px" }} />
                                <Box sx={{ mb: 1, cursor: 'pointer' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}
                                        onClick={() => handleOpen("agreeToDisclaimernew")}
                                    >
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_title'>Agree To Disclaimer</Typography>
                                        <Typography variant="body1" sx={{ mt: 0 }} className='common_info_subtitle'>Add</Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>

                    </Grid>
                </Box>
            </Grid >
            <CommonModal open={open} handleClose={handleClose}>
                {getModalContent()}
            </CommonModal>
        </Box >
    )
}

export default Profilenew