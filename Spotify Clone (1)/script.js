console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');       //play button
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Wariyo - Mortals", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "DEAF KEV - Invincible", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Dhakad", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
]

// songItems.foreach((element,i)=>{
//     console.log(element, i);
//     element.getElementsByTagName("img")[0].src = songs[i].filePath;
// })

songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;        //in HTML file the cover image and song names are same for all--so to give each one different covers and name
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
// audioElement.play(); 

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){ //if we click when song is either paused or not started
        audioElement.play();                                //starts playing song
        masterPlay.classList.remove('fa-circle-play');      //remove play button
        masterPlay.classList.add('fa-circle-pause');        //display pause button
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');     //remove pause button
        masterPlay.classList.add('fa-circle-play');         //display play button
        gif.style.opacity = 0;
    }
})

// Listen to events
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);  // progress is a variable to denote what %age of song has been played
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration)/100);
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause'); //////////////////////////////////////////////////////////////////////
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        //first remove all pause buttons and make them play....then only the button which is clicked is made pause
        // makeAllPlays();
        // songIndex = parseInt(e.target.id);  //converting string to number....for playing different songs on different clicks
        // e.target.classList.remove('fa-circle-play');
        // e.target.classList.add('fa-circle-pause');

        // masterSongName.innerText = songs[songIndex-1].songName;
        // audioElement.src = `songs/${songIndex}.mp3`; // here `` is used not ''........don't know why??
        // audioElement.currentTime = 0;
        // audioElement.play();
        // gif.style.opacity = 1;
        // masterPlay.classList.remove('fa-circle-play');      //remove play button
        // masterPlay.classList.add('fa-circle-pause'); 

        //tried on my own to make both pause and play button work...but not happening properly
        if(audioElement.paused || audioElement.currentTime<=0){
        makeAllPlays();
        songIndex = parseInt(e.target.id);  //converting string to number....for playing different songs on different clicks
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');

        masterSongName.innerText = songs[songIndex-1].songName;
        audioElement.src = `songs/${songIndex}.mp3`; // here `` is used not ''........don't know why??
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');      //remove play button
        masterPlay.classList.add('fa-circle-pause'); 
        }
        else{
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');     //remove pause button
            masterPlay.classList.add('fa-circle-play');         //display play button
            gif.style.opacity = 0;
        }
    }) 
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex = 1;
    }
    else{
        songIndex += 1;
    }
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.src = `songs/${songIndex}.mp3`; // here `` is used not ''........don't know why??
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');      //remove play button
    masterPlay.classList.add('fa-circle-pause'); 
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 1){
        songIndex = 6;
    }
    else{
        songIndex -= 1;
    }
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.src = `songs/${songIndex}.mp3`; // here `` is used not ''........don't know why??
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');      //remove play button
    masterPlay.classList.add('fa-circle-pause'); 
})