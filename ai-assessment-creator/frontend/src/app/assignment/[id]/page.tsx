"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Download, Loader2, Printer, ChevronLeft, MapPin, Calendar, Clock, Award } from 'lucide-react';
import Link from 'next/link';
import { API_BASE_URL } from '@/config';

export default function AssignmentOutput() {
  const params = useParams();
  const id = params.id;
  
  const [assignment, setAssignment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let intervalId: any;

    const fetchAssignment = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/assignments/${id}`);
        const data = response.data;
        console.log("Loaded assignment data:", data);
        setAssignment(data);
        
        if (data.status === 'completed' || data.status === 'failed') {
          setLoading(false);
          if (intervalId) clearInterval(intervalId);
        }
      } catch (err) {
        setError('Failed to load the assignment. Is the backend running?');
        console.error(err);
        setLoading(false);
        if (intervalId) clearInterval(intervalId);
      }
    };

    if (id) {
      fetchAssignment();
      intervalId = setInterval(fetchAssignment, 1500);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-8 text-muted-foreground animate-in fade-in duration-500">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-primary/10 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-6 text-lg font-medium tracking-tight">AI is crafting your assessment...</p>
        <p className="text-sm opacity-60">This usually takes about 10 seconds.</p>
      </div>
    );
  }

  if (error || !assignment) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4">
          <ChevronLeft size={32} />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Oops! Something went wrong</h2>
        <p className="text-muted-foreground max-w-xs mb-6">{error || "Assignment not found or still processing."}</p>
        <Link href="/" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all">
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 print:hidden">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all">
              <ChevronLeft size={18} />
            </div>
            <span className="font-semibold text-sm">Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-muted text-foreground px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-muted/80 transition-all border border-border"
            >
              <Printer size={16} />
              Print Paper
            </button>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all"
            >
              <Download size={16} />
              Export PDF
            </button>
          </div>
        </div>

        {/* The Paper Canvas */}
        <div className="bg-white text-slate-900 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200 mb-12 transform hover:scale-[1.002] transition-transform duration-500">
          
          {/* Institution Header Decorative Bar */}
          <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>

          <div className="p-8 md:p-16">
            {/* School Header */}
            <div className="text-center border-b-2 border-slate-100 pb-10 mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 mb-4 shadow-sm">
                <span className="text-2xl font-black text-primary">V</span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight uppercase">Delhi Public School</h1>
              <p className="text-slate-500 font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-2 mb-6">
                <MapPin size={12} /> Bokaro Steel City, Jharkhand
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Subject</p>
                  <p className="text-sm font-bold text-slate-700">{assignment.subject || 'General Knowledge'}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Time</p>
                  <p className="text-sm font-bold text-slate-700">45 Minutes</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Max Marks</p>
                  <p className="text-sm font-bold text-slate-700">{assignment.totalMarks || 40} Points</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Grade</p>
                  <p className="text-sm font-bold text-slate-700">Class 5 (A/B)</p>
                </div>
              </div>
            </div>

            {/* Student Info Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 p-6 bg-slate-50/50 rounded-2xl border border-slate-100 dashed">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Student Name</label>
                <div className="h-6 border-b-2 border-slate-200"></div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Roll Number</label>
                <div className="h-6 border-b-2 border-slate-200"></div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Date</label>
                <div className="h-6 border-b-2 border-slate-200"></div>
              </div>
            </div>

            {(!assignment.questionPapers || assignment.questionPapers.length === 0 || !assignment.questionPapers[0].sections || assignment.questionPapers[0].sections.length === 0) && (
              <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 text-yellow-800 rounded-2xl mb-8 print:hidden">
                <p className="font-bold text-sm">⚠️ No questions found in this assessment.</p>
                <p className="text-xs mt-1 text-slate-500">
                  Status: <strong className="text-slate-700">{assignment.status}</strong>. 
                  The AI generation may have returned an unexpected structure, or failed validation. Here is the raw data:
                </p>
                <pre className="mt-4 p-3 bg-slate-50 text-[10px] rounded-lg overflow-x-auto text-slate-600 border border-slate-200 text-left">
                  {JSON.stringify(assignment, null, 2)}
                </pre>
              </div>
            )}

            {/* Dynamic Content Sections */}
            <div className="space-y-12">
              {assignment.questionPapers?.[0]?.sections?.map((section: any, sIdx: number) => (
                <div key={sIdx} className="animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${sIdx * 150}ms` }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-lg">
                      {String.fromCharCode(65 + sIdx)}
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">{section.title}</h4>
                      {section.instructions && <p className="text-sm text-slate-500 font-medium italic">{section.instructions}</p>}
                    </div>
                  </div>

                  <div className="space-y-8 pl-4">
                    {section.questions.map((q: any, qIdx: number) => (
                      <div key={qIdx} className="group relative">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex gap-4">
                            <span className="text-slate-300 font-black text-lg pt-1">0{qIdx + 1}.</span>
                            <div className="space-y-2">
                              <p className="text-slate-800 font-semibold leading-relaxed">
                                {q.text}
                              </p>
                              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-100 text-slate-400 uppercase">{q.difficulty}</span>
                                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-100 text-slate-400 uppercase">{q.type}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-slate-400 font-black text-xs pt-2 whitespace-nowrap">
                            [{q.marks} MARKS]
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-20 pt-12 border-t border-slate-100 text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">End of Question Paper</p>
              <div className="flex justify-center gap-8">
                <div className="w-32 h-1 bg-slate-100 rounded-full"></div>
                <div className="w-32 h-1 bg-slate-100 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}