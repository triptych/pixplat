const sounds = {
    jump: new Audio('sounds/phaseJump1.ogg'),
    die: new Audio('sounds/lowThreeTone.ogg'),
    coin: new Audio('sounds/highUp.ogg')
};

export function playSound(soundName) {
    const sound = sounds[soundName];
    if (sound) {
        sound.currentTime = 0;  // Reset the sound to the beginning
        sound.play().catch(error => console.error('Error playing sound:', error));
    }
}