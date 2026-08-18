import api from "./api";

/*
|--------------------------------------------------------------------------
| Helper: safely get an array
|--------------------------------------------------------------------------
| If one analytics endpoint fails, we return [] instead of breaking the
| complete Analytics / Reports page.
|--------------------------------------------------------------------------
*/

const getArray = async (url, label = url) => {
    try {
        const response = await api.get(url);

        if (Array.isArray(response.data)) {
            return response.data;
        }

        /*
         * Some APIs may return:
         * {
         *   data: [...]
         * }
         */
        if (Array.isArray(response.data?.data)) {
            return response.data.data;
        }

        console.warn(`${label}: expected array but received:`, response.data);

        return [];
    } catch (error) {
        console.error(`${label} failed:`, error);

        return [];
    }
};


/*
|--------------------------------------------------------------------------
| Helper: safely get an object
|--------------------------------------------------------------------------
*/

const getObject = async (url, label = url) => {
    try {
        const response = await api.get(url);

        if (
            response.data &&
            typeof response.data === "object" &&
            !Array.isArray(response.data)
        ) {
            return response.data;
        }

        console.warn(`${label}: expected object but received:`, response.data);

        return {};
    } catch (error) {
        console.error(`${label} failed:`, error);

        return {};
    }
};


/*
|--------------------------------------------------------------------------
| GET ALL ANALYTICS DATA
|--------------------------------------------------------------------------
*/

export const getAnalyticsData = async () => {

    /*
     * IMPORTANT:
     *
     * Do NOT use Promise.all() directly here.
     *
     * Each request is handled independently so that if one endpoint
     * returns 404 / 403 / 500, the complete Analytics page does not crash.
     */

    const [
        users,
        departments,
        skills,
        certifications,
        courses,
        assessmentStats,
        sessions,
        mentorshipMatches,
    ] = await Promise.all([

        getArray(
            "/api/users",
            "Users API"
        ),

        getArray(
            "/api/departments/all",
            "Departments API"
        ),

        getArray(
            "/api/skills/all",
            "Skills API"
        ),

        getArray(
            "/api/certifications",
            "Certifications API"
        ),

        getArray(
            "/api/courses",
            "Courses API"
        ),

        getObject(
            "/api/assessment/statistics",
            "Assessment Statistics API"
        ),

        getArray(
            "/api/knowledge-sessions",
            "Knowledge Sessions API"
        ),

        getArray(
            "/api/mentorship-matches/all",
            "Mentorship Matches API"
        ),
    ]);


    return {
        users,
        departments,
        skills,
        certifications,
        courses,
        assessmentStats,
        sessions,
        mentorshipMatches,
    };
};


/*
|--------------------------------------------------------------------------
| GET SKILL GAPS FOR ALL USERS
|--------------------------------------------------------------------------
*/

export const getSkillGapsForUsers = async (users = []) => {

    if (!Array.isArray(users) || users.length === 0) {
        return [];
    }


    const results = await Promise.all(

        users.map(async (user) => {

            if (!user?.id) {
                return [];
            }


            try {

                const response = await api.get(
                    `/api/management/skill-gaps/user/${user.id}`
                );


                if (Array.isArray(response.data)) {
                    return response.data;
                }


                if (Array.isArray(response.data?.data)) {
                    return response.data.data;
                }


                return [];

            } catch (error) {

                /*
                 * One user's skill-gap failure should NOT prevent
                 * other users' skill gaps from being displayed.
                 */

                console.error(
                    `Skill gap API failed for user ${user.id}:`,
                    error
                );

                return [];
            }
        })
    );


    return results.flat();
};