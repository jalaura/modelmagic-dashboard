import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context';
import { Platform, ProjectStatus, PackageType } from '../types';
import { ChevronRight, ChevronLeft, Upload, Check, X, Clock, Video, Image as ImageIcon, Package } from 'lucide-react';

const STEPS = ['Brief', 'Uploads', 'Package', 'Review'];

const PACKAGES = [
  {
    id: 'DFY Pack' as PackageType,
    title: 'DFY Pack',
    subtitle: 'Complete Package',
    price: 29.00,
    icon: <Package size={24} />,
    color: 'text-[#1F6B55]',
    features: [
      'Dedicated editor',
      '24-48 hour delivery',
      '10 model images',
      '1 product video (8-10 seconds)'
    ],
    description: 'Everything you need to launch your product.'
  },
  {
    id: 'Image Only' as PackageType,
    title: 'Image Only',
    subtitle: 'Photos Package',
    price: 9.99,
    icon: <ImageIcon size={24} />,
    color: 'text-[#F59E0B]',
    features: [
      'Dedicated editor',
      '24-48 hour delivery',
      '5 model images'
    ],
    description: 'Perfect for product listings and galleries.'
  },
  {
    id: 'Video Only' as PackageType,
    title: 'Video Only',
    subtitle: '1080p Video',
    price: 19.99,
    icon: <Video size={24} />,
    color: 'text-[#EC4899]',
    features: [
      'Dedicated editor',
      '24-48 hour delivery',
      '1 product video (1080p)'
    ],
    description: 'Ideal for social media and product demos.'
  }
];

export const NewProject: React.FC = () => {
  const navigate = useNavigate();
  const { addProject, teamMembers } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Fashion',
    platforms: [] as Platform[],
    brief: '',
    files: [] as File[],
    itemQuantity: 1,
    selectedPackage: PACKAGES[0]
  });

  const totalCost = formData.selectedPackage.price * formData.itemQuantity;

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(c => c + 1);
    } else {
      // Submit
      addProject({
        id: `p${Date.now()}`,
        name: formData.name,
        category: formData.category,
        platforms: formData.platforms,
        status: ProjectStatus.TEAM_ASSIGNED, 
        createdAt: new Date().toISOString(),
        deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Always 2 days
        thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=400&q=80',
        creativeBrief: formData.brief,
        packageType: formData.selectedPackage.id,
        itemQuantity: formData.itemQuantity,
        totalCost: totalCost,
        assignedEditor: teamMembers[0], 
        progressDay: 0,
        totalDays: 2
      });
      navigate('/projects');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1);
  };

  const togglePlatform = (p: Platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(p) 
        ? prev.platforms.filter(x => x !== p)
        : [...prev.platforms, p]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...Array.from(e.target.files || [])]
      }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="inline-block px-3 py-1 rounded-md bg-[#1F6B55]/10 text-[#1F6B55] text-xs font-bold uppercase tracking-wider mb-4">
            Service Request
        </span>
        <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight mb-4">Submit New Project</h1>
        <p className="text-lg text-[#6B7280] font-light max-w-2xl mx-auto">
            Provide your creative vision and assets. Our editing team will handle the rest.
        </p>
      </div>

      {/* Stepper */}
      <div className="mb-16 max-w-3xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-[#E5E7EB] -z-10" />
          {STEPS.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center bg-[#F5F3F0] px-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2 ${
                idx <= currentStep 
                  ? 'bg-[#1F6B55] border-[#1F6B55] text-white shadow-md' 
                  : 'bg-white border-[#E5E7EB] text-[#9CA3AF]'
              }`}>
                {idx + 1}
              </div>
              <span className={`text-xs mt-3 font-bold uppercase tracking-wider ${idx <= currentStep ? 'text-[#1F6B55]' : 'text-[#9CA3AF]'}`}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] p-8 md:p-12 min-h-[500px] flex flex-col relative overflow-hidden">
        {/* Step Indicator Top Right */}
         <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5F3F0] rounded-bl-full -mr-12 -mt-12"></div>
        
        {/* Step 1: Creative Brief */}
        {currentStep === 0 && (
          <div className="space-y-8 max-w-2xl mx-auto w-full animate-fadeIn">
            <div>
              <label className="block text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-3">Project Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Summer 2024 Collection"
                className="w-full px-5 py-3 rounded-md border border-[#E5E7EB] bg-white focus:ring-2 focus:ring-[#1F6B55] focus:border-transparent outline-none transition-all placeholder:text-gray-300 font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-3">Creative Vision</label>
              <textarea 
                value={formData.brief}
                onChange={e => setFormData({...formData, brief: e.target.value})}
                placeholder="Describe the aesthetic, lighting, and mood..."
                rows={6}
                className="w-full px-5 py-3 rounded-md border border-[#E5E7EB] bg-white focus:ring-2 focus:ring-[#1F6B55] focus:border-transparent outline-none transition-all placeholder:text-gray-300 resize-none font-medium"
              />
              <p className="text-xs text-[#6B7280] mt-2 flex items-center gap-1">
                <span className="font-bold">Tip:</span> Link to moodboards or Pinterest in this field.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-3">Category</label>
                <div className="relative">
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full px-5 py-3 rounded-md border border-[#E5E7EB] bg-white focus:ring-2 focus:ring-[#1F6B55] outline-none appearance-none font-medium"
                  >
                    <option>Fashion</option>
                    <option>Jewelry</option>
                    <option>Home Goods</option>
                    <option>Beauty</option>
                    <option>Accessories</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-3">Target Platform</label>
                <div className="flex flex-wrap gap-2">
                  {Object.values(Platform).slice(0, 3).map(p => (
                    <button
                      key={p}
                      onClick={() => togglePlatform(p)}
                      className={`px-4 py-2 rounded-md text-sm font-medium border transition-all ${
                        formData.platforms.includes(p)
                          ? 'bg-[#1F6B55] border-[#1F6B55] text-white'
                          : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#1F6B55] hover:text-[#1F6B55]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Upload */}
        {currentStep === 1 && (
          <div className="space-y-8 w-full max-w-3xl mx-auto animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Upload Product Photos</h2>
              <p className="text-[#6B7280] mt-2">Upload raw files (JPG, PNG, RAW). We'll handle the processing.</p>
            </div>

            <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-16 text-center hover:bg-[#F5F3F0] transition-colors relative group">
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-20 h-20 bg-[#F5F3F0] text-[#1F6B55] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Upload size={32} />
              </div>
              <p className="text-[#1A1A1A] font-bold text-xl mb-2">Click to upload or drag and drop</p>
              <p className="text-[#6B7280] text-sm font-mono">Max 50MB per file</p>
            </div>

            {formData.files.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">Selected Files ({formData.files.length})</h3>
                <div className="bg-[#F5F3F0] rounded-xl p-4 max-h-60 overflow-y-auto">
                  {formData.files.map((file, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-white rounded-lg mb-2 shadow-sm border border-[#E5E7EB]">
                      <span className="text-sm text-[#1A1A1A] font-medium truncate">{file.name}</span>
                      <button 
                        onClick={() => {
                          const newFiles = [...formData.files];
                          newFiles.splice(idx, 1);
                          setFormData({...formData, files: newFiles});
                        }}
                        className="text-[#9CA3AF] hover:text-[#EF4444] transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Package Selection */}
        {currentStep === 2 && (
          <div className="space-y-10 w-full max-w-4xl mx-auto animate-fadeIn">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Choose Your Package</h2>
              <p className="text-[#6B7280] mt-2">Select the service that matches your needs.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {PACKAGES.map((pkg) => (
                <div 
                  key={pkg.id}
                  onClick={() => setFormData({...formData, selectedPackage: pkg})}
                  className={`group relative bg-white border rounded-xl p-8 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    formData.selectedPackage.id === pkg.id 
                      ? 'border-[#1F6B55] ring-2 ring-[#1F6B55] shadow-md' 
                      : 'border-[#E5E7EB] hover:border-[#1F6B55]'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors ${
                    formData.selectedPackage.id === pkg.id ? 'bg-[#1F6B55] text-white' : 'bg-[#F5F3F0] text-[#6B7280] group-hover:text-[#1F6B55]'
                  }`}>
                    {pkg.icon}
                  </div>
                  
                  <h3 className="font-bold text-lg text-[#1A1A1A] mb-1">{pkg.title}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-4">{pkg.subtitle}</p>
                  
                  <p className="text-[#1A1A1A] text-2xl font-bold mb-4 font-mono">${pkg.price}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#6B7280]">
                        <Check size={14} className={`mt-0.5 ${pkg.color}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm text-[#9CA3AF] border-t border-[#F3F4F6] pt-4">{pkg.description}</p>
                  
                  {formData.selectedPackage.id === pkg.id && (
                    <div className="absolute top-4 right-4 text-[#1F6B55]">
                        <Check size={24} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-[#F5F3F0] p-6 rounded-xl max-w-md mx-auto">
              <label className="block text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-2 text-center">Number of Items</label>
              <p className="text-xs text-[#6B7280] text-center mb-4">How many products do you need us to work on?</p>
              
              <div className="flex items-center justify-center gap-4">
                 <button 
                    onClick={() => setFormData({...formData, itemQuantity: Math.max(1, formData.itemQuantity - 1)})}
                    className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center hover:bg-white text-[#1A1A1A] font-bold"
                 >-</button>
                 <input 
                  type="number" 
                  min="1" 
                  value={formData.itemQuantity}
                  onChange={e => setFormData({...formData, itemQuantity: parseInt(e.target.value) || 1})}
                  className="w-24 px-4 py-2 rounded-lg border border-[#E5E7EB] text-center font-bold text-lg focus:outline-none focus:border-[#1F6B55]"
                />
                 <button 
                    onClick={() => setFormData({...formData, itemQuantity: formData.itemQuantity + 1})}
                    className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center hover:bg-white text-[#1A1A1A] font-bold"
                 >+</button>
              </div>
              <p className="text-center mt-4 font-bold text-[#1F6B55]">Total: ${(formData.selectedPackage.price * formData.itemQuantity).toFixed(2)}</p>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 3 && (
          <div className="space-y-8 w-full max-w-xl mx-auto animate-fadeIn">
             <div className="text-center">
              <h2 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Review Project</h2>
              <p className="text-[#6B7280] mt-2">Confirm details before submitting to your editor.</p>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 shadow-sm space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-[#F3F4F6]">
                <span className="text-[#6B7280] font-medium">Project Name</span>
                <span className="font-bold text-[#1A1A1A] text-right">{formData.name}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-[#F3F4F6]">
                <span className="text-[#6B7280] font-medium">Selected Package</span>
                <div className="text-right">
                    <span className="font-bold text-[#1A1A1A] block">{formData.selectedPackage.title}</span>
                    <span className="text-xs text-[#6B7280]">{formData.selectedPackage.subtitle}</span>
                </div>
              </div>
               <div className="flex justify-between items-center pb-4 border-b border-[#F3F4F6]">
                <span className="text-[#6B7280] font-medium">Item Quantity</span>
                <span className="font-bold text-[#1A1A1A] text-right">{formData.itemQuantity}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-[#F3F4F6]">
                <span className="text-[#6B7280] font-medium">Est. Delivery</span>
                <span className="font-bold text-[#1F6B55] text-right bg-[#1F6B55]/10 px-2 py-1 rounded">
                  {new Date(Date.now() + 2 * 86400000).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex justify-between items-end pt-2">
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Total Cost</p>
                  <p className="font-bold text-4xl text-[#1A1A1A] font-mono">${totalCost.toFixed(2)}</p>
                  {formData.itemQuantity > 1 && (
                      <p className="text-xs text-[#6B7280] mt-1">{formData.itemQuantity} items × ${formData.selectedPackage.price.toFixed(2)}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-[#1F6B55]/5 border border-[#1F6B55]/20 p-5 rounded-lg flex gap-4 text-sm text-[#1F6B55]">
              <div className="flex-shrink-0 mt-0.5">
                <Clock size={18} />
              </div>
              <p className="font-medium">Your assigned editor will review your brief within 4 hours. You'll receive a notification when work begins.</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto pt-10 flex justify-between border-t border-[#F3F4F6]">
          <button 
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-md font-bold text-sm transition-colors ${
              currentStep === 0 ? 'text-[#D1D5DB] cursor-not-allowed' : 'text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#F5F3F0]'
            }`}
          >
            <ChevronLeft size={16} /> Back
          </button>
          
          <button 
            onClick={handleNext}
            className="flex items-center gap-2 bg-[#1F6B55] hover:bg-[#164f3f] text-white px-8 py-3 rounded-md font-bold text-sm shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            {currentStep === STEPS.length - 1 ? 'Submit to Team' : 'Next Step'}
            {currentStep !== STEPS.length - 1 && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};