import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {

  const user = await getCurrentUser();
  const userId = user.id;

  const totalProducts = await prisma.product.count({
    where: { userId }
  });

  const lowStock = await prisma.product.count({
    where: { userId },
  });

  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  console.log(totalProducts);
  console.log(lowStock);
  console.log(recent);

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

        <div className=""></div>
      </main>
    </div>
  )
}