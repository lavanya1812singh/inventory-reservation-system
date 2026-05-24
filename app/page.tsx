"use client";
 
import { useEffect, useState } from "react";
 
type Inventory = {
  id: string;
  totalQuantity: number;
  reservedQuantity: number;
  warehouse: {
    name: string;
  };
};
 
type Product = {
  id: string;
  name: string;
  inventories: Inventory[];
};
 
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingId, setLoadingId] = useState("");
 
  async function fetchProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }
 
  useEffect(() => {
    fetchProducts();
  }, []);
 
  async function reserveInventory(inventoryId: string) {
    try {
      setLoadingId(inventoryId);
      await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inventoryId, quantity: 1 }),
      });
      await fetchProducts();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId("");
    }
  }
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;500;600;700&display=swap');
 
 
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
 
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
 
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
 
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
          background: #f5f5f7;
          color: #1d1d1f;
          -webkit-font-smoothing: antialiased;
        }
 
        .page-wrapper {
          min-height: 100vh;
          background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
        }
 
        /* NAV */
        .nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: #1d1d1f;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.25);
        }
 
        .nav-logo {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.8px;
          color: #fff;
        }
 
        .nav-links {
          display: flex;
          gap: 6px;
          list-style: none;
        }
 
        .nav-links a {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 8px;
          transition: background 0.18s, color 0.18s;
        }
 
        .nav-links a:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
 
        .nav-add-btn {
          font-size: 13px;
          font-weight: 600;
          color: #1d1d1f;
          background: #fff;
          border: none;
          padding: 7px 16px;
          border-radius: 980px;
          cursor: pointer;
          transition: background 0.18s;
          font-family: inherit;
        }
 
        .nav-add-btn:hover { background: #e8e8ed; }
 
        /* HERO */
        .hero {
          text-align: center;
          padding: 72px 20px 64px;
          background: linear-gradient(160deg, #0071e3 0%, #1a3a6b 60%, #0d1f3c 100%);
          position: relative;
          overflow: hidden;
        }
 
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 70% 50%, rgba(100,180,255,0.18) 0%, transparent 60%),
                      radial-gradient(ellipse at 20% 80%, rgba(0,80,200,0.25) 0%, transparent 50%);
          pointer-events: none;
        }
 
        .hero-eyebrow {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          margin-bottom: 16px;
          animation: fadeInDown 0.6s ease both;
        }
 
        .hero-title {
          font-size: clamp(36px, 5.5vw, 68px);
          font-weight: 700;
          letter-spacing: -2px;
          line-height: 1.06;
          color: #fff;
          margin-bottom: 20px;
          position: relative;
          animation: fadeInDown 0.7s ease 0.1s both;
        }
 
        .hero-sub {
          font-size: 17px;
          font-weight: 400;
          color: rgba(255,255,255,0.7);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.65;
          animation: fadeInDown 0.8s ease 0.2s both;
        }
 
        /* STATS BAR */
        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 0;
          background: #fff;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          padding: 0;
        }
 
        .stat-item {
          flex: 1;
          max-width: 200px;
          text-align: center;
          padding: 24px 20px;
          border-right: 1px solid rgba(0,0,0,0.06);
        }
 
        .stat-item:last-child { border-right: none; }
 
        .stat-number {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -1px;
          color: #1d1d1f;
        }
 
        .stat-label {
          font-size: 12px;
          color: #6e6e73;
          margin-top: 2px;
          letter-spacing: 0.01em;
        }
 
        /* MAIN CONTENT */
        .content {
          max-width: 980px;
          margin: 0 auto;
          padding: 56px 22px 80px;
        }
 
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }
 
        .section-title {
          font-size: 24px;
          font-weight: 600;
          letter-spacing: -0.5px;
          color: #1d1d1f;
        }
 
        .section-count {
          font-size: 13px;
          color: #6e6e73;
        }
 
        /* PRODUCT CARD */
        .product-card {
          background: #fff;
          border-radius: 20px;
          margin-bottom: 24px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
          transition: all 0.3s ease;
          animation: fadeIn 0.5s ease both;
        }
 
        .product-card:hover {
          box-shadow: 0 25px 50px rgba(0,0,0,0.18), 0 10px 20px rgba(0,0,0,0.1);
          transform: translateY(-4px);
        }
 
        .product-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 32px 24px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
 
        .product-name-wrap {
          display: flex;
          align-items: center;
          gap: 14px;
        }
 
        .product-icon {
          width: 44px;
          height: 44px;
          background: #f5f5f7;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }
 
        .product-name {
          font-size: 22px;
          font-weight: 600;
          letter-spacing: -0.5px;
          color: #1d1d1f;
        }
 
        .product-meta {
          font-size: 13px;
          color: #6e6e73;
          margin-top: 2px;
        }
 
        .warehouse-badge {
          background: #f5f5f7;
          color: #1d1d1f;
          font-size: 12px;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 980px;
          letter-spacing: 0.01em;
        }
 
        /* INVENTORY GRID */
        .inventory-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 0;
        }
 
        .inventory-cell {
          padding: 28px 32px;
          border-right: 1px solid rgba(0,0,0,0.06);
          transition: all 0.3s ease;
        }
 
        .inventory-cell:last-child { border-right: none; }
        .inventory-cell:hover { background: rgba(0,113,227,0.03); }
 
        .warehouse-name {
          font-size: 15px;
          font-weight: 600;
          color: #1d1d1f;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
 
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
 
        .status-dot.green { background: #34c759; box-shadow: 0 0 0 3px rgba(52,199,89,0.15); }
        .status-dot.yellow { background: #ff9f0a; box-shadow: 0 0 0 3px rgba(255,159,10,0.15); }
        .status-dot.red { background: #ff3b30; box-shadow: 0 0 0 3px rgba(255,59,48,0.15); }
 
        /* PROGRESS BAR */
        .progress-wrap {
          margin-bottom: 20px;
        }
 
        .progress-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #6e6e73;
          margin-bottom: 8px;
        }
 
        .progress-track {
          height: 4px;
          background: #f5f5f7;
          border-radius: 4px;
          overflow: hidden;
        }
 
        .progress-fill-reserved {
          height: 100%;
          background: #ff3b30;
          border-radius: 4px;
          transition: width 0.4s ease;
        }
 
        /* STATS */
        .inv-stats {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }
 
        .inv-stat {
          background: #f5f5f7;
          border-radius: 10px;
          padding: 12px 10px;
          text-align: center;
        }
 
        .inv-stat-num {
          font-size: 20px;
          font-weight: 600;
          letter-spacing: -0.5px;
          color: #1d1d1f;
        }
 
        .inv-stat-num.avail-green { color: #34c759; }
        .inv-stat-num.avail-yellow { color: #ff9f0a; }
        .inv-stat-num.avail-red { color: #ff3b30; }
 
        .inv-stat-lbl {
          font-size: 11px;
          color: #6e6e73;
          margin-top: 2px;
          letter-spacing: 0.02em;
        }
 
        /* BUTTON */
        .reserve-btn {
          width: 100%;
          padding: 12px 0;
          border-radius: 980px;
          border: none;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: -0.1px;
          transition: all 0.2s ease;
          font-family: inherit;
        }
 
        .reserve-btn.active {
          background: #0071e3;
          color: #fff;
        }
 
        .reserve-btn.active:hover {
          background: #1d4ed8;
          transform: scale(1.02);
          box-shadow: 0 6px 20px rgba(29,78,216,0.4);
        }
 
        .reserve-btn.active:active {
          transform: scale(0.99);
          background: #006edb;
        }
 
        .reserve-btn.loading {
          background: #f5f5f7;
          color: #6e6e73;
          cursor: not-allowed;
        }
 
        .reserve-btn.disabled {
          background: #f5f5f7;
          color: #aeaeb2;
          cursor: not-allowed;
        }
 
        /* FOOTER */
        .footer {
          text-align: center;
          padding: 24px 20px;
          border-top: 1px solid rgba(0,0,0,0.08);
          background: #fff;
        }
 
        .footer-text {
          font-size: 12px;
          color: #6e6e73;
        }
 
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 8px;
          list-style: none;
        }
 
        .footer-links a {
          font-size: 12px;
          color: #6e6e73;
          text-decoration: none;
        }
 
        .footer-links a:hover { color: #0071e3; }
 
        @media (max-width: 640px) {
          .nav-links { display: none; }
          .stats-bar { flex-wrap: wrap; }
          .stat-item { max-width: none; border-right: none; border-bottom: 1px solid rgba(0,0,0,0.06); }
          .inventory-cell { border-right: none; border-bottom: 1px solid rgba(0,0,0,0.06); }
          .inventory-cell:last-child { border-bottom: none; }
          .product-header { padding: 20px; }
          .inventory-cell { padding: 20px; }
        }
      `}</style>
 
      <div className="page-wrapper">
        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo">Stockr</div>
          <ul className="nav-links">
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Warehouses</a></li>
            <li><a href="#">Reports</a></li>
          </ul>
          <button className="nav-add-btn">+ Add Product</button>
        </nav>
 
        {/* HERO */}
        <section className="hero">
          <p className="hero-eyebrow">Real-Time Inventory Management</p>
          <h1 className="hero-title">Reserve Inventory<br />Across Warehouses</h1>
          <p className="hero-sub">Track stock levels, manage warehouses, and reserve units — all in one place.</p>
        </section>
 
        {/* STATS BAR */}
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-number">{products.length}</div>
            <div className="stat-label">Products</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {products.reduce((s, p) => s + p.inventories.length, 0)}
            </div>
            <div className="stat-label">Warehouses</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {products.reduce((s, p) => s + p.inventories.reduce((a, i) => a + (i.totalQuantity - i.reservedQuantity), 0), 0)}
            </div>
            <div className="stat-label">Available Units</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {products.reduce((s, p) => s + p.inventories.reduce((a, i) => a + i.reservedQuantity, 0), 0)}
            </div>
            <div className="stat-label">Reserved</div>
          </div>
        </div>
 
        {/* PRODUCTS */}
        <main className="content">
          <div className="section-header">
            <h2 className="section-title">All Products</h2>
            <span className="section-count">{products.length} items</span>
          </div>
 
          {products.map((product) => {
            const totalUnits = product.inventories.reduce((s, i) => s + i.totalQuantity, 0);
            const totalAvail = product.inventories.reduce((s, i) => s + (i.totalQuantity - i.reservedQuantity), 0);
 
            return (
              <div key={product.id} className="product-card">
                <div className="product-header">
                  <div className="product-name-wrap">
                    <div className="product-icon">📦</div>
                    <div>
                      <div className="product-name">{product.name}</div>
                      <div className="product-meta">{totalAvail} of {totalUnits} units available</div>
                    </div>
                  </div>
                  <div className="warehouse-badge">
                    {product.inventories.length} {product.inventories.length === 1 ? "Warehouse" : "Warehouses"}
                  </div>
                </div>
 
                <div className="inventory-grid">
                  {product.inventories.map((inventory) => {
                    const available = inventory.totalQuantity - inventory.reservedQuantity;
                    const reservedPct = inventory.totalQuantity > 0
                      ? (inventory.reservedQuantity / inventory.totalQuantity) * 100
                      : 0;
                    const availColor =
                      available > 2 ? "avail-green" : available > 0 ? "avail-yellow" : "avail-red";
                    const dotClass =
                      available > 2 ? "green" : available > 0 ? "yellow" : "red";
                    const isLoading = loadingId === inventory.id;
 
                    return (
                      <div key={inventory.id} className="inventory-cell">
                        <div className="warehouse-name">
                          <span className={`status-dot ${dotClass}`} />
                          {inventory.warehouse.name}
                        </div>
 
                        <div className="progress-wrap">
                          <div className="progress-label-row">
                            <span>Reserved</span>
                            <span>{Math.round(reservedPct)}%</span>
                          </div>
                          <div className="progress-track">
                            <div
                              className="progress-fill-reserved"
                              style={{ width: `${reservedPct}%` }}
                            />
                          </div>
                        </div>
 
                        <div className="inv-stats">
                          <div className="inv-stat">
                            <div className="inv-stat-num">{inventory.totalQuantity}</div>
                            <div className="inv-stat-lbl">Total</div>
                          </div>
                          <div className="inv-stat">
                            <div className="inv-stat-num">{inventory.reservedQuantity}</div>
                            <div className="inv-stat-lbl">Reserved</div>
                          </div>
                          <div className="inv-stat">
                            <div className={`inv-stat-num ${availColor}`}>{available}</div>
                            <div className="inv-stat-lbl">Available</div>
                          </div>
                        </div>
 
                        <button
                          className={`reserve-btn ${isLoading ? "loading" : available <= 0 ? "disabled" : "active"}`}
                          onClick={() => reserveInventory(inventory.id)}
                          disabled={available <= 0 || isLoading}
                        >
                          {isLoading ? "Processing…" : available > 0 ? "Reserve" : "Out of Stock"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </main>
 
        {/* FOOTER */}
        <footer className="footer">
          <p className="footer-text">Copyright © 2025 Stockr Inc. All rights reserved.</p>
          <ul className="footer-links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </footer>
      </div>
    </>
  );
}