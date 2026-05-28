"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Download, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AssignmentOutput() {
  const params = useParams();
  const id = params.id;
  
  const [assignment, setAssignment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the completed assignment from your backend
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/assignments/${id}`);
        setAssignment(response.data);
      } catch (err) {
        setError('Failed to load the assignment. Is the backend running?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAssignment();
  }, [id]);

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-gray-500">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p>AI is generating your assignment...</p>
      </div>
    );
  }

  if (error || !assignment) {
    return (
      <div className="h-full flex items-center justify-center p-8 text-red-500 font-medium">
        {error || "Assignment not found"}
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      
      {/* Top Action Bar */}
      <div className="bg-gray-900 rounded-xl p-4 flex items-center justify-between mb-8 shadow-sm">
        <p className="text-white text-sm font-medium pl-2">
          Here is your customized Question Paper!
        </p>
        {/* Top Action Bar */}
      <div className="bg-gray-900 rounded-xl p-4 flex items-center justify-between mb-8 shadow-sm print:hidden">
        <p className="text-white text-sm font-medium pl-2">
          Here is your customized Question Paper!
        </p>
        
        {/* The Magic Button */}
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors"
        >
          <Download size={16} />
          Download as PDF
        </button>
      </div>
      </div>

      {/* The Paper Canvas (Matches Figma exactly) */}
      <div className="bg-white rounded-2xl border border-gray-200 p-12 shadow-sm min-h-[800px] text-gray-900">
        
        {/* School Header */}
        <div className="text-center border-b border-gray-200 pb-6 mb-8">
          <h1 className="text-2xl font-bold mb-1">Delhi Public School, Sector-4, Bokaro</h1>
          <h2 className="text-lg font-semibold mb-1">Subject: {assignment.subject || "Science"}</h2>
          <h3 className="text-md font-medium text-gray-600">Class: 5th</h3>
          
          <div className="flex justify-between items-center mt-6 text-sm font-semibold">
            <p>Time Allowed: 45 minutes</p>
            <p>Maximum Marks: {assignment.totalMarks || 20}</p>
          </div>
        </div>

        <p className="text-sm font-bold italic mb-6">All questions are compulsory unless stated otherwise.</p>

        {/* Student Inputs */}
        <div className="space-y-3 mb-10 text-sm font-medium max-w-sm">
          <div className="flex gap-2"><span className="w-24">Name:</span> <div className="border-b border-gray-400 flex-1"></div></div>
          <div className="flex gap-2"><span className="w-24">Roll Number:</span> <div className="border-b border-gray-400 flex-1"></div></div>
          <div className="flex gap-2"><span className="w-24">Section:</span> <div className="border-b border-gray-400 flex-1"></div></div>
        </div>

        {/* --- DYNAMIC AI CONTENT GOES HERE --- */}
        {/* Note: This block assumes your AI returns a 'content' string or structured data. */}
        {/* You may need to tweak this depending on exactly how your AI formatted the output! */}
        
        <div className="prose prose-sm max-w-none text-gray-800">
          {/* If your backend saves the generated text directly to assignment.generatedContent */}
          <div className="whitespace-pre-wrap">
            {assignment.generatedContent || assignment.content || "AI Content will appear here."}
          </div>
        </div>

      </div>
    </div>
  );
}