// Suggested departments — edit freely to match what MMC actually runs.
// `key` is what gets stored in the database; `label` and `description` are shown on the site.
const DEPARTMENTS = [
  {
    key: 'foundation_school',
    label: 'Foundation School',
    description: 'Discipleship classes for new believers and members, held Sundays 2:00–3:00 PM, laying the biblical foundation for Christian life.',
  },
  {
    key: 'youth_ministry',
    label: 'Youth Ministry',
    description: 'For teens and young adults — fellowship, discipleship, and outreach, led by Pastor Daniel Christian Kizito Jr.',
  },
  {
    key: 'praise_and_worship',
    label: 'Praise & Worship / Choir',
    description: 'Leads the congregation in worship through singing and instruments during services and events.',
  },
  {
    key: 'ushering',
    label: 'Ushering',
    description: 'Welcomes members and visitors, and helps services run smoothly from arrival to departure.',
  },
  {
    key: 'sunday_school',
    label: "Sunday School / Children's Ministry",
    description: 'Bible teaching and care for children during services.',
  },
  {
    key: 'media_and_sound',
    label: 'Media & Sound',
    description: 'Handles sound, recording, and media for services and events.',
  },
  {
    key: 'prayer_ministry',
    label: 'Prayer Ministry',
    description: 'Intercession and prayer support for the church and its members.',
  },
  {
    key: 'evangelism_outreach',
    label: 'Evangelism & Outreach',
    description: 'Shares the gospel and organizes outreach activities beyond the church walls.',
  },
  {
    key: 'women_fellowship',
    label: "Women's Fellowship",
    description: 'Fellowship, teaching, and support for the women of MMC.',
  },
  {
    key: 'men_fellowship',
    label: "Men's Fellowship",
    description: 'Fellowship, teaching, and support for the men of MMC.',
  },
];

// Departments a member can register into directly (Foundation School has its own dedicated form/flow).
const REGISTERABLE_DEPARTMENTS = DEPARTMENTS.filter((d) => d.key !== 'foundation_school');

module.exports = { DEPARTMENTS, REGISTERABLE_DEPARTMENTS };
