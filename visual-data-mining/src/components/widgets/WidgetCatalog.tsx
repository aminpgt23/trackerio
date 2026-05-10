/**
 * WidgetCatalog - Sidebar component for browsing and adding widgets
 */

import React, { useState } from 'react';
import { getAllWidgets, getWidgetsByCategory } from '../../data/widgetRegistry';
import type { WidgetMCJAMetadata } from '../../types/mcja';
import './WidgetCatalog.css';

type CategoryFilter = 'All' | 'Data' | 'Visualize' | 'Model' | 'Evaluate' | 'Unsupervised';

interface WidgetCatalogProps {
  onAddWidget: (widgetType: string) => void;
}

export const WidgetCatalog: React.FC<WidgetCatalogProps> = ({ onAddWidget }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories: CategoryFilter[] = ['All', 'Data', 'Visualize', 'Model', 'Evaluate', 'Unsupervised'];

  const filteredWidgets = React.useMemo(() => {
    let widgets = selectedCategory === 'All' 
      ? getAllWidgets() 
      : getWidgetsByCategory(selectedCategory as any);

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      widgets = widgets.filter(w => 
        w.menu.toLowerCase().includes(term) || 
        w.description.toLowerCase().includes(term)
      );
    }

    return widgets;
  }, [selectedCategory, searchTerm]);

  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      Data: 'TableIcon',
      Visualize: 'ChartIcon',
      Model: '🤖',
      Evaluate: 'TargetIcon',
      Unsupervised: '🔍'
    };
    return icons[category] || '📦';
  };

  return (
    <div className="widget-catalog">
      <div className="catalog-header">
        <h2><span className="flex items-center gap-2"><CubeIcon className="w-6 h-6" /> Widget Catalog</span></h2>
        <p>Add widgets to your workflow</p>
      </div>

      {/* Search */}
      <div className="catalog-search">
        <input
          type="text"
          placeholder="Search widgets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="catalog-input"
        />
      </div>

      {/* Category Filter */}
      <div className="catalog-categories">
        {categories.map(cat => (
          <button
            key={cat}
            className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {getCategoryIcon(cat)} {cat}
          </button>
        ))}
      </div>

      {/* Widgets List */}
      <div className="catalog-widgets">
        {filteredWidgets.map(widget => (
          <div
            key={widget.type}
            className="catalog-widget-item"
            onClick={() => onAddWidget(widget.type)}
            title={widget.description}
          >
            <div className="widget-item-icon">{widget.icon}</div>
            <div className="widget-item-info">
              <span className="widget-item-name">{widget.menu}</span>
              <span className={`widget-item-category cat-${widget.category.toLowerCase()}`}>
                {widget.category}
              </span>
            </div>
            <div className="widget-item-add">+</div>
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="catalog-footer">
        <span>{filteredWidgets.length} widget{filteredWidgets.length !== 1 ? 's' : ''} available</span>
      </div>
    </div>
  );
};
