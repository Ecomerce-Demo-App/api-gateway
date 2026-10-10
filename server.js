const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const CATALOG_SERVICE =
  "http://localhost:5002";

const CUSTOMER_SERVICE =
  "http://localhost:5001";

const CART_SERVICE =
  "http://localhost:5004";

const ORDER_SERVICE =
  "http://localhost:5005";

/*
 Product APIs
*/

app.get("/api/products", async (req, res) => {
  try {
    const response = await axios.get(
      `${CATALOG_SERVICE}/products`
    );

    res.json(response.data);
  } catch (error) {

    res.status(500).json({
      error:
        "Unable to fetch products"
    });

  }
});

/*
 Customer APIs
*/

app.get("/api/customers/:id", async (req, res) => {

  try {

    const response =
      await axios.get(
        `${CUSTOMER_SERVICE}/customers/${req.params.id}`
      );

    res.json(response.data);

  } catch (error) {

    res.status(500).json({
      error:
        "Unable to fetch customer"
    });

  }

});

/*
 Cart APIs
*/

app.get("/api/cart", async (req, res) => {

  try {

    const response =
      await axios.get(
        `${CART_SERVICE}/cart`
      );

    res.json(response.data);

  } catch (error) {

    res.status(500).json({
      error:
        "Unable to fetch cart"
    });

  }

});

/*
 Order APIs
*/

app.post("/api/order", async (req, res) => {

  try {

    const response =
      await axios.post(
        `${ORDER_SERVICE}/order`,
        req.body
      );

    res.json(response.data);

  } catch (error) {

    res.status(500).json({
      error:
        "Unable to create order"
    });

  }

});

app.get("/health", (req, res) => {

  res.json({
    service: "api-gateway",
    status: "UP"
  });

});

const PORT = 3000;

app.listen(PORT, () => {

  console.log(
    `API Gateway running on port ${PORT
