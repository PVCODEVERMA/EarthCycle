// DocumentsPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaFilePdf, 
  FaFileInvoice, 
  FaDownload, 
  FaSearch, 
  FaFilter,
  FaCertificate
} from 'react-icons/fa';

const DocumentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  const documentTypes = [
    { id: 'all', label: 'All Documents' },
    { id: 'reports', label: 'Reports' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'certificates', label: 'Certificates' },
  ];

  const documents = [
    {
      id: 1,
      icon: <FaFilePdf className="w-5 h-5 text-red-500" />,
      title: "Monthly Report - March 2023",
      date: "2023-04-01",
      type: "reports",
      size: "2.4 MB"
    },
    {
      id: 2,
      icon: <FaFileInvoice className="w-5 h-5 text-blue-500" />,
      title: "Service Invoice #12345",
      date: "2023-03-15",
      type: "invoices",
      size: "1.1 MB"
    },
    {
      id: 3,
      icon: <FaCertificate className="w-5 h-5 text-green-500" />,
      title: "Recycling Certificate",
      date: "2023-03-10",
      type: "certificates",
      size: "0.8 MB"
    },
    {
      id: 4,
      icon: <FaFilePdf className="w-5 h-5 text-red-500" />,
      title: "Annual Waste Summary 2022",
      date: "2023-01-05",
      type: "reports",
      size: "3.2 MB"
    },
    {
      id: 5,
      icon: <FaFileInvoice className="w-5 h-5 text-blue-500" />,
      title: "Service Invoice #12346",
      date: "2023-04-15",
      type: "invoices",
      size: "1.3 MB"
    },
    {
      id: 6,
      icon: <FaCertificate className="w-5 h-5 text-green-500" />,
      title: "Carbon Offset Certificate",
      date: "2023-04-18",
      type: "certificates",
      size: "0.9 MB"
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || doc.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-5 sm:p-8"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Your Documents</h1>
              <p className="text-gray-600 mt-1">Access and manage all your certificates and reports</p>
            </div>
            <Link 
              to="/dashboard" 
              className="mt-4 md:mt-0 flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              ← Back to Dashboard
            </Link>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="appearance-none w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition bg-white"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {documentTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Document Grid */}
          {filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDocuments.map((doc) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-5 bg-gray-50 flex items-center">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      {doc.icon}
                    </div>
                    <div className="ml-4">
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-green-100 text-green-800 capitalize">
                        {doc.type}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{doc.size}</p>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-800">{doc.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">Created: {doc.date}</p>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <button className="text-xs text-gray-500 hover:text-gray-700">
                        View Details
                      </button>
                      <button className="flex items-center text-green-600 hover:text-green-700 font-medium">
                        <FaDownload className="mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No documents found</h3>
              <p className="mt-1 text-gray-500">
                {searchTerm 
                  ? `No documents match "${searchTerm}"` 
                  : "You don't have any documents in this category"}
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Document Statistics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-800">Total Documents</p>
                <p className="text-2xl font-bold mt-1">{documents.length}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">Reports</p>
                <p className="text-2xl font-bold mt-1">{documents.filter(d => d.type === 'reports').length}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-800">Invoices</p>
                <p className="text-2xl font-bold mt-1">{documents.filter(d => d.type === 'invoices').length}</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <p className="text-sm text-yellow-800">Certificates</p>
                <p className="text-2xl font-bold mt-1">{documents.filter(d => d.type === 'certificates').length}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DocumentsPage;