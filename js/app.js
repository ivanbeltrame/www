const bypassHostnameCheck = false;
if ("serviceWorker" in navigator && (window.location.hostname == "www.ivanbeltrame.com" || bypassHostnameCheck)) {
    navigator.serviceWorker.register("/sw.js")
        .then((reg) => console.log("Service worker registered", reg))
        .catch((err) => console.log("Service worker not registered", err));
} else {
    console.log("Service worker not supported");
}