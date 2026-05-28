"use client";

import { UploadCloud, Plus, Minus, X, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useAssignmentStore } from '@/store/useAssignmentStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateAssignment() {
  const { 
    dueDate, setDueDate, 
    subject, setSubject,
    questionConfigs, addQuestionConfig, removeQuestionConfig, updateQuestionConfig,
    additionalInfo, setAdditionalInfo,
    getTotalQuestions, getTotalMarks 
  } = useAssignmentStore();
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  const QUESTION_TYPES = ['Multiple Choice Questions', 'Short Questions', 'Long Questions', 'Numerical Problems'];
 const handleSubmit = async () => {
    // 1. New Check: Make sure they picked a date!
    if (!dueDate) {
      alert("Please select a Due Date before generating!");
      return;
    }

    // (Existing check)
    if (getTotalQuestions() === 0) {
      alert("Please add at least one question!");
      return;
    }

    setIsGenerating(true);

    try {
      const payload = {
        dueDate, 
        subject,
        questions: questionConfigs.map(q => ({
          type: q.type,
          count: q.count,
          marks: q.marks
        })),
        additionalInstructions: additionalInfo,
        totalMarks: getTotalMarks(),
        totalQuestions: getTotalQuestions()
      };

      const response = await axios.post('http://localhost:5000/api/assignments', payload);
      const assignmentId = response.data.assignmentId; 
      
      router.push(`/assignment/${assignmentId}`);

    } catch (error) {
      console.error("Failed to generate assignment:", error);
      alert("Error generating assignment. Check the backend console!");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
          Create Smart Assessments
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Design professional question papers in minutes. Customize levels, marks, and let our AI handle the rest.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-3xl border border-border p-8 shadow-xl shadow-primary/5 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-2xl text-primary font-bold">1</div>
              <h2 className="text-xl font-bold text-foreground">Configure Questions</h2>
            </div>

            {/* Question Types Configuration */}
            <div className="mb-8">
              <div className="hidden md:flex text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 px-2">
                <div className="flex-1">Question Type</div>
                <div className="w-32 text-center">Quantity</div>
                <div className="w-32 text-center">Marks/Q</div>
                <div className="w-10"></div>
              </div>

              <div className="space-y-4">
                {questionConfigs.map((q) => (
                  <div key={q.id} className="group flex flex-col md:flex-row items-center gap-4 bg-secondary/30 p-4 md:p-2 rounded-2xl border border-transparent hover:border-primary/20 transition-all duration-300">
                    <select 
                      value={q.type}
                      onChange={(e) => updateQuestionConfig(q.id, 'type', e.target.value)}
                      className="w-full md:flex-1 bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      {QUESTION_TYPES.map(type => <option key={type} value={type} className="bg-card text-foreground">{type}</option>)}
                    </select>

                    <div className="w-full md:w-32 flex items-center justify-between bg-card border border-border rounded-xl px-3 py-2">
                      <button onClick={() => updateQuestionConfig(q.id, 'count', q.count - 1)} className="p-1 hover:bg-secondary rounded-lg text-muted-foreground transition-all"><Minus size={16} /></button>
                      <span className="text-sm font-bold text-foreground">{q.count}</span>
                      <button onClick={() => updateQuestionConfig(q.id, 'count', q.count + 1)} className="p-1 hover:bg-secondary rounded-lg text-muted-foreground transition-all"><Plus size={16} /></button>
                    </div>

                    <div className="w-full md:w-32 flex items-center justify-between bg-card border border-border rounded-xl px-3 py-2">
                      <button onClick={() => updateQuestionConfig(q.id, 'marks', q.marks - 1)} className="p-1 hover:bg-secondary rounded-lg text-muted-foreground transition-all"><Minus size={16} /></button>
                      <span className="text-sm font-bold text-foreground">{q.marks}</span>
                      <button onClick={() => updateQuestionConfig(q.id, 'marks', q.marks + 1)} className="p-1 hover:bg-secondary rounded-lg text-muted-foreground transition-all"><Plus size={16} /></button>
                    </div>

                    <button onClick={() => removeQuestionConfig(q.id)} className="hidden md:flex w-10 justify-center text-muted-foreground hover:text-red-500 transition-colors">
                      <X size={20} />
                    </button>
                    <button onClick={() => removeQuestionConfig(q.id)} className="md:hidden w-full py-2 text-xs font-semibold text-red-500 bg-red-500/10 rounded-xl">
                      Remove Section
                    </button>
                  </div>
                ))}
              </div>

              <button 
                onClick={addQuestionConfig} 
                className="mt-6 w-full flex items-center justify-center gap-2 text-sm font-bold text-primary hover:bg-primary/5 bg-transparent border-2 border-dashed border-primary/20 py-4 rounded-2xl transition-all"
              >
                <Plus size={18} /> Add New Section
              </button>
            </div>
          </div>

          <div className="bg-card rounded-3xl border border-border p-8 shadow-xl shadow-primary/5 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-2xl text-primary font-bold">2</div>
              <h2 className="text-xl font-bold text-foreground">Advanced Context</h2>
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-bold text-foreground px-1">Specific Instructions</label>
              <textarea 
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Ex: Focus on photosynthesis, include 2 diagram-based questions, keep language simple for 5th grade..."
                className="w-full bg-secondary/30 border border-border rounded-2xl px-5 py-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground resize-none min-h-[120px] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Settings & Summary */}
        <div className="space-y-6">
          <div className="bg-card rounded-3xl border border-border p-8 shadow-xl shadow-primary/5 sticky top-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-2xl text-primary font-bold">3</div>
              <h2 className="text-xl font-bold text-foreground">Final Prep</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-foreground mb-2 px-1">Subject</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex: Science, Biology..."
                  className="w-full px-5 py-4 bg-secondary/30 border border-border rounded-2xl text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-2 px-1">Submission Deadline</label>
                <div className="relative group">
                  <input 
                    type="date" 
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full pl-5 pr-12 py-4 bg-secondary/30 border border-border rounded-2xl text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer"
                  />
                  <Calendar className="absolute right-4 top-4 text-primary group-hover:scale-110 transition-transform" size={20} />
                </div>
              </div>

              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Paper Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-medium text-foreground">
                    <span>Total Questions</span>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg">{getTotalQuestions()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium text-foreground">
                    <span>Maximum Marks</span>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg">{getTotalMarks()} pts</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={isGenerating}
                className={`w-full py-5 rounded-2xl text-base font-black text-white transition-all shadow-lg hover:shadow-primary/30 active:scale-[0.97] flex items-center justify-center gap-3 ${
                  isGenerating ? 'bg-primary/50 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-blue-600 hover:opacity-90'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    AI Processing...
                  </>
                ) : (
                  <>Generate Question Paper <Plus size={20} /></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}