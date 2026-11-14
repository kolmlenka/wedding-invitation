
const openButton = document.getElementById('openInvitation');
const envelope = document.getElementById('envelope');
const introScreen = document.getElementById('introScreen');
const invitation = document.getElementById('invitation');

const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const musicStatus = document.getElementById('musicStatus');
const volumeControl = document.getElementById('volumeControl');


// MUSIC SETTINGS

backgroundMusic.volume = 0.5;
volumeControl.value = 0.5;


// UPDATE MUSIC PLAYER

function updateMusicPlayer() {
    if (backgroundMusic.paused) {
        musicIcon.textContent = '▶';
        musicStatus.textContent = 'Paused';
        musicToggle.setAttribute('aria-label', 'Play music');
    } else {
        musicIcon.textContent = 'Ⅱ';
        musicStatus.textContent = 'Now playing';
        musicToggle.setAttribute('aria-label', 'Pause music');
    }
}


// OPEN INVITATION

openButton.addEventListener('click', async () => {

    openButton.disabled = true;

    // Animate envelope
    envelope.classList.add('open');

    // Start music
    try {
        await backgroundMusic.play();
    } catch (error) {
        console.log('Music playback was not started:', error);
    }

    updateMusicPlayer();

    // Show invitation
    setTimeout(() => {
        introScreen.classList.add('hidden');
        invitation.classList.add('visible');
    }, 1400);

});


// PLAY / PAUSE

musicToggle.addEventListener('click', async () => {

    if (backgroundMusic.paused) {
        try {
            await backgroundMusic.play();
        } catch (error) {
            console.log('Music playback failed:', error);
        }
    } else {
        backgroundMusic.pause();
    }

    updateMusicPlayer();

});


// VOLUME CONTROL

volumeControl.addEventListener('input', () => {
    backgroundMusic.volume = Number(volumeControl.value);
});


// KEEP PLAYER SYNCHRONIZED

backgroundMusic.addEventListener('play', updateMusicPlayer);
backgroundMusic.addEventListener('pause', updateMusicPlayer);
backgroundMusic.addEventListener('ended', updateMusicPlayer);
