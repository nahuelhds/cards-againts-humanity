import React, { useState } from "react";
import PropTypes from "prop-types";

const GameCreateComponent = (props) => {
  const [size, setSize] = useState("3");
  return (
    <div className={"my-4"}>
      <h2 className={"text-2xl"}>Crear sala</h2>
      <label>Cant. de jugadores</label>
      <div className={"flex my-1"}>
        <input
          type={"number"}
          min={3}
          max={20}
          className={"flex-1 py-2 px-4 rounded-l"}
          value={size}
          onChange={(event) => setSize(event.target.value)}
        />
        <button
          className={`button success rounder-r`}
          disabled={props.disabled}
          onClick={() => props.onCreate(size)}
        >
          Crear
        </button>
      </div>
    </div>
  );
};

GameCreateComponent.propsTypes = {
  disabled: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
};

GameCreateComponent.defaultProps = {
  disabled: false,
  onCreate: () => null,
};

export default GameCreateComponent;
