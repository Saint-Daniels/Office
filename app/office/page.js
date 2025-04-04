'use client';

import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Nav, Tab, Badge, Modal } from 'react-bootstrap';
import { 
  FaPhone, FaUser, FaEnvelope, FaCalendar, FaChartLine, FaUsers, 
  FaBuilding, FaBriefcase, FaTasks, FaComments, FaFileAlt, 
  FaUserPlus, FaSearch, FaFilter, FaDownload, FaUpload, FaVideo,
  FaSms, FaGoogle, FaHistory, FaClock, FaMapMarkerAlt, FaLink, FaHome, FaRobot,
  FaCloud, FaCog, FaChartBar, FaCircle, FaPlus, FaTimes, FaCoffee, FaRestroom, FaUtensils, FaGraduationCap,
  FaGoogleDrive, FaFolder, FaStar, FaEllipsisV, FaHashtag, FaPaperPlane,
  FaFileExcel, FaFilePowerpoint, FaFilePdf, FaFileWord, FaUserFriends,
  FaSignOutAlt, FaBell, FaUserCircle, FaCamera, FaShieldAlt, FaKey, FaVolumeUp,
  FaDesktop, FaMobile, FaTablet, FaBellSlash, FaUserShield, FaUserCog,
  FaEdit, FaPalette, FaTrash, FaExchangeAlt, FaCheckCircle, FaSave, FaBackspace
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Chat from '@/components/Chat';

export default function Office() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedClient, setSelectedClient] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);
  const [showClientProfile, setShowClientProfile] = useState(false);
  const [clientNotes, setClientNotes] = useState('');
  const [agentDisposition, setAgentDisposition] = useState('active');
  const [dispositionNotes, setDispositionNotes] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    desktop: true,
    mobile: true,
    tablet: true
  });
  
  // Add hasActivePolicy state
  const [hasActivePolicy, setHasActivePolicy] = useState(false);
  
  // Add state for active/focused input field
  const [activeInputField, setActiveInputField] = useState('phoneNumber');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');

  // Add these to the existing state declarations at the top
  const [messages, setMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');

  // Add this state near the other state declarations
  const [showEventsModal, setShowEventsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  // Add notes state
  const [notes, setNotes] = useState([
    {
      date: '2024-03-15 14:30',
      type: 'Call',
      disposition: 'Follow-up Required',
      agent: 'John Smith',
      duration: '15 minutes',
      notes: 'Client expressed interest in premium package. Requested follow-up with detailed pricing.'
    },
    {
      date: '2024-03-15 11:45',
      type: 'Meeting',
      disposition: 'Completed',
      agent: 'Sarah Johnson',
      duration: '30 minutes',
      notes: 'Reviewed policy options. Client leaning towards standard coverage.'
    },
    {
      date: '2024-03-14 16:00',
      type: 'Email',
      disposition: 'Pending Response',
      agent: 'Mike Brown',
      duration: 'N/A',
      notes: 'Sent follow-up email with requested documentation. Awaiting client response.'
    }
  ]);

  // Add these state variables at the top with other state declarations
  const [hasCoverage, setHasCoverage] = useState(false);
  const [coverageType, setCoverageType] = useState('');
  const [savingStatus, setSavingStatus] = useState('');

  // Add these state variables at the top
  const [isDialing, setIsDialing] = useState(false);
  const [callStatus, setCallStatus] = useState('idle'); // 'idle', 'dialing', 'connected'

  // Add new state variable for enrollment form phone
  const [enrollmentPhone, setEnrollmentPhone] = useState('');

  // Add new state variable for disposition
  const [selectedDisposition, setSelectedDisposition] = useState('');
  const [showDispositionModal, setShowDispositionModal] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time helper function
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Enhanced client data
  const clients = [
    {
      name: "John Doe",
      position: "CEO",
      company: "Acme Corp",
      phone: "(555) 123-4567",
      email: "john@example.com",
      address: "123 Business Ave, New York, NY 10001",
      location: "New York, NY",
      status: "Active",
      lastContact: "2 hours ago",
      occupation: "Executive Management",
      industry: "Technology",
      notes: "Key decision maker, interested in enterprise solutions",
      tags: ["VIP", "Enterprise", "Tech"],
      history: [
        {
          type: "call",
          title: "Initial Sales Call",
          description: "Discussed product features and pricing",
          date: "2 hours ago",
          duration: "45 minutes",
          outcome: "Positive"
        },
        {
          type: "email",
          title: "Follow-up Email",
          description: "Sent product brochure and pricing details",
          date: "1 day ago",
          status: "Opened"
        }
      ]
    },
    {
      name: "Jane Smith",
      position: "CTO",
      company: "Tech Solutions",
      phone: "(555) 987-6543",
      email: "jane@example.com",
      address: "456 Innovation Blvd, San Francisco, CA 94105",
      location: "San Francisco, CA",
      status: "Pending",
      lastContact: "1 day ago",
      occupation: "Technical Leadership",
      industry: "Software",
      notes: "Technical background, needs detailed specifications",
      tags: ["Technical", "Enterprise", "Software"],
      history: [
        {
          type: "meeting",
          title: "Product Demo",
          description: "Demonstrated new features to the team",
          date: "1 day ago",
          duration: "1 hour",
          outcome: "Very Interested"
        }
      ]
    },
    {
      name: "Mike Johnson",
      position: "Sales Director",
      company: "Global Sales",
      phone: "(555) 456-7890",
      email: "mike@example.com",
      address: "789 Market St, Chicago, IL 60601",
      location: "Chicago, IL",
      status: "Active",
      lastContact: "3 hours ago",
      occupation: "Sales Management",
      industry: "Consulting",
      notes: "Looking for sales automation solutions",
      tags: ["Sales", "Mid-Market", "Consulting"],
      history: [
        {
          type: "call",
          title: "Contract Discussion",
          description: "Reviewed contract terms and conditions",
          date: "3 hours ago",
          duration: "30 minutes",
          outcome: "Needs Follow-up"
        }
      ]
    }
  ];

  // Add office suite apps data
  const officeApps = [
    {
      name: "Email",
      icon: <FaEnvelope size={32} />,
      color: "#EA4335",
      description: "Access your email inbox",
      link: "#"
    },
    {
      name: "Calendar",
      icon: <FaCalendar size={32} />,
      color: "#4285F4",
      description: "View and manage your schedule",
      link: "#"
    },
    {
      name: "Drive",
      icon: <FaFileAlt size={32} />,
      color: "#34A853",
      description: "Access your files and documents",
      link: "#"
    },
    {
      name: "Meet",
      icon: <FaVideo size={32} />,
      color: "#00832D",
      description: "Start or join video meetings",
      link: "#"
    },
    {
      name: "Chat",
      icon: <FaComments size={32} />,
      color: "#00AC47",
      description: "Communicate with your team",
      link: "#"
    },
    {
      name: "AI Assistant",
      icon: <FaRobot size={32} />,
      color: "#FF6D00",
      description: "Get AI-powered assistance",
      link: "#"
    }
  ];

  const apps = [
    {
      id: 1,
      name: 'Email',
      icon: <FaEnvelope size={32} />,
      color: '#EA4335',
      link: '/office/email'
    },
    {
      id: 2,
      name: 'Dialer',
      icon: <FaPhone size={32} />,
      color: '#34A853',
      link: '/office/dialer'
    },
    {
      id: 3,
      name: 'Calendar',
      icon: <FaCalendar size={32} />,
      color: '#4285F4',
      link: '/office/calendar'
    },
    {
      id: 4,
      name: 'Meet',
      icon: <FaVideo size={32} />,
      color: '#00832D',
      link: '/office/meet'
    },
    {
      id: 5,
      name: 'Drive',
      icon: <FaCloud size={32} />,
      color: '#FBBC05',
      link: '/office/drive'
    },
    {
      id: 6,
      name: 'Chat',
      icon: <FaComments size={32} />,
      color: '#00AC47',
      link: '/office/chat'
    },
    {
      id: 7,
      name: 'AI Assistant',
      icon: <FaRobot size={32} />,
      color: '#FF6D00',
      link: '/office/ai'
    },
    {
      id: 8,
      name: 'Tasks',
      icon: <FaTasks size={32} />,
      color: '#9C27B0',
      link: '/office/tasks'
    },
    {
      id: 9,
      name: 'Analytics',
      icon: <FaChartBar size={32} />,
      color: '#1976D2',
      link: '/office/analytics'
    },
    {
      id: 10,
      name: 'Settings',
      icon: <FaCog size={32} />,
      color: '#607D8B',
      link: '/office/settings'
    }
  ];

  // Sample data for previews
  const recentEmails = [
    { from: 'John Doe', subject: 'Project Update', preview: 'Here are the latest updates...', time: '2h ago', unread: true },
    { from: 'Jane Smith', subject: 'Meeting Notes', preview: 'Please review the notes...', time: '4h ago', unread: true },
    { from: 'Mike Johnson', subject: 'Document Review', preview: 'Can you check this...', time: '1d ago', unread: false }
  ];

  const upcomingMeetings = [
    { 
      title: 'Team Standup', 
      time: new Date(new Date().setHours(10, 0)), 
      participants: 5,
      type: 'video',
      meetLink: 'https://meet.google.com/abc123'
    },
    { 
      title: 'Project Review', 
      time: new Date(new Date().setHours(14, 0)), 
      participants: 8,
      type: 'video',
      meetLink: 'https://meet.google.com/def456'
    },
    { 
      title: 'Sales Floor', 
      time: new Date(new Date().setHours(16, 0)), 
      participants: 8,
      type: 'video',
      meetLink: 'https://meet.google.com/def456'
    }
  ];

  const recentTasks = [
    { 
      title: 'Review Project Proposal', 
      due: new Date(), 
      priority: 'high',
      status: 'in-progress',
      progress: 60,
      assignee: 'John Doe'
    },
    { 
      title: 'Send Meeting Notes', 
      due: new Date(new Date().setDate(new Date().getDate() + 1)), 
      priority: 'medium',
      status: 'pending',
      progress: 0,
      assignee: 'Jane Smith'
    },
    { 
      title: 'Update Documentation', 
      due: new Date(new Date().setDate(new Date().getDate() + 7)), 
      priority: 'low',
      status: 'pending',
      progress: 30,
      assignee: 'Mike Johnson'
    }
  ];

  const recentChats = [
    { name: 'Marketing Team', lastMessage: 'Can you review this?', time: '5m ago', unread: true },
    { name: 'Development Team', lastMessage: 'Build is ready', time: '1h ago', unread: false },
    { name: 'Design Team', lastMessage: 'New mockups uploaded', time: '2h ago', unread: true }
  ];

  // Add dispositions data
  const dispositions = [
    { id: 'active', label: 'Active', color: 'success', icon: <FaPhone /> },
    { id: 'break', label: 'On Break', color: 'warning', icon: <FaCoffee /> },
    { id: 'bathroom', label: 'Bathroom', color: 'info', icon: <FaRestroom /> },
    { id: 'lunch', label: 'Lunch Break', color: 'warning', icon: <FaUtensils /> },
    { id: 'notes', label: 'Entering Notes', color: 'primary', icon: <FaFileAlt /> },
    { id: 'training', label: 'Training', color: 'secondary', icon: <FaGraduationCap /> },
    { id: 'meeting', label: 'In Meeting', color: 'info', icon: <FaUsers /> }
  ];

  // Update the handleCall function
  const handleCall = () => {
    if (phoneNumber.length > 0) {
      setIsDialing(true);
      setCallStatus('dialing');
      setCallDuration(0);
      // Start call duration timer
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
      return () => clearInterval(interval);
    }
  };

  // Update the handleEndCall function
  const handleEndCall = () => {
    if (isDialing) {
      setShowDispositionModal(true);
    } else {
      setIsDialing(false);
      setCallStatus('idle');
    setCallDuration(0);
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setShowProfile(true);
  };

  const handleStartMeeting = (client) => {
    // Implement Google Meet integration
    window.open(`https://meet.google.com/new?email=${client.email}`, '_blank');
  };

  const handleSendSMS = (phone) => {
    // Implement SMS functionality
    window.open(`sms:${phone}`, '_blank');
  };

  const handleSendEmail = (email) => {
    // Implement email functionality
    window.open(`mailto:${email}`, '_blank');
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  // Get first day of month
  const firstDayOfMonth = new Date(2025, 2, 1);
  const startingDayIndex = firstDayOfMonth.getDay();
  
  // Generate calendar days array with empty slots for proper alignment
  const calendarDays = Array(startingDayIndex).fill(null).concat(
    Array.from({ length: 31 }, (_, i) => i + 1)
  );

  // Add search handler function
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Add this function near the other helper functions
  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return `(${phoneNumber}`;
    if (phoneNumberLength < 7) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  // Update the handleDialerInput function
  const handleDialerInput = (key) => {
    if (phoneNumber.replace(/[^\d]/g, '').length < 10) {
      setPhoneNumber(prev => {
        const newValue = prev.replace(/[^\d]/g, '') + key;
        return formatPhoneNumber(newValue);
      });
    }
  };

  // Function to handle input from dialer pad
  const handleDialerBackspace = () => {
    switch(activeInputField) {
      case 'phoneNumber':
        setPhoneNumber(prev => prev.slice(0, -1));
        break;
      case 'firstName':
        setFirstName(prev => prev.slice(0, -1));
        break;
      case 'middleName':
        setMiddleName(prev => prev.slice(0, -1));
        break;
      case 'lastName':
        setLastName(prev => prev.slice(0, -1));
        break;
      case 'email':
        setEmail(prev => prev.slice(0, -1));
        break;
      case 'streetAddress':
        setStreetAddress(prev => prev.slice(0, -1));
        break;
      case 'apartment':
        setApartment(prev => prev.slice(0, -1));
        break;
      case 'city':
        setCity(prev => prev.slice(0, -1));
        break;
      case 'stateProvince':
        setStateProvince(prev => prev.slice(0, -1));
        break;
      case 'zipCode':
        setZipCode(prev => prev.slice(0, -1));
        break;
      case 'country':
        setCountry(prev => prev.slice(0, -1));
        break;
      default:
        setPhoneNumber(prev => prev.slice(0, -1));
    }
  };
  
  // Function to clear the active input field
  const handleDialerClear = () => {
    switch(activeInputField) {
      case 'phoneNumber':
        setPhoneNumber('');
        break;
      case 'firstName':
        setFirstName('');
        break;
      case 'middleName':
        setMiddleName('');
        break;
      case 'lastName':
        setLastName('');
        break;
      case 'email':
        setEmail('');
        break;
      case 'streetAddress':
        setStreetAddress('');
        break;
      case 'apartment':
        setApartment('');
        break;
      case 'city':
        setCity('');
        break;
      case 'stateProvince':
        setStateProvince('');
        break;
      case 'zipCode':
        setZipCode('');
        break;
      case 'country':
        setCountry('');
        break;
      default:
        setPhoneNumber('');
    }
  };

  // Add this handler function before the return statement
  const handleAiSubmit = () => {
    if (!aiInput.trim()) return;
    
    // Add the user's message to the chat
    setMessages(prev => [...prev, aiInput]);
    
    // Clear the input
    setAiInput('');
    
    // Here you would typically make an API call to get the AI's response
    // For now, we'll just add a mock response
    setTimeout(() => {
      setMessages(prev => [...prev, "I'm here to help! However, I'm currently in demo mode."]);
    }, 1000);
  };

  const MeetingTime = ({ meeting, currentTime, timeUntil }) => {
    return (
      <p className="text-muted mb-1">
        <FaClock className="me-1" />
        {formatTime(meeting.time)} ({timeUntil <= 0 ? 'Started' : `in ${timeUntil} min`})
      </p>
    );
  };

  // Add this function before the return statement
  const handleSave = async (type) => {
    setSavingStatus('saving');
    try {
      // Here you would typically make an API call to save the data
      // For now, we'll simulate a save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update coverage status based on the form data
      if (coverageType) {
        setHasCoverage(true);
      }
      
      setSavingStatus('saved');
      setTimeout(() => setSavingStatus(''), 2000);
    } catch (error) {
      console.error('Error saving:', error);
      setSavingStatus('error');
      setTimeout(() => setSavingStatus(''), 2000);
    }
  };

  return (
    <div className="office-container">
      <Container fluid>
        <div className="workspace-header">
          <div className="welcome-section">
            <h1>Office Workspace</h1>
            <p className="text-muted">Welcome back! Here's your overview for today</p>
          </div>
          <div className="quick-actions">
            <div className="status-indicators d-flex align-items-center gap-2 me-3">
              {/* Phone Status Indicator */}
              <Button 
                variant={isDialing ? "danger" : "outline-secondary"} 
                size="sm"
                className="d-flex align-items-center gap-2"
                onClick={() => setActiveTab('dialer')}
              >
                <FaPhone className={isDialing ? "pulse" : ""} />
                <span className="status-text">
                  {isDialing ? "On Call" : agentDisposition}
                </span>
                {isDialing && (
                  <span className="call-duration">{formatDuration(callDuration)}</span>
                )}
              </Button>

              {/* Proctoring Status Indicator */}
              <Button 
                variant="outline-secondary" 
                size="sm"
                className="d-flex align-items-center gap-2"
                onClick={() => window.open('https://meet.google.com', '_blank')}
              >
                <FaVideo />
                <span>Proctored</span>
              </Button>
            </div>

            {/* Disposition Modal */}
            <Modal show={showDispositionModal} onHide={() => setShowDispositionModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Call Disposition Required</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Select Disposition</Form.Label>
                    <Form.Select 
                      value={selectedDisposition} 
                      onChange={(e) => setSelectedDisposition(e.target.value)}
                    >
                      <option value="">Select a disposition</option>
                      <option value="sold">Sold Enrollment</option>
                      <option value="not_interested">Not Interested</option>
                      <option value="has_plan">Already Has Plan</option>
                      <option value="not_qualified">Does Not Qualify</option>
                      <option value="angry">Angry/Unruly</option>
                      <option value="thinking">Wants to Think About It</option>
                      <option value="wrong_number">Wrong Number</option>
                      <option value="bad_connection">Bad Connection</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3} 
                      placeholder="Add any additional notes about the call..."
                      value={dispositionNotes}
                      onChange={(e) => setDispositionNotes(e.target.value)}
                    />
                  </Form.Group>
                </Form>
                {selectedDisposition === 'sold' && (
                  <div className="alert alert-success mt-3">
                    <FaCheckCircle className="me-2" />
                    Congratulations! Enrollment successfully recorded.
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDispositionModal(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => {
                    if (selectedDisposition) {
                      // Save the disposition
                      setNotes(prev => [...prev, {
                        date: new Date().toLocaleString(),
                        type: 'Call',
                        disposition: selectedDisposition,
                        agent: 'John Doe',
                        duration: formatDuration(callDuration),
                        notes: dispositionNotes
                      }]);
                      
                      // End the call and reset call state
                      setIsDialing(false);
                      setCallStatus('idle');
                      setCallDuration(0);
                      setPhoneNumber('');
                      
                      // Close the modal and reset form
                      setShowDispositionModal(false);
                      setSelectedDisposition('');
                      setDispositionNotes('');
                    }
                  }}
                  disabled={!selectedDisposition}
                >
                  End Call
                </Button>
              </Modal.Footer>
            </Modal>

            <div className="profile-dropdown">
              <Button 
                variant="outline-primary" 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <FaUser className="me-2" /> Profile
              </Button>
              {showProfileDropdown && (
                <div className="profile-dropdown-menu">
                  <div className="profile-header p-3 border-bottom">
                    <div className="d-flex align-items-center">
                      <div className="profile-avatar me-3">
                        {profilePicture ? (
                          <img src={profilePicture} alt="Profile" className="rounded-circle" />
                        ) : (
                          <FaUserCircle size={40} />
                        )}
                      </div>
                      <div>
                        <h6 className="mb-0">John Doe</h6>
                        <small className="text-muted">john.doe@example.com</small>
                      </div>
                    </div>
                  </div>
                  <div className="profile-menu-items">
                    <a href="#" className="dropdown-item">
                      <FaUser className="me-2" /> My Profile
                    </a>
                    <a href="#" className="dropdown-item">
                      <FaBell className="me-2" /> Notifications
                    </a>
                    <a href="#" className="dropdown-item">
                      <FaCog className="me-2" /> Settings
                    </a>
                    <div className="dropdown-divider"></div>
                    <a 
                      href="#" 
                      className="dropdown-item text-danger"
                      onClick={() => router.push('/login')}
                    >
                      <FaSignOutAlt className="me-2" /> Logout
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Nav variant="pills" className="workspace-nav">
          <Nav.Item>
            <Nav.Link active={activeTab === 'home'} onClick={() => setActiveTab('home')}>
              <FaHome className="me-2" /> Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'dialer'} onClick={() => setActiveTab('dialer')}>
              <FaPhone className="me-2" /> Dialer
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')}>
              <FaChartBar className="me-2" /> Analytics
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
              <FaCog className="me-2" /> Settings
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'chat'} onClick={() => setActiveTab('chat')}>
              <FaComments className="me-2" /> Chat
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {activeTab === 'home' && (
          <div className="dashboard-grid">
            {/* Meetings Section */}
            <Card className="dashboard-card meetings-section mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <FaVideo className="me-2" /> Active & Upcoming Meetings
                </h5>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => window.open('https://meet.google.com/new', '_blank')}
                >
                  <FaPlus className="me-1" /> New Meeting
                </Button>
              </Card.Header>
              <Card.Body>
                <div className="meetings-container">
                  <div className="meetings-list">
                    {upcomingMeetings.map((meeting, index) => {
                      const timeUntil = Math.round((meeting.time - currentTime) / (1000 * 60));
                      const isStartingSoon = timeUntil <= 30 && timeUntil > 0;
                      const isInProgress = timeUntil <= 0 && timeUntil > -meeting.duration;
                      
                      return (
                        <div key={index} className={`meeting-item ${meeting.type} ${isStartingSoon ? 'starting-soon' : ''} ${isInProgress ? 'in-progress' : ''}`}>
                          <div className="meeting-content">
                            <div className="meeting-header">
                              <h6>{meeting.title}</h6>
                              {meeting.title !== "Team Standup" && meeting.title !== "Project Review" && meeting.title !== "Sales Floor" && meeting.type === 'video' && (
                                <Badge bg="primary" className="meeting-type-badge">
                                  VIDEO
                                </Badge>
                              )}
                              {meeting.title !== "Client Meeting" && meeting.type === 'in-person' && (
                                <Badge bg="success" className="meeting-type-badge">
                                  IN-PERSON
                                </Badge>
                              )}
                            </div>
                            <div className="meeting-details">
                              <MeetingTime meeting={meeting} currentTime={currentTime} timeUntil={timeUntil} />
                              <div className="meeting-participants">
                                <FaUsers className="me-2" />
                                {meeting.participants} participants
                              </div>
                            </div>
                          </div>
                          {meeting.title === "Team Standup" || meeting.title === "Project Review" || meeting.title === "Sales Floor" ? (
                            <Button 
                              variant="primary"
                              size="sm"
                              className="px-3"
                              onClick={() => {
                                if (meeting.meetLink) {
                                  window.open(meeting.meetLink, '_blank');
                                }
                              }}
                            >
                              Join Now
                            </Button>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Calendar Preview Section */}
            <Card className="dashboard-card calendar-preview mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                <h5 className="mb-0">
                  <FaCalendar className="me-2" /> Today's Schedule
                </h5>
                  <div className="analog-clock">
                    <div className="clock-marking marking-12"></div>
                    <div className="clock-marking marking-3"></div>
                    <div className="clock-marking marking-6"></div>
                    <div className="clock-marking marking-9"></div>
                    <div 
                      className="clock-hand hour-hand" 
                      style={{ 
                        transform: `rotate(${((currentTime.getHours() % 12) * 30) + (currentTime.getMinutes() * 0.5)}deg) translateX(-50%)`
                      }}
                    ></div>
                    <div 
                      className="clock-hand minute-hand" 
                      style={{ 
                        transform: `rotate(${currentTime.getMinutes() * 6}deg) translateX(-50%)`
                      }}
                    ></div>
                    <div 
                      className="clock-hand second-hand" 
                      style={{ 
                        transform: `rotate(${currentTime.getSeconds() * 6}deg) translateX(-50%)`
                      }}
                    ></div>
                    <div className="clock-center"></div>
                  </div>
                </div>
                <Button variant="link" onClick={() => router.push('/office/calendar')}>
                  View Calendar
                </Button>
              </Card.Header>
              <Card.Body>
                <div className="calendar-view">
                  <div className="calendar-header">
                    <h6 className="current-month">March 2025</h6>
                  </div>
                  <div className="calendar-grid">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="calendar-day-header">{day}</div>
                    ))}
                    {calendarDays.map((day, index) => {
                      if (day === null) return <div key={`empty-${index}`} className="calendar-day" />;
                      
                      const hasEvents = [4, 7, 9, 10, 11, 13, 14, 15, 29, 30, 31].includes(day);
                      const isToday = day === currentTime.getDate() && 
                        currentTime.getMonth() === 2 && 
                        currentTime.getFullYear() === 2025;
                      
                      return (
                        <div 
                          key={day} 
                          className={`calendar-day ${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}`}
                          onClick={() => {
                            if (hasEvents) {
                              setSelectedDate(day);
                              setSelectedDateEvents([
                                {
                                  title: 'Team Training',
                                  time: '10:00 AM',
                                  type: 'Training',
                                  participants: 12
                                },
                                {
                                  title: 'Department Meeting',
                                  time: '2:00 PM',
                                  type: 'Meeting',
                                  participants: 8
                                }
                              ]);
                              setShowEventsModal(true);
                            }
                          }}
                          style={{ cursor: hasEvents ? 'pointer' : 'default' }}
                        >
                          {day}
                          {hasEvents && <div className="event-indicator"></div>}
                        </div>
                      );
                    })}
                  </div>
                              </div>
              </Card.Body>
            </Card>

            {/* Events Modal */}
            <Modal
              show={showEventsModal}
              onHide={() => setShowEventsModal(false)}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Events for March {selectedDate}, 2025</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="events-list">
                  {selectedDateEvents.map((event, index) => (
                    <div key={index} className="event-item p-3 border rounded mb-2">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{event.title}</h6>
                              <p className="text-muted mb-1">
                            <FaClock className="me-1" /> {event.time}
                          </p>
                          <div className="d-flex align-items-center">
                            <FaUsers className="me-1" />
                            <span className="text-muted">{event.participants} participants</span>
                              </div>
                            </div>
                        <Badge bg="info">{event.type}</Badge>
                          </div>
                    </div>
                  ))}
                  </div>
              </Modal.Body>
            </Modal>

            {/* Email Preview Section */}
            <Card className="dashboard-card mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <FaEnvelope className="me-2" /> Recent Emails
                </h5>
                <Button variant="link" onClick={() => router.push('/office/email')}>
                  View All
                </Button>
              </Card.Header>
              <Card.Body>
                <div className="preview-list">
                  {recentEmails.map((email, index) => (
                    <div key={index} className={`preview-item ${email.unread ? 'unread' : ''}`}>
                      <div className="preview-content">
                        <h6>{email.subject}</h6>
                        <p className="text-muted mb-1">{email.from}</p>
                        <p className="preview-text">{email.preview}</p>
                      </div>
                      <span className="preview-time">{email.time}</span>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Notes Section */}
            <Card className="dashboard-card tasks-preview mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center border-0 bg-transparent">
                <h5 className="mb-0">
                  <FaTasks className="me-2" /> Notes
                </h5>
                <Button variant="outline-primary" size="sm" className="rounded-pill">
                  <FaPlus className="me-1" /> New Note
                </Button>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="notes-container">
                  <div className="notes-content p-3">
                    <div className="notes-grid">
                      <div className="note-card p-4 border-0 rounded-3 shadow-sm mb-4" style={{ backgroundColor: '#fff9e6' }}>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h6 className="mb-0">Initial Greeting Script</h6>
                          <div className="note-actions">
                            <div className="dropdown">
                              <Button variant="link" size="sm" className="text-muted p-0" data-bs-toggle="dropdown">
                                <FaEllipsisV />
                              </Button>
                              <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#"><FaEdit className="me-2" /> Edit Note</a></li>
                                <li><a className="dropdown-item" href="#"><FaPalette className="me-2" /> Change Color</a></li>
                                <li><a className="dropdown-item" href="#"><FaTrash className="me-2" /> Delete Note</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted small mb-3">Updated 2h ago</p>
                        <div className="note-content">
                          <p className="mb-3">"Hello, this is [Your Name] calling from [Company Name]. How are you today? I'm reaching out to discuss your current insurance coverage and explore how we might be able to help you save money while maintaining or improving your coverage."</p>
                        </div>
                      </div>

                      <div className="note-card p-3 border-0 rounded-3 shadow-sm mb-3" style={{ backgroundColor: '#e6f3ff' }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">Objection Handling Script</h6>
                          <div className="note-actions">
                            <div className="dropdown">
                              <Button variant="link" size="sm" className="text-muted p-0" data-bs-toggle="dropdown">
                                <FaEllipsisV />
                              </Button>
                              <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#"><FaEdit className="me-2" /> Edit Note</a></li>
                                <li><a className="dropdown-item" href="#"><FaPalette className="me-2" /> Change Color</a></li>
                                <li><a className="dropdown-item" href="#"><FaTrash className="me-2" /> Delete Note</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted small mb-2">Updated 1d ago</p>
                        <div className="note-content">
                          <p className="mb-2">"I understand your concern about [specific objection]. Many of our clients had similar concerns before they saw how our solutions could help them. Would you be open to a brief conversation about how we've helped others in similar situations?"</p>
                        </div>
                      </div>

                      <div className="note-card p-3 border-0 rounded-3 shadow-sm" style={{ backgroundColor: '#e6ffe6' }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">Closing Script</h6>
                          <div className="note-actions">
                            <div className="dropdown">
                              <Button variant="link" size="sm" className="text-muted p-0" data-bs-toggle="dropdown">
                                <FaEllipsisV />
                              </Button>
                              <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#"><FaEdit className="me-2" /> Edit Note</a></li>
                                <li><a className="dropdown-item" href="#"><FaPalette className="me-2" /> Change Color</a></li>
                                <li><a className="dropdown-item" href="#"><FaTrash className="me-2" /> Delete Note</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted small mb-2">Updated 3d ago</p>
                        <div className="note-content">
                          <p className="mb-2">"Based on our conversation, I believe we can provide you with [specific benefit]. Would you like to proceed with setting up a time to review the details and get started? I can schedule a follow-up call for [specific time] to go over everything in detail."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* AI Assistant Section */}
            <Card className="dashboard-card mb-4">
              <Card.Header>
                  <h5 className="mb-0">
                  <FaRobot className="me-2" /> AI Assistant
                  </h5>
              </Card.Header>
              <Card.Body>
                <div className="ai-assistant-preview">
                  <p>Ask me anything about your workspace or get help with tasks</p>
                  <div className="ai-chat-container">
                    <div className="ai-message">
                      <div className="ai-avatar">
                        <FaRobot />
                    </div>
                      <div className="ai-message-content">
                        Hello! I'm your AI assistant. How can I help you today?
                      </div>
                          </div>
                    {messages.map((message, index) => (
                      <div key={index} className="ai-message">
                        <div className="ai-avatar">
                          <FaRobot />
                      </div>
                        <div className="ai-message-content">
                          {message}
                          </div>
                        </div>
                      ))}
                    </div>
                  <div className="input-group">
                    <input
                            type="text"
                      className="form-control"
                      placeholder="Type your question here..."
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAiSubmit();
                        }
                      }}
                    />
                    <button 
                      className="btn btn-primary" 
                      type="button"
                      onClick={handleAiSubmit}
                    >
                            <FaPaperPlane />
                    </button>
                        </div>
                </div>
              </Card.Body>
            </Card>

            {/* Drive Preview Section */}
            <Card className="dashboard-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaGoogleDrive className="me-2" /> Drive
                  </h5>
                  <Button variant="outline-primary" size="sm">
                    <FaPlus className="me-1" /> New
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="drive-search mb-3">
                  <Form.Control
                    type="search"
                    placeholder="Search in Drive..."
                    className="form-control-sm"
                  />
                </div>
                <div className="drive-folders mb-3">
                  <div className="d-flex gap-2 mb-2">
                    <Button variant="outline-secondary" size="sm" className="drive-folder-btn">
                      <FaFolder className="me-1" /> My Drive
                    </Button>
                    <Button variant="outline-secondary" size="sm" className="drive-folder-btn">
                      <FaUsers className="me-1" /> Shared
                    </Button>
                    <Button variant="outline-secondary" size="sm" className="drive-folder-btn">
                      <FaStar className="me-1" /> Starred
                    </Button>
                  </div>
                </div>
                <div className="drive-files">
                  {[
                    { name: 'Q4 Sales Report.xlsx', type: 'excel', size: '2.4 MB', modified: '2h ago' },
                    { name: 'Client Presentation.pptx', type: 'powerpoint', size: '4.8 MB', modified: '1d ago' },
                    { name: 'Contract Draft.pdf', type: 'pdf', size: '1.2 MB', modified: '3d ago' },
                    { name: 'Team Meeting Notes.docx', type: 'word', size: '856 KB', modified: '5d ago' }
                  ].map((file, index) => (
                    <div key={index} className="drive-file-item d-flex align-items-center p-2 rounded">
                      <div className="file-icon me-3">
                        {file.type === 'excel' && <FaFileExcel className="text-success" />}
                        {file.type === 'powerpoint' && <FaFilePowerpoint className="text-danger" />}
                        {file.type === 'pdf' && <FaFilePdf className="text-danger" />}
                        {file.type === 'word' && <FaFileWord className="text-primary" />}
                      </div>
                      <div className="file-info flex-grow-1">
                        <div className="file-name">{file.name}</div>
                        <div className="file-meta text-muted small">
                          {file.size} • {file.modified}
                        </div>
                      </div>
                      <div className="file-actions">
                        <Button variant="link" size="sm" className="text-muted">
                          <FaEllipsisV />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
        )}

        {activeTab === 'dialer' && (
          <div className="dialer-page-container">
            <div className="dialer-content-wrapper d-flex">
              {/* Left side - Enrollment Application */}
              <div className="enrollment-section flex-grow-1 me-4">
                <Card>
              <Card.Header>
                    <h5 className="mb-0">Enrollment Application</h5>
              </Card.Header>
              <Card.Body>
                <Form>
                      {/* Personal Information */}
                      <div className="section mb-4">
                        <h6 className="mb-3">Personal Information</h6>
                        <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                              <Form.Control type="text" placeholder="Enter first name" />
                      </Form.Group>
          </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control type="text" placeholder="Enter last name" />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                              <Form.Label>Date of Birth</Form.Label>
                              <Form.Control type="date" />
                      </Form.Group>
          </Col>
        </Row>
                        <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                              <Form.Label>Email</Form.Label>
                              <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                              <Form.Label>Phone</Form.Label>
                          <Form.Control 
                                type="tel"
                                value={enrollmentPhone}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/[^\d]/g, '');
                                  if (value.length <= 11) {
                                    setEnrollmentPhone(value);
                                  }
                                }}
                                placeholder="Enter phone number"
                          />
                      </Form.Group>
                    </Col>
                  </Row>
                      </div>

                      {/* Address Information */}
                      <div className="section mb-4">
                        <h6 className="mb-3">Address</h6>
        <Row>
                        <Col md={12}>
                          <Form.Group className="mb-3">
                              <Form.Label>Street Address</Form.Label>
                              <Form.Control type="text" placeholder="Enter street address" />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                          <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                              <Form.Control type="text" placeholder="Enter city" />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                              <Form.Label>State</Form.Label>
                              <Form.Select>
                                <option value="">Select state</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                {/* Add other states */}
                              </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                              <Form.Label>ZIP Code</Form.Label>
                              <Form.Control type="text" placeholder="Enter ZIP code" />
                          </Form.Group>
                        </Col>
                      </Row>
                      </div>

                      {/* Coverage Information */}
                      <div className="section mb-4">
                        <h6 className="mb-3">Coverage Details</h6>
                        <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                              <Form.Label>Insurance Carrier</Form.Label>
                              <Form.Select>
                                <option value="">Select insurance carrier</option>
                                <option value="united">UnitedHealthcare</option>
                                <option value="cigna">Cigna</option>
                                <option value="ambetter">Ambetter</option>
                                <option value="oscar">Oscar</option>
                                <option value="aetna">Aetna</option>
                                <option value="anthem">Anthem Blue Cross</option>
                                <option value="kaiser">Kaiser Permanente</option>
                                <option value="humana">Humana</option>
                                <option value="molina">Molina Healthcare</option>
                              </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                              <Form.Label>Plan Type</Form.Label>
                              <Form.Select>
                                <option value="">Select plan type</option>
                                <option value="aca">ACA Health Plan</option>
                                <option value="medicare">Medicare Plan</option>
                              </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Coverage Type</Form.Label>
                              <Form.Select>
                                <option value="">Select coverage type</option>
                                <option value="aca">ACA Health</option>
                                <option value="dental">Dental</option>
                                <option value="vision">Vision</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Effective Date</Form.Label>
                              <Form.Control type="date" />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Metal Tier</Form.Label>
                              <div className="d-flex gap-3">
                                <Form.Check
                                  type="radio"
                                  name="metalTier"
                                  id="bronze"
                                  label="Bronze"
                                />
                                <Form.Check
                                  type="radio"
                                  name="metalTier"
                                  id="silver"
                                  label="Silver"
                                />
                                <Form.Check
                                  type="radio"
                                  name="metalTier"
                                  id="gold"
                                  label="Gold"
                                />
                                <Form.Check
                                  type="radio"
                                  name="metalTier"
                                  id="platinum"
                                  label="Platinum"
                                />
                                <Form.Check
                                  type="radio"
                                  name="metalTier"
                                  id="catastrophic"
                                  label="Catastrophic"
                                />
                              </div>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                              <Form.Label>Additional Notes</Form.Label>
                        <Form.Control 
                          as="textarea" 
                                rows={3}
                                placeholder="Enter any additional notes, health conditions, or special requirements"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                      </div>

                      {/* Coverage Status Section */}
                      <div className="coverage-status-section mb-4 p-3 border rounded">
                        <h6 className="mb-3">Coverage Status</h6>
                        <div className="d-flex align-items-center mb-3">
                          {hasCoverage ? (
                            <div className="coverage-indicator active">
                              <Badge bg="success" className="px-3 py-2">
                                <FaCheckCircle className="me-2" /> Active Coverage
                                  </Badge>
                              <div className="mt-2 text-success">
                                <small>Policy is active and in force</small>
                                </div>
                                </div>
                          ) : savingStatus === 'saving' ? (
                            <div className="coverage-indicator pending">
                              <Badge bg="warning" className="px-3 py-2">
                                <FaClock className="me-2" /> Enrollment Pending
                              </Badge>
                              <div className="mt-2 text-warning">
                                <small>Processing enrollment submission...</small>
                              </div>
                              </div>
                          ) : (
                            <div className="coverage-indicator inactive">
                              <Badge bg="secondary" className="px-3 py-2">
                                <FaTimes className="me-2" /> No Active Coverage
                              </Badge>
                              <div className="mt-2 text-muted">
                                <small>No current active policies</small>
                            </div>
                        </div>
                          )}
                      </div>
                        {hasCoverage && (
                          <div className="coverage-details">
                            <div className="mb-2">
                              <strong>Policy Number:</strong> {coverageType}-2024-{Math.random().toString().slice(2, 8)}
                </div>
                            <div className="mb-2">
                              <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="d-flex justify-content-between align-items-center">
                        <Button variant="outline-secondary">
                          <FaHistory className="me-2" /> View History
                        </Button>
                        <div>
                          <Button variant="secondary" className="me-2" onClick={() => handleSave('draft')}>
                            <FaSave className="me-2" /> Save
                          </Button>
                          <Button variant="primary">
                            <FaCheckCircle className="me-2" /> Submit Application
                          </Button>
                        </div>
                      </div>
                    </Form>
              </Card.Body>
            </Card>
              </div>

              {/* Right side - Dialer Pad */}
              <div className="dialer-pad-section" style={{ width: '400px' }}>
                <Card>
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaPhone className="me-2" /> Dialer Pad
                  </h5>
                    <Form.Select
                      value={agentDisposition}
                      onChange={(e) => setAgentDisposition(e.target.value)}
                        className="form-select-sm"
                        style={{ width: '120px' }}
                      >
                        <option value="active">Active</option>
                        <option value="break">On Break</option>
                        <option value="meeting">In Meeting</option>
                    </Form.Select>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="dialer-pad-container">
                      {/* Dialer Display */}
                    <Form.Control
                      type="tel"
                      value={phoneNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^\d]/g, '');
                          if (value.length <= 10) {
                            setPhoneNumber(formatPhoneNumber(value));
                          }
                        }}
                        onKeyPress={(e) => {
                          if (!/[\d]/.test(e.key) || (phoneNumber.replace(/[^\d]/g, '').length >= 10)) {
                            e.preventDefault();
                          }
                        }}
                        placeholder="(555) 555-5555"
                        className="text-center form-control-lg mb-3"
                      />
                      
                      {/* Call Status Display */}
                      {callStatus !== 'idle' && (
                        <div className="call-status-indicator text-center mb-3">
                          {callStatus === 'dialing' && (
                            <Badge bg="warning" className="px-3 py-2">
                              <FaPhone className="me-2" /> Dialing...
                            </Badge>
                          )}
                          {callStatus === 'connected' && (
                            <Badge bg="success" className="px-3 py-2">
                              <FaPhone className="me-2" /> Connected - {formatDuration(callDuration)}
                            </Badge>
                          )}
                    </div>
                      )}

                      {/* Dialer Grid */}
                    <div className="dialer-grid">
                      {[
                          '1', '2', '3',
                          '4', '5', '6',
                          '7', '8', '9',
                          '*', '0', '#'
                      ].map((key) => (
                        <Button
                            key={key}
                          variant="light"
                          className="dialer-key"
                            onClick={() => !isDialing && handleDialerInput(key)}
                            disabled={isDialing}
                          >
                            <div className="key-content">
                              <span className="key-number">{key}</span>
                              {key === '2' && <span className="key-letters">ABC</span>}
                              {key === '3' && <span className="key-letters">DEF</span>}
                              {key === '4' && <span className="key-letters">GHI</span>}
                              {key === '5' && <span className="key-letters">JKL</span>}
                              {key === '6' && <span className="key-letters">MNO</span>}
                              {key === '7' && <span className="key-letters">PQRS</span>}
                              {key === '8' && <span className="key-letters">TUV</span>}
                              {key === '9' && <span className="key-letters">WXYZ</span>}
                              {key === '0' && <span className="key-letters">+</span>}
                            </div>
                        </Button>
                      ))}
                    </div>

                      {/* Call Action Buttons */}
                      <div className="dialer-actions mt-3 d-flex justify-content-between">
                        {!isDialing ? (
                          <>
                      <Button
                        variant="danger"
                              className="action-button"
                              onClick={handleDialerClear}
                      >
                              <FaTimes />
                      </Button>
                      <Button
                        variant="success"
                              className="action-button"
                              onClick={handleCall}
                              disabled={phoneNumber.length === 0}
                      >
                        <FaPhone />
                      </Button>
                      <Button
                        variant="secondary"
                              className="action-button"
                              onClick={() => setPhoneNumber(prev => prev.slice(0, -1))}
                              disabled={phoneNumber.length === 0}
                      >
                              <FaBackspace />
                      </Button>
                          </>
                        ) : (
                          <Button 
                            variant="danger" 
                            className="action-button mx-auto"
                            onClick={handleEndCall}
                          >
                            <FaPhone className="rotate-135" />
                          </Button>
                        )}
                    </div>

                      {/* Transfer Button */}
                      {isDialing && (
                      <Button 
                        variant="info" 
                          className="w-100 mt-3 transfer-button"
                          onClick={() => {/* Handle transfer */}}
                      >
                        <FaExchangeAlt className="me-2" /> Transfer Call
                      </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
                  </div>
            </div>

            {/* Notes section below */}
            <div className="notes-section mt-4">
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Notes & Disposition History</h5>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="history-timeline" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {notes.map((note, index) => (
                      <div key={index} className="history-entry mb-3 p-3 border rounded">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <div className="d-flex align-items-center gap-2">
                              <span className="text-muted">{note.date}</span>
                              <Badge bg="info">{note.type}</Badge>
                              <Badge bg={note.disposition === 'Follow-up Required' ? 'warning' : 'secondary'}>
                                {note.disposition}
                              </Badge>
                            </div>
                            <div className="mt-1">
                              <small className="text-muted">
                                <FaUser className="me-1" /> {note.agent} • 
                                <FaClock className="ms-2 me-1" /> {note.duration}
                              </small>
                            </div>
                          </div>
                        </div>
                        <p className="mb-0">{note.notes}</p>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="dashboard-grid">
            {/* Performance Overview Card */}
            <Card className="dashboard-card mb-4">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaChartBar className="me-2" /> Performance Overview
                  </h5>
                  <div className="d-flex gap-2">
                    <Form.Select size="sm" className="w-auto">
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="quarter">This Quarter</option>
                      <option value="year">This Year</option>
                    </Form.Select>
                    <Button variant="outline-primary" size="sm">
                      <FaDownload className="me-1" /> Export
                    </Button>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <Row className="g-4">
                  <Col md={3}>
                    <div className="stat-card bg-primary bg-opacity-10 p-3 rounded">
                      <h6 className="text-primary">Total Calls</h6>
                      <h3>124</h3>
                      <div className="d-flex align-items-center">
                        <small className="text-success me-2">+12% this week</small>
                        <small className="text-muted">vs last week</small>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="stat-card bg-success bg-opacity-10 p-3 rounded">
                      <h6 className="text-success">Total Conversions</h6>
                      <h3>84</h3>
                      <div className="d-flex align-items-center">
                        <small className="text-success me-2">+8% this week</small>
                        <small className="text-muted">vs last week</small>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="stat-card bg-info bg-opacity-10 p-3 rounded">
                      <h6 className="text-info">Conversion Rate</h6>
                      <h3>68%</h3>
                      <div className="d-flex align-items-center">
                        <small className="text-success me-2">+5% this week</small>
                        <small className="text-muted">vs last week</small>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="stat-card bg-warning bg-opacity-10 p-3 rounded">
                      <h6 className="text-warning">Avg Call Duration</h6>
                      <h3>8:30</h3>
                      <div className="d-flex align-items-center">
                        <small className="text-danger me-2">-2% this week</small>
                        <small className="text-muted">vs last week</small>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col md={6}>
                    <div className="performance-detail-card p-3 border rounded">
                      <h6 className="mb-3">Conversion Breakdown</h6>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Premium Package</span>
                        <span className="text-success">45 conversions</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Standard Package</span>
                        <span className="text-success">28 conversions</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Basic Package</span>
                        <span className="text-success">11 conversions</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="performance-detail-card p-3 border rounded">
                      <h6 className="mb-3">Call Duration Distribution</h6>
                      <div className="d-flex justify-content-between mb-2">
                        <span>0-5 minutes</span>
                        <span className="text-info">32%</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>5-15 minutes</span>
                        <span className="text-info">45%</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>15+ minutes</span>
                        <span className="text-info">23%</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Call History Card */}
            <Card className="dashboard-card mb-4">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaHistory className="me-2" /> Call History
                  </h5>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="search"
                      placeholder="Search calls..."
                      className="form-control-sm"
                      style={{ width: '200px' }}
                    />
                    <Button variant="outline-primary" size="sm">
                      <FaDownload className="me-1" /> Export
                    </Button>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Date/Time</th>
                      <th>Phone Number</th>
                      <th>Duration</th>
                      <th>Disposition</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2024-03-15 14:30</td>
                      <td>(555) 123-4567</td>
                      <td>8:45</td>
                      <td><Badge bg="success">Sale</Badge></td>
                      <td>Customer purchased premium package</td>
                    </tr>
                    <tr>
                      <td>2024-03-15 13:15</td>
                      <td>(555) 987-6543</td>
                      <td>12:30</td>
                      <td><Badge bg="warning">Follow-up</Badge></td>
                      <td>Customer requested additional information</td>
                    </tr>
                    <tr>
                      <td>2024-03-15 11:45</td>
                      <td>(555) 456-7890</td>
                      <td>5:15</td>
                      <td><Badge bg="secondary">No Answer</Badge></td>
                      <td>Left voicemail</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Support & Help Card */}
            <Card className="dashboard-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaUserShield className="me-2" /> Support & Help
                  </h5>
                  <Button variant="outline-primary" size="sm">
                    <FaPlus className="me-1" /> New Ticket
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="help-desk-container">
                  <div className="search-section mb-4">
                    <Form.Control
                      type="search"
                      placeholder="Search for help articles or technical issues..."
                      className="form-control-lg"
                    />
                  </div>

                  <div className="support-grid">
                    <div className="support-section">
                      <h6 className="mb-3">Quick Support Chat</h6>
                      <div className="d-grid gap-2">
                        <div className="region-card p-3 border rounded mb-3">
                          <h6 className="mb-2">IT Support</h6>
                          <p className="text-muted small mb-2">Technical issues, system access, equipment requests</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <Badge bg="success" className="rounded-pill">Online</Badge>
                            <Button variant="outline-primary" size="sm">
                              <FaComments className="me-1" /> Start Chat
                            </Button>
                          </div>
                        </div>
                        <div className="region-card p-3 border rounded mb-3">
                          <h6 className="mb-2">Manager Support</h6>
                          <p className="text-muted small mb-2">Schedule changes, training requests, policy questions</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <Badge bg="success" className="rounded-pill">Online</Badge>
                            <Button variant="outline-primary" size="sm">
                              <FaComments className="me-1" /> Start Chat
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="support-section">
                      <h6 className="mb-3">Request Status</h6>
                      <div className="list-group list-group-flush">
                        <div className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-bold">Schedule Change Request</span>
                            <Badge bg="warning" className="rounded-pill">Pending Review</Badge>
                          </div>
                          <p className="text-muted small mb-2">Requested shift change for next week</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">Submitted 2h ago</small>
                            <small className="text-info">Updates sent to your email</small>
                          </div>
                        </div>
                        <div className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-bold">Training Approval</span>
                            <Badge bg="success" className="rounded-pill">Approved</Badge>
                          </div>
                          <p className="text-muted small mb-2">Advanced sales techniques workshop</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">Updated 1d ago</small>
                            <small className="text-success">Approval sent to your email</small>
                          </div>
                        </div>
                        <div className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-bold">Equipment Request</span>
                            <Badge bg="info" className="rounded-pill">In Review</Badge>
                          </div>
                          <p className="text-muted small mb-2">New headset replacement</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">Submitted 2d ago</small>
                            <small className="text-info">Updates sent to your email</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="dashboard-grid">
            {/* General Settings Card */}
            <Card className="dashboard-card mb-4">
              <Card.Header>
                <h5 className="mb-0">
                  <FaCog className="me-2" /> General Settings
                </h5>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Language</Form.Label>
                    <Form.Select defaultValue="en">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Time Zone</Form.Label>
                    <Form.Select defaultValue="utc">
                      <option value="utc">UTC</option>
                      <option value="est">Eastern Time</option>
                      <option value="pst">Pacific Time</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check 
                      type="switch"
                      id="darkMode"
                      label="Dark Mode"
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>

            {/* Profile Settings Card */}
            <Card className="dashboard-card mb-4">
              <Card.Header>
                <h5 className="mb-0">
                  <FaUser className="me-2" /> Profile Settings
                </h5>
              </Card.Header>
              <Card.Body>
                <Form>
                  <div className="text-center mb-4">
                    <div className="profile-picture-container position-relative d-inline-block">
                      {profilePicture ? (
                        <img 
                          src={profilePicture} 
                          alt="Profile" 
                          className="rounded-circle profile-picture"
                        />
                      ) : (
                        <FaUserCircle size={120} className="text-muted" />
                      )}
                      <label className="profile-picture-upload">
                        <FaCamera className="upload-icon" />
                    <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setProfilePicture(reader.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="d-none"
                        />
                      </label>
                  </div>
                  </div>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone number" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control type="text" value="Sales Agent" readOnly />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Control type="text" value="Sales" readOnly />
                  </Form.Group>

                  <h6 className="mt-4 mb-3">Security Settings</h6>
                  <Form.Group className="mb-3">
                    <Form.Check 
                      type="switch"
                      id="twoFactorAuth"
                      label="Two-Factor Authentication"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check 
                      type="switch"
                      id="loginNotifications"
                      label="Login Notifications"
                    />
                  </Form.Group>

                  <Button variant="primary" className="mt-3">
                    Save Changes
                      </Button>
                </Form>
              </Card.Body>
            </Card>

            {/* Licensing & Contracting Card */}
            <Card className="dashboard-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaShieldAlt className="me-2" /> Licensing & Contracting
                  </h5>
                  <Button variant="outline-primary" size="sm">
                    <FaPlus className="me-1" /> New Contract
                  </Button>
                  </div>
              </Card.Header>
              <Card.Body>
                <div className="licensing-section">
                  <div className="current-license-status mb-4">
                    <h6 className="mb-3">General Lines License Status</h6>
                    <div className="license-card p-3 border rounded">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h6 className="mb-1">General Lines License</h6>
                          <Badge bg="success" className="rounded-pill">Active</Badge>
                        </div>
                        <div className="text-end">
                          <small className="text-muted">Expires: Dec 31, 2024</small>
                          <div className="mt-1">
                            <Button variant="outline-primary" size="sm">
                              <FaDownload className="me-1" /> Download
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="license-details">
                        <div className="row">
                          <div className="col-md-6">
                            <p className="mb-1"><strong>License Number:</strong> GL-2024-12345</p>
                            <p className="mb-1"><strong>Issue Date:</strong> Jan 1, 2024</p>
                            <p className="mb-1"><strong>State:</strong> California</p>
                          </div>
                          <div className="col-md-6">
                            <p className="mb-1"><strong>Type:</strong> General Lines</p>
                            <p className="mb-1"><strong>Status:</strong> Active</p>
                            <p className="mb-1"><strong>Agency:</strong> Aligned</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="contract-status mb-4">
                    <h6 className="mb-3">Carrier Contract Status</h6>
                    <div className="contract-card p-3 border rounded">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h6 className="mb-1">Insurance Carrier Contracts</h6>
                          <Badge bg="success" className="rounded-pill">Active</Badge>
                        </div>
                        <div className="text-end">
                          <small className="text-muted">Last Updated: Mar 15, 2024</small>
                          <div className="mt-1">
                            <Button variant="outline-primary" size="sm">
                              <FaFileAlt className="me-1" /> View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="contract-details">
                        <div className="row">
                          <div className="col-md-6">
                            <p className="mb-1"><strong>Primary State:</strong> California</p>
                            <p className="mb-1"><strong>Carriers:</strong> 8 Active</p>
                            <p className="mb-1"><strong>Types:</strong> Health, Life, P&C</p>
                          </div>
                          <div className="col-md-6">
                            <p className="mb-1"><strong>Status:</strong> Active</p>
                            <p className="mb-1"><strong>Review Date:</strong> Dec 31, 2024</p>
                            <p className="mb-1"><strong>Appointments:</strong> 12</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="compliance-section">
                    <h6 className="mb-3">Compliance & Certifications</h6>
                    <div className="compliance-list">
                      <div className="compliance-item p-2 border rounded mb-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-0 small">HIPAA Compliance</h6>
                            <small className="text-muted">Last completed: Mar 1, 2024</small>
                          </div>
                          <Badge bg="success" className="rounded-pill">Certified</Badge>
                        </div>
                      </div>
                      <div className="compliance-item p-2 border rounded mb-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-0 small">Insurance Ethics</h6>
                            <small className="text-muted">Last completed: Feb 15, 2024</small>
                          </div>
                          <Badge bg="success" className="rounded-pill">Certified</Badge>
                        </div>
                      </div>
                      <div className="compliance-item p-2 border rounded">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-0 small">Data Privacy</h6>
                            <small className="text-muted">Last completed: Jan 30, 2024</small>
                          </div>
                          <Badge bg="success" className="rounded-pill">Certified</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="admin-actions mt-3">
                    <h6 className="mb-2">Administrative Actions</h6>
                    <div className="d-flex gap-2">
                      <Button variant="outline-primary" size="sm">
                        <FaFileAlt className="me-1" /> Request License Update
                      </Button>
                      <Button variant="outline-primary" size="sm">
                        <FaUserShield className="me-1" /> Contact Licensing Admin
                      </Button>
                      <Button variant="outline-primary" size="sm">
                        <FaHistory className="me-1" /> View History
                      </Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        )}
        {activeTab === 'chat' && (
          <div className="dashboard-card">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <FaComments className="me-2" /> Chat
                </h5>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <Chat />
            </Card.Body>
          </div>
        )}
      </Container>

      {/* Client Profile Modal */}
      <Modal 
        show={showClientProfile} 
        onHide={() => setShowClientProfile(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-flex align-items-center">
              <div className="client-avatar me-3">
                <FaUser size={24} />
              </div>
              {selectedClient?.name}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedClient && (
            <div className="client-profile">
              <Row>
                <Col md={8}>
                  <Card className="mb-3">
                    <Card.Header>
                      <h6 className="mb-0">Basic Information</h6>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <p className="mb-1">
                            <strong>Company:</strong> {selectedClient.company}
                          </p>
                          <p className="mb-1">
                            <strong>Position:</strong> {selectedClient.position}
                          </p>
                          <p className="mb-1">
                            <strong>Industry:</strong> {selectedClient.industry}
                          </p>
                        </Col>
                        <Col md={6}>
                          <p className="mb-1">
                            <strong>Email:</strong> {selectedClient.email}
                          </p>
                          <p className="mb-1">
                            <strong>Phone:</strong> {selectedClient.phone}
                          </p>
                          <p className="mb-1">
                            <strong>Location:</strong> {selectedClient.location}
                          </p>
                        </Col>
                      </Row>
                      <div className="mt-3">
                        <p className="mb-1"><strong>Address:</strong></p>
                        <p>{selectedClient.address}</p>
                      </div>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3">
                    <Card.Header>
                      <h6 className="mb-0">Interaction History</h6>
                    </Card.Header>
                    <Card.Body>
                      <div className="timeline">
                        {selectedClient.history.map((event, index) => (
                          <div key={index} className="timeline-item">
                            <div className="timeline-icon">
                              {event.type === 'call' ? <FaPhone /> : 
                               event.type === 'email' ? <FaEnvelope /> : 
                               <FaVideo />}
                            </div>
                            <div className="timeline-content">
                              <h6>{event.title}</h6>
                              <p className="text-muted small">{event.date}</p>
                              <p>{event.description}</p>
                              {event.duration && (
                                <Badge bg="info" className="me-2">
                                  Duration: {event.duration}
                                </Badge>
                              )}
                              {event.outcome && (
                                <Badge bg="success">
                                  Outcome: {event.outcome}
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="mb-3">
                    <Card.Header>
                      <h6 className="mb-0">Quick Actions</h6>
                    </Card.Header>
                    <Card.Body>
                      <div className="d-grid gap-2">
                        <Button variant="primary" onClick={() => setPhoneNumber(selectedClient.phone)}>
                          <FaPhone className="me-2" /> Call
                    </Button>
                        <Button variant="info" onClick={() => handleSendEmail(selectedClient.email)}>
                          <FaEnvelope className="me-2" /> Email
                        </Button>
                        <Button variant="success" onClick={() => handleStartMeeting(selectedClient)}>
                          <FaVideo className="me-2" /> Schedule Meeting
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3">
                    <Card.Header>
                      <h6 className="mb-0">Notes</h6>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Form.Group>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            value={selectedClient.notes}
                            onChange={(e) => setClientNotes(e.target.value)}
                            placeholder="Add notes about this client..."
                          />
                        </Form.Group>
                        <Button variant="primary" size="sm" className="mt-2">
                          Save Notes
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Header>
                      <h6 className="mb-0">Tags</h6>
                    </Card.Header>
                    <Card.Body>
                      <div className="d-flex flex-wrap gap-2">
                        {selectedClient.tags.map((tag, index) => (
                          <Badge 
                            key={index} 
                            bg="light" 
                            text="dark"
                          >
                            {tag}
                          </Badge>
                        ))}
                        <Button variant="outline-primary" size="sm">
                          <FaPlus /> Add Tag
                    </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowClientProfile(false)}>
            Close
          </Button>
          <Button variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
} 