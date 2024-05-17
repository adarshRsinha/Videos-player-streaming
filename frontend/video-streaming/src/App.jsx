import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VideoPlayer from './VideoPlayer';
import { useRef } from 'react';
import background from './images/img1-design.jpg';

function App() {
  const playerRef = useRef(null);
  const videoLink =
  "https://videos-player-streaming.onrender.com/uploads/courses/91627120-2fb3-4ecb-bfee-9d0f93c252f6/index.m3u8";

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL",
      },
    ],
  };
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <>
      {/* <div>
        <h1>Video player</h1>
      </div> */}

      <div className="flex flex-col pb-20 bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
        <header className="flex gap-5 justify-between px-8 py-6 w-full text-white max-md:flex-wrap max-md:px-5 max-md:max-w-full">
          <div className="flex gap-3 text-3xl font-bold whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8158d20177eeaf79c24e75960c2132f560f353fb66ddeab755557e1494f67174?apiKey=3f2c1e08085a404c8c7a95f15a9feb2b&"
              alt="WePlay logo"
              className="shrink-0 aspect-square w-[57px]"
            />
            <div className="flex-auto my-auto">WePlay</div>
          </div>
         
        </header>
        <main className="flex z-10 gap-5 self-center mt-14 max-w-full text-white w-[771px] max-md:flex-wrap max-md:mt-10">
          <section className="flex flex-col grow shrink-0 px-5 basis-0 w-fit max-md:max-w-full">
            <h1 className="text-6xl font-bold text-center max-md:max-w-full max-md:text-4xl">
              Online Video Player & <br /> Platform Solution
            </h1>
            <p className="mt-16 text-3xl max-md:mt-10 max-md:max-w-full">
              Explore on the world's best Online Video Player
            </p>
            
          </section>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/146a598697023fe7cdad6f7b6fc918d32143a73e13ea565cec11c3192f066380?apiKey=3f2c1e08085a404c8c7a95f15a9feb2b&"
            alt=""
            className="shrink-0 self-start mt-2 w-6 aspect-[0.65] blur-[2px] fill-cyan-400"
          />
        </main>
        <div className="flex flex-col justify-center items-center self-center mt-56 w-full max-w-[1101px] max-md:mt-10 max-md:max-w-full">
          <VideoPlayer
            options={videoPlayerOptions}
            onReady={handlePlayerReady}
          />
        </div>
      </div>

    </>
  )
}

export default App
