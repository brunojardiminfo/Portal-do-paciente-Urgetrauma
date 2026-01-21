
import React, { useState } from 'react';
import { ICONS, MOCK_PATIENT } from '../constants';

interface Exercise {
  id: string;
  title: string;
  category: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  duration: string;
}

const EXERCISES: Exercise[] = [
  {
    id: '1',
    title: 'Extensão de Joelho Sentado',
    category: 'Joelho',
    description: 'Fortalecimento do quadríceps. Mantenha as costas eretas e estenda a perna lentamente.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=300&q=80',
    difficulty: 'Iniciante',
    duration: '3 séries de 15'
  },
  {
    id: '2',
    title: 'Mobilidade de Ombro com Bastão',
    category: 'Ombro',
    description: 'Aumento da amplitude de movimento. Use um cabo de vassoura ou bastão leve.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=300&q=80',
    difficulty: 'Iniciante',
    duration: '2 séries de 10'
  },
  {
    id: '3',
    title: 'Ponte Pélvica (Groot)',
    category: 'Coluna',
    description: 'Estabilização lombar e fortalecimento de glúteos. Eleve o quadril mantendo o abdômen contraído.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1518622358183-f77dad775a7c?auto=format&fit=crop&w=300&q=80',
    difficulty: 'Intermediário',
    duration: '3 séries de 12'
  },
  {
    id: '4',
    title: 'Isometria de Quadríceps na Parede',
    category: 'Joelho',
    description: 'Fortalecimento estático. Encoste na parede e agache até 90 graus.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2158?auto=format&fit=crop&w=300&q=80',
    difficulty: 'Intermediário',
    duration: '3 x 30 segundos'
  },
  {
    id: '5',
    title: 'Alongamento de Cadeia Posterior',
    category: 'Anca / Perna',
    description: 'Sentado com as pernas esticadas, tente alcançar a ponta dos pés sem dobrar os joelhos.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=300&q=80',
    difficulty: 'Iniciante',
    duration: '3 x 20 segundos'
  },
  {
    id: '6',
    title: 'Prancha Frontal Estabilizadora',
    category: 'Coluna',
    description: 'Fortalecimento de core. Mantenha o corpo alinhado e o abdômen bem travado.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1566241477600-ac026ad43874?auto=format&fit=crop&w=300&q=80',
    difficulty: 'Avançado',
    duration: '4 x 45 segundos'
  }
];

const CATEGORIES = ['Todos', 'Joelho', 'Ombro', 'Coluna', 'Anca / Perna', 'Tornozelo'];

const ExerciseLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const filteredExercises = EXERCISES.filter(ex => {
    const matchesCategory = selectedCategory === 'Todos' || ex.category === selectedCategory;
    const matchesSearch = ex.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ex.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-800">Biblioteca de Exercícios</h2>
          <p className="text-sm lg:text-base text-slate-500">Vídeos e guias para auxiliar seu tratamento em casa.</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-4 flex items-center text-slate-400">
            {ICONS.Search}
          </div>
          <input 
            type="text" 
            placeholder="Buscar exercício..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Section (Contextual) */}
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl flex flex-col md:flex-row gap-6 items-center">
        <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg">
          {ICONS.Info}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-bold text-blue-900">Recomendado para você</h3>
          <p className="text-xs text-blue-700 mt-1">
            Com base no seu tratamento de <strong>{MOCK_PATIENT.treatments[0].title}</strong>, focamos em exercícios de mobilidade de joelho.
          </p>
        </div>
        <button 
          onClick={() => setSelectedCategory('Joelho')}
          className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-xs shadow-sm hover:bg-blue-100 transition-colors"
        >
          Filtrar Joelho
        </button>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map(ex => (
          <div key={ex.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col group">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={ex.thumbnail} 
                alt={ex.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <button 
                onClick={() => setActiveVideo(ex.videoUrl)}
                className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="bg-blue-600 p-4 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                  {ICONS.Video}
                </div>
              </button>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold px-2 py-1 rounded-lg uppercase">
                  {ex.category}
                </span>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-slate-800 text-lg leading-tight">{ex.title}</h4>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                {ex.description}
              </p>
              
              <div className="mt-auto pt-4 border-t border-slate-50 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Dificuldade</p>
                  <p className={`text-xs font-bold ${ex.difficulty === 'Iniciante' ? 'text-green-600' : ex.difficulty === 'Intermediário' ? 'text-amber-600' : 'text-red-600'}`}>
                    {ex.difficulty}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Sugestão</p>
                  <p className="text-xs font-bold text-slate-700">{ex.duration}</p>
                </div>
              </div>

              <button 
                onClick={() => setActiveVideo(ex.videoUrl)}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
              >
                {ICONS.Video} Assistir Vídeo
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4 lg:p-12 animate-in fade-in duration-300"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X size={24} />
            </button>
            <iframe 
              src={activeVideo} 
              className="w-full h-full border-none" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
        </div>
      )}

      {filteredExercises.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
          <div className="text-slate-300 mb-4 flex justify-center">{ICONS.Exercise}</div>
          <h3 className="text-lg font-bold text-slate-600">Nenhum exercício encontrado</h3>
          <p className="text-sm text-slate-400 mt-1">Tente ajustar seus filtros ou busca.</p>
          <button 
            onClick={() => { setSelectedCategory('Todos'); setSearchQuery(''); }}
            className="mt-6 text-blue-600 font-bold hover:underline"
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  );
};

const X = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

export default ExerciseLibrary;
