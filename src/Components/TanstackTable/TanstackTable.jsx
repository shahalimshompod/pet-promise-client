import { useEffect, useState } from "react";
import { Tooltip } from 'react-tooltip';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import Swal from "sweetalert2";
import { FaHeart, FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UpdatePetModal from "../UpdatePetModal/UpdatePetModal";
import { FaHeartCircleCheck } from "react-icons/fa6";

const TanstackTable = ({ data, refetch }) => {
    const [tableData, setTableData] = useState([]);
    const axiosSecure = useAxiosSecure();
    const columnHelper = createColumnHelper();
    const [selectedPetData, setSelectedPetData] = useState(null);

    // turn off background scrolling
    useEffect(() => {
        if (selectedPetData) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        // Cleanup when the component unmounts
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [selectedPetData]);

    useEffect(() => {
        setTableData(data);
    }, [data]);

    // Date formatting
    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

        const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true };
        const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(date);

        return { date: formattedDate, time: formattedTime };
    };

    // Delete handler
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-pet/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire("Deleted!", "Your pet has been removed.", "success");
                        refetch();
                    }
                });
            }
        });
    };

    // Change status handler
    const handleChangeStatus = (id, currentPetStatus, currentRequestStatus) => {
        if (currentPetStatus === true && currentRequestStatus === false) {
            Swal.fire("Info!", "You can't change the status once it has been adopted.", "info");
            return
        }
        Swal.fire({
            title: "Change Status?",
            text: "Do you want to update the pet's status?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const updatedPetStatus = { adopted: true };
                const updatedIsReqStatus = { isRequested: false, adopted: true }

                // if false we do nothing
                if (currentRequestStatus === true) {
                    axiosSecure.patch(`/change-pet-status/${id}`, updatedIsReqStatus).then((res) => {
                        if (res.data.updated) {
                            axiosSecure.patch(`/change-pet-status/${id}`, updatedPetStatus).then((res) => {
                                if (res.data.updated) {
                                    refetch();
                                    Swal.fire("Updated!", "The pet's status has been changed.", "success");
                                }
                            });
                        }
                    })
                    return;
                }

                // if true we do nothing
                if (currentPetStatus === false) {
                    axiosSecure.patch(`/change-pet-status/${id}`, updatedPetStatus).then((res) => {
                        if (res.data.updated) {
                            refetch();
                            Swal.fire("Updated!", "The pet's status has been changed.", "success");
                        }
                    });
                }


            }
        });
    };

    const columns = [
        columnHelper.accessor((row, index) => index + 1, {
            id: "serial_number",
            header: () => <span>S/N</span>,
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("pet_image", {
            header: "Pet Info",
            cell: (info) => (
                <div className="flex items-center gap-3">
                    <img
                        src={info.getValue()}
                        alt="Pet"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                    <div>
                        <div className="poppins font-bold text-lg">{info.row.original.pet_name}</div>
                        <p className="text-xs nunito">Added: {formatDate(info.row.original.createdAt).date} |{" "}
                            {formatDate(info.row.original.createdAt).time}</p>
                    </div>
                </div>
            ),
        }),
        columnHelper.accessor("pet_category", {
            header: "Pet Category",
            cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor("adopted", {
            header: "Adoption Status",
            cell: (info) => {
                const { isRequested } = info.row.original;
                const adoptedStatus = info.getValue();
                return (
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold 
                                 ${isRequested
                                ? "bg-blue-100 text-blue-700"
                                : adoptedStatus
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                    >
                        {isRequested ? "Requested" : adoptedStatus ? "Adopted" : "Not Adopted"}
                    </span>
                );
            },
        }),
        columnHelper.accessor("actions", {
            header: "Actions",
            cell: (info) => {
                const row = info.row.original;
                return (
                    <div className="flex items-center justify-around">

                        {/* Update Button */}
                        <button
                            data-tooltip-id="edit-pet-tooltip"
                            data-tooltip-content="Edit Pet"
                            onClick={() => setSelectedPetData(row)} className="text-cyan-500 hover:text-cyan-800">
                            <FaRegEdit size={25} />
                        </button>

                        {/* Delete Button */}
                        <button
                            data-tooltip-id="delete-pet-tooltip"
                            data-tooltip-content="Delete Pet"
                            onClick={() => handleDelete(row._id)}
                            className="text-red-500 hover:text-red-600"
                        >
                            <MdDeleteForever size={25} />
                        </button>

                        {/* Change Status Button */}
                        <button
                            data-tooltip-id="status-pet-tooltip"
                            data-tooltip-content="Change Pet Status"
                            onClick={() => handleChangeStatus(row._id, row.adopted, row.isRequested)}
                        >
                            {
                                row.adopted === false ? <FaHeart className="text-cyan-50 hover:text-green-200" size={25} /> : <FaHeartCircleCheck size={25} className="text-green-400" />
                            }
                        </button>
                        <Tooltip id="edit-pet-tooltip" />
                        <Tooltip id="delete-pet-tooltip" />
                        <Tooltip id="status-pet-tooltip" />
                    </div>
                );
            },
        }),
    ];

    const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
        onSortingChange: setSorting,
    });

    return (
        <div className="w-full bg-cyan-200 dark:bg-[#111827] text-white rounded-2xl dark:rounded-xl border-2 border-cyan-500">
            <div className="relative overflow-x-auto rounded-xl">
                <table className="w-[750px] lg:w-full text-sm text-left rtl:text-right text-cyan-900 dark:text-cyan-50">
                    <thead className="poppins uppercase bg-cyan-500 dark:bg-gray-700">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        scope="col"
                                        className="px-6 py-3 text-cyan-50 cursor-pointer"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <div className="flex items-center gap-1">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getIsSorted() === "asc" && <span>▲</span>}
                                            {header.column.getIsSorted() === "desc" && <span>▼</span>}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr
                                key={row.id}
                                className={`${data?.length > 1 ? "border-b" : ""} border-gray-700 hover:bg-cyan-100 dark:hover:bg-gray-950 nunito font-semibold`}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-6 py-4">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {
                selectedPetData && <UpdatePetModal selectedPets={selectedPetData} setSelectedPets={setSelectedPetData} refetch={refetch} />
            }
        </div>
    );
};

export default TanstackTable;
