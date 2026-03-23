/**
 * PORTAFOLIO VISUAL - JIMENA GIL
 * Archivo principal de JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. SELECCIÓN DE ELEMENTOS DEL DOM
    // ==========================================
    // Navegación y Menú
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Lightbox (Visor de fotos)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const images = document.querySelectorAll('.gallery-img');
    const closeBtn = document.querySelector('.close-btn');
    
    // Pantalla de carga
    const splash = document.getElementById('splash-screen');


    // ==========================================
    // 2. PANTALLA DE CARGA (SPLASH SCREEN)
    // ==========================================
    window.addEventListener('load', () => {
        setTimeout(() => {
            splash.classList.add('fade-out');
        }, 1500);
    });


    // ==========================================
    // 3. EFECTOS DE NAVEGACIÓN
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // ==========================================
    // 4. MENÚ HAMBURGUESA (MÓVIL)
    // ==========================================
    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });


    // ==========================================
    // 5. VISOR DE IMÁGENES (LIGHTBOX)
    // ==========================================
    images.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = 'none';
        }
    });


    // ==========================================
    // 6. ANIMACIONES AL HACER SCROLL
    // ==========================================
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => appearOnScroll.observe(el));


    // ==========================================
    // 7. FILTROS DINÁMICOS DE GALERÍA
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Al cargar la página, ocultamos de inicio las que NO queremos en "Destacado"
    images.forEach(img => {
        if (img.getAttribute('data-featured') !== 'true') {
            img.classList.add('hide');
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            images.forEach(img => {
                const isFeatured = img.getAttribute('data-featured') === 'true';
                
                if (filterValue === 'all') {
                    if (isFeatured) {
                        img.classList.remove('hide');
                        img.classList.add('visible'); // Asegura que no se quede invisible
                    } else {
                        img.classList.add('hide');
                    }
                } else {
                    if (img.getAttribute('data-category') === filterValue) {
                        img.classList.remove('hide');
                        img.classList.add('visible'); // Asegura que no se quede invisible
                    } else {
                        img.classList.add('hide');
                    }
                }
            });
        });
    });

}); // <-- ESTA ES LA LLAVE DE CIERRE FINAL