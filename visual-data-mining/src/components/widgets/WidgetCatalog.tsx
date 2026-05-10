/**
 * WidgetCatalog - Sidebar component for browsing and adding widgets
 */

import React, { useState } from 'react';
import { getAllWidgets, getWidgetsByCategory, getIconByName } from '../../data/widgetRegistry';
import { CubeIcon } from '../../components/icons';
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
      Visualize: 'ScatterPlotIcon',
      Model: 'LinearRegressionIcon',
      Evaluate: 'TestScoreIcon',
      Unsupervised: 'KMeansIcon'
    };
    return icons[category] || 'FileIcon';
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
        {categories.map(cat => {
          const CatIcon = getIconByName(getCategoryIcon(cat));
          return (
            <button
              key={cat}
              className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {CatIcon && <CatIcon className="w-4 h-4" />} {cat}
            </button>
          );
        })}
      </div>

      {/* Widgets List */}
      <div className="catalog-widgets">
        {filteredWidgets.map(widget => {
          const WidgetIcon = getIconByName(widget.icon);
          return (
            <div
              key={widget.type}
              className="catalog-widget-item"
              onClick={() => onAddWidget(widget.type)}
              title={widget.description}
            >
              <div className="widget-item-icon">
                {WidgetIcon ? <WidgetIcon /> : '📦'}
              </div>
              <div className="widget-item-info">
                <span className="widget-item-name">{widget.menu}</span>
                <span className={`widget-item-category cat-${widget.category.toLowerCase()}`}>
                  {widget.category}
                </span>
              </div>
              <div className="widget-item-add">+</div>
            </div>
          );
        })}
      </div>

      {/* Footer Stats */}
      <div className="catalog-footer">
        <span>{filteredWidgets.length} widget{filteredWidgets.length !== 1 ? 's' : ''} available</span>
      </div>
    </div>
  );
};
