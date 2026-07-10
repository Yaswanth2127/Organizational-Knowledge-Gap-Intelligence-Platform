import React from "react";
import { Building2, Plus, Search } from "lucide-react";

export default function DepartmentHeader({

    search,

    setSearch,

    onAdd

}) {

    return (

        <div className="bg-white rounded-3xl shadow-md border border-gray-100 mb-8">

            {/* ===========================
                    Header
            =========================== */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-8">

                {/* Left */}

                <div className="flex items-center gap-5">

                    <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">

                        <Building2

                            size={34}

                            className="text-indigo-600"

                        />

                    </div>

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">

                            Department Management

                        </h1>

                        <p className="text-gray-500 mt-2">

                            Manage organizational departments,
                            hierarchy and business units.

                        </p>

                    </div>

                </div>

                {/* Right */}

                <button

                    onClick={onAdd}

                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition"

                >

                    <Plus size={20} />

                    Add Department

                </button>

            </div>

            {/* ===========================
                    Search
            =========================== */}

            <div className="px-8 pb-8">

                <div className="relative">

                    <Search

                        size={20}

                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"

                    />

                    <input

                        type="text"

                        placeholder="Search departments..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                        className="w-full pl-12 pr-4 py-4 border rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"

                    />

                </div>

            </div>

        </div>

    );

}