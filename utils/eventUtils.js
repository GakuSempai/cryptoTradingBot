const typeMap = {
  club: 'Soirée club',
  concert: 'Concert',
  afterwork: 'Afterwork',
  diner: 'Dîner - spectacle',
  afterbeach: 'After beach',
  festival: 'Festival',
  garden: 'Garden - Journée détente',
  spectacle: 'Spectacle',
  excursion: 'Excursion',
  animation: 'Animation en plein air',
  match: 'Match ou exhibition sportive',
  aboutSport: 'Evenement sportif',
  seminaire: 'Séminaire - Convention Interne',
  forum: 'Forum',
  conference: 'Conférence',
  congres: 'Congrès',
  zen: 'Journée bien-être et remise en forme',
  atelier: 'Workshop',
  salon: 'Salon professionnel',
  autres: 'Salon grand public'
};

function normalizeEventType(value) {
  if (Array.isArray(value)) {
    value = value[0];
  }
  return typeMap[value] || value;
}

function parseTicketsField(ticketsField) {
  if (!ticketsField) return [];
  if (Array.isArray(ticketsField)) return ticketsField;
  if (typeof ticketsField === 'string') {
    try {
      return JSON.parse(ticketsField);
    } catch (err) {
      return [];
    }
  }
  return [];
}

function toBoolean(val) {
  return val === 'on' || val === true || val === 'true';
}

module.exports = {
  typeMap,
  normalizeEventType,
  parseTicketsField,
  toBoolean
};
