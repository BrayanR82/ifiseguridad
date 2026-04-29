(function () {
    if (window.__IFI_I18N_INITIALIZED__) return;
    window.__IFI_I18N_INITIALIZED__ = true;

    const SOURCE_LANG = 'es';
    const STORAGE_KEY = 'ifi-language';
    const COOKIE_NAME = 'googtrans';
    const QUICK_LANGS = [
        { code: 'es', label: 'Español' },
        { code: 'en', label: 'English' },
        { code: 'ca', label: 'Català' },
        { code: 'fr', label: 'Français' },
    ];
    const QUICK_CODES = new Set(QUICK_LANGS.map((lang) => lang.code));
    const PANEL_ID = 'ifi-translate-panel';
    const WIDGET_ID = 'google_translate_element';
    const SELECT_CLASS = 'ifi-language-select';

    function getCookie(name) {
        return document.cookie
            .split(';')
            .map((part) => part.trim())
            .find((part) => part.startsWith(`${name}=`))
            ?.split('=')[1] || '';
    }

    function deleteCookie(name) {
        document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
    }

    function setCookie(name, value) {
        document.cookie = `${name}=${value}; path=/; max-age=31536000; samesite=lax`;
    }

    function getStoredLanguage() {
        const fromStorage = localStorage.getItem(STORAGE_KEY);
        const fromCookie = getCookie(COOKIE_NAME);
        const cookieLang = fromCookie.includes('/') ? fromCookie.split('/').pop() : '';
        const candidate = (fromStorage || cookieLang || SOURCE_LANG).toLowerCase();
        return isQuickLanguage(candidate) ? candidate : SOURCE_LANG;
    }

    function isQuickLanguage(lang) {
        return QUICK_CODES.has((lang || '').toLowerCase());
    }

    function syncDocumentLanguage(lang) {
        document.documentElement.lang = lang || SOURCE_LANG;
    }

    function syncSwitcherValues(lang) {
        const value = isQuickLanguage(lang) ? lang : SOURCE_LANG;
        document.querySelectorAll(`.${SELECT_CLASS}`).forEach((select) => {
            select.value = value;
        });
    }

    function closePanel() {
        const panel = document.getElementById(PANEL_ID);
        if (panel) {
            panel.classList.remove('is-open');
        }
    }

    function openPanel() {
        const panel = document.getElementById(PANEL_ID);
        if (panel) {
            panel.classList.add('is-open');
        }
    }

    function applyLanguage(lang, shouldReload = true) {
        const nextLang = (lang || SOURCE_LANG).toLowerCase();
        localStorage.setItem(STORAGE_KEY, nextLang);
        syncDocumentLanguage(nextLang);

        if (nextLang === SOURCE_LANG) {
            deleteCookie(COOKIE_NAME);
        } else {
            setCookie(COOKIE_NAME, `/es/${nextLang}`);
        }

        syncSwitcherValues(nextLang);
        if (shouldReload) {
            window.location.reload();
        }
    }

    function ensurePanel() {
        let panel = document.getElementById(PANEL_ID);
        if (panel) return panel;

        panel = document.createElement('div');
        panel.id = PANEL_ID;
        panel.className = 'ifi-translate-panel';
        panel.innerHTML = `
            <div class="ifi-translate-panel__header">
                <div>
                    <strong>Más idiomas</strong>
                    <p>La selección se guarda al navegar entre páginas.</p>
                </div>
                <button type="button" class="ifi-translate-panel__close" aria-label="Cerrar">×</button>
            </div>
            <div id="${WIDGET_ID}" class="ifi-translate-widget"></div>
        `;

        document.body.appendChild(panel);

        panel.querySelector('.ifi-translate-panel__close')?.addEventListener('click', closePanel);
        return panel;
    }

    function bindGoogleCombo() {
        const combo = document.querySelector(`#${WIDGET_ID} .goog-te-combo`);
        if (!combo || combo.dataset.ifiBound === 'true') return;

        combo.dataset.ifiBound = 'true';

        const current = getStoredLanguage();
        if (current) {
            combo.value = current;
        }

        combo.addEventListener('change', () => {
            const selected = (combo.value || SOURCE_LANG).toLowerCase();
            if (selected === SOURCE_LANG) {
                deleteCookie(COOKIE_NAME);
            } else {
                setCookie(COOKIE_NAME, `/es/${selected}`);
            }

            localStorage.setItem(STORAGE_KEY, selected);
            syncDocumentLanguage(selected);
            syncSwitcherValues(selected);
            window.location.reload();
        });
    }

    function watchGoogleWidget() {
        const target = document.getElementById(WIDGET_ID);
        if (!target) return;

        const observer = new MutationObserver(() => {
            bindGoogleCombo();
        });

        observer.observe(target, { childList: true, subtree: true });
        bindGoogleCombo();
    }

    function ensureGoogleScript() {
        if (window.google?.translate?.TranslateElement) return;
        if (document.getElementById('ifi-google-translate-script')) return;

        window.googleTranslateElementInit = function googleTranslateElementInit() {
            ensurePanel();
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: SOURCE_LANG,
                    autoDisplay: false,
                },
                WIDGET_ID,
            );
            watchGoogleWidget();
        };

        const script = document.createElement('script');
        script.id = 'ifi-google-translate-script';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.head.appendChild(script);
    }

    function createSwitcher({ compact = false } = {}) {
        const wrapper = document.createElement(compact ? 'li' : 'div');
        wrapper.className = compact ? 'ifi-language-item' : 'ifi-language-switcher';

        const select = document.createElement('select');
        select.className = SELECT_CLASS;
        select.setAttribute('aria-label', 'Selector de idioma');
        select.innerHTML = QUICK_LANGS
            .map((lang) => `<option value="${lang.code}">${lang.label}</option>`)
            .join('');

        select.addEventListener('change', () => {
            closePanel();
            applyLanguage(select.value, true);
        });

        wrapper.appendChild(select);
        return wrapper;
    }

    function mountSwitcher() {
        const desktopHost = document.querySelector('.nav-action-links');
        const mobileHost = document.querySelector('.mobile-nav-links');

        if (desktopHost && !desktopHost.querySelector(`.${SELECT_CLASS}`)) {
            desktopHost.appendChild(createSwitcher());
        }

        // No montar el selector en mobile-nav-links (se usará menú flotante en móvil)
        // if (mobileHost && !mobileHost.querySelector(`.${SELECT_CLASS}`)) {
        //     mobileHost.appendChild(createSwitcher({ compact: true }));
        // }
    }

    function syncFromState() {
        const lang = getStoredLanguage();
        syncDocumentLanguage(lang);
        syncSwitcherValues(lang);

        const panel = document.getElementById(PANEL_ID);
        if (panel) {
            panel.classList.remove('is-open');
        }
    }

    function init() {
        mountSwitcher();
        ensurePanel();
        ensureGoogleScript();
        syncFromState();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }

    window.ifiSetLanguage = applyLanguage;
    window.ifiOpenMoreLanguages = openPanel;
}());