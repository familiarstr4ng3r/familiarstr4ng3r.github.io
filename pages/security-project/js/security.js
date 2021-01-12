// ! https://developer.mozilla.org/ru/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
// ! https://github.com/beatgammit/base64-js

// ! usage example
// const text = "text123";
// const key = "key";
// demo(text, key);

function demo(text, key)
{
    const e = encrypt(text, key);
    console.log("encrypted:", e);

    const d = decrypt(e, key);
    console.log("decrypted:", d);
}

function encrypt(text, key)
{
    const bytes = new TextEncoder().encode(text);
    const encodedBytes = encode(bytes, key);

    const encrypted = base64js.fromByteArray(encodedBytes);
    return encrypted;
}

function decrypt(text, key)
{
    const bytes = base64js.toByteArray(text);
    const encodedBytes = encode(bytes, key);
    
    const decrypted = new TextDecoder().decode(encodedBytes);
    return decrypted;
}

function encode(bytes, key)
{
    const keyBytes = new TextEncoder().encode(key);

    let j = 0;
    for(let i = 0; i < bytes.length; i++)
    {
        bytes[i] ^= keyBytes[j];
        if (++j == keyBytes.length) j = 0;
    }

    return bytes;
}
