export type Language = "ko" | "en";
export type GenreId = "bauhaus" | "noir" | "vaporwave" | "minimalist";

export interface GenreContent {
    id: GenreId;
    title: string;
    philosophy: string;
    aesthetic: string;
    utility: string;
    criticism: string;
    staffNotes: {
        gemini: string;
        firebase: string;
        cloudrun: string;
    };
    benchmarks: {
        lcp: string; // Largest Contentful Paint target
        cls: string; // Cumulative Layout Shift target
        fid: string; // First Input Delay target
    };
}

export interface TypeDetail {
    id: string;
    tag: string;
    title: string;
    shortDesc: string;
    description: string;
    features: string[];
    stats: Record<string, number>;
    pros: string[];
    cons: string[];
    learningPath: string[];
}

export interface VisionArticle {
    category: string;
    title: string;
    summary: string;
    content: string;
}

export interface TierContent {
    title: string;
    desc: string;
    prompt: string;
    actionBtn: string;
}

export interface MindMapNodeContent {
    id: number;
    title: string;
    desc: string;
    whyImportant: string;
    prompt: string;
    actionBtn: string;
    tools: { name: string; url: string; }[];
    tiers?: Record<string, TierContent>;
}

export const googleEcosystem = {
    idx: {
        title: "Project IDX",
        role: "The Sound Stage (Studio)",
        desc: "Google의 차세대 AI 통합 개발 환경. Director가 Script를 실제로 기록하고 촬영(Build)하는 공간입니다."
    },
    analytics: {
        title: "Google Analytics",
        role: "The Box Office (Audience)",
        desc: "관객의 반응을 데이터로 수집합니다. 어떤 장면(Page)에서 관객이 이탈했는지 분석합니다."
    },
    vitals: {
        title: "Web Vitals / Lighthouse",
        role: "Technical Critic (Reviews)",
        desc: "영화의 기술적 완성도(Performance, SEO, Accessibility)를 공식적으로 심사하는 평론가입니다."
    }
};

export const webGenres: Record<GenreId, GenreContent> = {
    bauhaus: {
        id: "bauhaus",
        title: "Bauhaus (기능적 미니멀리즘)",
        philosophy: "형태는 기능을 따른다. 모든 장식은 배제되며, 오직 유효한 정보만이 디자인의 근거가 된다.",
        aesthetic: "그리드 시스템, 원색 사용, 기하학적 형태, 산세리프 타이포그래피.",
        utility: "복잡한 비즈니스 로직을 명확하게 전달해야 하는 SaaS 및 관리 도구에 최적화.",
        criticism: "AI가 제안한 코드가 지나치게 화려하다면 바우하우스의 정신에 위배됩니다. 불필요한 div와 스타일을 걷어내십시오.",
        staffNotes: {
            gemini: "논리적 구조 설계에 집중합니다. 중첩된 조건문을 평탄화하고 순수 함수 위주로 제안합니다.",
            firebase: "데이터 스키마를 정규화하여 중복을 최소화합니다.",
            cloudrun: "컨테이너의 경량화를 통해 콜드 스타트 시간을 단축합니다."
        },
        benchmarks: { lcp: "< 1.2s", cls: "0.0", fid: "< 50ms" }
    },
    noir: {
        id: "noir",
        title: "Noir (고대비 드라마)",
        philosophy: "어둠 속의 빛. 정보의 위계를 극단적인 명암 대비로 표현하여 시선을 고정시킨다.",
        aesthetic: "딥 블랙 배경, 네온 엑센트, 강한 그림자, 시네마틱한 타이포그래피.",
        utility: "몰입형 스토리텔링, 예술적 포트폴리오, 심야 시간대 사용자 타겟 앱.",
        criticism: "화면 전체가 밝다면 그것은 더 이상 느와르가 아닙니다. 여백(어둠)이 정보를 어떻게 가공하는지 관찰하십시오.",
        staffNotes: {
            gemini: "사용자의 감정을 자극하는 문구와 애니메이션 시퀀스를 설계합니다.",
            firebase: "실시간 동기화 기능을 통해 '흐르는 상태'를 유지합니다.",
            cloudrun: "글로벌 엣지 배포로 전 세계 어디서나 빠른 응답성을 확보합니다."
        },
        benchmarks: { lcp: "< 2.0s", cls: "< 0.1", fid: "< 100ms" }
    },
    vaporwave: {
        id: "vaporwave",
        title: "Vaporwave (복고풍 미래주의)",
        philosophy: "글로벌 네트워크에 대한 찬사와 냉소. 과거의 기술을 현대의 미학으로 재해석한다.",
        aesthetic: "파스텔 핑크/블루, 80-90년대 아이콘, 글리치 효과, 과감한 그라데이션.",
        utility: "커뮤니티 서비스, 엔터테인먼트 플랫폼, AI 실험적 프로젝트.",
        criticism: "완벽하고 매끄러운 디자인은 베이퍼웨이브의 맥락에 어긋납니다. 의도적인 노이즈와 결합을 허용하십시오.",
        staffNotes: {
            gemini: "창의적이고 실험적인 알고리즘을 제안합니다. 할루시네이션조차 예술로 활용합니다.",
            firebase: "NoSQL의 유연함을 극대화하여 다양한 데이터 형태를 수용합니다.",
            cloudrun: "서버리스 오토스케일링으로 트래픽의 급격한 변동에 대응합니다."
        },
        benchmarks: { lcp: "< 2.5s", cls: "< 0.2", fid: "< 100ms" }
    },
    minimalist: {
        id: "minimalist",
        title: "Minimalist (본질주의)",
        philosophy: "적을수록 좋다(Less is more). 사용자에게 필요한 단 하나의 가치에만 집중한다.",
        aesthetic: "방대한 화이트 스페이스, 극도로 절제된 요소, 탁월한 가독성.",
        utility: "메모 앱, 명상 앱, 도구적 가치가 압도적인 유틸리티.",
        criticism: "아이콘 하나조차 무거울 수 있습니다. 그것이 정말 필요한 기능인지 스스로에게 반문하십시오.",
        staffNotes: {
            gemini: "최소한의 코드로 같은 기능을 구현하는 방법을 제시합니다.",
            firebase: "익명 인증 등 사용자 허들을 최소화하는 방향으로 설계합니다.",
            cloudrun: "비용 최적화(Zero-scaling)를 통해 운영 부담을 없앱니다."
        },
        benchmarks: { lcp: "< 1.0s", cls: "0.0", fid: "< 30ms" }
    }
};

export const siteContent = {
    ko: {
        nav: {
            manifesto: "매니페스토",
            diagnosis: "진단받기",
            tools: "도구",
            start: "시작하기"
        },
        hero: {
            badge: "AI-Native Web Design Guide",
            titlePrefix: "기술로 넘보는",
            titleHighlight: "Flow State",
            titleSuffix: "의 영역",
            description: "바우하우스의 정신으로 빚어낸 현대적 웹 가이드. 당신의 프로젝트에 완벽하게 맞는 도구, 환경, 마인드셋을 발견하세요.",
            startDiagnosis: "진단 시작하기",
            exploreMap: "마인드맵 탐험"
        },
        manifesto: {
            title: "THE VIBECODING MANIFESTO",
            subtitle: "In Search of New Aura",
            description: "우리는 코드가 단순한 논리의 나열을 넘어, 창작자의 의도와 에너지가 담긴 '살아있는 유기체'가 되어야 한다고 믿습니다.",
            desc: "디지털 복제 시대의 웹 아트, 그 새로운 가능성을 향하여.",
            footer: "VIBECODINGMAP © 2025",
            items: [
                { icon: "Rocket", title: "기능적 심미성", desc: "형태는 기능을 따른다는 바우하우스의 원칙을 AI 시대의 문법으로 재해석합니다." },
                { icon: "Brain", title: "논리적 직관", desc: "복잡한 비즈니스 로직을 사용자에게 가장 직관적인 형태로 전달하는 구조를 설계합니다." },
                { icon: "CircleDollarSign", title: "가치 중심 개발", desc: "기술적 화려함보다 사용자에게 전달되는 본질적인 가치에 집중하여 개발합니다." },
                { icon: "Map", title: "구조적 서사", desc: "단순한 정보의 전달을 넘어, 사용자가 경험하는 모든 과정을 하나의 이야기로 구성합니다." },
                { icon: "Globe", title: "지속 가능한 생태계", desc: "창작자와 사용자가 함께 성장하며 새로운 가치를 창출하는 선순환 구조를 만듭니다." }
            ]
        },
        diagnosis: {
            questions: [
                {
                    question: "웹을 만들 때 당신이 가장 중요하게 생각하는 가치는?",
                    answers: [
                        { text: "깔끔한 코드와 효율적인 성능 (Logic)", type: "s" },
                        { text: "강렬한 시각적 인상과 감각적인 디자인 (Visual)", type: "a" },
                        { text: "사용자에게 전달되는 따뜻한 감성과 이야기 (Vibe)", type: "b" }
                    ]
                }
            ],
            resultTitle: "당신의 바이브 유형은",
            resultDesc: "당신의 성향을 분석한 결과입니다.",
            checkTypeBtn: "상세 보기",
            restartBtn: "다시 진단하기"
        },
        types: {
            title: "VIBE CODING TYPES",
            items: [
                {
                    id: "s",
                    tag: "Structure",
                    title: "The Architect",
                    shortDesc: "정교한 논리와 구조를 중시하는 설계자입니다.",
                    description: "당신은 시스템의 안정성과 성능을 최우선으로 생각합니다.",
                    features: ["Clean Code", "Optimized Logic", "Scalability"],
                    stats: { logic: 5, visual: 2, energy: 3 },
                    pros: ["안정적인 구축", "용이한 유지보수"],
                    cons: ["시각적 재미 부족", "과도한 설계 시간"],
                    learningPath: ["Advanced TypeScript", "System Design"]
                },
                {
                    id: "a",
                    tag: "Aura",
                    title: "The Artist",
                    shortDesc: "독창적인 미학과 감각을 중시하는 예술가입니다.",
                    description: "당신은 웹을 하나의 예술 작품으로 완성합니다.",
                    features: ["Creative UI", "Interaction", "Visual Impact"],
                    stats: { logic: 2, visual: 5, energy: 4 },
                    pros: ["강렬한 첫인상", "독보적인 아이덴티티"],
                    cons: ["복잡한 구현 방식", "리소스 사용량 높음"],
                    learningPath: ["Three.js", "Framer Motion"]
                },
                {
                    id: "b",
                    tag: "Vibe",
                    title: "The Storyteller",
                    shortDesc: "사용자의 감성과 서사를 중시하는 이야기꾼입니다.",
                    description: "당신은 사람의 마음을 움직이는 경험을 설계합니다.",
                    features: ["User Centric", "Emotional UX", "Narrative"],
                    stats: { logic: 3, visual: 3, energy: 5 },
                    pros: ["높은 사용자 공감", "친숙한 인터페이스"],
                    cons: ["기술적 증명 모호", "주관적 판단 기준"],
                    learningPath: ["UX Psychology", "Narrative Design"]
                }
            ]
        },
        platforms: {
            title: "AI AGENTS FOR VIBE",
            items: [
                { key: "claude", role: "Theoretical Architect", desc: "코드의 구조와 바우하우스적 논리를 정교하게 다듬어줍니다." },
                { key: "chatgpt", role: "Creative Strategist", desc: "영감을 주는 아이디어와 과감한 디자인 시퀀스를 제안합니다." },
                { key: "gemini", role: "Google Ecosystem Director", desc: "Google 문서와 클라우드 인프라를 연결하는 가교 역할을 합니다." }
            ]
        },
        vision: {
            title: "FUTURE VISION NEWS",
            items: [
                { category: "TREND", title: "Liquid Narrative Web", summary: "정형화된 웹을 넘어 사용자의 움직임에 반응하는 액체와 같은 서사 구조의 등장.", content: "Full content here..." },
                { category: "TECH", title: "Vibe Coding with Gemini", summary: "멀티모달 AI를 활용한 시각적 감성 코딩의 시대가 열리고 있습니다.", content: "Full content here..." }
            ]
        },
        mindMap: {
            web: [
                { id: 1, title: "Architecture", desc: "Logic design", whyImportant: "Base", prompt: "Build", actionBtn: "Start", tools: [] },
                { id: 2, title: "Integration", desc: "API connection", whyImportant: "Flow", prompt: "Connect", actionBtn: "Start", tools: [] },
                { id: 3, title: "Artistry", desc: "Visual design", whyImportant: "Aura", prompt: "Paint", actionBtn: "Start", tools: [] },
                { id: 4, title: "Optimization", desc: "Performance", whyImportant: "Speed", prompt: "Refine", actionBtn: "Start", tools: [] },
                { id: 5, title: "Deployment", desc: "Release", whyImportant: "Impact", prompt: "Launch", actionBtn: "Start", tools: [] }
            ],
            app: [
                { id: 1, title: "UX Logic", desc: "Core flow", whyImportant: "Ease", prompt: "Plan", actionBtn: "Start", tools: [] },
                { id: 2, title: "Mobile UI", desc: "Responsive", whyImportant: "Touch", prompt: "Design", actionBtn: "Start", tools: [] },
                { id: 3, title: "Native Feature", desc: "Capability", whyImportant: "Power", prompt: "Code", actionBtn: "Start", tools: [] },
                { id: 4, title: "Beta Test", desc: "Feedback", whyImportant: "Stability", prompt: "Test", actionBtn: "Start", tools: [] },
                { id: 5, title: "Store Launch", desc: "Global reach", whyImportant: "Success", prompt: "Publish", actionBtn: "Start", tools: [] }
            ]
        }
    },
    en: {
        nav: {
            manifesto: "Manifesto",
            diagnosis: "Diagnosis",
            tools: "Tools",
            start: "Get Started"
        },
        hero: {
            badge: "AI-Native Web Design Guide",
            titlePrefix: "Reaching for the",
            titleHighlight: "Flow State",
            titleSuffix: "with Tech",
            description: "A modern web guide crafted with the spirit of Bauhaus. Discover the tools, environments, and mindsets that fit your project perfectly.",
            startDiagnosis: "Start Diagnosis",
            exploreMap: "Explore Map"
        },
        manifesto: {
            title: "THE VIBECODING MANIFESTO",
            subtitle: "In Search of New Aura",
            description: "We believe that code should transcend being a mere sequence of logic and become a 'living organism' imbued with the creator's intent and energy.",
            desc: "Web art in the age of digital reproduction, moving toward new possibilities.",
            footer: "VIBECODINGMAP © 2025",
            items: [
                { icon: "Rocket", title: "Functional Aesthetics", desc: "We reinterpret the Bauhaus principle that 'form follows function' for the AI era." },
                { icon: "Brain", title: "Logical Intuition", desc: "We design structures that deliver complex business logic in the most intuitive form to users." },
                { icon: "CircleDollarSign", title: "Value-Driven Development", desc: "We focus on the essential value delivered to users rather than technical flashiness." },
                { icon: "Map", title: "Structural Narrative", desc: "We go beyond mere info delivery, organizing every user experience into a single story." },
                { icon: "Globe", title: "Sustainable Ecosystem", desc: "We create a virtuous cycle where creators and users grow together to generate new value." }
            ]
        },
        diagnosis: {
            questions: [
                {
                    question: "What is the most important value when you create for the web?",
                    answers: [
                        { text: "Clean code and efficient performance (Logic)", type: "s" },
                        { text: "Intense visual impression and sensory design (Visual)", type: "a" },
                        { text: "Warm sensibility and narrative delivered to users (Vibe)", type: "b" }
                    ]
                }
            ],
            resultTitle: "Your Vibe Type is",
            resultDesc: "Based on our analysis of your preferences.",
            checkTypeBtn: "View Details",
            restartBtn: "Restart Quiz"
        },
        types: {
            title: "VIBE CODING TYPES",
            items: [
                {
                    id: "s",
                    tag: "Structure",
                    title: "The Architect",
                    shortDesc: "A designer who values sophisticated logic and structure.",
                    description: "You prioritize system stability and performance above all.",
                    features: ["Clean Code", "Optimized Logic", "Scalability"],
                    stats: { logic: 5, visual: 2, energy: 3 },
                    pros: ["Stable builds", "Easy maintenance"],
                    cons: ["Lacks visual fun", "Excessive design time"],
                    learningPath: ["Advanced TypeScript", "System Design"]
                },
                {
                    id: "a",
                    tag: "Aura",
                    title: "The Artist",
                    shortDesc: "An artist who values original aesthetics and sense.",
                    description: "You complete the web as a single work of art.",
                    features: ["Creative UI", "Interaction", "Visual Impact"],
                    stats: { logic: 2, visual: 5, energy: 4 },
                    pros: ["Strong first impression", "Unique identity"],
                    cons: ["Complex implementation", "High resource usage"],
                    learningPath: ["Three.js", "Framer Motion"]
                },
                {
                    id: "b",
                    tag: "Vibe",
                    title: "The Storyteller",
                    shortDesc: "A storyteller who values user sensibility and narrative.",
                    description: "You design experiences that move people's hearts.",
                    features: ["User Centric", "Emotional UX", "Narrative"],
                    stats: { logic: 3, visual: 3, energy: 5 },
                    pros: ["High user empathy", "Familiar interface"],
                    cons: ["Ambiguous tech proof", "Subjective criteria"],
                    learningPath: ["UX Psychology", "Narrative Design"]
                }
            ]
        },
        platforms: {
            title: "AI AGENTS FOR VIBE",
            items: [
                { key: "claude", role: "Theoretical Architect", desc: "Refines the structure and Bauhaus-style logic of your code." },
                { key: "chatgpt", role: "Creative Strategist", desc: "Suggests inspiring ideas and daring design sequences." },
                { key: "gemini", role: "Google Ecosystem Director", desc: "Bridges Google Docs and Cloud infrastructure." }
            ]
        },
        vision: {
            title: "FUTURE VISION NEWS",
            items: [
                { category: "TREND", title: "Liquid Narrative Web", summary: "Beyond rigid webs, the emergence of liquid narratives that react to user movement.", content: "Full content here..." },
                { category: "TECH", title: "Vibe Coding with Gemini", summary: "The era of visual-sentimental coding using multimodal AI is opening.", content: "Full content here..." }
            ]
        },
        mindMap: {
            web: [
                { id: 1, title: "Architecture", desc: "Logic design", whyImportant: "Base", prompt: "Build", actionBtn: "Start", tools: [] },
                { id: 2, title: "Integration", desc: "API connection", whyImportant: "Flow", prompt: "Connect", actionBtn: "Start", tools: [] },
                { id: 3, title: "Artistry", desc: "Visual design", whyImportant: "Aura", prompt: "Paint", actionBtn: "Start", tools: [] },
                { id: 4, title: "Optimization", desc: "Performance", whyImportant: "Speed", prompt: "Refine", actionBtn: "Start", tools: [] },
                { id: 5, title: "Deployment", desc: "Release", whyImportant: "Impact", prompt: "Launch", actionBtn: "Start", tools: [] }
            ],
            app: [
                { id: 1, title: "UX Logic", desc: "Core flow", whyImportant: "Ease", prompt: "Plan", actionBtn: "Start", tools: [] },
                { id: 2, title: "Mobile UI", desc: "Responsive", whyImportant: "Touch", prompt: "Design", actionBtn: "Start", tools: [] },
                { id: 3, title: "Native Feature", desc: "Capability", whyImportant: "Power", prompt: "Code", actionBtn: "Start", tools: [] },
                { id: 4, title: "Beta Test", desc: "Feedback", whyImportant: "Stability", prompt: "Test", actionBtn: "Start", tools: [] },
                { id: 5, title: "Store Launch", desc: "Global reach", whyImportant: "Success", prompt: "Publish", actionBtn: "Start", tools: [] }
            ]
        }
    }
}
