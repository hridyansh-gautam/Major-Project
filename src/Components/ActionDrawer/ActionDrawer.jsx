import React, { useState } from 'react';
import './ActionDrawer.css';

const ActionDrawer = ({ actionCounts, onSelectAction }) => {
  const [expandedSections, setExpandedSections] = useState({
    inpatient: true,
    outpatient: true,
    evaluation: true,
    monitoring: true,
    intervention: true,
    locate: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Sample data structure (replace with your actual data)
  const actions = {
    all: { count: 9, label: 'All Action Needed' },
    inpatient: {
      label: 'Inpatient Screening',
      count: 0,
      items: [
        { id: 'need_inpatient', label: 'Need Inpatient Screening', count: 0 },
        { id: 'incomplete_inpatient', label: 'Incomplete Inpatient Screening', count: 0 }
      ]
    },
    outpatient: {
      label: 'Outpatient Screening',
      count: 1,
      items: [
        { id: 'need_outpatient_appl', label: 'Need Outpatient Appl', count: 0 },
        { id: 'need_outpatient_screening', label: 'Need Outpatient Screening', count: 1 }
      ]
    },
    evaluation: {
      label: 'Evaluation',
      count: 5,
      items: [
        { id: 'need_evaluation_appl', label: 'Need Evaluation Appl', count: 1 },
        { id: 'need_evaluation', label: 'Need Evaluation', count: 1 }
      ]
    },
    monitoring: {
      label: 'Need Risk Monitoring',
      count: 0,
      items: []
    },
    intervention: {
      label: 'Referred for Intervention',
      count: 0,
      items: []
    },
    locate: {
      label: 'Need to Locate',
      count: 1,
      items: []
    }
  };

  return (
    <div className="action-drawer">
      <div className="drawer-header">
        <h3>Action Needed ({actions.all.count})</h3>
        <div className="close-icon" onClick={setIsdraweropen}>×</div>
      </div>

      <div className="action-list">
        {/* All Action Needed */}
        <div 
          className="action-category all-action"
          onClick={() => onSelectAction('all')}
        >
          <span className="action-label">{actions.all.label}</span>
          <span className="action-count">{actions.all.count}</span>
        </div>

        {/* Inpatient Screening */}
        <div className="action-section">
          <div 
            className="action-category header"
            onClick={() => toggleSection('inpatient')}
          >
            <span className="action-label">{actions.inpatient.label}</span>
            <span className="action-count">{actions.inpatient.count}</span>
          </div>
          {expandedSections.inpatient && actions.inpatient.items.map(item => (
            <div 
              key={item.id}
              className="action-item"
              onClick={() => onSelectAction(item.id)}
            >
              <span className="action-label">{item.label}</span>
              <span className="action-count">{item.count}</span>
            </div>
          ))}
        </div>

        {/* Outpatient Screening */}
        <div className="action-section">
          <div 
            className="action-category header"
            onClick={() => toggleSection('outpatient')}
          >
            <span className="action-label">{actions.outpatient.label}</span>
            <span className="action-count">{actions.outpatient.count}</span>
          </div>
          {expandedSections.outpatient && actions.outpatient.items.map(item => (
            <div 
              key={item.id}
              className="action-item"
              onClick={() => onSelectAction(item.id)}
            >
              <span className="action-label">{item.label}</span>
              <span className="action-count">{item.count}</span>
            </div>
          ))}
        </div>

        {/* Evaluation */}
        <div className="action-section">
          <div 
            className="action-category header"
            onClick={() => toggleSection('evaluation')}
          >
            <span className="action-label">{actions.evaluation.label}</span>
            <span className="action-count">{actions.evaluation.count}</span>
          </div>
          {expandedSections.evaluation && actions.evaluation.items.map(item => (
            <div 
              key={item.id}
              className="action-item"
              onClick={() => onSelectAction(item.id)}
            >
              <span className="action-label">{item.label}</span>
              <span className="action-count">{item.count}</span>
            </div>
          ))}
        </div>

        {/* Need Risk Monitoring */}
        <div 
          className="action-category"
          onClick={() => onSelectAction('monitoring')}
        >
          <span className="action-label">{actions.monitoring.label}</span>
          <span className="action-count">{actions.monitoring.count}</span>
        </div>

        {/* Referred for Intervention */}
        <div 
          className="action-category"
          onClick={() => onSelectAction('intervention')}
        >
          <span className="action-label">{actions.intervention.label}</span>
          <span className="action-count">{actions.intervention.count}</span>
        </div>

        {/* Need to Locate */}
        <div 
          className="action-category"
          onClick={() => onSelectAction('locate')}
        >
          <span className="action-label">{actions.locate.label}</span>
          <span className="action-count">{actions.locate.count}</span>
        </div>
      </div>
    </div>
  );
};

export default ActionDrawer;