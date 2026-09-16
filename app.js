/**
 * Chaoy Personal Space & Live Temporal Dashboard
 * Modern Vanilla JS Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // State & Persistence
  // --------------------------------------------------------------------------
  const STORAGE_KEYS = {
    THEME: 'chaoy_theme_pref',
    TIME_FORMAT: 'chaoy_time_format',
    NAME: 'chaoy_user_name',
    TITLE: 'chaoy_user_title',
    BIO: 'chaoy_user_bio',
    STATUS: 'chaoy_user_status'
  };

  let is24Hour = (localStorage.getItem(STORAGE_KEYS.TIME_FORMAT) || '24h') === '24h';
  let currentTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';

  // --------------------------------------------------------------------------
  // DOM Elements
  // --------------------------------------------------------------------------
  const elHours = document.getElementById('clock-hours');
  const elMinutes = document.getElementById('clock-minutes');
  const elSeconds = document.getElementById('clock-seconds');
  const elAmPm = document.getElementById('clock-ampm');
  const elDate = document.getElementById('full-date-string');
  const elGreetingText = document.getElementById('greeting-text');
  const elGreetingIcon = document.getElementById('greeting-icon');
  const elTimezoneLabel = document.getElementById('timezone-label');
  const elDayProgressBar = document.getElementById('day-progress-bar');
  const elDayProgressPercent = document.getElementById('day-progress-percent');
  const elDayProgressDetails = document.getElementById('day-progress-details');

  const formatToggleBtn = document.getElementById('time-format-toggle');
  const formatLabel = formatToggleBtn.querySelector('.btn-label');

  const themeBtn = document.getElementById('theme-menu-toggle');
  const themeDropdown = document.getElementById('theme-dropdown');
  const currentThemeLabel = document.getElementById('current-theme-name');
  const themeOptions = document.querySelectorAll('.theme-opt');

  const nameEl = document.getElementById('user-display-name');
  const titleEl = document.getElementById('user-display-title');
  const bioEl = document.getElementById('user-display-bio');
  const statusEl = document.getElementById('status-availability');

  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyTimestampBtn = document.getElementById('copy-timestamp-btn');
  const toastContainer = document.getElementById('toast-container');

  // --------------------------------------------------------------------------
  // Restore Saved Content
  // --------------------------------------------------------------------------
  function restoreSavedContent() {
    const savedName = localStorage.getItem(STORAGE_KEYS.NAME);
    const savedTitle = localStorage.getItem(STORAGE_KEYS.TITLE);
    const savedBio = localStorage.getItem(STORAGE_KEYS.BIO);
    const savedStatus = localStorage.getItem(STORAGE_KEYS.STATUS);

    if (savedName) nameEl.textContent = savedName;
    if (savedTitle) titleEl.textContent = savedTitle;
    if (savedBio) bioEl.textContent = savedBio;
    if (savedStatus) statusEl.textContent = savedStatus;

    // Apply saved theme
    applyTheme(currentTheme);

    // Apply saved format button label
    formatLabel.textContent = is24Hour ? '24H' : '12H';
    elAmPm.style.display = is24Hour ? 'none' : 'inline-block';
  }

  // --------------------------------------------------------------------------
  // Content Editable Autosave
  // --------------------------------------------------------------------------
  function setupEditable(element, key, isSingleLine = false) {
    if (!element) return;

    if (isSingleLine) {
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          element.blur();
        }
      });
    }

    element.addEventListener('blur', () => {
      const text = element.textContent.trim();
      localStorage.setItem(key, text);
      showToast('Profile updated & saved!');
    });
  }

  setupEditable(nameEl, STORAGE_KEYS.NAME, true);
  setupEditable(titleEl, STORAGE_KEYS.TITLE, true);
  setupEditable(statusEl, STORAGE_KEYS.STATUS, true);
  setupEditable(bioEl, STORAGE_KEYS.BIO, false);

  // --------------------------------------------------------------------------
  // Clock & Calendar Engine
  // --------------------------------------------------------------------------
  function updateClock() {
    const now = new Date();
    const rawHours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // 12h vs 24h formatting
    let displayHours = rawHours;
    let period = '';

    if (!is24Hour) {
      period = rawHours >= 12 ? 'PM' : 'AM';
      displayHours = rawHours % 12 || 12;
      elAmPm.textContent = period;
      elAmPm.style.display = 'inline-block';
    } else {
      elAmPm.style.display = 'none';
    }

    elHours.textContent = String(displayHours).padStart(2, '0');
    elMinutes.textContent = String(minutes).padStart(2, '0');
    elSeconds.textContent = String(seconds).padStart(2, '0');

    // Calendar Date
    const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    elDate.textContent = now.toLocaleDateString(undefined, dateOptions);

    // Dynamic Greeting based on raw 24-hour time
    let greeting = 'Good Evening';
    let icon = '🌆';

    if (rawHours >= 5 && rawHours < 12) {
      greeting = 'Good Morning';
      icon = '☀️';
    } else if (rawHours >= 12 && rawHours < 18) {
      greeting = 'Good Afternoon';
      icon = '🌤️';
    } else if (rawHours >= 18 && rawHours < 22) {
      greeting = 'Good Evening';
      icon = '🌆';
    } else {
      greeting = 'Late Night Flow';
      icon = '🌙';
    }

    const currentName = nameEl.textContent.trim() || 'Chaoy';
    elGreetingText.textContent = `${greeting}, ${currentName}`;
    elGreetingIcon.textContent = icon;

    // Timezone Information
    try {
      const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const offsetMinutes = -now.getTimezoneOffset();
      const offsetHours = offsetMinutes / 60;
      const offsetSign = offsetHours >= 0 ? '+' : '';
      elTimezoneLabel.textContent = `${tzName} (GMT${offsetSign}${offsetHours})`;
    } catch {
      elTimezoneLabel.textContent = 'Local Time';
    }

    // Day Progression Calculation
    const totalSecondsToday = rawHours * 3600 + minutes * 60 + seconds;
    const totalDaySeconds = 86400;
    const progressPercent = (totalSecondsToday / totalDaySeconds) * 100;
    const remainingSeconds = totalDaySeconds - totalSecondsToday;
    const remainingHours = (remainingSeconds / 3600).toFixed(1);

    elDayProgressBar.style.width = `${progressPercent.toFixed(1)}%`;
    elDayProgressPercent.textContent = `${progressPercent.toFixed(1)}%`;
    elDayProgressDetails.textContent = `${remainingHours} hrs remaining today`;
  }

  // Synchronize clock precisely to start of next second
  function startPreciseClock() {
    updateClock();
    const msUntilNextSecond = 1000 - (new Date().getMilliseconds());
    setTimeout(() => {
      updateClock();
      setInterval(updateClock, 1000);
    }, msUntilNextSecond);
  }

  // --------------------------------------------------------------------------
  // Time Format Toggle (12h / 24h)
  // --------------------------------------------------------------------------
  formatToggleBtn.addEventListener('click', () => {
    is24Hour = !is24Hour;
    localStorage.setItem(STORAGE_KEYS.TIME_FORMAT, is24Hour ? '24h' : '12h');
    formatLabel.textContent = is24Hour ? '24H' : '12H';
    updateClock();
    showToast(`Clock format switched to ${is24Hour ? '24-Hour' : '12-Hour (AM/PM)'}`);
  });

  // --------------------------------------------------------------------------
  // Theme Switching Mechanism
  // --------------------------------------------------------------------------
  const themeLabels = {
    dark: 'Modern Glass',
    cyber: 'Cyber Neon',
    amber: 'Sunset Amber'
  };

  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    currentThemeLabel.textContent = themeLabels[theme] || 'Modern Glass';

    themeOptions.forEach(opt => {
      opt.classList.toggle('active', opt.dataset.theme === theme);
    });
  }

  themeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    themeDropdown.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    themeDropdown.classList.remove('open');
  });

  themeOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const selected = opt.dataset.theme;
      applyTheme(selected);
      themeDropdown.classList.remove('open');
      showToast(`Theme switched to ${themeLabels[selected]}`);
    });
  });

  // --------------------------------------------------------------------------
  // Clipboard Copy Actions
  // --------------------------------------------------------------------------
  copyEmailBtn.addEventListener('click', () => {
    const email = 'chaoy.dev@example.com';
    navigator.clipboard.writeText(email)
      .then(() => {
        showToast('Email copied to clipboard: ' + email);
      })
      .catch(() => {
        showToast('Email: ' + email);
      });
  });

  copyTimestampBtn.addEventListener('click', () => {
    const isoString = new Date().toISOString();
    navigator.clipboard.writeText(isoString)
      .then(() => {
        showToast('ISO Timestamp copied: ' + isoString);
      })
      .catch(() => {
        showToast('ISO: ' + isoString);
      });
  });

  // Interactive Skill Tags
  const skillTags = document.querySelectorAll('.skill-tags .tag');
  skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
      showToast(`Skill: ${tag.textContent}`);
    });
  });

  // --------------------------------------------------------------------------
  // Toast Notification System
  // --------------------------------------------------------------------------
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent-secondary);"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        if (toast.parentElement) {
          toast.parentElement.removeChild(toast);
        }
      }, 250);
    }, 2400);
  }

  // --------------------------------------------------------------------------
  // Initialization
  // --------------------------------------------------------------------------
  restoreSavedContent();
  startPreciseClock();
});
