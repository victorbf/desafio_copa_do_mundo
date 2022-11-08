import crypto from 'node:crypto';
import { client } from "../database/client";

export class TeamService {
  public static tableName = "team";

  public id!: string;
  public name!: string;
  public goals!: string;

  static async create(team: Pick<TeamService, 'name' | 'goals'>): Promise<TeamService> {
    console.log(team);
    const createTeam: TeamService = {
      ...team,
      id: crypto.randomUUID(),
    }

    await client.query(
      `INSERT INTO ${TeamService.tableName} (id, name, goals) VALUES ($1, $2, $3);`,
      [createTeam.id, createTeam.name, createTeam.goals]
    );

    return createTeam;
  }

  static async findAll(): Promise<TeamService[]> {
    const { rows } = await client.query(`SELECT * FROM ${TeamService.tableName}`);

    return rows;
  }

  static async find(id: string): Promise<TeamService> {
    const { rows } = await client.query(`SELECT * FROM ${TeamService.tableName} WHERE id = '${id}'`);
    return rows[0];
  }
  
  static async update({ id, newName }: { id: string, newName: string }): Promise<TeamService> {
    const { rows } = await client.query(`UPDATE ${TeamService.tableName} SET name = '${newName}' WHERE id = '${id}'`);

    return rows[0];
  }

  static async remove(id: string): Promise<boolean> {
    await client.query(`DELETE FROM ${TeamService.tableName} WHERE id = '${id}'`);

    return true;
  }
}
