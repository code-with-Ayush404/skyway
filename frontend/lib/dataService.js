import { mockPackages, mockTaxis, mockWeddingCars, mockTestimonials } from "./mockData";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

async function apiFetch(path, options) {
  const url = `${BACKEND_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function getPackages() {
  try {
    return await apiFetch("/api/packages");
  } catch (error) {
    console.warn("getPackages failed, returning fallback mockPackages:", error);
    return mockPackages;
  }
}

export async function getPackageBySlug(slug) {
  try {
    return await apiFetch(`/api/packages/${slug}`);
  } catch (error) {
    console.warn(`getPackageBySlug failed for ${slug}, returning mock fallback:`, error);
    return mockPackages.find((p) => p.slug === slug) || null;
  }
}

// export async function getTaxiCars() {
//   try {
//     return await apiFetch("/api/taxi-cars");
//   } catch (error) {
//     console.warn("getTaxiCars failed, returning fallback mockTaxis:", error);
//     return mockTaxis;
//   }
// }

//updated file
export async function getTaxiCars() {
  try {
    const data = await apiFetch("/api/admin/vehicles");

    return (data.vehicles || []).filter(
      (vehicle) => vehicle.vehicleType === "TAXI"
    );
  } catch (error) {
    console.warn(
      "getTaxiCars failed, returning fallback mockTaxis:",
      error
    );
    return mockTaxis;
  }
}

// export async function getWeddingCars() {
//   try {
//     return await apiFetch("/api/wedding-cars");
//   } catch (error) {
//     console.warn("getWeddingCars failed, returning fallback mockWeddingCars:", error);
//     return mockWeddingCars;
//   }
// }

//updated 
export async function getWeddingCars() {
  try {
    const data = await apiFetch("/api/admin/vehicles");

    return (data.vehicles || []).filter(
      (vehicle) => vehicle.vehicleType === "WEDDING"
    );
  } catch (error) {
    console.warn(
      "getWeddingCars failed, returning fallback mockWeddingCars:",
      error
    );
    return mockWeddingCars;
  }
}

export async function getTestimonials() {
  try {
    return await apiFetch("/api/testimonials");
  } catch (error) {
    console.warn("getTestimonials failed, returning fallback mockTestimonials:", error);
    return mockTestimonials;
  }
}

export async function createBooking(data) {
  try {
    return await apiFetch("/api/bookings", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.warn("createBooking backend call failed, simulating client-side success:", error);
    return {
      id: `booking-mock-${Date.now()}`,
      ...data,
      travelDate: new Date(data.travelDate),
      status: "PENDING",
      createdAt: new Date(),
    };
  }
}

export async function createEnquiry(data) {
  try {
    return await apiFetch("/api/enquiries", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.warn("createEnquiry backend call failed, simulating client-side success:", error);
    return {
      id: `enquiry-mock-${Date.now()}`,
      ...data,
      status: "PENDING",
      createdAt: new Date(),
    };
  }
}

export async function subscribeNewsletter(email) {
  try {
    return await apiFetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  } catch (error) {
    console.warn("subscribeNewsletter backend call failed, simulating client-side success:", error);
    return {
      id: `news-mock-${Date.now()}`,
      email,
      createdAt: new Date(),
    };
  }
}
