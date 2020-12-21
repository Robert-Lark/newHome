import {graphql} from "gatsby";
import React, {useState, useRef} from "react";
import "../styles/app.scss";
//Import Components
import Player from "../musicPlayer/Player";
import Song from "../musicPlayer/Song";
import Library from "../musicPlayer/library";
import Nav from "../musicPlayer/Nav";
//Import data
import chillhop from "../musicPlayer/data";

//Util
import {playAudio} from "../musicPlayer/util";

function QuietCast({data}) {
  console.log(data.content.nodes);
  const datatester = chillhop()
  console.log(datatester);
  //Ref
  const audioRef = useRef(null);

  const [songs, setSongs] = useState(chillhop());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
    volume: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: percentage,
      volume: e.target.volume,
    });
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    playAudio(isPlaying, audioRef);
    return;
  };
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song isPlaying={isPlaying} currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        isPlaying={isPlaying}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default QuietCast;

export const query = graphql`
  query MyQuery {
    content: allSanityInterview {
      nodes {
        answer1
        answer10
        answer11
        answer12
        answer13
        answer14
        answer16
        answer15
        answer17
        answer18
        answer19
        answer2
        answer20
        answer3
        answer4
        answer5
        answer6
        answer7
        answer8
        answer9
        cat
        description
        question1
        question10
        question11
        question12
        question13
        question14
        question15
        question16
        question17
        question18
        question19
        question2
        question20
        question3
        question4
        question5
        question6
        question7
        question8
        question9
        style1
        style10
        style11
        style12
        style13
        style14
        style15
        style16
        style17
        style18
        style19
        style2
        style20
        style3
        style4
        style5
        style6
        style7
        style8
        style9
        url
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 200) {
              ...GatsbySanityImageFluid
            }
          }
        }
        name
      }
    }
  }
`;
