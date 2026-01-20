import { useState } from 'react';
import Topbar from '@ui/components/topbar/Topbar';
import Sidebar from '@ui/components/sidebar/Sidebar';
import CartSidebar from '@features/cart/components/sidebar/CartSidebar';
import ModalAuth from '@ui/components/modals/ModalAuth';

const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="flex h-screen">
      {/* <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className='absolute top-0 left-0 right-0 z-9999 bg-white/10 backdrop-blur-md'>
          <Topbar
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            onCartClick={() => setIsCartOpen(true)}
          />
        </div>
        <main className="w-full overflow-y-auto">
          {children}
        </main>
      </div>
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
      <ModalAuth
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default AppLayout;