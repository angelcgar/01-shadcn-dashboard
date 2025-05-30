"use client"

import { Badge } from "@/components/ui/badge"
import { Payment } from "@/data/payments.data"
import { ColumnDef, SortDirection } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon, ChevronLeftIcon, ChevronUpIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const SortedIcon = ({ isSorted }: { isSorted: false | SortDirection }) => {

    if (isSorted === "asc") {
        return <ChevronUpIcon className="h-4 w-4" />
    }

    if (isSorted === "desc") {
        return <ChevronDownIcon className="h-4 w-4" />
    }

    return null

}


export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "clientName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-right"
                >
                    Client Name
                    <SortedIcon isSorted={column.getIsSorted()} />
                </Button>
            )
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-right"
                >
                    Status
                    <SortedIcon isSorted={column.getIsSorted()} />
                </Button>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            const variant = {
                pending: "secondary",
                processing: "secondary",
                success: "success",
                failed: "destructive"
            }[status] ?? ["default"] as any

            return <Badge variant={variant}>{status}j</Badge>
        }
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-right"
                >
                    Amount
                    <SortedIcon isSorted={column.getIsSorted()} />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <SortedIcon isSorted={column.getIsSorted()} />
                </Button>
            )
        },
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => { navigator.clipboard.writeText(payment.id); toast("Copiado al clicpBoard", { position: "top-right" }) }}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
