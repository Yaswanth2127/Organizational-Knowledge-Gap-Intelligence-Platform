import React, { useEffect, useState } from "react";
import {
    Users,
    Brain,
    Clock,
    Loader2,
    Search,
    UserCheck,
    Plus,
    Save,
    X,
    Eye,
    Pencil,
    Trash2,
    Star
} from "lucide-react";

import {

    getEmployeeSkills,

    getEmployeeSkillsByUserId,

    addEmployeeSkill

} from "../services/employeeSkillService";

import {
    getUsers,

    getSkills

} from "../services/dashboardService";

export default function EmployeeSkills() {

    const [loading, setLoading] = useState(true);

    const [employeeSkills, setEmployeeSkills] = useState([]);

    const [search, setSearch] = useState("");

    const [selectedDepartment, setSelectedDepartment] = useState("");

    const [selectedJobRole, setSelectedJobRole] = useState("");

    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [selectedEmployeeSkills, setSelectedEmployeeSkills] = useState([]);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const [showAssignModal, setShowAssignModal] = useState(false);

const [users, setUsers] = useState([]);

const [skills, setSkills] = useState([]);

const [formData, setFormData] = useState({

    userId: "",

    skillId: "",

    selfRating: "",

    peerRating: "",

    managerRating: "",

    finalRating: ""

});


    useEffect(() => {

        loadEmployeeSkills();

    }, []);



    const loadEmployeeSkills = async () => {

        try {

            const [

                employeeSkillsRes,

                usersRes,

                skillsRes

            ] = await Promise.all([

                getEmployeeSkills(),

                getUsers(),

                getSkills()

            ]);

            setUsers(usersRes.data);

            setSkills(skillsRes.data);

            setEmployeeSkills(employeeSkillsRes.data);

        }

        catch (error) {

            console.error(error);

            alert("Unable to load employee skills.");

        }

        finally {

            setLoading(false);

        }

    };

    const handleViewSkills = async (employee) => {

        try {

            const response = await getEmployeeSkillsByUserId(employee.userId);

            setSelectedEmployee(employee);

            setSelectedEmployeeSkills(response.data);

            setDrawerOpen(true);

        }

        catch (error) {

            console.error(error);

            alert("Unable to load employee skills.");

        }

    };


    const displayValue = (value, fallback = "Not Available") => {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {

            return fallback;

        }

        return value;

    };



    /*
    ============================================
        GROUP SKILLS BY EMPLOYEE
    ============================================
    */

    const groupedEmployees = Object.values(

        employeeSkills.reduce((acc, item) => {

            if (!acc[item.userId]) {

                acc[item.userId] = {

                    userId: item.userId,

                    userName: item.userName,

                    profileImageUrl: item.profileImageUrl,

                    departmentName: item.departmentName,

                    jobRoleName: item.jobRoleName,

                    skills: []

                };

            }

            acc[item.userId].skills.push(item);

            return acc;

        }, {})

    );



    /*
    ============================================
        FILTER EMPLOYEES
    ============================================
    */

    const filteredEmployees = groupedEmployees.filter(employee => {

        const matchesSearch =
            employee.userName
                ?.toLowerCase()
                .includes(search.toLowerCase());

        const matchesDepartment =
            !selectedDepartment ||
            employee.departmentName === selectedDepartment;

        const matchesJobRole =
            !selectedJobRole ||
            employee.jobRoleName === selectedJobRole;

        return (

            matchesSearch &&
            matchesDepartment &&
            matchesJobRole

        );

    });



    /*
    ============================================
        DASHBOARD STATISTICS
    ============================================
    */

    const totalEmployees = groupedEmployees.length;

    const totalSkillsAssigned = employeeSkills.length;

    const pendingReviews = employeeSkills.filter(

        skill => skill.finalRating == null

    ).length;



    const ratingOrder = {

        UNAWARE: 0,

        BEGINNER: 1,

        INTERMEDIATE: 2,

        ADVANCED: 3,

        EXPERT: 4

    };



    const ratingNames = [

        "Unaware",

        "Beginner",

        "Intermediate",

        "Advanced",

        "Expert"

    ];



    const averageRating = (() => {

        const ratedSkills = employeeSkills.filter(

            skill => skill.finalRating

        );

        if (ratedSkills.length === 0) {

            return "Not Rated";

        }

        const total = ratedSkills.reduce(

            (sum, skill) =>

                sum + ratingOrder[skill.finalRating],

            0

        );

        const avg = Math.round(total / ratedSkills.length);

        return ratingNames[avg];

    })();



    /*
    ============================================
        FILTER DROPDOWNS
    ============================================
    */

    const departments = [

        ...new Set(

            groupedEmployees

                .map(emp => emp.departmentName)

                .filter(Boolean)

        )

    ];



    const jobRoles = [

        ...new Set(

            groupedEmployees

                .map(emp => emp.jobRoleName)

                .filter(Boolean)

        )

    ];

    const saveEmployeeSkill = async () => {

    try {

        await addEmployeeSkill(formData);

        setShowAssignModal(false);

        loadEmployeeSkills();

        setFormData({

            userId: "",

            skillId: "",

            selfRating: "",

            peerRating: "",

            managerRating: "",

            finalRating: ""

        });

    }

    catch(error){

        console.error(error);

        alert("Unable to assign skill.");

    }

};



    if (loading) {

        return (

            <div className="min-h-screen flex justify-center items-center">

                <Loader2

                    className="animate-spin text-indigo-600"

                    size={45}

                />

            </div>

        );

    }
    return (

<div className="space-y-6">

    {/* ==========================================
                PAGE HEADER
    ========================================== */}

    <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 rounded-3xl shadow-xl overflow-hidden">

        <div className="p-8 flex flex-col lg:flex-row justify-between items-center">

            <div>

                <h1 className="text-4xl font-bold text-white">

                    Employee Skills Management

                </h1>

                <p className="text-indigo-100 mt-2 text-lg">

                    Manage employee competencies, skill ratings and assessments across the organization.

                </p>

            </div>

            <button

                onClick={() => setShowAssignModal(true)}

                className="flex items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold"

            >

                <Plus size={18}/>

                Assign Skill

            </button>

        </div>

    </div>



    {/* ==========================================
                STATISTICS
    ========================================== */}

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Employees */}

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all p-6">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-sm text-gray-500 font-medium">

                        Employees

                    </p>

                    <h2 className="text-4xl font-bold text-indigo-600 mt-2">

                        {totalEmployees}

                    </h2>

                </div>

                <div className="bg-indigo-100 p-4 rounded-2xl">

                    <Users
                        size={32}
                        className="text-indigo-600"
                    />

                </div>

            </div>

        </div>



        {/* Assigned Skills */}

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all p-6">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-sm text-gray-500 font-medium">

                        Assigned Skills

                    </p>

                    <h2 className="text-4xl font-bold text-purple-600 mt-2">

                        {totalSkillsAssigned}

                    </h2>

                </div>

                <div className="bg-purple-100 p-4 rounded-2xl">

                    <Brain
                        size={32}
                        className="text-purple-600"
                    />

                </div>

            </div>

        </div>



        {/* Average Rating */}

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all p-6">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-sm text-gray-500 font-medium">

                        Average Rating

                    </p>

                    <h2 className="text-3xl font-bold text-amber-600 mt-2">

                        {averageRating}

                    </h2>

                </div>

                <div className="bg-amber-100 p-4 rounded-2xl">

                    <Star
                        size={32}
                        className="text-amber-600"
                    />

                </div>

            </div>

        </div>



        {/* Pending Reviews */}

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all p-6">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-sm text-gray-500 font-medium">

                        Pending Reviews

                    </p>

                    <h2 className="text-4xl font-bold text-red-600 mt-2">

                        {pendingReviews}

                    </h2>

                </div>

                <div className="bg-red-100 p-4 rounded-2xl">

                    <Clock
                        size={32}
                        className="text-red-600"
                    />

                </div>

            </div>

        </div>

    </div>
        {/* ==========================================
                FILTER TOOLBAR
    ========================================== */}

    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

            {/* Search */}

            <div className="relative w-full xl:w-96">

                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input

                    type="text"

                    placeholder="Search employee..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"

                />

            </div>



            {/* Filters */}

            <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">

                {/* Department */}

                <select

                    value={selectedDepartment}

                    onChange={(e) =>

                        setSelectedDepartment(e.target.value)

                    }

                    className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"

                >

                    <option value="">

                        All Departments

                    </option>

                    {departments.map((department) => (

                        <option

                            key={department}

                            value={department}

                        >

                            {department}

                        </option>

                    ))}

                </select>



                {/* Job Role */}

                <select

                    value={selectedJobRole}

                    onChange={(e) =>

                        setSelectedJobRole(e.target.value)

                    }

                    className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"

                >

                    <option value="">

                        All Job Roles

                    </option>

                    {jobRoles.map((role) => (

                        <option

                            key={role}

                            value={role}

                        >

                            {role}

                        </option>

                    ))}

                </select>



                {/* Clear Filters */}

                <button

                    onClick={() => {

                        setSearch("");

                        setSelectedDepartment("");

                        setSelectedJobRole("");

                    }}

                    className="px-5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition font-medium"

                >

                    Clear Filters

                </button>

            </div>

        </div>



        {/* Filter Summary */}

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-600">

            <span>

                Showing

                <span className="font-semibold text-indigo-600 mx-1">

                    {filteredEmployees.length}

                </span>

                employees

            </span>

            <span className="text-gray-300">

                |

            </span>

            <span>

                Total Skills

                <span className="font-semibold text-purple-600 ml-1">

                    {totalSkillsAssigned}

                </span>

            </span>

            <span className="text-gray-300">

                |

            </span>

            <span>

                Average Rating

                <span className="font-semibold text-amber-600 ml-1">

                    {averageRating}

                </span>

            </span>

        </div>

    </div>
        {/* ==========================================
                EMPLOYEE SKILLS TABLE
    ========================================== */}

    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">

        <div className="px-6 py-5 border-b bg-gray-50">

            <h2 className="text-xl font-bold text-gray-800">

                Employee Skill Inventory

            </h2>

            <p className="text-sm text-gray-500 mt-1">

                View and manage employee competencies across the organization.

            </p>

        </div>

        <div className="overflow-x-auto">

            <table className="w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">

                            Employee

                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">

                            Department

                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">

                            Job Role

                        </th>

                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">

                            Skills Assigned

                        </th>

                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">

                            Highest Rating

                        </th>

                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {filteredEmployees.map((employee) => {

                        const ratings = employee.skills
                            .map(skill => skill.finalRating)
                            .filter(Boolean);

                        let highestRating = "Not Rated";

                        if (ratings.includes("EXPERT"))
                            highestRating = "Expert";
                        else if (ratings.includes("ADVANCED"))
                            highestRating = "Advanced";
                        else if (ratings.includes("INTERMEDIATE"))
                            highestRating = "Intermediate";
                        else if (ratings.includes("BEGINNER"))
                            highestRating = "Beginner";
                        else if (ratings.includes("UNAWARE"))
                            highestRating = "Unaware";

                        return (

                            <tr
                                key={employee.userId}
                                className="border-b hover:bg-indigo-50 transition"
                            >

                                {/* Employee */}

                                <td className="px-6 py-5">

                                    <div className="flex items-center gap-4">

                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center">

                                            {employee.profileImageUrl ? (

                                                <img

                                                    src={employee.profileImageUrl}

                                                    alt={employee.userName}

                                                    className="w-full h-full object-cover"

                                                />

                                            ) : (

                                                <span className="text-white font-bold">

                                                    {employee.userName.charAt(0)}

                                                </span>

                                            )}

                                        </div>

                                        <div>

                                            <h3 className="font-semibold text-gray-800">

                                                {displayValue(employee.userName)}

                                            </h3>

                                            <p className="text-sm text-gray-500">

                                                ID : {employee.userId}

                                            </p>

                                        </div>

                                    </div>

                                </td>

                                {/* Department */}

                                <td className="px-6 py-5 text-gray-700">

                                    {displayValue(
                                        employee.departmentName,
                                        "Not Assigned"
                                    )}

                                </td>

                                {/* Job Role */}

                                <td className="px-6 py-5 text-gray-700">

                                    {displayValue(
                                        employee.jobRoleName,
                                        "Not Assigned"
                                    )}

                                </td>

                                {/* Skills */}

                                <td className="px-6 py-5 text-center">

                                    <span className="bg-indigo-100 text-indigo-700 font-semibold px-3 py-1 rounded-full">

                                        {employee.skills.length}

                                    </span>

                                </td>

                                {/* Highest Rating */}

                                <td className="px-6 py-5 text-center">

                                    <span className="bg-amber-100 text-amber-700 font-semibold px-3 py-1 rounded-full">

                                        {highestRating}

                                    </span>

                                </td>

                                {/* Actions */}

                                <td className="px-6 py-5">

                                    <div className="flex justify-center">

                                        <button

                                            onClick={() => handleViewSkills(employee)}

                                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"

                                        >

                                            <Eye size={16}/>

                                            View

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        );

                    })}

                </tbody>

            </table>

        </div>

    </div>
    {/* =======================================
        RIGHT DRAWER
======================================= */}

<div

    className={`fixed top-0 right-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300

    ${drawerOpen

        ? "translate-x-0"

        : "translate-x-full"

    }`}

>

    {selectedEmployee && (

        <>

            {/* Header */}

            <div className="flex justify-between items-center p-6 border-b">

                <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center">

                        {selectedEmployee.profileImageUrl ? (

                            <img

                                src={selectedEmployee.profileImageUrl}

                                className="w-full h-full object-cover"

                                alt="Profile"

                            />

                        ) : (

                            <span className="text-white text-xl font-bold">

                                {selectedEmployee.userName.charAt(0)}

                            </span>

                        )}

                    </div>

                    <div>

                        <h2 className="text-xl font-bold">

                            {selectedEmployee.userName}

                        </h2>

                        <p className="text-sm text-gray-500">

                            {displayValue(selectedEmployee.jobRoleName)}

                        </p>

                        <p className="text-sm text-gray-500">

                            {displayValue(selectedEmployee.departmentName)}

                        </p>

                    </div>

                </div>

                <button

                    onClick={() => setDrawerOpen(false)}

                >

                    <X/>

                </button>

            </div>



            {/* Skills */}

            <div className="overflow-y-auto h-[calc(100%-90px)] p-6 space-y-5">

                {selectedEmployeeSkills.map(skill => (

                    <div

                        key={skill.id}

                        className="border rounded-2xl p-5 shadow-sm"

                    >

                        <div className="flex justify-between items-center">

                            <h3 className="font-bold text-lg">

                                {skill.skillName}

                            </h3>

                            <Star className="text-yellow-500"/>

                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-5">

                            <div>

                                <p className="text-xs text-gray-500">

                                    Self Rating

                                </p>

                                <p className="font-semibold">

                                    {displayValue(skill.selfRating)}

                                </p>

                            </div>

                            <div>

                                <p className="text-xs text-gray-500">

                                    Peer Rating

                                </p>

                                <p className="font-semibold">

                                    {displayValue(skill.peerRating)}

                                </p>

                            </div>

                            <div>

                                <p className="text-xs text-gray-500">

                                    Manager Rating

                                </p>

                                <p className="font-semibold">

                                    {displayValue(skill.managerRating)}

                                </p>

                            </div>

                            <div>

                                <p className="text-xs text-gray-500">

                                    Final Rating

                                </p>

                                <span className="inline-block mt-1 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">

                                    {displayValue(skill.finalRating)}

                                </span>

                            </div>

                        </div>



                        <div className="flex gap-3 mt-6">

                            <button

                                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"

                            >

                                <Pencil size={16}/>

                                Edit

                            </button>

                            <button

                                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"

                            >

                                <Trash2 size={16}/>

                                Delete

                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </>

    )}

</div>
{showAssignModal && (

<div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

<div className="bg-white rounded-3xl w-full max-w-2xl p-8">

<h2 className="text-2xl font-bold mb-6">

Assign Employee Skill

</h2>

<div className="grid md:grid-cols-2 gap-5">

<select

value={formData.userId}

onChange={(e)=>

setFormData({

...formData,

userId:e.target.value

})

}

className="border rounded-xl p-3"

>

<option>

Select Employee

</option>

{

users.map(user=>(

<option

key={user.id}

value={user.id}

>

{user.fullName}

</option>

))

}

</select>

<select

value={formData.skillId}

onChange={(e)=>

setFormData({

...formData,

skillId:e.target.value

})

}

className="border rounded-xl p-3"

>

<option>

Select Skill

</option>

{

skills.map(skill=>(

<option

key={skill.id}

value={skill.id}

>

{skill.name}

</option>

))

}

</select>

{
["selfRating","peerRating","managerRating","finalRating"]

.map(field=>(

<select

key={field}

value={formData[field]}

onChange={(e)=>

setFormData({

...formData,

[field]:e.target.value

})

}

className="border rounded-xl p-3"

>

<option value="">

Select {field}

</option>

<option>

UNAWARE

</option>

<option>

BEGINNER

</option>

<option>

INTERMEDIATE

</option>

<option>

ADVANCED

</option>

<option>

EXPERT

</option>

</select>

))

}

</div>

<div className="flex justify-end gap-4 mt-8">

<button

onClick={()=>setShowAssignModal(false)}

className="px-5 py-3 rounded-xl border"

>

Cancel

</button>

<button

onClick={saveEmployeeSkill}

className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"

>

<Save size={18}/>

Save Skill

</button>

</div>

</div>

</div>

)}

</div>

);

}