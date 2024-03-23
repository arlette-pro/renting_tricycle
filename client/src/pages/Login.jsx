// import React, { useState } from "react";
// import "react-slideshow-image";
// import { useNavigate } from "react-router-dom";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import { Fade, Slide } from "react-slideshow-image";
// import { loginUser } from "../service";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import img1 from "../images/TRICYCLE-BAZAR.jpg";
// import img2 from "../images/tricycleCargo.jpeg";
// import img3 from "../images/LifanTricycle.jpeg";
// import img4 from "../images/Dayang.jpeg";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// const defaultTheme = createTheme();

// const slideImages = [img1, img2];

// const divStyle = {
//   maxWidth: "500px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   height: "100px",
//   // backgroundSize: "cover",
// };

// export function Login(props) {
//   const [email, setEmail] = useState("ana@gmail.com");
//   const [password, setPassword] = useState("12345678");
//   const navigate = useNavigate();
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const data = {
//       email: formData.get("email"),
//       password: formData.get("password"),
//     };
//     if (!data.password) {
//       alert("Missing password");
//       return;
//     }
//     if (!data.email) {
//       alert("Missing email");
//       return;
//     }
//     await login(data);
//   };

//   async function login(data) {
//     try {
//       const { user } = await loginUser(data);
//       // saving user and user's role in react context
//       console.log(user);
//       props.onLogin(user);
//       if (user.role === "Admin") {
//         navigate("/dashboard/users");
//         return;
//       }
//       navigate("/dashboard/tricycles");
//     } catch (error) {
//       console.error(error);
//       alert("Error logging in");
//     }
//   }

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container
//         component="main"
//         maxWidth="xs"
//         sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
//       >
//         <Box sx={{ display:'flex', justifyContent:"center"}}>
//           <Slide>
//             {slideImages.map((image, index) => (
//               <div
//                 key={index}
//                 style={{ ...divStyle, backgroundImage: `url(${image}) no-repeat` }}
//               />
//             ))}
//           </Slide>
//         </Box>
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             noValidate
//             sx={{ mt: 1 }}
//           >
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               value={email}
//               onChange={(event) => setEmail(event.target.value)}
//               autoComplete="email"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               value={password}
//               onChange={(event) => setPassword(event.target.value)}
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item>
//                 <Link href="/register" variant="body2">
//                   {"Don't have an account? Register"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>

//         {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Fade, Slide } from "react-slideshow-image";
import { loginUser } from "../service";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { dividerClasses } from "@mui/material";

const defaultTheme = createTheme();

const slideImages = [
  {
    url: "https://lifan.gojamaa.com/wp-content/uploads/2019/11/TRICYCLE-BAZAR.jpg",
    caption: "Bazar",
  },
  {
    url: "https://agrostox.com/uploads/images_produits/5df8fff79fa3d042655175.jpg",
    caption: "Lifan",
  },
  {
    url: "https://image.made-in-china.com/2f0j00LPhRTfKBJDqv/Three-Wheel-Motorcycle-Tricycle-with-1500kgs-Loading-Capacity.jpg",
    caption: "Dayang",
  },
];

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "150px",
  width: "150px",
  backgroundSize: "cover",
  overflow: "hidden",
  border: "1px solid black",
};

export function Login(props) {
  const [email, setEmail] = useState("ana@gmail.com");
  const [password, setPassword] = useState("12345678");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (!data.password) {
      alert("Missing password");
      return;
    }
    if (!data.email) {
      alert("Missing email");
      return;
    }

    await login(data);
  };

  async function login(data) {
    try {
      const { user } = await loginUser(data);
      console.log(user);
      props.onLogin(user);
      if (user.role === "Admin") {
        navigate("/dashboard/users");
        return;
      }
      navigate("/dashboard/tricycles");
    } catch (error) {
      console.error(error);
      alert("Error logging in");
    }
  }
  const spanStyle = {
    fontSize: "20px",
    background: "#efefef",
    color: "#000000",
  };
  return (
    <ThemeProvider theme={defaultTheme} sx={{ background: "red" }}>
      <Container
        component="main"
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CssBaseline />
        <Box sx={{ width: "40%", marginTop: 8 }}>
          <div className="slide-container">
            <Fade>
              {slideImages.map((image, index) => (
                <div key={index}>
                  <div
                    style={{
                      ...divStyle,
                      backgroundImage: `url(${image.url})`,
                    }}
                  >
                    <span style={{ spanStyle }}>{image.caption}</span>
                  </div>
                </div>
              ))}
            </Fade>
          </div>
        </Box>

        <Box
          sx={{
            width: "50%",
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
