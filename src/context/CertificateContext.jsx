import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CertificateContext = createContext();

const initialState = {
  templates: [],
  events: [],
  certificates: [],
  attendees: [],
  signingAuthorities: [],
  loading: false,
  error: null
};

function certificateReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_TEMPLATES':
      return { ...state, templates: action.payload };
    case 'ADD_TEMPLATE':
      return { ...state, templates: [...state.templates, action.payload] };
    case 'UPDATE_TEMPLATE':
      return {
        ...state,
        templates: state.templates.map(t => 
          t.id === action.payload.id ? action.payload : t
        )
      };
    case 'DELETE_TEMPLATE':
      return {
        ...state,
        templates: state.templates.filter(t => t.id !== action.payload)
      };
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(e => 
          e.id === action.payload.id ? action.payload : e
        )
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(e => e.id !== action.payload)
      };
    case 'SET_CERTIFICATES':
      return { ...state, certificates: action.payload };
    case 'ADD_CERTIFICATE':
      return { ...state, certificates: [...state.certificates, action.payload] };
    case 'SET_ATTENDEES':
      return { ...state, attendees: action.payload };
    case 'ADD_ATTENDEE':
      return { ...state, attendees: [...state.attendees, action.payload] };
    case 'SET_SIGNING_AUTHORITIES':
      return { ...state, signingAuthorities: action.payload };
    case 'ADD_SIGNING_AUTHORITY':
      return { ...state, signingAuthorities: [...state.signingAuthorities, action.payload] };
    default:
      return state;
  }
}

export function CertificateProvider({ children }) {
  const [state, dispatch] = useReducer(certificateReducer, initialState);

  useEffect(() => {
    // Load data from localStorage on mount
    const savedTemplates = localStorage.getItem('certificateTemplates');
    const savedEvents = localStorage.getItem('certificateEvents');
    const savedCertificates = localStorage.getItem('certificates');
    const savedAttendees = localStorage.getItem('attendees');
    const savedAuthorities = localStorage.getItem('signingAuthorities');

    if (savedTemplates) {
      dispatch({ type: 'SET_TEMPLATES', payload: JSON.parse(savedTemplates) });
    }
    if (savedEvents) {
      dispatch({ type: 'SET_EVENTS', payload: JSON.parse(savedEvents) });
    }
    if (savedCertificates) {
      dispatch({ type: 'SET_CERTIFICATES', payload: JSON.parse(savedCertificates) });
    }
    if (savedAttendees) {
      dispatch({ type: 'SET_ATTENDEES', payload: JSON.parse(savedAttendees) });
    }
    if (savedAuthorities) {
      dispatch({ type: 'SET_SIGNING_AUTHORITIES', payload: JSON.parse(savedAuthorities) });
    } else {
      // Add default signing authority
      const defaultAuthority = {
        id: uuidv4(),
        name: 'Dr. Jane Smith',
        title: 'Director of Education',
        signature: null,
        createdAt: new Date().toISOString()
      };
      dispatch({ type: 'SET_SIGNING_AUTHORITIES', payload: [defaultAuthority] });
      localStorage.setItem('signingAuthorities', JSON.stringify([defaultAuthority]));
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('certificateTemplates', JSON.stringify(state.templates));
  }, [state.templates]);

  useEffect(() => {
    localStorage.setItem('certificateEvents', JSON.stringify(state.events));
  }, [state.events]);

  useEffect(() => {
    localStorage.setItem('certificates', JSON.stringify(state.certificates));
  }, [state.certificates]);

  useEffect(() => {
    localStorage.setItem('attendees', JSON.stringify(state.attendees));
  }, [state.attendees]);

  useEffect(() => {
    localStorage.setItem('signingAuthorities', JSON.stringify(state.signingAuthorities));
  }, [state.signingAuthorities]);

  const value = {
    state,
    dispatch,
    // Template actions
    saveTemplate: (template) => {
      const newTemplate = {
        ...template,
        id: template.id || uuidv4(),
        createdAt: template.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      if (template.id && state.templates.find(t => t.id === template.id)) {
        dispatch({ type: 'UPDATE_TEMPLATE', payload: newTemplate });
      } else {
        dispatch({ type: 'ADD_TEMPLATE', payload: newTemplate });
      }
      return newTemplate;
    },
    deleteTemplate: (id) => {
      dispatch({ type: 'DELETE_TEMPLATE', payload: id });
    },
    // Event actions
    saveEvent: (event) => {
      const newEvent = {
        ...event,
        id: event.id || uuidv4(),
        createdAt: event.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      if (event.id && state.events.find(e => e.id === event.id)) {
        dispatch({ type: 'UPDATE_EVENT', payload: newEvent });
      } else {
        dispatch({ type: 'ADD_EVENT', payload: newEvent });
      }
      return newEvent;
    },
    deleteEvent: (id) => {
      dispatch({ type: 'DELETE_EVENT', payload: id });
    },
    // Certificate actions
    generateCertificate: (eventId, attendeeId) => {
      const event = state.events.find(e => e.id === eventId);
      const attendee = state.attendees.find(a => a.id === attendeeId);
      const template = state.templates.find(t => t.id === event?.templateId);
      
      if (!event || !attendee || !template) {
        throw new Error('Missing required data for certificate generation');
      }

      const certificate = {
        id: uuidv4(),
        certificateId: `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        eventId,
        attendeeId,
        templateId: template.id,
        issuedAt: new Date().toISOString(),
        status: 'issued',
        data: {
          attendeeName: attendee.name,
          courseEventTitle: event.title,
          completionDate: new Date().toLocaleDateString(),
          signingAuthorityName: event.signingAuthorityName,
          signingAuthorityTitle: event.signingAuthorityTitle,
          ...event.customFields
        }
      };

      dispatch({ type: 'ADD_CERTIFICATE', payload: certificate });
      return certificate;
    },
    // Attendee actions
    addAttendee: (attendee) => {
      const newAttendee = {
        ...attendee,
        id: attendee.id || uuidv4(),
        createdAt: new Date().toISOString()
      };
      dispatch({ type: 'ADD_ATTENDEE', payload: newAttendee });
      return newAttendee;
    },
    // Signing authority actions
    addSigningAuthority: (authority) => {
      const newAuthority = {
        ...authority,
        id: authority.id || uuidv4(),
        createdAt: new Date().toISOString()
      };
      dispatch({ type: 'ADD_SIGNING_AUTHORITY', payload: newAuthority });
      return newAuthority;
    }
  };

  return (
    <CertificateContext.Provider value={value}>
      {children}
    </CertificateContext.Provider>
  );
}

export function useCertificate() {
  const context = useContext(CertificateContext);
  if (!context) {
    throw new Error('useCertificate must be used within a CertificateProvider');
  }
  return context;
}