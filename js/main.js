if (!("serviceworker" in navigator)) {
    console.log("Service worker is not supported.");

} else {
    navigator
        .serviceworker
        .register("/sw.js")
        .then(function (registration) {
            console.log("Service registered.");
        });
}