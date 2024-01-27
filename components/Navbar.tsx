import Link from "next/link";
import Image from "next/image";



const Navbar = () =>{
    return (
        <div>
            <nav className="topbar">
                <Link href="/home" className="flex items-center gap-4">
                    <img src="https://t3.ftcdn.net/jpg/01/09/57/24/240_F_109572410_y8WYcaXTsR3sOE3ZFZQm8dhLsRcG8hSw.jpg" className="rounded-full" alt="logo" width={28} height={28} />
                    <h1 className="font-bold font-black max-xs:hidden">Remote Hire</h1>
                </Link>
            </nav>
        </div>
    )
}

export default Navbar;