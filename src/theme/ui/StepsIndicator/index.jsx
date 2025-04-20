import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Step = ({ isActive, isCompleted }) => {
  return (
    <Box
      sx={{
        height: '8px',
        borderRadius: '8px',
        bgcolor: isCompleted
          ? 'success.main'
          : isActive
          ? 'primary.main'
          : 'grey.300',
        width: '100%',
      }}
    />
  );
};
const StepsIndicator = ({ currentStep, totalSteps,step }) => {
  return (
    <Stack direction={'column'} gap={2}>
      <Stack direction={'row'}>
        <Typography variant='h6'>
          Steps {step} of {totalSteps}
        </Typography>
      </Stack>
      <Stack direction={'row'} gap={1}>
        {Array(totalSteps)
       
          .fill(0)
          .map((_, index) => {
            return (
              <Step
              key={index}
              isActive={index + 1 === step}
              isCompleted={index + 1 < step}
            />
            )
           
})}
      </Stack>
    </Stack>
  );
};

export default StepsIndicator;
