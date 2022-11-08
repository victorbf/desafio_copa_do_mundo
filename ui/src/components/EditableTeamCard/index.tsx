import { RefObject } from "react";

interface EditableTeamCard {
  isEditting: boolean;
  inputRef: RefObject<HTMLInputElement>;
  value: string;
  name: string;
  setValue: (value: string) => void;
  onBlur: () => void;
  onConfirm: (key: string) => void;
  onEditName: () => void;
}

const EditableTeamCard = ({
  isEditting,
  inputRef,
  value,
  name,
  setValue,
  onConfirm,
  onBlur,
  onEditName,
}: EditableTeamCard) =>
  isEditting ? (
    <div className="rounded p-2 min-w-[240px] bg-[#1a1a1a]">
      <input
        ref={inputRef}
        className="bg-[#1a1a1a]"
        type="text"
        value={value}
        autoFocus
        onChange={(event) => setValue(event.target.value)}
        onBlur={() => onBlur()}
        onKeyDown={(e) => onConfirm(e.key)}
      />
    </div>
  ) : (
    <button className="rounded p-2 min-w-[240px]" onClick={onEditName}>
      <p>{name}</p>
    </button>
  );

export default EditableTeamCard;
