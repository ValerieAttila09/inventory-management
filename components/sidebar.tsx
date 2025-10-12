import { UserButton } from "@stackframe/stack";
import { BarChart3, Package, Plus, Settings } from "lucide-react";
import Link from "next/link";

export default function Sidebar({ currentPath = "/dashboard" }: { currentPath: string }) {

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Inventory", href: "/inventory", icon: Package },
    { name: "Add Products", href: "/add-products", icon: Plus },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div className="fixed left-0 top-0 bg-neutral-900 text-white w-64 min-h-screen py-6 px-4 z-10">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="w-7 h-7" />
          <span className="text-lg outfit-medium">Inventory App</span>
        </div>
      </div>

      <nav className="space-y-2">
        <div className="text-sm outfit-medium text-neutral-400 uppercase">
          Inventory
        </div>

        {navigation.map((item, key) => {
          const IconComponent = item.icon;
          const isActive = currentPath === item.href;
          return (
            <Link key={key} href={item.href} className={`flex items-center space-x-3 px-3 py-2 rounded-md border border-transparent ${isActive ? "bg-purple-100 text-neutral-800 hover:bg-purple-200" : "text-neutral-300 hover:border-[#373737] hover:bg-neutral-800"} transition-all`}>
              {<IconComponent className="w-5 h-5"/>}
              <span className="text-sm">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-600">
        <div className="flex items-center justify-between">
          <UserButton />
        </div>
      </div>

    </div>
  )
}