'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
    Zap, 
    ShieldCheck, 
    Banknote, 
    CheckCircle2, 
    ArrowRight, 
    CreditCard
} from 'lucide-react';

// Variabel animasi
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    visible: { transition: { staggerChildren: 0.2 } }
};

export default function HomePage() {
    return (
        <div className="min-h-screen font-sans text-gray-900 overflow-x-hidden">
            
            {/* --- HERO SECTION --- */}
            <section className="relative bg-slate-900 text-white pt-24 pb-32 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div 
                        initial="hidden" 
                        animate="visible" 
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
                            <span className="bg-blue-500/20 text-blue-200 text-sm font-semibold px-4 py-1.5 rounded-full border border-blue-500/30">
                                🚀 Solusi Keuangan #1 di Indonesia
                            </span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                            Solusi Pinjaman Online <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Terpercaya & Cepat
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-lg md:text-2xl mb-10 text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            Proses cair dalam hitungan menit. Tanpa ribet, data aman, dan bunga yang sangat kompetitif untuk kebutuhan Anda.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/register">
                                <motion.button 
                                    whileHover={{ scale: 1.05 }} 
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition flex items-center gap-2"
                                >
                                    Daftar Sekarang <ArrowRight size={20} />
                                </motion.button>
                            </Link>
                            <Link href="/login">
                                <motion.button 
                                    whileHover={{ scale: 1.05 }} 
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-full font-bold text-lg text-white border border-slate-600 hover:bg-slate-800 transition bg-slate-900/50 backdrop-blur-sm"
                                >
                                    Login Akun
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full leading-none rotate-180 text-slate-50">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
                    </svg>
                </div>
            </section>

            {/* --- FEATURES SECTION --- */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Kenapa Memilih Kami?</h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">Kami berkomitmen memberikan layanan terbaik dengan teknologi terkini untuk kenyamanan finansial Anda.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={Zap} 
                            title="Proses Kilat" 
                            desc="Sistem otomatis kami memproses pengajuan Anda dalam hitungan menit, bukan hari." 
                            color="text-amber-500"
                            bg="bg-amber-100"
                        />
                        <FeatureCard 
                            icon={ShieldCheck} 
                            title="Keamanan Terjamin" 
                            desc="Data Anda dienkripsi dengan standar keamanan tingkat bank internasional." 
                            color="text-blue-500"
                            bg="bg-blue-100"
                        />
                        <FeatureCard 
                            icon={Banknote} 
                            title="Bunga Kompetitif" 
                            desc="Nikmati suku bunga rendah dan tenor fleksibel yang tidak membebani." 
                            color="text-emerald-500"
                            bg="bg-emerald-100"
                        />
                    </div>
                </div>
            </section>

            {/* --- BENEFITS SECTION --- */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <motion.div 
                            className="w-full md:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                                Keuntungan Eksklusif <br/> 
                                <span className="text-blue-600">Tanpa Syarat Rumit</span>
                            </h2>
                            <p className="text-slate-600 mb-8 text-lg">
                                Kami menyederhanakan birokrasi perbankan konvensional agar Anda bisa fokus pada kebutuhan Anda.
                            </p>
                            
                            <div className="space-y-4">
                                <BenefitItem text="Hanya butuh KTP & NPWP" />
                                <BenefitItem text="Pencairan langsung ke rekening" />
                                <BenefitItem text="Tanpa Agunan (KTA)" />
                                <BenefitItem text="Layanan CS 24/7 Siap Membantu" />
                            </div>
                        </motion.div>

                        <motion.div 
                            className="w-full md:w-1/2 relative"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-2xl relative z-10 text-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <p className="text-slate-400 text-sm">Total Limit</p>
                                        <h3 className="text-3xl font-bold">Rp 50.000.000</h3>
                                    </div>
                                    <CreditCard size={32} className="text-blue-400"/>
                                </div>
                                <div className="h-1 w-full bg-slate-700 rounded-full mb-8 overflow-hidden">
                                    <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs text-slate-400">Card Holder</p>
                                        <p className="font-semibold tracking-wide">MEMBER GOLD</p>
                                    </div>
                                    <div className="w-10 h-6 bg-yellow-500/80 rounded flex justify-center items-center">
                                        <div className="w-6 h-4 border border-yellow-200/50 rounded-sm"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -inset-4 bg-blue-600/30 blur-2xl rounded-full z-0"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="py-20 bg-blue-600 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Siap Mewujudkan Rencana Anda?</h2>
                        <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
                            Jangan biarkan dana menjadi penghalang. Ajukan sekarang dan dapatkan persetujuan instan.
                        </p>
                        <Link href="/register">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-blue-700 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-slate-100 transition"
                            >
                                Mulai Pengajuan →
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h4 className="text-white text-xl font-bold">Pinjaman<span className="text-blue-500">App</span></h4>
                        <p className="text-sm mt-2">Solusi finansial masa depan.</p>
                    </div>
                    <div className="text-sm text-center md:text-right">
                        <p>&copy; {new Date().getFullYear()} PT Finansial Masa Depan. All rights reserved.</p>
                        <div className="flex gap-4 justify-center md:justify-end mt-4">
                            <a href="#" className="hover:text-white transition">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// --- SUB-COMPONENTS (Fixed for TypeScript) ---

interface FeatureCardProps {
    icon: any; 
    title: string;
    desc: string;
    color: string;
    bg: string;
}

function FeatureCard({ icon: Icon, title, desc, color, bg }: FeatureCardProps) {
    return (
        <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
        >
            <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center mb-6`}>
                <Icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
            <p className="text-slate-500 leading-relaxed">{desc}</p>
        </motion.div>
    );
}

interface BenefitItemProps {
    text: string;
}

function BenefitItem({ text }: BenefitItemProps) {
    return (
        <div className="flex items-center gap-4">
            <div className="min-w-[24px] text-green-500">
                <CheckCircle2 size={24} />
            </div>
            <p className="text-lg text-slate-700 font-medium">{text}</p>
        </div>
    );
}