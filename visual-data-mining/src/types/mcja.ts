/**
 * MCJA (Menu/Widget, Command/Control, Job/Function, Action/Output) Type Definitions
 * This module defines the metadata structure for auto-documentation of all widgets
 */

/**
 * Represents a single command/control within a widget
 */
export interface Command {
  /** Unique identifier for the command */
  id: string;
  /** Name/label of the control (e.g., "Load File", "Run", "Slider") */
  name: string;
  /** Type of control (button, dropdown, slider, input, checkbox, etc.) */
  type: 'button' | 'dropdown' | 'slider' | 'input' | 'checkbox' | 'textarea' | 'select';
  /** Description of what this command does */
  job: string;
  /** Expected output/action when this command is executed */
  action: string;
  /** Default value if applicable */
  defaultValue?: string | number | boolean;
  /** Options for dropdown/select types */
  options?: string[];
  /** Min value for slider */
  min?: number;
  /** Max value for slider */
  max?: number;
  /** Step value for slider */
  step?: number;
}

/**
 * Represents a widget's complete MCJA metadata
 */
export interface WidgetMCJAMetadata {
  /** Menu/Widget name */
  menu: string;
  /** Category classification */
  category: 'Data' | 'Visualize' | 'Model' | 'Evaluate' | 'Unsupervised';
  /** Unique widget type identifier */
  type: string;
  /** Description of the widget */
  description: string;
  /** List of commands/controls available in this widget */
  commands: Command[];
  /** Input ports definition */
  inputs: {
    id: string;
    name: string;
    type: string;
  }[];
  /** Output ports definition */
  outputs: {
    id: string;
    name: string;
    type: string;
  }[];
  /** Icon representation (SVG path or emoji) */
  icon?: string;
}

/**
 * Registry type for all widget metadata
 */
export type WidgetRegistry = Record<string, WidgetMCJAMetadata>;

/**
 * MCJA Table Row for display purposes
 */
export interface MCJARow {
  widgetName: string;
  category: string;
  commandName: string;
  commandType: string;
  jobDescription: string;
  actionOutput: string;
}
