
// ! https://dev.to/vaibhavkhulbe/get-os-details-from-the-webpage-in-javascript-b07

function getOS() {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;

  const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
  const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
  const iosPlatforms = ["iPhone", "iPad", "iPod"];
  
  let operationSystem = null;

  if (macosPlatforms.includes(platform)) {
    operationSystem = "Mac OS";
  } else if (iosPlatforms.includes(platform)) {
    operationSystem = "iOS";
  } else if (windowsPlatforms.includes(platform)) {
    operationSystem = "Windows";
  } else if (/Android/.test(userAgent)) {
    operationSystem = "Android";
  } else if (!operationSystem && /Linux/.test(platform)) {
    operationSystem = "Linux";
  }

  return {
    operationSystem,
    userAgent,
    platform
  };
}
