# Visual Data Mining with MCJA Auto-Documentation

Aplikasi web **Visual Data Mining** yang terinspirasi dari Orange Data Mining, dilengkapi dengan fitur **MCJA Auto-Documenter** yang secara otomatis menghasilkan dokumentasi lengkap untuk semua widget.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ dan npm
- Browser modern (Chrome, Firefox, Edge)

### Instalasi & Menjalankan

```bash
# 1. Masuk ke direktori proyek
cd visual-data-mining

# 2. Install dependencies (jika belum)
npm install

# 3. Jalankan development server
npm run dev

# 4. Buka browser di http://localhost:5173
```

### Build untuk Production

```bash
# Build aplikasi
npm run build

# Preview hasil build
npm run preview
```

## 📋 Fitur Utama

### 1. Kanvas Pemrograman Visual
- Drag & drop widget dari katalog ke kanvas
- Hubungkan widget melalui saluran (link) untuk membangun alur analisis
- Kategori widget: Data, Visualize, Model, Evaluate, Unsupervised
- MiniMap untuk navigasi workflow besar

### 2. Widget Catalog
- Browse semua widget yang tersedia berdasarkan kategori
- Search widget berdasarkan nama atau deskripsi
- Klik untuk menambahkan widget ke kanvas

### 3. MCJA Auto-Documentation Viewer
- **M**enu/**W**idget: Nama dan kategori widget
- **C**ommand/**C**ontrol: Semua kontrol (tombol, dropdown, slider, dll.)
- **J**ob/**F**unction: Deskripsi fungsi setiap kontrol
- **A**ction/**O**utput: Hasil/output yang dihasilkan

#### Cara Mengakses MCJA Viewer:
1. Klik tombol "📋 MCJA Documentation" di header
2. Filter berdasarkan kategori (All, Data, Visualize, Model, Evaluate, Unsupervised)
3. Cari widget atau command spesifik
4. Toggle antara Table View dan Widgets View

## 🏗️ Arsitektur

```
visual-data-mining/
├── src/
│   ├── components/
│   │   ├── canvas/          # WorkflowCanvas (ReactFlow)
│   │   ├── mcja/            # MCJAViewer (Dokumentasi)
│   │   └── widgets/         # WidgetNode, WidgetCatalog
│   ├── data/
│   │   └── widgetRegistry.ts # Registry metadata MCJA semua widget
│   ├── store/
│   │   └── workflowStore.ts  # Zustand state management
│   ├── types/
│   │   └── mcja.ts           # TypeScript interfaces MCJA
│   ├── App.tsx               # Main component
│   └── main.tsx              # Entry point
├── package.json
└── README.md
```

## 🧩 Widget yang Tersedia

### Data Category
- **File Reader**: Load CSV, Excel, JSON files
- **Data Table**: Display and inspect data
- **Data Sampler**: Random/fixed interval sampling

### Visualize Category
- **Scatter Plot**: 2D relationship visualization
- **Line Chart**: Time series trends
- **Bar Chart**: Categorical comparisons

### Model Category
- **Linear Regression**: Continuous prediction
- **Logistic Regression**: Binary classification
- **Decision Tree**: Tree-based classification/regression

### Evaluate Category
- **Confusion Matrix**: Classification performance
- **ROC Analysis**: Model evaluation curves
- **Cross Validation**: K-fold validation

### Unsupervised Category
- **K-Means**: Clustering algorithm
- **Hierarchical Clustering**: Dendrogram visualization
- **PCA**: Dimensionality reduction

## 🔧 Menambah Widget Baru

Untuk menambah widget baru dengan dokumentasi MCJA otomatis:

1. **Tambahkan metadata di `src/data/widgetRegistry.ts`:**

```typescript
'newWidget': {
  menu: 'New Widget Name',
  category: 'Data', // atau Visualize, Model, Evaluate, Unsupervised
  type: 'newWidget',
  description: 'Description of what this widget does',
  icon: '🆕',
  inputs: [{ id: 'data', name: 'Data', type: 'DataTable' }],
  outputs: [{ id: 'result', name: 'Result', type: 'DataTable' }],
  commands: [
    {
      id: 'param1',
      name: 'Parameter 1',
      type: 'input',
      job: 'Description of what this parameter does',
      action: 'Output/effect when this is changed',
      defaultValue: 'default'
    },
    {
      id: 'run_btn',
      name: 'Run',
      type: 'button',
      job: 'Execute the widget operation',
      action: 'Produces output data/signal'
    }
  ]
}
```

2. **Dokumentasi MCJA otomatis diperbarui!**
   - MCJA Viewer akan langsung menampilkan widget baru
   - Tidak perlu modifikasi manual pada dokumentasi

## 📊 Statistik Dokumentasi

Aplikasi ini memiliki dokumentasi MCJA lengkap untuk:
- **15+ Widget** across 5 categories
- **100+ Commands** dengan job dan action descriptions
- **100% Auto-generated** dari widget registry

## 🛠️ Teknologi

- **Frontend**: React 19 + TypeScript
- **Canvas**: React Flow untuk visual workflow
- **State Management**: Zustand
- **Build Tool**: Vite
- **Styling**: CSS Modules

## 📝 License

MIT License - Inspired by Orange Data Mining (https://orangedatamining.com)
