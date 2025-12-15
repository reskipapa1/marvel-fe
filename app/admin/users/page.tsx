'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/user.service';
import { User } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Users,
    Loader2,
    Edit,
    Trash2,
    User as UserIcon,
    Shield,
    Crown,
    X,
    Save,
    Eye,
    EyeOff
} from 'lucide-react';

function AdminUsersContent() {
    const { user } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        role: 'customer' as 'admin' | 'owner' | 'customer'
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await userService.getAll();
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (userItem: User) => {
        setEditingUser(userItem);
        setEditForm({
            name: userItem.name,
            username: userItem.username,
            email: userItem.email,
            password: '', // Kosongkan password untuk keamanan
            role: userItem.role
        });
        setShowPassword(false);
    };

    const handleSaveEdit = async () => {
        if (!editingUser) return;

        // Buat payload tanpa password jika kosong
        const { password, ...payload } = editForm;
        const finalPayload = password.trim() ? { ...payload, password } : payload;

        try {
            await userService.update(editingUser.id, finalPayload);
            alert('User berhasil diupdate!');
            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            alert('Gagal mengupdate user');
        }
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
        setShowPassword(false);
    };

    const handleDelete = async (id: number, name: string) => {
        if (!confirm(`Hapus user ${name}? Tindakan ini tidak dapat dibatalkan.`)) return;

        try {
            await userService.delete(id);
            alert('User berhasil dihapus!');
            fetchUsers();
        } catch (error) {
            alert('Gagal menghapus user');
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'owner': return <Crown className="w-4 h-4 text-yellow-500" />;
            case 'admin': return <Shield className="w-4 h-4 text-blue-500" />;
            default: return <UserIcon className="w-4 h-4 text-gray-500" />;
        }
    };

    const getRoleStyle = (role: string) => {
        switch (role) {
            case 'owner': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'admin': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans relative overflow-x-hidden">

            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Image
                    src="/bg-dashboard.jpg"
                    alt="Background"
                    fill
                    className="object-cover blur-2xl opacity-30 scale-110"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/80 via-[#0B0F19]/90 to-[#0B0F19]"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12 max-w-7xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10"
                >
                    <div>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm">Kembali ke Dashboard</span>
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                            <Users className="text-indigo-500" size={32} />
                            Kelola Users
                        </h1>
                        <p className="text-slate-400 mt-1">Daftar semua user dalam sistem.</p>
                    </div>
                </motion.div>

                {/* Edit Modal */}
                {editingUser && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-[#151925] border border-white/10 rounded-[2rem] p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">Edit User</h3>
                                <button
                                    onClick={handleCancelEdit}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Nama</label>
                                    <input
                                        type="text"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                                        placeholder="Masukkan nama lengkap"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Username</label>
                                    <input
                                        type="text"
                                        value={editForm.username}
                                        onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                                        placeholder="Masukkan username"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={editForm.email}
                                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                                        placeholder="Masukkan email"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">
                                        Password Baru <span className="text-xs text-slate-500">(kosongkan jika tidak ingin mengubah)</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={editForm.password}
                                            onChange={(e) => setEditForm({...editForm, password: e.target.value})}
                                            className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                                            placeholder="Masukkan password baru (min 8 karakter)"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Role</label>
                                    <select
                                        value={editForm.role}
                                        onChange={(e) => setEditForm({...editForm, role: e.target.value as 'admin' | 'owner' | 'customer'})}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="admin">Admin</option>
                                        <option value="owner">Owner</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8">
                                <button
                                    onClick={handleCancelEdit}
                                    className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleSaveEdit}
                                    className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <Save size={16} />
                                    Simpan
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                            <p className="text-slate-500 animate-pulse">Memuat data user...</p>
                        </div>
                    ) : (
                        <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-white/5 border-b border-white/5">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Data User</th>
                                            <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {users.map((userItem, index) => (
                                            <tr key={userItem.id} className={`hover:bg-white/5 transition-colors ${index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'}`}>
                                                <td className="px-6 py-5 whitespace-nowrap">
                                                    <span className="font-mono text-indigo-400 font-bold">#{userItem.id}</span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-white/5 rounded-lg text-slate-400">
                                                            <UserIcon size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-medium">{userItem.name}</p>
                                                            <p className="text-xs text-slate-400">@{userItem.username}</p>
                                                            <p className="text-xs text-slate-400">{userItem.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 whitespace-nowrap">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 ${getRoleStyle(userItem.role)}`}>
                                                        {getRoleIcon(userItem.role)}
                                                        {userItem.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 whitespace-nowrap">
                                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-green-500/10 text-green-400 border-green-500/20">
                                                        Aktif
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 whitespace-nowrap text-right">
                                                    {userItem.role === 'admin' ? (
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => handleEdit(userItem)}
                                                                className="flex items-center gap-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-all group"
                                                                title="Edit"
                                                            >
                                                                <Edit size={16} className="group-hover:scale-110 transition-transform" />
                                                                <span className="hidden md:inline">Edit</span>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(userItem.id, userItem.name)}
                                                                className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-all group"
                                                                title="Hapus"
                                                            >
                                                                <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
                                                                <span className="hidden md:inline">Hapus</span>
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-slate-500 italic">Tidak ada aksi</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        {users.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                                    Belum ada data user.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </motion.div>

            </div>
        </div>
    );
}

export default function AdminUsersPage() {
    return (
        <ProtectedRoute allowedRoles={['owner']}>
            <AdminUsersContent />
        </ProtectedRoute>
    );
}
