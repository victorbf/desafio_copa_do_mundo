import { FormEvent } from "react";

interface CreateNewTeamProps {
  showCreateTeamInput: boolean;
  createTeam: ({ name, goals }: { name: string | null; goals: string | null }) => void;
  setCreateTeamInputVisibility: (value: boolean) => void;
}

const CreateNewTeam = ({ showCreateTeamInput,  createTeam, setCreateTeamInputVisibility }: CreateNewTeamProps) => {
  const handleSubmit = (event: FormEvent) => {
    event?.preventDefault();
    const formTarget = event.target as HTMLFormElement;
    const formData = new FormData(formTarget);
    const name = formData.get('name');
    const goals = formData.get('goals');
    if (name && goals) {
      createTeam({ name: `${name!}`, goals: `${goals}` });
    }
  }
  return (
    <div className="mt-6 grid grid-row-2 gap-4">
      {showCreateTeamInput ? (
        <form name="adicionar time" onSubmit={handleSubmit} className="grid grid-row-2 gap-4">
          <input
            type="text"
            name="name"
            className="text-xl p-2 rounded-md"
            placeholder="Nome do time"
            required
          />
          <input
            type="number"
            name="goals"
            className="text-xl p-2 rounded-md"
            placeholder="Gols"
            required
          />
          <button className="bg-green-600" type="submit">
            Adicionar
          </button>
        </form>
      ) : (
        <button
          className="bg-green-600"
          type="button"
          onClick={() => setCreateTeamInputVisibility(true)}
        >
          Criar novo time
        </button>
      )}
    </div>
  );
};

export default CreateNewTeam;
