"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ExamResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [score, setScore] = useState<string | null>(null);
  const [lead, setLead] = useState<any>(null);

  useEffect(() => {
    const savedScore = searchParams?.get("score") || localStorage.getItem("examScore");
    const savedLead = localStorage.getItem("examLead");
    
    if (!savedScore || !savedLead) {
      router.push("/exam");
      return;
    }
    
    setScore(savedScore);
    setLead(JSON.parse(savedLead));
    
    // Optional: Clear storage after reading
    // localStorage.removeItem("examScore");
    // localStorage.removeItem("examLead");
  }, [router, searchParams]);

  if (!score || !lead) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-2">Exam Completed!</h1>
        <p className="text-gray-600 mb-8">Thank you, {lead.name}</p>
        
        <div className="mb-8">
          <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-2">Your Score</p>
          <div className="text-6xl font-black text-blue-600">
            {score}<span className="text-3xl text-gray-400">/10</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-8">
          {Number(score) >= 7 
            ? "Excellent work! You have a great foundation for the DHA Exam." 
            : "Good attempt! With a bit more preparation, you'll be ready for the real exam."}
        </p>
        
        <Button 
          onClick={() => router.push("/")} 
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Return Home
        </Button>
      </div>
    </div>
  );
}