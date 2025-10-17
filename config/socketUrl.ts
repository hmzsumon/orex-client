// config/socketUrl.ts
let socketUrl = "";

if (process.env.NODE_ENV === "development") {
  socketUrl = "http://localhost:8000"; // local socket server
} else {
  socketUrl = "https://orex-trade-api-eded9c2b17a0.herokuapp.com"; // deployed socket server
}

export default socketUrl;
