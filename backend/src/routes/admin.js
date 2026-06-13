import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";
import {
  createTour,
  updateTour,
  deleteTour,
  getTourById,
  getAllTours
} from "../lib/tourService.js";
import {
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleById,
  getAllVehicles
} from "../lib/vehicleService.js";

const router = express.Router();

// ===== TOUR PACKAGE MANAGEMENT =====

// Create new tour package (Admin only)
router.post("/tours", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const body = req.body;

    const slug =
      body.slug ||
      body.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

    const payload = {
      ...body,

      id: `tour-${Date.now()}`,
      slug,

      title: body.title,
      location: body.location,
      category: body.category || "Domestic",
      groupSize: body.groupSize || "2-6 People",
      image: body.image,

      originalPrice: Number(body.originalPrice || body.currentPrice),
      currentPrice: Number(body.currentPrice),
      days: Number(body.days || 1),
      nights: Number(body.nights || 0),

      rating: Number(body.rating || 5),
      ratingCount: Number(body.ratingCount || 0),

      tags: Array.isArray(body.tags) ? body.tags : [],
      inclusions: Array.isArray(body.inclusions) ? body.inclusions : [],
      exclusions: Array.isArray(body.exclusions) ? body.exclusions : [],
      dayWisePlan: Array.isArray(body.dayWisePlan) ? body.dayWisePlan : [],
      gallery: Array.isArray(body.gallery) ? body.gallery : [],
      isFeatured: Boolean(body.isFeatured || false),
    };

    const tour = await createTour(payload);

    return res.status(201).json({
      message: "Tour package created successfully",
      tour,
    });
  } catch (error) {
    console.error("POST /admin/tours error:", error);
    return res.status(500).json({
      error: "Failed to create tour package",
      details: error.message,
    });
  }
});

// Get all tour packages (Admin only)
router.get("/tours", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const tours = await getAllTours();
    return res.json({
      total: tours.length,
      tours
    });
  } catch (error) {
    console.error("GET /admin/tours error:", error);
    return res.status(500).json({ error: "Failed to fetch tour packages" });
  }
});

// Get single tour package (Admin only)
router.get("/tours/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const tour = await getTourById(req.params.id);
    if (!tour) {
      return res.status(404).json({ error: "Tour package not found" });
    }
    return res.json(tour);
  } catch (error) {
    console.error("GET /admin/tours/:id error:", error);
    return res.status(500).json({ error: "Failed to fetch tour package" });
  }
});

// Update tour package (Admin only)
router.put("/tours/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const tour = await updateTour(req.params.id, req.body);
    if (!tour) {
      return res.status(404).json({ error: "Tour package not found" });
    }
    return res.json({
      message: "Tour package updated successfully",
      tour
    });
  } catch (error) {
    console.error("PUT /admin/tours/:id error:", error);
    return res.status(500).json({ error: "Failed to update tour package" });
  }
});

// Delete tour package (Admin only)
router.delete("/tours/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const tour = await deleteTour(req.params.id);
    if (!tour) {
      return res.status(404).json({ error: "Tour package not found" });
    }
    return res.json({
      message: "Tour package deleted successfully",
      deletedTour: tour
    });
  } catch (error) {
    console.error("DELETE /admin/tours/:id error:", error);
    return res.status(500).json({ error: "Failed to delete tour package" });
  }
});

// ===== VEHICLE MANAGEMENT (TAXI & WEDDING CARS) =====

// Create new vehicle (Admin only)
// router.post("/vehicles", verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const vehicle = await createVehicle(req.body);
//     return res.status(201).json({
//       message: "Vehicle added successfully",
//       vehicle
//     });
//   } catch (error) {
//     console.error("POST /admin/vehicles error:", error);
//     return res.status(500).json({ error: "Failed to add vehicle" });
//   }
// });

// // Get all vehicles (Admin only)
// router.get("/vehicles", verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const vehicles = await getAllVehicles();
//     const taxis = vehicles.filter(v => v.vehicleType === "TAXI");
//     const weddingCars = vehicles.filter(v => v.vehicleType === "WEDDING");
    
//     return res.json({
//       total: vehicles.length,
//       taxis: taxis.length,
//       weddingCars: weddingCars.length,
//       vehicles
//     });
//   } catch (error) {
//     console.error("GET /admin/vehicles error:", error);
//     return res.status(500).json({ error: "Failed to fetch vehicles" });
//   }
// });

// // Get single vehicle (Admin only)
// router.get("/vehicles/:id", verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const vehicle = await getVehicleById(req.params.id);
//     if (!vehicle) {
//       return res.status(404).json({ error: "Vehicle not found" });
//     }
//     return res.json(vehicle);
//   } catch (error) {
//     console.error("GET /admin/vehicles/:id error:", error);
//     return res.status(500).json({ error: "Failed to fetch vehicle" });
//   }
// });

// // Update vehicle (Admin only)
// router.put("/vehicles/:id", verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const vehicle = await updateVehicle(req.params.id, req.body);
//     if (!vehicle) {
//       return res.status(404).json({ error: "Vehicle not found" });
//     }
//     return res.json({
//       message: "Vehicle updated successfully",
//       vehicle
//     });
//   } catch (error) {
//     console.error("PUT /admin/vehicles/:id error:", error);
//     return res.status(500).json({ error: "Failed to update vehicle" });
//   }
// });

// // Delete vehicle (Admin only)
// router.delete("/vehicles/:id", verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const vehicle = await deleteVehicle(req.params.id);
//     if (!vehicle) {
//       return res.status(404).json({ error: "Vehicle not found" });
//     }
//     return res.json({
//       message: "Vehicle deleted successfully",
//       deletedVehicle: vehicle
//     });
//   } catch (error) {
//     console.error("DELETE /admin/vehicles/:id error:", error);
//     return res.status(500).json({ error: "Failed to delete vehicle" });
//   }
// });

// ===== VEHICLE MANAGEMENT =====

router.post("/vehicles", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const vehicle = await createVehicle(req.body);

    return res.status(201).json({
      message: "Vehicle added successfully",
      vehicle,
    });
  } catch (error) {
    console.error("POST /admin/vehicles error:", error);
    return res.status(500).json({
      error: "Failed to add vehicle",
      details: error.message,
    });
  }
});

router.get("/vehicles", async (req, res) => {
  try {
    const vehicles = await getAllVehicles();

    return res.json({
      total: vehicles.length,
      vehicles,
    });
  } catch (error) {
    console.error("GET /admin/vehicles error:", error);
    return res.status(500).json({
      error: "Failed to fetch vehicles",
      details: error.message,
    });
  }
});

router.delete("/vehicles/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const vehicle = await deleteVehicle(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    return res.json({
      message: "Vehicle deleted successfully",
      deletedVehicle: vehicle,
    });
  } catch (error) {
    console.error("DELETE /admin/vehicles/:id error:", error);
    return res.status(500).json({
      error: "Failed to delete vehicle",
      details: error.message,
    });
  }
});

router.put("/vehicles/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const vehicle = await updateVehicle(req.params.id, req.body);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    return res.json({
      message: "Vehicle updated successfully",
      vehicle,
    });
  } catch (error) {
    console.error("PUT /admin/vehicles/:id error:", error);
    return res.status(500).json({
      error: "Failed to update vehicle",
      details: error.message,
    });
  }
});

export default router;
