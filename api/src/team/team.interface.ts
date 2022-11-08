export interface BaseTeam {
  name: string;
  goals: string;
}

export interface Team extends BaseTeam {
  id: number;
}
