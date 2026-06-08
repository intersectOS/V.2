# 👨‍💻 Development Guide

## 🚀 Setting Up Your Development Environment

### 1. Initial Setup

```bash
# Clone the repository
git clone https://github.com/intersectos/v.2.git
cd v.2

# Install dependencies (optional, most are CDN-based)
npm install

# Start development server
npm run dev

# Open http://localhost:8000 in your browser
```

### 2. Environment Configuration

```bash
# Copy example file
cp .env.example .env

# Edit with your credentials
nano .env
# VITE_SUPABASE_URL=your-url
# VITE_SUPABASE_ANON_KEY=your-key
```

### 3. Browser DevTools

**Enable in your browser:**
- Open Developer Tools (F12)
- Go to Console tab
- Check for errors
- Monitor Network requests

## 📂 File Structure

### Core Files

```
index.html         Main application - DO NOT edit directly
  ├── config.js    Configuration constants
  ├── utils.js     Utility functions
  └── styles       Embedded CSS
```

### Other Pages

```
client.html        Client portal
expert.html        Expert directory
freelancer.html    Freelancer marketplace
consultant.html    Consultant network
team.html          Team management
website.html       Marketing website
portal.html        Admin portal
```

### Configuration Files

```
.env.example       Environment template
.env              (NEVER COMMIT) Local credentials
.gitignore        Git ignore rules
package.json      Dependencies
```

## 🛠️ Common Tasks

### Adding a New Feature

1. **Create new page**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <script src="config.js"></script>
     <script src="utils.js"></script>
     <!-- your code -->
   </head>
   <body>
     <!-- content -->
   </body>
   </html>
   ```

2. **Use utility functions**
   ```javascript
   // Safe fetch
   const result = await safeFetch('/api/data', {
     method: 'POST',
     body: JSON.stringify({...})
   });
   
   // Validate input
   const validation = validateRequired({
     name: nameInput.value,
     email: emailInput.value
   });
   
   if (!validation.valid) {
     toast('Please fill all required fields', 'error');
     return;
   }
   ```

### Modifying Database Queries

1. **Update config.js** if adding new tables
   ```javascript
   API_ENDPOINTS: {
     YOUR_TABLE: 'your_table_name',
   }
   ```

2. **Use safeFetch in code**
   ```javascript
   const response = await safeFetch(
     `${CONFIG.SUPABASE_URL}/rest/v1/${CONFIG.API_ENDPOINTS.YOUR_TABLE}`,
     {
       method: 'GET',
       headers: {...CONFIG.HEADERS}
     }
   );
   ```

### Adding Error Handling

```javascript
try {
  // Your code
  await someAsyncOperation();
  toast('✅ Success!', 'success');
  
} catch (error) {
  // Use utility function
  handleError(error, 'operationName');
  
  // Or custom handling
  const message = error.message || CONFIG.ERROR_MESSAGES.UNKNOWN;
  toast(message, 'error');
}
```

### Adding Input Validation

```javascript
// Basic validation
const { valid, errors } = validateRequired({
  username: input1.value,
  password: input2.value
});

// Email validation
if (!isValidEmail(email)) {
  toast('Invalid email format', 'error');
  return;
}

// Password strength
const pwCheck = isStrongPassword(password);
if (!pwCheck.valid) {
  toast(pwCheck.message, 'error');
  return;
}

// Custom validation
if (input.length > 500) {
  toast('Input too long (max 500 chars)', 'error');
  return;
}
```

## 🧪 Testing

### Manual Testing Checklist

```javascript
// 1. Test API calls
safeFetch(url)
  .then(r => console.log('Success:', r))
  .catch(e => console.error('Error:', e));

// 2. Test validations
validateRequired({ field: '' })
isValidEmail('test@example.com')
isStrongPassword('MyPass123!')

// 3. Test error handling
try {
  throw new Error('test');
} catch(e) {
  handleError(e, 'testing');
}

// 4. Test storage
saveToStorage('key', {data: true})
getFromStorage('key')
removeFromStorage('key')
```

### Browser Console Testing

```javascript
// Check config
console.log(CONFIG);

// Test utils
console.log(escapeHtml('<script>alert("xss")</script>'));

// Test storage
saveToStorage('test', {value: 123});
console.log(getFromStorage('test'));

// Test datetime
console.log(formatDate(new Date()));
console.log(formatTime(new Date()));

// Test debounce
const debouncedFn = debounce(() => console.log('fired'), 500);
debouncedFn();
debouncedFn();
debouncedFn(); // Only last one fires
```

## 🔍 Debugging

### Enable Debug Logging

Add to your code:
```javascript
CONFIG.DEBUG = true;

// Then use:
logger.debug('Message', data);
logger.info('Info message', data);
logger.warn('Warning', data);
logger.error('Error', data);
```

### Check Network Requests

1. Open DevTools → Network tab
2. Perform action
3. Look for failed requests
4. Check response status and body
5. Verify CORS headers

### Common Issues & Solutions

#### Issue: Images not loading
```javascript
// Check image path
console.log(document.querySelector('img').src);

// Verify file exists
// Use absolute path or data URI as fallback
```

#### Issue: API returns 401
```javascript
// Check authentication headers
console.log(CONFIG.SUPABASE_KEY);

// Verify token is valid
// Check expiration in JWT token
```

#### Issue: XSS errors
```javascript
// Use escapeHtml for user input
const safe = escapeHtml(userInput);
element.textContent = safe;
```

#### Issue: Performance slow
```javascript
// Use debounce for frequent calls
const debouncedSearch = debounce(search, 300);

// Check for memory leaks
// Monitor DevTools → Memory
```

## 🚀 Deployment

### Pre-Deployment Checklist

```bash
# 1. Security check
npm run security-check

# 2. Code quality
npm run lint

# 3. Test
npm run test

# 4. Build
npm run build

# 5. Final check
git status
git diff
```

### Deploying to Staging

```bash
# Commit changes
git add .
git commit -m "Feature: description"

# Push to staging branch
git push origin feature-branch

# Create PR
# Run tests in CI
# Deploy to staging
npm run deploy:staging

# Test on staging
# Get approval
# Merge to main
```

### Deploying to Production

```bash
# Ensure all tests pass
# Merge PR to main
# Create release tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tag
git push origin v1.0.0

# Deploy
npm run deploy
```

## 📝 Code Style

### JavaScript Style Guide

```javascript
// ✅ Good
const handleClick = async (event) => {
  try {
    const data = await safeFetch(url);
    if (data.success) {
      toast('Success!', 'success');
    }
  } catch (error) {
    handleError(error, 'handleClick');
  }
};

// ❌ Bad
var handleClick = function(event) {
  fetch(url).then(res => res.json())
    .then(data => {
      // unclear
    })
    .catch(e => console.log(e)); // Poor error handling
};
```

### HTML Best Practices

```html
<!-- ✅ Good -->
<input 
  type="email" 
  id="email-input"
  class="fi"
  placeholder="Enter email"
  required
>

<!-- ❌ Bad -->
<input type=email onclick="validate()" 
  onchange="save(this.value)" />
```

### Comments

```javascript
// ✅ Good - explains WHY
// Rate limit API calls to prevent overload
const debouncedSearch = debounce(search, 300);

// ❌ Bad - explains WHAT (code already shows)
// Set debounce to 300ms
const debouncedSearch = debounce(search, 300);
```

## 🤝 Git Workflow

### Creating a Feature Branch

```bash
# Update main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/short-description

# Work on feature
git add .
git commit -m "Feature: clear description"

# Push to remote
git push -u origin feature/short-description
```

### Commit Message Format

```
Feature: Add new dashboard widget
- Describe what was changed
- Explain why the change was made
- Reference issue/ticket if applicable

Closes #123
```

### Pull Request Template

```markdown
## Description
What changes were made?

## Related Issue
Closes #123

## Testing
How was this tested?

## Screenshots
Include images if UI changed

## Checklist
- [ ] Code follows style guide
- [ ] Tests pass
- [ ] Security reviewed
- [ ] Documentation updated
```

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [Web Security](https://owasp.org/www-project-top-ten/)

## 🆘 Getting Help

- Check existing issues
- Search documentation
- Ask in team chat
- Create GitHub issue with details

---

**Happy Coding! 🎉**
