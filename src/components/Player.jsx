import {useState} from "react";

export default function Player({initialName, symbol}) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
    }

    function handlePlayerNameChange(event) {
        setPlayerName(event.target.value);
    }

    const toggledPlayerEditing = isEditing ? <input type="text" value={initialName} onChange={handlePlayerNameChange}/> : <span className="player-name">{initialName}</span>

    return <li>
        <span className="player">
            {toggledPlayerEditing}
            <span className="player-symbol">{symbol}</span>
          </span>
        <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
}