const songs = [
{
    title: "Song One",
    artist: "Artist One",
    src: "songs/song1.mp3",
    cover: "https://picsum.photos/300?1"
},
{
    title: "Song Two",
    artist: "Artist Two",
    src: "songs/song2.mp3",
    cover: "https://picsum.photos/300?2"
},
{
    title: "Song Three",
    artist: "Artist Three",
    src: "songs/song3.mp3",
    cover: "https://picsum.photos/300?3"
}
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

let songIndex = 0;
let isPlaying = false;

loadSong(songIndex);

function loadSong(index) {
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    audio.src = songs[index].src;
    cover.src = songs[index].cover;
}

function playSong() {
    audio.play();
    playBtn.textContent = "⏸";
    isPlaying = true;
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶";
    isPlaying = false;
}

playBtn.addEventListener("click", () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

nextBtn.addEventListener("click", () => {
    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();
});

prevBtn.addEventListener("click", () => {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);
    playSong();
});

audio.addEventListener("timeupdate", () => {

    const current = audio.currentTime;
    const total = audio.duration;

    progress.value = (current / total) * 100 || 0;

    currentTime.textContent = formatTime(current);
    duration.textContent = formatTime(total);
});

progress.addEventListener("input", () => {
    audio.currentTime =
        (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

function formatTime(time) {

    if (isNaN(time)) return "0:00";

    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

audio.addEventListener("ended", () => {
    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();
});

songs.forEach((song, index) => {

    const li = document.createElement("li");

    li.textContent =
        `${song.title} - ${song.artist}`;

    li.addEventListener("click", () => {
        songIndex = index;
        loadSong(songIndex);
        playSong();
    });

    playlist.appendChild(li);
});
