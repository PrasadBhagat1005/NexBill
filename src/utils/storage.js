// LocalStorage keys
const INVOICES_KEY = 'nexbill_invoices_v2';
const CLIENTS_KEY = 'nexbill_clients_v2';
const PROFILE_KEY = 'nexbill_business_profile_v2';
const USER_KEY = 'nexbill_current_user_v2';

// Seed Initial Invoices
export const INITIAL_INVOICES = [
  {
    id: 'INV-2026-001',
    clientName: 'Acme SaaS Corp',
    clientEmail: 'billing@acme.io',
    clientAddress: '100 Silicon Way, San Francisco, CA 94107',
    date: '2026-10-01',
    dueDate: '2026-10-15',
    status: 'Paid', // Paid, Unpaid, Overdue, Draft
    currency: '$',
    items: [
      { id: 1, description: 'NexBill Enterprise SaaS License (Annual)', qty: 1, price: 4200 },
      { id: 2, description: 'Custom Integration & Onboarding Support', qty: 1, price: 1500 }
    ],
    taxRate: 10,
    discount: 5,
    notes: 'Thank you for your partnership! Payment received via ACH Transfer.',
    createdAt: '2026-10-01T10:00:00.000Z'
  },
  {
    id: 'INV-2026-002',
    clientName: 'Starlight Design Studios',
    clientEmail: 'finance@starlight.design',
    clientAddress: '45 Creative Blvd, Austin, TX 78701',
    date: '2026-09-28',
    dueDate: '2026-10-12',
    status: 'Unpaid',
    currency: '$',
    items: [
      { id: 1, description: 'Brand Design & UI Component System', qty: 35, price: 120 },
      { id: 2, description: 'Responsive Front-End Development', qty: 20, price: 135 }
    ],
    taxRate: 8,
    discount: 0,
    notes: 'Please remit payment within 14 days of receipt.',
    createdAt: '2026-09-28T14:30:00.000Z'
  },
  {
    id: 'INV-2026-003',
    clientName: 'Vortex Growth Agency',
    clientEmail: 'accounts@vortexagency.com',
    clientAddress: '12 Piccadilly Circus, London, UK W1D 7NE',
    date: '2026-09-10',
    dueDate: '2026-09-24',
    status: 'Overdue',
    currency: '$',
    items: [
      { id: 1, description: 'Monthly Growth Marketing Retainer', qty: 1, price: 2800 },
      { id: 2, description: 'SEO Performance & Audit Sprint', qty: 1, price: 950 }
    ],
    taxRate: 12,
    discount: 10,
    notes: 'OVERDUE: Immediate settlement requested.',
    createdAt: '2026-09-10T09:15:00.000Z'
  },
  {
    id: 'INV-2026-004',
    clientName: 'Nexus Tech Innovations',
    clientEmail: 'payables@nexustech.co',
    clientAddress: '88 Tech Park, Seattle, WA 98101',
    date: '2026-10-02',
    dueDate: '2026-10-20',
    status: 'Paid',
    currency: '$',
    items: [
      { id: 1, description: 'Cloud Infrastructure Optimization', qty: 1, price: 3400 },
      { id: 2, description: 'Database Security Audit', qty: 1, price: 1200 }
    ],
    taxRate: 10,
    discount: 0,
    notes: 'Payment received in full.',
    createdAt: '2026-10-02T11:20:00.000Z'
  },
  {
    id: 'INV-2026-005',
    clientName: 'Horizon Media Labs',
    clientEmail: 'contact@horizonml.com',
    clientAddress: '500 Madison Ave, New York, NY 10022',
    date: '2026-10-03',
    dueDate: '2026-10-17',
    status: 'Draft',
    currency: '$',
    items: [
      { id: 1, description: 'Video Production & Editing Project', qty: 1, price: 1850 }
    ],
    taxRate: 5,
    discount: 0,
    notes: 'Draft proposal invoice for client review.',
    createdAt: '2026-10-03T08:00:00.000Z'
  }
];

export const INITIAL_CLIENTS = [
  { id: 'c1', name: 'Acme SaaS Corp', email: 'billing@acme.io', phone: '+1 (555) 234-5678', company: 'Acme SaaS Corp', address: '100 Silicon Way, San Francisco, CA' },
  { id: 'c2', name: 'Starlight Design Studios', email: 'finance@starlight.design', phone: '+1 (555) 876-5432', company: 'Starlight Design', address: '45 Creative Blvd, Austin, TX' },
  { id: 'c3', name: 'Vortex Growth Agency', email: 'accounts@vortexagency.com', phone: '+44 20 7946 0912', company: 'Vortex Growth', address: '12 Piccadilly Circus, London, UK' },
  { id: 'c4', name: 'Nexus Tech Innovations', email: 'payables@nexustech.co', phone: '+1 (555) 345-6789', company: 'Nexus Tech', address: '88 Tech Park, Seattle, WA' },
  { id: 'c5', name: 'Horizon Media Labs', email: 'contact@horizonml.com', phone: '+1 (555) 456-7890', company: 'Horizon Media', address: '500 Madison Ave, New York, NY' }
];

export const INITIAL_PROFILE = {
  companyName: 'NexBill Enterprise',
  ownerName: 'Alex Morgan',
  email: 'alex@nexbill.io',
  phone: '+1 (800) 555-NEXB',
  website: 'https://nexbill.io',
  taxId: 'US-987654321',
  currency: '$',
  address: '750 Emerald Green Way, Suite 400, San Francisco, CA 94103',
  invoicePrefix: 'INV-2026-',
  defaultTaxRate: 10,
  defaultTerms: 'Payment due within 14 days from date of invoice.'
};

// Functions for Invoices
export function getSavedInvoices() {
  try {
    const stored = localStorage.getItem(INVOICES_KEY);
    if (!stored) {
      localStorage.setItem(INVOICES_KEY, JSON.stringify(INITIAL_INVOICES));
      return INITIAL_INVOICES;
    }
    return JSON.parse(stored);
  } catch (err) {
    console.error('Error reading invoices from localStorage:', err);
    return INITIAL_INVOICES;
  }
}

export function saveInvoices(invoices) {
  try {
    localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
  } catch (err) {
    console.error('Error saving invoices to localStorage:', err);
  }
}

// Functions for Clients
export function getSavedClients() {
  try {
    const stored = localStorage.getItem(CLIENTS_KEY);
    if (!stored) {
      localStorage.setItem(CLIENTS_KEY, JSON.stringify(INITIAL_CLIENTS));
      return INITIAL_CLIENTS;
    }
    return JSON.parse(stored);
  } catch (err) {
    console.error('Error reading clients from localStorage:', err);
    return INITIAL_CLIENTS;
  }
}

export function saveClients(clients) {
  try {
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
  } catch (err) {
    console.error('Error saving clients to localStorage:', err);
  }
}

// Functions for Business Profile
export function getSavedProfile() {
  try {
    const stored = localStorage.getItem(PROFILE_KEY);
    if (!stored) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(INITIAL_PROFILE));
      return INITIAL_PROFILE;
    }
    return JSON.parse(stored);
  } catch (err) {
    console.error('Error reading profile from localStorage:', err);
    return INITIAL_PROFILE;
  }
}

export function saveProfile(profile) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Error saving profile to localStorage:', err);
  }
}

// Helper: Calculate invoice grand total
export function calculateInvoiceTotal(invoice) {
  if (!invoice || !invoice.items) return 0;
  const subtotal = invoice.items.reduce((acc, item) => acc + (parseFloat(item.qty || 0) * parseFloat(item.price || 0)), 0);
  const discountAmount = subtotal * ((parseFloat(invoice.discount) || 0) / 100);
  const taxable = Math.max(0, subtotal - discountAmount);
  const taxAmount = taxable * ((parseFloat(invoice.taxRate) || 0) / 100);
  return taxable + taxAmount;
}

// Helper: Format Currency
export function formatCurrency(amount, currency = '$') {
  const numeric = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  return `${currency}${numeric.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
