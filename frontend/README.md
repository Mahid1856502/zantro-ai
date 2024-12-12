<a name="readme-top"></a>

<div align="center">
  <h3 align="center">Swiftor</h3>
  <p align="center">
    The All-in-One AI‑Powered Hacking Dashboard
    <br />
    <a href="https://swiftor.io"><strong>Explore the Website »</strong></a>
    <br />
    <br />
    <a href="https://github.com/furaar/swiftor/issues">Report Bug</a>
    ·
    <a href="https://github.com/furaar/swiftor/issues">Request Feature</a>
  </p>
</div>

---

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables-description)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)

## About The Project

Swiftor is an All-in-One AI-powered cloud computing platform with features like AI agents, report-generation, and automation to accelerate your penetration testing.

### Built With

- [![nextjs][nextjs]][nextjs-url]
- [![vercel][vercel]][vercel-url]
- [![tailwindcss][tailwindcss]][tailwindcss-url]
- [![typescript][typescript]][typescript-url]

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Yarn
  ```sh
  npm install --global yarn
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/swiftor/swiftor.git
   ```
2. Install NPM packages
   ```sh
   yarn install
   ```

### Environment Variables Description

Create a `.env.local` file with the following variables:

- **NEXT_PUBLIC_SUPABASE_URL**: Your Supabase project URL
  Example: `NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co`

- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Your Supabase anonymous key
  Example: `NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`

## Usage

To run the project locally:

1. Start the development server
   ```sh
   yarn dev
   ```
2. Visit `http://localhost:5000` in your browser

### Recommended Extensions

- Prettier
  - Open your command palette, choose your default formatter to be Prettier, and enable format on save
- ESLint
  - When you push a commit, we have a pre-commit hook that automatically runs prettier, eslint, and builds your project
- JavaScript and TypeScript Nightly

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the repo
2. Clone your fork
   ```sh
   git clone https://github.com/<YOUR_USERNAME>/swiftor.git
   ```
3. Create a feature branch
   ```sh
   git checkout -b feature/amazing-feature
   ```
4. Commit your changes
   ```sh
   git commit -m 'Add some amazing feature'
   ```
5. Push to the branch
   ```sh
   git push origin feature/amazing-feature
   ```
6. Open a Pull Request

## Contact

- @Furaar - [@github/furaar](https://github.com/furaar)

[typescript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[vercel]: https://img.shields.io/badge/Vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white
[vercel-url]: https://vercel.com/
[nextjs]: https://img.shields.io/badge/Next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white
[nextjs-url]: https://nextjs.org/
[tailwindcss]: https://img.shields.io/badge/Tailwind_CSS-%231a202c.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwindcss-url]: https://tailwindcss.com/
