import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { calculateString } from "./utils.ts";

const router = new Router();
const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes()); // Enable reading routes

router.get("/calc/:exp", (context) => {
  if (context.params && context.params.exp) {
    const msg = calculateString(context.params.exp);
    console.log(msg);
    context.response.body = {
      success: true,
      msg,
    };
  } else {
    context.response.body = {
      success: false,
      msg: "Failed to get expression",
    };
  }
});

console.info("CORS-enabled web server listening on port 8080");
await app.listen({ port: 8080 });
