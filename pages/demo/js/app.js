document.addEventListener("DOMContentLoaded", onLoad)

function onLoad()
{
    // ! hey man why have you opened the devtools tab?

    const active = "active";

    let clickedTimes = 0;
    const quoteThreshold = 5;
    let quoteIndex = 0;
    const quotes = ["Why are you still clicking?", "Isn't it boring?", "Isn't it waste of time?"];

    const title = document.querySelector(".title");

    title.classList.remove(active);

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(b => 
    {
        b.addEventListener("click", onClick);
    });

    function onClick(event)
    {
        if (!title.classList.contains(active))
        {
            title.classList.add(active);
            setTimeout(() => title.classList.remove(active), 2 * 1000);
            
            if (++clickedTimes > quoteThreshold)
            {
                const index = quoteIndex++ % quotes.length;
                title.textContent = quotes[index];
            }
        }
    }

    const audio = document.querySelector("#audio");

    const playButton = document.querySelector("#play-music");
    const volumeButton = document.querySelector("#volume-music");

    playButton.addEventListener("click", () =>
    {
        playButton.className = audio.paused ? "music-btn fa fa-pause" : "music-btn fa fa-play";

        if (audio.paused) audio.play();
        else audio.pause();
    });

    volumeButton.addEventListener("click", () =>
    {
        audio.muted = !audio.muted;
        volumeButton.className = audio.muted ? "music-btn fa fa-volume-off" : "music-btn fa fa-volume-up";
    });

    //addMusic(audio);
}

function addMusic(audio)
{
    const context = new AudioContext();
    const analyzer = context.createAnalyser();

    const source = context.createMediaElementSource(audio);
    source.connect(analyzer);
    analyzer.connect(context.destination);

    const parent = document.querySelector("#visualizer");
    const barsCount = 64;

    for (let i = 0; i < barsCount; i++)
    {
        const e = document.createElement("div");
        e.className = "logo";
        parent.appendChild(e);
    }

    const elements = document.querySelectorAll(".logo");

    //setInterval(() => loop(), 100);

    loop();
    
    function loop()
    {
        window.requestAnimationFrame(loop);

        const arr = new Uint8Array(analyzer.frequencyBinCount);
        analyzer.getByteFrequencyData(arr);

        // if (!audio.paused)
        // {
        //     console.log(arr);
        // }

        for (let i = 0; i < barsCount; i++)
        {
            const h = arr[i + barsCount] * 0.5;
            elements[i].style.height  = h + "px"; 
        }
    }
}