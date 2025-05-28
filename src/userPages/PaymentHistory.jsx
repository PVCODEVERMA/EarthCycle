import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFileInvoice, FaSearch, FaFilter, FaDownload, FaSync } from "react-icons/fa";
import { MdPayment, MdError } from "react-icons/md";

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });

    // Mock data for demonstration
    const mockPayments = [
        {
            id: "PAY-001",
            date: "2023-06-15",
            amount: 1250,
            status: "completed",
            reference: "EWS-2023-0015",
            method: "Credit Card",
            service: "E-Waste Collection",
            invoice: "INV-2023-0015"
        },
        {
            id: "PAY-002",
            date: "2023-06-10",
            amount: 800,
            status: "completed",
            reference: "EWS-2023-0012",
            method: "UPI",
            service: "Plastic Recycling",
            invoice: "INV-2023-0012"
        },
        {
            id: "PAY-003",
            date: "2023-06-05",
            amount: 2500,
            status: "pending",
            reference: "EWS-2023-0010",
            method: "Bank Transfer",
            service: "Bulk E-Waste Pickup",
            invoice: "INV-2023-0010"
        },
        {
            id: "PAY-004",
            date: "2023-05-28",
            amount: 650,
            status: "failed",
            reference: "EWS-2023-0008",
            method: "Credit Card",
            service: "Organic Waste",
            invoice: "INV-2023-0008"
        },
        {
            id: "PAY-005",
            date: "2023-05-20",
            amount: 3200,
            status: "completed",
            reference: "EWS-2023-0005",
            method: "Net Banking",
            service: "Corporate E-Waste",
            invoice: "INV-2023-0005"
        }
    ];

    useEffect(() => {
        // Simulate API call with mock data
        const fetchData = async () => {
            try {
                setLoading(true);
                // In a real app:
                // const res = await fetch("/api/payments/history");
                // if (!res.ok) throw new Error("Failed to fetch payment history");
                // const data = await res.json();
                
                // Using mock data for demonstration
                await new Promise(resolve => setTimeout(resolve, 1000));
                setPayments(mockPayments);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedPayments = [...payments].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
    });

    const filteredPayments = sortedPayments.filter(payment => {
        const matchesSearch = 
            payment.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.method.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = filterStatus === "all" || payment.status === filterStatus;
        
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status) => {
        const statusStyles = {
            completed: "bg-green-100 text-green-800",
            pending: "bg-yellow-100 text-yellow-800",
            failed: "bg-red-100 text-red-800",
            refunded: "bg-blue-100 text-blue-800"
        };
        
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status] || "bg-gray-100 text-gray-800"}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 mx-auto border-t-2 border-b-2 border-green-500 mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-700">Loading Payment History</h2>
                    <p className="text-gray-500 mt-2">Please wait while we fetch your transactions</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="max-w-md text-center">
                    <div className="flex justify-center mb-4">
                        <MdError className="text-red-500 text-5xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Payment History</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="flex items-center justify-center mx-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                    >
                        <FaSync className="mr-2" /> Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm p-5 sm:p-8"
                >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
                                <MdPayment className="mr-3 text-green-600" /> Payment History
                            </h1>
                            <p className="text-gray-600 mt-2">
                                View and manage all your payment transactions
                            </p>
                        </div>
                        
                        <button className="mt-4 md:mt-0 flex items-center bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg">
                            <FaDownload className="mr-2" /> Export CSV
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        {[
                            { 
                                title: "Total Payments", 
                                value: formatCurrency(payments.reduce((sum, payment) => sum + payment.amount, 0)),
                                description: "All transactions"
                            },
                            { 
                                title: "Completed", 
                                value: payments.filter(p => p.status === "completed").length,
                                description: "Successful payments"
                            },
                            { 
                                title: "Pending", 
                                value: payments.filter(p => p.status === "pending").length,
                                description: "Awaiting confirmation"
                            }
                        ].map((stat, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-5">
                                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search payments by reference, service, or method..."
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
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Statuses</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                                <option value="refunded">Refunded</option>
                            </select>
                        </div>
                    </div>

                    {/* Payment Table */}
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {[
                                        { key: "date", label: "Date" },
                                        { key: "reference", label: "Reference" },
                                        { key: "service", label: "Service" },
                                        { key: "amount", label: "Amount" },
                                        { key: "method", label: "Payment Method" },
                                        { key: "status", label: "Status" }
                                    ].map((header) => (
                                        <th 
                                            key={header.key}
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                            onClick={() => handleSort(header.key)}
                                        >
                                            <div className="flex items-center">
                                                {header.label}
                                                {sortConfig.key === header.key && (
                                                    <span className="ml-1">
                                                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredPayments.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <FaFileInvoice className="text-gray-400 text-4xl mb-4" />
                                                <h3 className="text-lg font-medium text-gray-900 mb-1">No payments found</h3>
                                                <p className="text-gray-500">
                                                    {searchTerm 
                                                        ? `No payments match "${searchTerm}"` 
                                                        : "You don't have any payment records yet"}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPayments.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {new Date(payment.date).toLocaleDateString("en-IN", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {payment.reference}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {payment.invoice}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    {payment.service}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {formatCurrency(payment.amount)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {payment.method}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(payment.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-green-600 hover:text-green-900 mr-3">
                                                    View
                                                </button>
                                                <button className="text-gray-600 hover:text-gray-900">
                                                    <FaDownload />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {filteredPayments.length > 0 && (
                        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-6">
                            <div className="flex flex-1 justify-between sm:hidden">
                                <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Previous
                                </button>
                                <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Next
                                </button>
                            </div>
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{" "}
                                        <span className="font-medium">{filteredPayments.length}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                        <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                            <span className="sr-only">Previous</span>
                                            &larr; Previous
                                        </button>
                                        <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                            Next
                                            <span className="sr-only">Next</span>
                                            &rarr;
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Info Card */}
                    <div className="mt-8 bg-green-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Need help with a payment?</h3>
                        <p className="text-gray-600 mb-4">
                            If you have questions about a transaction or need to dispute a charge, our support team is here to help.
                        </p>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg">
                            Contact Support
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PaymentHistory;