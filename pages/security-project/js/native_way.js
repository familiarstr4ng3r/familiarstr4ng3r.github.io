(function() {

  class Helper {
    static makeChunks(value, size) {
      const count = Math.ceil(value.length / size);
      const chunks = new Array(count);
    
      for (let i = 0, j = 0; i < count; i++, j += size) {
        chunks[i] = value.substr(j, size);
      }
      return chunks;
    }

    static getChunkedString(value, size) {
      const chunks = Helper.makeChunks(value, size);
      const text = chunks.join("\n");
      return text;
    }

    static getSingleString(value) {
      const text = value.replaceAll("\n", "");
      return text;
    }
  }

  class SecurityManager {
    constructor(key, options) {
      this.key = key;
      this.options = options;
    }

    encrypt(value, amount) {
      if (amount && typeof(amount) === "number") {
        for (let i = 0; i < amount; i++) {
          value = SecurityManager.encrypt(value, this.key);
        }

        // if options is provided then split string into chunks with new-line separator 
        if (this.options?.["chunkSize"]) {
          return Helper.getChunkedString(value, this.options["chunkSize"]);
        }

        return value;
      }

      return SecurityManager.encrypt(value, this.key);
    }

    decrypt(value, amount) {

      // if encrypted value was previously splitted into chunks then normalize it 
      value = Helper.getSingleString(value);

      if (amount && typeof(amount) === "number") {
        for (let i = 0; i < amount; i++) {
          value = SecurityManager.decrypt(value, this.key);
        }
        return value;
      }

      return SecurityManager.decrypt(value, this.key);
    }

    static encrypt(value, key) {
      const bytes = new TextEncoder().encode(value);
      const encoded = SecurityManager.encode(bytes, key);
      const encrypted = btoa(new TextDecoder().decode(encoded));
      return encrypted;
    }

    static decrypt(value, key) {
      const bytes = new TextEncoder().encode(atob(value));
      const encoded = SecurityManager.encode(bytes, key);
      const decrypted = new TextDecoder().decode(encoded);
      return decrypted;
    }

    static encode(bytes, key) {
      const keyBytes = new TextEncoder().encode(key);

      for(let i = 0, j = 0; i < bytes.length; i++) {
        bytes[i] ^= keyBytes[j];
        if (++j == keyBytes.length) j = 0;
      }
      return bytes;
    }
  }

  const key = "123";
  const value = "hello world! its kinda long text that I want to be secured";
  const amount = 10;

  const options = {
    chunkSize: 50
  }

  const sm = new SecurityManager(key);

  const printSeconds = () => {
    const dt = new Date().getTime();
    const s = Math.floor(dt / 1000);
    console.log(s);
  };

  printSeconds();
  const encrypted = sm.encrypt(value, amount);
  printSeconds();
  const decrypted = sm.decrypt(encrypted, amount);
  printSeconds();

  console.log(encrypted);
  console.log(decrypted);

})();
