import "dotenv/config";
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { teamsRouter } from "./team/teams.routes";
import { setupDatabase } from './database/setupDatabase';


if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/teams", teamsRouter);

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  await setupDatabase();
});
