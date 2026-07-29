import React, { useEffect, useState } from "react";
import {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment
} from "../../services/departmentService";

import DepartmentHeader from "../../components/department/DepartmentHeader";
import DepartmentStats from "../../components/department/DepartmentStats";
import DepartmentTable from "../../components/department/DepartmentTable";
import DepartmentModal from "../../components/department/DepartmentModal";
import DeleteDepartmentModal from "../../components/department/DeleteDepartmentModal";

import { Loader2 } from "lucide-react";

export default function DepartmentManagement() {

    const [departments, setDepartments] = useState([]);

    const [filteredDepartments, setFilteredDepartments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {

        loadDepartments();

    }, []);

    useEffect(() => {

        filterDepartments();

    }, [search, departments]);

    /* ==========================================
            Load Departments
    ========================================== */

    const loadDepartments = async () => {

        try {

            setLoading(true);

            const data = await getDepartments();

            setDepartments(data);

            setFilteredDepartments(data);

        }

        catch (err) {

            console.error(err);

            setError("Unable to load departments.");

        }

        finally {

            setLoading(false);

        }

    };

    /* ==========================================
            Search
    ========================================== */

    const filterDepartments = () => {

        if (!search.trim()) {

            setFilteredDepartments(departments);

            return;

        }

        const filtered = departments.filter((department) =>

            department.name.toLowerCase().includes(search.toLowerCase())

            ||

            department.description?.toLowerCase().includes(search.toLowerCase())

        );

        setFilteredDepartments(filtered);

    };

    /* ==========================================
            Add Department
    ========================================== */

    const handleCreate = async (department) => {

        try {

            await createDepartment(department);

            await loadDepartments();

            setIsModalOpen(false);

        }

        catch (err) {

            console.error(err);

            alert("Unable to create department.");

        }

    };

    /* ==========================================
            Update Department
    ========================================== */

    const handleUpdate = async (department) => {

        try {

            await updateDepartment(

                selectedDepartment.id,

                department

            );

            await loadDepartments();

            setSelectedDepartment(null);

            setIsModalOpen(false);

        }

        catch (err) {

            console.error(err);

            alert("Unable to update department.");

        }

    };

    /* ==========================================
            Delete Department
    ========================================== */

    const handleDelete = async () => {

        try {

            await deleteDepartment(selectedDepartment.id);

            await loadDepartments();

            setSelectedDepartment(null);

            setIsDeleteModalOpen(false);

        }

        catch (err) {

            console.error(err);

            alert("Unable to delete department.");

        }

    };

    /* ==========================================
            Loading
    ========================================== */

    if (loading) {

        return (

            <div className="min-h-screen flex justify-center items-center">

                <Loader2

                    size={48}

                    className="animate-spin text-indigo-600"

                />

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto px-6 py-8">

            {

                error && (

                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">

                        {error}

                    </div>

                )

            }

            <DepartmentHeader

                search={search}

                setSearch={setSearch}

                onAdd={() => {

                    setSelectedDepartment(null);

                    setIsModalOpen(true);

                }}

            />

            <DepartmentStats

                departments={departments}

            />

            <DepartmentTable

                departments={filteredDepartments}

                onEdit={(department) => {

                    setSelectedDepartment(department);

                    setIsModalOpen(true);

                }}

                onDelete={(department) => {

                    setSelectedDepartment(department);

                    setIsDeleteModalOpen(true);

                }}

            />

            <DepartmentModal

                open={isModalOpen}

                onClose={() => {

                    setIsModalOpen(false);

                    setSelectedDepartment(null);

                }}

                department={selectedDepartment}

                departments={departments}

                onSubmit={selectedDepartment ? handleUpdate : handleCreate}

            />

            <DeleteDepartmentModal

                open={isDeleteModalOpen}

                onClose={() => {

                    setIsDeleteModalOpen(false);

                    setSelectedDepartment(null);

                }}

                department={selectedDepartment}

                onConfirm={handleDelete}

            />

        </div>

    );

}