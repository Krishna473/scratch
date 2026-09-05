import React, { useState } from 'react';
import { ShoppingBag, Plus, Trash2, CheckCircle2, DollarSign, Store, Clock } from 'lucide-react';
import { chemists, productsCatalog } from '../data/mockData';

export default function OrderBookingView({ orders, onAddOrder, showToast }) {
  const [selectedChemist, setSelectedChemist] = useState(chemists[0].name);
  const [orderItems, setOrderItems] = useState([
    { productId: productsCatalog[0].id, quantity: 10 }
  ]);
  const [remarks, setRemarks] = useState("");

  const handleAddItem = () => {
    setOrderItems([...orderItems, { productId: productsCatalog[0].id, quantity: 5 }]);
  };

  const handleRemoveItem = (index) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...orderItems];
    updated[index][field] = value;
    setOrderItems(updated);
  };

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => {
    const prod = productsCatalog.find(p => p.id === item.productId);
    const qty = parseInt(item.quantity) || 0;
    return sum + (prod ? prod.ptr * qty : 0);
  }, 0);

  const gst = subtotal * 0.12; // 12% GST
  const grandTotal = Math.round(subtotal + gst);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (orderItems.length === 0) {
      showToast("Please add at least one product to the order!", "error");
      return;
    }

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      chemist: selectedChemist,
      date: new Date().toISOString().split('T')[0],
      itemsCount: orderItems.length,
      totalAmount: grandTotal,
      status: "Booked (Pending Dispatch)",
      stockist: "Shree Ganesh Pharma Distributors"
    };

    onAddOrder(newOrder);
    showToast(`Order ${newOrder.id} of ₹${grandTotal.toLocaleString('en-IN')} booked successfully!`, "success");
    setOrderItems([{ productId: productsCatalog[0].id, quantity: 10 }]);
    setRemarks("");
  };

  return (
    <div className="max-w-[1500px] mx-auto p-4 md:p-6 space-y-6 pb-20">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Personal Order Booking (POB)</h1>
          <p className="text-xs text-gray-500">Book chemist secondary sales orders directly during field visits</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Order Entry Form */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-xs p-5">
          <form onSubmit={handleSubmitOrder} className="space-y-5">
            
            {/* Chemist Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="sfa-label">Select Chemist *</label>
                <select 
                  value={selectedChemist} 
                  onChange={(e) => setSelectedChemist(e.target.value)}
                  className="sfa-input-underline bg-white font-medium cursor-pointer"
                >
                  {chemists.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="sfa-label">Tagged Stockist</label>
                <input 
                  type="text" 
                  disabled 
                  value="Shree Ganesh Pharma Distributors (C&F Bangalore)" 
                  className="sfa-input-underline text-gray-500 bg-gray-50 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Products Table */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="sfa-label font-bold text-gray-700">Order Items</label>
                <button 
                  type="button" 
                  onClick={handleAddItem}
                  className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                    <tr>
                      <th className="p-3">Product Name</th>
                      <th className="p-3">Pack</th>
                      <th className="p-3">PTR (₹)</th>
                      <th className="p-3 w-28">Quantity</th>
                      <th className="p-3 text-right">Amount (₹)</th>
                      <th className="p-3 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orderItems.map((item, idx) => {
                      const prod = productsCatalog.find(p => p.id === item.productId) || productsCatalog[0];
                      const itemTotal = prod.ptr * (parseInt(item.quantity) || 0);

                      return (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="p-3">
                            <select 
                              value={item.productId}
                              onChange={(e) => handleItemChange(idx, 'productId', e.target.value)}
                              className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white focus:outline-none focus:border-blue-500 font-medium"
                            >
                              {productsCatalog.map(p => (
                                <option key={p.id} value={p.id}>{p.name} ({p.division})</option>
                              ))}
                            </select>
                          </td>
                          <td className="p-3 text-gray-500">{prod.pack}</td>
                          <td className="p-3 font-mono font-medium">₹{prod.ptr.toFixed(2)}</td>
                          <td className="p-3">
                            <input 
                              type="number" 
                              min="1" 
                              max="1000"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                              className="w-20 border border-gray-300 rounded p-1.5 text-xs text-center font-mono font-bold focus:outline-none focus:border-blue-500"
                            />
                          </td>
                          <td className="p-3 text-right font-mono font-bold text-gray-800">
                            ₹{itemTotal.toFixed(2)}
                          </td>
                          <td className="p-3 text-center">
                            {orderItems.length > 1 && (
                              <button 
                                type="button" 
                                onClick={() => handleRemoveItem(idx)}
                                className="text-gray-400 hover:text-red-600 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label className="sfa-label">Chemist Notes / Delivery Instructions</label>
              <textarea 
                rows="2"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="e.g. Urgent delivery requested by tomorrow evening"
                className="w-full text-xs p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Summary & Submit Button */}
            <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs space-y-0.5">
                <div>Subtotal: <span className="font-mono font-semibold">₹{subtotal.toFixed(2)}</span></div>
                <div>GST (12%): <span className="font-mono text-gray-500">₹{gst.toFixed(2)}</span></div>
                <div className="text-sm font-bold text-blue-900">Total Net Amount: ₹{grandTotal.toLocaleString('en-IN')}</div>
              </div>

              <button 
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold shadow-xs transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Confirm & Place POB Order</span>
              </button>
            </div>

          </form>
        </div>

        {/* Recent Orders History List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-5 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Recent Chemist Orders
          </h2>

          <div className="space-y-3">
            {orders.map(order => (
              <div key={order.id} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-gray-900">{order.id}</span>
                  <span className="text-[10.5px] px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-semibold">
                    {order.status}
                  </span>
                </div>
                <div className="text-xs font-medium text-blue-900">{order.chemist}</div>
                <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2">
                  <span>{order.itemsCount} Items • {order.date}</span>
                  <span className="font-mono font-bold text-gray-900 text-xs">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
