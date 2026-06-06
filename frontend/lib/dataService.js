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
    console.error("getPackages failed, returning empty array:", error);
    return [];
  }
}

export async function getPackageBySlug(slug) {
  try {
    return await apiFetch(`/api/packages/${slug}`);
  } catch (error) {
    console.error(`getPackageBySlug failed for ${slug}:`, error);
    return null;
  }
}

export async function getTaxiCars() {
  try {
    return await apiFetch("/api/taxi-cars");
  } catch (error) {
    console.error("getTaxiCars failed:", error);
    return [];
  }
}

export async function getWeddingCars() {
  try {
    return await apiFetch("/api/wedding-cars");
  } catch (error) {
    console.error("getWeddingCars failed:", error);
    return [];
  }
}

export async function getTestimonials() {
  try {
    return await apiFetch("/api/testimonials");
  } catch (error) {
    console.error("getTestimonials failed:", error);
    return [];
  }
}

export async function createBooking(data) {
  return await apiFetch("/api/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function createEnquiry(data) {
  return await apiFetch("/api/enquiries", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function subscribeNewsletter(email) {
  return await apiFetch("/api/newsletter", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}
