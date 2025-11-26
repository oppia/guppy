/**
 * Add copy buttons to all code blocks on the page
 */
window.addEventListener('DOMContentLoaded', function() {
    // Clipboard style icons
    var copyIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>';
    var checkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><polyline points="10 13 12 15 16 9"></polyline></svg>';
    
    // Add copy buttons to all pre/code blocks
    document.querySelectorAll('pre').forEach(function(pre) {
        // Skip if button already exists
        if (pre.querySelector('.copy-code-btn')) return;
        
        // Create copy button
        var btn = document.createElement('button');
        btn.className = 'copy-code-btn';
        btn.innerHTML = copyIcon;
        btn.setAttribute('aria-label', 'Copy code to clipboard');
        btn.setAttribute('title', 'Copy code');
        
        btn.onclick = function(e) {
            e.preventDefault();
            var code = pre.querySelector('code') ? pre.querySelector('code').textContent : pre.textContent;
            code = code.trim();
            
            navigator.clipboard.writeText(code).then(function() {
                btn.innerHTML = checkIcon;
                btn.classList.add('copied');
                btn.setAttribute('title', 'Copied!');
                setTimeout(function() {
                    btn.innerHTML = copyIcon;
                    btn.classList.remove('copied');
                    btn.setAttribute('title', 'Copy code');
                }, 2000);
            }).catch(function(err) {
                console.error('Failed to copy: ', err);
                // Fallback for older browsers
                var textArea = document.createElement('textarea');
                textArea.value = code;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    btn.innerHTML = checkIcon;
                    btn.classList.add('copied');
                    btn.setAttribute('title', 'Copied!');
                    setTimeout(function() {
                        btn.innerHTML = copyIcon;
                        btn.classList.remove('copied');
                        btn.setAttribute('title', 'Copy code');
                    }, 2000);
                } catch (err) {
                    console.error('Copy command failed');
                }
                document.body.removeChild(textArea);
            });
        };
        
        pre.appendChild(btn);
    });
});
