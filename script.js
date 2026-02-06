document.addEventListener('DOMContentLoaded', function() {
    

    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.width = '100%';
            header.style.zIndex = '1000';
            header.style.backgroundColor = 'rgba(0, 0, 94, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
            header.style.transition = 'all 0.3s ease';
        } else {
            header.style.position = 'relative';
            header.style.backgroundColor = '#00005e';
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });

    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.style.color = '#ffffff';
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.style.color = '#b8c5d1';
                        link.style.textDecoration = 'underline';
                    } else {
                        link.style.textDecoration = 'none';
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);


    //  Product Card Hover Effects & Interactions

    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        const productImg = product.querySelector('img');
        const productPrice = product.querySelector('p');
        
        // Add hover effect
        product.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
            if (productImg) {
                productImg.style.transform = 'scale(1.1)';
                productImg.style.transition = 'transform 0.3s ease';
            }
        });
        
        product.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            if (productImg) {
                productImg.style.transform = 'scale(1)';
            }
        });
        
        // Add click to view larger image
        product.addEventListener('click', function() {
            if (productImg) {
                openImageLightbox(productImg.src, product.querySelector('h3').textContent);
            }
        });
        
        // Add "Add to Cart" button dynamically
        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = 'View Details';
        addToCartBtn.className = 'add-to-cart-btn';
        addToCartBtn.style.cssText = `
            background-color: #00005e;
            color: #ffffff;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            margin-top: 1rem;
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(10px);
        `;
        
        addToCartBtn.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#b8c5d1';
            this.style.color = '#00005e';
            this.style.transform = 'scale(1.05)';
        });
        
        addToCartBtn.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#00005e';
            this.style.color = '#ffffff';
            this.style.transform = 'scale(1)';
        });
        
        product.appendChild(addToCartBtn);
        
        product.addEventListener('mouseenter', function() {
            addToCartBtn.style.opacity = '1';
            addToCartBtn.style.transform = 'translateY(0)';
        });
        
        product.addEventListener('mouseleave', function() {
            addToCartBtn.style.opacity = '0';
            addToCartBtn.style.transform = 'translateY(10px)';
        });
    });

    function openImageLightbox(imageSrc, title) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        // Create image container
        const imgContainer = document.createElement('div');
        imgContainer.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            text-align: center;
        `;
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.cssText = `
            max-width: 100%;
            max-height: 80vh;
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        `;
        
        const titleText = document.createElement('h3');
        titleText.textContent = title;
        titleText.style.cssText = `
            color: #ffffff;
            margin-top: 1rem;
            font-size: 1.5rem;
        `;
        
        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: #ffffff;
            font-size: 3rem;
            cursor: pointer;
            line-height: 1;
            padding: 0;
            width: 40px;
            height: 40px;
            transition: transform 0.3s ease;
        `;
        
        closeBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(90deg) scale(1.2)';
        });
        
        closeBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0) scale(1)';
        });
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        function closeLightbox() {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }, 300);
        }
        

        const escapeHandler = function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
        
        imgContainer.appendChild(closeBtn);
        imgContainer.appendChild(img);
        imgContainer.appendChild(titleText);
        lightbox.appendChild(imgContainer);
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    products.forEach((product, index) => {
        product.style.opacity = '0';
        product.style.transform = 'translateY(30px)';
        product.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(product);
    });
    
    // Observe testimonials
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach((testimonial, index) => {
        testimonial.style.opacity = '0';
        testimonial.style.transform = 'translateX(-30px)';
        testimonial.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(testimonial);
    });


    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');

    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger-menu';
    hamburger.innerHTML = '☰';
    hamburger.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: #ffffff;
        font-size: 2rem;
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    header.insertBefore(hamburger, nav);
    
    // Toggle menu
    hamburger.addEventListener('click', function() {
        navUl.classList.toggle('active');
        hamburger.innerHTML = navUl.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navUl.classList.remove('active');
            hamburger.innerHTML = '☰';
        });
    });
    
    // Media query for mobile
    function handleMobileMenu() {
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
            navUl.style.cssText = `
                position: fixed;
                top: 100px;
                left: -100%;
                width: 100%;
                background-color: rgba(0, 0, 94, 0.98);
                flex-direction: column;
                padding: 2rem 0;
                transition: left 0.3s ease;
                z-index: 999;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            `;
            
            navUl.querySelectorAll('li').forEach(li => {
                li.style.margin = '1rem 0';
                li.style.textAlign = 'center';
            });
            
            if (navUl.classList.contains('active')) {
                navUl.style.left = '0';
            }
        } else {
            hamburger.style.display = 'none';
            navUl.style.cssText = '';
            navUl.classList.remove('active');
            navUl.querySelectorAll('li').forEach(li => {
                li.style.margin = '';
                li.style.textAlign = '';
            });
        }
    }
    
    window.addEventListener('resize', handleMobileMenu);
    handleMobileMenu();

    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #00005e;
        color: #ffffff;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;
    
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#b8c5d1';
        this.style.color = '#00005e';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#00005e';
        this.style.color = '#ffffff';
        this.style.transform = 'scale(1)';
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });


    if (testimonials.length > 0) {
        let currentTestimonial = 0;
        
        function rotateTestimonials() {
            testimonials.forEach((testimonial, index) => {
                if (index === currentTestimonial) {
                    testimonial.style.transform = 'scale(1.05)';
                    testimonial.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
                    testimonial.style.transition = 'all 0.3s ease';
                } else {
                    testimonial.style.transform = 'scale(1)';
                    testimonial.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                }
            });
            
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }
        

        setInterval(rotateTestimonials, 4000);
    }


    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('h1, p');
            
            if (scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                hero.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.5;
                
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
            }
        });
    }


    const sizeTableRows = document.querySelectorAll('.size-table tbody tr');
    sizeTableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#b8c5d1';
            this.style.color = '#00005e';
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            const isEven = Array.from(sizeTableRows).indexOf(this) % 2 === 1;
            this.style.backgroundColor = isEven ? '#f9f9f9' : '#ffffff';
            this.style.color = '#00005e';
            this.style.transform = 'scale(1)';
        });
    });


    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });


    const socialLinks = document.querySelectorAll('.social-media a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
            this.style.transition = 'all 0.3s ease';
            this.style.color = '#b8c5d1';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.color = '#ffffff';
        });
    });


    products.forEach(product => {
        const priceElement = product.querySelector('p');
        if (priceElement && priceElement.textContent.includes('$')) {
            priceElement.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2)';
                this.style.color = '#b8c5d1';
                this.style.transition = 'all 0.3s ease';
            });
            
            priceElement.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.color = '';
            });
        }
    });

    const allSections = document.querySelectorAll('section');
    allSections.forEach((section, index) => {
        if (!section.classList.contains('revealed')) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
        }
    });
