'use client'

import Link from 'next/link'
import { ChevronDown, LayoutGrid, LogOut, Plus, FileText, Building2, Tag, Image as ImageIcon, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className="inline-flex h-9 gap-1 rounded-full border border-[#008c72]/50 bg-[#05201c] px-3 text-white shadow-sm hover:bg-[#063a32] sm:h-10 sm:px-4">
            <Plus className="h-4 w-4" />
            Post Ad
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 border-[#0a3d2e]/12 bg-white">
          {SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => {
            const Icon = taskIcons[task.key] || LayoutGrid
            return (
              <DropdownMenuItem key={task.key} asChild>
                <Link href={`/create/${task.key}`}>
                  <Icon className="mr-2 h-4 w-4" />
                  Create {task.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-2 rounded-full border border-current/20 bg-current/[0.06] py-1 pl-1 pr-2 text-inherit sm:pl-2 sm:pr-2">
        <Avatar className="h-8 w-8 border border-current/25 sm:h-9 sm:w-9">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback className="bg-[#008c72] text-[10px] text-white">{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="hidden min-w-0 max-w-[8rem] flex-col sm:flex">
          <span className="truncate text-xs font-semibold leading-tight">{user?.name}</span>
          <span className="truncate text-[10px] opacity-70">@{user?.email?.split('@')[0]}</span>
        </div>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={logout}
        className="h-9 gap-1.5 rounded-full border border-current/25 px-3 text-xs font-semibold text-inherit hover:bg-current/10 sm:h-10 sm:px-4 sm:text-sm"
      >
        <LogOut className="h-4 w-4 shrink-0" />
        <span>Sign out</span>
      </Button>
    </div>
  )
}
