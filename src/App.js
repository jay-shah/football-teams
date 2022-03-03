import './App.css';
import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PLAYERS from './players.json'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';

const NUMBER_OF_PLAYERS = 12


const App = () => {

  const [playersChosen, setPlayersChosen] = useState({})
  const [redTeam, setRedTeam] = useState({})
  const [blackTeam, setBlackTeam] = useState({})
  const [loading, setLoading] = useState(false)

  const handlePlayers = (player) => {

    if (playersChosen.hasOwnProperty(player)) {
      let newPlayers = playersChosen
      delete newPlayers[player]
      setPlayersChosen({ ...newPlayers })
    }

    else {
      setPlayersChosen({ ...playersChosen, [player]: PLAYERS[player] })
    }
  }

  const randomProperty = (obj) => {
    var keys = Object.keys(obj);
    return keys[Math.floor(Math.random()*keys.length)]
};

  const getTeams = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      
    }, 2000);



    let tempRedTeam = {}
    let tempBlackTeam = {}

    let changingPlayers = {...playersChosen}


    Object.keys(playersChosen).forEach((player, index) => {
      

      let randomPlayer = randomProperty(changingPlayers)

      if (Object.keys(tempRedTeam).length < (NUMBER_OF_PLAYERS/2)) {
        tempRedTeam[randomPlayer] = playersChosen[randomPlayer]
        delete changingPlayers[randomPlayer]
      }
      else {
        tempBlackTeam[randomPlayer] = playersChosen[randomPlayer]
        delete changingPlayers[randomPlayer]
      }
    })

    setBlackTeam({ ...tempBlackTeam })
    setRedTeam({ ...tempRedTeam })
  }

  return (
    <div className="App">
      <Typography variant="h1" component="div" gutterBottom>
        Pick {NUMBER_OF_PLAYERS - Object.keys(playersChosen).length} players
      </Typography>
      <div className="buttonContainer">
        {Object.keys(PLAYERS).map((player) =>
          <Button disabled={(Object.keys(playersChosen).length >= NUMBER_OF_PLAYERS) && !playersChosen.hasOwnProperty(player) ? true: false} key={player} onClick={() => handlePlayers(player)} className="button" variant={playersChosen.hasOwnProperty(player) ? "contained" : "outlined"}>{PLAYERS[player].name}</Button>
        )}
      </div>

      <Button disabled={Object.keys(playersChosen).length !== NUMBER_OF_PLAYERS ? true: false} className="goButton" variant="contained" color="success" onClick={() => getTeams()}>
        <SportsSoccerIcon />
        Get teams
        <SportsSoccerIcon />
      </Button>
      <Card sx={{ minWidth: 275, maxWidth: 600, margin: "40px auto" }}>
        
        {(Object.keys(blackTeam).length  + Object.keys(redTeam).length) !== NUMBER_OF_PLAYERS ?
          (
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Pick {NUMBER_OF_PLAYERS} players & click the button
              </Typography>
            </CardContent>
          )
          :
          loading === true ? (
            <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              The AI is calculating...
            </Typography>
          </CardContent>
          ) :
          (
            <CardContent sx={{ display: "flex" }}>
              <div className="teamContainer">

                <Chip label="Red Team" variant="outlined" color="error" icon={<SportsSoccerIcon />} sx={{ margin: "10px" }} />
                {Object.keys(redTeam).map((player) => (
                  <Typography key={player} sx={{ fontSize: 14 }} color="error" gutterBottom>
                    {redTeam[player].name}
                  </Typography>))}
              </div>
              <div className="teamContainer">

                <Chip label="Black Team" variant="outlined" color="default" icon={<SportsSoccerIcon />} sx={{ margin: "10px" }} />
                {Object.keys(blackTeam).map((player) => (
                  <Typography key={player} sx={{ fontSize: 14 }} color="default" gutterBottom>
                    {blackTeam[player].name}
                  </Typography>
                ))}
              </div>
            </CardContent>)
        }

      </Card>
    </div >
  )
}

export default App