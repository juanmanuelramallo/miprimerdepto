const SPEED = 80;
const WAIT_TIME_BETWEEN_PHRASES = 1500;

function deleteText(el, callback) {
  const text = el.innerText;

  if (text.length === 0) {
    callback();
    return;
  }

  setTimeout(() => {
    el.innerText = text.substring(0, text.length - 1);
    deleteText(el, callback);
  }, SPEED);
}

function addText(el, text, callback) {
  const currentText = el.innerText;

  if (currentText.length === text.length) {
    setTimeout(callback, WAIT_TIME_BETWEEN_PHRASES);
    return;
  }

  setTimeout(() => {
    el.innerText = text.substring(0, currentText.length + 1);
    addText(el, text, callback);
  }, SPEED);
}

function cyclePhrases(el, phrases, index = 0) {
  const currentPhrase = phrases[index];
  addText(el, currentPhrase, () => {
    deleteText(el, () => {
      const nextIndex = (index + 1) % phrases.length;
      cyclePhrases(el, phrases, nextIndex);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-js-typer]').forEach(el => {
    const phrases = el.dataset.jsTyperPhrasesValue.split(',');
    if (phrases.length > 0) {
      cyclePhrases(el, phrases);
    }
  });
});
