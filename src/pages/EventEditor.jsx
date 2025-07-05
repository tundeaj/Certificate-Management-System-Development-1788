import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCertificate } from '../context/CertificateContext';
import toast from 'react-hot-toast';

const { FiSave, FiArrowLeft, FiUsers, FiAward, FiPlus, FiTrash2 } = FiIcons;

function EventEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, saveEvent, generateCertificate, addAttendee } = useCertificate();
  const { events, templates, signingAuthorities, attendees } = state;

  const [event, setEvent] = useState({
    title: '',
    description: '',
    type: 'webinar',
    date: new Date().toISOString().split('T')[0],
    templateId: '',
    signingAuthorityId: '',
    status: 'active',
    attendees: [],
    customFields: {}
  });

  const [newAttendee, setNewAttendee] = useState({
    name: '',
    email: '',
    status: 'registered'
  });

  const [showAddAttendee, setShowAddAttendee] = useState(false);

  useEffect(() => {
    if (id) {
      const existingEvent = events.find(e => e.id === id);
      if (existingEvent) {
        setEvent(existingEvent);
      }
    }
  }, [id, events]);

  const handleSave = () => {
    if (!event.title.trim()) {
      toast.error('Please enter an event title');
      return;
    }

    if (!event.templateId) {
      toast.error('Please select a certificate template');
      return;
    }

    try {
      const savedEvent = saveEvent(event);
      toast.success('Event saved successfully');
      navigate('/events');
    } catch (error) {
      toast.error('Failed to save event');
    }
  };

  const handleAddAttendee = () => {
    if (!newAttendee.name.trim() || !newAttendee.email.trim()) {
      toast.error('Please enter attendee name and email');
      return;
    }

    const attendee = addAttendee(newAttendee);
    setEvent({
      ...event,
      attendees: [...event.attendees, attendee.id]
    });
    setNewAttendee({ name: '', email: '', status: 'registered' });
    setShowAddAttendee(false);
    toast.success('Attendee added successfully');
  };

  const handleGenerateCertificates = () => {
    if (event.attendees.length === 0) {
      toast.error('No attendees to generate certificates for');
      return;
    }

    try {
      let generatedCount = 0;
      event.attendees.forEach(attendeeId => {
        const attendee = attendees.find(a => a.id === attendeeId);
        if (attendee && attendee.status === 'completed') {
          generateCertificate(event.id, attendeeId);
          generatedCount++;
        }
      });

      if (generatedCount > 0) {
        toast.success(`Generated ${generatedCount} certificates`);
      } else {
        toast.info('No attendees marked as completed');
      }
    } catch (error) {
      toast.error('Failed to generate certificates');
    }
  };

  const eventAttendees = attendees.filter(a => event.attendees.includes(a.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/events')}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {id ? 'Edit Event' : 'Create Event'}
            </h2>
            <p className="text-gray-600 mt-1">
              Set up your webinar, course, or event
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {id && (
            <button
              onClick={handleGenerateCertificates}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiAward} className="w-4 h-4" />
              <span>Generate Certificates</span>
            </button>
          )}
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiSave} className="w-4 h-4" />
            <span>Save Event</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Event Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title
              </label>
              <input
                type="text"
                value={event.title}
                onChange={(e) => setEvent({ ...event, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter event title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={event.description}
                onChange={(e) => setEvent({ ...event, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Enter event description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type
                </label>
                <select
                  value={event.type}
                  onChange={(e) => setEvent({ ...event, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="webinar">Webinar</option>
                  <option value="course">Course</option>
                  <option value="workshop">Workshop</option>
                  <option value="conference">Conference</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={event.date}
                  onChange={(e) => setEvent({ ...event, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certificate Template
              </label>
              <select
                value={event.templateId}
                onChange={(e) => setEvent({ ...event, templateId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a template</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Signing Authority
              </label>
              <select
                value={event.signingAuthorityId}
                onChange={(e) => setEvent({ ...event, signingAuthorityId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select signing authority</option>
                {signingAuthorities.map(authority => (
                  <option key={authority.id} value={authority.id}>
                    {authority.name} - {authority.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={event.status}
                onChange={(e) => setEvent({ ...event, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Attendees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Attendees ({eventAttendees.length})
            </h3>
            <button
              onClick={() => setShowAddAttendee(true)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
            >
              <SafeIcon icon={FiPlus} className="w-4 h-4" />
              <span>Add Attendee</span>
            </button>
          </div>

          {eventAttendees.length > 0 ? (
            <div className="space-y-3">
              {eventAttendees.map(attendee => (
                <div
                  key={attendee.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900">{attendee.name}</div>
                    <div className="text-sm text-gray-500">{attendee.email}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={attendee.status}
                      onChange={(e) => {
                        // Update attendee status
                        const updatedAttendees = attendees.map(a => 
                          a.id === attendee.id 
                            ? { ...a, status: e.target.value }
                            : a
                        );
                        // This would need to be handled by the context
                      }}
                      className="text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="registered">Registered</option>
                      <option value="attended">Attended</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button
                      onClick={() => {
                        setEvent({
                          ...event,
                          attendees: event.attendees.filter(id => id !== attendee.id)
                        });
                      }}
                      className="p-1 text-red-400 hover:text-red-600 transition-colors"
                    >
                      <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <SafeIcon icon={FiUsers} className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No attendees added yet</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Add Attendee Modal */}
      {showAddAttendee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add Attendee
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={newAttendee.name}
                  onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter attendee name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={newAttendee.email}
                  onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter attendee email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={newAttendee.status}
                  onChange={(e) => setNewAttendee({ ...newAttendee, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="registered">Registered</option>
                  <option value="attended">Attended</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddAttendee(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAttendee}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add Attendee
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default EventEditor;