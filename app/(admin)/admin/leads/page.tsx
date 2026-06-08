import { LeadsTable } from "@/components/admin/LeadsTable";

const leads = [
  { id: "1", name: "Asha Kumar", email: "asha@example.com", phone: "+919876543210", profession: "Lab Technician", examType: "HAAD", source: "APPLY", status: "NEW", date: "Jun 8, 2026" },
  { id: "2", name: "Vivek Nair", email: "vivek@example.com", phone: "+919812345678", profession: "Pharmacist", examType: "DHA", source: "CONTACT", status: "CONTACTED", date: "Jun 8, 2026" },
  { id: "3", name: "Nimisha Thomas", email: "nimisha@example.com", phone: "+919909090909", profession: "Radiographer", examType: "MOH", source: "APPLY", status: "ENROLLED", date: "Jun 7, 2026" },
  { id: "4", name: "Jacob Mathew", email: "jacob@example.com", phone: "+919777777777", profession: "General Dentist", examType: "DHA", source: "CONTACT", status: "NEW", date: "Jun 7, 2026" },
  { id: "5", name: "Rekha Prasad", email: "rekha@example.com", phone: "+919666666666", profession: "Nurse", examType: "MOH", source: "WHATSAPP", status: "CLOSED", date: "Jun 6, 2026" }
];

export default function LeadsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-bold">Enquiries & Leads</h2>
        <p className="text-sm text-slate-500">Filter, export and update candidate status.</p>
      </div>
      <div className="surface grid gap-3 p-4 md:grid-cols-4">
        <input className="h-10 rounded-md border border-input bg-background px-3 text-sm" placeholder="Search name, email, phone" />
        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option>All Status</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Enrolled</option>
          <option>Closed</option>
        </select>
        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option>All Sources</option>
          <option>Contact</option>
          <option>Apply</option>
          <option>WhatsApp</option>
        </select>
        <input type="date" className="h-10 rounded-md border border-input bg-background px-3 text-sm" />
      </div>
      <LeadsTable leads={leads} />
    </div>
  );
}
