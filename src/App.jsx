import { useState, useEffect } from 'react'
import './App.css'
import ShotMap from './Charts/ShotMap';


function App() {
  const [dataset, setDataset] = useState([]);

  const xAccessor = d => d.coordinates.x;
  const yAccessor = d => d.coordinates.y;


  function Shot(description, shot, team, player, coordinates){
      this.description = description;
      this.shotType = shot;
      this.team = team;
      this.player = player;
      this.coordinates = coordinates;
  }

  async function getPlayData(){
      const repsonse = await fetch('https://statsapi.web.nhl.com/api/v1/game/2021020517/feed/live', {mode: 'cors'})
      const data = await repsonse.json()
      return await data.liveData.plays.allPlays;   
  }

  function getShots(play){
      if(play.result.event === "Goal" || play.result.event === "Shot"){
          return true;
      }
  }

  function getShotData(array, shots){
      array.forEach((sData) => {
        if(sData.team.name === "Minnesota Wild"){
          let shot = new Shot(sData.result.description, sData.result.secondaryType, sData.team.name, sData.players[0].player.fullName, sData.coordinates);
          if(shot.coordinates.x > 0){
            shot.coordinates.x = shot.coordinates.x * -1;
            shot.coordinates.y = shot.coordinates.y * -1;
          }
          shots.push(shot);
        }
      });

      setDataset(shots);
  }

  async function createShotDataList(){
      let shots = [];
      const playData = await getPlayData();
      const shotData =  await playData.filter(getShots);
      getShotData(shotData, shots);
  }

  useEffect(()=>{
      createShotDataList();
  }, []);

  return (
    <div className="App">
      <ShotMap data={dataset} xAccessor={xAccessor} yAccessor={yAccessor}/>
    </div>
  )
}

export default App
