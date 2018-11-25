const morseCodeInput = document.getElementById('morse-code');
const decodedInput = document.getElementById('decoded');
const morseButton = document.getElementById('morse-button');
const beepSound = document.getElementById('beep-sound');
const soundEnabled = document.getElementById('sound-enabled');
const morseCodeTable = {
	'.----': '1',
	'..---': '2',
	'...--': '3',
	'....-': '4',
	'.....': '5',
	'-....': '6',
	'--...': '7',
	'---..': '8',
	'----.': '9',
	'-----': '0',
	'.-': 'A',
	'-...': 'B',
	'-.-.': 'C',
	'-..': 'D',
	'.': 'E',
	'..-.': 'F',
	'--.': 'G',
	'....': 'H',
	'..': 'I',
	'.---': 'J',
	'-.-': 'K',
	'.-..': 'L',
	'--': 'M',
	'.-': 'N',
	'---': 'O',
	'.--.': 'P',
	'--.-': 'Q',
	'.-.': 'R',
	'...': 'S',
	'-': 'T',
	'..-': 'U',
	'...-': 'V',
	'.--': 'W',
	'-..-': 'X',
	'-.--': 'Y',
	'--..': 'Z',
};
let lastPress;
let enterSpaceTimeout;

morseButton.addEventListener('mousedown', down);
morseButton.addEventListener('mouseup', up);
document.addEventListener('keydown', e => {
	if (e.keyCode === 32 && document.activeElement != morseCodeInput) {
		down();
	}
});
document.addEventListener('keyup', e => {
	if (e.keyCode === 32 && document.activeElement != morseCodeInput) {
		up();
	}
});
morseCodeInput.addEventListener('input', () => {
	doTranslation();
});

function down() {
	if (soundEnabled.checked) {
		beepSound.play();
	}

	if (!lastPress) {
		lastPress = Date.now();
		clearTimeout(enterSpaceTimeout);
	}
}

function up() {
	if (soundEnabled.checked) {
		beepSound.pause();
		beepSound.currentTime = 0;
	}

	const length = Date.now() - lastPress;
	if (length > 150) {
		morseCodeInput.value += '-';
	} else {
		morseCodeInput.value += '.';
	}
	lastPress = undefined;
	doTranslation();
	enterSpaceTimeout = setTimeout(() => {
		morseCodeInput.value += ' ';
	}, 500);
}

function doTranslation() {
	const morseCode = morseCodeInput.value;
	decodedInput.value = translate(morseCode);
}

function translate(morseCode) {
	let decoded = '';
	const letters = morseCode.split(' ');
	for (const letter of letters) {
		if (morseCodeTable[letter]) {
			decoded += morseCodeTable[letter];
		} else {
			break;
		}
	}

	return decoded;
}
