import { TeamService } from "../team/teams.service";
import { client } from "./client";

export const setupDatabase = async () => {
  await client.connect();

  await client.query(`CREATE TABLE IF NOT EXISTS ${TeamService.tableName} (
    id varchar(36) PRIMARY KEY,
    name varchar(255) UNIQUE NOT NULL,
    goals varchar(255) NOT NULL
  );`);
}
