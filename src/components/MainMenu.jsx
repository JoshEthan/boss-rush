import { 
  Joystick, 
  insertCoin,
  isHost,
  myPlayer,
  onPlayerJoin,
  useMultiplayerState,
} from "playroomkit";
import { useEffect, useState } from "react";
import { Map } from "./Map";
import { Lobby } from "./Lobby";

export const MainMenu = () => {
  const start = async () => {
    await insertCoin({skipLobby: true});
  };

  useEffect(() => {
    start();
    }, []);

    return (
      <>
        <Lobby />
      </>
    );
};

