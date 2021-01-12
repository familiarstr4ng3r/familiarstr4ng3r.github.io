
document.addEventListener("DOMContentLoaded", onLoad);

// todo: minor refactoring for exception handling using destructuring

// function get(text)
// {
//     return [false, text];
// }

// const [success, value] = get("hello");
// console.log(typeof success, success);
// console.log(typeof value, value);

function onLoad()
{
    const keyInput = document.getElementById("key");
    const passwordCheckbox = document.getElementById("password");
    const input = document.getElementById("input");
    const output = document.getElementById("output");

    const encryptButton = document.getElementById("btn-encrypt");
    const decryptButton = document.getElementById("btn-decrypt");

    updateVisual();

    function getKey()
    {
        return keyInput.value;
    }

    encryptButton.addEventListener("click", function()
    {
        output.value = encrypt(input.value, getKey());

        updateVisual();
    });

    decryptButton.addEventListener("click", function()
    {
        // ! 2 ways to remove

        //const encrypted = output.value.replace(/\n/g, "");

        const lines = output.value.split("\n");
        const encrypted = lines.join("");

        input.value = decrypt(encrypted, getKey());

        updateVisual();
    });

    passwordCheckbox.addEventListener("change", function()
    {
        const hide = passwordCheckbox.checked;
        keyInput.type = hide ? "password" : "text";
    });

    keyInput.addEventListener("input", event => updateVisual());

    input.addEventListener("input", event => updateVisual());

    output.addEventListener("input", event => updateVisual());

    function updateVisual()
    {
        validateButton(input.value, encryptButton);
        validateButton(output.value, decryptButton);
    }

    function validateButton(text, button)
    {
        button.disabled = text.trim().length == 0 || getKey().length == 0;
    }
}

