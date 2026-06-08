# 🔒 Intersect PartnerOS - Security Guide

## ⚠️ CRITICAL SECURITY REQUIREMENTS

### 1. Environment Variables (MUST DO)
This application requires secure credential management.

```bash
# Copy the example file
cp .env.example .env

# Fill in your actual credentials in .env
VITE_SUPABASE_URL=your-actual-url
VITE_SUPABASE_ANON_KEY=your-actual-key
```

### 2. Never Commit Secrets
**IMPORTANT**: The `.gitignore` file ensures `.env` is NEVER committed to git.

```
# ❌ NEVER DO THIS:
git add .env
git commit -m "add credentials"

# ✅ DO THIS INSTEAD:
git add .env.example  # Only commit the template
```

### 3. Backend Proxy (Recommended)
For production, implement a backend proxy to:
- Keep credentials server-side only
- Add rate limiting
- Implement request validation
- Log API access

```javascript
// Example backend endpoint:
POST /api/db/query
{
  "table": "ix_opportunities",
  "filters": {...},
  "limit": 20
}
```

### 4. API Security Best Practices
- ✅ Use HTTPS only
- ✅ Implement CORS properly
- ✅ Add request rate limiting
- ✅ Validate all inputs
- ✅ Never log sensitive data
- ✅ Use authentication tokens for sessions

### 5. Content Security Policy
Add to your web server configuration:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'
```

### 6. XSS Protection
All user input is escaped using the `escapeHtml()` function in `utils.js`.

### 7. Dependencies
Keep all dependencies up to date:
```bash
npm audit
npm update
```

## 🔑 Secret Management Checklist

- [ ] `.env` file created and gitignored
- [ ] All credentials moved to environment variables
- [ ] Backend proxy implemented (if needed)
- [ ] HTTPS enforced on production
- [ ] API rate limiting configured
- [ ] Input validation enabled on all forms
- [ ] XSS protection verified
- [ ] CORS configured properly
- [ ] Error logging doesn't expose secrets
- [ ] Team members briefed on security practices

## 📞 Questions?
Contact security team before deploying to production.
