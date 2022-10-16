import React, { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Header from "~/components/MainLayout/components/Header";
// import { logger } from "react-query/types/react/logger";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/" underline="hover">
        AWS Course
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const MainLayout: React.FC<{ children: React.ReactNode }> = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const res = await axios
        .get(
          "https://m0n1i622y2.execute-api.eu-west-1.amazonaws.com/dev/products"
        )
        .then((res) => {
          setProducts(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProducts().then();
  }, []);

  // useEffect(() => {
  //   console.log(products);
  // }, [products]);

  return (
    <>
      <Header />
      <main>
        <Container sx={{ pb: 8 }} maxWidth="md">
          {products.map(
            (product: {
              productId: string;
              title: string;
              image: string;
              description: string;
              price: number;
            }) => (
              <Card sx={{ maxWidth: 750 }} key={product.productId}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="300"
                  image={product.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Price ${product.price}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  {/*<Button size="small">Share</Button>*/}
                  {/*<Button size="small">Learn More</Button>*/}
                </CardActions>
              </Card>
            )
          )}
        </Container>
      </main>
      <Box
        component={"footer"}
        sx={{ bgcolor: (theme) => theme.palette.background.paper, padding: 6 }}
      >
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Thank you for your purchase!
        </Typography>
        <Copyright />
      </Box>
    </>
  );
};

export default MainLayout;
