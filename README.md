# React + Next.js + shadcn/ui Authentication Boilerplate

A modern, production-ready authentication boilerplate built with **React 19**, **Next.js 15** (App Router), and **shadcn/ui** components. Features complete Memberstack authentication (login, signup, password reset, protected routes) with a beautiful, accessible UI.

## Prerequisites

- [Memberstack account](https://memberstack.com/)
- Node.js 20.0.0+ and npm

## Setup

### 1. Clone and Create Your Repository

```bash
# Clone this repo
git clone https://github.com/julianmemberstack/webflow-cloud-auth.git
cd webflow-cloud-auth
npm install
```

Then create a new repository on [github.com/new](https://github.com/new) and push to it:

```bash
git remote set-url origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### 2. Get Memberstack Credentials

1. Sign in to [Memberstack](https://memberstack.com/)
2. Go to **Dev Tools** in your Memberstack dashboard
3. Look near the **top right** - you'll see your Public Key and Secret Key
4. Copy the correct **live** or **test** mode credentials depending on what you want

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Open `.env` and add your Memberstack credentials:

```env
NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY="pk_sb_xxxxxxxxxxxxxx"
MEMBERSTACK_SECRET_KEY="sk_sb_xxxxxxxxxxxxxx"
```

### 4. Test Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and test the authentication features.

### 5. Deploy

#### Option A: Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY`
   - `MEMBERSTACK_SECRET_KEY`
4. Deploy!

#### Option B: Deploy to Other Platforms

- **Netlify**: Connect your GitHub repo and deploy
- **Railway**: Connect your repo and deploy
- **AWS Amplify**: Connect your repo and deploy
- **Any platform** that supports Next.js

> **Note**: If you want to deploy to Webflow Cloud, you'll need to set `basePath: "/app"` in `next.config.ts` and configure it in Webflow Cloud settings.

## Tech Stack

- **React 19** - Latest React with modern hooks and patterns
- **Next.js 15** - App Router with Server Components
- **shadcn/ui** - Beautiful, accessible component library
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Memberstack** - Authentication and user management

## What's Included

- ✅ **React 19** with modern hooks and patterns
- ✅ **Next.js 15 App Router** with Server/Client component separation
- ✅ **shadcn/ui components** - Button, Input, Card, Form, Dialog, and more
- ✅ Login and signup pages with validation
- ✅ Password reset flow (forgot password + reset)
- ✅ Protected account page with auth guard
- ✅ Automatic redirects for unauthenticated users
- ✅ SSR-safe sessionStorage hooks
- ✅ Server-side redirects
- ✅ Toast notifications (Sonner)
- ✅ Responsive design with Tailwind CSS

## Scripts

```bash
npm run dev      # Local development
npm run build    # Build for production
npm run preview  # Test production build locally
npm run deploy   # Generic deploy command (configure for your platform)
```

## Troubleshooting

**Authentication not working**

- Verify both Memberstack environment variables are set in your deployment platform
- Make sure you're using keys from the same Memberstack app
- Check that your public key starts with `NEXT_PUBLIC_`

**Build errors**

- Make sure all environment variables are set in your deployment platform
- Check that Node.js version matches (20.0.0+)

## Learn More

- [React Docs](https://react.dev/)
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Memberstack Docs](https://docs.memberstack.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

Built with **React 19**, **Next.js 15**, **shadcn/ui**, and **Memberstack**
