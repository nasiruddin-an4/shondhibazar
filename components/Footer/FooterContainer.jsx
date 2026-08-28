// components/layout/FooterContainer.js
import MobileFooter from "./MobileFooter";
import DesktopFooter from "./DesktopFooter";

const FooterContainer = () => {
  return (
    <>
      <DesktopFooter />
      <MobileFooter />
      {/* Add padding to main content when mobile footer is present */}
      <div className="lg:hidden h-16"></div>
    </>
  );
};

export default FooterContainer;
