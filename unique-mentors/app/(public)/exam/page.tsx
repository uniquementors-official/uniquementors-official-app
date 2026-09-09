"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ExamPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In a real app, save to DB via API or Server Action here
    // For now, store in localStorage and go to next page
    localStorage.setItem("examLead", JSON.stringify(formData));
    router.push("/exam-start");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-2">Start Your Assessment</h1>
        <p className="text-gray-600 mb-6">Please provide your details to start the exam.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone / WhatsApp</label>
            <Input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? "Loading..." : "Start Exam"}
          </Button>
        </form>
      </div>
    </div>
  );
}