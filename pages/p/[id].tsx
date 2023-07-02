import { Box, CircularProgress, Container, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import Photo from '../../components/frame';
import swagPhotos from '../../photos';
import usePhoto from '../../utils/utils/usePhoto';


export default function PhotoPage() {
  const router = useRouter();

  const { id } = router.query;
  const [photo, photoIsloading] = usePhoto(id);
  return (
    <Container fixed>
      {photo ? (
        <Grid container spacing={2}>
          <Grid item xs={8}><Photo photo={photo} /></Grid>
          <Grid item xs={4}><Photo photo={photo} /></Grid>
        </Grid>
      ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress disableShrink />
          </Box>
      )}
    </Container>
  );
}
