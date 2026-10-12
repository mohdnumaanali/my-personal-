import React, { useState } from 'react';
import { Sparkles, Plus, Image as ImageIcon, X, ChevronLeft, ChevronRight, Calendar, Heart } from 'lucide-react';
import { GalleryPhoto } from '../types';
import { INITIAL_PHOTOS } from '../data/initialData';

interface GallerySectionProps {
  isDarkMode: boolean;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ isDarkMode }) => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem('nummu_shaisuu_photos');
      if (saved) return JSON.parse(saved);
      return INITIAL_PHOTOS;
    } catch {
      return INITIAL_PHOTOS;
    }
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Form states
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoDate, setPhotoDate] = useState('15 October 2026');
  const [photoCategory, setPhotoCategory] = useState<GalleryPhoto['category']>('Memories');
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const savePhotos = (updated: GalleryPhoto[]) => {
    setPhotos(updated);
    try {
      localStorage.setItem('nummu_shaisuu_photos', JSON.stringify(updated));
    } catch {
      // quota catch
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrl || !photoTitle.trim()) return;

    const newPhoto: GalleryPhoto = {
      id: `photo-${Date.now()}`,
      title: photoTitle,
      date: photoDate || '2026',
      category: photoCategory,
      imageUrl: photoUrl,
      caption: photoCaption || 'A cherished memory of Nummu and Shaisuu.',
    };

    savePhotos([newPhoto, ...photos]);
    setIsUploadModalOpen(false);
    setPhotoTitle('');
    setPhotoCaption('');
    setPhotoUrl('');
  };

  const categories = ['All', 'Memories', 'Special Days', 'Dreams', 'Funny Moments'];

  const filteredPhotos = photos.filter((p) =>
    activeCategory === 'All' ? true : p.category === activeCategory
  );

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const nextLightbox = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const prevLightbox = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <section id="gallery" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-6 border-b border-rose-500/15 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Private Couple Gallery</span>
            </div>
            <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
              isDarkMode ? 'text-rose-100' : 'text-slate-900'
            }`}>
              Our Little Universe 📸
            </h2>
            <p className={`mt-2 text-sm sm:text-base max-w-xl ${
              isDarkMode ? 'text-rose-300/80' : 'text-slate-600'
            }`}>
              Photographs, dream aesthetics, funny monkey memories 🙈, and milestones from Warangal to Bihar.
            </p>
          </div>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="self-start sm:self-auto px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md hover:from-rose-500 hover:to-pink-500 transition-all flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Photograph</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-rose-500 text-white shadow-sm'
                  : isDarkMode
                  ? 'bg-rose-950/40 text-rose-300/80 hover:bg-rose-900/40'
                  : 'bg-rose-50/80 text-slate-600 hover:bg-rose-100'
              }`}
            >
              {cat === 'Funny Moments' ? 'Funny Moments 🙈' : cat}
            </button>
          ))}
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className={`group rounded-3xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                isDarkMode
                  ? 'bg-[#1b0a14] border-rose-950 hover:border-rose-500/40'
                  : 'bg-white border-rose-200/70 shadow-sm hover:border-rose-300'
              }`}
            >
              {/* Photo Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-rose-950/20">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs text-rose-200 font-medium flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>Click to view lightbox</span>
                  </span>
                </div>
              </div>

              {/* Photo Details */}
              <div className="p-4 sm:p-5">
                <div className={`flex items-center justify-between text-xs mb-1.5 ${
                  isDarkMode ? 'text-rose-400' : 'text-rose-600'
                }`}>
                  <span className="font-semibold uppercase tracking-wider">{photo.category}</span>
                  <span className={isDarkMode ? 'text-rose-300/70' : 'text-slate-500'}>{photo.date}</span>
                </div>
                <h3 className={`font-serif text-lg font-bold truncate ${
                  isDarkMode ? 'text-rose-100' : 'text-slate-800'
                }`}>
                  {photo.title}
                </h3>
                <p className={`text-xs font-serif italic mt-1 line-clamp-2 ${
                  isDarkMode ? 'text-rose-200/80' : 'text-slate-600'
                }`}>
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          
          {/* Close button */}
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev */}
          <button
            onClick={prevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={nextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors z-10"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Photo Showcase Container */}
          <div className="max-w-4xl w-full flex flex-col items-center max-h-[90vh]">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-h-[70vh] flex items-center justify-center bg-black/40">
              <img
                src={filteredPhotos[selectedPhotoIndex].imageUrl}
                alt={filteredPhotos[selectedPhotoIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] max-w-full object-contain rounded-xl"
              />
            </div>

            {/* Lightbox Caption Box */}
            <div className="mt-4 text-center text-white max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs text-rose-300 uppercase tracking-widest font-semibold mb-1">
                <span>{filteredPhotos[selectedPhotoIndex].category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{filteredPhotos[selectedPhotoIndex].date}</span>
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold">
                {filteredPhotos[selectedPhotoIndex].title}
              </h3>
              <p className="font-script text-xl sm:text-2xl text-rose-300 mt-1">
                {filteredPhotos[selectedPhotoIndex].caption}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Upload Photo Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className={`max-w-md w-full p-6 sm:p-8 rounded-2xl shadow-2xl border ${
            isDarkMode ? 'bg-[#230f1d] border-rose-500/30 text-rose-100' : 'bg-white border-rose-200 text-slate-800'
          }`}>
            
            <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
              <h3 className="font-serif text-2xl font-bold">
                Add to Our Universe 📸
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded-lg text-rose-400 hover:text-rose-200 hover:bg-rose-500/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPhotoSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
                  Photo Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Beautiful Sunset, Sweet Voice Call..."
                  value={photoTitle}
                  onChange={(e) => setPhotoTitle(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                    isDarkMode ? 'bg-rose-950/40 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={photoDate}
                    onChange={(e) => setPhotoDate(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl text-sm border ${
                      isDarkMode ? 'bg-rose-950/40 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={photoCategory}
                    onChange={(e) => setPhotoCategory(e.target.value as GalleryPhoto['category'])}
                    className={`w-full px-3.5 py-2 rounded-xl text-sm border ${
                      isDarkMode ? 'bg-rose-950 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                    }`}
                  >
                    <option value="Memories">Memories</option>
                    <option value="Special Days">Special Days</option>
                    <option value="Dreams">Dreams</option>
                    <option value="Funny Moments">Funny Moments 🙈</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
                  Caption / Sweet Note
                </label>
                <textarea
                  rows={2}
                  placeholder="A romantic line about this photo..."
                  value={photoCaption}
                  onChange={(e) => setPhotoCaption(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                    isDarkMode ? 'bg-rose-950/40 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
                  Upload Image or Enter URL
                </label>
                <div className="space-y-2">
                  <label className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-rose-500/40 hover:bg-rose-500/10 cursor-pointer text-xs font-medium text-rose-300 transition-colors">
                    <ImageIcon className="w-4 h-4" />
                    <span>Choose file from your device</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                  <input
                    type="text"
                    placeholder="or paste image URL"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl text-xs border ${
                      isDarkMode ? 'bg-rose-950/40 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                    }`}
                  />
                </div>
                {photoUrl && (
                  <div className="mt-2 h-28 rounded-xl overflow-hidden border border-rose-500/30">
                    <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-rose-500/20 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-full border border-rose-500/20 text-rose-300 hover:bg-rose-500/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!photoUrl}
                  className="px-5 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow disabled:opacity-50"
                >
                  Save Photo
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
