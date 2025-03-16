// Initialise The Variables
let songIndex = 1;
let audioElement = new Audio('../1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressbar = document.getElementById('progressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let Songs = [
    {songName: "Feel it - d4vd", filepath: "../1.mp3", coverPath: "../Feelit.jpeg", duration: "0:00"},
    {songName: "Cielo - HumaHuma", filepath: "../2.mp3", coverPath: "../2.png", duration: "0:00"},
    {songName: "Akuma No Ko - Attack On Titan", filepath: "../3.mp3", coverPath: "../Akumanoko.jpeg", duration: "0:00"},
    {songName: "Why'd You Only Call Me when u're high - Arctic Monkeys", filepath: "../4.mp3", coverPath: "../4.jpg", duration: "0:00"},
    {songName: "Roundabout - YES", filepath: "../5.mp3", coverPath: "../5.jpeg", duration: "0:00"},
    {songName: "I Was Made For Loving You - Yungblud", filepath: "../6.mp3", coverPath: "../6.jpg", duration: "0:00"},
    {songName: "Sucker - Arcane", filepath: "../7.mp3", coverPath: "../7.jpg", duration: "0:00"},
    {songName: "Wanna Be Yours - Arctic Monkeys", filepath: "../8.mp3", coverPath: "../8.jpg", duration: "0:00"},
    {songName: "Dandelions - Ruth B", filepath: "../9.mp3", coverPath: "../9.jpg", duration: "0:00"},
    {songName: "Star Walking - Lil Nas X", filepath: "../10.mp3", coverPath: "../10.jpeg", duration: "0:00"},
];

// Function to format duration
const formatTime = (seconds) => {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
};

// Function to load durations
const loadDurations = () => {
    Songs.forEach((song, i) => {
        let tempAudio = new Audio(song.filepath);
        tempAudio.addEventListener("loadedmetadata", () => {
            Songs[i].duration = formatTime(tempAudio.duration);
            document.getElementsByClassName("songDuration")[i].innerText = Songs[i].duration;
        });
    });
};

// Populate song list
songItem.forEach((element, i)=> {
    element.getElementsByTagName("img")[0].src = Songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = Songs[i].songName;
    element.getElementsByClassName("songDuration")[0].innerText = Songs[i].duration; // Add duration
});

// Load the durations once the page loads
loadDurations();

// audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;

        // Update song card buttons
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;

        // Update song card buttons
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-pause');
    document.getElementById(songIndex).classList.add('fa-circle-play');
    }
})

// Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    // update seekbar
        progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
        progressbar.value = progress;
})
 
progressbar.addEventListener('change',()=>{
    audioElement.currentTime = progressbar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // Getting song index from the clicked button
        let clickedIndex = parseInt(e.target.id); 
        
        if (songIndex === clickedIndex) { 
            // If same song clicked, play/pause
            if (audioElement.paused) {
                audioElement.play();
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                masterPlay.classList.remove('fa-play');
                masterPlay.classList.add('fa-pause');
                gif.style.opacity = 1;
            } else {
                audioElement.pause();
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                masterPlay.classList.remove('fa-pause');
                masterPlay.classList.add('fa-play');
                gif.style.opacity = 0;
            }
        } else {
            // If a different song is clicked, switch to that song
            makeAllPlays(); // Reset all buttons
            songIndex = clickedIndex;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `../${songIndex}.mp3`;
            masterSongName.innerText = Songs[songIndex-1].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
            gif.style.opacity = 1;
        }
    })
});

document.getElementById('prev').addEventListener('click', ()=>{
    if (songIndex<=1){
        songIndex = 10
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `../${songIndex}.mp3`;
    masterSongName.innerText = Songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;

    // Update song card buttons
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
})

document.getElementById('next').addEventListener('click', ()=>{
    if (songIndex>=10){
        songIndex = 1
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `../${songIndex}.mp3`;
    masterSongName.innerText = Songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;

    // Update song card buttons
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
})

// Automatically play next song when current one ends
audioElement.addEventListener('ended', () => {
    document.getElementById('next').click();
});
