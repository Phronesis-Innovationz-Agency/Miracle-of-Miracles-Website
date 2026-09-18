// Event categories — key is stored in the database, label/color are shown on the site.
const EVENT_CATEGORIES = [
  { key: 'gospel_mission', label: 'Gospel Mission', color: '#6b1f2a' },
  { key: 'hospital_visit', label: 'Hospital Visit', color: '#2a6b5e' },
  { key: 'outreach', label: 'Outreach', color: '#c9963c' },
  { key: 'special_event', label: 'Special Event', color: '#3a4f8a' },
  { key: 'other', label: 'Other', color: '#6b6459' },
];

function categoryLabel(key) {
  const match = EVENT_CATEGORIES.find((c) => c.key === key);
  return match ? match.label : key;
}

function categoryColor(key) {
  const match = EVENT_CATEGORIES.find((c) => c.key === key);
  return match ? match.color : '#6b6459';
}

module.exports = { EVENT_CATEGORIES, categoryLabel, categoryColor };
