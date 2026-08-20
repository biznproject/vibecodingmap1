"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Download, Plus, Type, Circle, Square, Triangle, FileText, Image as ImageIcon, Trash2, Play, RotateCcw } from 'lucide-react';
import { exportToMarkdown, exportToTXT } from '@/lib/exportUtils';

// --- Types ---
type RootType = 'logic' | 'design' | 'infra';
type NodeType = 'serial' | 'parallel';

interface MindNode {
  id: string;
  type: NodeType;
  question?: string;
  answer: string;
  createdAt: number;
}

interface TreeState {
  logic: MindNode[];
  design: MindNode[];
  infra: MindNode[];
}

const ROOT_CONFIG = {
  logic: { label: 'AIM CHECK', color: 'bg-bauhaus-yellow', icon: Circle, textColor: 'text-black' },
  design: { label: 'LOGIC CHECK', color: 'bg-bauhaus-red', icon: Square, textColor: 'text-black' },
  infra: { label: 'VAL CHECK', color: 'bg-bauhaus-blue', icon: Triangle, textColor: 'text-black' },
};

const CATEGORY_QUESTIONS: Record<RootType, string[]> = {
  logic: [
    "CORE PURPOSE: WHAT DO YOU WANT TO CREATE THROUGH THIS PROJECT?",
    "TARGET AUDIENCE: WHO ARE THE PRIMARY USERS OF THIS SERVICE?",
    "DESIGN STYLE: ANY PREFERRED STYLES, COLORS, OR REFERENCES?",
    "TECH ENVIRONMENT: ANY SERVER, DB, OR EXTERNAL API INTEGRATIONS?",
    "CRITICAL INSTRUCTION: WHAT MUST THE AI ABSOLUTELY FOLLOW DURING CODING?"
  ],
  design: [
    "PRIORITY FEATURE: WHAT IS THE #1 FUNCTION AND HOW SHOULD IT WORK?",
    "USER FLOW: WHAT ARE THE KEY STEPS FROM ACCESS TO GOAL COMPLETION?",
    "DATA MANAGEMENT: WHAT INFO NEEDS TO BE STORED AND HOW IS IT LINKED?",
    "EXCEPTION RULES: WHAT ACTIONS/ERRORS MUST BE PREVENTED OR HANDLED?",
    "TECH CONSTRAINTS: ANY PREFERRED LIBRARIES, FRAMEWORKS, OR CODING RULES?"
  ],
  infra: [
    "COMPLETION CRITERIA: WHAT DEFINES THE PROJECT AS 'DONE'?",
    "CORE CHECKLIST: WHAT 3 THINGS MUST WORK PERFECTLY IN THE FINAL APP?",
    "QUALITY METRIC: WHICH IS MOST IMPORTANT: SPEED, READABILITY, OR DESIGN?",
    "VERIFICATION METHOD: HOW WILL USERS TEST AND PROVIDE FEEDBACK?",
    "FINAL VALUE: WHAT SPECIFIC VALUE OR RESULT DO USERS GAIN UPON SUCCESS?"
  ]
};

export default function Home() {
  const [tree, setTree] = useState<TreeState>({
    logic: [],
    design: [],
    infra: [],
  });

  const [activeRoot, setActiveRoot] = useState<RootType | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [projectTitle, setProjectTitle] = useState("TITLE:");

  // --- Edit Mode State ---
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const builderRef = useRef<HTMLDivElement>(null);

  const scrollToBuilder = () => {
    builderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addNode = (root: RootType) => {
    if (!inputValue.trim()) return;
    const currentNodes = tree[root];
    const newNode: MindNode = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'serial',
      question: currentNodes.length < 5 ? CATEGORY_QUESTIONS[root][currentNodes.length] : undefined,
      answer: inputValue,
      createdAt: Date.now(),
    };

    setTree(prev => ({
      ...prev,
      [root]: [...prev[root], newNode]
    }));
    setInputValue("");
  };

  const updateNode = (root: RootType, id: string) => {
    if (!editValue.trim()) return;
    setTree(prev => ({
      ...prev,
      [root]: prev[root].map(node => node.id === id ? { ...node, answer: editValue } : node)
    }));
    setEditingNodeId(null);
    setEditValue("");
  };

  const deleteNode = (root: RootType, id: string) => {
    setTree(prev => ({
      ...prev,
      [root]: prev[root].filter(node => node.id !== id)
    }));
    setEditingNodeId(null);
    setEditValue("");
  };

  const resetProject = (silent = false) => {
    if (silent || confirm("Reset all nodes and title? This cannot be undone.")) {
      setTree({
        logic: [],
        design: [],
        infra: [],
      });
      setProjectTitle("TITLE:");
      setActiveRoot(null);
      setInputValue("");
    }
  };

  const handleStart = () => {
    resetProject(true);
    scrollToBuilder();
  };

  const isExportReady = tree.logic.length > 0 || tree.design.length > 0 || tree.infra.length > 0;

  return (
    <div className="flex-1 flex flex-col relative w-full bg-background overflow-x-hidden pt-16 md:pt-24">
      {/* Tier 1: Glassmorphism Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center p-8 overflow-hidden -mt-16 md:-mt-24">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ backgroundImage: "url('/bg1.png')" }}
        />
        <div className="absolute inset-0 z-10 bg-black/70

         backdrop-blur-[0px]" />

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center gap-8 max-w-4xl w-full text-center">
          <div className="glass-panel p-10 md:p-16 rounded-3xl border-white/20 flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-1000">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl">
              VIBECODING<br />
              <span className="text-bauhaus-yellow">BLUEPRINT</span>
            </h1>
            <p className="text-lg md:text-xl font-medium text-white/80 max-w-2xl leading-relaxed">
              <span className="text-blue-400">[1]</span> Click AIM, LOGIC, or VAL Check to start.<br />
              <span className="text-blue-400">[2]</span> At least 1 answer in any category to enable export.<br />
              <span className="text-blue-400">[3]</span> No data is stored. Close the window and everything is erased, so export immediately as MD or TXT.
            </p>

            <button
              onClick={handleStart}
              className="mt-8 px-16 py-6 rounded-full text-3xl font-black text-white uppercase tracking-[0.2em] bg-white/10 backdrop-blur-xl border border-white/30 hover:bg-white/20 hover:scale-105 transition-all shadow-2xl group flex items-center justify-center relative z-30 select-none"
            >
              <span className="pointer-events-none">START</span>
            </button>
          </div>

          <div className="absolute bottom-10 animate-bounce flex flex-col items-center gap-2 text-white/50">
            <span className="text-[10px] font-black tracking-[0.5em] uppercase"></span>
            <div className="w-0.5 h-12 bg-gradient-to-b from-white/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* Tier 2: Builder Section */}
      <div ref={builderRef} className="min-h-screen flex flex-col scroll-mt-24">
        {/* Local Builder Toolbar (formerly Navbar) */}
        <div className="h-16 border-y-2 border-black bg-white flex items-center justify-between px-6 sticky top-0 z-40 text-black">
          <div className="font-black tracking-tighter flex items-center gap-2">
            <div className="w-3 h-3 bg-bauhaus-red" />
            <span className="text-[10px] uppercase font-bold text-black/50 tracking-widest">Builder Session /</span>
            <span className="text-xs font-black">{projectTitle}</span>
          </div>
          <div className="flex gap-4 relative">
            {/* Export button removed from here as per user request to move it to the bottom */}
          </div>
        </div>

        {/* Main Content Area */}
        <main id="blueprint-capture-area" className="flex-1 p-8 flex flex-col gap-12 max-w-[1200px] mx-auto w-full bg-background transition-colors duration-500">

          {/* Project Title Header */}
          <div className="flex flex-col gap-4 items-center mb-4 pt-12 relative group/title">
            <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center">
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value.toUpperCase())}
                className="text-2xl md:text-3xl font-black bg-transparent border-none text-center outline-none focus:ring-0 tracking-tighter w-full md:w-auto"
                placeholder="PROJECT NAME :"
              />
              <button
                onClick={() => resetProject(false)}
                className="flex items-center gap-2 px-6 py-3 md:px-3 md:py-1.5 border-2 border-bauhaus-red text-bauhaus-red hover:bg-bauhaus-red hover:text-white transition-all text-xs md:text-[10px] font-black tracking-widest uppercase rounded-sm"
                title="Reset Project"
              >
                <RotateCcw size={14} />
                <span>RESET</span>
              </button>
            </div>
            <div className="w-32 h-1 bg-bauhaus-red" />
          </div>

          {/* Nodes Area remains same... */}

          {/* Nodes Area */}
          <div className="space-y-24">
            {(Object.keys(ROOT_CONFIG) as RootType[]).map(key => (
              <div key={key} className="flex flex-col xl:flex-row gap-8 items-start">
                {/* Category Start Button (Front of Row) */}
                <div
                  onClick={() => setActiveRoot(key)}
                  className={`w-full md:w-64 cursor-pointer group relative p-8 flex flex-col items-center justify-center gap-4 border-4 transition-all active:scale-95 shrink-0 ${activeRoot === key ? 'border-foreground shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)] scale-105' : 'border-transparent opacity-60 hover:opacity-90 hover:scale-[1.02]'
                    } ${ROOT_CONFIG[key].color} ${ROOT_CONFIG[key].textColor}`}
                >
                  {React.createElement(ROOT_CONFIG[key].icon, {
                    size: 48,
                    strokeWidth: activeRoot === key ? 3 : 2,
                    className: ROOT_CONFIG[key].textColor
                  })}
                  <div className="text-2xl font-black tracking-widest uppercase">{ROOT_CONFIG[key].label}</div>
                  <div className={`text-[10px] font-bold opacity-70`}>{tree[key].length} NODES LOGGED</div>
                </div>

                <div className="flex-1 space-y-6 w-full">
                  <div className="flex items-center gap-4 border-b-4 border-black pb-2">
                    <div className={`w-6 h-6 ${ROOT_CONFIG[key].color} border-2 border-black flex items-center justify-center`}>
                      <span className="text-[10px] font-black text-black">
                        {key === 'logic' ? '01' : key === 'design' ? '02' : '03'}
                      </span>
                    </div>
                    <span className="font-black uppercase text-xl italic tracking-tighter text-foreground">{ROOT_CONFIG[key].label} SPECIFICATION</span>
                    <div className="flex-1 border-t-2 border-foreground border-dashed opacity-20" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tree[key].map((node, idx) => {
                      const isEditing = editingNodeId === node.id;
                      return (
                        <div
                          key={node.id}
                          onClick={() => {
                            if (!isEditing) {
                              setEditingNodeId(node.id);
                              setEditValue(node.answer);
                            }
                          }}
                          className={`relative p-6 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] transition-transform hover:-translate-y-1 cursor-pointer text-black ${node.type === 'parallel' ? 'border-dashed scale-[0.98] border-opacity-50' : ''
                            } ${isEditing ? 'ring-2 ring-bauhaus-red' : ''}`}
                        >
                          {node.type === 'parallel' && (
                            <div className="absolute -top-3 -left-3 bg-black text-white px-2 py-0.5 text-[8px] font-black tracking-widest italic font-sans">
                              PARALLEL
                            </div>
                          )}
                          <div className="text-[10px] font-black opacity-30 mb-2 uppercase flex justify-between">
                            <span>NODE</span>
                            <span>#{idx + 1}</span>
                          </div>
                          {node.question && <div className="text-xs font-black mb-4 leading-tight uppercase tracking-tighter border-l-2 border-black pl-2 py-1">{node.question}</div>}

                          {isEditing ? (
                            <textarea
                              autoFocus
                              className="w-full bg-transparent border-b border-black outline-none text-sm font-bold resize-none"
                              rows={3}
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  updateNode(key, node.id);
                                } else if (e.key === 'Escape') {
                                  setEditingNodeId(null);
                                }
                              }}
                              onBlur={() => updateNode(key, node.id)}
                            />
                          ) : (
                            <div className="text-sm font-bold leading-relaxed tracking-tight break-words">{node.answer}</div>
                          )}

                          {isEditing && (
                            <div className="mt-2 text-[7px] font-black uppercase tracking-widest flex justify-between items-center bg-black/5 p-1">
                              <div className="flex gap-2 text-black/50">
                                <span>ENTER to save</span>
                                <span>ESC to cancel</span>
                              </div>
                              {/* Deletion: Only the last node can be deleted to maintain sequence */}
                              {idx === tree[key].length - 1 && (
                                <button
                                  onMouseDown={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    deleteNode(key, node.id);
                                  }}
                                  className="text-bauhaus-red hover:scale-125 transition-transform p-1 cursor-pointer"
                                  title="Delete last node"
                                >
                                  <Trash2 size={14} />
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Input Slot */}
                    {activeRoot === key && (
                      <div className="col-span-1 border-4 border-black border-dotted p-6 flex flex-col gap-4 bg-white/80 scale-[1.02]">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-bauhaus-blue">
                          <span>{`>>> Slot ${tree[key].length + 1} Entry <<<`}</span>
                        </div>

                        {tree[key].length < 5 && (
                          <div className="text-xs font-black text-bauhaus-red tracking-tight opacity-50 uppercase">{CATEGORY_QUESTIONS[key][tree[key].length]}</div>
                        )}

                        <textarea
                          autoFocus
                          rows={3}
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              addNode(key);
                            }
                          }}
                          placeholder="Enter technical details..."
                          className="bg-transparent border-2 border-transparent border-b-black outline-none text-sm py-2 font-bold resize-none text-black"
                        />

                        <div className="flex justify-between items-center text-[7px] font-black opacity-40 uppercase tracking-widest text-black">
                          <div className="flex gap-2">
                            <span className="bg-black text-white px-1">ENTER</span> TO COMMIT
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Empty State visual */}
                    {tree[key].length === 0 && activeRoot !== key && (
                      <div className="col-span-1 md:col-span-2 lg:col-span-3 h-24 border-2 border-foreground border-dotted opacity-10 flex items-center justify-center font-black text-2xl uppercase tracking-[1em] text-foreground">
                        Empty Buffer
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Final Export Action */}
          <div className="mt-32 pb-20 border-t-2 border-black flex flex-col items-center gap-8">
            <div className="flex flex-col items-center -mt-4 bg-background px-8">
              <div className="w-4 h-4 bg-bauhaus-red rotate-45 mb-4" />
              <h2 className="text-sm font-black tracking-[0.5em] uppercase text-black/40">Orchestration Complete</h2>
            </div>

            <div className="relative">
              <button
                onClick={() => isExportReady && setShowExportMenu(!showExportMenu)}
                disabled={!isExportReady}
                className={`flex items-center gap-4 px-12 py-6 font-black uppercase text-xl transition-all border-4 border-black ${isExportReady
                  ? 'bg-bauhaus-yellow text-black cursor-pointer hover:bg-black hover:text-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-2 active:translate-y-2'
                  : 'opacity-20 bg-gray-200 cursor-not-allowed border-gray-300'
                  }`}
              >
                <Download size={24} /> EXPORT BLUEPRINT
              </button>

              {showExportMenu && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] z-[100]">
                  <div className="p-4 border-b-2 border-black bg-black text-white text-[10px] font-black tracking-widest uppercase">
                    Select Distribution Format
                  </div>
                  <button
                    onClick={() => { exportToMarkdown(tree); setShowExportMenu(false); }}
                    className="w-full text-left px-6 py-5 text-sm font-black text-black hover:bg-bauhaus-blue hover:text-white border-b-2 border-black flex items-center gap-4 group transition-colors"
                  >
                    <div className="w-2 h-2 bg-bauhaus-blue group-hover:bg-white" />
                    AS MARKDOWN DOCUMENT (.MD)
                  </button>
                  <button
                    onClick={() => { exportToTXT(tree); setShowExportMenu(false); }}
                    className="w-full text-left px-6 py-5 text-sm font-black text-black hover:bg-bauhaus-red hover:text-white flex items-center gap-4 group transition-colors"
                  >
                    <div className="w-2 h-2 bg-bauhaus-red group-hover:bg-white" />
                    AS PLAIN TEXT (.TXT)
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-2 mt-8">
              <div className="text-[10px] font-black text-black tracking-[0.4em] uppercase opacity-30">
                VIBECODINGMAP.COM / SYSTEM_VER_2.1
              </div>
              <div className="flex gap-4">
                <div className="w-1 h-1 bg-black rounded-full" />
                <div className="w-1 h-1 bg-black rounded-full" />
                <div className="w-1 h-1 bg-black rounded-full" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}