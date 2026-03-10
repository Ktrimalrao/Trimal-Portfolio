/* ========= SIDEBAR TOGGLE (MOBILE) ========= */
const sidebar = document.getElementById('sidebar');
const sidebarOpenBtn = document.getElementById('sidebar-open');
const sidebarCloseBtn = document.getElementById('sidebar-close');

if (sidebarOpenBtn) {
    sidebarOpenBtn.addEventListener('click', () => {
        sidebar.classList.add('sidebar--open');
    });
}

if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener('click', () => {
        sidebar.classList.remove('sidebar--open');
    });
}

/* Close sidebar on link click (mobile) */
const sidebarLinks = document.querySelectorAll('.sidebar__link');
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 800) {
            sidebar.classList.remove('sidebar--open');
        }
    });
});

/* ========= ACTIVE LINK ON SCROLL ========= */
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 80;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.sidebar__nav a[href="#${sectionId}"]`);

        if (!navLink) return;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('active-link');
        } else {
            navLink.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

/* ========= DARK / LIGHT THEME ========= */
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const themeIcon = document.getElementById('theme-icon');
const themeIconMobile = document.getElementById('theme-icon-mobile');
const THEME_KEY = 'ktr-portfolio-theme';

function applyTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light-theme');
        if (themeIcon) themeIcon.classList.replace('uil-moon', 'uil-sun');
        if (themeIconMobile) themeIconMobile.classList.replace('uil-moon', 'uil-sun');
    } else {
        body.classList.remove('light-theme');
        if (themeIcon) themeIcon.classList.replace('uil-sun', 'uil-moon');
        if (themeIconMobile) themeIconMobile.classList.replace('uil-sun', 'uil-moon');
    }
}

/* Load saved theme */
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === 'light' || savedTheme === 'dark') {
    applyTheme(savedTheme);
} else {
    /* Auto-detect system preference on first visit */
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
}

/* Toggle event */
function toggleTheme() {
    const isLight = body.classList.contains('light-theme');
    const newTheme = isLight ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

/* ========= PROJECTS DATA & FILTERING ========= */
const projectsContainer = document.getElementById('projects-container');
const filterButtons = document.querySelectorAll('.projects__filter');

const PROJECT_THUMB_BASE = 'assets/project-thumbnails/';
const PROJECT_THUMB_PLACEHOLDER =
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
            <defs>
                <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stop-color="#111827"/>
                    <stop offset="1" stop-color="#0b1220"/>
                </linearGradient>
            </defs>
            <rect width="1200" height="675" fill="url(#g)"/>
            <rect x="60" y="60" width="1080" height="555" rx="26" fill="rgba(79,70,229,0.12)" stroke="rgba(129,140,248,0.35)" stroke-width="2"/>
            <g fill="rgba(156,163,175,0.85)" font-family="Segoe UI, system-ui, -apple-system, sans-serif">
                <text x="100" y="360" font-size="38" font-weight="600">Project Thumbnail</text>
                <text x="100" y="410" font-size="22">Add an image in assets/project-thumbnails/</text>
            </g>
        </svg>`
    );

const projects = [
    {
        id: 'azure-pipeline',
        title: 'Azure Big Data Engineering Pipeline (Olist E-commerce Dataset)',
        category: 'data-eng',
        featured: true,
        badge: 'Data Engineering',
        description:
            'End-to-end big data engineering pipeline on Microsoft Azure for the Olist e-commerce dataset, automating ingestion from GitHub and MySQL, transforming it with PySpark, and serving analytics through Medallion architecture and Synapse.',
        tech: [
            'Azure Data Factory',
            'Azure Data Lake Gen2',
            'Azure Databricks',
            'Azure Synapse Analytics',
            'PySpark',
            'MongoDB',
            'SQL'
        ],
        thumbnail: PROJECT_THUMB_BASE + 'azure-pipeline.png',
        github: 'https://lnkd.in/gaE87yyG',
        demo: 'https://www.linkedin.com/posts/k-trimal-rao-397924253_microsoftazure-azurecloud-azuredatalake-activity-7365781710661177345-FFvK'
    },
    {
        id: 'medicine-reco',
        title: 'Medicine Recommendation System',
        category: 'ml-ai',
        featured: true,
        badge: 'ML & AI',
        description:
            'Machine learning-based healthcare platform that predicts diseases from user symptoms and recommends relevant medicines, diet plans, workout routines, and preventive precautions through a Flask web interface deployed on Microsoft Azure.',
        tech: ['Python', 'Scikit-learn', 'Flask', 'Pandas', 'NumPy', 'Microsoft Azure'],
        thumbnail: PROJECT_THUMB_BASE + 'medicine-system.png',
        github: 'https://lnkd.in/dMZTc9pb',
        demo: 'https://www.linkedin.com/posts/k-trimal-rao-397924253_healthcare-machinelearning-flask-activity-7217209249683165184-DxMP'
    },
    {
        id: 'diamond-price',
        title: 'Diamond Price Prediction',
        category: 'ml-ai',
        featured: false,
        badge: 'ML & AI',
        description:
            'Regression-based pricing model that predicts diamond prices using carat, cut, color, clarity, and additional engineered features, demonstrating data cleaning, exploratory analysis, regularization techniques, and metrics-driven model comparison for robust value estimation.',
        tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
        thumbnail: PROJECT_THUMB_BASE + 'diamond-price.png',
        github: 'https://lnkd.in/gpMUzjGD',
        demo: 'https://www.linkedin.com/posts/k-trimal-rao-397924253_machinelearning-project-quality-activity-7145842759952646144-RZtT'
    },
    {
        id: 'heart-disease',
        title: 'Heart Disease Prediction System',
        category: 'ml-ai',
        featured: false,
        badge: 'ML & AI',
        description:
            'Classification-driven ML system that estimates heart disease risk using clinical attributes such as age, cholesterol, blood pressure, BMI, and heart rate, applying feature scaling, algorithm benchmarking, and evaluation with ROC and confusion-matrix based metrics.',
        tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
        thumbnail: PROJECT_THUMB_BASE + 'heart-disease.png',
        github: 'https://lnkd.in/ddhhrqS8',
        demo: 'https://www.linkedin.com/posts/k-trimal-rao-397924253_python-pandas-numpy-activity-7127330807513329665-Uzu8'
    },
    {
        id: 'diabetes-prediction',
        title: 'Diabetes Prediction System',
        category: 'ml-ai',
        featured: false,
        badge: 'ML & AI',
        description:
            'End-to-end machine learning application that predicts diabetes risk from patient medical attributes, encapsulating preprocessing, model training and evaluation, and real-time inference through a Flask web interface hosted on Microsoft Azure.',
        tech: ['Python', 'Scikit-learn', 'Flask', 'Microsoft Azure'],
        thumbnail: PROJECT_THUMB_BASE + 'diabetes.png',
        github: 'https://lnkd.in/d6MZexfm',
        demo: 'https://www.linkedin.com/posts/k-trimal-rao-397924253_connections-diabetesprediction-datascience-activity-7097217625872564226-YPO2'
    },
    {
        id: 'algerian-fires',
        title: 'Algerian Forest Fires Prediction (FWI)',
        category: 'ml-ai',
        featured: false,
        badge: 'ML & AI',
        description:
            'Regression model that predicts the Forest Weather Index for Algerian forest regions, transforming meteorological variables, analyzing seasonality and trends, and deploying the predictor via Flask and AWS Elastic Beanstalk to study wildfire risk conditions.',
        tech: ['Python', 'Pandas', 'Scikit-learn', 'Flask', 'AWS Elastic Beanstalk'],
        thumbnail: PROJECT_THUMB_BASE + 'forest-fires.png',
        github: 'https://lnkd.in/d685piTN',
        demo: 'https://www.linkedin.com/posts/k-trimal-rao-397924253_data-dataanalysis-machinelearning-activity-7077660879948779522-0B4p'
    },
    {
        id: 'flipkart-scraper',
        title: 'Flipkart Review Web Scraper',
        category: 'other',
        featured: false,
        badge: 'Data Engineering',
        description:
            'Web scraping application that collects Flipkart product reviews, parses ratings and comments using BeautifulSoup, and stores structured records in MongoDB collections to power downstream analytics, dashboards, and text-based sentiment exploration.',
        tech: ['Python', 'BeautifulSoup', 'Flask', 'MongoDB'],
        thumbnail: PROJECT_THUMB_BASE + 'flipkart-scraper.png',
        github: 'https://lnkd.in/dAKhXRKc',
        demo: ''
    },
    {
        id: 'lung-cancer',
        title: 'Lung Cancer Detection using U-Net + CNN',
        category: 'other',
        featured: true,
        badge: 'ML & AI',
        description:
            'Deep learning pipeline that combines U-Net-based lung region segmentation with CNN classification on CT scan slices, enabling highly accurate lung cancer detection and interpretable feature extraction for improved clinical decision support.',
        tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
        thumbnail: PROJECT_THUMB_BASE + 'lung-cancer.png',
        github: '',
        demo: ''
    },
    {
        id: 'gemini-llm',
        title: 'Gemini LLM Applications',
        category: 'gen-ai',
        featured: false,
        badge: 'Generative AI',
        description:
            'Suite of Gemini-based generative AI applications that power intelligent text Q&amp;A, image understanding, and multi-turn conversational agents with chat history memory, delivered through interactive Streamlit front-ends.',
        tech: ['Python', 'Streamlit', 'Google Generative AI'],
        thumbnail: PROJECT_THUMB_BASE + 'gemini-llm.png',
        github: 'https://github.com/Ktrimalrao/Gemini_LLM_ChatBot_text-image',
        demo: ''
    },
    {
        id: 'sql-gemini',
        title: 'SQL Query Retrieval Using Gemini LLM',
        category: 'gen-ai',
        featured: false,
        badge: 'Generative AI',
        description:
            'Natural-language-to-SQL retrieval system that converts user questions into SQL queries using Gemini, executes them against a SQLite database, and returns structured results, demonstrating LLM-assisted analytics on top of tabular data.',
        tech: ['Python', 'Streamlit', 'SQLite', 'Gemini API'],
        thumbnail: PROJECT_THUMB_BASE + 'sql-gemini.png',
        github: 'https://github.com/Ktrimalrao/Gemini-pro-sql-llm',
        demo: ''
    }
];

function resolveThumbnail(src) {
    if (!src) return PROJECT_THUMB_PLACEHOLDER;
    return src;
}

function createProjectCard(project) {
    const article = document.createElement('article');
    article.className = 'project-card project-card--enter';
    article.dataset.category = project.category;

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'project-card__image';

    const img = document.createElement('img');
    img.src = resolveThumbnail(project.thumbnail);
    img.alt = project.title;
    img.onerror = () => {
        img.onerror = null;
        img.src = PROJECT_THUMB_PLACEHOLDER;
    };

    const badge = document.createElement('span');
    badge.className = 'project-card__badge';
    badge.textContent = project.badge || 'Project';

    imageWrapper.appendChild(img);
    imageWrapper.appendChild(badge);

    const content = document.createElement('div');
    content.className = 'project-card__content';

    const title = document.createElement('h3');
    title.className = 'project-card__title';
    title.textContent = project.title;

    const desc = document.createElement('p');
    desc.className = 'project-card__description';
    desc.textContent = project.description;

    const techList = document.createElement('ul');
    techList.className = 'project-card__tech';
    (project.tech || []).forEach(t => {
        const li = document.createElement('li');
        li.textContent = t;
        techList.appendChild(li);
    });

    const linksWrapper = document.createElement('div');
    linksWrapper.className = 'project-card__links';

    if (project.github) {
        const githubLink = document.createElement('a');
        githubLink.href = project.github;
        githubLink.target = '_blank';
        githubLink.rel = 'noreferrer';
        githubLink.className = 'project-card__link';
        githubLink.innerHTML = '<i class="bx bxl-github"></i> GitHub';
        linksWrapper.appendChild(githubLink);
    }

    if (project.demo) {
        const demoLink = document.createElement('a');
        demoLink.href = project.demo;
        demoLink.target = '_blank';
        demoLink.rel = 'noreferrer';
        demoLink.className = 'project-card__link';
        demoLink.innerHTML = '<i class="bx bxl-linkedin"></i> LinkedIn';
        linksWrapper.appendChild(demoLink);
    }

    content.appendChild(title);
    content.appendChild(desc);
    content.appendChild(techList);
    content.appendChild(linksWrapper);

    article.appendChild(imageWrapper);
    article.appendChild(content);

    return article;
}

function withGridAnimation(container, fn) {
    if (!container) return;
    container.classList.add('projects__grid--animating');
    fn();
    setTimeout(() => {
        container.classList.remove('projects__grid--animating');
    }, 260);
}

function mountCards(container, items) {
    if (!container) return;
    container.innerHTML = '';
    items.forEach(project => {
        const card = createProjectCard(project);
        container.appendChild(card);
        requestAnimationFrame(() => {
            card.classList.add('project-card--visible');
        });
    });
}

function getFeaturedProjects() {
    const featuredOrder = ['azure-pipeline', 'lung-cancer'];
    return featuredOrder.map(id => projects.find(p => p && p.id === id)).filter(Boolean);
}

function renderFilteredProjects(filter) {
    if (!projectsContainer) return;
    let items = [];

    if (!filter || filter === 'top') {
        items = getFeaturedProjects();
    } else if (filter === 'all') {
        items = projects.slice();
    } else {
        items = projects.filter(p => p.category === filter);
    }

    withGridAnimation(projectsContainer, () => {
        mountCards(projectsContainer, items);
    });
}

if (projectsContainer) {
    renderFilteredProjects('top');
}

if (filterButtons.length && projectsContainer) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter') || 'all';
            filterButtons.forEach(b => b.classList.remove('projects__filter--active'));
            btn.classList.add('projects__filter--active');
            renderFilteredProjects(filter);
        });
    });
}

/* ========= SCROLL REVEAL ANIMATION ========= */
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal--visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.18
        }
    );

    revealElements.forEach(el => observer.observe(el));
} else {
    /* Fallback: reveal everything */
    revealElements.forEach(el => el.classList.add('reveal--visible'));
}

/* ========= SCROLL TOP BUTTON ========= */
const scrollTopBtn = document.getElementById('scroll-top');

function handleScrollTopVisibility() {
    if (!scrollTopBtn) return;
    if (window.scrollY > 360) {
        scrollTopBtn.classList.add('show-scroll');
    } else {
        scrollTopBtn.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', handleScrollTopVisibility);

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ========= CONTACT FORM (FRONT-END ONLY) ========= */
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

if (contactForm) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone') || '';
        const message = formData.get('message');

        if (!name || !email || !message) {
            if (contactStatus) {
                contactStatus.textContent = 'Please fill in all required fields.';
            }
            return;
        }

        const subject = encodeURIComponent(`Portfolio Contact - ${name}`);
        const bodyLines = [
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            '',
            'Message:',
            message
        ];
        const body = encodeURIComponent(bodyLines.join('\n'));

        window.location.href = `mailto:ktrimaljam@gmail.com?subject=${subject}&body=${body}`;

        contactForm.reset();
        if (contactStatus) {
            contactStatus.textContent = 'Opening your email client to send the message...';
        }
        setTimeout(() => {
            if (contactStatus) contactStatus.textContent = '';
        }, 5000);
    });
}

/* ========= OPTIONAL: SWIPER INIT (READY FOR FUTURE USE) ========= */
/* 
   Example if you later add a Swiper container:
   const swiper = new Swiper('.swiper', {
       loop: true,
       spaceBetween: 24,
       slidesPerView: 1,
       pagination: { el: '.swiper-pagination', clickable: true },
       breakpoints: {
           768: { slidesPerView: 2 },
           1024: { slidesPerView: 3 }
       }
   });
*/