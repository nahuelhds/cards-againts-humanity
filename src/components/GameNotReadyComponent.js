import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faClipboard,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default class GameNotReadyComponent extends Component {
  static propTypes = {
    invitationUrl: PropTypes.string.isRequired,
    playerName: PropTypes.string.isRequired,
    players: PropTypes.array.isRequired,
  };

  state = {
    copied: false,
  };

  handleShareAction = () => {
    const { playerName, invitationUrl: url } = this.props;
    navigator
      .share({
        title: "Cards against humanity",
        text: `¡${playerName} te está invitando a jugar 😎\nUtilizá este link para sumarte👇\n`,
        url,
      })
      .catch((error) => console.log("Error sharing", error));
  };

  render() {
    const { players, playerName, invitationUrl } = this.props;
    const owner = players[0];
    const joinedPlayers = players.filter((player) => player.name);
    const emptySeatsCount = players.length - joinedPlayers.length;
    return (
      <div className={"flex p-4 items-center"}>
        <div className="flex-1 m-1 flex flex-col left">
          <div className={"my-4"}>
            <h2 className={"text-2xl"}>
              Sala de <strong>{owner.name}</strong>
            </h2>
            <p>Participantes:</p>
            <ul className={"list-disc list-inside"}>
              {players
                .filter((player) => player.name)
                .map((player) => (
                  <li key={`player-${player.id}`}>
                    {player.name === playerName ? (
                      <strong>{player.name}</strong>
                    ) : (
                      player.name
                    )}
                  </li>
                ))}
            </ul>
            <p className={"my-2"}>
              <Icon icon={faCircleNotch} spin />
              <span>
                {" "}
                Esperando que se unan {emptySeatsCount} jugadores más...
              </span>
            </p>
            <div>
              <strong className={"text-xl mb-2"}>Enlace de invitación</strong>
              <div className={"flex my-2"}>
                <input
                  type={"text"}
                  readOnly
                  value={invitationUrl}
                  className={"text-xl p-2 rounded shadow flex-1"}
                />
              </div>
              <div className={"flex justify-between my-2"}>
                <CopyToClipboard
                  text={invitationUrl}
                  onCopy={() => this.setState({ copied: true })}
                >
                  <button className={"button success shadow p-2"}>
                    <Icon icon={faClipboard} /> Copiar
                  </button>
                </CopyToClipboard>
                {navigator.share && (
                  <button
                    className={"button success shadow"}
                    onClick={this.handleShareAction}
                  >
                    <Icon icon={faShareAlt} /> Compartir
                  </button>
                )}
              </div>
              {this.state.copied && (
                <p className={"italic"}>Invitación copiada al portapapeles</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
