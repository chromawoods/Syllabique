(function(root) {

  const DEFAULT_SETTINGS = {
    syllables: ['ba', 'ra', 'cu', 'da', 'in', 'the', 'sea'],
    minWordSyllables: 2,
    maxWordSyllables: 4,
    maxSyllableRepetitions: 2,
    capitalize: true
  };

  const DEFAULT_PHRASE_SETTINGS = Object.assign({}, DEFAULT_SETTINGS, {
    capitalize: false,
    capitalizePhrase: true
  });

  let _settings = {};


  function getRandomNumber(max, min = 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  function capitalize(str = '') {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  function getSyllable(syllables, numRecursions = 0) {
    const maxRecursions = 20;
    const newSyllable = _settings.syllables[getRandomNumber(_settings.syllables.length - 1)];
    const lastSyllable = syllables[syllables.length - 1];

    if (syllables.length && numRecursions < maxRecursions && newSyllable && newSyllable === lastSyllable) {
      const regExp = new RegExp('(' + lastSyllable + '){' + _settings.maxSyllableRepetitions + '}$');
      if (syllables.join('').match(regExp)) {
        return getSyllable(syllables, numRecursions + 1);
      }
    }
    
    return newSyllable;
  }


  function compileSettings(options, isPhrase = false) {
    const defaults = isPhrase ? DEFAULT_PHRASE_SETTINGS : DEFAULT_SETTINGS;
    
    _settings = Object.assign(defaults, options);
    
    return _settings;
  }


  function getSyllabicWord(options = {}) {
    const settings = compileSettings(options);
    const syllables = [];
    const numSyllables = getRandomNumber(settings.maxWordSyllables, settings.minWordSyllables);
    
    let word = '';
    
    for (let i = 0; i < numSyllables; i++) {
      syllables.push(getSyllable(syllables));
    }
    
    word = syllables.join('');
    
    return settings.capitalize ? capitalize(word) : word;
  }


  function getSyllabicPhrase(numWords = 1, options) {
    const settings = compileSettings(options, true);
    const phrase = Array.from({ length: numWords }, () => getSyllabicWord(settings)).join(' ');
    
    return settings.capitalizePhrase ? capitalize(phrase) : phrase;
  }

  
  root.Syllabique = {
    getSyllabicWord: getSyllabicWord,
    getSyllabicPhrase: getSyllabicPhrase,
    capitalize: capitalize
  };

}(this));
