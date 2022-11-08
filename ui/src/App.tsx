import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import CreateNewTeam from "./components/CreateNewTeam";
import EditableTeamCard from "./components/EditableTeamCard";
import Header from "./components/Header";
import ChartComponent from "./components/ChartComponent";

export interface TeamTypes {
  id: number;
  name: string;
  goals: string;
}

const App = () => {
  const [teams, setTeams] = useState<TeamTypes[]>([]);
  const [newNameValue, setNewNameValue] = useState<string>("");
  const [showCreateTeamInput, setCreateTeamInputVisibility] =
    useState<boolean>(false);
  const [isEditting, setEditting] = useState<number>();

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    axios
      .get("http://localhost:7200/teams")
      .then((res) => setTeams(res.data))
      .catch((error) => console.error(error));
  }, []);

  const createTeam = ({ name, goals }: { name: string | null; goals: string | null }) => {
    axios
      .post("http://localhost:7200/teams", { name, goals })
      .then((res) => {
        setTeams([...teams, res.data]);
        setCreateTeamInputVisibility(false);
      })
      .catch((error) => console.error(error));
  };

  const removeTeam = (id: number) => {
    axios
      .delete(`http://localhost:7200/teams/${id}`)
      .then(() => {
        const updatedTeams = teams.filter((team) => team.id !== id);
        setTeams(updatedTeams);
      })
      .catch((error) => console.error(error));
  };

  const editName = (id: number) => {
    axios
      .put(`http://localhost:7200/teams/${id}`, { name: newNameValue })
      .then(() => {
        const updatedTeams = teams.map((team) => {
          if (team.id === id) {
            return {
              ...team,
              name: newNameValue,
            };
          }
          return team;
        });

        setTeams(updatedTeams);
      });
  };

  const setEditName = ({ id, name }: { id: number; name: string }) => {
    setEditting(id);
    setNewNameValue(name);
  };

  const handleConfirmation = async ({
    key,
    id,
  }: {
    key: string;
    id: number;
  }) => {
    if (key === "Enter") {
      if (newNameValue === "") {
        removeTeam(id);
      } else {
        editName(id);
      }
      ref.current?.blur();
    }
  };

  return (
    <div className="d-flex">
      <Header />
      {!!teams.length && (
        <ChartComponent data={teams} />
      )}
      <div className="grid lg:grid-cols-3 gap-4 sm:grid-cols-2 xs:grid-cols-1">
        {teams.map((team) => (
          <EditableTeamCard
            key={team.id}
            inputRef={ref}
            isEditting={Boolean(isEditting === team.id)}
            name={team.name}
            onBlur={() => setEditting(undefined)}
            onConfirm={(key) => handleConfirmation({ key, id: team.id})}
            onEditName={() => setEditName(team)}
            setValue={setNewNameValue}
            value={newNameValue}
          />
        ))}
      </div>
      <CreateNewTeam
        showCreateTeamInput={showCreateTeamInput}
        createTeam={createTeam}
        setCreateTeamInputVisibility={setCreateTeamInputVisibility}
      />
    </div>
  );
};

export default App;
