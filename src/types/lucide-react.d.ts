/**
 * Ambient typings for `lucide-react` so the TS language service resolves the module without
 * a tsconfig `paths` entry (those can break Next/Turbopack when pointed at `.d.ts` or orphan `.js`).
 * Runtime still loads the real package from `node_modules`.
 */
declare module 'lucide-react' {
  import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'

  type LucideProps = Omit<SVGProps<SVGSVGElement>, 'ref'> & {
    size?: string | number
    absoluteStrokeWidth?: boolean
  }
  export type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>

  export const ArrowLeft: LucideIcon
  export const ArrowRight: LucideIcon
  export const ArrowUp: LucideIcon
  export const ArrowUpRight: LucideIcon
  export const BadgeCheck: LucideIcon
  export const BarChart3: LucideIcon
  export const Bell: LucideIcon
  export const Bike: LucideIcon
  export const Bold: LucideIcon
  export const Bookmark: LucideIcon
  export const Briefcase: LucideIcon
  export const Building: LucideIcon
  export const Building2: LucideIcon
  export const Calendar: LucideIcon
  export const Camera: LucideIcon
  export const Car: LucideIcon
  export const Check: LucideIcon
  export const CheckCircle: LucideIcon
  export const CheckIcon: LucideIcon
  export const ChevronDown: LucideIcon
  export const ChevronDownIcon: LucideIcon
  export const ChevronLeft: LucideIcon
  export const ChevronLeftIcon: LucideIcon
  export const ChevronRight: LucideIcon
  export const ChevronRightIcon: LucideIcon
  export const ChevronUp: LucideIcon
  export const ChevronUpIcon: LucideIcon
  export const CircleIcon: LucideIcon
  export const Clock: LucideIcon
  export const Code: LucideIcon
  export const Compass: LucideIcon
  export const DollarSign: LucideIcon
  export const Edit: LucideIcon
  export const ExternalLink: LucideIcon
  export const Eye: LucideIcon
  export const FileText: LucideIcon
  export const Filter: LucideIcon
  export const Flag: LucideIcon
  export const Folder: LucideIcon
  export const FolderOpen: LucideIcon
  export const FolderPlus: LucideIcon
  export const Github: LucideIcon
  export const Globe: LucideIcon
  export const GripVerticalIcon: LucideIcon
  export const Headphones: LucideIcon
  export const Heading1: LucideIcon
  export const Heading2: LucideIcon
  export const Heart: LucideIcon
  export const HelpCircle: LucideIcon
  export const Home: LucideIcon
  export const Image: LucideIcon
  export const Italic: LucideIcon
  export const LayoutDashboard: LucideIcon
  export const LayoutGrid: LucideIcon
  export const LifeBuoy: LucideIcon
  export const Link: LucideIcon
  export const List: LucideIcon
  export const ListOrdered: LucideIcon
  export const Linkedin: LucideIcon
  export const Loader2Icon: LucideIcon
  export const Lock: LucideIcon
  export const LogOut: LucideIcon
  export const Mail: LucideIcon
  export const MapPin: LucideIcon
  export const Menu: LucideIcon
  export const MessageCircle: LucideIcon
  export const MessageSquare: LucideIcon
  export const MinusIcon: LucideIcon
  export const Monitor: LucideIcon
  export const Moon: LucideIcon
  export const MoreHorizontal: LucideIcon
  export const MoreHorizontalIcon: LucideIcon
  export const PanelLeftIcon: LucideIcon
  export const Palette: LucideIcon
  export const Phone: LucideIcon
  export const Play: LucideIcon
  export const Plus: LucideIcon
  export const Quote: LucideIcon
  export const Reply: LucideIcon
  export const Save: LucideIcon
  export const Search: LucideIcon
  export const SearchIcon: LucideIcon
  export const Send: LucideIcon
  export const Settings: LucideIcon
  export const Share2: LucideIcon
  export const Shield: LucideIcon
  export const ShieldCheck: LucideIcon
  export const Smartphone: LucideIcon
  export const Sparkles: LucideIcon
  export const Star: LucideIcon
  export const Store: LucideIcon
  export const Sun: LucideIcon
  export const Tag: LucideIcon
  export const Trash2: LucideIcon
  export const TrendingDown: LucideIcon
  export const TrendingUp: LucideIcon
  export const Twitter: LucideIcon
  export const User: LucideIcon
  export const Users: LucideIcon
  export const UtensilsCrossed: LucideIcon
  export const Wrench: LucideIcon
  export const X: LucideIcon
  export const XIcon: LucideIcon
}
