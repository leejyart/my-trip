let deferredInstallPrompt = null;
let installButton = null;

window.addEventListener("load", () => {
  installButton = document.getElementById("install-button");
  installButton.addEventListener("click", installPWA);
});

window.addEventListener("beforeinstallprompt", saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent(evt) {
  deferredInstallPrompt = evt;
  installButton.removeAttribute("hidden");
}

function installPWA() {
  deferredInstallPrompt.prompt();
  installButton.remove();
  deferredInstallPrompt.userChoice.then((choice) => {
    if (choice.outcome === "accepted") {
      console.log("user accepted the propt", choice);
    } else {
      console.lopg("user dismissed the prompt", choice);
    }
    deferredInstallPrompt = null;
  });
}
