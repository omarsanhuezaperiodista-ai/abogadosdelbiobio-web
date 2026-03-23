import React from 'react';

export const PreLoader: React.FC = () => {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => {
      setVisible(false);
    }, 600);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="preloader">
      <div className="loader">
        <img className="loader-image" src="/static/assets/images/loader.png" alt="loader" suppressHydrationWarning />
      </div>
    </div>
  );
};

export default PreLoader;
