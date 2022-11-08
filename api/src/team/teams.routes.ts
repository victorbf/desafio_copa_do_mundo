import express, { Request, Response } from "express";
import { TeamService } from "./teams.service";
import { BaseTeam, Team } from "./team.interface";

export const teamsRouter = express.Router();


// times
teamsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const teams: BaseTeam[] = await TeamService.findAll();

    res.status(200).send(teams);
  } catch (e) {
    res.status(500).send('Error 500');
  }
});

// time
teamsRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const team: BaseTeam = await TeamService.find(id);

    if (team) {
      return res.status(200).send(team);
    }

    res.status(404).send("Time não encontrado");
  } catch (e) {
    res.status(500).send('Error');
  }
});

// criar time
teamsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const team: BaseTeam = req.body;
    const newTeam = await TeamService.create(team);

    res.status(201).json(newTeam);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error');
  }
});

// atualizar time
teamsRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const newName: BaseTeam['name'] = req.body.name;

    const existingTeam = await TeamService.find(id);

    if (existingTeam) {
      const updatedItem = await TeamService.update({ id, newName });
      return res.status(200).json(updatedItem);
    }

    throw Error;
  } catch (e) {
    res.status(500).send('Error');
  }
});

// remover time
teamsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await TeamService.remove(id);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).send('Error');
  }
});
