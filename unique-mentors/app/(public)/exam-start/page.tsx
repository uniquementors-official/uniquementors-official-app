"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const MOCK_QUESTIONS = [
  { q: "What is the primary goal of physiotherapy?", options: ["Prescribe medicine", "Restore movement and function", "Perform surgery", "Diagnose cancer"], answer: 1 },
  { q: "Which modality uses sound waves for treatment?", options: ["TENS", "Ultrasound", "Laser", "Traction"], answer: 1 },
  { q: "What does ROM stand for?", options: ["Rate of Motion", "Range of Motion", "Rest on Mat", "Reaction of Muscle"], answer: 1 },
  { q: "Which condition is characterized by joint inflammation?", options: ["Osteoporosis", "Arthritis", "Scoliosis", "Sciatica"], answer: 1 },
  { q: "A goniometer is used to measure:", options: ["Blood pressure", "Muscle strength", "Joint angles", "Heart rate"], answer: 2 },
  { q: "What is a common symptom of Carpal Tunnel Syndrome?", options: ["Knee pain", "Numbness in hands", "Headaches", "Foot drop"], answer: 1 },
  { q: "Which part of the spine has 5 vertebrae?", options: ["Cervical", "Thoracic", "Lumbar", "Coccyx"], answer: 2 },
  { q: "What is hemiplegia?", options: ["Paralysis of lower half", "Paralysis of one side of the body", "Muscle spasm", "Nerve block"], answer: 1 },
  { q: "Which exercise is best for cardiovascular fitness?", options: ["Weight lifting", "Stretching", "Swimming", "Yoga"], answer: 2 },
  { q: "What is the primary muscle of respiration?", options: ["Diaphragm", "Biceps", "Quadriceps", "Deltoid"], answer: 0 }
];

export default function ExamStartPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("examLead")) {
      router.push("/exam");
    }
  }, [router]);

  const handleNext = () => {
    if (selected === MOCK_QUESTIONS[currentQ]?.answer) {
      setScore(s => s + 1);
    }
    
    if (currentQ < MOCK_QUESTIONS.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
    } else {
      // Calculate final score including this answer
      const finalScore = selected === MOCK_QUESTIONS[currentQ]?.answer ? score + 1 : score;
      localStorage.setItem("examScore", finalScore.toString());
      router.push(`/exam-result?score=${finalScore}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">DHA Physiotherapist Exam</h2>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            Question {currentQ + 1} of 10
          </span>
        </div>
        
        <div className="mb-8">
          <h3 className="text-2xl font-medium mb-6">{MOCK_QUESTIONS[currentQ]?.q}</h3>
          
          <div className="space-y-3">
            {MOCK_QUESTIONS[currentQ]?.options.map((opt, i) => (
              <div 
                key={i} 
                onClick={() => setSelected(i)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selected === i ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500" : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                {opt}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleNext} 
            disabled={selected === null}
            className="bg-blue-600 hover:bg-blue-700 px-8"
          >
            {currentQ === 9 ? "Submit Exam" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
}