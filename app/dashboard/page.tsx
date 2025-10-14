import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TrendingUp } from "lucide-react";

export default async function DashboardPage() {

  const user = await getCurrentUser();
  const userId = user.id;

  const totalProducts = await prisma.product.count({
    where: { userId }
  });

  const lowStock = await prisma.product.count({
    where: {
      userId,
      lowStockAt: {
        not: null
      },
      quantity: { lte: 5 }
    },
  });

  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const allProducts = await prisma.product.findMany({
    where: { userId },
    select: {
      price: true,
      quantity: true,
      createdAt: true
    }
  });

  const totalValue = allProducts.reduce((sum, product) => sum + Number(product.price) * Number(product.quantity), 0)

  console.log(totalValue)

  return (
    <div className="min-h-screen bg-neutral-50">
      <Sidebar currentPath="/dashboard" />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="">
              <h1 className="text-2xl outfit-medium text-neutral-900">Dashboard</h1>
              <p className="text-sm text-neutral-500">Welcome back! Here is in an overview of your inventory.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-md border border-[#ebebeb] p-6">
            <h2 className="text-lf outfit-medium text-neutral-900 mb-6">Key Metrics</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl outfit-bold text-neutral-900">{totalProducts}</div>
                <div className="text-sm text-neutral-600">Total Products</div>
                <div className="flex items-center justify-center mt-1 gap-1">
                  <span className="text-xs text-green-600">+{totalProducts}</span>
                  <TrendingUp className="w-3 h-3 text-green-600" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl outfit-bold text-neutral-900">${Number(totalValue.toFixed(0))}</div>
                <div className="text-sm text-neutral-600">Total Value</div>
                <div className="flex items-center justify-center mt-1 gap-1">
                  <span className="text-xs text-green-600">+${Number(totalValue.toFixed(0))}</span>
                  <TrendingUp className="w-3 h-3 text-green-600" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl outfit-bold text-neutral-900">{lowStock}</div>
                <div className="text-sm text-neutral-600">Low Stock</div>
                <div className="flex items-center justify-center mt-1 gap-1">
                  <span className="text-xs text-green-600">+{lowStock}</span>
                  <TrendingUp className="w-3 h-3 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}