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
}