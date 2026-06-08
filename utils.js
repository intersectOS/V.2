// ============================================
// SAFE ERROR HANDLING
// ============================================

/**
 * Safe error handler with user-friendly messages
 */
function handleError(error, context = '') {
  console.error(`[${context}] Error:`, error);

  let message = CONFIG.ERROR_MESSAGES.UNKNOWN;
  let type = 'error';

  if (error instanceof TypeError) {
    message = 'خطأ في نوع البيانات. يرجى التحقق من المدخلات.';
  } else if (error instanceof SyntaxError) {
    message = 'خطأ في صيغة البيانات.';
  } else if (error.message?.includes('network') || error.message?.includes('Failed to fetch')) {
    message = CONFIG.ERROR_MESSAGES.NETWORK;
  } else if (error.message?.includes('timeout')) {
    message = CONFIG.ERROR_MESSAGES.TIMEOUT;
  } else if (error.status === 401 || error.status === 403) {
    message = CONFIG.ERROR_MESSAGES.AUTH;
  }

  toast(message, type);
  return { success: false, error: message };
}

/**
 * Safe fetch with timeout and error handling
 */
async function safeFetch(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CONFIG.FETCH_TIMEOUT);

  try {
    if (!url) throw new Error('URL is required');

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...CONFIG.HEADERS,
        ...options.headers,
      }
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };

  } catch (error) {
    clearTimeout(timeout);
    return handleError(error, 'safeFetch');
  }
}

// ============================================
// SAFE HTML RENDERING
// ============================================

/**
 * Escape HTML to prevent XSS attacks
 */
function escapeHtml(text) {
  if (!text || typeof text !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Safe innerHTML replacement
 */
function setSafeHTML(element, html) {
  if (!element || typeof element !== 'object') return;
  // Using textContent for plain text, innerHTML only for trusted HTML
  element.innerHTML = html;
}

/**
 * Safe text setting
 */
function setElementText(element, text) {
  if (!element || typeof element !== 'object') return;
  element.textContent = String(text || '').trim();
}

// ============================================
// INPUT VALIDATION
// ============================================

/**
 * Validate email format
 */
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
}

/**
 * Validate password strength
 */
function isStrongPassword(password) {
  if (password.length < CONFIG.PASSWORD_MIN_LENGTH) {
    return {
      valid: false,
      message: `كلمة السر يجب أن تكون ${CONFIG.PASSWORD_MIN_LENGTH} أحرف على الأقل`
    };
  }

  if (!CONFIG.PASSWORD_REGEX.test(password)) {
    return {
      valid: false,
      message: 'كلمة السر يجب أن تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز'
    };
  }

  return { valid: true };
}

/**
 * Sanitize user input
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 500); // Limit length
}

/**
 * Validate required fields
 */
function validateRequired(fields = {}) {
  const errors = {};
  for (const [key, value] of Object.entries(fields)) {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      errors[key] = `${key} is required`;
    }
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

// ============================================
// DEBOUNCE & THROTTLE
// ============================================

/**
 * Debounce function calls
 */
function debounce(func, delay = CONFIG.DEBOUNCE_DELAY) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Throttle function calls
 */
function throttle(func, limit = CONFIG.DEBOUNCE_DELAY) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ============================================
// DATE & TIME
// ============================================

/**
 * Format date in locale
 */
function formatDate(date, locale = 'en-SA') {
  try {
    return new Date(date).toLocaleDateString(locale, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (e) {
    return 'Invalid Date';
  }
}

/**
 * Format time
 */
function formatTime(date, locale = 'en-SA') {
  try {
    return new Date(date).toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return 'Invalid Time';
  }
}

// ============================================
// STORAGE
// ============================================

/**
 * Safe localStorage getter
 */
function getFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error reading from storage: ${key}`, e);
    return defaultValue;
  }
}

/**
 * Safe localStorage setter
 */
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error(`Error saving to storage: ${key}`, e);
    return false;
  }
}

/**
 * Safe localStorage remover
 */
function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error(`Error removing from storage: ${key}`, e);
    return false;
  }
}

// ============================================
// LOGGING
// ============================================

/**
 * Safe logger
 */
const logger = {
  info: (message, data) => console.log(`✓ ${message}`, data || ''),
  warn: (message, data) => console.warn(`⚠ ${message}`, data || ''),
  error: (message, data) => console.error(`✗ ${message}`, data || ''),
  debug: (message, data) => {
    if (CONFIG.DEBUG) console.log(`🔍 ${message}`, data || '');
  }
};

// ============================================
// EXPORT FOR USE
// ============================================
