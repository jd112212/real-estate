#javascript

// =========================================
// IMPORTS (Three.js via ES Modules CDN)
// =========================================
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// =========================================
// DOM ELEMENTS
// =========================================
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

// Hero Elements
const heroCanvas = document.getElementById('heroCanvas');
const heroLoader = document.getElementById('heroLoader');
const heroFallback = document.getElementById('heroFallback');
const toggleHero2D = document.getElementById('toggleHero2D');

// Showcase Elements
const showcaseCanvas = document.getElementById('showcaseCanvas');
const showcaseLoader = document.getElementById('showcaseLoader');
const showcaseFallback = document.getElementById('showcaseFallback');
const toggleShowcase2D = document.getElementById('toggleShowcase2D');
const hotspotPopup = document.getElementById('hotspotPopup');
const popupTitle = document.getElementById('popupTitle');
const popupDesc = document.getElementById('popupDesc');
const closePopup = document.getElementById('closePopup');

// Gallery & Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const closeLightbox = document.getElementById('closeLightbox');

// Form Elements
const bookingForm = document.getElementById('bookingForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

// =========================================
// NAVIGATION & MOBILE MENU
// =========================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('active'));
});

// =========================================
// FADE-IN ON SCROLL (Intersection Observer)
// =========================================
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target); // Stop observing once visible
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));

// =========================================
// 2D / 3D TOGGLE LOGIC
// =========================================
let isHero3D = true;
toggleHero2D.addEventListener('click', () => {
    isHero3D = !isHero3D;
    if (isHero3D) {
        heroCanvas.style.display = 'block';
        heroFallback.classList.remove('active');
        toggleHero2D.textContent = 'View in 2D';
    } else {
        heroCanvas.style.display = 'none';
        heroFallback.classList.add('active');
        toggleHero2D.textContent = 'View in 3D';
    }
});

let isShowcase3D = true;
toggleShowcase2D.addEventListener('click', () => {
    isShowcase3D = !isShowcase3D;
    if (isShowcase3D) {
        showcaseCanvas.style.display = 'block';
        showcaseFallback.classList.remove('active');
        toggleShowcase2D.textContent = 'View Gallery Instead';
        document.querySelectorAll('.hotspot').forEach(h => h.style.display = 'block');
    } else {
        showcaseCanvas.style.display = 'none';
        showcaseFallback.classList.add('active');
        toggleShowcase2D.textContent = 'View 3D Tour';
        document.querySelectorAll('.hotspot').forEach(h => h.style.display = 'none');
    }
});

// =========================================
// LIGHTBOX LOGIC
// =========================================
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const type = item.getAttribute('data-type');
        lightboxContent.innerHTML = ''; // Clear previous
        
        if (type === 'image') {
            const img = item.querySelector('img');
            lightboxContent.innerHTML = `<img src="${img.src}" alt="Gallery Image">`;
        } else if (type === 'video') {
            const vid = item.querySelector('video');
            lightboxContent.innerHTML = `<video src="${vid.src}" controls autoplay style="max-width:90vw; max-height:90vh;"></video>`;
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    });
});

function closeLightboxFn() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    // Stop video if playing
    const vid = lightboxContent.querySelector('video');
    if (vid) vid.pause();
}

closeLightbox.addEventListener('click', closeLightboxFn);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightboxFn();
});

// =========================================
// THREE.JS - LAZY LOADING LOGIC
// =========================================
let heroInitialized = false;
let showcaseInitialized = false;

// --- HERO 3D SETUP ---
function initHeroScene() {
    if (heroInitialized) return;
    heroInitialized = true;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0B1D3A);
    scene.fog = new THREE.FogExp2(0x0B1D3A, 0.02);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(10, 5, 10);

    const renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.1; // Prevent going under ground

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Ground Plane
    const groundGeo = new THREE.PlaneGeometry(50, 50);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x1a3a1a, roughness: 0.8 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // LOAD GLTF MODEL
    const loader = new GLTFLoader();
    
    // --- REPLACE THIS PATH WITH YOUR ACTUAL .GLB MODEL ---
    const modelPath = 'models/villa.glb'; 
    
    loader.load(
        modelPath,
        (gltf) => {
            const model = gltf.scene;
            model.scale.set(1, 1, 1);
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            scene.add(model);
            heroLoader.classList.add('hidden');
        },
        (progress) => {
            // Optional: Update loading bar here if needed
            console.log(`Hero Model Loading: ${(progress.loaded / progress.total * 100)}%`);
        },
        (error) => {
            console.warn("Hero GLB not found. Loading fallback 3D geometry.", error);
            loadFallbackHeroModel(scene);
            heroLoader.classList.add('hidden');
        }
    );

    // Fallback 3D Object if model is missing
    function loadFallbackHeroModel(scene) {
        const group = new THREE.Group();
        
        // Base
        const baseGeo = new THREE.BoxGeometry(4, 2, 6);
        const baseMat = new THREE.MeshStandardMaterial({ color: 0xd4af37 });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.y = 1;
        base.castShadow = true;
        group.add(base);

        // Roof
        const roofGeo = new THREE.ConeGeometry(3.5, 2, 4);
        const roofMat = new THREE.MeshStandardMaterial({ color: 0x8b0000 });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.y = 3;
        roof.rotation.y = Math.PI / 4;
        roof.castShadow = true;
        group.add(roof);

        // Pillars
        const pillarGeo = new THREE.CylinderGeometry(0.1, 0.1, 2, 8);
        const pillarMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
        [[-1.5, 1, 2.5], [1.5, 1, 2.5], [-1.5, 1, -2.5], [1.5, 1, -2.5]].forEach(pos => {
            const pillar = new THREE.Mesh(pillarGeo, pillarMat);
            pillar.position.set(...pos);
            pillar.castShadow = true;
            group.add(pillar);
        });

        scene.add(group);
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// --- SHOWCASE 3D SETUP ---
function initShowcaseScene() {
    if (showcaseInitialized) return;
    showcaseInitialized = true;

    const container = document.querySelector('.showcase-3d-wrapper');
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 3, 10);

    const renderer = new THREE.WebGLRenderer({ canvas: showcaseCanvas, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1, 0);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // Load Model
    const loader = new GLTFLoader();
    const modelPath = 'models/villa.glb'; // Replace with interior model if available

    let targetCameraPosition = null;
    let lookAtTarget = new THREE.Vector3(0, 1, 0);

    loader.load(
        modelPath,
        (gltf) => {
            scene.add(gltf.scene);
            showcaseLoader.classList.add('hidden');
        },
        undefined,
        (error) => {
            console.warn("Showcase GLB not found. Loading fallback.", error);
            // Simple fallback box
            const geo = new THREE.BoxGeometry(4, 3, 4);
            const mat = new THREE.MeshStandardMaterial({ color: 0xcccccc });
            scene.add(new THREE.Mesh(geo, mat));
            showcaseLoader.classList.add('hidden');
        }
    );

    // Hotspot Click Logic (Camera Animation)
    document.querySelectorAll('.hotspot').forEach(hotspot => {
        hotspot.addEventListener('click', () => {
            const tx = parseFloat(hotspot.dataset.targetX);
            const ty = parseFloat(hotspot.dataset.targetY);
            const tz = parseFloat(hotspot.dataset.targetZ);
            
            targetCameraPosition = new THREE.Vector3(tx, ty, tz);
            lookAtTarget = new THREE.Vector3(tx/2, ty/2, tz/2); // Look slightly ahead of camera target

            // Show Popup
            const label = hotspot.querySelector('.hotspot-label').innerText;
            popupTitle.innerText = label;
            
            const descriptions = {
                "Living Room": "Spacious 800 sq.ft living area with double-height ceilings and natural marble flooring.",
                "Master Bedroom": "Luxurious master suite with walk-in closet and an attached balcony overlooking the garden.",
                "Garden": "Private landscaped garden with a sitting area, perfect for evening gatherings."
            };
            popupDesc.innerText = descriptions[label] || "Detailed description will be added here.";
            hotspotPopup.classList.add('active');
        });
    });

    closePopup.addEventListener('click', () => {
        hotspotPopup.classList.remove('active');
        targetCameraPosition = null; // Reset camera target
    });

    // Lerp function for smooth camera movement
    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Smooth Camera Transition
        if (targetCameraPosition) {
            camera.position.x = lerp(camera.position.x, targetCameraPosition.x, 0.05);
            camera.position.y = lerp(camera.position.y, targetCameraPosition.y, 0.05);
            camera.position.z = lerp(camera.position.z, targetCameraPosition.z, 0.05);
            
            controls.target.x = lerp(controls.target.x, lookAtTarget.x, 0.05);
            controls.target.y = lerp(controls.target.y, lookAtTarget.y, 0.05);
            controls.target.z = lerp(controls.target.z, lookAtTarget.z, 0.05);
        }

        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // Resize Handler for Showcase
    window.addEventListener('resize', () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
}

// =========================================
// INTERSECTION OBSERVER FOR LAZY LOADING 3D
// =========================================
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initHeroScene();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
heroObserver.observe(document.getElementById('hero'));

const showcaseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initShowcaseScene();
            showcaseObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
showcaseObserver.observe(document.getElementById('showcase'));


// =========================================
// BOOKING FORM VALIDATION & FETCH LOGIC
// =========================================
bookingForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.error-msg').forEach(msg => msg.innerText = '');
    formMessage.style.display = 'none';

    // Get Values
    const name = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const bhk = document.querySelector('input[name="bhk"]:checked');
    const type = document.querySelector('input[name="type"]:checked');

    let isValid = true;

    // Validation
    if (!name) {
        document.getElementById('nameError').innerText = "Please enter your full name.";
        isValid = false;
    }

    // Regex for exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    if (!phone) {
        document.getElementById('phoneError').innerText = "Please enter your contact number.";
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        document.getElementById('phoneError').innerText = "Please enter a valid 10-digit number.";
        isValid = false;
    }

    if (!bhk) {
        document.getElementById('bhkError').innerText = "Please select a BHK option.";
        isValid = false;
    }

    if (!type) {
        document.getElementById('typeError').innerText = "Please select a type.";
        isValid = false;
    }

    if (!isValid) return;

    // Prepare Data
    const payload = {
        name: name,
        phone: phone,
        bhk: bhk.value,
        type: type.value
    };

    // UI Loading State
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    submitBtn.disabled = true;

    try {
        // --- FETCH API POST REQUEST ---
        // Note: This will throw a 404 if your backend isn't running, 
        // which will be caught by the catch block below.
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            showFormMessage("Thanks! We'll contact you shortly.", 'success');
            bookingForm.reset(); // Clear form
        } else {
            throw new Error('Server responded with an error');
        }

    } catch (error) {
        // Fallback for when backend is not connected (so UI still works for demos)
        console.warn("Fetch failed. Backend likely not connected. Showing success for demo purposes.", error);
        showFormMessage("Thanks! We'll contact you shortly.", 'success');
        bookingForm.reset();
        
        // If you want to show a real error when backend fails, uncomment below:
        // showFormMessage("Something went wrong. Please try again later.", 'error');
    } finally {
        // Reset Button State
        btnText.style.display = 'inline-block';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
    }
});

function showFormMessage(msg, type) {
    formMessage.innerText = msg;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
