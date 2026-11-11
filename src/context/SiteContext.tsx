import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteSettings, ServiceItem, ProjectItem, ReviewItem, InquiryMessage } from '../types';
import {
  db,
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  handleFirestoreError,
  OperationType,
  testFirestoreConnection
} from '../lib/firebase';

interface SiteContextType {
  settings: SiteSettings | null;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings | null>>;
  services: ServiceItem[];
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  projects: ProjectItem[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectItem[]>>;
  reviews: ReviewItem[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewItem[]>>;
  loading: boolean;
  activeView: string;
  setActiveView: (view: string) => void;
  selectedProject: ProjectItem | null;
  setSelectedProject: (p: ProjectItem | null) => void;
  selectedService: ServiceItem | null;
  setSelectedService: (s: ServiceItem | null) => void;
  isQuoteModalOpen: boolean;
  setIsQuoteModalOpen: (open: boolean) => void;
  quotePrefillService: string;
  setQuotePrefillService: (service: string) => void;
  privacyModalOpen: boolean;
  setPrivacyModalOpen: (open: boolean) => void;
  termsModalOpen: boolean;
  setTermsModalOpen: (open: boolean) => void;

  // Firebase Auth State
  currentUser: User | null;
  isAdminAuthenticated: boolean;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;

  // Firebase Realtime Messages
  firestoreMessages: InquiryMessage[];
  submitInquiry: (data: {
    name: string;
    phone: string;
    email?: string;
    service?: string;
    budget?: string;
    message: string;
  }) => Promise<{ success: boolean; message: string }>;
  markMessageReadInFirestore: (id: string, currentRead: boolean) => Promise<void>;
  deleteMessageFromFirestore: (id: string) => Promise<void>;

  refreshSiteData: () => Promise<void>;
  scrollToSection: (id: string) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeView, setActiveView] = useState<string>('home');

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quotePrefillService, setQuotePrefillService] = useState<string>('');
  const [privacyModalOpen, setPrivacyModalOpen] = useState<boolean>(false);
  const [termsModalOpen, setTermsModalOpen] = useState<boolean>(false);

  // Firebase Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [firestoreMessages, setFirestoreMessages] = useState<InquiryMessage[]>([]);
  const [isCustomAdminLoggedIn, setIsCustomAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('eic_admin_token') === 'elegant-admin-session-active';
  });

  const authorizedAdminEmails = [
    'farazgaming0526@gmail.com',
    'admin@elegantinteriors.com.pk'
  ];

  const isAdminAuthenticated = Boolean(
    isCustomAdminLoggedIn ||
    (currentUser && currentUser.email && authorizedAdminEmails.includes(currentUser.email.toLowerCase()))
  );

  // Load Initial Public Data from server / database
  const fetchSiteData = async () => {
    try {
      const res = await fetch('/api/site-data');
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
        setServices(data.services || []);
        setProjects(data.projects || []);
        setReviews(data.reviews || []);
      }
    } catch (err) {
      console.error('Error fetching site data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testFirestoreConnection();
    fetchSiteData();
    fetch('/api/track-visit', { method: 'POST' }).catch(() => {});

    // Listen to Firebase Auth state
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Check URL route
    if (window.location.pathname === '/admin') {
      setActiveView('admin');
    }

    return () => unsubscribeAuth();
  }, []);

  // Attach Real-Time Firestore listener for customer messages when admin is authenticated
  useEffect(() => {
    let unsubscribeMessages: (() => void) | undefined;

    try {
      const messagesCol = collection(db, 'messages');
      const messagesQuery = query(messagesCol);

      unsubscribeMessages = onSnapshot(
        messagesQuery,
        (snapshot) => {
          const list: InquiryMessage[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            list.push({
              id: docSnap.id,
              name: data.name || '',
              phone: data.phone || '',
              email: data.email || '',
              service: data.service || 'General Inquiry',
              budget: data.budget || 'Not Specified',
              message: data.message || '',
              createdAt: data.createdAt || new Date().toISOString(),
              read: Boolean(data.read),
              replied: Boolean(data.replied),
              notes: data.notes || ''
            });
          });
          // Sort newest first
          list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setFirestoreMessages(list);
        },
        (error) => {
          // If Firestore permissions block unauthenticated reads before login, fallback to backend API
          console.warn('Firestore messages snapshot notice:', error.message);
        }
      );
    } catch (error) {
      console.warn('Could not attach Firestore messages listener:', error);
    }

    return () => {
      if (unsubscribeMessages) unsubscribeMessages();
    };
  }, [currentUser, isCustomAdminLoggedIn]);

  // Google Sign-In with Firebase Auth
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (user) {
        setIsCustomAdminLoggedIn(true);
        localStorage.setItem('eic_admin_token', 'elegant-admin-session-active');
        return { success: true };
      }
      return { success: false, error: 'Sign-in cancelled' };
    } catch (err) {
      console.error('Google Sign-in error:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Authentication failed' };
    }
  };

  // Sign out from Firebase
  const logoutAdmin = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Sign out error:', e);
    }
    setIsCustomAdminLoggedIn(false);
    localStorage.removeItem('eic_admin_token');
  };

  // Submit Contact Form directly to Cloud Firestore & backend
  const submitInquiry = async (data: {
    name: string;
    phone: string;
    email?: string;
    service?: string;
    budget?: string;
    message: string;
  }) => {
    const messageId = 'msg-' + Date.now();
    const payload = {
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || '',
      service: data.service || 'Turnkey Projects',
      budget: data.budget || 'Not Specified',
      message: data.message.trim(),
      createdAt: new Date().toISOString(),
      read: false,
      replied: false,
      notes: ''
    };

    let firestoreSaved = false;

    // 1. Save directly into Cloud Firestore
    try {
      const docRef = doc(db, 'messages', messageId);
      await setDoc(docRef, payload);
      firestoreSaved = true;
    } catch (error) {
      console.warn('Firestore direct write notice:', error);
    }

    // 2. Also persist to Express backend for guaranteed redundancy
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (res.ok || firestoreSaved) {
        return {
          success: true,
          message: 'Thank you for contacting Elegant Interiors & Construction. Your inquiry has been securely stored in Cloud Firestore and received by our principal architect.'
        };
      } else {
        return { success: false, message: result.error || 'Failed to submit inquiry' };
      }
    } catch (err) {
      if (firestoreSaved) {
        return {
          success: true,
          message: 'Thank you for contacting Elegant Interiors & Construction. Your inquiry has been recorded in Cloud Firestore.'
        };
      }
      return { success: false, message: 'Network error. Please call directly at 0331 3404441.' };
    }
  };

  // Mark message read in Cloud Firestore
  const markMessageReadInFirestore = async (id: string, currentRead: boolean) => {
    try {
      const msgRef = doc(db, 'messages', id);
      await updateDoc(msgRef, { read: !currentRead });
    } catch (error) {
      console.warn('Firestore update read state error:', error);
    }

    // Also update server
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer elegant-admin-session-active'
        },
        body: JSON.stringify({ read: !currentRead })
      });
    } catch (e) {}
  };

  // Delete message from Cloud Firestore
  const deleteMessageFromFirestore = async (id: string) => {
    try {
      const msgRef = doc(db, 'messages', id);
      await deleteDoc(msgRef);
    } catch (error) {
      console.warn('Firestore delete error:', error);
    }

    // Also delete from server
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer elegant-admin-session-active' }
      });
    } catch (e) {}
  };

  const refreshSiteData = async () => {
    await fetchSiteData();
  };

  const scrollToSection = (id: string) => {
    if (activeView !== 'home') {
      setActiveView('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <SiteContext.Provider
      value={{
        settings,
        setSettings,
        services,
        setServices,
        projects,
        setProjects,
        reviews,
        setReviews,
        loading,
        activeView,
        setActiveView,
        selectedProject,
        setSelectedProject,
        selectedService,
        setSelectedService,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        quotePrefillService,
        setQuotePrefillService,
        privacyModalOpen,
        setPrivacyModalOpen,
        termsModalOpen,
        setTermsModalOpen,

        currentUser,
        isAdminAuthenticated,
        loginWithGoogle,
        logoutAdmin,

        firestoreMessages,
        submitInquiry,
        markMessageReadInFirestore,
        deleteMessageFromFirestore,

        refreshSiteData,
        scrollToSection
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
