import api from "./api";

/**
 * ============================================
 * Certification Service
 * ============================================
 * Handles all Certification API requests.
 * Uses multipart/form-data since the backend accepts an optional file upload.
 */

export const getAllCertifications = async () => {
    const response = await api.get("/api/certifications/all");
    return response.data;
};

export const getCertificationById = async (id) => {
    const response = await api.get(`/api/certifications/${id}`);
    return response.data;
};

export const createCertification = async (certification, file) => {
    const formData = new FormData();
    formData.append(
        "data",
        new Blob([JSON.stringify(certification)], { type: "application/json" })
    );
    if (file) {
        formData.append("file", file);
    }
    const response = await api.post("/api/certifications/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const updateCertification = async (id, certification, file) => {
    const formData = new FormData();
    formData.append(
        "data",
        new Blob([JSON.stringify(certification)], { type: "application/json" })
    );
    if (file) {
        formData.append("file", file);
    }
    const response = await api.put(`/api/certifications/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const deleteCertification = async (id) => {
    await api.delete(`/api/certifications/${id}`);
};
