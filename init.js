// ═════════════════════════════════════════════════════════════════
// INTERSECT PARTNEROS - INITIALIZATION SCRIPT
// Initialize global variables and configuration
// ═════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  // ENVIRONMENT CONFIGURATION
  // ─────────────────────────────────────────────────────────────

  // Load from environment variables or fallback to config
  const SUPABASE_URL = window.SUPABASE_URL || CONFIG?.SUPABASE_URL || 'https://zmiywdpfdvllsxalklrv.supabase.co';
  const SUPABASE_KEY = window.SUPABASE_KEY || CONFIG?.SUPABASE_KEY;

  // ─────────────────────────────────────────────────────────────
  // GLOBAL VARIABLE INITIALIZATION
  // ─────────────────────────────────────────────────────────────

  // API Base URL - Supabase REST API
  window._SB = SUPABASE_URL + '/rest/v1/';

  // API Headers object - properly structured
  window._H = {
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };

  // If API key is available, add it to headers
  if (SUPABASE_KEY) {
    window._H['apikey'] = SUPABASE_KEY;
    window._H['Authorization'] = 'Bearer ' + SUPABASE_KEY;
  }

  // ─────────────────────────────────────────────────────────────
  // MEETING CHAT STATE
  // ─────────────────────────────────────────────────────────────
  window._mcHistory = [];
  window._mcThinking = false;

  // ─────────────────────────────────────────────────────────────
  // LOCALIZATION STRINGS
  // ─────────────────────────────────────────────────────────────
  window.i18n = {
    en: {
      'g_cmd': 'Command',
      'n_dash': 'Dashboard',
      'n_notif': 'Notifications',
      'n_ai': 'AI Insights',
      'g_ops': 'Operations',
      'n_clients': 'Clients',
      'n_pipe': 'Opportunities',
      'n_people': 'People Directory',
      'n_experts': 'Expert Marketplace',
      'n_requests': 'Requests',
      'n_meetings': 'Meetings',
      'n_reports': 'Reports',
      'n_inv': 'Invoices',
      'n_proj': 'Projects',
      'n_tasks': 'Tasks',
      'n_act': 'Action Items',
      'g_sys': 'System',
      'n_set': 'Settings',
      'live': 'Live',
      'fa': 'Founders',
      'sign_out': '→ Sign Out'
    },
    ar: {
      'g_cmd': 'الأوامر',
      'n_dash': 'لوحة التحكم',
      'n_notif': 'الإخطارات',
      'n_ai': 'رؤى الذكاء الاصطناعي',
      'g_ops': 'العمليات',
      'n_clients': 'العملاء',
      'n_pipe': 'الفرص',
      'n_people': 'دليل الأشخاص',
      'n_experts': 'سوق الخبراء',
      'n_requests': 'الطلبات',
      'n_meetings': 'الاجتماعات',
      'n_reports': 'التقارير',
      'n_inv': 'الفواتير',
      'n_proj': 'المشاريع',
      'n_tasks': 'المهام',
      'n_act': 'عناصر العمل',
      'g_sys': 'النظام',
      'n_set': 'الإعدادات',
      'live': 'مباشر',
      'fa': 'المؤسسون',
      'sign_out': '← تسجيل الخروج'
    }
  };

  window.currentLang = localStorage.getItem('lang') || 'en';

  // ─────────────────────────────────────────────────────────────
  // UTILITY FUNCTIONS
  // ─────────────────────────────────────────────────────────────

  /**
   * Get localized string
   */
  window.t = function(key) {
    const strings = window.i18n[window.currentLang] || window.i18n.en;
    return strings[key] || key;
  };

  /**
   * Update all i18n elements on page
   */
  window.updateI18n = function() {
    document.querySelectorAll('[data-i]').forEach(el => {
      const key = el.getAttribute('data-i');
      el.textContent = window.t(key);
    });
  };

  /**
   * Initialize theme based on saved preference
   */
  window.initTheme = function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  };

  /**
   * Safe localStorage operations
   */
  window.getFromStorage = function(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Storage read error:', e);
      return defaultValue;
    }
  };

  window.saveToStorage = function(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage write error:', e);
      return false;
    }
  };

  // ─────────────────────────────────────────────────────────────
  // INITIALIZATION
  // ─────────────────────────────────────────────────────────────

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      window.initTheme();
      window.updateI18n();
      console.log('✅ Initialization complete');
    });
  } else {
    window.initTheme();
    window.updateI18n();
    console.log('✅ Initialization complete');
  }

  // Health check
  console.log('🔧 Intersect PartnerOS - Initialization Script Loaded');
  console.log('📡 API Base URL:', window._SB);
  console.log('🔐 API Headers:', window._H);

})();
