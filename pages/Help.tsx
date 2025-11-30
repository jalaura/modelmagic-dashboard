import React from 'react';
import { MessageSquare, Mail, FileText, HelpCircle, ArrowRight } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
  <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-shadow">
    <h4 className="font-bold text-[#1A1A1A] mb-3 flex items-start gap-3">
        <HelpCircle className="text-[#1F6B55] flex-shrink-0 mt-1" size={18} />
        {question}
    </h4>
    <p className="text-[#6B7280] text-sm leading-relaxed pl-8">{answer}</p>
  </div>
);

const HelpPage: React.FC = () => {
  return (
    <div className="space-y-12 animate-fadeIn max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">Help & Support</h1>
        <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
          We're here to help you get the most out of ModelMagic. 
          <br />Reach out to our team via chat or email.
        </p>
      </div>

      {/* Primary Contact Options */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-[#1A1A1A] text-white rounded-xl p-10 shadow-lg flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500"></div>
            
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="text-[#22C55E]" size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Chat with Support</h2>
            <p className="text-white/70 mb-8 max-w-sm">
                The fastest way to get answers. Our team is available 9am-6pm PST weekdays.
            </p>
            <button className="bg-[#22C55E] text-white px-8 py-3 rounded-md font-bold hover:bg-[#16a34a] transition-all shadow-lg hover:shadow-[#22C55E]/20 w-full max-w-xs flex items-center justify-center gap-2">
                Start Live Chat <ArrowRight size={18} />
            </button>
            <p className="text-xs text-white/50 mt-4 uppercase tracking-wider font-bold">Avg. Wait: &lt; 5 mins</p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-10 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-[#F5F3F0] rounded-full flex items-center justify-center mb-6 text-[#1F6B55]">
                <Mail size={32} />
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Email Support</h2>
            <p className="text-[#6B7280] mb-8 max-w-sm">
                For detailed questions, billing inquiries, or complex project requirements.
            </p>
            <button className="bg-white border-2 border-[#E5E7EB] text-[#1A1A1A] px-8 py-3 rounded-md font-bold hover:border-[#1F6B55] hover:text-[#1F6B55] transition-all w-full max-w-xs flex items-center justify-center gap-2">
                Send Email <ArrowRight size={18} />
            </button>
             <p className="text-xs text-[#9CA3AF] mt-4 uppercase tracking-wider font-bold">Reply time: &lt; 4 hours</p>
        </div>
      </div>

      {/* Knowledge Base */}
      <div>
        <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">Knowledge Base</h3>
        <div className="grid md:grid-cols-4 gap-4">
            {['Getting Started Guide', 'Writing Great Briefs', 'Our Revision Policy', 'Billing & Plans'].map((item, i) => (
                <div key={i} className="bg-white border border-[#E5E7EB] p-6 rounded-lg hover:border-[#1F6B55] cursor-pointer transition-colors group">
                    <FileText className="text-[#9CA3AF] group-hover:text-[#1F6B55] mb-4 transition-colors" size={24} />
                    <p className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#1F6B55] transition-colors">{item}</p>
                </div>
            ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">Frequently Asked Questions</h3>
        <div className="grid gap-4">
            <FAQItem 
                question="Can I schedule a call to discuss my project?" 
                answer="We're a fully asynchronous service! All communication happens via chat and email right here in your dashboard. This allows us to keep costs low and efficiency high. Our team responds within 4 business hours, and you'll have a dedicated editor assigned to your project who you can message anytime."
            />
            <FAQItem 
                question="What is your typical turnaround time?" 
                answer="For most projects, our standard delivery time is 24-48 hours. Larger projects (over 20 items) may take up to 3-4 business days."
            />
            <FAQItem 
                question="How do revisions work?" 
                answer="We offer unlimited revisions on all projects. You can leave specific feedback directly on the images using our review tool, and your editor will make the adjustments usually within 24 hours."
            />
        </div>
      </div>
    </div>
  );
};

export default HelpPage;