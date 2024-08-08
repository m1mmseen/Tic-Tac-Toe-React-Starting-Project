import {useState} from "react";

export default function Player({initialName, symbol, isActive, onChangeName}) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
        if (isEditing) {
            onChangeName(symbol, playerName)
        }
    }

    function handlePlayerNameChange(event) {
        setPlayerName(event.target.value);
    }

    const toggledPlayerEditing = isEditing ? <input type="text" value={playerName} onChange={handlePlayerNameChange}/> : <span className="player-name">{playerName}</span>

    return <li className={isActive ? 'active' : undefined}>
        <span className="player">
            {toggledPlayerEditing}
            <span className="player-symbol">{symbol}</span>
          </span>
        <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
}
