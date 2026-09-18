Drop your real church images into these folders and the site will pick them up automatically — no
code changes needed.

- logo.jpg (or logo.png)
  Used in the header/nav and browser tab icon. At least 200x200px, square, transparent or solid
  background. If missing, the site just shows "MMC" text instead — nothing breaks.

- leadership/<filename>
  One photo per pastor/leader. The exact filenames expected are set in src/church.js (the `photo`
  field on each leadership entry) — e.g. leadership/macklean-ashaba.jpg. If a file is missing, that
  leader gets a gold-ringed initials avatar instead of a broken image.

- gallery/<any filename>
  Any number of photos for the home page hero background slideshow (gospel missions, services, church
  life, outreach, etc.) — .jpg/.jpeg/.png/.webp/.gif. Just drop files in; the home page picks up
  whatever's in this folder automatically and crossfades through them behind the "Miracle of Miracles"
  heading. Until you add photos, the plain maroon gradient background shows instead. Wide landscape
  photos work best (the hero is short and wide).

- events/<filename>
  Photos for individual events. When an admin creates or edits an event at /admin/events, they type
  the filename they intend to use (e.g. events/gospel-mission-2026.jpg) — drop the matching file in
  here afterwards. If it's missing, the event shows a plain category-colored placeholder tile instead
  of a broken image.

- Dedicated photos pinned to a specific spot (not shuffled into the gallery rotation):
  - foundation-school-logo.jpeg — Foundation School's badge, shown on its program cards.
  - foundation-school-poster.jpeg — the current term's advert poster, shown on the Foundation School
    registration page.
  - friday-service.jpg — Friday Service's photo on the home page Service Times cards. Until this file
    exists, that card just shows an empty placeholder instead of a broken image.
  These are referenced directly in src/church.js (the `logo`/`photo` fields) — add more the same way
  for any other card that should always show one specific photo instead of a random gallery pick.
