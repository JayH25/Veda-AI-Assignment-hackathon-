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
        dueDate, // This will now safely have a real date string
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
    <div className="p-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      
      <div className="flex items-center gap-3 mb-8">
        <div className="w-5 h-5 flex items-center justify-center bg-green-500 rounded-full text-white text-xs font-bold">✓</div>
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Create Assignment</h1>
          <p className="text-xs text-gray-500">Set up a new assignment for your students</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <h2 className="text-md font-bold text-gray-900 mb-1">Assignment Details</h2>
        <p className="text-xs text-gray-500 mb-6">Basic information about your assignment</p>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer mb-8">
          <UploadCloud className="text-gray-400 mb-3" size={32} />
          <p className="text-sm font-semibold text-gray-700">Choose a file or drag & drop it here</p>
          <p className="text-xs text-gray-400 mt-1 mb-4">JPEG, PNG, upto 10MB</p>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-sm">
            Browse Files
          </button>
          <p className="text-xs text-gray-400 mt-4">Upload images of your preferred document/image</p>
        </div>

        {/* Due Date */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date</label>
          <div className="relative w-full md:w-1/2">
            <input 
              type="date" 
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <Calendar className="absolute right-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* Question Types Configuration */}
        <div className="mb-6">
          <div className="flex text-sm font-semibold text-gray-700 mb-2">
            <div className="flex-1">Question Type</div>
            <div className="w-32 text-center">No. of Questions</div>
            <div className="w-32 text-center">Marks</div>
            <div className="w-10"></div>
          </div>

          <div className="space-y-3">
            {questionConfigs.map((q) => (
              <div key={q.id} className="flex items-center gap-4">
                <select 
                  value={q.type}
                  onChange={(e) => updateQuestionConfig(q.id, 'type', e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none"
                >
                  {QUESTION_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>

                <div className="w-32 flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5">
                  <button onClick={() => updateQuestionConfig(q.id, 'count', q.count - 1)} className="p-1 hover:bg-gray-200 rounded text-gray-500"><Minus size={14} /></button>
                  <span className="text-sm font-medium w-8 text-center">{q.count}</span>
                  <button onClick={() => updateQuestionConfig(q.id, 'count', q.count + 1)} className="p-1 hover:bg-gray-200 rounded text-gray-500"><Plus size={14} /></button>
                </div>

                <div className="w-32 flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5">
                  <button onClick={() => updateQuestionConfig(q.id, 'marks', q.marks - 1)} className="p-1 hover:bg-gray-200 rounded text-gray-500"><Minus size={14} /></button>
                  <span className="text-sm font-medium w-8 text-center">{q.marks}</span>
                  <button onClick={() => updateQuestionConfig(q.id, 'marks', q.marks + 1)} className="p-1 hover:bg-gray-200 rounded text-gray-500"><Plus size={14} /></button>
                </div>

                <button onClick={() => removeQuestionConfig(q.id)} className="w-10 flex justify-center text-gray-400 hover:text-red-500 transition-colors">
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>

          <button onClick={addQuestionConfig} className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 px-4 py-2 rounded-lg transition-colors">
            <Plus size={16} /> Add Question Type
          </button>
        </div>

        {/* Totals Summary */}
        <div className="flex flex-col items-end text-sm font-semibold text-gray-700 mb-8 border-b border-gray-100 pb-6">
          <p>Total Questions : {getTotalQuestions()}</p>
          <p>Total Marks : {getTotalMarks()}</p>
        </div>

        {/* Additional Information */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Information (For better output)</label>
          <div className="relative">
            <textarea 
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="e.g Generate a question paper for 3 hour exam duration..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 min-h-[100px] resize-y"
            />
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-8 border-t border-gray-100 pt-6">
          <Link href="/" className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm">
            ← Previous
          </Link>
          <button 
            onClick={handleSubmit}
            disabled={isGenerating}
            className={`px-6 py-2.5 rounded-full text-white font-medium transition-colors text-sm flex items-center gap-2 ${
              isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#111111] hover:bg-gray-800'
            }`}
          >
            {isGenerating ? 'Generating AI Paper...' : 'Next →'}
          </button>
          {/* <button 
            onClick={handleSubmit}
            disabled={isGenerating}
            className={`px-6 py-2.5 rounded-full text-white font-medium transition-colors text-sm flex items-center gap-2 ${
              isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#111111] hover:bg-gray-800'
            }`}
          >
            {isGenerating ? 'Generating AI Paper...' : 'Next →'}
          </button> */}
        </div>
      </div>
    </div>
  );
}