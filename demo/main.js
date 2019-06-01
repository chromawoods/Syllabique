(function() {
  
  const _body = document.body;
  const _titleElement = document.getElementById('syllabic-title');
  const _customLanguageTrigger = document.getElementById('custom-language-trigger');
  const _triggers = document.getElementsByClassName('btn-phrase-creator');
  const _customSyllables = document.getElementById('custom-syllables');
  
  const _languages = {
    elvenish: ['el', 'dir', 'ar', 'wen', 'fín', 'fa', 'oth', 'gal', 'or', 'iè', 'ën', 'las', 'le', 'go', 'roh', 'mel', 'on', 'hir', 'im', 'ba', 'lór', 'lon', 'han', 'an'],
    mordorish: ['mor', 'dor', 'dûn', 'dur', 'az', 'oth', 'go', 'ka', 'naz', 'gur', 'og', 'sar', 'sau', 'ang', 'mar', 'ui', 'nu'],
    custom: []
  };
  

  function printNewPhrase(trigger) {
    const defaultLanguage = 'elvenish';
    const language = trigger.dataset && trigger.dataset.language ? trigger.dataset.language : defaultLanguage;
    const syllables = _languages[language];

    if (_body.dataset.currentLanguage) {
      _body.classList.remove(_body.dataset.currentLanguage);
    }
    
    _titleElement.innerText = Syllabique.getSyllabicPhrase(5, {
      syllables: syllables,
      minWordSyllables: 1
    });
    
    _body.classList.add(language);
    _body.dataset.currentLanguage = language;
  }


  Array.from(_triggers).forEach(trigger => {
    trigger.addEventListener('click', () => { printNewPhrase(trigger); });
  });
  

  _customLanguageTrigger.addEventListener('click', () => {
    const value = _customSyllables.value.trim();
    
    if (value) {
      _languages.custom = value.split(' ');
      printNewPhrase(_customLanguageTrigger);
    } else {
      _titleElement.innerText = 'Enter some syllables in the text field'
    }
  });


  _customSyllables.addEventListener('keyup', event => {
    (event.which || event.keyCode || 0) === 13 && _customLanguageTrigger.dispatchEvent(new MouseEvent('click'));
  });

}());