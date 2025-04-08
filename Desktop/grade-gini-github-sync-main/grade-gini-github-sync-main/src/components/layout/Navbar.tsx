import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import DesktopNav from './navbar/DesktopNav';
import MobileNav from './navbar/MobileNav';
import Logo from './navbar/Logo';
import UserNav from './navbar/UserNav';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white shadow-sm border-b border-gray-100 navbar-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>
          
          <DesktopNav />
          
          <div className="flex items-center">
            {user ? (
              <UserNav user={user} onSignOut={handleSignOut} />
            ) : (
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-[#8404fc] hover:bg-[#6400c0] text-white rounded-full"
                size="sm"
              >
                Get Started
              </Button>
            )}
            
            <div className="md:hidden ml-4">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-mastery-purple focus:outline-none"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
