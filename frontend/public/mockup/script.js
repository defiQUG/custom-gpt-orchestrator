// Panel toggle functionality
function togglePanel(panelType) {
    const panel = document.getElementById(`${panelType}Panel`);
    if (panel) {
        panel.classList.toggle('collapsed');
        // Update button icon
        const button = document.querySelector(`[onclick="togglePanel('${panelType}')"]`);
        const icon = button.querySelector('i');
        if (panelType === 'right') {
            icon.classList.toggle('fa-chevron-right');
            icon.classList.toggle('fa-chevron-left');
        } else if (panelType === 'left') {
            icon.classList.toggle('fa-chevron-left');
            icon.classList.toggle('fa-chevron-right');
        } else if (panelType === 'bottom') {
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        }
    }
}

// Settings modal functionality
function toggleSettings() {
    const modal = document.getElementById('settingsModal');
    const backdrop = document.getElementById('modalBackdrop');
    modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
    backdrop.style.display = backdrop.style.display === 'none' ? 'block' : 'none';
}

// Workspace bisection
document.addEventListener('DOMContentLoaded', function() {
    const workspace = document.getElementById('workspace');
    
    // Create bisected layout
    const topHalf = document.createElement('div');
    topHalf.className = 'workspace-top';
    
    const bottomHalf = document.createElement('div');
    bottomHalf.className = 'workspace-bottom';
    
    // Create vertical bisection in top half
    const topLeft = document.createElement('div');
    topLeft.className = 'workspace-top-left';
    
    const topRight = document.createElement('div');
    topRight.className = 'workspace-top-right';
    
    topHalf.appendChild(topLeft);
    topHalf.appendChild(topRight);
    
    workspace.appendChild(topHalf);
    workspace.appendChild(bottomHalf);
});

// Drag and drop functionality
document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.innerHTML);
    });
});

const workspace = document.getElementById('workspace');
workspace.addEventListener('dragover', (e) => {
    e.preventDefault();
});

workspace.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const item = document.createElement('div');
    item.className = 'workspace-item';
    item.innerHTML = data;
    
    // Position the item where it was dropped
    const rect = workspace.getBoundingClientRect();
    item.style.left = (e.clientX - rect.left) + 'px';
    item.style.top = (e.clientY - rect.top) + 'px';
    
    // Make the item draggable within the workspace
    item.draggable = true;
    item.addEventListener('dragstart', (e) => {
        const rect = e.target.getBoundingClientRect();
        e.dataTransfer.setData('text/plain', e.target.innerHTML);
    });
    
    workspace.appendChild(item);
});
