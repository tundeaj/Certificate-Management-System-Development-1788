import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCertificate } from '../context/CertificateContext';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const { FiPlus, FiEdit, FiTrash2, FiUsers, FiAward, FiCalendar } = FiIcons;

function Events() {
  const { state, deleteEvent } = useCertificate();
  const { events, templates } = state;
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDelete = (id) => {
    deleteEvent(id);
    setDeleteConfirm(null);
    toast.success('Event deleted successfully');
  };

  const getTemplate = (templateId) => {
    return templates.find(t => t.id === templateId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Events & Webinars</h2>
          <p className="text-gray-600 mt-1">
            Manage your webinars, courses, and events
          </p>
        </div>
        <Link
          to="/events/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>New Event</span>
        </Link>
      </div>

      {/* Events List */}
      {events.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Template
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Attendees
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {events.map((event, index) => {
                  const template = getTemplate(event.templateId);
                  return (
                    <motion.tr
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-medium text-gray-900">{event.title}</div>
                          <div className="text-sm text-gray-500">{event.description}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          event.type === 'webinar' 
                            ? 'bg-blue-100 text-blue-800'
                            : event.type === 'course'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {event.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900">
                        {format(new Date(event.date), 'MMM d, yyyy')}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900">
                        {template ? template.name : 'No template'}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900">
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiUsers} className="w-4 h-4 text-gray-400" />
                          <span>{event.attendeeCount || 0}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          event.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : event.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/events/${event.id}/edit`}
                            className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                            title="Edit"
                          >
                            <SafeIcon icon={FiEdit} className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm(event.id)}
                            className="p-2 text-red-600 hover:text-red-800 transition-colors"
                            title="Delete"
                          >
                            <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center py-12"
        >
          <SafeIcon icon={FiCalendar} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
          <p className="text-gray-600 mb-6">
            Create your first event to start issuing certificates
          </p>
          <Link
            to="/events/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center space-x-2 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5" />
            <span>Create Event</span>
          </Link>
        </motion.div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Event
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this event? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Events;