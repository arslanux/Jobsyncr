import { DeleteRounded, SaveOutlined, SaveRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import Logo from './assets/logo.svg';

const Components = () => {
  return (
    <Container
      sx={{
        my: 10,
      }}
    >
      <Stack direction={'column'} gap={7}>
        <Typography variant='h5'>Components</Typography>
        <Stack direction='row' gap={2} alignItems={'center'}>
          <Typography variant='h6'>Logo: </Typography>
          <img src={Logo} alt='logo' />
        </Stack>
        <Stack direction='row' gap={2} alignItems={'center'}>
          <Typography variant='h6'>Colors: </Typography>
          <Box
            sx={{
              width: '20px',
              height: '20px',
              backgroundColor: 'primary.main',
            }}
          />
          <Box
            sx={{
              width: '20px',
              height: '20px',
              backgroundColor: 'secondary.main',
            }}
          />
          <Box
            sx={{
              width: '20px',
              height: '20px',
              backgroundColor: 'info.main',
            }}
          />
          <Box
            sx={{
              width: '20px',
              height: '20px',
              backgroundColor: 'success.main',
            }}
          />
          <Box
            sx={{
              width: '20px',
              height: '20px',
              backgroundColor: 'warning.main',
            }}
          />
          <Box
            sx={{
              width: '20px',
              height: '20px',
              backgroundColor: 'error.main',
            }}
          />
        </Stack>
        <Stack direction='row' gap={2} alignItems={'center'}>
          <Typography variant='h6'>Buttons: </Typography>

          <Button variant='contained'>Primary</Button>
          <Button variant='outlined' color='warning'>
            Secondary
          </Button>
          <Button variant='text' color='error'>
            Text
          </Button>
          <Button
            variant='contained'
           // color='primary'
            sx={{color:'white',bgcolor:'primary.main'}}
            startIcon={<SaveRounded />}
          >
            Save
          </Button>
          <Button
            variant='outlined'
            color='error'
            startIcon={<DeleteRounded />}
          >
            Delete
          </Button>
        </Stack>
        <Stack direction='row' gap={2} alignItems={'center'}>
          <Typography variant='h6'>Input: </Typography>
          <TextField variant='outlined' size='small' />
          <TextField variant='filled' size='small' />
          <TextField variant='standard' size='small' />
        </Stack>
        <Stack direction='row' gap={2} alignItems={'center'}>
          <Typography variant='h6'>Typography: </Typography>
          <Typography variant='h1'>H1</Typography>
          <Typography variant='h2'>H2</Typography>
          <Typography variant='h3'>H3</Typography>
          <Typography variant='h4'>H4</Typography>
          <Typography variant='h5'>H5</Typography>
          <Typography variant='h6'>H6</Typography>
          <Typography variant='subtitle1'>Subtitle1</Typography>
          <Typography variant='subtitle2'>Subtitle2</Typography>
          <Typography variant='body1'>Body1</Typography>
          <Typography variant='body2'>Body2</Typography>
          <Typography variant='button'>Button</Typography>
          <Typography variant='caption'>Caption</Typography>
          <Typography variant='overline'>Overline</Typography>
        </Stack>
        <Stack direction='row' gap={2} alignItems={'center'}>
          <Typography variant='h6'>Select</Typography>
          <FormControl fullWidth>
            {/* <InputLabel id='demo-simple-select-label'>Age</InputLabel> */}
            <TextField
              select
              InputLabelProps={{ shrink: false }}
              labelId='demo-simple-TextField-label'
              id='demo-simple-select'
              value={10}
              //   label='Age'
              size='small'

              //   onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </TextField>
          </FormControl>
        </Stack>
        <Stack direction='row' gap={2} alignItems={'center'}>
          <Typography variant='h6'>Currency Input</Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Components;
