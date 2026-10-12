import React, { useState } from 'react';
import { Heart, Plus, Edit2, Trash2, Calendar, Sparkles, Image, X, Check } from 'lucide-react';
import { TimelineMemory } from '../types';
import { INITIAL_MEMORIES } from '../data/initialData';

interface TimelineSectionProps {
  isDarkMode: boolean;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ isDarkMode }) => {
  const [memories, setMemories] = useState<TimelineMemory[]>(() => {
    try {
      const saved = localStorage.getItem('nummu_shaisuu_memories');
      if (saved) return JSON.parse(saved);
      return INITIAL_MEMORIES;
    } catch {
      return INITIAL_MEMORIES;
    }
  });

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMemory, setEditingMemory] = useState<TimelineMemory | null>(null);

  // Form fields
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState<TimelineMemory['category']>('Special Moments');
  const [formPhotoUrl, setFormPhotoUrl] = useState('');

  const saveToStorage = (updated: TimelineMemory[]) => {
    setMemories(updated);
    try {
      localStorage.setItem('nummu_shaisuu_memories', JSON.stringify(updated));
    } catch {
      // storage quota or error
    }
  };

  const openAddModal = () => {
    setEditingMemory(null);
    setFormTitle('');
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormDescription('');
    setFormCategory('Special Moments');
    setFormPhotoUrl('');
    setIsAddModalOpen(true);
  };

  const openEditModal = (mem: TimelineMemory) => {
    setEditingMemory(mem);
    setFormTitle(mem.title);
    setFormDate(mem.displayDate);
    setFormDescription(mem.description);
    setFormCategory(mem.category);
    setFormPhotoUrl(mem.photoUrl || '');
    setIsAddModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this memory from our journal?')) {
      const updated = memories.filter((m) => m.id !== id);
      saveToStorage(updated);
    }
  };

  const handleSaveMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim()) return;

    if (editingMemory) {
      const updated = memories.map((m) =>
        m.id === editingMemory.id
          ? {
              ...m,
              title: formTitle,
              displayDate: formDate || m.displayDate,
              description: formDescription,
              category: formCategory,
              photoUrl: formPhotoUrl || undefined,
            }
          : m
      );
      saveToStorage(updated);
    } else {
      const newMemory: TimelineMemory = {
        id: `mem-${Date.now()}`,
        date: formDate,
        displayDate: formDate,
        title: formTitle,
        description: formDescription,
        category: formCategory,
        photoUrl: formPhotoUrl || undefined,
      };
      saveToStorage([newMemory, ...memories]);
    }

    setIsAddModalOpen(false);
  };

  // Image file handler to Base64
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const categories = ['All', 'Milestone', 'Conversations', 'Special Moments', 'Long Distance', 'Future Dreams'];

  const filteredMemories = memories.filter((m) =>
    activeFilter === 'All' ? true : m.category === activeFilter
  );

  return (
    <section id="story" className="py-16 md:py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-rose-500/15 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Memory Journal</span>
            </div>
            <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
              isDarkMode ? 'text-rose-100' : 'text-slate-900'
            }`}>
              Our Love Story Timeline ❤️
            </h2>
            <p className={`mt-2 text-sm sm:text-base max-w-xl ${
              isDarkMode ? 'text-rose-300/80' : 'text-slate-600'
            }`}>
              From our first meeting to our future Nikah in 2032. Every memory between Nummu & Shaisuu is etched here.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="self-start sm:self-auto px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md hover:from-rose-500 hover:to-pink-500 transition-all flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Memory</span>
          </button>
        </div>

        {/* Category Filters (Segmented tabs - allowed by design guidelines) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap shrink-0 ${
                activeFilter === cat
                  ? 'bg-rose-500 text-white shadow-sm'
                  : isDarkMode
                  ? 'bg-rose-950/40 text-rose-300/80 hover:bg-rose-900/40'
                  : 'bg-rose-50/80 text-slate-600 hover:bg-rose-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-rose-500/30 space-y-10 sm:space-y-12">
          
          {filteredMemories.map((mem) => (
            <div key={mem.id} className="relative group">
              
              {/* Timeline Heart Node */}
              <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-md shadow-rose-500/30 ring-4 ${
                isDarkMode ? 'ring-[#150a10]' : 'ring-[#fffcf9]'
              }`}>
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white" />
              </div>

              {/* Memory Card */}
              <div className={`p-5 sm:p-7 rounded-3xl border shadow-md backdrop-blur-xl transition-all duration-300 group-hover:border-rose-400/50 ${
                isDarkMode ? 'glass-panel-dark' : 'glass-panel-light'
              }`}>
                
                {/* Card Top Metadata (Zero-pill discipline: clean unboxed text) */}
                <div className={`flex flex-wrap items-center justify-between text-xs mb-2 gap-2 ${
                  isDarkMode ? 'text-rose-400' : 'text-rose-600'
                }`}>
                  <div className="flex items-center gap-2 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="font-semibold">{mem.displayDate}</span>
                    <span aria-hidden="true">·</span>
                    <span className={isDarkMode ? 'text-rose-300/80' : 'text-slate-500'}>{mem.category}</span>
                  </div>

                  {/* Actions for editing & deleting */}
                  <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEditModal(mem)}
                      aria-label="Edit memory"
                      className={`p-1 rounded transition-colors ${
                        isDarkMode ? 'text-rose-300 hover:text-rose-100 hover:bg-rose-500/20' : 'text-slate-500 hover:text-slate-800 hover:bg-rose-100'
                      }`}
                      title="Edit this memory"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {!mem.isInitial && (
                      <button
                        onClick={() => handleDelete(mem.id)}
                        aria-label="Delete memory"
                        className={`p-1 rounded transition-colors ${
                          isDarkMode ? 'text-rose-400/70 hover:text-rose-200 hover:bg-rose-500/20' : 'text-rose-400 hover:text-rose-600 hover:bg-rose-100'
                        }`}
                        title="Delete memory"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className={`font-serif text-xl sm:text-2xl font-bold tracking-tight ${
                  isDarkMode ? 'text-rose-100' : 'text-slate-800'
                }`}>
                  {mem.title}
                </h3>

                {/* Description */}
                <p className={`mt-2 text-sm leading-relaxed font-sans ${
                  isDarkMode ? 'text-rose-200/85' : 'text-slate-600'
                }`}>
                  {mem.description}
                </p>

                {/* Optional Attached Photo */}
                {mem.photoUrl && (
                  <div className="mt-4 rounded-xl overflow-hidden max-h-64 sm:max-h-72 border border-rose-500/20 shadow-xs">
                    <img
                      src={mem.photoUrl}
                      alt={mem.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>
                )}

              </div>

            </div>
          ))}

          {/* Dynamic Upcoming Milestone Card: "Every Month After This — Another Chapter" */}
          <div className="relative">
            <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center ${
              isDarkMode ? 'bg-amber-500/20 border-amber-400' : 'bg-amber-100 border-amber-400'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
            </div>

            <div className={`p-5 sm:p-6 rounded-3xl border border-dashed ${
              isDarkMode ? 'bg-amber-950/20 border-amber-400/40 text-rose-100' : 'bg-amber-50/70 border-amber-300 text-slate-800 shadow-xs'
            }`}>
              <div className={`text-xs uppercase tracking-wider font-semibold mb-1 ${
                isDarkMode ? 'text-amber-400' : 'text-amber-700'
              }`}>
                Every Month After This · Upcoming Journey
              </div>
              <h3 className={`font-serif text-xl font-bold ${
                isDarkMode ? 'text-amber-200' : 'text-amber-900'
              }`}>
                Another Chapter in Our Forever Story 📖
              </h3>
              <p className={`mt-1.5 text-sm ${
                isDarkMode ? 'text-rose-200/80' : 'text-slate-600'
              }`}>
                With each passing 15th, our bond grows deeper, our duas become stronger, and 2032 draws closer. May Allah always keep our hearts united in love, respect, and barakah.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Add / Edit Memory Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className={`max-w-lg w-full p-6 sm:p-8 rounded-2xl shadow-2xl border max-h-[90vh] overflow-y-auto ${
            isDarkMode ? 'bg-[#230f1d] border-rose-500/30 text-rose-100' : 'bg-white border-rose-200 text-slate-800'
          }`}>
            
            <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                {editingMemory ? 'Edit Love Memory' : 'Add New Love Memory ❤️'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-rose-400 hover:text-rose-200 hover:bg-rose-500/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMemory} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
                  Memory Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Late night laughter, Surprise message..."
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                    isDarkMode ? 'bg-rose-950/40 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
                    Date / Time Period
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 15 October 2026 or Autumn 2026"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                      isDarkMode ? 'bg-rose-950/40 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as TimelineMemory['category'])}
                    className={`w-full px-3.5 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                      isDarkMode ? 'bg-rose-950 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                    }`}
                  >
                    <option value="Milestone">Milestone</option>
                    <option value="Conversations">Conversations</option>
                    <option value="Special Moments">Special Moments</option>
                    <option value="Long Distance">Long Distance</option>
                    <option value="Future Dreams">Future Dreams</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
                  Our Memory Description
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write the sweet details of what happened, what was felt, and what Nummu or Shaisuu said..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                    isDarkMode ? 'bg-rose-950/40 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
                  Attach Photo (Upload or image URL)
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30">
                    <Image className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                  <input
                    type="text"
                    placeholder="or paste image URL"
                    value={formPhotoUrl}
                    onChange={(e) => setFormPhotoUrl(e.target.value)}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs border ${
                      isDarkMode ? 'bg-rose-950/40 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                    }`}
                  />
                </div>
                {formPhotoUrl && (
                  <div className="mt-2 h-24 rounded-lg overflow-hidden border border-rose-500/30">
                    <img src={formPhotoUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-rose-500/20 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-full border border-rose-500/20 text-rose-300 hover:bg-rose-500/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow hover:brightness-110 flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Memory</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
