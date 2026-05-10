/**
 * Widget Registry - Central repository for all widget MCJA metadata
 * This registry is automatically read by the MCJA Viewer to generate documentation
 */

import { WidgetMCJAMetadata } from '../types/mcja';

/**
 * Complete registry of all available widgets with their MCJA metadata
 * Every widget MUST have complete metadata here for auto-documentation
 */
export const widgetRegistry: Record<string, WidgetMCJAMetadata> = {
  // ==================== DATA CATEGORY ====================
  
  'fileReader': {
    menu: 'File Reader',
    category: 'Data',
    type: 'fileReader',
    description: 'Load data from CSV, Excel, or other file formats into the workflow',
    icon: '📁',
    inputs: [],
    outputs: [
      { id: 'data', name: 'Data', type: 'DataTable' }
    ],
    commands: [
      {
        id: 'file_path',
        name: 'File Path',
        type: 'input',
        job: 'Specify the path to the data file to load',
        action: 'Sets the source file location for data import',
        defaultValue: ''
      },
      {
        id: 'file_type',
        name: 'File Type',
        type: 'dropdown',
        job: 'Select the format of the input file',
        action: 'Determines the parsing method for the file',
        options: ['CSV', 'Excel', 'JSON', 'TXT'],
        defaultValue: 'CSV'
      },
      {
        id: 'delimiter',
        name: 'Delimiter',
        type: 'select',
        job: 'Choose the column separator for CSV files',
        action: 'Defines how columns are split in the input file',
        options: [',', ';', '\t', '|'],
        defaultValue: ','
      },
      {
        id: 'has_header',
        name: 'Has Header',
        type: 'checkbox',
        job: 'Indicate if the first row contains column names',
        action: 'Determines whether first row is treated as header',
        defaultValue: true
      },
      {
        id: 'load_btn',
        name: 'Load Data',
        type: 'button',
        job: 'Execute file loading and parse the data',
        action: 'Reads the file and outputs a DataTable object to connected widgets'
      },
      {
        id: 'preview_btn',
        name: 'Preview',
        type: 'button',
        job: 'Display a preview of the loaded data',
        action: 'Shows first 10 rows in a preview panel'
      }
    ]
  },

  'dataTable': {
    menu: 'Data Table',
    category: 'Data',
    type: 'dataTable',
    description: 'Display and inspect data in a tabular format',
    icon: '📊',
    inputs: [
      { id: 'data', name: 'Data', type: 'DataTable' }
    ],
    outputs: [
      { id: 'data', name: 'Data', type: 'DataTable' }
    ],
    commands: [
      {
        id: 'rows_display',
        name: 'Rows to Display',
        type: 'slider',
        job: 'Set the number of rows shown in the table view',
        action: 'Limits the visible rows in the display',
        min: 5,
        max: 100,
        step: 5,
        defaultValue: 20
      },
      {
        id: 'auto_fit',
        name: 'Auto-fit Columns',
        type: 'checkbox',
        job: 'Automatically adjust column widths to content',
        action: 'Resizes all columns to fit their content optimally',
        defaultValue: true
      },
      {
        id: 'refresh_btn',
        name: 'Refresh',
        type: 'button',
        job: 'Reload the data from input',
        action: 'Re-fetches and re-renders the data table'
      },
      {
        id: 'export_btn',
        name: 'Export',
        type: 'button',
        job: 'Export the current data to file',
        action: 'Downloads the data as CSV or Excel file'
      }
    ]
  },

  'dataSampler': {
    menu: 'Data Sampler',
    category: 'Data',
    type: 'dataSampler',
    description: 'Sample a subset of data rows randomly or by fixed interval',
    icon: '🎲',
    inputs: [
      { id: 'data', name: 'Data', type: 'DataTable' }
    ],
    outputs: [
      { id: 'sampled_data', name: 'Sampled Data', type: 'DataTable' }
    ],
    commands: [
      {
        id: 'sample_type',
        name: 'Sample Type',
        type: 'dropdown',
        job: 'Choose between random or fixed interval sampling',
        action: 'Determines the sampling strategy',
        options: ['Random', 'Fixed Interval', 'Stratified'],
        defaultValue: 'Random'
      },
      {
        id: 'sample_size',
        name: 'Sample Size',
        type: 'slider',
        job: 'Set the number or percentage of rows to sample',
        action: 'Defines how many rows will be in the output',
        min: 1,
        max: 1000,
        step: 1,
        defaultValue: 100
      },
      {
        id: 'use_percentage',
        name: 'Use Percentage',
        type: 'checkbox',
        job: 'Toggle between absolute count and percentage',
        action: 'Changes sample size interpretation to percentage',
        defaultValue: false
      },
      {
        id: 'random_seed',
        name: 'Random Seed',
        type: 'input',
        job: 'Set seed for reproducible random sampling',
        action: 'Ensures consistent results across runs',
        defaultValue: '42'
      },
      {
        id: 'apply_btn',
        name: 'Apply Sampling',
        type: 'button',
        job: 'Execute the sampling operation',
        action: 'Outputs a sampled subset of the input data'
      }
    ]
  },

  // ==================== VISUALIZE CATEGORY ====================

  'scatterPlot': {
    menu: 'Scatter Plot',
    category: 'Visualize',
    type: 'scatterPlot',
    description: 'Create scatter plots to visualize relationships between two variables',
    icon: '📈',
    inputs: [
      { id: 'data', name: 'Data', type: 'DataTable' }
    ],
    outputs: [
      { id: 'visualization', name: 'Visualization', type: 'Image' }
    ],
    commands: [
      {
        id: 'x_column',
        name: 'X Column',
        type: 'dropdown',
        job: 'Select the column for X-axis',
        action: 'Sets the horizontal axis variable',
        defaultValue: ''
      },
      {
        id: 'y_column',
        name: 'Y Column',
        type: 'dropdown',
        job: 'Select the column for Y-axis',
        action: 'Sets the vertical axis variable',
        defaultValue: ''
      },
      {
        id: 'color_column',
        name: 'Color By',
        type: 'dropdown',
        job: 'Optional column to color points by category',
        action: 'Adds color encoding based on selected column',
        defaultValue: ''
      },
      {
        id: 'point_size',
        name: 'Point Size',
        type: 'slider',
        job: 'Adjust the size of scatter plot points',
        action: 'Changes marker size in the visualization',
        min: 1,
        max: 20,
        step: 1,
        defaultValue: 8
      },
      {
        id: 'opacity',
        name: 'Opacity',
        type: 'slider',
        job: 'Set transparency level of points',
        action: 'Controls point alpha blending',
        min: 0.1,
        max: 1,
        step: 0.1,
        defaultValue: 0.7
      },
      {
        id: 'show_grid',
        name: 'Show Grid',
        type: 'checkbox',
        job: 'Toggle grid lines visibility',
        action: 'Displays or hides background grid',
        defaultValue: true
      },
      {
        id: 'title_input',
        name: 'Plot Title',
        type: 'input',
        job: 'Set the title of the scatter plot',
        action: 'Updates the chart title',
        defaultValue: 'Scatter Plot'
      },
      {
        id: 'render_btn',
        name: 'Render Plot',
        type: 'button',
        job: 'Generate the scatter plot visualization',
        action: 'Creates and displays the scatter plot image'
      },
      {
        id: 'export_btn',
        name: 'Export Image',
        type: 'button',
        job: 'Save the plot as an image file',
        action: 'Downloads PNG or SVG of the visualization'
      }
    ]
  },

  'lineChart': {
    menu: 'Line Chart',
    category: 'Visualize',
    type: 'lineChart',
    description: 'Create line charts to show trends over time or sequence',
    icon: '📉',
    inputs: [
      { id: 'data', name: 'Data', type: 'DataTable' }
    ],
    outputs: [
      { id: 'visualization', name: 'Visualization', type: 'Image' }
    ],
    commands: [
      {
        id: 'x_column',
        name: 'X Column',
        type: 'dropdown',
        job: 'Select the column for X-axis (typically time)',
        action: 'Sets the horizontal axis variable',
        defaultValue: ''
      },
      {
        id: 'y_columns',
        name: 'Y Columns',
        type: 'select',
        job: 'Select one or more columns for Y-axis lines',
        action: 'Sets which variables to plot as lines',
        defaultValue: ''
      },
      {
        id: 'line_width',
        name: 'Line Width',
        type: 'slider',
        job: 'Adjust the thickness of lines',
        action: 'Changes stroke width of plotted lines',
        min: 1,
        max: 10,
        step: 1,
        defaultValue: 2
      },
      {
        id: 'show_points',
        name: 'Show Points',
        type: 'checkbox',
        job: 'Display markers at data points',
        action: 'Toggles point markers on the lines',
        defaultValue: false
      },
      {
        id: 'render_btn',
        name: 'Render Chart',
        type: 'button',
        job: 'Generate the line chart visualization',
        action: 'Creates and displays the line chart image'
      }
    ]
  },

  'barChart': {
    menu: 'Bar Chart',
    category: 'Visualize',
    type: 'barChart',
    description: 'Create bar charts for categorical comparisons',
    icon: '📊',
    inputs: [
      { id: 'data', name: 'Data', type: 'DataTable' }
    ],
    outputs: [
      { id: 'visualization', name: 'Visualization', type: 'Image' }
    ],
    commands: [
      {
        id: 'category_column',
        name: 'Category Column',
        type: 'dropdown',
        job: 'Select the column for categories (X-axis)',
        action: 'Sets the categorical variable for bars',
        defaultValue: ''
      },
      {
        id: 'value_column',
        name: 'Value Column',
        type: 'dropdown',
        job: 'Select the column for values (Y-axis)',
        action: 'Sets the numeric variable for bar heights',
        defaultValue: ''
      },
      {
        id: 'orientation',
        name: 'Orientation',
        type: 'dropdown',
        job: 'Choose horizontal or vertical bars',
        action: 'Changes the chart orientation',
        options: ['Vertical', 'Horizontal'],
        defaultValue: 'Vertical'
      },
      {
        id: 'color_scheme',
        name: 'Color Scheme',
        type: 'dropdown',
        job: 'Select color palette for bars',
        action: 'Applies color scheme to the chart',
        options: ['Blue', 'Green', 'Red', 'Multi'],
        defaultValue: 'Blue'
      },
      {
        id: 'render_btn',
        name: 'Render Chart',
        type: 'button',
        job: 'Generate the bar chart visualization',
        action: 'Creates and displays the bar chart image'
      }
    ]
  },

  // ==================== MODEL CATEGORY ====================

  'linearRegression': {
    menu: 'Linear Regression',
    category: 'Model',
    type: 'linearRegression',
    description: 'Fit a linear regression model to predict continuous target variable',
    icon: '📐',
    inputs: [
      { id: 'data', name: 'Data', type: 'DataTable' },
      { id: 'preprocessor', name: 'Preprocessor', type: 'Preprocessor',  }
    ],
    outputs: [
      { id: 'model', name: 'Model', type: 'LinearModel' },
      { id: 'predictions', name: 'Predictions', type: 'DataTable' }
    ],
    commands: [
      {
        id: 'target_column',
        name: 'Target Column',
        type: 'dropdown',
        job: 'Select the dependent variable to predict',
        action: 'Sets the response variable for regression',
        defaultValue: ''
      },
      {
        id: 'feature_columns',
        name: 'Feature Columns',
        type: 'select',
        job: 'Select independent variables for prediction',
        action: 'Defines predictor variables for the model',
        defaultValue: ''
      },
      {
        id: 'fit_intercept',
        name: 'Fit Intercept',
        type: 'checkbox',
        job: 'Include intercept term in the model',
        action: 'Adds constant term to the regression equation',
        defaultValue: true
      },
      {
        id: 'normalize',
        name: 'Normalize Features',
        type: 'checkbox',
        job: 'Standardize features before fitting',
        action: 'Applies z-score normalization to predictors',
        defaultValue: false
      },
      {
        id: 'train_ratio',
        name: 'Train Ratio',
        type: 'slider',
        job: 'Set proportion of data for training',
        action: 'Splits data into train/test sets',
        min: 0.5,
        max: 0.95,
        step: 0.05,
        defaultValue: 0.8
      },
      {
        id: 'train_btn',
        name: 'Train Model',
        type: 'button',
        job: 'Fit the linear regression model to training data',
        action: 'Outputs trained LinearModel object with coefficients'
      },
      {
        id: 'predict_btn',
        name: 'Make Predictions',
        type: 'button',
        job: 'Generate predictions using the trained model',
        action: 'Outputs DataTable with predicted values'
      },
      {
        id: 'coefficients_btn',
        name: 'Show Coefficients',
        type: 'button',
        job: 'Display model coefficients and statistics',
        action: 'Shows regression coefficients in a table'
      }
    ]
  },

  'logisticRegression': {
    menu: 'Logistic Regression',
    category: 'Model',
    type: 'logisticRegression',
    description: 'Fit a logistic regression model for binary classification',
    icon: '🔀',
    inputs: [
      { id: 'data', name: 'Data', type: 'DataTable' }
    ],
    outputs: [
      { id: 'model', name: 'Model', type: 'ClassificationModel' },
      { id: 'predictions', name: 'Predictions', type: 'DataTable' }
    ],
    commands: [
      {
        id: 'target_column',
        name: 'Target Column',
        type: 'dropdown',
        job: 'Select the binary target variable',
        action: 'Sets the class label to predict',
        defaultValue: ''
      },
      {
        id: 'feature_columns',
        name: 'Feature Columns',
        type: 'select',
        job: 'Select predictor variables',
        action: 'Defines features for classification',
        defaultValue: ''
      },
      {
        id: 'regularization',
        name: 'Regularization',
        type: 'dropdown',
        job: 'Choose regularization penalty type',
        action: 'Sets the regularization method',
        options: ['L1', 'L2', 'ElasticNet', 'None'],
        defaultValue: 'L2'
      },
      {
        id: 'c_value',
        name: 'C (Inverse Regularization)',
        type: 'slider',
        job: 'Set inverse of regularization strength',
        action: 'Controls regularization intensity',
        min: 0.01,
        max: 100,
        step: 0.01,
        defaultValue: 1.0
      },
      {
        id: 'max_iter',
        name: 'Max Iterations',
        type: 'input',
        job: 'Maximum number of optimization iterations',
        action: 'Limits the solver iterations',
        defaultValue: '100'
      },
      {
        id: 'train_btn',
        name: 'Train Model',
        type: 'button',
        job: 'Fit the logistic regression model',
        action: 'Outputs trained ClassificationModel object'
      },
      {
        id: 'predict_btn',
        name: 'Predict Classes',
        type: 'button',
        job: 'Generate class predictions',
        action: 'Outputs DataTable with predicted classes'
      },
      {
        id: 'probabilities_btn',
        name: 'Predict Probabilities',
        type: 'button',
        job: 'Generate probability scores',
        action: 'Outputs DataTable with class probabilities'
      }
    ]
  },

  'decisionTree': {
    menu: 'Decision Tree',
    category: 'Model',
    type: 'decisionTree',
    description: 'Build a decision tree classifier or regressor',
    icon: '🌳',
    inputs: [
      { id: 'data', name: 'Data', type: 'DataTable' }
    ],
    outputs: [
      { id: 'model', name: 'Model', type: 'TreeModel' }
    ],
    commands: [
      {
        id: 'target_column',
        name: 'Target Column',
        type: 'dropdown',
        job: 'Select the target variable',
        action: 'Sets the variable to predict',
        defaultValue: ''
      },
      {
        id: 'task_type',
        name: 'Task Type',
        type: 'dropdown',
        job: 'Choose classification or regression',
        action: 'Determines the tree algorithm variant',
        options: ['Classification', 'Regression'],
        defaultValue: 'Classification'
      },
      {
        id: 'max_depth',
        name: 'Max Depth',
        type: 'slider',
        job: 'Limit the maximum depth of the tree',
        action: 'Controls tree complexity to prevent overfitting',
        min: 1,
        max: 50,
        step: 1,
        defaultValue: 10
      },
      {
        id: 'min_samples_split',
        name: 'Min Samples Split',
        type: 'slider',
        job: 'Minimum samples required to split a node',
        action: 'Sets threshold for node splitting',
        min: 2,
        max: 100,
        step: 1,
        defaultValue: 2
      },
      {
        id: 'criterion',
        name: 'Split Criterion',
        type: 'dropdown',
        job: 'Choose the function to measure split quality',
        action: 'Sets the impurity measure for splits',
        options: ['Gini', 'Entropy', 'MSE', 'MAE'],
        defaultValue: 'Gini'
      },
      {
        id: 'train_btn',
        name: 'Train Tree',
        type: 'button',
        job: 'Build the decision tree model',
        action: 'Outputs trained TreeModel object'
      },
      {
        id: 'visualize_btn',
        name: 'Visualize Tree',
        type: 'button',
        job: 'Display the tree structure diagram',
        action: 'Shows graphical representation of the tree'
      }
    ]
  },

  // ==================== EVALUATE CATEGORY ====================

  'confusionMatrix': {
    menu: 'Confusion Matrix',
    category: 'Evaluate',
    type: 'confusionMatrix',
    description: 'Visualize classification performance with confusion matrix',
    icon: '🎯',
    inputs: [
      { id: 'predictions', name: 'Predictions', type: 'DataTable' },
      { id: 'actual', name: 'Actual Labels', type: 'DataTable' }
    ],
    outputs: [
      { id: 'matrix', name: 'Matrix', type: 'Image' },
      { id: 'metrics', name: 'Metrics', type: 'MetricsData' }
    ],
    commands: [
      {
        id: 'normalize',
        name: 'Normalize',
        type: 'checkbox',
        job: 'Display percentages instead of counts',
        action: 'Converts cell values to proportions',
        defaultValue: false
      },
      {
        id: 'color_map',
        name: 'Color Map',
        type: 'dropdown',
        job: 'Select color scheme for the matrix',
        action: 'Changes the heatmap color palette',
        options: ['Blues', 'Greens', 'Reds', 'Viridis'],
        defaultValue: 'Blues'
      },
      {
        id: 'show_values',
        name: 'Show Values',
        type: 'checkbox',
        job: 'Display numeric values in cells',
        action: 'Toggles cell value labels',
        defaultValue: true
      },
      {
        id: 'compute_btn',
        name: 'Compute Matrix',
        type: 'button',
        job: 'Calculate the confusion matrix',
        action: 'Generates confusion matrix visualization and metrics'
      },
      {
        id: 'export_btn',
        name: 'Export Metrics',
        type: 'button',
        job: 'Save evaluation metrics to file',
        action: 'Downloads CSV with precision, recall, F1 scores'
      }
    ]
  },

  'rocAnalysis': {
    menu: 'ROC Analysis',
    category: 'Evaluate',
    type: 'rocAnalysis',
    description: 'Generate ROC curves and calculate AUC for classifier evaluation',
    icon: '📊',
    inputs: [
      { id: 'predictions', name: 'Predictions', type: 'DataTable' },
      { id: 'actual', name: 'Actual Labels', type: 'DataTable' }
    ],
    outputs: [
      { id: 'curve', name: 'ROC Curve', type: 'Image' },
      { id: 'auc', name: 'AUC Score', type: 'MetricsData' }
    ],
    commands: [
      {
        id: 'positive_class',
        name: 'Positive Class',
        type: 'dropdown',
        job: 'Select which class is considered positive',
        action: 'Sets the reference class for ROC calculation',
        defaultValue: ''
      },
      {
        id: 'show_diagonal',
        name: 'Show Random Line',
        type: 'checkbox',
        job: 'Display diagonal line representing random classifier',
        action: 'Adds reference line at y=x',
        defaultValue: true
      },
      {
        id: 'compute_btn',
        name: 'Compute ROC',
        type: 'button',
        job: 'Calculate ROC curve and AUC',
        action: 'Generates ROC plot and AUC metric'
      },
      {
        id: 'threshold_slider',
        name: 'Threshold',
        type: 'slider',
        job: 'Adjust classification threshold interactively',
        action: 'Updates TPR/FPR based on threshold',
        min: 0,
        max: 1,
        step: 0.01,
        defaultValue: 0.5
      }
    ]
  },

  'crossValidation': {
    menu: 'Cross Validation',
    category: 'Evaluate',
    type: 'crossValidation',
    description: 'Evaluate model performance using k-fold cross-validation',
    icon: '🔄',
    inputs: [
      { id: 'data', name: 'Data', type: 'DataTable' },
      { id: 'model', name: 'Model', type: 'AnyModel' }
    ],
    outputs: [
      { id: 'scores', name: 'Scores', type: 'MetricsData' },
      { id: 'predictions', name: 'Predictions', type: 'DataTable' }
    ],
    commands: [
      {
        id: 'n_folds',
        name: 'Number of Folds',
        type: 'slider',
        job: 'Set the number of cross-validation folds',
        action: 'Determines k in k-fold CV',
        min: 2,
        max: 20,
        step: 1,
        defaultValue: 5
      },
      {
        id: 'shuffle',
        name: 'Shuffle Data',
        type: 'checkbox',
        job: 'Randomly shuffle data before splitting',
        action: 'Enables stratified random shuffling',
        defaultValue: true
      },
      {
        id: 'random_seed',
        name: 'Random Seed',
        type: 'input',
        job: 'Set seed for reproducibility',
        action: 'Ensures consistent fold assignments',
        defaultValue: '42'
      },
      {
        id: 'scoring_metric',
        name: 'Scoring Metric',
        type: 'dropdown',
        job: 'Choose evaluation metric',
        action: 'Sets the metric for scoring',
        options: ['Accuracy', 'Precision', 'Recall', 'F1', 'AUC', 'MSE', 'RMSE'],
        defaultValue: 'Accuracy'
      },
      {
        id: 'run_btn',
        name: 'Run Cross-Validation',
        type: 'button',
        job: 'Execute k-fold cross-validation',
        action: 'Outputs mean score and per-fold scores'
      },
      {
        id: 'show_details_btn',
        name: 'Show Fold Details',
        type: 'button',
        job: 'Display detailed results for each fold',
        action: 'Shows table with per-fold metrics'
      }
    ]
  },

  // ==================== UNSUPERVISED CATEGORY ====================

  'kMeans': {
    menu: 'K-Means Clustering',
    category: 'Unsupervised',
    type: 'kMeans',
    description: 'Perform K-Means clustering to group similar data points',
    icon: '🔵',
    inputs: [
      { id: 'data', name: 'Data', type: 'DataTable' }
    ],
    outputs: [
      { id: 'model', name: 'Model', type: 'ClusteringModel' },
      { id: 'clustered_data', name: 'Clustered Data', type: 'DataTable' }
    ],
    commands: [
      {
        id: 'n_clusters',
        name: 'Number of Clusters',
        type: 'slider',
        job: 'Set the number of clusters (k)',
        action: 'Defines how many groups to create',
        min: 2,
        max: 20,
        step: 1,
        defaultValue: 3
      },
      {
        id: 'max_iter',
        name: 'Max Iterations',
        type: 'input',
        job: 'Maximum iterations per run',
        action: 'Limits convergence iterations',
        defaultValue: '300'
      },
      {
        id: 'init_method',
        name: 'Initialization',
        type: 'dropdown',
        job: 'Choose centroid initialization method',
        action: 'Sets initial centroid selection strategy',
        options: ['k-means++', 'Random'],
        defaultValue: 'k-means++'
      },
      {
        id: 'random_state',
        name: 'Random State',
        type: 'input',
        job: 'Seed for reproducibility',
        action: 'Ensures consistent clustering results',
        defaultValue: '42'
      },
      {
        id: 'feature_columns',
        name: 'Feature Columns',
        type: 'select',
        job: 'Select features for clustering',
        action: 'Defines variables used for distance calculation',
        defaultValue: ''
      },
      {
        id: 'fit_btn',
        name: 'Fit Clusters',
        type: 'button',
        job: 'Run K-Means algorithm',
        action: 'Outputs cluster assignments and centroids'
      },
      {
        id: 'elbow_btn',
        name: 'Elbow Method',
        type: 'button',
        job: 'Plot inertia vs k to find optimal clusters',
        action: 'Displays elbow curve for k selection'
      }
    ]
  },

  'hierarchicalClustering': {
    menu: 'Hierarchical Clustering',
    category: 'Unsupervised',
    type: 'hierarchicalClustering',
    description: 'Build hierarchical clusters using agglomerative approach',
    icon: '🌲',
    inputs: [
      { id: 'data', name: 'Data', type: 'DataTable' }
    ],
    outputs: [
      { id: 'dendrogram', name: 'Dendrogram', type: 'Image' },
      { id: 'clustered_data', name: 'Clustered Data', type: 'DataTable' }
    ],
    commands: [
      {
        id: 'linkage_method',
        name: 'Linkage Method',
        type: 'dropdown',
        job: 'Choose how to measure distance between clusters',
        action: 'Sets the linkage criterion',
        options: ['Ward', 'Complete', 'Average', 'Single'],
        defaultValue: 'Ward'
      },
      {
        id: 'distance_metric',
        name: 'Distance Metric',
        type: 'dropdown',
        job: 'Select distance calculation method',
        action: 'Defines pairwise distance computation',
        options: ['Euclidean', 'Manhattan', 'Cosine', 'Correlation'],
        defaultValue: 'Euclidean'
      },
      {
        id: 'n_clusters',
        name: 'Cut at K Clusters',
        type: 'slider',
        job: 'Number of clusters after cutting dendrogram',
        action: 'Sets the cut-off for flat clustering',
        min: 2,
        max: 20,
        step: 1,
        defaultValue: 3
      },
      {
        id: 'feature_columns',
        name: 'Feature Columns',
        type: 'select',
        job: 'Select features for clustering',
        action: 'Defines variables for distance calculation',
        defaultValue: ''
      },
      {
        id: 'fit_btn',
        name: 'Build Dendrogram',
        type: 'button',
        job: 'Construct hierarchical clustering',
        action: 'Outputs dendrogram visualization and cluster labels'
      },
      {
        id: 'show_dendrogram',
        name: 'Show Dendrogram',
        type: 'checkbox',
        job: 'Display the hierarchical tree',
        action: 'Renders the dendrogram plot',
        defaultValue: true
      }
    ]
  },

  'pca': {
    menu: 'PCA (Principal Component Analysis)',
    category: 'Unsupervised',
    type: 'pca',
    description: 'Reduce dimensionality using Principal Component Analysis',
    icon: '🔽',
    inputs: [
      { id: 'data', name: 'Data', type: 'DataTable' }
    ],
    outputs: [
      { id: 'transformed_data', name: 'Transformed Data', type: 'DataTable' },
      { id: 'components', name: 'Components', type: 'ComponentData' }
    ],
    commands: [
      {
        id: 'n_components',
        name: 'Number of Components',
        type: 'slider',
        job: 'Set the number of principal components to keep',
        action: 'Defines target dimensionality',
        min: 1,
        max: 50,
        step: 1,
        defaultValue: 2
      },
      {
        id: 'variance_threshold',
        name: 'Variance Threshold',
        type: 'slider',
        job: 'Keep components explaining this much variance',
        action: 'Automatically selects components by explained variance',
        min: 0.5,
        max: 0.99,
        step: 0.01,
        defaultValue: 0.95
      },
      {
        id: 'whiten',
        name: 'Whitening',
        type: 'checkbox',
        job: 'Apply whitening transformation',
        action: 'Normalizes component variances',
        defaultValue: false
      },
      {
        id: 'feature_columns',
        name: 'Feature Columns',
        type: 'select',
        job: 'Select features for PCA',
        action: 'Defines variables to transform',
        defaultValue: ''
      },
      {
        id: 'fit_btn',
        name: 'Fit PCA',
        type: 'button',
        job: 'Compute principal components',
        action: 'Outputs transformed data and component loadings'
      },
      {
        id: 'explained_variance_btn',
        name: 'Show Explained Variance',
        type: 'button',
        job: 'Display variance explained by each component',
        action: 'Shows scree plot and variance table'
      },
      {
        id: 'biplot_btn',
        name: 'Show Biplot',
        type: 'button',
        job: 'Visualize data and loadings together',
        action: 'Creates PCA biplot visualization'
      }
    ]
  },

  'dbscan': {
    menu: 'DBSCAN',
    category: 'Unsupervised',
    type: 'dbscan',
    description: 'Density-Based Spatial Clustering with Noise detection',
    icon: '⚡',
    inputs: [
      { id: 'data', name: 'Data', type: 'DataTable' }
    ],
    outputs: [
      { id: 'clustered_data', name: 'Clustered Data', type: 'DataTable' }
    ],
    commands: [
      {
        id: 'epsilon',
        name: 'Epsilon (ε)',
        type: 'slider',
        job: 'Set the neighborhood radius',
        action: 'Defines maximum distance between points',
        min: 0.1,
        max: 10,
        step: 0.1,
        defaultValue: 0.5
      },
      {
        id: 'min_samples',
        name: 'Min Samples',
        type: 'slider',
        job: 'Minimum points to form a dense region',
        action: 'Sets threshold for core points',
        min: 1,
        max: 20,
        step: 1,
        defaultValue: 5
      },
      {
        id: 'metric',
        name: 'Distance Metric',
        type: 'dropdown',
        job: 'Choose distance calculation method',
        action: 'Defines how distances are computed',
        options: ['Euclidean', 'Manhattan', 'Cosine'],
        defaultValue: 'Euclidean'
      },
      {
        id: 'feature_columns',
        name: 'Feature Columns',
        type: 'select',
        job: 'Select features for clustering',
        action: 'Defines variables for density calculation',
        defaultValue: ''
      },
      {
        id: 'fit_btn',
        name: 'Run DBSCAN',
        type: 'button',
        job: 'Execute density-based clustering',
        action: 'Outputs cluster labels including noise points (-1)'
      }
    ]
  }
};

/**
 * Get all widget metadata entries
 */
export const getAllWidgets = (): WidgetMCJAMetadata[] => {
  return Object.values(widgetRegistry);
};

/**
 * Get widgets by category
 */
export const getWidgetsByCategory = (category: WidgetMCJAMetadata['category']): WidgetMCJAMetadata[] => {
  return Object.values(widgetRegistry).filter(w => w.category === category);
};

/**
 * Get a specific widget's metadata by type
 */
export const getWidgetByType = (type: string): WidgetMCJAMetadata | undefined => {
  return widgetRegistry[type];
};

/**
 * Convert registry to MCJA table rows for display
 */
export const generateMCJARows = (): Array<{
  widgetName: string;
  category: string;
  commandName: string;
  commandType: string;
  jobDescription: string;
  actionOutput: string;
}> => {
  const rows: Array<{
    widgetName: string;
    category: string;
    commandName: string;
    commandType: string;
    jobDescription: string;
    actionOutput: string;
  }> = [];

  Object.values(widgetRegistry).forEach(widget => {
    widget.commands.forEach(command => {
      rows.push({
        widgetName: widget.menu,
        category: widget.category,
        commandName: command.name,
        commandType: command.type,
        jobDescription: command.job,
        actionOutput: command.action
      });
    });
  });

  return rows;
};
