import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use("/",router)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});