import * as React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import { Navbar } from 'react-bootstrap';

const path = "http://localhost:5000/uploads/"

export default function MusicPlayer({playMusic}) {
    console.log(playMusic);
    return (
        <div>
            <Navbar className="fixed-bottom navplay d-flex">
                <div className="d-flex w-50 justify-content-center">
                    <img src={path + playMusic.thumbnail} alt="artis" className="image-music rounded-circle object-fit" width={50} height={50}/>
                    <p className="text-white ms-3 mb-0">{playMusic.title} <br/> <span className='fs-8'>{playMusic.artis.name}</span> </p>
                </div>
                <AudioPlayer
                    src={path + playMusic.attache}
                    showFilledVolume={true}
                />
            </Navbar>
        </div>
    )
}
