import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import swagPhotos from "../photos";
import BlurImage from "../components/BlurImage";
import usePhotos from "../utils/utils/usePhotos";
import { supabase } from "../utils/utils/supabase";
import usePhoto from "../utils/utils/usePhoto"
import Photo from "../components/frame";
import { Box, Button, Container, Grid, IconButton, Modal } from "@mui/material";
import { userAgent } from "next/server";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Link from "next/link";



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export default function Home() {
  const router = useRouter();
  const { photoId } = router.query;


  const [photo, photoIsloading] = usePhoto(photoId);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (photo) handleOpen();
    else handleClose();
  }, [photo]);


  const [photos, isLoading] = usePhotos();
  const changePage = async () => {
    await router.push("/auth")
  }
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.reload();
  }

  return (
    <Container fixed>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          <Photo photo={photo} />
        </Box>
      </Modal>
      <Box sx={{ textAlign: "center" }}>
      <Grid
  container spacing={2}
  direction="row"
  justifyContent="flex-end"
  alignItems="center">
    <Grid item xs={6} md={5}>
      <Button href="/">
          <h1> NextGram</h1>
          </Button>
          </Grid>
          <Grid item xs={6} md={4}>
        <IconButton  color="primary" aria-label="upload picture" component="label" >
          <input hidden accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>
        <Button onClick={changePage} variant="text">
          LogIn
        </Button>
        <Button onClick={handleLogout} variant="text">
          Logout
        </Button>
        </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        {isLoading ?
          <p>Loading</p>
          :
          photos.map(({ id, url }: any) => (
            <Grid key={id} item xs={4}>

              <Link
                href={{ pathname: "/", query: { photoId: id } }}
                as={`/p/${encodeURI(id)}`}
                shallow
                scroll={false}
              >

                <BlurImage
                  alt=""
                  src={url}
                  height={300}
                  width={300}
                  objectFit="cover"
                />

              </Link>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
