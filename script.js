console.log("Welcome Anjali");

// initialising the variables

let songIndex=0;
let audioElement=new Audio(`songs/${songIndex+1}.mp3`);
let masterPlay=document.getElementById('masterPlay');
let progressBar=document.getElementById('progressBar');
let gif=document.getElementById('gif');
let masterPlaySong=document.getElementById('masterPlaySong');
let playList = document.querySelectorAll('.playList');
let isPlaying=false;

console.log(audioElement);

let songs=[
    {songName:'Jingle', filePath:'songs/1.mp3', coverPath:'covers/1.jpg'},
    {songName:'Hearts', filePath:'songs/2.mp3', coverPath:'covers/2.jpg'},
    {songName:'Love', filePath:'songs/3.mp3', coverPath:'covers/3.jpg'},
    {songName:'Pursuit', filePath:'songs/4.mp3', coverPath:'covers/4.jpg'},
    {songName:'determination', filePath:'songs/5.mp3', coverPath:'covers/5.jpg'}
]

playList.forEach((element,i)=>{
   
    
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('playListText')[0].innerText=songs[i].songName;


})


// audioElement.play();

//Handle play/pause
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

// Listening to events

audioElement.addEventListener('timeupdate',()=>{

    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value=progress;
})

progressBar.addEventListener('change',()=>{
    audioElement.currentTime=progressBar.value*audioElement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        

        if(isPlaying){
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            gif.style.opacity=0;
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');

        }else{
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src=`songs/${songIndex}.mp3`;
            masterPlaySong.innerText=songs[songIndex-1].songName;
            audioElement.currentTime=0;
            audioElement.play();
            gif.style.opacity=1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }

        isPlaying=!isPlaying;
        

    })
})


document.getElementById('next').addEventListener('click',()=> {
    if(songIndex>=5){
        songIndex=1;
    }else{
        songIndex+=1;
    }
    audioElement.src=`songs/${songIndex}.mp3`;
    masterPlaySong.innerText=songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})


document.getElementById('previous').addEventListener('click',()=> {
    if(songIndex<=1){
        songIndex=5;
    }else{
        songIndex-=1;
    }
    audioElement.src=`songs/${songIndex}.mp3`;
    masterPlaySong.innerText=songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})