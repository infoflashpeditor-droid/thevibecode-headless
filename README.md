# The Vibe Code - Headless WordPress with Next.js

A modern, fast, and interactive blog built with Next.js, TypeScript, Tailwind CSS, ShadCN UI, and Motion.dev, powered by a headless WordPress backend.

## 🚀 Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + ShadCN UI
- **Animations**: Framer Motion + Motion.dev + GSAP
- **Backend**: WordPress (Headless CMS)
- **TypeScript**: Full type safety
- **Deployment**: Vercel

## ✨ Features

- 🎨 Beautiful, modern design with dark/light mode
- ⚡ Lightning-fast performance with Next.js
- 🎭 Smooth animations and interactions
- 📱 Fully responsive design
- 🔍 SEO optimized with dynamic meta tags
- 📊 WordPress REST API integration
- 🎯 Type-safe with TypeScript
- 🎨 Customizable with ShadCN UI components

## 🛠️ Local Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- WordPress site with REST API enabled

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd headless
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your WordPress site details:
```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://thevibecode.io/wp-json/wp/v2
WORDPRESS_SITE_URL=https://thevibecode.io
NEXT_PUBLIC_SITE_NAME=The Vibe Code
NEXT_PUBLIC_SITE_DESCRIPTION=Your ultimate destination for coding tutorials, tips, and insights
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Start the development server:
```bash
npm run dev
```

## 🌐 Deployment to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo)

### Manual Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_WORDPRESS_API_URL`
   - `WORDPRESS_SITE_URL` 
   - `NEXT_PUBLIC_SITE_NAME`
   - `NEXT_PUBLIC_SITE_DESCRIPTION`
   - `NEXT_PUBLIC_SITE_URL`

4. Deploy!

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── blog/              # Blog pages
│   │   ├── [slug]/        # Dynamic blog post pages
│   │   └── page.tsx       # Blog listing page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # ShadCN UI components
│   ├── header.tsx        # Site header
│   ├── footer.tsx        # Site footer
│   └── blog-post-card.tsx # Blog post card
├── lib/                  # Utilities and configs
│   ├── wordpress-api.ts  # WordPress API client
│   ├── seo.ts           # SEO utilities
│   └── utils.ts         # General utilities
└── types/               # TypeScript types
    └── wordpress.ts     # WordPress data types
```

## 🎨 Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update `tailwind.config.ts` for Tailwind customization
- Use ShadCN UI components in `src/components/ui/`

### Animations
- Framer Motion components in page files
- GSAP animations can be added to components
- Motion.dev for advanced interactions

### WordPress Integration
- API client in `src/lib/wordpress-api.ts`
- TypeScript types in `src/types/wordpress.ts`
- Extend for custom post types or fields

## 🔧 WordPress Configuration

### Required WordPress Setup
1. Ensure REST API is enabled (default in modern WordPress)
2. Install recommended plugins:
   - Yoast SEO (for better meta data)
   - Custom Post Type UI (if needed)
   - Advanced Custom Fields (for custom fields)

### API Endpoints Used
- `/wp-json/wp/v2/posts` - Blog posts
- `/wp-json/wp/v2/pages` - Pages  
- `/wp-json/wp/v2/categories` - Categories
- `/wp-json/wp/v2/tags` - Tags
- `/wp-json/wp/v2/media` - Media files
- `/wp-json/wp/v2/users` - Authors

## 📈 Performance

- Next.js App Router for optimal performance
- Image optimization with Next.js Image component
- Static generation where possible
- Efficient WordPress API calls with caching

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [ShadCN UI](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [WordPress](https://wordpress.org/) for the headless CMS

---

Made with ❤️ by The Vibe Code Team
