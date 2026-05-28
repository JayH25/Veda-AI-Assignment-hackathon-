import { UploadCloud } from 'lucide-react';
import Link from 'next/link';

export default function CreateAssignment() {
  return (
    <div className="p-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      
      {/* Header section with the green checkmark */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-5 h-5 flex items-center justify-center bg-green-500 rounded-full text-white text-xs font-bold">
          ✓
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Create Assignment</h1>
          <p className="text-xs text-gray-500">Set up a new assignment for your students</p>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <h2 className="text-md font-bold text-gray-900 mb-1">Assignment Details</h2>
        <p className="text-xs text-gray-500 mb-6">Basic information about your assignment</p>

        {/* Drag & Drop Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer mb-8">
          <UploadCloud className="text-gray-400 mb-3" size={32} />
          <p className="text-sm font-semibold text-gray-700">Choose a file or drag & drop it here</p>
          <p className="text-xs text-gray-400 mt-1 mb-4">JPEG, PNG, upto 10MB</p>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-sm">
            Browse Files
          </button>
        </div>

        {/* Next step: We will add the complex form inputs here! */}
        <div className="h-32 flex items-center justify-center text-gray-400 text-sm border-t border-gray-100">
          [ Form Configuration Options Go Here ]
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-8 border-t border-gray-100 pt-6">
          <Link href="/" className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm">
            ← Previous
          </Link>
          <button className="px-6 py-2.5 rounded-full bg-[#111111] text-white font-medium hover:bg-gray-800 transition-colors text-sm">
            Next →
          </button>
        </div>
      </div>

    </div>
  );
}