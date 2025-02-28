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
        // Get the current origin (domain)
        const baseUrl = window.location.origin;
        
        // Use the full URL for the API request
        const response = await fetch(`${baseUrl}/api/extract-video?url=${encodeURIComponent(urlInput.value)}`);
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