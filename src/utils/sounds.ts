const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

const frequencies = [
  261.63, 293.66, 329.63, 349.23,
  392.00, 440.00, 493.88, 523.25,
  587.33, 659.25, 698.46, 783.99,
  880.00, 987.77, 1046.50, 1174.66
];

export const playSound = (index: number) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequencies[index];
  gainNode.gain.value = 0.1;

  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.5);
  oscillator.stop(audioContext.currentTime + 0.5);
};