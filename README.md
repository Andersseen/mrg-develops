# MRG Develops - The Cloud Brewery ☁️🚀

**Your AI-driven Multi-Cloud Technology Partner.**

This repository contains the source code for the landing page of **MRG Develops**, a next-generation tech consultancy specializing in Cloud Architecture, Data Engineering, and Generative AI.

## 🛠 Tech Stack

Built with a focus on performance, scalability, and developer experience:

- **Framework**: [Astro 5](https://astro.build/) - High-performance static site generator.
- **UI Architecture**: [React 19](https://react.dev/) - Component-based UI logic.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first styling with OKLAB color space.
- **Content Management**: [Keystatic](https://keystatic.com/) - Git-based CMS for content editing.
- **Animations**: [Motion](https://motion.dev/) - Smooth, performant interactions.
- **Deployment**: [Vercel](https://vercel.com/) - Serverless edge deployment.

## 🚀 Key Features

- **🌐 Internationalization (i18n)**: Full English (EN) and Spanish (ES) support with path-based routing.
- **✨ Premium UI/UX**:
  - Dark/Light mode with reduced motion support.
  - Smooth anchor scrolling via `Lenis`.
  - Active scroll spy navigation.
- **🔒 Secure Admin**:
  - `/keystatic` admin panel protected by middleware (Basic Auth).
  - Can be completely disabled in production.
- **⚡ Performance**:
  - Zero-JS initial hydration for critical content (LCP optimized).
  - Efficient asset bundling and tree-shaking.
- **📧 Contact Form**: Server-side integration with [Resend](https://resend.com/).

## 📦 Project Structure

```bash
/src
  /components     # React UI components (Hero, Header, etc.)
  /content        # Keystatic content (YAML/JSON)
  /layouts        # Astro Layouts
  /pages          # File-based routing & API endpoints
  /styles         # Global CSS & Tailwind config
  /middleware.ts  # Auth protection logic
astro.config.mjs  # Framework configuration
keystatic.config  # CMS Schema definition
```

## 🛠️ Setup & Development

1.  **Install dependencies:**

    ```bash
    pnpm install
    ```

2.  **Start development server:**

    ```bash
    pnpm dev
    ```

3.  **Access Keystatic Admin:**

    Open `http://localhost:4321/keystatic` to edit content.

## 🌍 Deployment

This project is configured for **Vercel**.

1.  Push to GitHub.
2.  Import project in Vercel.
3.  **Environment Variables**:
    These are required for the contact form and admin security:

    ```env
    RESEND_API_KEY=re_123...
    KEYSTATIC_USER=admin
    KEYSTATIC_PASSWORD=your_secure_password
    SKIP_KEYSTATIC=true # Optional: Set to true to disable Keystatic in production build
    ```

## 📄 License

Proprietary - MRG Develops.
