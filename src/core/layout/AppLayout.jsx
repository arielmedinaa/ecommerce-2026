import { useState } from 'react';
import Topbar from '@ui/components/topbar/Topbar';
import Sidebar from '@ui/components/sidebar/Sidebar';
import CartSidebar from '@features/cart/components/sidebar/CartSidebar';

const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onCartClick={() => setIsCartOpen(true)}
        />
        <main className="w-full overflow-y-auto">
          {children}
        </main>
      </div>
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};

export default AppLayout;