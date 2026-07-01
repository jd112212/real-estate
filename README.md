# real-estate

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Cholas Empire | Premium Villas</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Custom Stylesheet -->
    <link rel="stylesheet" href="style.css">

    <!-- Three.js Import Map for ES Modules (No build tools required) -->
    <script type="importmap">
        {
            "imports": {
                "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
                "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
            }
        }
    </script>
</head>
<body>

    <!-- ================= NAVIGATION ================= -->
    <header id="navbar">
        <div class="nav-container">
            <a href="#hero" class="logo">The Cholas <span>Empire</span></a>
            <nav class="nav-links">
                <a href="#hero">Home</a>
                <a href="#showcase">Project</a>
                <a href="#team">Agents</a>
                <a href="#booking">Book Now</a>
            </nav>
            <a href="#booking" class="nav-cta">Schedule Visit</a>
            <!-- Mobile Menu Toggle -->
            <button class="mobile-toggle" id="mobileToggle">
                <i class="fas fa-bars"></i>
            </button>
        </div>
        <!-- Mobile Menu Dropdown -->
        <div class="mobile-menu" id="mobileMenu">
            <a href="#hero">Home</a>
            <a href="#showcase">Project</a>
            <a href="#team">Agents</a>
            <a href="#booking">Book Now</a>
        </div>
    </header>

    <main>
        <!-- ================= 1. HERO SECTION (3D) ================= -->
        <section id="hero">
            <div class="hero-3d-wrapper">
                <!-- Loading Spinner -->
                <div id="heroLoader" class="loader">
                    <div class="spinner"></div>
                    <p>Loading 3D Experience...</p>
                </div>
                
                <!-- 2D Fallback (Hidden by default) -->
                <div id="heroFallback" class="hero-fallback">
                    <img src="images/hero-fallback.jpg" alt="Villa Exterior">
                </div>

                <!-- Three.js Canvas will be injected here by script.js -->
                <canvas id="heroCanvas"></canvas>
                
                <!-- Hero Content Overlay -->
                <div class="hero-content">
                    <h1 class="fade-up">The Cholas Empire</h1>
                    <p class="fade-up delay-1">Where Heritage Meets Modern Luxury Living</p>
                    <div class="hero-buttons fade-up delay-2">
                        <a href="#booking" class="btn btn-primary">Book Now</a>
                        <button id="toggleHero2D" class="btn btn-outline">View in 2D</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================= 2. SHOWCASE / VIRTUAL TOUR SECTION ================= -->
        <section id="showcase" class="section-padding">
            <div class="container">
                <div class="section-header fade-in">
                    <h2>Virtual Tour & Gallery</h2>
                    <p>Explore every corner of your future home</p>
                </div>

                <!-- 3D Showcase Viewer -->
                <div class="showcase-3d-wrapper fade-in">
                    <div id="showcaseLoader" class="loader">
                        <div class="spinner"></div>
                        <p>Loading Interactive Model...</p>
                    </div>

                    <div id="showcaseFallback" class="showcase-fallback">
                        <img src="images/showcase-fallback.jpg" alt="Villa Interior">
                    </div>

                    <canvas id="showcaseCanvas"></canvas>
                    
                    <!-- Hotspot Markers (Positioned over canvas via CSS) -->
                    <div class="hotspot" id="hotspot-living" data-target-x="5" data-target-y="2" data-target-z="0" style="top: 60%; left: 40%;">
                        <div class="hotspot-icon"><i class="fas fa-plus"></i></div>
                        <div class="hotspot-label">Living Room</div>
                    </div>
                    <div class="hotspot" id="hotspot-bedroom" data-target-x="-3" data-target-y="2" data-target-z="5" style="top: 40%; left: 70%;">
                        <div class="hotspot-icon"><i class="fas fa-plus"></i></div>
                        <div class="hotspot-label">Master Bedroom</div>
                    </div>
                    <div class="hotspot" id="hotspot-garden" data-target-x="0" data-target-y="1" data-target-z="-8" style="top: 75%; left: 20%;">
                        <div class="hotspot-icon"><i class="fas fa-plus"></i></div>
                        <div class="hotspot-label">Garden</div>
                    </div>

                    <!-- Info Popup for Hotspots -->
                    <div id="hotspotPopup" class="hotspot-popup">
                        <button id="closePopup" class="popup-close">&times;</button>
                        <h4 id="popupTitle">Room Name</h4>
                        <p id="popupDesc">Description goes here.</p>
                    </div>

                    <button id="toggleShowcase2D" class="btn btn-outline toggle-2d-btn">View Gallery Instead</button>
                </div>

                <!-- Photo & Video Gallery Grid -->
                <div class="gallery-grid fade-in">
                    <div class="gallery-item" data-type="image">
                        <img src="images/gallery-1.jpg" alt="Villa View 1">
                    </div>
                    <div class="gallery-item" data-type="video">
                        <video src="videos/walkthrough-1.mp4" muted loop playsinline></video>
                        <div class="play-icon"><i class="fas fa-play"></i></div>
                    </div>
                    <div class="gallery-item" data-type="image">
                        <img src="images/gallery-2.jpg" alt="Villa View 2">
                    </div>
                    <div class="gallery-item" data-type="image">
                        <img src="images/gallery-3.jpg" alt="Villa View 3">
                    </div>
                    <div class="gallery-item" data-type="video">
                        <video src="videos/walkthrough-2.mp4" muted loop playsinline></video>
                        <div class="play-icon"><i class="fas fa-play"></i></div>
                    </div>
                    <div class="gallery-item" data-type="image">
                        <img src="images/gallery-4.jpg" alt="Villa View 4">
                    </div>
                </div>

                <!-- Project Details -->
                <div class="project-details fade-in">
                    <div class="details-card">
                        <i class="fas fa-map-marker-alt"></i>
                        <h3>Location</h3>
                        <p>OMR, Chennai - Next to IT Corridor</p>
                    </div>
                    <div class="details-card">
                        <i class="fas fa-home"></i>
                        <h3>Configurations</h3>
                        <p>2 BHK & 3 BHK Luxury Villas</p>
                    </div>
                    <div class="details-card">
                        <i class="fas fa-tag"></i>
                        <h3>Price Range</h3>
                        <p>₹1.2 Cr - ₹2.5 Cr</p>
                    </div>
                    <div class="details-card">
                        <i class="fas fa-swimming-pool"></i>
                        <h3>Amenities</h3>
                        <p>Pool, Gym, Clubhouse, 24/7 Security</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Lightbox Modal -->
        <div id="lightbox" class="lightbox">
            <button id="closeLightbox" class="lightbox-close">&times;</button>
            <div id="lightboxContent" class="lightbox-content"></div>
        </div>

        <!-- ================= 3. EMPLOYEE / AGENT SECTION ================= -->
        <section id="team" class="section-padding bg-light">
            <div class="container">
                <div class="section-header fade-in">
                    <h2>Our Expert Agents</h2>
                    <p>Dedicated professionals to guide you home</p>
                </div>
                <div class="team-grid">
                    <!-- Agent 1 -->
                    <div class="team-card fade-in">
                        <div class="team-img-wrapper">
                            <img src="images/agent-1.jpg" alt="Agent 1">
                        </div>
                        <h3>Rajesh Kumar</h3>
                        <p class="designation">Senior Sales Manager</p>
                        <div class="team-contact">
                            <a href="tel:+919876543210"><i class="fas fa-phone"></i> +91 98765 43210</a>
                            <a href="mailto:rajesh@cholasempire.com"><i class="fas fa-envelope"></i> rajesh@cholasempire.com</a>
                        </div>
                    </div>
                    <!-- Agent 2 -->
                    <div class="team-card fade-in">
                        <div class="team-img-wrapper">
                            <img src="images/agent-2.jpg" alt="Agent 2">
                        </div>
                        <h3>Priya Sharma</h3>
                        <p class="designation">Real Estate Advisor</p>
                        <div class="team-contact">
                            <a href="tel:+919876543211"><i class="fas fa-phone"></i> +91 98765 43211</a>
                            <a href="mailto:priya@cholasempire.com"><i class="fas fa-envelope"></i> priya@cholasempire.com</a>
                        </div>
                    </div>
                    <!-- Agent 3 -->
                    <div class="team-card fade-in">
                        <div class="team-img-wrapper">
                            <img src="images/agent-3.jpg" alt="Agent 3">
                        </div>
                        <h3>Arun Venkatesh</h3>
                        <p class="designation">Customer Relations Head</p>
                        <div class="team-contact">
                            <a href="tel:+919876543212"><i class="fas fa-phone"></i> +91 98765 43212</a>
                            <a href="mailto:arun@cholasempire.com"><i class="fas fa-envelope"></i> arun@cholasempire.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================= 4. BOOKING FORM SECTION ================= -->
        <section id="booking" class="section-padding">
            <div class="container form-container">
                <div class="section-header fade-in">
                    <h2>Book Your Dream Villa</h2>
                    <p>Fill in your details and we will get back to you within an hour</p>
                </div>
                
                <form id="bookingForm" class="booking-form fade-in" novalidate>
                    <div class="form-group">
                        <label for="fullName">Full Name *</label>
                        <input type="text" id="fullName" name="fullName" required placeholder="John Doe">
                        <span class="error-msg" id="nameError"></span>
                    </div>

                    <div class="form-group">
                        <label for="phone">Contact Number *</label>
                        <input type="tel" id="phone" name="phone" required pattern="\d{10}" placeholder="9876543210" maxlength="10">
                        <span class="error-msg" id="phoneError"></span>
                    </div>

                    <div class="form-group">
                        <label>BHK Option *</label>
                        <div class="radio-group">
                            <label class="radio-label">
                                <input type="radio" name="bhk" value="2 BHK" required> 
                                <span>2 BHK</span>
                            </label>
                            <label class="radio-label">
                                <input type="radio" name="bhk" value="3 BHK"> 
                                <span>3 BHK</span>
                            </label>
                        </div>
                        <span class="error-msg" id="bhkError"></span>
                    </div>

                    <div class="form-group">
                        <label>Type *</label>
                        <div class="radio-group">
                            <label class="radio-label">
                                <input type="radio" name="type" value="Land" required> 
                                <span>Land</span>
                            </label>
                            <label class="radio-label">
                                <input type="radio" name="type" value="Property"> 
                                <span>Property</span>
                            </label>
                        </div>
                        <span class="error-msg" id="typeError"></span>
                    </div>

                    <button type="submit" id="submitBtn" class="btn btn-primary btn-full">
                        <span class="btn-text">Submit Inquiry</span>
                        <span class="btn-loader" style="display:none;"><i class="fas fa-circle-notch fa-spin"></i> Sending...</span>
                    </button>

                    <!-- Success / Error Messages -->
                    <div id="formMessage" class="form-message" style="display: none;"></div>
                </form>
            </div>
        </section>
    </main>

    <!-- ================= 5. FOOTER ================= -->
    <footer id="footer">
        <div class="container footer-grid">
            <div class="footer-col">
                <h3>The Cholas Empire</h3>
                <p>Redefining luxury living in Chennai with heritage-inspired architecture and modern amenities.</p>
            </div>
            <div class="footer-col">
                <h4>Contact Info</h4>
                <p><i class="fas fa-map-marker-alt"></i> 123 OMR Road, Chennai, TN 600096</p>
                <p><i class="fas fa-phone"></i> +91 44 1234 5678</p>
                <p><i class="fas fa-envelope"></i> info@cholasempire.com</p>
            </div>
            <div class="footer-col">
                <h4>Follow Us</h4>
                <div class="social-links">
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-youtube"></i></a>
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2023 The Cholas Empire. All rights reserved.</p>
        </div>
    </footer>

    <!-- Main Script (Module type for Three.js) -->
    <script type="module" src="script.js"></script>
</body>
</html>
