// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { Plus, Edit, Trash2, LogOut } from 'lucide-react';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// const emptyTour = {
//   title: '',
//   location: '',
//   category: '',
//   badge: '',
//   discount: '',
//   rating: 5,
//   ratingCount: 0,
//   originalPrice: '',
//   currentPrice: '',
//   days: '',
//   nights: '',
//   groupSize: '',
//   tagsText: '',
//   inclusionsText: '',
//   exclusionsText: '',
//   image: '',
//   galleryText: '',
//   isFeatured: false,
//   dayWisePlan: [],
// };

// const emptyVehicle = {
//   name: '',
//   vehicleType: 'TAXI',
//   category: '',
//   price: '',
//   capacity: '',
//   transmission: '',
//   image: '',
// };

// const makeSlug = (text = '') =>
//   text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// const splitText = (value = '') =>
//   value
//     .split(',')
//     .map((item) => item.trim())
//     .filter(Boolean);

// export default function AdminPage() {
//   const router = useRouter();

//   const [activeTab, setActiveTab] = useState('tours');
//   const [tours, setTours] = useState([]);
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [token, setToken] = useState('');

//   const [formData, setFormData] = useState(emptyTour);
//   const [editingId, setEditingId] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const authConfig = useCallback(
//     (authToken = token) => ({
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     }),
//     [token]
//   );

//   const fetchData = useCallback(
//     async (authToken) => {
//       setLoading(true);

//       try {
//         const [toursRes, vehiclesRes] = await Promise.all([
//           axios.get(`${API_URL}/admin/tours`, authConfig(authToken)),
//           axios.get(`${API_URL}/admin/vehicles`, authConfig(authToken)),
//         ]);

//         setTours(toursRes.data.tours || []);
//         setVehicles(vehiclesRes.data.vehicles || []);
//       } catch (error) {
//         console.error(error);

//         if (error.response?.status === 401) {
//           toast.error('Unauthorized. Please login again.');
//           localStorage.removeItem('adminToken');
//           router.push('/login');
//         } else {
//           toast.error('Failed to fetch data');
//         }
//       } finally {
//         setLoading(false);
//       }
//     },
//     [authConfig, router]
//   );

//   useEffect(() => {
//     const storedToken = localStorage.getItem('adminToken');

//     if (!storedToken) {
//       router.push('/login');
//       return;
//     }

//     setToken(storedToken);
//     fetchData(storedToken);
//   }, [fetchData, router]);

//   const resetForm = () => {
//     setEditingId(null);
//     setFormData(activeTab === 'tours' ? emptyTour : emptyVehicle);
//   };

//   const handleEdit = (item) => {
//     setEditingId(item._id || item.id);

//     if (activeTab === 'tours') {
//       setFormData({
//         ...emptyTour,
//         ...item,
//         tagsText: Array.isArray(item.tags) ? item.tags.join(', ') : '',
//         inclusionsText: Array.isArray(item.inclusions) ? item.inclusions.join(', ') : '',
//         exclusionsText: Array.isArray(item.exclusions) ? item.exclusions.join(', ') : '',
//         galleryText: Array.isArray(item.gallery) ? item.gallery.join(', ') : '',
//         dayWisePlan: Array.isArray(item.dayWisePlan) ? item.dayWisePlan : [],
//       });
//     } else {
//       setFormData({
//         ...emptyVehicle,
//         ...item,
//       });
//     }

//     setShowForm(true);
//   };

//   const addDayPlan = () => {
//     const nextDay = (formData.dayWisePlan?.length || 0) + 1;

//     setFormData({
//       ...formData,
//       dayWisePlan: [
//         ...(formData.dayWisePlan || []),
//         {
//           day: nextDay,
//           title: '',
//           description: '',
//           activitiesText: '',
//           activities: [],
//           meals: '',
//           image: '',
//         },
//       ],
//     });
//   };

//   const updateDayPlan = (index, field, value) => {
//     const updated = [...(formData.dayWisePlan || [])];

//     updated[index] = {
//       ...updated[index],
//       [field]: value,
//     };

//     setFormData({
//       ...formData,
//       dayWisePlan: updated,
//     });
//   };

//   const removeDayPlan = (index) => {
//     const updated = [...(formData.dayWisePlan || [])];
//     updated.splice(index, 1);

//     setFormData({
//       ...formData,
//       dayWisePlan: updated,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (activeTab === 'tours') {
//         const payload = {
//           id: formData.id || `tour-${Date.now()}`,
//           slug: formData.slug || makeSlug(formData.title),
//           title: formData.title,
//           location: formData.location,
//           category: formData.category,
//           badge: formData.badge || null,
//           discount: formData.discount || null,
//           rating: Number(formData.rating || 5),
//           ratingCount: Number(formData.ratingCount || 0),
//           originalPrice: Number(formData.originalPrice || formData.currentPrice || 0),
//           currentPrice: Number(formData.currentPrice || 0),
//           days: Number(formData.days || 1),
//           nights: Number(formData.nights || 0),
//           groupSize: formData.groupSize,
//           tags: splitText(formData.tagsText),
//           inclusions: splitText(formData.inclusionsText),
//           exclusions: splitText(formData.exclusionsText),
//           image: formData.image,
//           gallery: splitText(formData.galleryText),
//           isFeatured: Boolean(formData.isFeatured),
//           dayWisePlan: (formData.dayWisePlan || []).map((day, index) => ({
//             day: Number(day.day || index + 1),
//             title: day.title,
//             description: day.description,
//             activities: Array.isArray(day.activities)
//               ? day.activities
//               : splitText(day.activitiesText || ''),
//             meals: day.meals,
//             image: day.image || null,
//           })),
//         };

//         if (editingId) {
//           await axios.put(`${API_URL}/admin/tours/${editingId}`, payload, authConfig());
//         } else {
//           await axios.post(`${API_URL}/admin/tours`, payload, authConfig());
//         }
//       } else {
//         const payload = {
//           ...formData,
//           vehicleType: formData.vehicleType || 'TAXI',
//           capacity: Number(formData.capacity || 0),
//           price: Number(formData.price || 0),
//         };

//         if (editingId) {
//           await axios.put(`${API_URL}/admin/vehicles/${editingId}`, payload, authConfig());
//         } else {
//           await axios.post(`${API_URL}/admin/vehicles`, payload, authConfig());
//         }
//       }

//       toast.success('Saved successfully');
//       setShowForm(false);
//       resetForm();
//       fetchData(token);
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.details || error.response?.data?.error || 'Failed to save');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       if (activeTab === 'tours') {
//         await axios.delete(`${API_URL}/admin/tours/${id}`, authConfig());
//       } else {
//         await axios.delete(`${API_URL}/admin/vehicles/${id}`, authConfig());
//       }

//       toast.success('Deleted successfully');
//       fetchData(token);
//     } catch (error) {
//       console.error(error);
//       toast.error('Delete failed');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     localStorage.removeItem('userRole');
//     router.push('/login');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 shadow-lg">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold">Starline Travel Admin Panel</h1>
//             <p className="text-blue-100">Manage Tour Packages & Vehicles</p>
//           </div>

//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
//           >
//             <LogOut size={20} />
//             Logout
//           </button>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto p-6">
//         <div className="flex gap-4 mb-6">
//           <button
//             onClick={() => {
//               setActiveTab('tours');
//               setShowForm(false);
//               setFormData(emptyTour);
//               setEditingId(null);
//             }}
//             className={`px-6 py-3 rounded-lg font-semibold ${
//               activeTab === 'tours'
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-white text-gray-700 border'
//             }`}
//           >
//             Tour Packages
//           </button>

//           <button
//             onClick={() => {
//               setActiveTab('vehicles');
//               setShowForm(false);
//               setFormData(emptyVehicle);
//               setEditingId(null);
//             }}
//             className={`px-6 py-3 rounded-lg font-semibold ${
//               activeTab === 'vehicles'
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-white text-gray-700 border'
//             }`}
//           >
//             Vehicles
//           </button>
//         </div>

//         {!showForm && (
//           <button
//             onClick={() => {
//               setShowForm(true);
//               setEditingId(null);
//               setFormData(activeTab === 'tours' ? emptyTour : emptyVehicle);
//             }}
//             className="mb-6 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
//           >
//             <Plus size={20} />
//             Add New {activeTab === 'tours' ? 'Tour Package' : 'Vehicle'}
//           </button>
//         )}

//         {showForm && (
//           <form
//             onSubmit={handleSubmit}
//             className="bg-white p-6 rounded-lg shadow-lg mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
//           >
//             {activeTab === 'tours' ? (
//               <>
//                 <input required placeholder="Title" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="border p-2 rounded" />
//                 <input required placeholder="Location" value={formData.location || ''} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="border p-2 rounded" />
//                 <input required placeholder="Category" value={formData.category || ''} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="border p-2 rounded" />

//                 <input placeholder="Badge e.g. Best Seller" value={formData.badge || ''} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} className="border p-2 rounded" />
//                 <input placeholder="Discount e.g. 20% OFF" value={formData.discount || ''} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} className="border p-2 rounded" />

//                 <input type="number" step="0.1" placeholder="Rating" value={formData.rating || ''} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} className="border p-2 rounded" />
//                 <input type="number" placeholder="Rating Count" value={formData.ratingCount || ''} onChange={(e) => setFormData({ ...formData, ratingCount: e.target.value })} className="border p-2 rounded" />

//                 <input required type="number" placeholder="Original Price" value={formData.originalPrice || ''} onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })} className="border p-2 rounded" />
//                 <input required type="number" placeholder="Current Price" value={formData.currentPrice || ''} onChange={(e) => setFormData({ ...formData, currentPrice: e.target.value })} className="border p-2 rounded" />

//                 <input required type="number" placeholder="Days" value={formData.days || ''} onChange={(e) => setFormData({ ...formData, days: e.target.value })} className="border p-2 rounded" />
//                 <input required type="number" placeholder="Nights" value={formData.nights || ''} onChange={(e) => setFormData({ ...formData, nights: e.target.value })} className="border p-2 rounded" />

//                 <input required placeholder="Group Size e.g. 2-10 People" value={formData.groupSize || ''} onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })} className="border p-2 rounded" />
//                 <input required placeholder="Main Image URL" value={formData.image || ''} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="border p-2 rounded" />

//                 <input placeholder="Tags comma separated" value={formData.tagsText || ''} onChange={(e) => setFormData({ ...formData, tagsText: e.target.value })} className="border p-2 rounded md:col-span-2" />
//                 <input placeholder="Inclusions comma separated" value={formData.inclusionsText || ''} onChange={(e) => setFormData({ ...formData, inclusionsText: e.target.value })} className="border p-2 rounded md:col-span-2" />
//                 <input placeholder="Exclusions comma separated" value={formData.exclusionsText || ''} onChange={(e) => setFormData({ ...formData, exclusionsText: e.target.value })} className="border p-2 rounded md:col-span-2" />
//                 <input placeholder="Gallery image URLs comma separated" value={formData.galleryText || ''} onChange={(e) => setFormData({ ...formData, galleryText: e.target.value })} className="border p-2 rounded md:col-span-2" />

//                 <label className="flex items-center gap-2 md:col-span-2">
//                   <input
//                     type="checkbox"
//                     checked={Boolean(formData.isFeatured)}
//                     onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
//                   />
//                   Featured Package
//                 </label>

//                 <div className="md:col-span-2 border rounded p-4">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-bold">Day Wise Plan</h3>
//                     <button
//                       type="button"
//                       onClick={addDayPlan}
//                       className="bg-green-600 text-white px-3 py-2 rounded"
//                     >
//                       Add Day
//                     </button>
//                   </div>

//                   {(formData.dayWisePlan || []).map((day, index) => (
//                     <div key={index} className="border rounded p-4 mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
//                       <input
//                         type="number"
//                         placeholder="Day Number"
//                         value={day.day || ''}
//                         onChange={(e) => updateDayPlan(index, 'day', e.target.value)}
//                         className="border p-2 rounded"
//                         required
//                       />

//                       <input
//                         placeholder="Day Title"
//                         value={day.title || ''}
//                         onChange={(e) => updateDayPlan(index, 'title', e.target.value)}
//                         className="border p-2 rounded"
//                         required
//                       />

//                       <textarea
//                         placeholder="Day Description"
//                         value={day.description || ''}
//                         onChange={(e) => updateDayPlan(index, 'description', e.target.value)}
//                         className="border p-2 rounded md:col-span-2"
//                         required
//                       />

//                       <input
//                         placeholder="Activities comma separated"
//                         value={day.activitiesText || (Array.isArray(day.activities) ? day.activities.join(', ') : '')}
//                         onChange={(e) => updateDayPlan(index, 'activitiesText', e.target.value)}
//                         className="border p-2 rounded md:col-span-2"
//                       />

//                       <input
//                         placeholder="Meals e.g. Breakfast & Dinner"
//                         value={day.meals || ''}
//                         onChange={(e) => updateDayPlan(index, 'meals', e.target.value)}
//                         className="border p-2 rounded"
//                         required
//                       />

//                       <input
//                         placeholder="Day Image URL"
//                         value={day.image || ''}
//                         onChange={(e) => updateDayPlan(index, 'image', e.target.value)}
//                         className="border p-2 rounded"
//                       />

//                       <button
//                         type="button"
//                         onClick={() => removeDayPlan(index)}
//                         className="bg-red-500 text-white px-3 py-2 rounded md:col-span-2"
//                       >
//                         Remove Day
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <>
//                 <input required placeholder="Vehicle Name" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border p-2 rounded" />

//                 <select value={formData.vehicleType || 'TAXI'} onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })} className="border p-2 rounded">
//                   <option value="TAXI">Taxi</option>
//                   <option value="WEDDING">Wedding</option>
//                 </select>

//                 <input placeholder="Category" value={formData.category || ''} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="border p-2 rounded" />
//                 <input required type="number" placeholder="Price" value={formData.price || ''} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="border p-2 rounded" />
//                 <input type="number" placeholder="Capacity" value={formData.capacity || ''} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} className="border p-2 rounded" />
//                 <input placeholder="Transmission" value={formData.transmission || ''} onChange={(e) => setFormData({ ...formData, transmission: e.target.value })} className="border p-2 rounded" />
//                 <input placeholder="Image URL" value={formData.image || ''} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="border p-2 rounded" />
//               </>
//             )}

//             <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">
//               {editingId ? 'Update' : 'Save'}
//             </button>

//             <button
//               type="button"
//               onClick={() => {
//                 setShowForm(false);
//                 resetForm();
//               }}
//               className="bg-gray-400 text-white rounded px-4 py-2"
//             >
//               Cancel
//             </button>
//           </form>
//         )}

//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           {loading ? (
//             <div className="p-8 text-center text-gray-500">Loading...</div>
//           ) : activeTab === 'tours' ? (
//             <TourTable tours={tours} onEdit={handleEdit} onDelete={handleDelete} />
//           ) : (
//             <VehicleTable vehicles={vehicles} onEdit={handleEdit} onDelete={handleDelete} />
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// function TourTable({ tours, onEdit, onDelete }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full">
//         <thead className="bg-gray-100 border-b">
//           <tr>
//             <th className="text-left p-4">Title</th>
//             <th className="text-left p-4">Location</th>
//             <th className="text-left p-4">Price</th>
//             <th className="text-left p-4">Days</th>
//             <th className="text-left p-4">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {tours.length > 0 ? (
//             tours.map((tour) => (
//               <tr key={tour._id || tour.id} className="border-b hover:bg-gray-50">
//                 <td className="p-4">{tour.title}</td>
//                 <td className="p-4">{tour.location}</td>
//                 <td className="p-4">₹{tour.currentPrice}</td>
//                 <td className="p-4">{tour.days}</td>
//                 <td className="p-4 flex gap-2">
//                   <button onClick={() => onEdit(tour)} className="bg-blue-500 text-white p-2 rounded">
//                     <Edit size={18} />
//                   </button>

//                   <button onClick={() => onDelete(tour._id || tour.id)} className="bg-red-500 text-white p-2 rounded">
//                     <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" className="p-4 text-center text-gray-500">
//                 No tours found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function VehicleTable({ vehicles, onEdit, onDelete }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full">
//         <thead className="bg-gray-100 border-b">
//           <tr>
//             <th className="text-left p-4">Name</th>
//             <th className="text-left p-4">Type</th>
//             <th className="text-left p-4">Category</th>
//             <th className="text-left p-4">Price</th>
//             <th className="text-left p-4">Capacity</th>
//             <th className="text-left p-4">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {vehicles.length > 0 ? (
//             vehicles.map((vehicle) => (
//               <tr key={vehicle._id || vehicle.id} className="border-b hover:bg-gray-50">
//                 <td className="p-4">{vehicle.name}</td>
//                 <td className="p-4">{vehicle.vehicleType}</td>
//                 <td className="p-4">{vehicle.category}</td>
//                 <td className="p-4">₹{vehicle.price}</td>
//                 <td className="p-4">{vehicle.capacity}</td>
//                 <td className="p-4 flex gap-2">
//                   <button onClick={() => onEdit(vehicle)} className="bg-blue-500 text-white p-2 rounded">
//                     <Edit size={18} />
//                   </button>

//                   <button onClick={() => onDelete(vehicle._id || vehicle.id)} className="bg-red-500 text-white p-2 rounded">
//                     <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="p-4 text-center text-gray-500">
//                 No vehicles found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }




'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, LogOut } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const emptyTour = {
  title: '',
  location: '',
  category: '',
  badge: '',
  discount: '',
  rating: 5,
  ratingCount: 0,
  originalPrice: '',
  currentPrice: '',
  days: '',
  nights: '',
  groupSize: '',
  tagsText: '',
  inclusionsText: '',
  exclusionsText: '',
  image: '',
  galleryText: '',
  isFeatured: false,
  dayWisePlan: [],
};

const emptyVehicle = {
  name: '',
  vehicleType: 'TAXI',
  image: '',
  pricePerKm: '',
  extraKmPrice: '',
  extraHours: '',
  nightCharge: '',
  outStation: '',
};

const makeSlug = (text = '') =>
  text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const splitText = (value = '') =>
  value.split(',').map((item) => item.trim()).filter(Boolean);

export default function AdminPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('tours');
  const [tours, setTours] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  const [formData, setFormData] = useState(emptyTour);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const authConfig = useCallback(
    (authToken = token) => ({
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    [token]
  );

  const fetchData = useCallback(
    async (authToken) => {
      setLoading(true);

      try {
        const [toursRes, vehiclesRes] = await Promise.all([
          axios.get(`${API_URL}/admin/tours`, authConfig(authToken)),
          axios.get(`${API_URL}/admin/vehicles`, authConfig(authToken)),
        ]);

        setTours(toursRes.data.tours || []);
        setVehicles(vehiclesRes.data.vehicles || []);
      } catch (error) {
        console.error(error);

        if (error.response?.status === 401) {
          toast.error('Unauthorized. Please login again.');
          localStorage.removeItem('adminToken');
          router.push('/login');
        } else {
          toast.error('Failed to fetch data');
        }
      } finally {
        setLoading(false);
      }
    },
    [authConfig, router]
  );

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');

    if (!storedToken) {
      router.push('/login');
      return;
    }

    setToken(storedToken);
    fetchData(storedToken);
  }, [fetchData, router]);

  const resetForm = () => {
    setEditingId(null);
    setFormData(activeTab === 'tours' ? emptyTour : emptyVehicle);
  };

  const handleEdit = (item) => {
    setEditingId(item._id || item.id);

    if (activeTab === 'tours') {
      setFormData({
        ...emptyTour,
        ...item,
        tagsText: Array.isArray(item.tags) ? item.tags.join(', ') : '',
        inclusionsText: Array.isArray(item.inclusions) ? item.inclusions.join(', ') : '',
        exclusionsText: Array.isArray(item.exclusions) ? item.exclusions.join(', ') : '',
        galleryText: Array.isArray(item.gallery) ? item.gallery.join(', ') : '',
        dayWisePlan: Array.isArray(item.dayWisePlan) ? item.dayWisePlan : [],
      });
    } else {
      setFormData({
        ...emptyVehicle,
        ...item,
      });
    }

    setShowForm(true);
  };

  const addDayPlan = () => {
    const nextDay = (formData.dayWisePlan?.length || 0) + 1;

    setFormData({
      ...formData,
      dayWisePlan: [
        ...(formData.dayWisePlan || []),
        {
          day: nextDay,
          title: '',
          description: '',
          activitiesText: '',
          activities: [],
          meals: '',
          image: '',
        },
      ],
    });
  };

  const updateDayPlan = (index, field, value) => {
    const updated = [...(formData.dayWisePlan || [])];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      dayWisePlan: updated,
    });
  };

  const removeDayPlan = (index) => {
    const updated = [...(formData.dayWisePlan || [])];
    updated.splice(index, 1);

    setFormData({
      ...formData,
      dayWisePlan: updated,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (activeTab === 'tours') {
        const payload = {
          id: formData.id || `tour-${Date.now()}`,
          slug: formData.slug || makeSlug(formData.title),
          title: formData.title,
          location: formData.location,
          category: formData.category,
          badge: formData.badge || null,
          discount: formData.discount || null,
          rating: Number(formData.rating || 5),
          ratingCount: Number(formData.ratingCount || 0),
          originalPrice: Number(formData.originalPrice || formData.currentPrice || 0),
          currentPrice: Number(formData.currentPrice || 0),
          days: Number(formData.days || 1),
          nights: Number(formData.nights || 0),
          groupSize: formData.groupSize,
          tags: splitText(formData.tagsText),
          inclusions: splitText(formData.inclusionsText),
          exclusions: splitText(formData.exclusionsText),
          image: formData.image,
          gallery: splitText(formData.galleryText),
          isFeatured: Boolean(formData.isFeatured),
          dayWisePlan: (formData.dayWisePlan || []).map((day, index) => ({
            day: Number(day.day || index + 1),
            title: day.title,
            description: day.description,
            activities: Array.isArray(day.activities)
              ? day.activities
              : splitText(day.activitiesText || ''),
            meals: day.meals,
            image: day.image || null,
          })),
        };

        if (editingId) {
          await axios.put(`${API_URL}/admin/tours/${editingId}`, payload, authConfig());
        } else {
          await axios.post(`${API_URL}/admin/tours`, payload, authConfig());
        }
      } else {
        const payload = {
          name: formData.name,
          vehicleType: formData.vehicleType || 'TAXI',
          image: formData.image,
          pricePerKm: formData.pricePerKm,
          extraKmPrice: formData.extraKmPrice,
          extraHours: formData.extraHours,
          nightCharge: formData.nightCharge,
          outStation: formData.outStation,
        };

        if (editingId) {
          await axios.put(`${API_URL}/admin/vehicles/${editingId}`, payload, authConfig());
        } else {
          await axios.post(`${API_URL}/admin/vehicles`, payload, authConfig());
        }
      }

      toast.success('Saved successfully');
      setShowForm(false);
      resetForm();
      fetchData(token);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.details || error.response?.data?.error || 'Failed to save');
    }
  };

  const handleDelete = async (id) => {
    try {
      if (activeTab === 'tours') {
        await axios.delete(`${API_URL}/admin/tours/${id}`, authConfig());
      } else {
        await axios.delete(`${API_URL}/admin/vehicles/${id}`, authConfig());
      }

      toast.success('Deleted successfully');
      fetchData(token);
    } catch (error) {
      console.error(error);
      toast.error('Delete failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Starline Travel Admin Panel</h1>
            <p className="text-blue-100">Manage Tour Packages & Vehicles</p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setActiveTab('tours');
              setShowForm(false);
              setFormData(emptyTour);
              setEditingId(null);
            }}
            className={`px-6 py-3 rounded-lg font-semibold ${
              activeTab === 'tours' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'
            }`}
          >
            Tour Packages
          </button>

          <button
            onClick={() => {
              setActiveTab('vehicles');
              setShowForm(false);
              setFormData(emptyVehicle);
              setEditingId(null);
            }}
            className={`px-6 py-3 rounded-lg font-semibold ${
              activeTab === 'vehicles' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'
            }`}
          >
            Vehicles
          </button>
        </div>

        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData(activeTab === 'tours' ? emptyTour : emptyVehicle);
            }}
            className="mb-6 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={20} />
            Add New {activeTab === 'tours' ? 'Tour Package' : 'Vehicle'}
          </button>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {activeTab === 'tours' ? (
              <>
                {/* tumhara tour form same hai */}
                <input required placeholder="Title" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="border p-2 rounded" />
                <input required placeholder="Location" value={formData.location || ''} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="border p-2 rounded" />
                <input required placeholder="Category" value={formData.category || ''} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="border p-2 rounded" />
                <input placeholder="Badge e.g. Best Seller" value={formData.badge || ''} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} className="border p-2 rounded" />
                <input placeholder="Discount e.g. 20% OFF" value={formData.discount || ''} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} className="border p-2 rounded" />
                <input type="number" step="0.1" placeholder="Rating" value={formData.rating || ''} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} className="border p-2 rounded" />
                <input type="number" placeholder="Rating Count" value={formData.ratingCount || ''} onChange={(e) => setFormData({ ...formData, ratingCount: e.target.value })} className="border p-2 rounded" />
                <input required type="number" placeholder="Original Price" value={formData.originalPrice || ''} onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })} className="border p-2 rounded" />
                <input required type="number" placeholder="Current Price" value={formData.currentPrice || ''} onChange={(e) => setFormData({ ...formData, currentPrice: e.target.value })} className="border p-2 rounded" />
                <input required type="number" placeholder="Days" value={formData.days || ''} onChange={(e) => setFormData({ ...formData, days: e.target.value })} className="border p-2 rounded" />
                <input required type="number" placeholder="Nights" value={formData.nights || ''} onChange={(e) => setFormData({ ...formData, nights: e.target.value })} className="border p-2 rounded" />
                <input required placeholder="Group Size e.g. 2-10 People" value={formData.groupSize || ''} onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })} className="border p-2 rounded" />
                <input required placeholder="Main Image URL" value={formData.image || ''} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="border p-2 rounded" />
                <input placeholder="Tags comma separated" value={formData.tagsText || ''} onChange={(e) => setFormData({ ...formData, tagsText: e.target.value })} className="border p-2 rounded md:col-span-2" />
                <input placeholder="Inclusions comma separated" value={formData.inclusionsText || ''} onChange={(e) => setFormData({ ...formData, inclusionsText: e.target.value })} className="border p-2 rounded md:col-span-2" />
                <input placeholder="Exclusions comma separated" value={formData.exclusionsText || ''} onChange={(e) => setFormData({ ...formData, exclusionsText: e.target.value })} className="border p-2 rounded md:col-span-2" />
                <input placeholder="Gallery image URLs comma separated" value={formData.galleryText || ''} onChange={(e) => setFormData({ ...formData, galleryText: e.target.value })} className="border p-2 rounded md:col-span-2" />
              </>
            ) : (
              <>
                <input required placeholder="Vehicle Name e.g. Swift Desire" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border p-2 rounded" />

                <select value={formData.vehicleType || 'TAXI'} onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })} className="border p-2 rounded">
                  <option value="TAXI">Taxi</option>
                  <option value="WEDDING">Wedding</option>
                </select>

                <input required placeholder="Image URL" value={formData.image || ''} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="border p-2 rounded" />

                <input required placeholder="Price e.g. Rs.11/-Per km" value={formData.pricePerKm || ''} onChange={(e) => setFormData({ ...formData, pricePerKm: e.target.value })} className="border p-2 rounded" />

                <input required placeholder="Extra KM Price e.g. Rs.11/-Per km" value={formData.extraKmPrice || ''} onChange={(e) => setFormData({ ...formData, extraKmPrice: e.target.value })} className="border p-2 rounded" />

                <input required placeholder="Extra Hours e.g. Rs.120/-Per hour" value={formData.extraHours || ''} onChange={(e) => setFormData({ ...formData, extraHours: e.target.value })} className="border p-2 rounded" />

                <input required placeholder="Night Charge e.g. Rs.300/-" value={formData.nightCharge || ''} onChange={(e) => setFormData({ ...formData, nightCharge: e.target.value })} className="border p-2 rounded" />

                <input required placeholder="Out Station e.g. Rs.11/km(250/Day)" value={formData.outStation || ''} onChange={(e) => setFormData({ ...formData, outStation: e.target.value })} className="border p-2 rounded" />
              </>
            )}

            <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">
              {editingId ? 'Update' : 'Save'}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="bg-gray-400 text-white rounded px-4 py-2"
            >
              Cancel
            </button>
          </form>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : activeTab === 'tours' ? (
            <TourTable tours={tours} onEdit={handleEdit} onDelete={handleDelete} />
          ) : (
            <VehicleTable vehicles={vehicles} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
      </main>
    </div>
  );
}

function TourTable({ tours, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="text-left p-4">Title</th>
            <th className="text-left p-4">Location</th>
            <th className="text-left p-4">Price</th>
            <th className="text-left p-4">Days</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tours.length > 0 ? (
            tours.map((tour) => (
              <tr key={tour._id || tour.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{tour.title}</td>
                <td className="p-4">{tour.location}</td>
                <td className="p-4">₹{tour.currentPrice}</td>
                <td className="p-4">{tour.days}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => onEdit(tour)} className="bg-blue-500 text-white p-2 rounded">
                    <Edit size={18} />
                  </button>

                  <button onClick={() => onDelete(tour._id || tour.id)} className="bg-red-500 text-white p-2 rounded">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No tours found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function VehicleTable({ vehicles, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Type</th>
            <th className="text-left p-4">Price</th>
            <th className="text-left p-4">Extra Hours</th>
            <th className="text-left p-4">Night Charge</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <tr key={vehicle._id || vehicle.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{vehicle.name}</td>
                <td className="p-4">{vehicle.vehicleType}</td>
                <td className="p-4">{vehicle.pricePerKm}</td>
                <td className="p-4">{vehicle.extraHours}</td>
                <td className="p-4">{vehicle.nightCharge}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => onEdit(vehicle)} className="bg-blue-500 text-white p-2 rounded">
                    <Edit size={18} />
                  </button>

                  <button onClick={() => onDelete(vehicle._id || vehicle.id)} className="bg-red-500 text-white p-2 rounded">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                No vehicles found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}