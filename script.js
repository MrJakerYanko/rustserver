document.addEventListener('DOMContentLoaded', function() {
    // Прелоадер
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Бургер меню
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    navLinkItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Закрываем меню если оно открыто
            navLinks.classList.remove('active');
            burger.classList.remove('active');
            body.classList.remove('menu-open');
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Фиксированная шапка при скролле
    const header = document.querySelector('.sticky-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Кнопка "Наверх"
    const scrollTopBtn = document.querySelector('.scroll-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Анимация цифр статистики
    const stats = document.querySelectorAll('.stat-value');
    const statsSection = document.querySelector('.about-stats');
    
    function animateStats() {
        const statsPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (statsPosition < screenPosition) {
            stats.forEach(stat => {
                const target = +stat.getAttribute('data-count');
                const increment = target / 50;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    stat.textContent = Math.floor(current).toLocaleString();
                    
                    if (current >= target) {
                        stat.textContent = target.toLocaleString();
                        clearInterval(timer);
                    }
                }, 20);
            });
            
            window.removeEventListener('scroll', animateStats);
        }
    }
    
    window.addEventListener('scroll', animateStats);

    // Аккордеон для особенностей
    const featureMoreBtns = document.querySelectorAll('.feature-more');
    const featureLessBtns = document.querySelectorAll('.feature-less');
    
    featureMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const featureCard = this.closest('.feature-card');
            const featureDetails = featureCard.querySelector('.feature-details');
            const featureContent = featureCard.querySelector('.feature-content');
            
            featureDetails.style.maxHeight = featureDetails.scrollHeight + 'px';
            featureContent.style.display = 'none';
            featureCard.querySelector('.feature-less').style.display = 'block';
        });
    });
    
    featureLessBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const featureCard = this.closest('.feature-card');
            const featureDetails = featureCard.querySelector('.feature-details');
            const featureContent = featureCard.querySelector('.feature-content');
            
            featureDetails.style.maxHeight = '0';
            this.style.display = 'none';
            
            setTimeout(() => {
                featureContent.style.display = 'block';
            }, 300);
        });
    });

    // Табы для гайдов
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Удаляем активный класс у всех ссылок и контента
            tabLinks.forEach(item => item.classList.remove('active'));
            tabContents.forEach(item => item.classList.remove('active'));
            
            // Добавляем активный класс текущей ссылке и соответствующему контенту
            this.classList.add('active');
            document.querySelector(`.tab-content[data-tab="${tabId}"]`).classList.add('active');
        });
    });

    // Галерея - инициализация модального окна
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.createElement('div');
    modal.className = 'modal';
    document.body.appendChild(modal);
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modal.appendChild(modalContent);
    
    const closeModal = document.createElement('span');
    closeModal.className = 'close-modal';
    closeModal.innerHTML = '&times;';
    modalContent.appendChild(closeModal);
    
    const modalImg = document.createElement('img');
    modalContent.appendChild(modalImg);
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            modalImg.src = imgSrc;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Анимации при скролле
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkAnimation() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', checkAnimation);
    checkAnimation(); // Проверить при загрузке страницы
});

// Инициализация анимаций GSAP
document.addEventListener('DOMContentLoaded', function() {
    gsap.from('.hero-content h1', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-content p', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-buttons', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    gsap.from('.scroll-down', {
        duration: 1,
        opacity: 0,
        delay: 1.2,
        ease: 'power3.out'
    });
});
// Функция для получения данных о сервере
async function fetchServerStats() {
    try {
        // Здесь должен быть ваш бекенд или прокси для запроса к Steam API
        // Это примерная реализация, вам нужно настроить свой сервер для запросов
        const response = await fetch('https://your-backend.com/api/server-stats?ip=eu-long.rusticated.com:28010');
        const data = await response.json();
        
        if (data && data.players) {
            document.getElementById('online-count').textContent = data.players.current;
            document.getElementById('server-online').textContent = `${data.players.current}/${data.players.max}`;
        }
    } catch (error) {
        console.error('Ошибка при получении данных сервера:', error);
    }
}

// Таймер до вайпа
function updateWipeTimer() {
    // Пример: вайп каждое 1-е число месяца
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const diff = nextMonth - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('wipe-timer').textContent = 
        `${days} дней ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Копирование IP сервера
function copyServerIP() {
    const ip = document.getElementById('server-ip').textContent;
    navigator.clipboard.writeText(ip).then(() => {
        const copyBtn = document.querySelector('.btn-copy');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Скопировано!';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    });
}

// Форма обратной связи
document.getElementById('question-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById('form-message');
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    
    try {
        // Здесь должен быть ваш бекенд для отправки email
        const response = await fetch('https://your-backend.com/api/send-question', {
            method: 'POST',
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
                to: 'makalex1966@mail.ru'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            messageDiv.textContent = 'Ваш вопрос успешно отправлен! Мы ответим вам в ближайшее время.';
            messageDiv.style.color = 'var(--success)';
            form.reset();
        } else {
            throw new Error('Ошибка при отправке');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        messageDiv.textContent = 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже.';
        messageDiv.style.color = 'var(--danger)';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Отправить вопрос';
        
        setTimeout(() => {
            messageDiv.textContent = '';
        }, 5000);
    }
});

// Обновление данных каждые 5 минут
setInterval(fetchServerStats, 5 * 60 * 1000);
setInterval(updateWipeTimer, 1000);

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    fetchServerStats();
    updateWipeTimer();
    
    // Остальной код из предыдущей версии...
});