import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLDivElement>(null);

  
    const toggleSidebar = (event: React.MouseEvent) => {
        event.stopPropagation(); 
        setSidebarOpen(!sidebarOpen); 
    };

    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
           
            if (
                sidebarRef.current && !sidebarRef.current.contains(event.target as Node) &&
                hamburgerRef.current && !hamburgerRef.current.contains(event.target as Node)
            ) {
                setSidebarOpen(false);
            }
        };


        if (sidebarOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
          
            document.removeEventListener('click', handleClickOutside);
        };
    }, [sidebarOpen]);

    return (
        <nav>
            <div className="logo">Mullacs Games</div>
            <div ref={hamburgerRef} className="hamburger" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div ref={sidebarRef} className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/hangman">Hangman</Link></li>
                    <li><Link to="/another-game">Another Game</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
