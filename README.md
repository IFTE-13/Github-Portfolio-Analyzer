# Gitlytics

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GitHub API](https://img.shields.io/badge/GitHub_API-REST-181717?style=for-the-badge&logo=github&logoColor=white)

**Gitlytics** is a high-performance developer intelligence platform that decodes any GitHub profile into a rich, visual portfolio dashboard. Built with Next.js 16, React 19, and TypeScript, it transforms raw GitHub data into actionable insights through animated analytics, language distributions, and ranked repositories.

## Features

- **Instant Profile Analysis** — Enter any GitHub username and retrieve a complete developer profile with avatar, bio, social links, location, and tenure.
- **Developer Insights Panel** — Computed metrics including total stars, total forks, average stars per repo, primary language, unique languages mastered, and last repository sync date.
- **Top Repositories** — Automatically ranked top 3 repositories by stars with gold, silver, and bronze visual indicators.
- **Language Distribution Chart** — Interactive donut chart (powered by Recharts) showing top 10 languages with byte-level breakdowns and "Other" grouping.
- **Paginated Repository Explorer** — Browse all public repositories with client-side sorting (Stars, Forks, Name) and configurable pagination (6, 12, 24 per page).
- **Dark & Light Mode** — Seamless theme switching powered by `next-themes` with persistent preferences.
- **Responsive & Animated** — Fully responsive layout with Framer Motion animations, glassmorphism effects, and accessible Radix UI primitives.
- **Server-Side GitHub API Proxying** — Next.js API routes fetch user data, repositories, and language statistics securely from the GitHub Developer REST API.

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19, TypeScript 5 |
| Styling | Tailwind CSS v4, PostCSS |
| Components | Radix UI, shadcn/ui patterns |
| Animation | Motion (Framer Motion) |
| Charts | Recharts |
| Icons | Lucide React |
| Theme | next-themes |

## Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/<your-username>/gitlytics.git
cd gitlytics
```

2. Install dependencies
```bash
npm install
# or
pnpm install
```

3. Run the development server
```bash
npm run dev
# or
pnpm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Open the application in your browser.
2. Enter a GitHub username in the search bar (e.g., `octocat`, `torvalds`, `gaearon`).
3. Hit **Analyze** or press Enter.
4. Explore the dashboard:
   - **Profile Header** — Avatar, bio, stats, and personal details.
   - **Developer Insights** — At-a-glance metrics cards.
   - **Top Repositories** — Highest-starred projects.
   - **Language Distribution** — Donut chart with detailed breakdown.
   - **All Repositories** — Sortable, paginated list with language color indicators.

## Project Structure

```
gitlytics/
├── app/
│   ├── api/github/[username]/
│   │   ├── route.ts           # User profile endpoint
│   │   ├── repos/route.ts     # Repositories endpoint
│   │   └── languages/route.ts # Language stats endpoint
│   ├── _components/
│   │   ├── hero.tsx           # Search hero section
│   │   ├── userProfile.tsx    # Profile card & stats
│   │   ├── insightsPanel.tsx  # Metrics grid
│   │   ├── topRepos.tsx       # Top 3 ranked repos
│   │   ├── languageChart.tsx  # Recharts donut chart
│   │   └── repoList.tsx       # Paginated repo list
│   ├── layout.tsx             # Root layout & theme provider
│   └── page.tsx               # Main orchestrator
├── components/ui/             # Reusable Radix/Tailwind components
├── lib/
│   ├── types.ts               # TypeScript interfaces
│   ├── github.ts              # GitHub API utilities
│   └── utils.ts               # Helper functions
└── public/                    # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using the [GitHub Developer API](https://docs.github.com/en/rest)
