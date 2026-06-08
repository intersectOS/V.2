// ⚠️ SECURITY: This file loads configuration from environment variables
// NEVER hardcode API keys or secrets here

const CONFIG = {
  // Supabase API - Load from environment, fallback only for development
  SUPABASE_URL: window.SUPABASE_URL || 'https://zmiywdpfdvllsxalklrv.supabase.co',
  SUPABASE_KEY: window.SUPABASE_KEY || null,

  // API Headers object - properly structured
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },

  // Timeouts
  FETCH_TIMEOUT: 15000, // 15 seconds
  DEBOUNCE_DELAY: 300,

  // Error messages
  ERROR_MESSAGES: {
    NETWORK: 'خطأ في الاتصال. يرجى التحقق من الاتصال بالإنترنت.',
    TIMEOUT: 'انتهت مهلة الانتظار. يرجى المحاولة مرة أخرى.',
    AUTH: 'فشل التحقق. يرجى التحقق من بيانات الدخول.',
    INVALID_RESPONSE: 'استجابة غير صحيحة من الخادم.',
    UNKNOWN: 'حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.',
  },

  // Toast messages
  TOAST_DURATION: 3000,

  // Validation rules
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,

  // API Endpoints
  API_ENDPOINTS: {
    OPPORTUNITIES: 'ix_opportunities',
    CLIENTS: 'ix_clients_v2',
    PEOPLE: 'ix_people',
    ROADMAPS: 'ix_roadmaps',
    ROADMAP_STAGES: 'ix_roadmap_stages',
    HISTORY: 'ix_history',
    BOOKINGS: 'ix_bookings',
    ATTENDANCE: 'ix_attendance',
    TRANSCRIPTS: 'ix_meeting_transcripts',
    ROADMAP_TEMPLATES: 'ix_roadmap_templates',
    CONFIG: 'mawjat_config',
  }
};

// Freeze config to prevent modifications
Object.freeze(CONFIG);

// Health check function
async function checkConfigHealth() {
  const required = ['SUPABASE_URL'];
  const missing = required.filter(key => !CONFIG[key]);

  if (missing.length > 0) {
    console.error('❌ Missing configuration:', missing);
    return false;
  }

  console.log('✅ Configuration loaded successfully');
  return true;
}
