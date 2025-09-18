# Vercel Deployment Guide for Ayam Gepuk Artisan

## Prerequisites

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to your Vercel account:
```bash
vercel login
```

## Environment Variables Setup

Before deploying, you need to set up the following environment variables in your Vercel dashboard or via CLI:

### Required Environment Variables

1. **DATABASE_URL**: For production, you'll need a cloud database URL (not SQLite)
   - Recommended: PostgreSQL on Neon, PlanetScale, or Supabase
   - Example: `postgresql://username:password@host:port/database`

2. **NEXTAUTH_SECRET**: A secret key for NextAuth.js
   - Generate with: `openssl rand -base64 32`

3. **NEXTAUTH_URL**: Your production URL
   - Will be: `https://your-project-name.vercel.app`

### Setting Environment Variables via CLI

```bash
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET  
vercel env add NEXTAUTH_URL
```

## Database Migration for Production

Since this project uses SQLite locally but you'll need a cloud database for production:

1. Choose a cloud database provider:
   - **Neon** (PostgreSQL): https://neon.tech
   - **PlanetScale** (MySQL): https://planetscale.com
   - **Supabase** (PostgreSQL): https://supabase.com

2. Create a database and get the connection URL

3. Update your `prisma/schema.prisma` for production:
```prisma
datasource db {
  provider = "postgresql" // or "mysql"
  url      = env("DATABASE_URL")
}
```

4. Generate and push the schema:
```bash
npx prisma generate
npx prisma db push
```

## Deployment Commands

### Deploy to Production
```bash
vercel --prod
```

### Deploy Preview (for testing)
```bash
vercel
```

### Deploy with specific project name
```bash
vercel --prod --name ayam-gepuk-artisan
```

## Post-Deployment Steps

1. **Verify the deployment**:
   - Check that all pages load correctly
   - Test the API endpoints: `/api/health` and `/api/socketio`
   - Verify responsive design on mobile devices

2. **Database setup**:
   - Run any necessary data seeding scripts
   - Test order creation and management

3. **Domain configuration** (optional):
   - Add custom domain in Vercel dashboard
   - Update `NEXTAUTH_URL` environment variable

## Troubleshooting

### Common Issues

1. **Build failures**:
   - Check that all environment variables are set
   - Ensure TypeScript errors are resolved
   - Verify all dependencies are properly installed

2. **Database connection issues**:
   - Verify DATABASE_URL format
   - Check database provider network settings
   - Ensure IP restrictions allow Vercel's IPs

3. **Socket.IO not working**:
   - Note: Socket.IO requires special handling in serverless environments
   - Consider using Vercel's real-time features or external Socket.IO service
   - Alternative: Use server-sent events or polling for real-time features

### Build Configuration

The project includes:
- `vercel.json` for deployment configuration
- Modified `next.config.ts` for production builds
- Serverless-compatible API routes

### Performance Optimization

- Static pages are pre-rendered
- Images are optimized with Next.js Image component
- Bundle is optimized for production

## Alternative Socket.IO Setup

For production Socket.IO, consider:
1. **Ably** - Real-time messaging service
2. **Pusher** - Real-time communication
3. **Socket.IO on Railway/Render** - Dedicated server for Socket.IO

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review Next.js and Vercel documentation
3. Test locally with `npm run build && npm run start`