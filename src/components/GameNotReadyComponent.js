import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
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
    const { playerName } = this.state;
    navigator
      .share({
        title: "Cards against humanity",
        text: `¡${playerName} te está invitando a jugar 😎\nUtilizá este link para sumarte👇\n`,
        url: this.props.invitationUrl,
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
              <p className={"text-lg mb-2"}>
                Copiá este enlace para invitar a tus amigues.
              </p>
              <div className={"flex my-2"}>
                <input
                  type={"text"}
                  readOnly
                  value={invitationUrl}
                  className={"text-xl p-2 rounded-l shadow flex-1"}
                />
                {!navigator.share && (
                  <CopyToClipboard
                    text={`¡${playerName} te está invitando a jugar 😎\nUtilizá este link para sumarte👇\n\n${invitationUrl}`}
                    onCopy={() => this.setState({ copied: true })}
                  >
                    <button className={"button success rounded-r shadow p-2"}>
                      Copiar invitación
                    </button>
                  </CopyToClipboard>
                )}
              </div>
              {navigator.share && (
                <button
                  className={"button success rounded-r shadow flex-shrink-0"}
                  onClick={this.handleShareAction}
                >
                  Compartir invitación
                </button>
              )}
              {this.state.copied && (
                <p className={"italic"}>Enlace copiado al portapapeles</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
