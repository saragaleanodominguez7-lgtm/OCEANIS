document.addEventListener('DOMContentLoaded', () => {

    // 1. CAMBIO DE MODO LUZ / NOCHE
    const themeBtn = document.getElementById('theme-toggle');
    const themeText = document.getElementById('theme-text');

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            document.documentElement.classList.toggle('light-mode');
            
            const isLight = document.body.classList.contains('light-mode');
            themeText.textContent = isLight ? 'MODO NOCHE' : 'MODO LUZ';
        });
    }

    // 2. DATOS AMPLIADOS DE LAS CAPAS OCEÁNICAS
    const zonesInfo = {
        epipelagica: {
            title: "Zona Epipelágica (Superficial)",
            badge: "0 – 200 METROS",
            desc: "Capa iluminada donde ocurre la fotosíntesis. Concentra el fitoplancton, corales, tortugas marinas y la mayor actividad biológica del planeta.",
            light: "100% – 10%",
            temp: "20°C a 13°C",
            pressure: "1 a 20 atm"
        },
        mesopelagica: {
            title: "Zona Mesopelágica (Penumbra)",
            badge: "200 – 1000 METROS",
            desc: "La luz solar es insuficiente para la fotosíntesis. Sostiene la mayor biomasa de peces del planeta y migraciones verticales diarias masivas.",
            light: "10% – 1%",
            temp: "13°C a 4°C",
            pressure: "20 a 100 atm"
        },
        batipelagica: {
            title: "Zona Batipelágica (Medianoche)",
            badge: "1000 – 4000 METROS",
            desc: "Oscuridad absoluta salvo por bioluminiscencia. Organismos adaptados a altas presiones y metabolismos lentos para ahorrar energía.",
            light: "0%",
            temp: "4°C a 2°C",
            pressure: "100 a 400 atm"
        },
        abisal: {
            title: "Zona Abisal y Hadal",
            badge: "4000+ METROS",
            desc: "Comprende fosas oceánicas y llanuras profundas. Ecosistemas sustentados por nieve marina y fuentes hidrotermales volcánicas.",
            light: "0%",
            temp: "2°C a 1°C",
            pressure: "400+ atm"
        }
    };

    const depthBtns = document.querySelectorAll('.depth-btn');
    const zoneTitle = document.getElementById('zone-title');
    const zoneBadge = document.getElementById('zone-badge');
    const zoneDesc = document.getElementById('zone-desc');
    const metricLight = document.getElementById('metric-light');
    const metricTemp = document.getElementById('metric-temp');
    const metricPressure = document.getElementById('metric-pressure');

    depthBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            depthBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const key = btn.getAttribute('data-zone');
            const info = zonesInfo[key];

            if (info && zoneTitle) {
                zoneTitle.textContent = info.title;
                zoneBadge.textContent = info.badge;
                zoneDesc.textContent = info.desc;
                metricLight.textContent = info.light;
                metricTemp.textContent = info.temp;
                metricPressure.textContent = info.pressure;
            }
        });
    });

    // 3. FILTRADO DE GALERÍA DE ECOSISTEMAS
    const filterBtns = document.querySelectorAll('.filter-pill');
    const cards = document.querySelectorAll('.cards-grid .card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('is-hidden');
                } else {
                    card.classList.add('is-hidden');
                }
            });
        });
    });

    // 4. VALIDACIÓN DE FORMULARIO DE REGISTRO
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const interes = document.getElementById('interes').value;

            if (!nombre || !email || !interes) {
                showFeedback('Por favor completa todos los campos requeridos.', 'error');
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                showFeedback('Ingresa un correo electrónico válido.', 'error');
                return;
            }

            showFeedback(`¡Registro exitoso! Bienvenido/a a la red OCEANIS, ${nombre}.`, 'success');
            form.reset();
        });
    }

    function showFeedback(message, type) {
        if (!feedback) return;
        feedback.textContent = message;
        feedback.className = `feedback-box ${type}`;
        
        setTimeout(() => {
            feedback.className = 'feedback-box hidden';
        }, 4000);
    }
});