document.addEventListener("DOMContentLoaded", onLoad);

const songs = [
    "music/hey.mp3",
    "music/summer.mp3",
    "music/ukulele.mp3"
]

function onLoad()
{
    let songIndex = 0;

    const track = document.getElementById("track");
    const audio = document.getElementById("audio");
    const progressBg = document.getElementById("progress-bg");
    const progressValue = document.getElementById("progress-value");
    const progressText = document.getElementById("progress-text");
    const prevButton = document.getElementById("prev");
    const playButton = document.getElementById("play");
    const nextButton = document.getElementById("next");

    playButton.addEventListener("click", onClick);
    prevButton.addEventListener("click", () => ChangeSong(-1));
    nextButton.addEventListener("click", () => ChangeSong(1));

    audio.addEventListener("timeupdate", OnTimeUpdate);
    audio.addEventListener("ended", () => ChangeSong(1));
    progressBg.addEventListener("click", SetProgress);

    function onClick()
    {
        const isPlaying = !audio.paused;

        playButton.querySelector("i").className = isPlaying ? "fas fa-play" : "fas fa-pause";

        if (isPlaying) audio.pause();
        else audio.play();
    }

    LoadSong(songIndex);

    function LoadSong(index)
    {
        const song = songs[index];

        track.textContent = song;
        audio.src = song;
    }

    function ChangeSong(incrementalValue)
    {
        songIndex += incrementalValue;

        if (songIndex < 0) songIndex = songs.length - 1;
        else if (songIndex == songs.length) songIndex = 0;

        LoadSong(songIndex);

        audio.play();

        UpdateIcon();
    }

    function UpdateIcon()
    {
        const isPlaying = !audio.paused;

        playButton.querySelector("i").className = isPlaying ? "fas fa-pause" : "fas fa-play";
    }

    function OnTimeUpdate(e)
    {
        const { currentTime, duration } = e.srcElement;
        UpdateProgress(currentTime, duration);
    }

    function SetProgress(e)
    {
        const w = progressBg.getBoundingClientRect().width;
        const value = (e.offsetX / w) * audio.duration;
        audio.currentTime = value;
    }

    function UpdateProgress(currentTime, duration)
    {
        duration = Number.isNaN(duration) ? 0 : duration;

        let percentage01 = currentTime / duration;
        percentage01 = Number.isNaN(percentage01) ? 0 : percentage01;

        progressValue.style.width = percentage01 * 100 + "%";
        progressText.textContent = `${FormatTime(currentTime)} / ${FormatTime(duration)}`;
    }

    function FormatTime(timeInSeconds)
    {
        timeInSeconds = timeInSeconds.toFixed(0);
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = timeInSeconds % 60;
        if (seconds < 10) seconds = "0" + seconds;
        return `${minutes}:${seconds}`;
    }
}