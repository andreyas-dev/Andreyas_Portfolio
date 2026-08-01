// js/portfolioData.js - Central configuration for all portfolio data

/**
 * Utility functions for formatting external media and document links
 */
const PortfolioMediaHelper = {
    /**
     * Converts Google Drive sharing/view links to preview/embed URLs
     * Supported formats:
     * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
     * - https://drive.google.com/open?id=FILE_ID
     * - https://drive.google.com/uc?id=FILE_ID
     */
    formatDrivePreviewUrl: function(url) {
        if (!url || typeof url !== 'string') return url;
        const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        if (fileIdMatch && fileIdMatch[1]) {
            return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
        }
        return url;
    },

    /**
     * Converts YouTube watch/short URLs to embed URLs
     * Supported formats:
     * - https://www.youtube.com/watch?v=VIDEO_ID
     * - https://youtu.be/VIDEO_ID
     * - https://www.youtube.com/embed/VIDEO_ID
     */
    formatYouTubeEmbedUrl: function(url) {
        if (!url || typeof url !== 'string') return url;
        if (url.includes('youtube.com/embed/')) return url;
        
        let videoId = null;
        const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
        if (watchMatch && watchMatch[1]) {
            videoId = watchMatch[1];
        } else {
            const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
            if (shortMatch && shortMatch[1]) {
                videoId = shortMatch[1];
            }
        }
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}?rel=0`;
        }
        return url;
    },

    /**
     * Normalizes any media/document link to prevent invalid protocol issues
     */
    sanitizeLink: function(url) {
        if (!url || url === '#' || url.trim() === '') return '#';
        const trimmed = url.trim();
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:') || trimmed.startsWith('tel:') || trimmed.startsWith('./') || trimmed.startsWith('/') || trimmed.startsWith('#')) {
            return trimmed;
        }
        return `https://${trimmed}`;
    }
};

window.PortfolioMediaHelper = PortfolioMediaHelper;

window.portfolioData = {
    // SECTION TOGGLES: Set any section to false to temporarily hide it from the website
    sectionToggles: {
        skills: true,
        process: true,
        projects: true,
        experience: true,
        education: true,
        credentials: true,
        research: true
    },

    personal: {
        fullName: "Andreyas",
        brandName: "Andreyas",
        brandSubtext: "MECHATRONICS • ROBOTICS • AI",
        logoImg: "./assets/tech_logo.svg",
        logoFallbackImg: "./assets/tech_logo.svg",
        profileImg: "./assets/profile.png",
        title: "Final-Year Mechatronics & Control Engineering Student",
        tagline: "Engineering intelligent systems where mechanics, electronics, and software work together to solve real-world challenges.",
        location: "Lahore, Punjab, Pakistan",
        locationShort: "Lahore, Pakistan",
        statusText: "Available for Hire",
        email: "eng.andreyas@gmail.com",
        phone: "+92 326 6876694",
        whatsapp: "https://wa.me/923266876694",
        resumeUrl: "https://drive.google.com/file/d/1xvDwGY0CQW6W--veGhllWcaK9AWb9gdu/view?usp=sharing",
        socials: {
            github: "https://github.com/andreyas-dev",
            linkedin: "https://www.linkedin.com/in/eng-andreyas/",
            whatsapp: "https://wa.me/923266876694",
            email: "mailto:eng.andreyas@gmail.com",
            locationMap: "https://maps.google.com/?q=Lahore,Punjab,Pakistan"
        },
        specialties: [
            { icon: "bot", label: "Robotics" },
            { icon: "cpu", label: "Embedded Systems" },
            { icon: "brain", label: "AI/ML" },
            { icon: "box", label: "CAD Design" }
        ],
        stats: [
            { id: "github", count: 10, suffix: "+", label: "GitHub Projects", link: "https://github.com/andreyas-dev", icon: "github" },
            { id: "connections", count: 4.5, suffix: "k+", label: "Connections", link: "https://www.linkedin.com/in/eng-andreyas/", icon: "linkedin" },
            { id: "certifications", count: 5, suffix: "", label: "Certifications", link: "#credentials", icon: "certificate" },
            { id: "internships", count: 2, suffix: "", label: "Internships", link: "#experience", icon: "briefcase" }
        ]
    },

    about: {
    paragraphs: [
    "I am a Mechatronics & Control Engineering student at the University of Engineering and Technology (UET), Lahore, with a strong interest in robotics, automation, embedded systems, and artificial intelligence. I enjoy developing innovative engineering solutions that integrate hardware and software.",

    "Through academic projects and internships, I have gained practical experience in embedded systems, computer vision, MATLAB simulation, and automation. I am committed to continuous learning and building technologies that solve real-world engineering challenges."
],

    highlights: [
    {
        icon: "map-pin",
        text: "Based in Lahore, Punjab, Pakistan"
    },
    {
        icon: "graduation-cap",
        text: "B.Sc. Mechatronics & Control Engineering (Expected 2027)"
    },
    {
        icon: "train",
        text: "Engineering Intern | Pakistan Railways"
    },
    {
        icon: "briefcase",
        text: "AI/ML Intern | DevelopersHub Corporation"
    },
    {
        icon: "cpu",
        text: "Focused on Robotics, Embedded Systems & AI"
    }
]
},

    skills: [
        {
            category: "Programming Languages",
            icon: "code",
            tags: ["C", "Python", "MATLAB", "JavaScript", "HTML / CSS"]
        },
        {
            category: "Simulation Tools",
            icon: "activity",
            tags: ["MATLAB / Simulink", "Proteus", "CNC Simulator", "Fritzing"]
        },
        {
            category: "Hardware Platforms",
            icon: "cpu",
            tags: ["Tiva TM4C123GH6PM","STM32 (ARM Cortex)", "ESP32 / ESP8266", "Arduino"]
        },
        {
            category: "AI & Data Science",
            icon: "brain",
            tags: ["OpenCV", "NumPy", "Pandas", "Scikit-learn", "Matplotlib"]
        },
        {
            category: "Tools & Technologies",
            icon: "wrench",
            tags: ["Visual Studio Code","Git","GitHub","Jupyter Notebook","Keil µVision","SolidWorks"]
        },
        {
            category: "Soft Skills",
            icon: "users",
            tags: ["Problem Solving","Analytical Thinking","Technical Communication","Collaboration","Project Management","Team Leadership"]
        }
    ],

    process: [
    {
        icon: "lightbulb",
        title: "1. Analyze & Define",
        description: "Understand project objectives, identify constraints, and define clear engineering requirements before development begins."
    },
    {
        icon: "pen-tool",
        title: "2. Design & Plan",
        description: "Develop system architecture, evaluate design alternatives, and select the most effective hardware and software solutions."
    },
    {
        icon: "terminal",
        title: "3. Build & Implement",
        description: "Transform concepts into functional solutions through programming, system integration, prototyping, and iterative development."
    },
    {
        icon: "activity",
        title: "4. Test & Improve",
        description: "Validate system performance, troubleshoot issues, optimize functionality, and continuously refine the final solution."
    }
],

    experience: [
    {
        title: "Engineering Intern",
        organization: "Pakistan Railways",
        period: "Jul 2025 – Aug 2025", // e.g. Jun 2025 – Aug 2025
        description: "Worked on engineering and technical tasks related to railway operations, gaining practical exposure to industrial systems and engineering workflows.",
        docLink: "https://drive.google.com/file/d/1DilMUOYw1bP_LE0kEQTfXndy3M3FlufQ/view?usp=sharing", // Internship Certificate
        docLabel: "VIEW INTERNSHIP CERTIFICATE"
    },
    {
        title: "AI & Machine Learning Intern (Remote)",
        organization: "DevelopersHub Corporation",
        period: "Jul 2025 – Sep 2025", // e.g. Jul 2026 – Aug 2026
        description: "Completed a remote internship focused on Artificial Intelligence and Machine Learning, working with Python, data analysis, and modern AI tools while collaborating in a remote development environment.",
        docLink: "https://drive.google.com/file/d/1eDCtC5iRtX5-J-Kp0y0WirO-m1YNAgln/view?usp=sharing", // Internship Certificate
        docLabel: "VIEW INTERNSHIP CERTIFICATE"
    }
],

    education: [
    {
        degree: "B.Sc. Mechatronics & Control Engineering",
        institution: "University of Engineering and Technology (UET), Lahore",
        period: "2023 – 2027 (expected)",
        description: "Developing expertise in robotics, embedded systems, automation, control engineering, and intelligent system design through academic coursework and hands-on engineering projects."
    },
],

    credentials: {
    certifications: [
        {
            title: "Google IT Automation with Python Professional Certificate (Google • Coursera)",
            description: "Built practical skills in Python programming, automation, Git, and IT system administration.",
            link: "https://www.coursera.org/account/accomplishments/specialization/TIPIEG1EB325",
            linkLabel: "View Certificate"
        },
        {
            title: "Google AI Essentials (Google • Coursera)",
            description: "Learned the fundamentals of generative AI, prompt engineering, and responsible AI practices.",
            link: "https://www.coursera.org/account/accomplishments/specialization/NGV7P4AIE7GP",
            linkLabel: "View Certificate"
        },
        {
            title: "Social Media Marketing (Learning With Earning)",
            description: "Built practical knowledge of digital marketing, branding, and audience engagement strategies.",
            link: "https://drive.google.com/file/d/1OGBPMc4CAnzvFadpbIbNarxmPzbOLPYq/view?usp=sharing",
            linkLabel: "View Certificate"
        },
        {
            title: "Video Editing & Animation (Learning With Earning)",
            description: "Developed practical skills in video editing, motion graphics, and visual content creation.",
            link: "https://drive.google.com/file/d/1VS89KpahjvRzwpRS3bt4sKRaiS2fI-xt/view?usp=sharing",
            linkLabel: "View Certificate"
        }
    ],

        awards: [
        {
            title: "Vice President – UET Science Society",
            description: "Elected Vice President for the 2026–2027 tenure, leading technical initiatives, student engagement, and society activities.",
            link: "https://drive.google.com/file/d/1OfnIOT0LgijdAAVPPR04jskJyuEnlZp9/view?usp=sharing",
            linkLabel: "View Appointment Letter"
        },
        {
            title: "PEEF Merit-Based Scholarship",
            description: "Awarded a merit-based scholarship in recognition of academic performance and educational excellence.",
            link: "https://drive.google.com/file/d/1FkL93orF4kUooDMBpPcUsQSIuRVS50uS/view?usp=sharing",
            linkLabel: "View Certificate"
        },
        {
            title: "2-Day Space Training Camp 2025 (SUPARCO • RESOLVE • UCP • UET Lahore)",
            description: "Successfully completed a national space technology training camp focused on aerospace and space science.",
            link: "https://drive.google.com/file/d/19chBMbICZGraJ7wBSqle3Fv1bYpa-tzm/view?usp=sharing",
            linkLabel: "View Certificate"
        }
    ],
    },

    research: [
    {
        icon: "cpu",
        title: "Robotics & Automation",
        description: "Interested in designing intelligent robotic systems and automation solutions that integrate mechanical design, electronics, control systems, and software for real-world industrial applications.",
        link: "#",
        linkLabel: "Future Research Focus"
    },
    {
        icon: "microchip",
        title: "Embedded Systems & Intelligent Devices",
        description: "Exploring embedded hardware and microcontroller-based systems, focusing on sensor integration, real-time control, and reliable intelligent device development.",
        link: "#",
        linkLabel: "Future Research Focus"
    },
    {
        icon: "brain",
        title: "Artificial Intelligence & Computer Vision",
        description: "Interested in applying artificial intelligence, machine learning, and computer vision to develop intelligent systems capable of perception, decision-making, and autonomous operation.",
        link: "#",
        linkLabel: "Future Research Focus"
    }
],

    projects: [
        {
            id: "proj-1",
            visible: true,
            featured: true,
            title: "Automated Object Sorting Conveyor System",
            category: "Embedded Systems & Industrial Automation",

            shortDescription:"Designed and developed a TM4C123GH6PM-based conveyor system capable of detecting, counting, and sorting objects using multiple IR sensors, with real-time LCD monitoring and emergency stop functionality.",

            description:"This embedded systems project focused on developing an automated conveyor prototype for object detection, counting, and sorting. The system integrates a TM4C123GH6PM (Tiva C Series) microcontroller, four IR sensors, a NEMA-17 stepper motor driven through a TB6600 driver, a custom PCB, and a 16×2 LCD for real-time monitoring. The firmware controls conveyor movement, processes sensor inputs, updates object counts, and manages safety through an emergency stop mechanism and LED status indicators. The project provided hands-on experience in embedded programming, motor control, sensor interfacing, PCB implementation, and system integration for industrial automation applications.",

            problemStatement:"Industrial material handling often requires reliable object detection, counting, and sorting. The objective of this project was to develop a low-cost embedded conveyor system capable of automating these tasks while providing real-time monitoring and operational safety.",

            engineeringApproach:"A TM4C123GH6PM microcontroller was used as the central controller to process inputs from multiple IR sensors, control the conveyor using PWM signals through a TB6600 stepper motor driver, update object counts on a 16×2 LCD, and manage LED indicators and emergency stop logic. The hardware was integrated on a custom PCB, while the conveyor structure was assembled using mechanical components including rollers, bearings, shafts, and a belt.",

            mechanicalDesign:"Designed and assembled a compact conveyor mechanism using a wooden frame, conveyor belt, rollers, shaft, bearings, and shaft coupler. The mechanical system was driven by a NEMA-17 stepper motor to transport objects across multiple sensing locations. The prototype used manually positioned guide sticks for directing objects into designated collection bins.",

            electronics:"Implemented an embedded control system using the TM4C123GH6PM (Tiva C LaunchPad), TB6600 stepper motor driver, NEMA-17 stepper motor, four IR sensors, a custom PCB, BC547 transistor circuits for LED driving, a 16×2 LCD, emergency stop input, regulated 5V power module, and a 12V motor power supply.",

            software:"Developed firmware in Embedded C using direct GPIO programming. Implemented object detection, software debouncing, conveyor motor control, LCD driver functions, LED status management, emergency stop handling, object counting logic, and real-time system monitoring.",

            components: ["TM4C123GH6PM (Tiva C LaunchPad)",
                        "NEMA-17 Stepper Motor",
                        "TB6600 Stepper Motor Driver",
                        "IR Sensors (3x)",
                        "16×2 LCD",
                        "Custom PCB",
                        "BC547 Transistors",
                        "LED Indicators",
                        "Push Button",
                        "12V DC Power Supply",
                        "5V Power Module",
                        "Conveyor Belt",
                        "Rollers",
                        "Ball Bearings",
                        "Shaft",
                        "Shaft Coupler",
                        "Wooden Frame",
                        "Resistors",
                        "Potentiometer",
                        "Jumper Wires"
                        ],

            tools: [
                    "Keil uVison",
                    "Embedded C",
                    "TM4C123GH6PM",
                    "ARM Cortex-M4",
                    "PWM",
                    "GPIO Programming",
                    "PCB Design",
                    "Embedded Systems",
                    "IR Sensor Interfacing",
                    "Stepper Motor Control",
                    "LCD Interfacing"
                  ],

            challenges:"Major challenges included developing reliable embedded control logic, synchronizing conveyor movement with multiple IR sensors, implementing software debouncing to eliminate false triggers, integrating the LCD without timing issues, and ensuring immediate system shutdown through the emergency stop mechanism. These challenges were addressed through structured control logic, software delays, modular firmware design, and extensive hardware testing.",

            results:"Successfully developed a working embedded conveyor prototype capable of conveyor control, multi-sensor object detection, object counting, LCD status display, LED-based system indication, and emergency stop functionality. A custom PCB was designed and implemented to integrate the electronics. The report does not provide quantitative performance metrics such as sorting accuracy or throughput.",


             media: {
                thumbnail: "./assets/Projects/Project_1.png",
                heroImage: "./assets/Projects/Project_1.png",
                videoDemo: "https://drive.google.com/file/d/1k4BGf72hZhxTKJWRC2jscCUzF_1OBTQm/view?usp=sharing",
                // Engineering Gallery: add/remove/reorder freely. Each item = { src, title, caption }.
                // Replace the placeholder "src" paths below with your real project photos.
                gallery: [
                    { src: "./assets/Projects/Project_1.png", title: "Final Prototype", caption: "Fully assembled conveyor system ready for operation." },
                    { src: "./assets/Projects/Project_1.png", title: "Mechanical Design", caption: "Conveyor frame, rollers, and shaft assembly." },
                    { src: "./assets/Projects/Project_1.png", title: "PCB Layout", caption: "Custom PCB designed to integrate the control electronics." },
                    { src: "./assets/Projects/Project_1.png", title: "PCB Assembly", caption: "Soldered and populated control board." },
                    { src: "./assets/Projects/Project_1.png", title: "Circuit Diagram", caption: "Schematic for the IR sensing and motor driver stage." },
                    { src: "./assets/Projects/Project_1.png", title: "Wiring", caption: "Sensor and power wiring across the conveyor frame." },
                    { src: "./assets/Projects/Project_1.png", title: "Sensors", caption: "IR sensor placement for object detection." },
                    { src: "./assets/Projects/Project_1.png", title: "Testing", caption: "Hardware-in-the-loop testing of sorting logic." },
                    { src: "./assets/Projects/Project_1.png", title: "LCD Display", caption: "Real-time object count and system status." }
                ]
            },
            links: {
                github: "https://github.com/andreyas-dev/Automated_Object_Sorting_Conveyor_System",
                demo: "https://drive.google.com/file/d/1k4BGf72hZhxTKJWRC2jscCUzF_1OBTQm/view?usp=sharing",
                docs: "https://drive.google.com/file/d/1Ep2h8FP8KNRRB7ML_DTaFVl3vILM1rPe/view?usp=sharing"
            }
        },
        {
            id: "proj-2",
            visible: false,
            featured: true,
            title: "Smart Prosthetic Arm with EMG Control",
            category: "Biomedical & Embedded",
            shortDescription: "A low-cost, 3D-printed bionic arm controlled by surface electromyography (sEMG) signals.",
            description: "A low-cost, 3D-printed bionic arm controlled by surface electromyography (sEMG) signals from the user's residual limb.",
            problemStatement: "Commercial bionic prosthetics are prohibitively expensive for amputees in developing nations, often costing upwards of $10,000.",
            engineeringApproach: "Designed an open-source, easily reproducible mechanical assembly paired with a custom low-cost EMG signal conditioning circuit.",
            mechanicalDesign: "Tendon-driven finger actuation with elastic return to mimic human tendons. Modular socket design allows for patient-specific customization.",
            electronics: "Custom instrumentation amplifier circuit for sEMG extraction, active filtering to remove noise, and an ESP32 for digital signal processing.",
            software: "Implemented a Support Vector Machine (SVM) machine learning classifier running on the edge to distinguish between 5 distinct hand gestures.",
            components: ["ESP32", "MyoWare Muscle Sensor", "N20 Micro Gear Motors", "Nylon Tension Strings", "3D PLA Parts"],
            tools: ["ESP32", "sEMG Sensors", "Fusion 360", "Machine Learning", "C++"],
            challenges: "Filtering out 60Hz power line noise from the microvolt-level muscle signals without destroying the original signal bandwidth.",
            results: "Achieved 92% gesture classification accuracy in live trials. Reduced total manufacturing cost to under $150.",
            media: {
                thumbnail: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=1200",
                heroImage: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=1200",
                videoDemo: "https://drive.google.com/file/d/1k4BGf72hZhxTKJWRC2jscCUzF_1OBTQm/view?usp=sharing",
                // Engineering Gallery: add/remove/reorder freely. Each item = { src, title, caption }.
                gallery: [
                    { src: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=1200", title: "Final Prototype", caption: "Assembled 3D-printed prosthetic arm." },
                    { src: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=1200", title: "CAD Model", caption: "Fusion 360 model of the tendon-driven finger assembly." },
                    { src: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=1200", title: "Mechanical Design", caption: "Modular socket for patient-specific fitting." },
                    { src: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=1200", title: "Circuit Diagram", caption: "sEMG instrumentation amplifier and filtering stage." },
                    { src: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=1200", title: "Sensors", caption: "MyoWare muscle sensor placement on residual limb." },
                    { src: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=1200", title: "Testing", caption: "Live gesture classification trials." },
                    { src: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=1200", title: "Simulation Results", caption: "SVM classifier accuracy across 5 gesture classes." }
                ]
            },
            links: {
                github: "https://github.com/andreyas-dev",
                demo: "https://drive.google.com/file/d/1k4BGf72hZhxTKJWRC2jscCUzF_1OBTQm/view?usp=sharing",
                docs: "https://drive.google.com/file/d/1234567890/view?usp=sharing"
            }
        },
        {
            id: "proj-3",
            visible: false,
            featured: true,
            title: "Automated Optical Inspection System",
            category: "Computer Vision & Automation",
            shortDescription: "High-speed computer vision system for real-time defect detection on PCB manufacturing lines.",
            description: "High-speed computer vision system for real-time defect detection on PCB manufacturing lines, utilizing custom lighting and edge AI.",
            problemStatement: "Manual inspection of high-density PCBs is slow and error-prone, leading to bottlenecks in production.",
            engineeringApproach: "Developed an integrated hardware-software solution combining high-framerate industrial cameras with a TensorRT-optimized YOLOv8 model.",
            mechanicalDesign: "Designed a vibration-isolated camera gantry with a darkroom enclosure to eliminate ambient light interference.",
            electronics: "Custom LED strobe controller synchronized with camera exposure triggers to capture blur-free images of moving PCBs.",
            software: "Python and C++ using OpenCV and TensorRT for inference. React dashboard for real-time statistics.",
            components: ["NVIDIA Jetson Orin", "Basler GigE Camera", "Custom LED Strobe Driver", "Omron Linear Actuators"],
            tools: ["OpenCV", "TensorRT", "YOLOv8", "NVIDIA Jetson", "C++", "Python"],
            challenges: "Achieving sub-50ms inference times while maintaining high accuracy on microscopic solder joint defects.",
            results: "Increased inspection throughput by 400% compared to human operators. Achieved 99.7% true positive defect detection rate.",
            media: {
                thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
                heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
                videoDemo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                // Engineering Gallery: add/remove/reorder freely. Each item = { src, title, caption }.
                gallery: [
                    { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", title: "Final Prototype", caption: "Camera gantry and inspection enclosure." },
                    { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", title: "Mechanical Design", caption: "Vibration-isolated gantry with darkroom housing." },
                    { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", title: "Wiring", caption: "LED strobe controller wiring synced to camera trigger." },
                    { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", title: "Testing", caption: "Live defect detection on the PCB manufacturing line." },
                    { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", title: "LCD/GUI Screens", caption: "React dashboard showing real-time inspection statistics." },
                    { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", title: "Simulation Results", caption: "YOLOv8 inference benchmark on solder joint defects." },
                    { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", title: "Flowcharts", caption: "End-to-end inspection pipeline from capture to classification." }
                ]
            },
            links: {
                github: "https://github.com/andreyas-dev",
                demo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                docs: "https://drive.google.com/file/d/1234567890/view?usp=sharing"
            }
        }
    ]
};
