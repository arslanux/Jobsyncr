import React from 'react'
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import './job.css';
import { KeyResponsibilitesList } from './JobListData';

const KeyResponsibilities = ({jobData}) => {
    return (
        <Container maxWidth={false} sx={{ maxWidth: '1370px', margin: '0 auto' }}>
            <Grid item xs={12} md={8} lg={8}>
                <Typography variant="h4" className="summary_heading" sx={{ mt: 4, mb: 4 }}>
                    Key Responsibilities
                </Typography>
                {KeyResponsibilitesList.map((data) => (
                    <Card className='keyListCard' sx={{ mb: 4 }} key={data?.id}>
                        <Box
                            sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}
                        >
                            <Box>
                                <Typography variant="h6" className="summary_heading2">
                                    {data?.titleOfList}
                                </Typography>
                            </Box>

                            {data.lists.map((listItem) => (
                                <Box
                                    sx={{ mt: 1, display: 'flex', alignItems: 'flex-start', gap: '10px' }}
                                    key={listItem.id}
                                >
                                    <Box sx={{ mt: 0 }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <path d="M8.99989 3.74998C9.0986 3.74941 9.19645 3.76833 9.28782 3.80565C9.3792 3.84297 9.46231 3.89797 9.53239 3.96748L14.0324 8.46748C14.1721 8.608 14.2505 8.79809 14.2505 8.99623C14.2505 9.19437 14.1721 9.38446 14.0324 9.52498L9.53239 14.025C9.38892 14.1478 9.20436 14.2121 9.0156 14.2048C8.82685 14.1975 8.64779 14.1192 8.51422 13.9857C8.38065 13.8521 8.3024 13.673 8.29511 13.4843C8.28782 13.2955 8.35202 13.111 8.47489 12.9675L12.4424 8.99998L8.47489 5.03248C8.36958 4.92802 8.2976 4.79469 8.26806 4.64933C8.23852 4.50397 8.25275 4.35311 8.30894 4.21584C8.36514 4.07856 8.46077 3.96104 8.58376 3.87811C8.70675 3.79519 8.85156 3.7506 8.99989 3.74998Z" fill="#4c1b88" />
                                            <path d="M4.49989 3.74998C4.5986 3.74941 4.69645 3.76833 4.78782 3.80565C4.8792 3.84297 4.96231 3.89797 5.03239 3.96748L9.53239 8.46748C9.67208 8.608 9.75049 8.79809 9.75049 8.99623C9.75049 9.19437 9.67208 9.38446 9.53239 9.52498L5.03239 14.025C4.88892 14.1478 4.70436 14.2121 4.5156 14.2048C4.32685 14.1975 4.14779 14.1192 4.01422 13.9857C3.88065 13.8521 3.8024 13.673 3.79511 13.4843C3.78782 13.2955 3.85202 13.111 3.97489 12.9675L7.94239 8.99998L3.97489 5.03248C3.86958 4.92802 3.7976 4.79469 3.76806 4.64933C3.73852 4.50397 3.75275 4.35311 3.80894 4.21584C3.86514 4.07856 3.96077 3.96104 4.08376 3.87811C4.20675 3.79519 4.35156 3.7506 4.49989 3.74998Z" fill="#4c1b88" />
                                        </svg>
                                    </Box>

                                    <Box>
                                        <Typography variant="body1" className="summary_text" sx={{ mt: 0 }}>
                                            {listItem.sublist}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Card>
                ))}

                <Button className='apply_btn' sx={{ mt: 2, mb: 5, mx: 3 }}>
                    Apply
                </Button>
            </Grid>
        </Container>
    )
}

export default KeyResponsibilities