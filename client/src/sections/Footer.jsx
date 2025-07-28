import { facebook , instagram } from "../assets/icons"
function Footer() {
  return (
    <div className="flex flex-row items-center justify-between text-wrap bg-slate-600 w-full p-5">
      <p>© 2025 QuoteHub </p>
      <p>All rights reserved.</p>
      <ul className="flex gap-4">
        <li><a href="https://instagram.com/QuoteHub"><img src={instagram} alt="Instagram" className="w-6 h-6" /></a></li>
        <li><a href="https://linkedin.com/QuoteHub"><img src={facebook} alt="LinkedIn" className="w-6 h-6" /></a></li>
      </ul>
    </div>
  )
}

export default Footer
