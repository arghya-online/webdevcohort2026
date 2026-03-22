import { createServerApplication } from "./app";

const app = createServerApplication();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
