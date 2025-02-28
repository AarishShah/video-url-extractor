async function extractVideo() {
    const urlInput = document.getElementById('urlInput');
    const loader = document.getElementById('loader');
    const result = document.getElementById('result');
    const error = document.getElementById('error');
    const sourceUrl = document.getElementById('sourceUrl');
    const extractBtn = document.getElementById('extractBtn');

    // Reset previous results
    result.classList.add('hidden');
    error.classList.add('hidden');
    
    // Validate URL
    if (!urlInput.value.trim()) {
        showError('Please enter a valid URL');
        return;
    }

    // Show loader and disable button
    loader.classList.remove('hidden');
    extractBtn.disabled = true;

    try {
        const response = await fetch(`/api/extract-video?url=${encodeURIComponent(urlInput.value)}`);
        const data = await response.json();

        if (data.error) {
            showError(data.error);
        } else {
            sourceUrl.value = data.videoSource;
            result.classList.remove('hidden');
            result.classList.add('success-animation');
        }
    } catch (err) {
        showError('Failed to extract video source. Please try again.');
    } finally {
        loader.classList.add('hidden');
        extractBtn.disabled = false;
    }
}

function showError(message) {
    const error = document.getElementById('error');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    error.classList.remove('hidden');
}

function copyToClipboard() {
    const sourceUrl = document.getElementById('sourceUrl');
    sourceUrl.select();
    document.execCommand('copy');
    
    // Show temporary success message
    const copyBtn = document.querySelector('.copy-btn');
    const originalHTML = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
    copyBtn.style.backgroundColor = 'var(--success-color)';
    
    setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.style.backgroundColor = '';
    }, 2000);
}

function openInNewTab() {
    const sourceUrl = document.getElementById('sourceUrl');
    window.open(sourceUrl.value, '_blank');
}

// Add enter key support
document.getElementById('urlInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        extractVideo();
    }
});