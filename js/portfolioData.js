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
            { id: "certifications", count: 4, suffix: "", label: "Certifications", link: "#credentials", icon: "certificate" },
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
                thumbnail: "./assets/Projects/Automatic_Sorting_Conveyor/Project_1.png",
                heroImage: "./assets/Projects/Automatic_Sorting_Conveyor/Project_1.png",
                videoDemo: "https://drive.google.com/file/d/1k4BGf72hZhxTKJWRC2jscCUzF_1OBTQm/view?usp=sharing",
                // Engineering Gallery: add/remove/reorder freely. Each item = { src, title, caption }.
                // Replace the placeholder "src" paths below with your real project photos.
                gallery: [
                         { src: "./assets/Projects/Automatic_Sorting_Conveyor/01-final-prototype.png", title: "Final Prototype", caption: "Fully assembled conveyor system ready for operation." },
                         { src: "./assets/Projects/Automatic_Sorting_Conveyor/02-pin-interfacing-diagram.png", title: "Pin Interfacing Diagram", caption: "Pin-level connections from the Tiva microcontroller to sensors, LCD, and motor driver." },
                         { src: "./assets/Projects/Automatic_Sorting_Conveyor/04-circuit-schematic.png", title: "Circuit Schematic", caption: "Full schematic showing IR sensors, LED drivers, LCD, and motor control stage." },
                         { src: "./assets/Projects/Automatic_Sorting_Conveyor/03-pcb-layout.jpg", title: "PCB Layout", caption: "Custom PCB routing designed to integrate the control electronics." },
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
    visible: true,
    featured: true,
    title: "Industrial Energy Analytics & Monitoring Dashboard",
    category: "Industrial Data Science & Analytics",
    shortDescription: "An interactive web dashboard for real-time monitoring and analytics of industrial steel plant energy consumption.",
    description: "An end-to-end industrial data analytics system designed to process, clean, and visualize complex power and operational metrics from steel manufacturing facilities to optimize energy efficiency and prevent power factor penalties.",
    problemStatement: "Heavy manufacturing plants generate massive amounts of power operational data but lack accessible, real-time visual tools to detect inefficient energy usage, low power factors, and peak load surges.",
    engineeringApproach: "Developed an automated data ingestion and cleaning pipeline in Python (Pandas/NumPy) paired with an interactive dashboard UI to render real-time telemetry, power consumption trends, and load profiles.",
    software: "Built using Python, Pandas for data preprocessing, scikit-learn for regression/classification/clustering models, and Streamlit for dynamic analytics visualization and deployment.",
    components: ["Steel Plant Dataset (35,040 readings)", "Python 3.x", "Pandas Dataframe Engine", "scikit-learn ML Models", "Interactive Dashboard UI"],
    tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "scikit-learn", "Streamlit", "Data Analytics"],
    challenges: "Cleaning raw industrial time-series datasets containing missing sensor readings, high-frequency noise, and aligning multi-variable power factor lag/lead channels.",
    results: "Successfully built an operational dashboard capable of highlighting high-load cycles, identifying power factor inefficiencies, and streamlining energy management for plant operations.",
    media: {
        thumbnail: "./assets/Projects/steel-analytics/01-dataset-overview.png",
        heroImage: "./assets/Projects/steel-analytics/01-dataset-overview_thumbnail.jpg",
        videoDemo: "https://drive.google.com/file/d/your-demo-video-link/view?usp=sharing",
        gallery: [
            { 
                src: "./assets/Projects/steel-analytics/01-dataset-overview.png", 
                title: "Dataset Overview", 
                caption: "Live KPI metrics (35,040 readings, 0 missing values) with cleaned data preview." 
            },
            { 
                src: "./assets/Projects/steel-analytics/02-eda-explorer.png", 
                title: "EDA Explorer", 
                caption: "Custom scatter plot builder showing correlation between energy usage and power factor, color-coded by load type." 
            },
            { 
                src: "./assets/Projects/steel-analytics/03-model-prediction.png", 
                title: "Live Model Prediction", 
                caption: "Real-time energy usage and load type prediction with confidence scoring and anomaly detection." 
            },
            { 
                src: "./assets/Projects/steel-analytics/04-cluster-explorer.png", 
                title: "Cluster Explorer", 
                caption: "PCA-projected K-Means clustering revealing 3 distinct plant operating states." 
            },
            { 
                src: "./assets/Projects/steel-analytics/05-feature-importance.png", 
                title: "Feature Importance", 
                caption: "Ranked Ridge Regression coefficients showing which sensor readings most influence energy consumption." 
            }
        ]
    },
    links: {
        github: "https://github.com/andreyas-dev/steel-energy-analytics-dashboard",
        demo: "https://steel-energy-analytics.streamlit.app",
        docs: "https://drive.google.com/file/d/10oKqBGG7eiR998I8gKkdy0OEHkMtK1Uu/view?usp=sharing"
    }
},
        {
    id: "proj-3",
    visible: true,
    featured: true,
    title: "Beam Stabilization Using PID System",
    category: "Embedded Control Systems",
    shortDescription: "Real-time beam stabilization system using differential BLDC motor thrust, controlled by a bare-metal PID controller on a TM4C123 microcontroller with MPU6050 IMU feedback.",
    description: "A TM4C123-based closed-loop control system that balances a pivoted beam by driving two BLDC motors differentially. Beam angle is estimated via an MPU6050 IMU (accelerometer + gyro fused with a complementary filter), and a discrete PID loop running on bare-metal C computes real-time thrust corrections sent to the ESCs via PWM.",
    problemStatement: "A pivoted beam under gravity and external disturbances cannot hold a level (0°) position without continuous, fast corrective torque — this requires accurate angle sensing and a real-time embedded control loop rather than manual or open-loop actuation.",
    engineeringApproach: "Designed and implemented a full embedded control pipeline: MPU6050 sensor fusion for roll-angle estimation, a custom discrete PID controller (P/I/D terms with anti-windup clamping) computed every 10 ms, and differential PWM signals sent to two ESCs to translate control effort into restoring torque. Included ESC arming/safety sequencing so the system never enters balance mode with stalled motors.",
    mechanicalDesign: "Pivoted beam built on a wood base using a drone-frame (plastic) structure, an 8mm steel/aluminum shaft with bearings for smooth rotation, a metal joint as the pivot point, and ice-cream-stick supports for the belt/wiring path. Two BLDC motors with DJI 550 propellers mounted at each end of the beam for differential thrust.",
    electronics: "TM4C123GH6PM LaunchPad (ARM Cortex-M4, 80 MHz) as the controller; two 1400KV BLDC motors driven by 30A ESCs; MPU6050 IMU over I2C; two current sensors (0–5V analog, ±30A) for motor load monitoring; laser transmitter/receiver pair for position/alignment reference; 12V/50A regulated power supply. Custom PCB designed in Proteus (schematic capture, footprint assignment, routing, DRC, Gerber export) to host the TM4C123 module and interconnects.",
    software: "Bare-metal C firmware — PLL/clock init, UART telemetry, I2C driver for the MPU6050, PWM generation for ESC control, timer-based RPM capture on two channels, ADC-based current sensing with calibration, and a custom PID module (PID_Init, PID_Compute, anti-windup, output clamping) tuned with Kp = 0.9, Ki = 0.05, Kd = 0.15. Real-time telemetry (RPM, PWM pulse widths, motor current, roll angle) streamed over UART.",
    components: ["TM4C123GH6PM LaunchPad", "2x BLDC Motor (1400KV)", "2x 30A ESC", "MPU6050 IMU", "2x Current Sensor", "Laser Transmitter/Receiver Pair", "12V/50A Power Supply", "DJI 550 Propellers", "Custom PCB"],
    tools: ["Proteus", "Embedded C", "PID Control Theory", "I2C", "PWM", "ADC", "UART"],
    challenges: "Tuning PID gains to minimize oscillation and overshoot while maintaining fast disturbance rejection; MPU6050 offset calibration to remove mounting/gravity bias; preventing motor stall during startup via a controlled arming sequence; managing mixed 3.3V/5V power rails across sensors and ESCs; filtering noisy IMU data with a complementary filter for stable angle estimates.",
    results: "Achieved autonomous, near-zero beam tilt with active disturbance rejection; live RPM, current, and roll-angle telemetry validated via UART; functional PCB fabricated and integrated into the hardware prototype.",
    media: {
        thumbnail: "././assets/Projects/Beam_Stabilization_Using_PID_System/Beam_Stabilization_Using_PID_System.png",
        heroImage: "./assets/Projects/Beam_Stabilization_Using_PID_System/Beam_Stabilization_Using_PID_System_Hero.png",
        videoDemo: "https://drive.google.com/file/d/1mnd-A9DBWW1y1y4gcqiUpeN2SLVv3h_0/view?usp=sharing",
        gallery: [
            { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", title: "Final Prototype", caption: "Assembled beam with dual BLDC motors and TM4C123 control board." },
            { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", title: "Mechanical Design", caption: "Pivoted beam on wood base with bearing-mounted shaft." },
            { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", title: "Wiring", caption: "Current sensor and ESC ground connections." },
            { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", title: "Testing", caption: "Live balancing test with UART telemetry monitoring." },
            { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", title: "PCB Design", caption: "Custom PCB schematic and copper layer designed in Proteus." },
            { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", title: "Circuit Schematics", caption: "Proteus schematic showing TM4C123 pin connections." },
            { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", title: "Control Flow", caption: "PID control loop: sensor read, error compute, PWM update." }
        ]
    },
    links: {
        github: "https://github.com/andreyas-dev",
        demo: "https://drive.google.com/file/d/1mnd-A9DBWW1y1y4gcqiUpeN2SLVv3h_0/view?usp=sharingQ",
        docs: "https://drive.google.com/file/d/1234567890/view?usp=sharing"
    }
}
]
};
