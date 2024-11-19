import { useEffect } from 'react';

const ComposeEmail = ({ onClose }) => {
  useEffect(() => {
    // Function to load a single script
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.body.appendChild(script);
      });
    };

    // Load multiple scripts in order
    const loadScripts = async () => {
      try {
        await loadScript('/jquery.min.js');
        await loadScript('/bootstrap.bundle.min.js');
        await loadScript('/adminlte.min.js');
        // await loadScript('/public/demo.js');
      } catch (error) {
        console.error('Failed to load external scripts:', error);
      }
    };

    loadScripts();

    // Load CSS files
    const loadStyles = (src) => {
      const link = document.createElement('link');
      link.href = src;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    };

    loadStyles('/adminlte.min.css');
    loadStyles('/all.min.css');
    loadStyles('/adminlte.min.css.map');
    loadStyles('/summernote-bs4.min.css');

    // Cleanup function to remove scripts and styles
    return () => {
      // Remove scripts
      document.querySelectorAll('script[src^="/public/"]').forEach(el => el.remove());
      // Remove styles
      document.querySelectorAll('link[href^="/public/"]').forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="fixed top-0 right-0 w-full sm:w-9/12 h-full sm:h-[91%] bg-white shadow-lg z-50 p-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="text-xl font-medium text-gray-900">Compose New Message</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          ✕
        </button>
      </div>
      <div className="mt-4">
        <div className="form-group">
          <input type="email" className="form-control" placeholder="To:" />
        </div>
        <div className="form-group mt-2">
          <input type="text" className="form-control" placeholder="Subject:" />
        </div>
        <div className="form-group mt-2">
          <textarea className="form-control" rows="10" placeholder="Message..."></textarea>
        </div>
        <div className="flex justify-end mt-4">
          <button className="btn btn-secondary mr-2" onClick={onClose}>Discard</button>
          <button className="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ComposeEmail;
