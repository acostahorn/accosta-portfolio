import React from 'react';
import ProjectCard from './ProjectCard';

export default function Apps() {
    const myProjects = [
        {
            title: "Subnet Quiz App",
            description: "A simple Qt C++ quiz application that trains infrastructure students and engineers to calculate subnet information on the spot",
            tags: ["C++", "Qt Framework", "Object-Oriented Design"],
            sourceUrl: "https://github.com/acostahorn/SubnetQuiz",
            downloadUrls: [
                { os: "Linux (AppImage)", link: "https://github.com/acostahorn/SubnetQuiz/releases/download/Linux/SubnetQuiz-x86_64.AppImage" },
                { os: "Windows", link: "https://github.com/acostahorn/SubnetQuiz/releases/download/SubnetQuiz/SubnetQuiz_Setup.exe" }
            ],
            isWebApp: false
        },

        {
            title: "Network e-shop Demo Web App",
            description: "Demo Website for a Network Infrastructure e-shop; includes a design page for the user to experiment with and a webchat with an AI chatbot.",
            tags: ["Javascript", "node.js", "MongoDB", "AI chatbot"],
            sourceUrl: "https://github.com/acostahorn/network-inventory-manager",
            deployUrls: [
                { serverName: "Vercel", link: "https://aaavnetwork.vercel.app/" },
                { serverName: "Azure", link: "https://aaanetwork.azurewebsites.net/" },
            ],
            isWebApp: true
        },
        {
            title: "Historical AI Debate Web App",
            description: "This app allows a user to have a conversation with a historical character from the past. It is also possible to pick two characters and have them debate a given topic",

            tags: ["Python", "Flask", "OpenClaw", "AI chatbot"],
            sourceUrl: "https://github.com/acostahorn/historic-app",
            deployUrls: [
                { serverName: "pythonanywhere", link: "https://albertocosta.pythonanywhere.com/" }
            ],
            isWebApp: true
        },
        {
            title: "Subnet Calculator",
            description: "A simple Qt C++ widget app that calculates subnet characteristics given an IP address and CIDR number",
            tags: ["C++", "Qt Framework", "Object-Oriented Design"],
            sourceUrl: "https://github.com/acostahorn/subnet-calculator",
            downloadUrls: [
                { os: "Linux (AppImage)", link: "https://github.com/acostahorn/subnet-calculator/releases/download/v1.1.0/Subnet_Calculator-1.1.0-x86_64.AppImage" },
                { os: "Windows", link: "https://github.com/acostahorn/subnet-calculator/releases/download/SubnetCalculator/SubnetCalc_Setup_x64.exe" }
            ],
            isWebApp: false
        }
    ];


    return (
        <>
            <h1 className="page-title">Apps</h1>
            <div className="portfolio-grid">

                {/* Left Column: Web Apps */}
                <div className="grid-column">
                    <h2 className="section-title">Web Applications</h2>
                    <div className="column-content">
                        {myProjects.filter(p => p.isWebApp).map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))}
                    </div>
                </div>

                {/* Right Column: Desktop Apps and Tools */}
                <div className="grid-column">
                    <h2 className="section-title">Desktop Apps and Tools</h2>
                    <div className="column-content">
                        {myProjects.filter(p => !p.isWebApp).map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))}
                    </div>
                </div>

            </div>

        </>
    )
}