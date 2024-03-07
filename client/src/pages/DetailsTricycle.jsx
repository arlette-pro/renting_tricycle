import React from "react";
import Link from "@mui/material/Link";
import img1 from "../images/TRICYCLE-BAZAR.jpg"
import ChatIcon from '@mui/icons-material/Chat';
import Container from "@mui/material/Container";
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import {
  AppBar,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const DetailsTricycle = () => {
  return (
    <div>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <InfoIcon />
          <Typography variant="h6">Tricycle Details</Typography>
        </Toolbar>
      </AppBar>
      <main >
        <div>
          <Container maxWidth="sm">
            <Typography
              variant="h2"
              align="center"
              color="textSecondary"
              gutterBottom
            >
              details
            </Typography>
          </Container>
        </div>
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // height: "50vh",
          }}
        >
          <Card sx={{maxWidth: 400 }} align="center">
          <CardMedia
              component="img"
              alt="green iguana"
              height="170"
              image={img1}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2"  color="text.secondary">
               <Typography>
               <p>Brand: </p>
               </Typography>
                <p>weightCapacity: Kg</p>
                <p>volumeCapacity:</p>
                <p>speciality: </p>
                <p>disponibility: </p>
              </Typography>
            </CardContent>
            <CardActions>
            
              <Grid container justifyContent="space-between">
                <Grid item xs={6}>
                  <Tooltip placement="left" title="Book">
                  <IconButton>
                    <BookOnlineIcon/>
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={6}>
                  <Tooltip placement="right" title="Chat">
                  <IconButton>
                    <ChatIcon/>
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Container>

        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button sx={{ marginLeft: "20px" }} href="/dashboard/tricycles">
            back
          </Button>
        </ButtonGroup>
      </main>
    </div>
  );
};

export default DetailsTricycle;
