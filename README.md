# MMC Website

Website for **Miracle of Miracles Ministries International**. Built by Phronesis
Innovationz Agency using the same free-tier stack as the other Phronesis
products: Node/Express/EJS + Neon Postgres, deployed on Render.

## What's on the site

- **Home, About, Leadership, Departments, Building Fund, Contact** — informational pages
- **Foundation School registration** (`/register/foundation-school`) and **department registration**
  (`/register/department`) — both save to the database so you have a real list of who signed up
- **Give / Partner page** (`/give`) — shows the Mobile Money number and bank account for tithe, offering,
  building fund, and partnership giving, with an optional "confirm your giving" form that logs a record
  and offers a WhatsApp confirmation
- **Admin dashboard** (`/admin`, behind login) — see everyone who registered, and every giving record
  logged, with running totals (including a running Building Fund total)

## 1. Add your logo

Drop your logo file at `public/images/logo.png` before or after deploying — see
`public/images/README.txt`. The site works fine without it (it just hides the logo image), but it looks
much better with it.

## 2. Database (Neon — use a separate project from your other apps)

[neon.tech](https://neon.tech) → new project → copy the connection string into `DATABASE_URL`. Tables
create themselves automatically on first boot — nothing to run manually.

## 3. Your admin login

```bash
npm install
npm run hash-password -- "yourChosenPassword"
```

Copy the printed `ADMIN_PASSWORD_HASH` — this is what lets you view registrations and giving records at
`/admin`.

## 4. Run locally (optional)

```bash
cp .env.example .env
# fill in DATABASE_URL, SESSION_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD_HASH
npm start
```

Visit `http://localhost:3000`.

## 5. Push to GitHub

```bash
git init
git add .
git commit -m "Initial MMC website"
git branch -M main
git remote add origin https://github.com/Phronesis-Innovationz-Agency/mmc-website.git
git push -u origin main
```

(Create the empty `mmc-website` repo under the org first.)

## 6. Deploy on Render

**New +** → **Blueprint** → select the repo → fill in `DATABASE_URL`, `SESSION_SECRET`,
`ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH` → **Apply**.

## Editing church details

Everything specific to the church — leadership names, service times, phone numbers, giving details, the
building fund description — lives in one file: `src/church.js`. Edit it there and it updates everywhere
on the site automatically. The list of departments (and their descriptions) lives in
`src/departments.js` — add, remove, or reword any of them; they're only a suggested starting list.

## What's deliberately cut for v1

- No online/card payment — giving happens via Mobile Money or bank transfer as it does today; the site
  just displays the details and logs a record when someone tells it they gave
- No automatic SMS/WhatsApp notifications when someone registers — check the admin dashboard, or add
  automated notifications later if it becomes worth the extra complexity
- No member login/portal — registration is one-way (member → church); there's no member-facing account
  system yet
- Single admin login shared by whoever needs to see registrations/giving — no per-person admin accounts
