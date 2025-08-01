// Helper to show flash message
  function showMessage(text, isError = false) {
    const flash = document.getElementById('flashMessage');
    flash.textContent = text;
    flash.style.color = isError ? '#721c24' : '#155724';
    flash.style.backgroundColor = isError ? '#f8d7da' : '#d4edda';
    flash.style.border = isError ? '1px solid #f5c6cb' : '1px solid #c3e6cb';
    flash.style.display = 'block';
  }

  // Hide flash message
  function hideMessage() {
    const flash = document.getElementById('flashMessage');
    flash.style.display = 'none';
  }

  // Toggle download status visibility
  function toggleDownloadStatus(show) {
    const status = document.getElementById('downloadStatus');
    status.style.display = show ? 'block' : 'none';
  }

  // Video download form submit handler
  document.getElementById('downloadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    hideMessage();

    const url = document.getElementById('video_url').value.trim();
    const quality = document.querySelector('input[name="quality"]:checked').value;
    const downloadBtn = document.getElementById('downloadBtn');
    const audioBtn = document.getElementById('audioBtn');

    if (!url) {
      showMessage('Please enter a URL.', true);
      return;
    }

    // Show downloading status
    toggleDownloadStatus(true);
    downloadBtn.disabled = true;
    audioBtn.disabled = true;

    fetch('/start-download', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ url, quality })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        showMessage('Video downloaded successfully!');
      } else {
        showMessage('Error: ' + data.error, true);
      }
      // Hide downloading status
      toggleDownloadStatus(false);
      downloadBtn.disabled = false;
      audioBtn.disabled = false;
      document.getElementById('video_url').value = '';
    })
    .catch(err => {
      showMessage('Error: ' + err.message, true);
      toggleDownloadStatus(false);
      downloadBtn.disabled = false;
      audioBtn.disabled = false;
    });
  });

  // Audio download button click handler
  function downloadAudio() {
    hideMessage();

    const url = document.getElementById('video_url').value.trim();
    const downloadBtn = document.getElementById('downloadBtn');
    const audioBtn = document.getElementById('audioBtn');

    if (!url) {
      showMessage('Please enter a URL.', true);
      return;
    }

    // Show downloading status
    toggleDownloadStatus(true);
    downloadBtn.disabled = true;
    audioBtn.disabled = true;

    fetch('/download-audio', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ url })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        showMessage('Audio downloaded successfully!');
      } else {
        showMessage('Error: ' + data.error, true);
      }
      // Hide downloading status
      toggleDownloadStatus(false);
      downloadBtn.disabled = false;
      audioBtn.disabled = false;
      document.getElementById('video_url').value = '';
    })
    .catch(err => {
      showMessage('Error: ' + err.message, true);
      toggleDownloadStatus(false);
      downloadBtn.disabled = false;
      audioBtn.disabled = false;
    });
  }

  // Video info function
function getVideoInfo() {
    const url = document.getElementById("video_url").value;
    if (!url) {
        document.getElementById("videoInfo").style.display = "none";
        return;
    }

    const formData = new FormData();
    formData.append("video_url", url);

    fetch("/info", { method: "POST", body: formData })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
            document.getElementById("videoInfo").style.display = "none";
            return;
        }
        const info = document.getElementById("videoDetails");
        const mins = Math.floor(data.duration / 60);
        const secs = data.duration % 60;
        
        // Format the upload date
        const uploadDate = formatUploadDate(data.upload_date);
        
        info.innerHTML = `
          <p><strong>Title:</strong> ${data.title}</p>
          <p><strong>Uploader:</strong> ${data.uploader}</p>
          <p><strong>Duration:</strong> ${mins}:${secs.toString().padStart(2, '0')}</p>
          <p><strong>Views:</strong> ${data.view_count.toLocaleString()}</p>
          <p><strong>Upload Date:</strong> ${uploadDate}</p>
        `;
        document.getElementById("videoInfo").style.display = "block";
      });
}

// Helper function to format YYYYMMDD date
function formatUploadDate(ytDate) {
    if (!ytDate || ytDate.length !== 8) return "Unknown";
    
    const year = ytDate.substring(0, 4);
    const month = ytDate.substring(4, 6);
    const day = ytDate.substring(6, 8);
    
    const date = new Date(`${year}-${month}-${day}`);
    if (isNaN(date.getTime())) return "Unknown";
    
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

  // Auto-fetch info when URL changes
  document.getElementById('video_url').addEventListener('input', getVideoInfo);