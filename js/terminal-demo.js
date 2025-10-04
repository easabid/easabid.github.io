// Interactive Terminal Demo
document.addEventListener('DOMContentLoaded', function() {
    // Create terminal demo
    createTerminalDemo();
    
    function createTerminalDemo() {
        // Find the about section where we'll insert the terminal
        const aboutSection = document.querySelector('#about .container');
        
        if (!aboutSection) return;
        
        // Create terminal demo container
        const terminalDemoContainer = document.createElement('div');
        terminalDemoContainer.className = 'terminal-demo-container';
        
        // Create terminal header
        const terminalHeader = document.createElement('div');
        terminalHeader.className = 'terminal-demo-header';
        
        // Create terminal title
        const terminalTitle = document.createElement('div');
        terminalTitle.className = 'terminal-demo-title';
        terminalTitle.innerHTML = '<i class="fas fa-terminal"></i> sabid@kali:~';
        
        // Create terminal window controls
        const terminalControls = document.createElement('div');
        terminalControls.className = 'terminal-window-controls';
        
        // Add control buttons
        ['close', 'minimize', 'expand'].forEach(control => {
            const button = document.createElement('div');
            button.className = `terminal-control ${control}`;
            terminalControls.appendChild(button);
        });
        
        // Add title and controls to header
        terminalHeader.appendChild(terminalTitle);
        terminalHeader.appendChild(terminalControls);
        
        // Create terminal content area
        const terminalContent = document.createElement('div');
        terminalContent.className = 'terminal-demo-content';
        
        // Add terminal glitch effect layer
        const glitchEffect = document.createElement('div');
        glitchEffect.className = 'terminal-glitch';
        terminalContent.appendChild(glitchEffect);
        
        // Create initial terminal output
        const welcomeText = document.createElement('div');
        welcomeText.className = 'terminal-output';
        welcomeText.innerHTML = `Welcome to Kali Linux Terminal v1.0.0
Type <span style="color: var(--primary-color);">help</span> to view available commands`;
        terminalContent.appendChild(welcomeText);
        
        // Create input line
        const inputLine = document.createElement('div');
        inputLine.className = 'terminal-input-line';
        
        const prompt = document.createElement('span');
        prompt.className = 'terminal-prompt';
        prompt.textContent = '$ ';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'terminal-input';
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('spellcheck', 'false');
        input.setAttribute('autofocus', 'true');
        
        inputLine.appendChild(prompt);
        inputLine.appendChild(input);
        
        terminalContent.appendChild(inputLine);
        
        // Assemble terminal
        terminalDemoContainer.appendChild(terminalHeader);
        terminalDemoContainer.appendChild(terminalContent);
        
        // Insert terminal after the first paragraph in the about section
        const firstParagraph = aboutSection.querySelector('p');
        if (firstParagraph) {
            firstParagraph.parentNode.insertBefore(terminalDemoContainer, firstParagraph.nextSibling);
        } else {
            aboutSection.appendChild(terminalDemoContainer);
        }
        
        // Focus input when clicking anywhere in the terminal
        terminalContent.addEventListener('click', function() {
            input.focus();
        });
        
        // Suggestions container
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'terminal-suggestions';
        terminalContent.appendChild(suggestionsContainer);
        
        // Available commands
        const commands = {
            'help': 'Display available commands',
            'about': 'Display information about me',
            'skills': 'List my technical skills',
            'contact': 'Show contact information',
            'projects': 'List my projects',
            'certs': 'Show my certifications',
            'clear': 'Clear the terminal',
            'whoami': 'Display current user',
            'ping': 'Test connectivity',
            'nmap': 'Simulate a network scan',
            'ls': 'List directory contents',
            'cat': 'View file contents',
            'sudo': 'Run a command with elevated privileges',
            'hack': 'Initiate a simulated hack sequence'
        };
        
        // Handle input
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim().toLowerCase();
                
                // Create output for the command
                const commandOutput = document.createElement('div');
                commandOutput.className = 'terminal-output';
                commandOutput.innerHTML = `<span class="terminal-prompt">$</span> ${this.value}`;
                
                // Insert the command output before the input line
                terminalContent.insertBefore(commandOutput, inputLine);
                
                // Process command
                processCommand(command, terminalContent, inputLine);
                
                // Clear input
                this.value = '';
                
                // Hide suggestions
                suggestionsContainer.classList.remove('show');
                
                // Scroll to bottom
                terminalContent.scrollTop = terminalContent.scrollHeight;
            }
        });
        
        // Show command suggestions on input
        input.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            
            if (query.length > 0) {
                const matches = Object.keys(commands).filter(cmd => cmd.startsWith(query));
                
                if (matches.length > 0) {
                    suggestionsContainer.innerHTML = '';
                    matches.forEach(match => {
                        const suggestion = document.createElement('div');
                        suggestion.className = 'suggestion';
                        suggestion.innerHTML = `<span class="suggestion-command">${match}</span><span class="suggestion-description">${commands[match]}</span>`;
                        
                        suggestion.addEventListener('click', function() {
                            input.value = match;
                            input.focus();
                            suggestionsContainer.classList.remove('show');
                        });
                        
                        suggestionsContainer.appendChild(suggestion);
                    });
                    suggestionsContainer.classList.add('show');
                } else {
                    suggestionsContainer.classList.remove('show');
                }
            } else {
                suggestionsContainer.classList.remove('show');
            }
        });
        
        // Hide suggestions when clicking elsewhere
        document.addEventListener('click', function(e) {
            if (!suggestionsContainer.contains(e.target) && e.target !== input) {
                suggestionsContainer.classList.remove('show');
            }
        });
        
        // Process terminal commands
        function processCommand(cmd, terminal, inputLine) {
            const response = document.createElement('div');
            response.className = 'terminal-output';
            
            // Split command and arguments
            const parts = cmd.split(' ');
            const mainCommand = parts[0];
            const args = parts.slice(1);
            
            switch (mainCommand) {
                case 'help':
                    let helpText = 'Available commands:\n\n';
                    Object.keys(commands).forEach(cmd => {
                        helpText += `<span style="color: var(--primary-color);">${cmd}</span> - ${commands[cmd]}\n`;
                    });
                    response.innerHTML = helpText;
                    break;
                    
                case 'about':
                    response.innerHTML = `Name: Md Ekramul Anjum Sabid
Role: Cybersecurity Professional
Location: Dhaka, Bangladesh
Specialty: Network Security, Penetration Testing
Interests: Ethical Hacking, Security Research, Continuous Learning

I am passionate about cybersecurity and dedicated to enhancing digital security through ethical practices and innovative solutions.`;
                    break;
                    
                case 'skills':
                    response.innerHTML = `Technical Skills:
• Networking (TCP/IP, DNS, Firewalls)
• Security Tools (Wireshark, Nmap, Burp Suite, Metasploit)
• Programming (C++, JAVA, C#, JS)
• Database (MySQL, MSSQL)
• Operating Systems (Linux (Kali), Windows)
• Cryptography (Encryption, Hashing, Digital Signatures)
• Cloud Security (AWS, Azure, Security Controls)
• Web Application Security (OWASP, XSS, CSRF, WAF)`;
                    break;
                    
                case 'contact':
                    response.innerHTML = `Email: sabid.peh@gmail.com
LinkedIn: linkedin.com/in/md-ekramul-anjum-sabid
GitHub: github.com/sabidpeh
Location: Dhaka, Bangladesh`;
                    break;
                    
                case 'projects':
                    response.innerHTML = `Projects:
1. Home Lab Network - Created a secure home lab for testing and learning
2. Web Vulnerability Scanner - Developed custom scanning tools
3. Security Monitoring Setup - Implemented SIEM solutions
4. Network Security Analysis - Conducted thorough network testing
5. Malware Analysis (Beginner) - Analyzed suspicious files in VM environments
6. Cloud Security Basics - Set up AWS lab environments`;
                    break;
                    
                case 'certs':
                    response.innerHTML = `Certifications:
• Google Cybersecurity Certificate
• IBM Cybersecurity Analyst
• CompTIA Security+ (SY0-701)
• Fortinet NSE 1: Network Security Associate
• Microsoft Cybersecurity Fundamentals
• AWS Cloud Security Essentials
• Introduction to Ethical Hacking
• Splunk Security Fundamentals
• TryHackMe Labs
• Cisco Introduction to Cybersecurity`;
                    break;
                    
                case 'clear':
                    // Remove all outputs except the input line
                    while (terminal.firstChild) {
                        if (terminal.firstChild !== inputLine && terminal.firstChild !== glitchEffect) {
                            terminal.removeChild(terminal.firstChild);
                        } else {
                            break;
                        }
                    }
                    return; // Skip adding a new response
                    
                case 'whoami':
                    response.innerHTML = `guest@kali: You are a guest user exploring this portfolio`;
                    break;
                    
                case 'ping':
                    response.innerHTML = `Pinging target...
Reply from kali: time=1ms
Reply from kali: time=1ms
Reply from kali: time=2ms
Reply from kali: time=1ms

Ping statistics:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)`;
                    break;
                    
                case 'nmap':
                    response.innerHTML = `Starting Nmap scan...
Scanning target.local (192.168.1.100)
Discovered open port 80/tcp on 192.168.1.100
Discovered open port 443/tcp on 192.168.1.100
Discovered open port 22/tcp on 192.168.1.100

PORT    STATE    SERVICE    VERSION
22/tcp  open     ssh        OpenSSH 8.9
80/tcp  open     http       nginx 1.23.1
443/tcp open     https      nginx 1.23.1

Nmap done: 1 IP address (1 host up) scanned in 1.24 seconds`;
                    break;
                    
                case 'ls':
                    response.innerHTML = `about.txt
projects.md
skills.json
resume.pdf
contact.txt
certificates/
images/`;
                    break;
                    
                case 'cat':
                    if (args.length === 0) {
                        response.innerHTML = `Usage: cat <filename>`;
                    } else {
                        const file = args[0];
                        switch(file) {
                            case 'about.txt':
                                response.innerHTML = `Cybersecurity professional with a passion for ethical hacking and network security. Focused on continuous learning and staying updated with the latest security trends.`;
                                break;
                            case 'resume.pdf':
                                response.innerHTML = `Error: Binary file not displayed in terminal. Use 'download resume' command instead.`;
                                break;
                            default:
                                response.innerHTML = `cat: ${file}: No such file or directory`;
                        }
                    }
                    break;
                    
                case 'sudo':
                    response.innerHTML = `[sudo] password for visitor: 
Permission denied: Nice try! Sudo access is restricted in this demo.`;
                    break;
                    
                case 'hack':
                    // Create a simulated "hack" animation sequence
                    response.innerHTML = `Initiating simulated hack sequence...`;
                    terminal.insertBefore(response, inputLine);
                    
                    // Hide input line during animation
                    inputLine.style.display = 'none';
                    
                    // Define animation frames with delays
                    const hackSequence = [
                        { text: `Scanning target systems...`, delay: 800 },
                        { text: `Identifying vulnerabilities...`, delay: 1000 },
                        { text: `Found 3 potential entry points...`, delay: 1200 },
                        { text: `Attempting exploit #1...`, delay: 1500 },
                        { text: `Access denied. Trying alternate approach...`, delay: 1000 },
                        { text: `Attempting exploit #2...`, delay: 1500 },
                        { text: `Gaining access to perimeter systems...`, delay: 1200 },
                        { text: `Bypassing firewall...`, delay: 1500 },
                        { text: `Elevating privileges...`, delay: 1300 },
                        { text: `Success! Access granted to target system.`, delay: 1000 },
                        { text: `Simulation complete: This demonstrates how cybersecurity professionals identify and test for vulnerabilities to secure systems.`, delay: 0 }
                    ];
                    
                    // Run the animation sequence
                    let frameIndex = 0;
                    function showNextFrame() {
                        if (frameIndex < hackSequence.length) {
                            const frame = hackSequence[frameIndex];
                            const frameOutput = document.createElement('div');
                            frameOutput.className = 'terminal-output';
                            frameOutput.textContent = frame.text;
                            terminal.insertBefore(frameOutput, inputLine);
                            terminalContent.scrollTop = terminalContent.scrollHeight;
                            
                            frameIndex++;
                            if (frameIndex < hackSequence.length) {
                                setTimeout(showNextFrame, frame.delay);
                            } else {
                                // Show input line again after sequence completes
                                setTimeout(() => {
                                    inputLine.style.display = 'flex';
                                    terminalContent.scrollTop = terminalContent.scrollHeight;
                                }, 1000);
                            }
                        }
                    }
                    
                    // Start animation
                    setTimeout(showNextFrame, 500);
                    return; // Skip adding a new response since we're handling it specially
                    
                case 'download':
                    if (args[0] === 'resume') {
                        response.innerHTML = `Starting download: resume.pdf...
Download complete! (Note: This is a simulation - use the actual Download Resume button to get the PDF)`;
                    } else {
                        response.innerHTML = `Unknown file: ${args[0] || '(none specified)'}.
Usage: download resume`;
                    }
                    break;
                    
                default:
                    if (cmd === '') {
                        response.innerHTML = '';
                    } else {
                        response.innerHTML = `command not found: ${cmd}\nType <span style="color: var(--primary-color);">help</span> to see available commands`;
                    }
            }
            
            // Add the response to the terminal
            if (response.innerHTML !== '') {
                terminal.insertBefore(response, inputLine);
            }
        }
    }
});