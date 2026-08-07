import api from "./api";

const notificationService = {

    getMyNotifications() {
        return api.get("/api/notifications/me");
    },

    getUnreadNotifications() {
        return api.get("/api/notifications/me/unread");
    },

    getUnreadCount() {
        return api.get("/api/notifications/unread-count");
    },

    markAsRead(id) {
        return api.patch(`/api/notifications/${id}/read`);
    },

    markAllAsRead() {
        return api.patch("/api/notifications/read-all");
    }

};

export default notificationService;