import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Award, 
  SearchCheck, 
  ArrowRight, 
  Trash2, 
  Printer, 
  Lock, 
  Sparkles, 
  School, 
  Mail, 
  Phone, 
  User, 
  Calendar,
  AlertCircle,
  Clock,
  ShieldCheck,
  Check,
  AlertTriangle,
  Building
} from 'lucide-react';

interface InternshipRole {
  id: string;
  title: string;
  domain: string;
  duration: string;
  type: string;
  stipend: string;
  description: string;
  requirements: string[];
}

interface CertificateRecord {
  internId: string;
  name: string;
  hashKey: string;
  domain: string;
  grade: string;
  completionDate: string;
  duration: string;
  certToken?: string;
  driveFileId?: string | null;
  previewUrl?: string | null;
}

export default function Internship() {
  // Application form state
  const [activeTab, setActiveTab] = useState<'apply' | 'certificate'>('apply');
  const [selectedRole, setSelectedRole] = useState<string>('embedded');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    branch: 'IoT',
    branchOther: '',
    startDate: '',
    experience: 'None'
  });

  // Secure 2-phase verification states
  const [verificationStep, setVerificationStep] = useState<'enter-id' | 'verify-challenge'>('enter-id');
  const [internIdInput, setInternIdInput] = useState<string>('');
  const [enteredChallenge, setEnteredChallenge] = useState<string>('');
  const [enteredHashKeyBlock, setEnteredHashKeyBlock] = useState<string>('');
  const [activeChallenge, setActiveChallenge] = useState<string>('');
  const [expiresIn, setExpiresIn] = useState<number>(300);
  const [timerSeconds, setTimerSeconds] = useState<number>(300);
  const [isRequestingChallenge, setIsRequestingChallenge] = useState<boolean>(false);
  const [isVerifyingChallenge, setIsVerifyingChallenge] = useState<boolean>(false);
  
  const [retrievedCert, setRetrievedCert] = useState<CertificateRecord | null>(null);
  const [certError, setCertError] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);



  const roles: InternshipRole[] = [
    {
      id: 'embedded',
      title: 'Embedded Firmware & RTOS Intern',
      domain: 'Hardware & IoT',
      duration: '3 - 6 Months',
      type: 'Hybrid (Bengaluru / Remote)',
      stipend: 'Competitive (Performance-based)',
      description: 'Work alongside core hardware architects to capture schematics and deploy multi-threaded real-time firmware directly to dual-core Xtensa microprocessors using FreeRTOS registers.',
      requirements: [
        'Sound programming knowledge of C and modern embedded C++.',
        'Familiarity with SPI, I2C, UART registers, and ADC calibration curves.',
        'Previous academic experience drafting basic schematics is highly valued.'
      ]
    },
    {
      id: 'pcb',
      title: 'High-Density PCB Layout & Simulation Intern',
      domain: 'Hardware Design',
      duration: '3 Months',
      type: 'On-site (Bengaluru Office)',
      stipend: 'Competitive stipend',
      description: 'Assist in drafting multi-layer test shields, routing symmetric high-speed impedance controlled traces, and executing thermal simulations inside modern EDA/CAD software environments.',
      requirements: [
        'Familiarity with KiCad or Altium Designer grid configurations.',
        'Basic understanding of electromagnetic compliance (EMC) guidelines.',
        'Strong attention to detail regarding mechanical tolerances and PCB trace alignments.'
      ]
    },
    {
      id: 'edgeai',
      title: 'TinyML & Edge Artificial Intelligence Intern',
      domain: 'Embedded AI',
      duration: '3 - 6 Months',
      type: 'Hybrid (Remote / On-site)',
      stipend: 'Stipend + project incentives',
      description: 'Support the development and integration of quantized neural network models (anomaly detectors, vibration classifiers) onto low-memory ESP32-S3 and ARM Cortex microcontrollers.',
      requirements: [
        'Proficient in Python, TensorFlow/Keras, and NumPy operations.',
        'Acknowledge deep learning model compression rules (quantization, pruning).',
        'Ability to wrap compiled Flatbuffers inside firmware headers.'
      ]
    }
  ];

  const currentRole = roles.find(r => r.id === selectedRole) || roles[0];

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf" || file.name.endsWith('.pdf') || file.name.endsWith('.docx')) {
        setResumeFile(file);
      } else {
        alert("Please upload a PDF or DOCX file.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  // Submit Application
  const handleSubmitApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      alert("Please upload your professional CV/Resume first.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const getBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
        });
      };
      
      const resumeBase64 = await getBase64(resumeFile);

      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        collegeName: formData.college,
        department: formData.branch,
        departmentOther: formData.branchOther,
        startDate: formData.startDate,
        priorExperience: formData.experience,
        resume: {
          name: resumeFile.name,
          data: resumeBase64
        }
      };

      const res = await fetch('/api/internship-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Failed to transmit application.');

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setResumeFile(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        college: '',
        branch: 'IoT',
        branchOther: '',
        startDate: '',
        experience: 'None'
      });
    } catch (err) {
      console.error(err);
      alert('Error submitting application. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Timer for active challenge session
  const startTimer = (durationSeconds: number) => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setTimerSeconds(durationSeconds);
    timerIntervalRef.current = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current!);
          setCertError('Verification session expired. Please request a new challenge code.');
          setVerificationStep('enter-id');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Clean up timer on unmount
  React.useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  // Format countdown timer (MM:SS)
  const formatTimer = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Phase 1: Request Secure Verification Challenge
  const handleRequestChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!internIdInput.trim()) {
      setCertError('Please enter a valid Intern ID.');
      return;
    }

    setIsRequestingChallenge(true);
    setCertError('');
    setRetrievedCert(null);
    setEnteredHashKeyBlock('');

    try {
      const response = await fetch('/api/request-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internId: internIdInput.trim() })
      });

      const data = await response.json();
      if (!response.ok || !data.challenge) {
        setCertError(data.message || 'Invalid Intern ID or request failed.');
        return;
      }

      setActiveChallenge(data.challenge);
      setExpiresIn(data.expiresIn || 300);
      setVerificationStep('verify-challenge');
      setEnteredChallenge('');
      startTimer(data.expiresIn || 300);
    } catch (err) {
      setCertError('Failed to connect to the verification server.');
      console.error(err);
    } finally {
      setIsRequestingChallenge(false);
    }
  };

  // Phase 2: Verify challenge via HMAC signature check
  const handleVerifyChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredChallenge.trim().length !== 4) {
      setCertError('Please enter the complete 4-character verification code.');
      return;
    }
    if (enteredHashKeyBlock.trim().length !== 4) {
      setCertError('Please enter the complete 4-character hash key block.');
      return;
    }

    setIsVerifyingChallenge(true);
    setCertError('');

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          internId: internIdInput.trim(),
          challenge: enteredChallenge.trim().toUpperCase(),
          hashKeyBlock: enteredHashKeyBlock.trim().toUpperCase()
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setCertError(data.message || 'Verification Failed. Double check the code and try again.');
        return;
      }

      // Stop timer
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }

      // Decrypted successfully - Load certificate record
      setRetrievedCert({
        internId: data.internId,
        name: data.name,
        hashKey: data.hashKey || 'SECURE-HMAC-VERIFIED-REGISTRY-BLOCK',
        domain: 'Advanced Embedded Systems & Edge Intelligence Cohort',
        grade: 'Outstanding (A+)',
        completionDate: 'July 15, 2026',
        duration: '3 Months',
        certToken: data.certToken,
        driveFileId: data.driveFileId,
        previewUrl: data.previewUrl
      });

      setVerificationStep('enter-id');
      setEnteredChallenge('');
    } catch (err) {
      setCertError('Failed to verify challenge with server.');
      console.error(err);
    } finally {
      setIsVerifyingChallenge(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="internship" className="py-24 relative overflow-hidden bg-neutral-950 border-t border-white/5">
      {/* Visual background atmospheric lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-purple/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-brand-cyan/5 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs text-brand-purple font-mono uppercase tracking-widest bg-brand-purple/10 px-3 py-1 rounded-full border border-brand-purple/20 inline-flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-brand-purple" />
            CAREER PIPELINES & ALUMNI
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-white">
            Internships & Certificates
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
            Apply to our intensive hands-on development programs or retrieve your cryptographically secure E-Certificates using your unique graduation credentials.
          </p>

          {/* Selector Tabs */}
          <div className="flex justify-center pt-6">
            <div className="flex bg-neutral-900 border border-white/5 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('apply')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'apply'
                    ? 'bg-white text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                Apply for Internship
              </button>
              <button
                onClick={() => setActiveTab('certificate')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'certificate'
                    ? 'bg-white text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                Retrieve E-Certificate
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: Apply for Internship */}
        {activeTab === 'apply' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
            
            {/* Left Col: Open positions catalog */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider border-b border-white/5 pb-3">
                Active Openings
              </h3>

              <div className="flex flex-col gap-4">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-5 rounded-2xl text-left border transition-all relative overflow-hidden group ${
                      selectedRole === role.id
                        ? 'bg-neutral-900/80 border-brand-purple/40 shadow-lg shadow-brand-purple/5'
                        : 'bg-neutral-900/20 border-white/5 hover:border-white/10 hover:bg-neutral-900/40'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[9px] font-mono font-semibold text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded border border-brand-purple/20 uppercase tracking-wider">
                          {role.domain}
                        </span>
                        <h4 className="text-base font-display font-bold text-white mt-2 group-hover:text-brand-purple transition-colors">
                          {role.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500 whitespace-nowrap">
                        {role.duration}
                      </span>
                    </div>
                    
                    <p className="text-xs text-neutral-400 font-light mt-3 line-clamp-2 leading-relaxed">
                      {role.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                      <span>Type: {role.type.split(' ')[0]}</span>
                      <span className="text-neutral-300 font-medium">{role.stipend}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Requirements box based on chosen opening */}
              <div className="p-5 rounded-2xl bg-neutral-900/40 border border-white/5 space-y-4">
                <h4 className="text-xs text-white font-display font-bold uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-cyan" />
                  Prerequisites for selection
                </h4>
                <div className="flex flex-col gap-3">
                  {currentRole.requirements.map((req, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start text-xs text-neutral-300 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-1.5 flex-shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Internship Apply Form */}
            <div className="lg:col-span-7 bg-neutral-900/40 p-6 sm:p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="mb-6">
                <h3 className="text-xl font-display font-bold text-white">
                  Application Intake Portal
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  You are applying for the <span className="text-brand-purple font-semibold">{currentRole.title}</span> track.
                </p>
              </div>

              {submitSuccess ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white">Application Successfully Transmitted!</h4>
                    <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed font-light">
                      Thank you for submitting your profile. Our Technical Review Board will evaluate your GitHub projects and resume. Eligible applicants will receive an invitation to schedule an interactive video review session within 3 business days.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-100 transition-colors"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitApp} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full name */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-semibold text-neutral-400 uppercase tracking-wide">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                          type="text"
                          placeholder="e.g. Rahul Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-neutral-950 border border-white/5 text-neutral-200 focus:outline-none focus:border-brand-purple/50 transition-all placeholder-neutral-600"
                          required
                        />
                      </div>
                    </div>

                    {/* Email address */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-semibold text-neutral-400 uppercase tracking-wide">E-mail Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                          type="email"
                          placeholder="e.g. rahul@university.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-neutral-950 border border-white/5 text-neutral-200 focus:outline-none focus:border-brand-purple/50 transition-all placeholder-neutral-600"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-semibold text-neutral-400 uppercase tracking-wide">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                          type="tel"
                          placeholder="e.g. +91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-neutral-950 border border-white/5 text-neutral-200 focus:outline-none focus:border-brand-purple/50 transition-all placeholder-neutral-600"
                          required
                        />
                      </div>
                    </div>

                    {/* College */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-semibold text-neutral-400 uppercase tracking-wide">College / University</label>
                      <div className="relative">
                        <School className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                          type="text"
                          placeholder="e.g. RV College of Engineering"
                          value={formData.college}
                          onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-neutral-950 border border-white/5 text-neutral-200 focus:outline-none focus:border-brand-purple/50 transition-all placeholder-neutral-600"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Stream/Branch */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-semibold text-neutral-400 uppercase tracking-wide">Academic Stream / Degree</label>
                      <div className="relative">
                        <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 z-10" />
                        <select
                          value={formData.branch}
                          onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-neutral-950 border border-white/5 text-neutral-200 focus:outline-none focus:border-brand-purple/50 transition-all appearance-none"
                          required
                        >
                          <option value="IoT">IoT</option>
                          <option value="Embedded Systems">Embedded Systems</option>
                          <option value="Robotics">Robotics</option>
                          <option value="Home Automation">Home Automation</option>
                          <option value="Industrial Automation">Industrial Automation</option>
                          <option value="Artificial Intelligence">Artificial Intelligence</option>
                          <option value="Drones">Drones</option>
                          <option value="Other">Other:</option>
                        </select>
                      </div>
                      {formData.branch === 'Other' && (
                        <div className="relative mt-2">
                          <input
                            type="text"
                            placeholder="Please specify..."
                            value={formData.branchOther}
                            onChange={(e) => setFormData({ ...formData, branchOther: e.target.value })}
                            className="w-full px-4 py-2 text-xs rounded-xl bg-neutral-900 border border-white/5 text-neutral-200 focus:outline-none focus:border-brand-purple/50 transition-all placeholder-neutral-600"
                            required
                          />
                        </div>
                      )}
                    </div>

                    {/* Start date */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-semibold text-neutral-400 uppercase tracking-wide">Earliest Feasible Start Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-neutral-950 border border-white/5 text-neutral-200 focus:outline-none focus:border-brand-purple/50 transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Drag-and-Drop file upload zone */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-semibold text-neutral-400 uppercase tracking-wide">
                      Upload Resume / CV <span className="text-red-400">*</span>
                    </label>
                    
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-40 ${
                        isDragActive
                          ? 'border-brand-purple bg-brand-purple/5'
                          : resumeFile
                            ? 'border-emerald-500/30 bg-emerald-500/5'
                            : 'border-white/10 hover:border-white/20 bg-neutral-950/40 hover:bg-neutral-950/80'
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.docx"
                        className="hidden"
                      />

                      {resumeFile ? (
                        <div className="space-y-3">
                          <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                            <FileText className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white truncate max-w-xs">{resumeFile.name}</p>
                            <p className="text-[10px] text-neutral-500 font-mono mt-0.5">{(resumeFile.size / (1024 * 1024)).toFixed(2)} MB &bull; PDF format ready</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setResumeFile(null);
                            }}
                            className="text-[11px] text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 mx-auto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Remove File
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <UploadCloud className="w-8 h-8 text-neutral-500 mx-auto animate-pulse" />
                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-neutral-300">
                              Drag and drop your CV file, or <span className="text-brand-purple">browse</span>
                            </p>
                            <p className="text-[10px] text-neutral-500 leading-normal max-w-xs mx-auto">
                              Supports professional PDF or DOCX formats under 10MB sizes.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submission triggers */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-95 active:scale-95 shadow-md shadow-brand-purple/10 disabled:opacity-50 transition-all text-center flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin text-white" />
                        Transmitting Application Packet...
                      </>
                    ) : (
                      <>
                        Apply and Transmit Credentials
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: Retrieve E-Certificate */}
        {activeTab === 'certificate' && (
          <div className="space-y-12">
            
            {/* Input form terminal */}
            <div className="max-w-2xl mx-auto bg-neutral-900/40 p-6 sm:p-8 rounded-2xl border border-white/5 backdrop-blur-sm text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="mb-6 space-y-1">
                <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <SearchCheck className="w-5 h-5 text-brand-cyan" />
                  Alumni Authentication Gateway
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Secure multi-step internship verification gateway with cryptographically signed challenge authentication.
                </p>
              </div>

              {verificationStep === 'enter-id' ? (
                <form onSubmit={handleRequestChallenge} className="space-y-4">
                  {/* PAB Intern ID */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-semibold text-neutral-400 uppercase tracking-wide">PAB Intern ID</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                      <input
                        type="text"
                        placeholder="e.g. PAB-SI-26-001"
                        value={internIdInput}
                        onChange={(e) => setInternIdInput(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-neutral-950 border border-white/5 text-neutral-200 focus:outline-none focus:border-brand-cyan/50 transition-all placeholder-neutral-700"
                        required
                      />
                    </div>
                  </div>

                  {certError && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-[11px] text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{certError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isRequestingChallenge}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-neutral-950 bg-white hover:bg-neutral-100 disabled:opacity-50 transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    {isRequestingChallenge ? (
                      <>
                        <Clock className="w-3.5 h-3.5 animate-spin" />
                        Verifying ID & Generating Challenge...
                      </>
                    ) : (
                      <>
                        Request Verification Challenge
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyChallenge} className="space-y-5">
                  {/* Secure Challenge Code Banner */}
                  <div className="p-5 rounded-2xl bg-neutral-950 border border-brand-cyan/20 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-cyan/5 rounded-full blur-xl pointer-events-none" />
                    <span className="text-[9px] font-mono font-semibold text-brand-cyan uppercase tracking-widest bg-brand-cyan/10 px-2 py-0.5 rounded border border-brand-cyan/25">
                      SECURE CHALLENGE GENERATED
                    </span>
                    <div className="text-3xl sm:text-4xl font-mono font-extrabold tracking-[0.5em] pl-[0.5em] text-white my-3 select-all">
                      {activeChallenge}
                    </div>
                    <p className="text-[10px] text-neutral-400 font-light max-w-sm">
                      This secure 4-character code is stored in temporary server session cache. Enter it below to complete HMAC-SHA256 verification.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Code Input */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-semibold text-neutral-400 uppercase tracking-wide">Enter Verification Code</label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                        <input
                          type="text"
                          placeholder="e.g. 7A2F"
                          maxLength={4}
                          value={enteredChallenge}
                          onChange={(e) => setEnteredChallenge(e.target.value.toUpperCase())}
                          className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-neutral-950 border border-white/5 text-neutral-200 focus:outline-none focus:border-brand-cyan/50 tracking-widest font-mono text-center uppercase"
                          required
                        />
                      </div>
                    </div>

                    {/* Hash Key Block Input */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-semibold text-neutral-400 uppercase tracking-wide">
                        Enter 4-Digit Hash Key Block
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                        <input
                          type="text"
                          placeholder="e.g. 9546"
                          maxLength={4}
                          value={enteredHashKeyBlock}
                          onChange={(e) => setEnteredHashKeyBlock(e.target.value.toUpperCase())}
                          className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-neutral-950 border border-white/5 text-neutral-200 focus:outline-none focus:border-brand-cyan/50 tracking-widest font-mono text-center uppercase"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono pt-1">
                    <span>Session expires in: <span className="text-brand-cyan font-semibold">{formatTimer(timerSeconds)}</span></span>
                    <button 
                      type="button" 
                      onClick={() => {
                        setVerificationStep('enter-id');
                        setCertError('');
                      }}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      Change Intern ID
                    </button>
                  </div>

                  {certError && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-[11px] text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{certError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isVerifyingChallenge}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-neutral-950 bg-white hover:bg-neutral-100 disabled:opacity-50 transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    {isVerifyingChallenge ? (
                      <>
                        <Clock className="w-3.5 h-3.5 animate-spin" />
                        Executing Cryptographic Signature Match...
                      </>
                    ) : (
                      <>
                        Verify Signature & Retrieve E-Certificate
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}


            </div>

            {/* Certificate Display Screen */}
            <AnimatePresence>
              {retrievedCert && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  className="space-y-6"
                >
                  <div className="w-full space-y-6">
                    {/* Success Header */}
                    <div className="p-6 rounded-2xl bg-neutral-900/60 border border-emerald-500/20 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-display font-bold text-white">
                          Verification Successful
                        </h3>
                        <p className="text-xs text-neutral-400 mt-1">
                          Hi <strong className="text-white">{retrievedCert.name}</strong>, your E-Certificate has been securely retrieved.
                        </p>
                      </div>
                    </div>

                    {/* Certificate Embed Preview */}
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan/30 to-brand-purple/30 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                      <div className="relative bg-neutral-900 ring-1 ring-white/10 rounded-2xl p-2 sm:p-4 min-h-[400px] flex flex-col justify-center items-center">
                        {retrievedCert.driveFileId && retrievedCert.previewUrl ? (
                          retrievedCert.previewUrl.includes(retrievedCert.driveFileId) ? (
                            <>
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900/80 backdrop-blur-sm z-10 pointer-events-none transition-opacity duration-500 iframe-loader">
                                <Clock className="w-8 h-8 text-brand-cyan animate-spin mb-3" />
                                <p className="text-sm text-neutral-300 font-mono">Checking certificate...</p>
                              </div>
                              <iframe
                                src={retrievedCert.previewUrl}
                                className="w-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px] border-none rounded-xl bg-white/5 relative z-0"
                                title={`E-Certificate — ${retrievedCert.name}`}
                                allow="autoplay"
                                onLoad={(e) => {
                                  const loader = e.currentTarget.parentElement?.querySelector('.iframe-loader');
                                  if (loader) loader.classList.add('opacity-0');
                                }}
                              />
                            </>
                          ) : (
                            <div className="w-full flex flex-col items-center justify-center text-center p-8">
                              <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                              <p className="text-white text-lg font-bold">Certificate link unavailable</p>
                              <p className="text-neutral-400 text-sm mt-2">Security mismatch detected between stored ID and generated preview URL.</p>
                            </div>
                          )
                        ) : (
                          <div className="w-full flex flex-col items-center justify-center text-center p-8">
                            <AlertTriangle className="w-12 h-12 text-amber-500 mb-4 opacity-80" />
                            <p className="text-white text-lg font-bold">Certificate not available</p>
                            <p className="text-neutral-400 text-sm mt-2">The verified student record exists, but the document link is missing or invalid in our registry.</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap gap-3 justify-between items-center">
                      <button
                        onClick={() => {
                          setRetrievedCert(null);
                          setInternIdInput('');
                          setEnteredChallenge('');
                          setActiveChallenge('');
                          setCertError('');
                        }}
                        className="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white transition-all bg-neutral-800 border border-white/5"
                      >
                        Close Preview
                      </button>
                      {retrievedCert.driveFileId && (
                        <a
                          href={`https://drive.google.com/file/d/${retrievedCert.driveFileId}/view?usp=sharing`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-950 bg-brand-cyan hover:bg-brand-cyan/90 transition-all flex items-center gap-2"
                        >
                          <Award className="w-4 h-4" />
                          Open in Google Drive
                        </a>
                      )}
                    </div>

                    {/* Verification Metadata */}
                    <div className="text-[10px] text-neutral-500 font-mono p-3 bg-neutral-950 rounded-lg border border-white/5">
                      Verification ID: <span className="text-brand-cyan">{retrievedCert.hashKey}</span> <br />
                      Intern ID: <span className="text-white">{retrievedCert.internId}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}
